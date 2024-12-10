import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingCardProps {
  title: string;
  price: string;
  period: string;
  description: string;
  features: PricingFeature[];
  isPopular?: boolean;
  index: number;
}

const PricingCard = ({ title, price, period, description, features, isPopular, index }: PricingCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
      className="relative"
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-to-r from-primary to-secondary px-4 py-1 rounded-full text-sm font-semibold text-white shadow-neon">
            Most Popular
          </span>
        </div>
      )}
      <div className={`relative p-8 rounded-2xl backdrop-blur-xl border ${isPopular ? 'border-primary shadow-neon' : 'border-primary/20'} h-full`}>
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-2 text-gradient">{title}</h3>
          <p className="text-light/70 mb-6">{description}</p>
          <div className="mb-4">
            <span className="text-4xl font-bold text-gradient">{price}</span>
            <span className="text-light/70">/{period}</span>
          </div>
        </div>
        <ul className="space-y-4 mb-8">
          {features.map((feature, idx) => (
            <li key={idx} className={`flex items-center gap-3 ${feature.included ? 'text-light' : 'text-light/50 line-through'}`}>
              <FaCheck className={feature.included ? 'text-primary' : 'text-light/30'} />
              {feature.text}
            </li>
          ))}
        </ul>
        <button className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${
          isPopular 
            ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-neon hover:shadow-neon-strong' 
            : 'border border-primary/20 text-light hover:bg-primary/10'
        }`}>
          Get Started
        </button>
      </div>
    </motion.div>
  );
};

export default PricingCard;