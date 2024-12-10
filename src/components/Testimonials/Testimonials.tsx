import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import TestimonialCard from './TestimonialCard';

const Testimonials = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const testimonialsPerPage = 6;

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Senior Software Developer",
      company: "TechCorp Inc.",
      image: "https://replicate.delivery/pbxt/4JRdMUFtq5ZCPCqxPWMGBDwkQK9J5Ptr9c6oRWrxwrOeHHE/out-0.png",
      quote: "BuildSchool's AI-powered learning recommendations helped me master new technologies 3x faster than traditional methods. The personalized approach is revolutionary."
    },
    {
      name: "Michael Chen",
      role: "Data Scientist",
      company: "DataFlow Analytics",
      image: "https://replicate.delivery/pbxt/5KRdMUFtq5ZCPCqxPWMGBDwkQK9J5Ptr9c6oRWrxwrOeHHE/out-0.png",
      quote: "The community aspect is incredible. I've connected with amazing peers who've helped me grow. The AI-driven matching system finds perfect study partners."
    },
    {
      name: "Emily Rodriguez",
      role: "UX Designer",
      company: "Creative Solutions",
      image: "https://replicate.delivery/pbxt/6LRdMUFtq5ZCPCqxPWMGBDwkQK9J5Ptr9c6oRWrxwrOeHHE/out-0.png",
      quote: "The progress tracking features keep me motivated. I can literally see my skills growing day by day. It's addictive in the best way possible!"
    },
    {
      name: "David Kim",
      role: "Full Stack Developer",
      company: "StartupHub",
      image: "https://replicate.delivery/pbxt/7MRdMUFtq5ZCPCqxPWMGBDwkQK9J5Ptr9c6oRWrxwrOeHHE/out-0.png",
      quote: "I landed my dream job thanks to BuildSchool. The AI-recommended projects aligned perfectly with industry demands."
    },
    {
      name: "Lisa Patel",
      role: "Machine Learning Engineer",
      company: "AI Innovations",
      image: "https://replicate.delivery/pbxt/8NRdMUFtq5ZCPCqxPWMGBDwkQK9J5Ptr9c6oRWrxwrOeHHE/out-0.png",
      quote: "The depth of content and learning pathways is impressive. It's like having a personal AI mentor guiding you every step of the way."
    },
    {
      name: "James Wilson",
      role: "Cloud Architect",
      company: "CloudTech Solutions",
      image: "https://replicate.delivery/pbxt/9ORdMUFtq5ZCPCqxPWMGBDwkQK9J5Ptr9c6oRWrxwrOeHHE/out-0.png",
      quote: "The platform's ability to adapt to my learning style is remarkable. It's transformed how I approach professional development."
    },
    {
      name: "Ana Martinez",
      role: "Product Manager",
      company: "InnovateCo",
      image: "https://replicate.delivery/pbxt/0PRdMUFtq5ZCPCqxPWMGBDwkQK9J5Ptr9c6oRWrxwrOeHHE/out-0.png",
      quote: "BuildSchool's LinkedIn integration made networking effortless. I've built meaningful connections that accelerated my career growth."
    },
    {
      name: "Tom Anderson",
      role: "DevOps Engineer",
      company: "TechOps Inc.",
      image: "https://replicate.delivery/pbxt/1QRdMUFtq5ZCPCqxPWMGBDwkQK9J5Ptr9c6oRWrxwrOeHHE/out-0.png",
      quote: "The hands-on projects and real-world scenarios prepared me perfectly for my role. The AI feedback system is like having a senior engineer reviewing your work."
    },
    {
      name: "Rachel Chang",
      role: "Frontend Developer",
      company: "WebCraft",
      image: "https://replicate.delivery/pbxt/2RRdMUFtq5ZCPCqxPWMGBDwkQK9J5Ptr9c6oRWrxwrOeHHE/out-0.png",
      quote: "The interactive coding challenges and AI-powered code reviews helped me develop best practices naturally. It's been transformative."
    },
    {
      name: "Marcus Brown",
      role: "Security Engineer",
      company: "SecureNet",
      image: "https://replicate.delivery/pbxt/3SRdMUFtq5ZCPCqxPWMGBDwkQK9J5Ptr9c6oRWrxwrOeHHE/out-0.png",
      quote: "The cybersecurity pathway is comprehensive and always up-to-date. The AI ensures you're learning the most relevant security practices."
    }
  ];

  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);
  const currentTestimonials = testimonials.slice(
    currentPage * testimonialsPerPage,
    (currentPage + 1) * testimonialsPerPage
  );

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

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
            What Our Users Say
          </h2>
          <p className="text-xl text-light/70 max-w-2xl mx-auto">
            Join thousands of learners who have transformed their careers with BuildSchool
          </p>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {currentTestimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={index + currentPage * testimonialsPerPage}
                  {...testimonial}
                  index={index}
                  variant={index < 3 ? 'primary' : 'secondary'}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center items-center gap-4 mt-12">
            <button
              onClick={prevPage}
              className="p-3 rounded-full bg-dark/40 border border-primary/20 text-light/70 hover:text-primary hover:border-primary transition-colors"
            >
              <FaChevronLeft size={20} />
            </button>
            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentPage === index
                      ? 'bg-primary'
                      : 'bg-primary/20 hover:bg-primary/40'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={nextPage}
              className="p-3 rounded-full bg-dark/40 border border-primary/20 text-light/70 hover:text-primary hover:border-primary transition-colors"
            >
              <FaChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;