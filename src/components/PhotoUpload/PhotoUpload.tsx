import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCloudUploadAlt, FaImage, FaTimes, FaUser } from 'react-icons/fa';

interface PhotoUploadProps {
  onPhotoSelect: (file: File) => void;
  onError?: (error: string) => void;
}

const PhotoUpload = ({ onPhotoSelect, onError }: PhotoUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      onError?.('File size must be less than 5MB');
      return false;
    }

    // Check file type
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      onError?.('Please upload a JPEG or PNG file');
      return false;
    }

    return true;
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      if (validateFile(file)) {
        handleFile(file);
      }
    } else {
      onError?.('Please upload an image file');
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (validateFile(file)) {
        handleFile(file);
      }
    }
  };

  const handleFile = (file: File) => {
    onPhotoSelect(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {!preview ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`relative border-2 border-dashed rounded-2xl p-8 text-center ${
              isDragging 
                ? 'border-primary bg-primary/10' 
                : 'border-primary/20 hover:border-primary/40'
            } transition-colors`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            style={{ minHeight: '400px' }}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileInput}
              accept="image/jpeg,image/png"
              className="hidden"
            />
            <div className="space-y-6 flex flex-col items-center justify-center h-full">
              <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center border-2 border-dashed border-primary/20">
                <FaUser className="text-6xl text-primary/50" />
              </div>
              <div>
                <p className="text-xl font-semibold text-light mb-2">
                  Upload Your Headshot
                </p>
                <p className="text-light/70 mb-4">
                  Add a professional photo of yourself
                </p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-6 py-3 bg-primary/10 rounded-full text-primary hover:bg-primary/20 transition-colors inline-flex items-center gap-2"
                >
                  <FaCloudUploadAlt className="text-xl" />
                  Choose Photo
                </button>
              </div>
              <div className="text-sm text-light/50 space-y-2">
                <p>Drag and drop your photo here or click the button above</p>
                <p>Maximum file size: 5MB</p>
                <p>Supported formats: JPG, PNG</p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative"
          >
            <div className="relative overflow-hidden border border-primary/20 group rounded-2xl" style={{ height: '400px' }}>
              <div className="w-full h-full flex items-center justify-center bg-dark/40">
                <img
                  src={preview}
                  alt="Preview"
                  className="h-full w-auto object-contain"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                  <div className="flex items-center text-light">
                    <FaImage className="mr-2" />
                    <span>Profile Photo</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="p-2 bg-primary/20 rounded-full text-light hover:bg-primary/40 transition-colors"
                      title="Change Photo"
                    >
                      <FaCloudUploadAlt />
                    </button>
                    <button
                      onClick={removePhoto}
                      className="p-2 bg-dark/80 rounded-full text-light/70 hover:text-red-500 transition-colors"
                      title="Remove Photo"
                    >
                      <FaTimes />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PhotoUpload;