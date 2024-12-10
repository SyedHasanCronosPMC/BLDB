import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

interface FAQItemProps {
  question: string;
  answer: string;
  category: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

const FAQItem = ({ question, answer, isOpen, onToggle, index }: FAQItemProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="border border-primary/20 rounded-xl overflow-hidden"
  >
    <button
      onClick={onToggle}
      className="w-full px-6 py-4 flex justify-between items-center bg-dark/40 hover:bg-dark/60 transition-colors"
    >
      <span className="text-left font-semibold text-light">{question}</span>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <FaChevronDown className={`transform transition-colors ${isOpen ? 'text-primary' : 'text-light/50'}`} />
      </motion.div>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-6 py-4 bg-dark/20 text-light/70 leading-relaxed">
            {answer}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What makes BuildSchool's AI learning different?",
      answer: "BuildSchool uses advanced AI algorithms to create personalized learning paths, adapt to your learning style, and provide real-time feedback. Our system analyzes your progress and adjusts the curriculum to optimize your learning experience.",
      category: "General"
    },
    {
      question: "How does the LinkedIn integration work?",
      answer: "Our platform seamlessly connects with your LinkedIn profile to analyze industry trends, suggest relevant skills, and help you build a professional network. This integration ensures your learning aligns with current market demands.",
      category: "Features"
    },
    {
      question: "What kind of support do I get?",
      answer: "You'll have access to AI-powered assistance 24/7, a global community of learners, and expert mentors. Premium members also receive priority support and personalized coaching sessions.",
      category: "Support"
    },
    {
      question: "Can I switch between plans?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. When upgrading to lifetime access, we'll prorate your existing subscription and apply it to the lifetime plan.",
      category: "Pricing"
    },
    {
      question: "Is there a refund policy?",
      answer: "We offer a 30-day money-back guarantee for all plans. If you're not satisfied with your learning experience, we'll provide a full refund, no questions asked.",
      category: "Pricing"
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
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-light/70 max-w-2xl mx-auto">
            Find answers to common questions about BuildSchool
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              {...faq}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;