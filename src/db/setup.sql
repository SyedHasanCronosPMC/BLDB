-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create exec_sql function for initialization
CREATE OR REPLACE FUNCTION exec_sql(sql text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  EXECUTE sql;
END;
$$;

-- Create registrations table
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

-- Create timestamp trigger function
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger
DROP TRIGGER IF EXISTS update_registrations_timestamp ON registrations;
CREATE TRIGGER update_registrations_timestamp
  BEFORE UPDATE ON registrations
  FOR EACH ROW
  EXECUTE FUNCTION update_timestamp();

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

-- Set up storage
DO $$
BEGIN
  -- Create bucket if it doesn't exist
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
END $$;