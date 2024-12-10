import { motion } from 'framer-motion';

interface Stat {
  value: string;
  label: string;
}

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
  image: string;
  stats: Stat[];
}

const BenefitCard = ({ icon, title, description, index, image, stats }: BenefitCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/80 rounded-2xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
      <div className="relative bg-dark/40 backdrop-blur-xl rounded-2xl border border-primary/20 shadow-lg hover:shadow-neon transition-all duration-500 overflow-hidden h-full">
        <div className="h-48 overflow-hidden relative">
          <motion.img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark/20 to-dark/90"></div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 left-4 right-4 flex justify-between"
          >
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-xl font-bold text-primary-light">{stat.value}</div>
                <div className="text-xs text-light/70">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
        <div className="p-6">
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="text-primary-light mb-4 flex justify-center"
          >
            {icon}
          </motion.div>
          <h3 className="text-xl font-bold mb-3 text-gradient text-center">{title}</h3>
          <p className="text-light/70 leading-relaxed text-center">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default BenefitCard;