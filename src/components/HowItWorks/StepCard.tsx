import { motion } from 'framer-motion';

interface StepCardProps {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  index: number;
}

const StepCard = ({ number, title, description, icon, image, index }: StepCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/80 rounded-2xl blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
      <div className="relative bg-dark/40 backdrop-blur-xl rounded-2xl border border-primary/20 shadow-lg hover:shadow-neon transition-all duration-500">
        <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-light font-bold shadow-neon z-10">
          {number}
        </div>
        <div className="h-48 overflow-hidden rounded-t-2xl">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark/20 to-dark/90"></div>
        </div>
        <div className="p-6">
          <div className="text-primary-light mb-4 group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
          <h3 className="text-2xl font-bold mb-3 text-gradient">{title}</h3>
          <p className="text-light/70 leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default StepCard;