import { motion } from 'framer-motion';

interface ProgressIndicatorProps {
  progress: number;
}

const ProgressIndicator = ({ progress }: ProgressIndicatorProps) => {
  return (
    <div className="relative w-full h-2 bg-dark/40 rounded-full overflow-hidden mb-8">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5 }}
        className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-secondary rounded-full"
      />
      <div className="absolute inset-0 flex items-center justify-end pr-2">
        <span className="text-xs font-semibold text-light/70">{progress}%</span>
      </div>
    </div>
  );
};

export default ProgressIndicator;