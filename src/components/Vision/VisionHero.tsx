import { motion } from 'framer-motion';
import { FaCode, FaUsers, FaRocket } from 'react-icons/fa';

const VisionHero = () => {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden py-20">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark/95 to-dark opacity-90" />
        <div className="absolute inset-0 bg-[url('https://buildschool.net/assets/grid.svg')] bg-repeat opacity-10" />
      </div>

      {/* Floating code symbols */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-primary/20 text-xl"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: [null, -100],
            opacity: [0.7, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {"{"}
        </motion.div>
      ))}

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span className="inline-block px-6 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary-light text-sm font-semibold mb-6">
              Our Vision
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-light to-secondary-light">
                Building Tomorrow's
              </span>
              <br />
              <span className="text-light">
                Tech Leaders Today
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/80 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
              <div className="relative bg-dark/40 backdrop-blur-xl rounded-2xl border border-primary/20 p-8 h-full">
                <div className="text-4xl text-primary mb-4">
                  <FaUsers />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gradient">OG Builder Community</h3>
                <p className="text-light/70 leading-relaxed">
                  Join our handpicked community of diverse builders turning innovative ideas into reality. Together, we're creating the next generation of tech solutions.
                </p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/80 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
              <div className="relative bg-dark/40 backdrop-blur-xl rounded-2xl border border-primary/20 p-8 h-full">
                <div className="text-4xl text-primary mb-4">
                  <FaCode />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gradient">Tech for Everyone</h3>
                <p className="text-light/70 leading-relaxed">
                  We believe anyone can code. Our mission is to democratize tech knowledge and empower individuals from all walks of life to build their digital future.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12"
          >
            <button className="px-8 py-4 bg-gradient-to-r from-primary to-secondary rounded-full font-semibold text-white shadow-neon hover:shadow-neon-strong transition-all duration-300 flex items-center gap-2 mx-auto group">
              <span>Start Building</span>
              <FaRocket className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VisionHero;