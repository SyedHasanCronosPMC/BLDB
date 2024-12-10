import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Select from 'react-select';
import { countries } from 'countries-list';

interface ContactTabProps {
  formData: any;
  onChange: (data: any) => void;
}

const ContactTab = ({ formData, onChange }: ContactTabProps) => {
  const countryOptions = Object.entries(countries).map(([code, country]) => ({
    value: code,
    label: country.name
  }));

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-light/70 mb-2">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => onChange({ ...formData, email: e.target.value })}
          className="w-full px-4 py-2 bg-dark/50 border border-primary/20 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none text-light"
          required
        />
      </div>
      <div>
        <label className="block text-light/70 mb-2">Phone Number</label>
        <div className="relative">
          <PhoneInput
            country={'us'}
            value={formData.phone}
            onChange={(phone) => onChange({ ...formData, phone })}
            inputClass="!w-full !h-12 !bg-dark/50 !text-light !border-primary/20 !rounded-lg !pl-12 !pr-4"
            buttonClass="!bg-dark/50 !border-primary/20 !rounded-l-lg !border-r-0"
            dropdownClass="!bg-dark !text-light"
            containerClass="!w-full"
            searchClass="!bg-dark/50 !text-light !border-primary/20"
            searchPlaceholder="Search countries..."
            enableSearch={true}
            disableSearchIcon={false}
            countryCodeEditable={false}
            inputProps={{
              required: true,
              autoFocus: false
            }}
            buttonStyle={{
              backgroundColor: 'rgba(15, 23, 42, 0.5)',
              borderColor: 'rgba(99, 102, 241, 0.2)',
              borderRight: 0
            }}
            dropdownStyle={{
              backgroundColor: 'rgb(15, 23, 42)',
              borderColor: 'rgba(99, 102, 241, 0.2)'
            }}
          />
        </div>
      </div>
      <div>
        <label className="block text-light/70 mb-2">Country</label>
        <Select
          options={countryOptions}
          value={formData.country}
          onChange={(option) => onChange({ ...formData, country: option })}
          className="react-select-container"
          classNamePrefix="react-select"
          styles={{
            control: (base) => ({
              ...base,
              backgroundColor: 'rgba(15, 23, 42, 0.5)',
              borderColor: 'rgba(99, 102, 241, 0.2)',
              '&:hover': {
                borderColor: 'rgba(99, 102, 241, 0.4)'
              }
            }),
            menu: (base) => ({
              ...base,
              backgroundColor: 'rgb(15, 23, 42)',
              border: '1px solid rgba(99, 102, 241, 0.2)'
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isFocused ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
              color: 'white'
            }),
            singleValue: (base) => ({
              ...base,
              color: 'white'
            }),
            input: (base) => ({
              ...base,
              color: 'white'
            })
          }}
        />
      </div>
    </div>
  );
};

export default ContactTab;