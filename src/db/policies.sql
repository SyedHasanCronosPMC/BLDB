-- Enable Row Level Security
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts
CREATE POLICY "Allow anonymous inserts"
ON registrations FOR INSERT
TO anon
WITH CHECK (true);

-- Allow public reads
CREATE POLICY "Allow public reads"
ON registrations FOR SELECT
TO anon
USING (true);

-- Storage policies
CREATE POLICY "Allow anonymous uploads"
ON storage.objects FOR INSERT
TO anon
WITH CHECK (
  bucket_id = 'profile-photos' AND
  (storage.foldername(name))[1] = 'public'
);

CREATE POLICY "Allow public reads of profile photos"
ON storage.objects FOR SELECT
TO anon
USING (bucket_id = 'profile-photos');

-- Create storage bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('profile-photos', 'profile-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Update bucket configuration
UPDATE storage.buckets
SET public = true,
    file_size_limit = 5242880,
    allowed_mime_types = ARRAY['image/jpeg', 'image/png']
WHERE id = 'profile-photos';