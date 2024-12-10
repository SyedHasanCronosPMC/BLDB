import { useState } from 'react';
import PhotoUpload from '../PhotoUpload/PhotoUpload';

interface ProfileTabProps {
  formData: any;
  onChange: (data: any) => void;
}

const ProfileTab = ({ formData, onChange }: ProfileTabProps) => {
  const [photoError, setPhotoError] = useState<string | null>(null);

  const handlePhotoSelect = (file: File) => {
    setPhotoError(null);
    onChange({ ...formData, photo: file });
  };

  const handlePhotoError = (error: string) => {
    setPhotoError(error);
  };

  return (
    <div className="space-y-8">
      {photoError && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500">
          {photoError}
        </div>
      )}
      
      <div className="max-w-xl mx-auto">
        <PhotoUpload 
          onPhotoSelect={handlePhotoSelect} 
          onError={handlePhotoError}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-light/70 mb-2">First Name</label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => onChange({ ...formData, firstName: e.target.value })}
            className="w-full px-4 py-2 bg-dark/50 border border-primary/20 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none text-light"
            required
          />
        </div>
        <div>
          <label className="block text-light/70 mb-2">Last Name</label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => onChange({ ...formData, lastName: e.target.value })}
            className="w-full px-4 py-2 bg-dark/50 border border-primary/20 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none text-light"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;