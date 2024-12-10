import AddressMap from '../GoogleMaps/AddressMap';
import GoogleMapsLoader from '../GoogleMaps/GoogleMapsLoader';

interface LocationTabProps {
  formData: any;
  onChange: (data: any) => void;
}

const LocationTab = ({ formData, onChange }: LocationTabProps) => {
  const handleAddressSelect = (address: string, lat: number, lng: number) => {
    onChange({
      ...formData,
      address,
      latitude: lat,
      longitude: lng
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-light/70 mb-2">Address</label>
        <input
          type="text"
          value={formData.address}
          onChange={(e) => onChange({ ...formData, address: e.target.value })}
          className="w-full px-4 py-2 bg-dark/50 border border-primary/20 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none text-light"
          placeholder="Search or select on map"
          required
        />
      </div>
      <GoogleMapsLoader>
        <AddressMap onAddressSelect={handleAddressSelect} />
      </GoogleMapsLoader>
    </div>
  );
};

export default LocationTab;