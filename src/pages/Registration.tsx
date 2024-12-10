import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { createRegistration } from '../services/registrationService';
import type { RegistrationData, RegistrationFormData } from '../types/registration';
import RegistrationTabs from '../components/Registration/RegistrationTabs';
import ProfileTab from '../components/Registration/ProfileTab';
import ContactTab from '../components/Registration/ContactTab';
import ProfessionalTab from '../components/Registration/ProfessionalTab';
import LocationTab from '../components/Registration/LocationTab';

const Registration = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<RegistrationFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: null,
    linkedinUrl: '',
    education: '',
    currentRole: '',
    experience: null,
    interests: [],
    address: '',
    latitude: 0,
    longitude: 0,
    photo: undefined
  });

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName) {
      throw new Error('Please enter your full name');
    }
    if (!formData.email) {
      throw new Error('Please enter your email address');
    }
    if (!formData.phone) {
      throw new Error('Please enter your phone number');
    }
    if (!formData.country) {
      throw new Error('Please select your country');
    }
    if (!formData.linkedinUrl) {
      throw new Error('Please enter your LinkedIn profile URL');
    }
    if (!formData.education) {
      throw new Error('Please enter your educational background');
    }
    if (!formData.currentRole) {
      throw new Error('Please enter your current role');
    }
    if (!formData.experience) {
      throw new Error('Please select your years of experience');
    }
    if (!formData.address || !formData.latitude || !formData.longitude) {
      throw new Error('Please select your location on the map');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    
    try {
      console.log('Form data before validation:', formData);
      validateForm();

      const registrationData: RegistrationData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        country: formData.country?.value || '',
        linkedin_url: formData.linkedinUrl,
        education: formData.education,
        role: formData.currentRole,
        experience: formData.experience?.value || '',
        interests: formData.interests.map(i => i.value),
        address: formData.address,
        latitude: formData.latitude,
        longitude: formData.longitude,
        photo_url: formData.photo ? URL.createObjectURL(formData.photo) : undefined
      };

      console.log('Registration data before submission:', registrationData);

      await createRegistration(registrationData);
      
      alert('Registration successful! Welcome to BuildSchool.');
      navigate('/');
    } catch (error: any) {
      const message = error?.message || 'Registration failed. Please try again.';
      setError(message);
      console.error('Registration error:', {
        message: error?.message,
        details: error?.details,
        fullError: error
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-light to-secondary-light">
            Join BuildSchool
          </h1>
          <p className="text-xl text-light/70">
            Complete your profile to start your AI-powered learning journey
          </p>
        </motion.div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <RegistrationTabs formData={formData}>
            <ProfileTab formData={formData} onChange={setFormData} />
            <ContactTab formData={formData} onChange={setFormData} />
            <ProfessionalTab formData={formData} onChange={setFormData} />
            <LocationTab formData={formData} onChange={setFormData} />
          </RegistrationTabs>

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-8 py-4 bg-gradient-to-r from-primary to-secondary rounded-full font-semibold text-white shadow-neon hover:shadow-neon-strong transition-all duration-300 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Registering...' : 'Complete Registration'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;