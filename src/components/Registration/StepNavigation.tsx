import { motion } from 'framer-motion';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  isNextDisabled: boolean;
}

const StepNavigation = ({
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  isNextDisabled
}: StepNavigationProps) => {
  return (
    <div className="flex justify-between items-center mt-8">
      {currentStep > 0 ? (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onPrevious}
          className="px-6 py-3 flex items-center gap-2 text-light/70 hover:text-light transition-colors"
        >
          <FaArrowLeft />
          Previous
        </motion.button>
      ) : (
        <div className="w-24"></div>
      )}

      <div className="flex gap-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentStep
                ? 'bg-primary'
                : index < currentStep
                ? 'bg-primary/50'
                : 'bg-primary/20'
            }`}
          />
        ))}
      </div>

      {currentStep < totalSteps - 1 ? (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
          disabled={isNextDisabled}
          className={`px-6 py-3 flex items-center gap-2 ${
            isNextDisabled
              ? 'text-light/30 cursor-not-allowed'
              : 'text-light/70 hover:text-light'
          } transition-colors`}
        >
          Next
          <FaArrowRight />
        </motion.button>
      ) : (
        <div className="w-24"></div>
      )}
    </div>
  );
};

export default StepNavigation;