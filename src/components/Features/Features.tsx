import { motion } from 'framer-motion';
import { FaRobot, FaBrain, FaChartLine, FaUsers, FaCode, FaGraduationCap } from 'react-icons/fa';

const Features = () => {
  const features = [
    {
      icon: <FaRobot />,
      title: "AI-Powered Learning",
      description: "Personalized learning paths adapted to your pace and style",
      image: "https://buildschool.net/assets/ai-learning.webp",
      color: "from-[#0066FF] to-[#00A3FF]"
    },
    {
      icon: <FaBrain />,
      title: "Real-world Projects",
      description: "Build practical applications with cutting-edge AI technologies",
      image: "https://buildschool.net/assets/projects.webp",
      color: "from-[#00A3FF] to-[#00C2FF]"
    },
    {
      icon: <FaChartLine />,
      title: "Progress Tracking",
      description: "Monitor your growth with advanced analytics and insights",
      image: "https://buildschool.net/assets/progress.webp",
      color: "from-[#00C2FF] to-[#0066FF]"
    },
    {
      icon: <FaUsers />,
      title: "Community Learning",
      description: "Connect with peers and learn together in a collaborative environment",
      image: "https://buildschool.net/assets/community.webp",
      color: "from-[#0066FF] to-[#00C2FF]"
    },
    {
      icon: <FaCode />,
      title: "Hands-on Practice",
      description: "Get immediate feedback on your code and projects",
      image: "https://buildschool.net/assets/practice.webp",
      color: "from-[#00A3FF] to-[#00C2FF]"
    },
    {
      icon: <FaGraduationCap />,
      title: "Expert Mentorship",
      description: "Learn from industry professionals and AI experts",
      image: "https://buildschool.net/assets/mentorship.webp",
      color: "from-[#00C2FF] to-[#0066FF]"
    }
  ];

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#0066FF] to-[#00C2FF]">
            Why Choose BuildSchool?
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Experience the future of learning with our cutting-edge platform
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
              <div className="relative bg-dark/40 backdrop-blur-xl rounded-2xl border border-[#0066FF]/20 overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent" />
                </div>
                <div className="p-6">
                  <div className={`text-3xl mb-4 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
                  <p className="text-white/70">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;