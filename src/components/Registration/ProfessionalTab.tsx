import Select from 'react-select';

interface ProfessionalTabProps {
  formData: any;
  onChange: (data: any) => void;
}

const ProfessionalTab = ({ formData, onChange }: ProfessionalTabProps) => {
  const experienceOptions = [
    { value: '0-1', label: '0-1 years' },
    { value: '1-3', label: '1-3 years' },
    { value: '3-5', label: '3-5 years' },
    { value: '5-10', label: '5-10 years' },
    { value: '10+', label: '10+ years' }
  ];

  const interestOptions = [
    { value: 'ai', label: 'Artificial Intelligence' },
    { value: 'web', label: 'Web Development' },
    { value: 'mobile', label: 'Mobile Development' },
    { value: 'cloud', label: 'Cloud Computing' },
    { value: 'security', label: 'Cybersecurity' },
    { value: 'data', label: 'Data Science' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-light/70 mb-2">LinkedIn URL</label>
        <input
          type="url"
          value={formData.linkedinUrl}
          onChange={(e) => onChange({ ...formData, linkedinUrl: e.target.value })}
          className="w-full px-4 py-2 bg-dark/50 border border-primary/20 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none text-light"
          required
        />
      </div>
      <div>
        <label className="block text-light/70 mb-2">Education</label>
        <input
          type="text"
          value={formData.education}
          onChange={(e) => onChange({ ...formData, education: e.target.value })}
          className="w-full px-4 py-2 bg-dark/50 border border-primary/20 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none text-light"
          required
        />
      </div>
      <div>
        <label className="block text-light/70 mb-2">Current Role</label>
        <input
          type="text"
          value={formData.currentRole}
          onChange={(e) => onChange({ ...formData, currentRole: e.target.value })}
          className="w-full px-4 py-2 bg-dark/50 border border-primary/20 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none text-light"
          required
        />
      </div>
      <div>
        <label className="block text-light/70 mb-2">Years of Experience</label>
        <Select
          options={experienceOptions}
          value={formData.experience}
          onChange={(option) => onChange({ ...formData, experience: option })}
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
      <div>
        <label className="block text-light/70 mb-2">Areas of Interest</label>
        <Select
          isMulti
          options={interestOptions}
          value={formData.interests}
          onChange={(options) => onChange({ ...formData, interests: options })}
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
            multiValue: (base) => ({
              ...base,
              backgroundColor: 'rgba(99, 102, 241, 0.2)',
            }),
            multiValueLabel: (base) => ({
              ...base,
              color: 'white',
            }),
            multiValueRemove: (base) => ({
              ...base,
              color: 'white',
              ':hover': {
                backgroundColor: 'rgba(99, 102, 241, 0.4)',
                color: 'white',
              },
            })
          }}
        />
      </div>
    </div>
  );
};

export default ProfessionalTab;