import { motion } from 'framer-motion';
import { FaArrowRight, FaCode, FaUsers } from 'react-icons/fa';

const VisionCTA = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark/95 to-dark" />
      
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto bg-dark/40 backdrop-blur-xl rounded-2xl border border-primary/20 p-12 relative overflow-hidden"
        >
          {/* Animated background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary/30 rounded-full filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary/30 rounded-full filter blur-3xl opacity-20 translate-x-1/2 translate-y-1/2" />
          </div>

          <div className="relative z-10">
            <div className="flex flex-wrap gap-8 items-center justify-center mb-12">
              <div className="text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCode className="text-4xl text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-light">Anyone Can Code</h3>
              </div>
              <div className="text-4xl text-primary">+</div>
              <div className="text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaUsers className="text-4xl text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-light">OG Community</h3>
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-light to-secondary-light">
                Ready to Build Your Future?
              </h2>
              <p className="text-xl text-light/70 mb-8 max-w-2xl mx-auto">
                Join our community of builders and turn your ideas into reality. No coding experience required - just bring your passion and creativity.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-primary to-secondary rounded-full font-semibold text-white shadow-neon hover:shadow-neon-strong transition-all duration-300 flex items-center gap-2 mx-auto group"
              >
                Join the Community
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VisionCTA;