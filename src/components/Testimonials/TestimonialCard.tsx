import { motion } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa';

interface TestimonialCardProps {
  name: string;
  role: string;
  company: string;
  image: string;
  quote: string;
  index: number;
  variant?: 'primary' | 'secondary';
}

const TestimonialCard = ({ name, role, company, image, quote, index, variant = 'primary' }: TestimonialCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/80 rounded-2xl blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
      <div className={`relative ${
        variant === 'primary' 
          ? 'bg-dark/40 backdrop-blur-xl border-primary/20' 
          : 'bg-dark/20 backdrop-blur-lg border-primary/10'
        } rounded-2xl border shadow-lg hover:shadow-neon transition-all duration-500 p-6`}
      >
        <FaQuoteLeft className="text-primary/30 text-4xl mb-4" />
        <p className="text-light/90 mb-6 leading-relaxed">{quote}</p>
        <div className="flex items-center">
          <img
            src={image}
            alt={name}
            className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
          />
          <div className="ml-4">
            <h4 className="font-semibold text-light">{name}</h4>
            <p className="text-light/70 text-sm">{role}</p>
            <p className="text-primary/70 text-sm">{company}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;