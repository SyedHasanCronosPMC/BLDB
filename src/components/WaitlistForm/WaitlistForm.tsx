import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactConfetti from 'react-confetti';
import Select from 'react-select';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { countries } from 'countries-list';
import { FaTimes } from 'react-icons/fa';

interface WaitlistFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const WaitlistForm = ({ isOpen, onClose }: WaitlistFormProps) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: null as { value: string; label: string } | null
  });
  const [waitlistNumber, setWaitlistNumber] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const countryOptions = Object.entries(countries).map(([code, country]) => ({
    value: code,
    label: country.name
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomNumber = Math.floor(Math.random() * 1000) + 1;
    setWaitlistNumber(randomNumber);
    setStep('success');
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
        >
          {showConfetti && <ReactConfetti recycle={false} />}
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative w-full max-w-md"
          >
            {/* Blob effects */}
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-primary/30 rounded-full filter blur-3xl opacity-30"></div>
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-secondary/30 rounded-full filter blur-3xl opacity-30"></div>
            
            {/* Form card */}
            <div className="relative bg-dark/80 backdrop-blur-xl border border-primary/20 rounded-2xl shadow-2xl p-8">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-light/50 hover:text-light transition-colors"
              >
                <FaTimes size={20} />
              </button>

              {step === 'form' ? (
                <>
                  <h3 className="text-2xl font-bold mb-6 text-gradient text-center">
                    Join the Waitlist
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-light/70 mb-2">Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2 bg-dark/50 border border-primary/20 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none text-light"
                      />
                    </div>
                    <div>
                      <label className="block text-light/70 mb-2">Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2 bg-dark/50 border border-primary/20 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none text-light"
                      />
                    </div>
                    <div>
                      <label className="block text-light/70 mb-2">Phone Number</label>
                      <PhoneInput
                        country={'us'}
                        value={formData.phone}
                        onChange={(phone) => setFormData({ ...formData, phone })}
                        containerClass="!w-full"
                        inputClass="!w-full !h-10 !bg-dark/50 !border-primary/20 !text-light"
                        buttonClass="!bg-dark/50 !border-primary/20"
                      />
                    </div>
                    <div>
                      <label className="block text-light/70 mb-2">Country</label>
                      <Select
                        options={countryOptions}
                        value={formData.country}
                        onChange={(option) => setFormData({ ...formData, country: option })}
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
                    <button
                      type="submit"
                      className="w-full py-3 bg-gradient-to-r from-primary to-secondary rounded-lg font-semibold text-white shadow-neon hover:shadow-neon-strong transition-all duration-300"
                    >
                      Join Waitlist
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <span className="text-2xl font-bold text-white">#{waitlistNumber}</span>
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-4 text-gradient">
                    You're on the List!
                  </h3>
                  <p className="text-light/70 mb-6">
                    You're number #{waitlistNumber} on our waitlist. We'll notify you when it's your turn to join BuildSchool!
                  </p>
                  <button
                    onClick={onClose}
                    className="px-6 py-2 border border-primary/20 rounded-lg text-light hover:bg-primary/10 transition-colors"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </motion.div>
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm -z-10"
            onClick={onClose}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WaitlistForm;