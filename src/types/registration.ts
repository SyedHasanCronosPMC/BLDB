export interface RegistrationFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: { value: string; label: string } | null;
  linkedinUrl: string;
  education: string;
  currentRole: string;
  experience: { value: string; label: string } | null;
  interests: Array<{ value: string; label: string }>;
  address: string;
  latitude: number;
  longitude: number;
  photo?: File;
}

export interface RegistrationData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  country: string;
  linkedin_url?: string;  // Changed from linkedin_profile
  education: string;  // Changed from educational_background
  role: string;  // Changed from current_position
  experience: string;  // Changed from work_experience
  interests: string[];  // Changed from interest_areas
  address: string;  // Changed from location_address
  latitude: number;  // Changed from location_lat
  longitude: number;  // Changed from location_lng
  photo_url?: string;
}