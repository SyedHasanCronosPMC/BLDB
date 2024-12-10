import { motion } from 'framer-motion';
import { FaRobot, FaUsers, FaChartLine, FaLightbulb } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import BenefitCard from './BenefitCard';

const Benefits = () => {
  const navigate = useNavigate();
  
  const benefits = [
    {
      icon: <FaRobot size={48} />,
      title: "AI-Powered Personal Learning Assistant",
      description: "Experience a revolutionary learning companion that adapts to your style, predicts your needs, and guides your journey with cutting-edge AI technology.",
      image: "https://replicate.delivery/pbxt/8JRdMUFtq5ZCPCqxPWMGBDwkQK9J5Ptr9c6oRWrxwrOeHHE/out-0.png",
      stats: [
        { value: "93%", label: "Learning Efficiency" },
        { value: "2.5x", label: "Faster Progress" }
      ]
    },
    {
      icon: <FaUsers size={48} />,
      title: "Global Innovation Network",
      description: "Join an elite community of forward-thinking learners. Connect, collaborate, and grow with peers who are shaping the future of technology.",
      image: "https://replicate.delivery/pbxt/9KRdMUFtq5ZCPCqxPWMGBDwkQK9J5Ptr9c6oRWrxwrOeHHE/out-0.png",
      stats: [
        { value: "50K+", label: "Active Learners" },
        { value: "120+", label: "Countries" }
      ]
    },
    {
      icon: <FaChartLine size={48} />,
      title: "Real-time Growth Analytics",
      description: "Watch your skills evolve with advanced progress tracking. Get actionable insights and personalized recommendations based on your learning patterns.",
      image: "https://replicate.delivery/pbxt/0LRdMUFtq5ZCPCqxPWMGBDwkQK9J5Ptr9c6oRWrxwrOeHHE/out-0.png",
      stats: [
        { value: "360°", label: "Skill Analysis" },
        { value: "24/7", label: "Progress Tracking" }
      ]
    },
    {
      icon: <FaLightbulb size={48} />,
      title: "Predictive Career Guidance",
      description: "Stay ahead of industry trends with AI-powered career insights. Get personalized recommendations for skills that will shape your future.",
      image: "https://replicate.delivery/pbxt/1MRdMUFtq5ZCPCqxPWMGBDwkQK9J5Ptr9c6oRWrxwrOeHHE/out-0.png",
      stats: [
        { value: "97%", label: "Career Relevance" },
        { value: "85%", label: "Success Rate" }
      ]
    }
  ];

  return (
    <section className="py-32 bg-dark relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-primary/10 to-dark/90"></div>
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: [null, Math.random() * -500],
              opacity: [0.7, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block mb-6"
          >
            <span className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary-light text-sm font-semibold">
              Revolutionary Learning Experience
            </span>
          </motion.div>
          <h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-light to-secondary-light">
            Why Choose BuildSchool?
          </h2>
          <p className="text-xl text-light/70 max-w-2xl mx-auto">
            Experience the future of learning with our cutting-edge platform designed to accelerate your growth
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} {...benefit} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 p-8 rounded-2xl bg-dark/40 backdrop-blur-xl border border-primary/20 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 transform group-hover:scale-105 transition-transform duration-500"></div>
          <div className="relative z-10 text-center">
            <h3 className="text-3xl font-bold mb-4 text-gradient">
              Ready to Transform Your Learning Journey?
            </h3>
            <p className="text-light/70 mb-8 max-w-2xl mx-auto">
              Join thousands of learners who are already experiencing the future of education with BuildSchool.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/register')}
              className="px-8 py-4 bg-gradient-to-r from-primary to-secondary rounded-full font-semibold text-white shadow-neon hover:shadow-neon-strong transition-all duration-300"
            >
              Start Learning Now
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Benefits;