import { motion } from "framer-motion";

import HeroSection from "@/components/hero-section";
import CoursesGrid from "@/components/courses-grid";
import PackagesGrid from "@/components/packages-grid";
import InstructorsCarousel from "@/components/instructors-carousel";
import FAQSection from "@/components/faq-section";
import StatsCounter from "@/components/stats-counter";
import Newsletter from "@/components/newsletter";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Users,
  Award,
  TrendingUp,
  CheckCircle,
  UserCheck,
} from "lucide-react";
import { Link } from "wouter";

// Brand partners data
const brandPartners = [
  "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=100",
  "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=100",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=100",
  "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=100",
  "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=100",
  "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=100",
];

export default function Home() {
  return (
    <div data-testid="home-page">
      {/* Hero Section */}
      <HeroSection />

      {/* Brand Partners */}
      <section className="py-16 bg-neutral-100" data-testid="brand-partners">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-secondary text-lg font-semibold mb-2">
              Trusted by Leading Companies
            </h3>
            <h2 className="text-3xl font-bold text-neutral-900">
              Our Partners & Collaborators
            </h2>
          </motion.div>

          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
            {brandPartners.map((logo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                whileHover={{ 
                  scale: 1.15, 
                  y: -8,
                  rotateY: 5,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
                }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex-shrink-0 brand-logo bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all cursor-pointer"
              >
                <img
                  src={logo}
                  alt={`Partner ${index + 1}`}
                  className="h-16 w-auto opacity-70 hover:opacity-100 transition-opacity"
                  data-testid={`partner-logo-${index}`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Courses */}
      <CoursesGrid limit={8} showViewAll={true} useCarousel={true} slidesPerView={4} />

      {/* About Section */}
      <section className="py-20 bg-neutral-100" data-testid="about-section">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <motion.img
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=500"
                  alt="Educational platform interface showing collaborative learning"
                  className="rounded-2xl shadow-2xl w-full h-auto animate-float"
                  data-testid="about-image"
                />

                {/* Floating achievement badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="absolute -top-6 -right-6 bg-secondary p-4 rounded-2xl text-white shadow-xl animate-bounce-slow"
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold">25+</div>
                    <div className="text-xs">Top Courses</div>
                  </div>
                </motion.div>

                {/* Floating student images */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="absolute bottom-8 -left-8 flex -space-x-2"
                >
                  {[
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
                    "https://images.unsplash.com/photo-1494790108755-2616b5b8b30b?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
                  ].map((src, idx) => (
                    <img
                      key={idx}
                      src={src}
                      alt={`Student ${idx + 1}`}
                      className="w-12 h-12 rounded-full border-4 border-white object-cover animate-glow"
                    />
                  ))}
                  <div className="w-12 h-12 rounded-full border-4 border-white bg-primary text-white text-xs font-bold flex items-center justify-center animate-pulse-slow">
                    80K+
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-secondary text-lg font-semibold mb-2">
                About Us
              </h3>
              <h2
                className="text-4xl font-bold text-neutral-900 mb-6"
                data-testid="about-title"
              >
                25 Of Top <span className="text-primary">Courses</span>
                <br />
                Now in One Place
              </h2>
              <p
                className="text-lg text-neutral-600 mb-8"
                data-testid="about-description"
              >
                Discover a curated selection of the 25 best courses offered by
                KnowledgeWaveIndia, covering a diverse range of subjects.
                Whether you're looking to enhance your skills in technology,
                business, arts, or personal development, these top-rated courses
                provide comprehensive content and expert instruction to help you
                achieve your learning goals.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4">
                  <CheckCircle className="text-accent text-xl" />
                  <span className="text-lg text-neutral-800">
                    The Most World Class Instructors
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <CheckCircle className="text-accent text-xl" />
                  <span className="text-lg text-neutral-800">
                    Access Your Class anywhere
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <CheckCircle className="text-accent text-xl" />
                  <span className="text-lg text-neutral-800">
                    Flexible Course Plan
                  </span>
                </div>
              </div>

              <Link href="/packages">
                <Button
                  className="btn-secondary text-white font-semibold text-lg px-8 py-4"
                  data-testid="about-enroll-button"
                >
                  Enroll Now
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <PackagesGrid limit={5} showViewAll={true} useCarousel={true} slidesPerView={5} />

      {/* Newsletter */}
      <Newsletter />

      {/* Instructors */}
      <InstructorsCarousel useCarousel={true} slidesPerView={4} />

      {/* Stats Counter */}
      <StatsCounter />

      {/* FAQ Section */}
      <FAQSection />

      {/* Learning Journey Features */}
      <section className="py-20 bg-white" data-testid="learning-journey">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-secondary text-lg font-semibold mb-2">
              How We Start Journey
            </h3>
            <h2
              className="text-4xl font-bold text-neutral-900 mb-4"
              data-testid="journey-title"
            >
              Start your Learning Journey Today!
            </h2>
            <p
              className="text-xl text-neutral-600 max-w-2xl mx-auto"
              data-testid="journey-subtitle"
            >
              Begin your educational adventure today with KnowledgeWaveIndia!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Users className="text-primary text-2xl" />,
                title: "Learn with Experts",
                description:
                  "Gain knowledge from industry experts with KnowledgeWaveIndia.",
                image:
                  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
              },
              {
                icon: <BookOpen className="text-secondary text-2xl" />,
                title: "Learn Anything",
                description:
                  "Master any subject with KnowledgeWaveIndia's diverse course offerings.",
                image:
                  "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
              },
              {
                icon: <Award className="text-accent text-2xl" />,
                title: "Get Online Certificate",
                description:
                  "Earn an online certificate with KnowledgeWaveIndia's accredited courses.",
                image:
                  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
              },
              {
                icon: <TrendingUp className="text-purple-500 text-2xl" />,
                title: "Comprehensive Learning",
                description:
                  "Experience comprehensive learning with KnowledgeWaveIndia's extensive course catalog.",
                image:
                  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ y: -10, scale: 1.05 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
                data-testid={`journey-feature-${index}`}
              >
                <div className="relative mb-6">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-20 h-20 rounded-2xl mx-auto object-cover animate-glow"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center animate-bounce-slow">
                    {feature.icon}
                  </div>
                </div>
                <h4 className="font-bold text-xl mb-3">{feature.title}</h4>
                <p className="text-neutral-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-neutral-100" data-testid="cta-section">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl p-8 card-hover"
            >
              <div className="flex items-center gap-4 mb-6">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
                  alt="Professional instructor leading corporate training session"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3
                    className="text-2xl font-bold text-neutral-900"
                    data-testid="instructor-cta-title"
                  >
                    Become a Instructor
                  </h3>
                  <p className="text-neutral-600">
                    Become an instructor with KnowledgeWaveIndia and share your
                    expertise with the world.
                  </p>
                </div>
              </div>
              <Link href="/contact">
                <Button
                  className="bg-primary hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                  data-testid="instructor-apply-button"
                >
                  Apply Now
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl p-8 card-hover"
            >
              <div className="flex items-center gap-4 mb-6">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
                  alt="Students engaged in professional online learning"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3
                    className="text-2xl font-bold text-neutral-900"
                    data-testid="student-cta-title"
                  >
                    Become a Student
                  </h3>
                  <p className="text-neutral-600">
                    Embark on your learning journey and become a student at
                    KnowledgeWaveIndia.
                  </p>
                </div>
              </div>
              <Link href="/register">
                <Button
                  className="btn-secondary text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                  data-testid="student-apply-button"
                >
                  Apply Now
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
