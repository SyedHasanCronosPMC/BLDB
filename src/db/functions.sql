-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create setup function
CREATE OR REPLACE FUNCTION setup_database()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Create registrations table if it doesn't exist
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

  -- Enable RLS
  ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

  -- Create RLS policies
  DROP POLICY IF EXISTS "Allow anonymous insert" ON registrations;
  CREATE POLICY "Allow anonymous insert" ON registrations
    FOR INSERT TO anon
    WITH CHECK (true);

  DROP POLICY IF EXISTS "Allow public read" ON registrations;
  CREATE POLICY "Allow public read" ON registrations
    FOR SELECT TO anon
    USING (true);

  -- Set up storage bucket
  INSERT INTO storage.buckets (id, name, public)
  VALUES ('profile-photos', 'profile-photos', true)
  ON CONFLICT (id) DO UPDATE
  SET public = true,
      file_size_limit = 5242880,
      allowed_mime_types = ARRAY['image/jpeg', 'image/png'];

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
END;
$$;

-- Create timestamp update function
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$;

-- Create trigger
DROP TRIGGER IF EXISTS update_registrations_timestamp ON registrations;
CREATE TRIGGER update_registrations_timestamp
  BEFORE UPDATE ON registrations
  FOR EACH ROW
  EXECUTE FUNCTION update_timestamp();

-- Create column info function
CREATE OR REPLACE FUNCTION get_column_info(p_table_name text)
RETURNS TABLE (
  column_name text,
  data_type text,
  constraints text[]
)
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    c.column_name::text,
    c.data_type::text,
    array_remove(array_agg(DISTINCT CASE
      WHEN c.is_nullable = 'NO' THEN 'NOT NULL'
      WHEN c.column_default IS NOT NULL THEN 'DEFAULT ' || c.column_default
      WHEN tc.constraint_type = 'PRIMARY KEY' THEN 'PRIMARY KEY'
      WHEN tc.constraint_type = 'UNIQUE' THEN 'UNIQUE'
      ELSE NULL
    END), NULL)::text[] AS constraints
  FROM information_schema.columns c
  LEFT JOIN information_schema.constraint_column_usage ccu
    ON c.table_name = ccu.table_name
    AND c.column_name = ccu.column_name
  LEFT JOIN information_schema.table_constraints tc
    ON ccu.constraint_name = tc.constraint_name
  WHERE c.table_name = p_table_name
  AND c.table_schema = 'public'
  GROUP BY c.column_name, c.data_type;
END;
$$;