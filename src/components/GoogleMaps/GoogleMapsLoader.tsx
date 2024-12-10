import { useEffect, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface GoogleMapsLoaderProps {
  children: React.ReactNode;
}

const GoogleMapsLoader = ({ children }: GoogleMapsLoaderProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      version: 'weekly',
      libraries: ['places']
    });

    loader.load()
      .then(() => setIsLoaded(true))
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return <div className="text-red-500">Error loading Google Maps: {error}</div>;
  }

  if (!isLoaded) {
    return <div className="text-light/70">Loading maps...</div>;
  }

  return <>{children}</>;
};

export default GoogleMapsLoader;