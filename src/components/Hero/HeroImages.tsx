import { motion } from 'framer-motion';

const HeroImages = () => {
  const images = [
    {
      src: "https://replicate.delivery/pbxt/IJe0XFuBkPWoZPkqxPWMGBDwkQK9J5Ptr9c6oRWrxwrOeHHE/ai-learning.png",
      alt: "AI Learning Assistant",
      className: "absolute top-0 right-0 w-72 h-72 rounded-2xl shadow-neon transform translate-x-1/4 -translate-y-1/4"
    },
    {
      src: "https://replicate.delivery/pbxt/KJf1XFuBkPWoZPkqxPWMGBDwkQK9J5Ptr9c6oRWrxwrOeHHE/code-analysis.png",
      alt: "Code Analysis",
      className: "absolute top-1/2 right-0 w-80 h-80 rounded-2xl shadow-neon transform translate-x-1/3 -translate-y-1/2"
    },
    {
      src: "https://replicate.delivery/pbxt/LJg2XFuBkPWoZPkqxPWMGBDwkQK9J5Ptr9c6oRWrxwrOeHHE/ai-chat.png",
      alt: "AI Chat Interface",
      className: "absolute bottom-0 right-1/4 w-64 h-64 rounded-2xl shadow-neon transform translate-y-1/4"
    }
  ];

  return (
    <div className="relative w-full h-full">
      {images.map((image, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.2 + index * 0.2 }}
          className={image.className}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover rounded-2xl border border-primary/20"
            loading="eager"
          />
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-dark/80 to-transparent backdrop-blur-sm"></div>
        </motion.div>
      ))}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-dark/90"></div>
    </div>
  );
};

export default HeroImages;