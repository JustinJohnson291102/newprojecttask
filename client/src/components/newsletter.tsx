import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const subscribeMutation = useMutation({
    mutationFn: (data: { email: string }) =>
      apiRequest("POST", "/api/newsletter", data),
    onSuccess: () => {
      setIsSubmitted(true);
      setEmail("");
      toast({
        title: "Success!",
        description: "Thank you for subscribing to our newsletter.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    subscribeMutation.mutate({ email });
  };

  return (
    <section
      className="py-16 newsletter-bg relative overflow-hidden"
      data-testid="newsletter-section"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute top-0 left-0 w-64 h-64 bg-gray-300/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-400/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                <Mail className="text-white" size={24} />
              </div>
              <span className="text-lg font-medium opacity-90">
                Stay Updated
              </span>
            </div>

            <h2
              className="text-4xl font-bold mb-6"
              data-testid="newsletter-title"
            >
              Want to stay informed about{" "}
              <span className="text-black">new courses</span> & study?
            </h2>

            <p className="text-xl text-black opacity-90 mb-8">
              Subscribe to our newsletter and be the first to know about new
              courses, special offers, and learning opportunities.
            </p>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-lg"
                data-testid="newsletter-success"
              >
                <CheckCircle className="text-accent" size={24} />
                <span className="font-medium">Thank you for subscribing!</span>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white/10 backdrop-blur-sm border-white/20 text-black placeholder:text-white/60 focus:border-white/40"
                  required
                  data-testid="newsletter-email-input"
                />
                <Button
                  type="submit"
                  disabled={subscribeMutation.isPending}
                  className="btn-secondary text-white px-8 whitespace-nowrap"
                  data-testid="newsletter-subscribe-button"
                >
                  {subscribeMutation.isPending ? (
                    <div className="flex items-center gap-2">
                      <div className="spinner" />
                      Subscribing...
                    </div>
                  ) : (
                    "Subscribe Now"
                  )}
                </Button>
              </form>
            )}
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1553484771-cc0d9b8c2b33?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
              alt="Learning pathway illustration showing educational journey"
              className="rounded-2xl shadow-2xl w-full h-auto animate-float"
              data-testid="newsletter-image"
            />

            {/* Floating notification */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              viewport={{ once: true }}
              className="absolute -top-4 -right-4 bg-white p-4 rounded-2xl shadow-xl"
            >
              <div className="flex items-center gap-2">
                <Mail className="text-primary" size={20} />
                <div>
                  <div className="font-semibold text-sm">New Course Alert!</div>
                  <div className="text-xs text-neutral-600">
                    AI & Machine Learning
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
