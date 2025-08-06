import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is Knowledge Wave India?",
    answer: "Knowledge Wave India is an online platform that offers digital courses and skill based trainings to help individuals enhance their skills and knowledge in all the fields relevant in today's time."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept various payment methods, including major credit cards, debit cards, and online payment platforms. Simply choose your preferred payment method during the checkout process."
  },
  {
    question: "Is my payment information secure?",
    answer: "Yes, we take the security of your payment information seriously. We use industry-standard encryption and secure payment gateways to ensure that your payment details are protected."
  },
  {
    question: "Can I contact support if I have questions or issues?",
    answer: "Absolutely! We have a dedicated support team ready to assist you. If you have any questions, technical difficulties, or require assistance, you can reach out to our support team through the contact information provided on our website."
  },
  {
    question: "Do you offer certificates upon course completion?",
    answer: "Yes, we provide certificates for all completed courses. These certificates can be downloaded and shared on professional networks like LinkedIn to showcase your new skills."
  },
  {
    question: "Can I access courses on mobile devices?",
    answer: "Absolutely! Our platform is fully responsive and optimized for all devices including smartphones, tablets, and desktops. You can learn anytime, anywhere."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-neutral-100" data-testid="faq-section">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=500"
              alt="Modern classroom setting with interactive learning environment"
              className="rounded-2xl shadow-2xl w-full h-auto"
              data-testid="faq-image"
            />
          </motion.div>

          {/* Right FAQ Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-secondary text-lg font-semibold mb-2">FAQ's</h3>
            <h2 className="text-4xl font-bold text-neutral-900 mb-8" data-testid="faq-title">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-neutral-600 mb-8" data-testid="faq-subtitle">
              Find answers to common queries in our Frequently Asked Questions section.
            </p>

            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <Card key={index} className="border border-neutral-200" data-testid={`faq-item-${index}`}>
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full text-left p-6 focus:outline-none"
                    data-testid={`faq-question-${index}`}
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold text-lg pr-4">{faq.question}</h4>
                      <motion.div
                        animate={{ rotate: openIndex === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="text-neutral-400" size={20} />
                      </motion.div>
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6">
                          <p className="text-neutral-600" data-testid={`faq-answer-${index}`}>
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
