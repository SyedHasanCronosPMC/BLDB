import { motion } from 'framer-motion';
import { FaUsers, FaGlobe, FaLaptopCode, FaRocket } from 'react-icons/fa';

const stats = [
  {
    icon: <FaUsers />,
    value: "500+",
    label: "Active Builders",
    description: "Growing community of innovators"
  },
  {
    icon: <FaGlobe />,
    value: "40+",
    label: "Countries",
    description: "Global diverse perspectives"
  },
  {
    icon: <FaLaptopCode />,
    value: "100+",
    label: "Projects Launched",
    description: "Ideas brought to life"
  },
  {
    icon: <FaRocket />,
    value: "85%",
    label: "Success Rate",
    description: "Builders achieving their goals"
  }
];

const VisionStats = () => {
  return (
    <section className="py-20 bg-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-primary/10 to-dark/90" />
      
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/80 rounded-xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
              <div className="relative bg-dark/40 backdrop-blur-xl rounded-xl border border-primary/20 p-6 text-center">
                <div className="text-3xl text-primary mb-4 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary-light to-secondary-light">
                  {stat.value}
                </div>
                <div className="text-xl font-semibold text-light mb-2">
                  {stat.label}
                </div>
                <div className="text-light/70">
                  {stat.description}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisionStats;