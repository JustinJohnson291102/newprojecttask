import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-neutral-100 to-white overflow-hidden flex items-center" data-testid="hero-section">



      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-gray-900"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex items-center gap-2 mb-6"
            >
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <GraduationCap className="text-primary" size={24} />
              </div>
              <span className="text-lg font-medium text-gray-700">
                Premium Learning Platform
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl lg:text-6xl font-bold leading-tight mb-6"
              data-testid="hero-title"
            >
              <motion.span
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                Never Stop{" "}
              </motion.span>
              <motion.span 
                className="text-gradient bg-gradient-to-r from-secondary via-yellow-400 to-orange-500 bg-clip-text text-transparent animate-gradient"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                Learning
              </motion.span>
              <br />
              <motion.span
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="text-gray-900"
              >
                Never Stop{" "}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.6 }}
                className="text-blue-600"
              >
                Teaching
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-xl lg:text-2xl mb-8 leading-relaxed text-gray-700"
              data-testid="hero-description"
            >
              Every teaching and learning journey is unique. Following We'll
              help guide your way.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/packages">
                <Button
                  size="lg"
                  className="btn-secondary text-white font-semibold text-lg px-8 py-4 group"
                  data-testid="hero-enroll-button"
                >
                  Enroll Now
                  <ArrowRight
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                    size={20}
                  />
                </Button>
              </Link>

              <Button
                variant="outline"
                size="lg"
                className="border-gray-300 text-gray-800 hover:bg-gray-100 font-semibold text-lg px-8 py-4 group"
                data-testid="hero-watch-demo"
              >
                <Play
                  className="mr-2 group-hover:scale-110 transition-transform"
                  size={20}
                />
                Watch Demo
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="flex gap-8 mt-12"
            >
              <div className="text-center">
                <div
                  className="text-3xl font-bold mb-1 text-gray-800"
                  data-testid="hero-stat-students"
                >
                  80K+
                </div>
                <div className="text-sm opacity-80 text-gray-600">Active Students</div>
              </div>
              <div className="text-center">
                <div
                  className="text-3xl font-bold mb-1 text-gray-800"
                  data-testid="hero-stat-courses"
                >
                  80+
                </div>
                <div className="text-sm opacity-80 text-gray-600">Expert Courses</div>
              </div>
              <div className="text-center">
                <div
                  className="text-3xl font-bold mb-1 text-gray-800"
                  data-testid="hero-stat-instructors"
                >
                  80+
                </div>
                <div className="text-sm opacity-80 text-gray-600">Top Instructors</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              <motion.img
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Professional online learning students collaborating"
                className="rounded-2xl shadow-2xl w-full h-auto animate-float"
                data-testid="hero-image"
              />

              {/* Floating elements */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute -top-6 -left-6 bg-white p-4 rounded-2xl shadow-xl animate-bounce-slow"
              >
                <GraduationCap className="text-primary text-3xl" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="absolute -bottom-6 -right-6 bg-secondary p-6 rounded-2xl text-white shadow-xl animate-glow"
              >
                <div className="text-sm font-medium">Tech Wave</div>
                <div className="text-2xl font-bold">80K+ Students</div>
              </motion.div>

              {/* Additional floating images */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4, duration: 0.6 }}
                className="absolute top-20 -right-12 w-24 h-24 bg-white rounded-full p-2 shadow-lg animate-float"
              >
                <img
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200"
                  alt="Online education success"
                  className="w-full h-full rounded-full object-cover"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.6, duration: 0.6 }}
                className="absolute bottom-32 -left-8 w-20 h-20 bg-yellow-400 rounded-2xl p-2 shadow-lg animate-scale-up"
              >
                <img
                  src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200"
                  alt="Learning achievement"
                  className="w-full h-full rounded-xl object-cover"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 0.5 }}
                className="absolute top-1/2 -left-12 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg animate-glow"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">✓</span>
                  </div>
                  <div></div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
