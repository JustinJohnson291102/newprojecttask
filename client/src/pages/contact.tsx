import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const { toast } = useToast();

  const contactMutation = useMutation({
    mutationFn: (data: ContactFormData) => apiRequest("POST", "/api/contact", data),
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    contactMutation.mutate(formData);
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-white" data-testid="contact-page">
      {/* Hero Section */}
      <section className="gradient-bg pt-32 pb-16 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold mb-6" data-testid="contact-hero-title">
              Get in <span className="text-secondary">Touch</span>
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto" data-testid="contact-hero-subtitle">
              Have questions about our courses or need support? We're here to help you on your learning journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-8 mb-16"
          >
            <Card className="text-center card-hover" data-testid="contact-email-card">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">Email Us</h3>
                <p className="text-neutral-600 mb-4">Send us an email anytime</p>
                <a 
                  href="mailto:info@knowledgewaveindia.com" 
                  className="text-primary hover:underline font-medium"
                  data-testid="contact-email-link"
                >
                  info@knowledgewaveindia.com
                </a>
              </CardContent>
            </Card>

            <Card className="text-center card-hover" data-testid="contact-phone-card">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="text-secondary" size={24} />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">Call Us</h3>
                <p className="text-neutral-600 mb-4">Mon-Fri 9AM-6PM IST</p>
                <a 
                  href="tel:+919876543210" 
                  className="text-primary hover:underline font-medium"
                  data-testid="contact-phone-link"
                >
                  +91 9876543210
                </a>
              </CardContent>
            </Card>

            <Card className="text-center card-hover" data-testid="contact-location-card">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="text-accent" size={24} />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">Visit Us</h3>
                <p className="text-neutral-600 mb-4">Our headquarters</p>
                <address className="text-primary not-italic" data-testid="contact-address">
                  New Delhi, India
                </address>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Form & Info */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="shadow-xl">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-neutral-900 mb-6" data-testid="contact-form-title">
                    Send us a Message
                  </h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Full Name *
                        </label>
                        <Input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder="Your full name"
                          className="form-input"
                          required
                          data-testid="contact-name-input"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Email Address *
                        </label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="your.email@example.com"
                          className="form-input"
                          required
                          data-testid="contact-email-input"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Subject
                      </label>
                      <Input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        placeholder="What's this about?"
                        className="form-input"
                        data-testid="contact-subject-input"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Message *
                      </label>
                      <Textarea
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        placeholder="Tell us how we can help you..."
                        rows={6}
                        className="form-input resize-none"
                        required
                        data-testid="contact-message-input"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={contactMutation.isPending}
                      className="w-full btn-primary text-white font-semibold text-lg py-3"
                      data-testid="contact-submit-button"
                    >
                      {contactMutation.isPending ? (
                        <div className="flex items-center gap-2">
                          <div className="spinner" />
                          Sending...
                        </div>
                      ) : (
                        <>
                          <Send className="mr-2" size={20} />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Additional Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-4" data-testid="faq-title">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-semibold text-lg mb-2">How do I enroll in a course?</h4>
                    <p className="text-neutral-600">
                      Simply browse our courses, select the one you're interested in, and click "Enroll Now". You'll have instant access to all course materials.
                    </p>
                  </div>
                  <div className="border-l-4 border-secondary pl-4">
                    <h4 className="font-semibold text-lg mb-2">Do you offer certificates?</h4>
                    <p className="text-neutral-600">
                      Yes! Upon successful completion of any course, you'll receive a certificate that you can share on LinkedIn and other professional networks.
                    </p>
                  </div>
                  <div className="border-l-4 border-accent pl-4">
                    <h4 className="font-semibold text-lg mb-2">Can I get a refund?</h4>
                    <p className="text-neutral-600">
                      We offer a 30-day money-back guarantee on all paid courses. If you're not satisfied, contact us for a full refund.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-4" data-testid="office-hours-title">
                  Office Hours
                </h3>
                <div className="bg-neutral-100 rounded-lg p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <Clock className="text-primary mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold mb-2">Support Hours</h4>
                      <div className="space-y-1 text-neutral-600">
                        <p>Monday - Friday: 9:00 AM - 6:00 PM IST</p>
                        <p>Saturday: 10:00 AM - 4:00 PM IST</p>
                        <p>Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-neutral-600">
                    We typically respond to emails within 24 hours during business days.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-4" data-testid="become-instructor-title">
                  Become an Instructor
                </h3>
                <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
                  <CardContent className="p-6">
                    <p className="text-neutral-700 mb-4">
                      Are you an expert in your field? Join our team of instructors and share your knowledge with thousands of learners worldwide.
                    </p>
                    <Button variant="outline" className="w-full" data-testid="apply-instructor-button">
                      Apply to Teach
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
