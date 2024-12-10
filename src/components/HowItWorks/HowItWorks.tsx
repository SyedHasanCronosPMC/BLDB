import { motion } from 'framer-motion';
import { FaUserPlus, FaLinkedin, FaChartLine, FaUsers } from 'react-icons/fa';
import StepCard from './StepCard';

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Create Your Profile",
      description: "Set up your personalized learning profile with your goals, interests, and current skill level. Our AI analyzes your inputs to create your optimal learning path.",
      icon: <FaUserPlus size={36} />,
      image: "https://replicate.delivery/pbxt/4KRdMUFtq5ZCPCqxPWMGBDwkQK9J5Ptr9c6oRWrxwrOeHHE/out-0.png"
    },
    {
      number: "02",
      title: "Connect LinkedIn",
      description: "Link your professional profile to unlock powerful networking features and receive AI-powered career insights based on your industry trends.",
      icon: <FaLinkedin size={36} />,
      image: "https://replicate.delivery/pbxt/5LRdMUFtq5ZCPCqxPWMGBDwkQK9J5Ptr9c6oRWrxwrOeHHE/out-0.png"
    },
    {
      number: "03",
      title: "Track Progress",
      description: "Watch your skills grow with our advanced analytics dashboard. Get real-time feedback and adaptive recommendations as you progress.",
      icon: <FaChartLine size={36} />,
      image: "https://replicate.delivery/pbxt/6MRdMUFtq5ZCPCqxPWMGBDwkQK9J5Ptr9c6oRWrxwrOeHHE/out-0.png"
    },
    {
      number: "04",
      title: "Connect & Grow",
      description: "Join a vibrant community of learners. Collaborate on projects, share insights, and build lasting professional relationships.",
      icon: <FaUsers size={36} />,
      image: "https://replicate.delivery/pbxt/7NRdMUFtq5ZCPCqxPWMGBDwkQK9J5Ptr9c6oRWrxwrOeHHE/out-0.png"
    }
  ];

  return (
    <section className="py-32 bg-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-primary/10 to-dark/90"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
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
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-light to-secondary-light">
            Your Learning Journey
          </h2>
          <p className="text-xl text-light/70 max-w-2xl mx-auto">
            Experience a revolutionary approach to learning, powered by AI and designed for your success
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {steps.map((step, index) => (
            <StepCard key={index} {...step} index={index} />
          ))}
        </div>

        {/* Connection Lines */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 transform -translate-y-1/2 hidden lg:block"></div>
      </div>
    </section>
  );
};

export default HowItWorks;