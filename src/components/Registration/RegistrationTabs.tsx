import { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaEnvelope, FaLinkedin, FaMapMarkerAlt } from 'react-icons/fa';
import { classNames } from '../../utils/classNames';
import ProgressIndicator from './ProgressIndicator';
import StepNavigation from './StepNavigation';

interface TabData {
  icon: JSX.Element;
  title: string;
  description: string;
  isComplete: boolean;
}

interface RegistrationTabsProps {
  children: React.ReactNode[];
  formData: any;
  onTabChange?: (index: number) => void;
}

const RegistrationTabs = ({ children, formData, onTabChange }: RegistrationTabsProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const tabs: TabData[] = [
    {
      icon: <FaUser />,
      title: "Profile",
      description: "Basic information and photo",
      isComplete: Boolean(formData.firstName && formData.lastName && formData.photo)
    },
    {
      icon: <FaEnvelope />,
      title: "Contact",
      description: "Contact details",
      isComplete: Boolean(formData.email && formData.phone && formData.country)
    },
    {
      icon: <FaLinkedin />,
      title: "Professional",
      description: "Work experience and skills",
      isComplete: Boolean(
        formData.linkedinUrl &&
        formData.education &&
        formData.currentRole &&
        formData.experience &&
        formData.interests.length > 0
      )
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Location",
      description: "Address and map",
      isComplete: Boolean(formData.address && formData.latitude && formData.longitude)
    }
  ];

  useEffect(() => {
    const completedTabs = tabs.filter(tab => tab.isComplete).length;
    setProgress(Math.round((completedTabs / tabs.length) * 100));
  }, [formData]);

  const handleTabChange = (index: number) => {
    setSelectedIndex(index);
    onTabChange?.(index);
  };

  const handleNext = () => {
    if (selectedIndex < tabs.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const isNextDisabled = !tabs[selectedIndex].isComplete;

  return (
    <div className="w-full">
      <ProgressIndicator progress={progress} />
      
      <Tab.Group selectedIndex={selectedIndex} onChange={handleTabChange}>
        <Tab.List className="flex space-x-4 mb-8 overflow-x-auto pb-4">
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              className={({ selected }) =>
                classNames(
                  'flex-1 min-w-[200px] relative rounded-xl p-6 focus:outline-none transition-all duration-300',
                  selected
                    ? 'bg-primary/10 border-primary shadow-neon'
                    : tab.isComplete
                    ? 'bg-green-500/10 border-green-500/50'
                    : 'bg-dark/40 hover:bg-dark/60 border-primary/20',
                  'border backdrop-blur-xl'
                )
              }
            >
              {({ selected }) => (
                <>
                  <div className="absolute top-0 left-0 w-full h-full">
                    <div className={classNames(
                      'absolute inset-0 rounded-xl transition-opacity duration-300',
                      selected ? 'opacity-20' : 'opacity-0'
                    )}>
                      <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary blur-xl"></div>
                    </div>
                  </div>
                  <div className="relative flex flex-col items-center text-center">
                    <div className={classNames(
                      'text-2xl mb-2 transition-colors duration-300',
                      selected ? 'text-primary' : tab.isComplete ? 'text-green-500' : 'text-primary/50'
                    )}>
                      {tab.icon}
                    </div>
                    <div className={classNames(
                      'font-semibold mb-1 transition-colors duration-300',
                      selected ? 'text-light' : tab.isComplete ? 'text-green-500' : 'text-light/70'
                    )}>
                      {tab.title}
                    </div>
                    <div className="text-sm text-light/50">
                      {tab.description}
                    </div>
                    {selected && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute -bottom-4 w-12 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"
                      />
                    )}
                  </div>
                </>
              )}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels>
          <AnimatePresence mode="wait">
            {children.map((child, index) => (
              <Tab.Panel
                key={index}
                static
                className={classNames(
                  selectedIndex === index ? 'block' : 'hidden',
                  'focus:outline-none'
                )}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {child}
                </motion.div>
              </Tab.Panel>
            ))}
          </AnimatePresence>
        </Tab.Panels>

        <StepNavigation
          currentStep={selectedIndex}
          totalSteps={tabs.length}
          onNext={handleNext}
          onPrevious={handlePrevious}
          isNextDisabled={isNextDisabled}
        />
      </Tab.Group>
    </div>
  );
};

export default RegistrationTabs;