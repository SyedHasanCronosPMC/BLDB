import { motion } from 'framer-motion';

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Stars background */}
      <div className="absolute inset-0 bg-[url('https://buildschool.net/assets/stars.svg')] bg-repeat opacity-50" />

      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark/95 to-dark opacity-90" />

      {/* Animated particles */}
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary/20 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: [null, -500],
            opacity: [0.7, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 20,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Animated shooting stars */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute w-px h-px bg-primary"
          initial={{
            x: -100,
            y: Math.random() * window.innerHeight,
            scale: 0.1,
          }}
          animate={{
            x: window.innerWidth + 100,
            y: [null, Math.random() * window.innerHeight + 500],
            scale: [0.1, 0.5, 0.1],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 2 + 3,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10,
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBackground;