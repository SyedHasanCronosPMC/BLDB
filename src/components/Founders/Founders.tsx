import { motion } from 'framer-motion';
import FounderCard from './FounderCard';

const Founders = () => {
  const founders = [
    {
      name: "Dr. Arjun Patel",
      role: "Co-Founder & AI Architect",
      location: "Bangalore, India",
      bio: "Former AI researcher at IIT with a passion for democratizing education. Led groundbreaking projects in adaptive learning systems at Microsoft Research. Believes in the power of AI to personalize education for every learner.",
      image: "https://replicate.delivery/pbxt/2JRdMUFtq5ZCPCqxPWMGBDwkQK9J5Ptr9c6oRWrxwrOeHHE/out-0.png",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com"
    },
    {
      name: "Sarah Mitchell",
      role: "Co-Founder & Product Visionary",
      location: "San Francisco, USA",
      bio: "Stanford CS graduate and former Product Lead at Google Education. Passionate about combining AI with human-centered design to create transformative learning experiences that adapt to each individual's journey.",
      image: "https://replicate.delivery/pbxt/3KRdMUFtq5ZCPCqxPWMGBDwkQK9J5Ptr9c6oRWrxwrOeHHE/out-0.png",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com"
    }
  ];

  return (
    <section className="py-32 bg-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-primary/10 to-dark/90"></div>
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-light to-secondary-light">
            Built by AI Enthusiasts
          </h2>
          <p className="text-xl text-light/70 max-w-2xl mx-auto">
            Meet the visionaries combining AI expertise with a passion for education
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {founders.map((founder, index) => (
            <FounderCard key={index} {...founder} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Founders;