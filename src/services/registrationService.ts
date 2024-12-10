import { supabase } from '../lib/supabase';
import type { RegistrationData } from '../types/registration';

export const createRegistration = async (data: RegistrationData): Promise<RegistrationData> => {
  try {
    console.log('Starting registration with data:', data); // Debug log

    let photoUrl = undefined;
    
    // Upload photo if exists
    if (data.photo_url && data.photo_url.startsWith('blob:')) {
      try {
        console.log('Uploading photo...'); // Debug log
        const file = await fetch(data.photo_url).then(res => res.blob());
        const fileExt = file.type.split('/')[1];
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `public/${fileName}`;
        
        const { error: uploadError } = await supabase.storage
          .from('profile-photos')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false,
            contentType: file.type
          });

        if (uploadError) {
          console.error('Photo upload error:', uploadError);
          throw uploadError;
        }

        const { data: { publicUrl } } = supabase.storage
          .from('profile-photos')
          .getPublicUrl(filePath);
        photoUrl = publicUrl;
        console.log('Photo uploaded successfully:', photoUrl); // Debug log
      } catch (uploadError) {
        console.error('Photo upload failed:', uploadError);
        throw new Error('Failed to upload profile photo');
      }
    }

    // Prepare registration data
    const registrationData = {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone: data.phone,
      country: data.country,
      linkedin_url: data.linkedin_url,
      education: data.education,
      role: data.role,
      experience: data.experience,
      interests: data.interests,
      address: data.address,
      latitude: data.latitude,
      longitude: data.longitude,
      photo_url: photoUrl
    };

    console.log('Inserting registration data:', registrationData); // Debug log

    // Test table access
    const { data: testData, error: testError } = await supabase
      .from('registrations')
      .select('*')
      .limit(1);

    if (testError) {
      console.error('Table access error:', testError);
      throw new Error('Failed to access registrations table');
    }

    console.log('Table access successful:', testData); // Debug log

    // Insert registration data
    const { data: registration, error: insertError } = await supabase
      .from('registrations')
      .insert([registrationData])
      .select()
      .single();

    if (insertError) {
      console.error('Registration insert error:', {
        error: insertError,
        message: insertError.message,
        details: insertError.details,
        hint: insertError.hint,
        code: insertError.code
      });
      throw new Error(`Failed to create registration: ${insertError.message}`);
    }

    if (!registration) {
      throw new Error('Registration failed - no data returned');
    }

    console.log('Registration successful:', registration); // Debug log
    return registration;
  } catch (error: any) {
    console.error('Registration error:', {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
      fullError: error
    });
    throw error;
  }
};