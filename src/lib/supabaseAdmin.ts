import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseServiceKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables');
}

// Create admin client with service role key
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

export async function initializeDatabaseSchema(): Promise<boolean> {
  try {
    console.log('Starting database initialization...');

    // Create the registrations table
    const { error: tableError } = await supabaseAdmin.rpc('exec_sql', {
      sql: `
        -- Enable UUID extension
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

        -- Create registrations table if not exists
        CREATE TABLE IF NOT EXISTS registrations (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          first_name TEXT NOT NULL,
          last_name TEXT NOT NULL,
          email TEXT NOT NULL UNIQUE,
          phone TEXT NOT NULL,
          country TEXT NOT NULL,
          linkedin_profile TEXT NOT NULL,
          educational_background TEXT NOT NULL,
          current_position TEXT NOT NULL,
          work_experience TEXT NOT NULL,
          interest_areas JSONB NOT NULL DEFAULT '[]'::jsonb,
          location_address TEXT NOT NULL,
          location_lat DOUBLE PRECISION NOT NULL,
          location_lng DOUBLE PRECISION NOT NULL,
          profile_photo_url TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
        );

        -- Create indexes
        CREATE INDEX IF NOT EXISTS idx_registrations_email ON registrations(email);
        CREATE INDEX IF NOT EXISTS idx_registrations_country ON registrations(country);
        CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON registrations(created_at);

        -- Create timestamp trigger
        CREATE OR REPLACE FUNCTION update_timestamp()
        RETURNS TRIGGER AS $$
        BEGIN
          NEW.updated_at = TIMEZONE('utc'::text, NOW());
          RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;

        -- Create trigger if not exists
        DROP TRIGGER IF EXISTS update_registrations_timestamp ON registrations;
        CREATE TRIGGER update_registrations_timestamp
          BEFORE UPDATE ON registrations
          FOR EACH ROW
          EXECUTE FUNCTION update_timestamp();

        -- Enable RLS
        ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

        -- Create policies
        DROP POLICY IF EXISTS "Allow anonymous insert" ON registrations;
        CREATE POLICY "Allow anonymous insert" ON registrations
          FOR INSERT TO anon
          WITH CHECK (true);

        DROP POLICY IF EXISTS "Allow public read" ON registrations;
        CREATE POLICY "Allow public read" ON registrations
          FOR SELECT TO anon
          USING (true);
      `
    });

    if (tableError) {
      console.error('Error creating table:', tableError);
      return false;
    }

    // Set up storage bucket
    const { data: buckets, error: bucketsError } = await supabaseAdmin.storage.listBuckets();
    
    if (bucketsError) {
      console.error('Error listing buckets:', bucketsError);
      return false;
    }

    const profilePhotosBucket = buckets?.find(b => b.name === 'profile-photos');
    
    if (!profilePhotosBucket) {
      const { error: createBucketError } = await supabaseAdmin.storage.createBucket('profile-photos', {
        public: true,
        fileSizeLimit: 5242880,
        allowedMimeTypes: ['image/jpeg', 'image/png']
      });

      if (createBucketError) {
        console.error('Error creating bucket:', createBucketError);
        return false;
      }
    }

    // Create storage policies
    const { error: policyError } = await supabaseAdmin.rpc('exec_sql', {
      sql: `
        -- Create storage policies
        DROP POLICY IF EXISTS "Allow public read access" ON storage.objects;
        CREATE POLICY "Allow public read access"
          ON storage.objects FOR SELECT
          TO anon
          USING (bucket_id = 'profile-photos');

        DROP POLICY IF EXISTS "Allow anonymous uploads" ON storage.objects;
        CREATE POLICY "Allow anonymous uploads"
          ON storage.objects FOR INSERT
          TO anon
          WITH CHECK (
            bucket_id = 'profile-photos' AND
            (storage.foldername(name))[1] = 'public'
          );
      `
    });

    if (policyError) {
      console.error('Error creating policies:', policyError);
      return false;
    }

    console.log('Database initialization completed successfully');
    return true;
  } catch (error) {
    console.error('Database initialization error:', error);
    return false;
  }
}

export default supabaseAdmin;