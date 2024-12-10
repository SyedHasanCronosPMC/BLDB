import { useState } from 'react';
import { FaPlay, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import WaitlistForm from '../WaitlistForm/WaitlistForm';

const Hero = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  return (
    <section className="relative min-h-screen overflow-hidden">
      <WaitlistForm isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />
      
      <div className="relative container mx-auto px-4 pt-32 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="z-10"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <span className="px-4 py-2 rounded-full bg-[#0066FF]/10 border border-[#0066FF]/20 text-[#0066FF] text-sm font-semibold">
                The Future of Learning is Here
              </span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-6xl font-bold mb-6 leading-tight"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0066FF] via-[#00A3FF] to-[#00C2FF]">
                Transform Your Learning
              </span>
              <br />
              <span className="text-white">
                with AI-Powered Education
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl mb-8 text-white/80 max-w-xl"
            >
              Join the next generation of learners using AI to accelerate their growth and connect with a global community of innovators.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={() => setIsWaitlistOpen(true)}
                className="px-8 py-4 bg-gradient-to-r from-[#0066FF] to-[#00C2FF] rounded-full font-semibold text-white shadow-[0_0_20px_rgba(0,102,255,0.5)] hover:shadow-[0_0_30px_rgba(0,102,255,0.8)] transition-all duration-300 flex items-center gap-2 group"
              >
                Join the Waitlist
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => setIsPlaying(true)}
                className="px-8 py-4 border border-[#0066FF]/20 rounded-full font-semibold text-white hover:bg-[#0066FF]/10 transition-all duration-300 flex items-center gap-2 group"
              >
                <div className="w-8 h-8 rounded-full bg-[#0066FF] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FaPlay className="text-white ml-1" size={12} />
                </div>
                Watch Demo
              </button>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="relative h-[600px] flex items-center justify-center"
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              <img
                src="https://i.ibb.co/SQMqZvJ/buildschool-hero.png"
                alt="BuildSchool AI Day"
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="p-8 bg-dark/40 backdrop-blur-xl rounded-2xl border border-[#0066FF]/20 shadow-[0_0_20px_rgba(0,102,255,0.5)]">
                  <h3 className="text-2xl font-bold text-white mb-2">Build with AI</h3>
                  <p className="text-white/80">Master GenAI & learn to build use-cases with it in 3 months!</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;