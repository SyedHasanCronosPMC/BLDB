import { useState, useCallback, useRef } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { FaMapMarkerAlt, FaSearch, FaStreetView, FaBuilding } from 'react-icons/fa';

interface AddressMapProps {
  onAddressSelect: (address: string, lat: number, lng: number) => void;
}

const mapContainerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '0.5rem'
};

const defaultCenter = {
  lat: 40.7128,
  lng: -74.0060
};

const AddressMap = ({ onAddressSelect }: AddressMapProps) => {
  const [selectedLocation, setSelectedLocation] = useState(defaultCenter);
  const [markerVisible, setMarkerVisible] = useState(false);
  const [mapType, setMapType] = useState<google.maps.MapTypeId>(google.maps.MapTypeId.ROADMAP);
  const mapRef = useRef<google.maps.Map>();
  const [streetViewVisible, setStreetViewVisible] = useState(false);

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
    cache: 24 * 60 * 60,
  });

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      setSelectedLocation({ lat, lng });
      setMarkerVisible(true);
      onAddressSelect(address, lat, lng);
      
      if (mapRef.current) {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(16);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const onMapClick = useCallback((event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setSelectedLocation({ lat, lng });
      setMarkerVisible(true);

      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === 'OK' && results?.[0]) {
          const address = results[0].formatted_address;
          setValue(address, false);
          onAddressSelect(address, lat, lng);
        }
      });
    }
  }, [onAddressSelect, setValue]);

  const toggleStreetView = () => {
    setStreetViewVisible(!streetViewVisible);
  };

  const toggleMapType = () => {
    setMapType(prev => prev === google.maps.MapTypeId.ROADMAP ? 
      google.maps.MapTypeId.SATELLITE : google.maps.MapTypeId.ROADMAP);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaSearch className="text-light/50" />
        </div>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
          placeholder="Search your address..."
          className="w-full pl-10 pr-4 py-2 bg-dark/50 border border-primary/20 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none text-light"
        />
        {status === 'OK' && (
          <ul className="absolute z-10 w-full mt-1 bg-dark border border-primary/20 rounded-lg shadow-lg max-h-60 overflow-auto">
            {data.map(({ place_id, description }) => (
              <li
                key={place_id}
                onClick={() => handleSelect(description)}
                className="px-4 py-2 hover:bg-primary/10 cursor-pointer text-light/70 hover:text-light transition-colors"
              >
                <FaMapMarkerAlt className="inline mr-2 text-primary" />
                {description}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="rounded-lg overflow-hidden border border-primary/20 relative">
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <button
            onClick={toggleStreetView}
            className="p-2 bg-dark/80 backdrop-blur-sm border border-primary/20 rounded-lg text-light hover:bg-primary/20 transition-colors"
            title={streetViewVisible ? 'Switch to Map View' : 'Switch to Street View'}
          >
            <FaStreetView size={20} />
          </button>
          <button
            onClick={toggleMapType}
            className="p-2 bg-dark/80 backdrop-blur-sm border border-primary/20 rounded-lg text-light hover:bg-primary/20 transition-colors"
            title={mapType === google.maps.MapTypeId.ROADMAP ? 'Switch to Satellite View' : 'Switch to Road View'}
          >
            <FaBuilding size={20} />
          </button>
        </div>

        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={14}
          center={selectedLocation}
          onLoad={onMapLoad}
          onClick={onMapClick}
          mapTypeId={mapType}
          options={{
            styles: [
              {
                featureType: 'all',
                elementType: 'geometry',
                stylers: [{ color: '#242f3e' }]
              },
              {
                featureType: 'all',
                elementType: 'labels.text.stroke',
                stylers: [{ color: '#242f3e' }]
              },
              {
                featureType: 'all',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#746855' }]
              },
              {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{ color: '#17263c' }]
              }
            ],
            zoomControl: true,
            mapTypeControl: false,
            streetViewControl: streetViewVisible,
            fullscreenControl: true,
          }}
        >
          {markerVisible && (
            <Marker
              position={selectedLocation}
              animation={google.maps.Animation.DROP}
              icon={{
                path: google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: '#6366f1',
                fillOpacity: 1,
                strokeColor: '#ffffff',
                strokeWeight: 2,
              }}
            />
          )}
        </GoogleMap>
      </div>
    </div>
  );
};

export default AddressMap;