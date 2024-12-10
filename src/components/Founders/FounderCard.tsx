import { motion } from 'framer-motion';
import { FaLinkedin, FaTwitter } from 'react-icons/fa';

interface FounderCardProps {
  name: string;
  role: string;
  location: string;
  bio: string;
  image: string;
  linkedin: string;
  twitter: string;
  index: number;
}

const FounderCard = ({ name, role, location, bio, image, linkedin, twitter, index }: FounderCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/80 rounded-2xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
      <div className="relative bg-dark/40 backdrop-blur-xl rounded-2xl border border-primary/20 shadow-lg hover:shadow-neon transition-all duration-500 overflow-hidden">
        <div className="h-64 overflow-hidden">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark/20 to-dark/90"></div>
        </div>
        <div className="p-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-2xl font-bold text-gradient">{name}</h3>
              <p className="text-light/70">{role}</p>
              <p className="text-light/50 text-sm">{location}</p>
            </div>
            <div className="flex gap-3">
              <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-light/50 hover:text-primary transition-colors">
                <FaLinkedin size={24} />
              </a>
              <a href={twitter} target="_blank" rel="noopener noreferrer" className="text-light/50 hover:text-primary transition-colors">
                <FaTwitter size={24} />
              </a>
            </div>
          </div>
          <p className="text-light/70 leading-relaxed">{bio}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default FounderCard;