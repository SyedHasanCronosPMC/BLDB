import { motion } from 'framer-motion';
import PricingCard from './PricingCard';

const Pricing = () => {
  const plans = [
    {
      title: "Monthly Plan",
      price: "$49",
      period: "month",
      description: "Perfect for individuals starting their learning journey",
      features: [
        { text: "AI-Powered Learning Paths", included: true },
        { text: "Progress Analytics", included: true },
        { text: "Community Access", included: true },
        { text: "LinkedIn Integration", included: true },
        { text: "Priority Support", included: false },
        { text: "Custom Learning Tracks", included: false },
        { text: "Team Collaboration", included: false },
        { text: "API Access", included: false }
      ]
    },
    {
      title: "Lifetime Access",
      price: "$999",
      period: "one-time",
      description: "Best value for serious learners",
      features: [
        { text: "AI-Powered Learning Paths", included: true },
        { text: "Progress Analytics", included: true },
        { text: "Community Access", included: true },
        { text: "LinkedIn Integration", included: true },
        { text: "Priority Support", included: true },
        { text: "Custom Learning Tracks", included: true },
        { text: "Team Collaboration", included: true },
        { text: "API Access", included: true }
      ],
      isPopular: true
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
            Investment in Your Future
          </h2>
          <p className="text-xl text-light/70 max-w-2xl mx-auto">
            Choose the plan that best fits your learning journey
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <PricingCard key={index} {...plan} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;