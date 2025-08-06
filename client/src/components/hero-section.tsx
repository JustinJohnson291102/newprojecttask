import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function HeroSection() {
  return (
    <section className="hero-bg pt-24 pb-16 relative overflow-hidden min-h-screen flex items-center parallax-bg">
      {/* Animated Background Decorations */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
      
      {/* Floating Educational Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-orange-500/15 to-yellow-500/15 rounded-full blur-3xl animate-float" />
      <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-r from-green-500/10 to-teal-500/10 rounded-full blur-2xl animate-sparkle" />
      <div className="absolute bottom-40 left-20 w-48 h-48 bg-gradient-to-r from-pink-500/10 to-red-500/10 rounded-full blur-2xl animate-morph" />

      {/* Advanced Floating Educational Icons */}
      <motion.div
        className="absolute top-32 right-32 w-20 h-20 glass-morphism rounded-2xl flex items-center justify-center"
        animate={{ 
          y: [0, -25, 0], 
          rotate: [0, 5, -5, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <GraduationCap className="text-white/80" size={32} />
      </motion.div>

      <motion.div
        className="absolute bottom-32 left-24 w-24 h-24 glass-morphism rounded-3xl flex items-center justify-center"
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.2, 1],
          opacity: [0.6, 1, 0.6]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      >
        <Play className="text-secondary" size={36} />
      </motion.div>

      <motion.div
        className="absolute top-52 left-40 w-16 h-16 bg-gradient-to-r from-yellow-400/30 to-orange-500/30 rounded-full flex items-center justify-center animate-glow"
        animate={{ 
          scale: [1, 1.3, 1],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <div className="w-8 h-8 bg-white/20 rounded-full animate-sparkle" />
      </motion.div>

      {/* Enhanced Floating Particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-${Math.floor(Math.random() * 3) + 1} h-${Math.floor(Math.random() * 3) + 1} bg-white/40 rounded-full`}
          style={{
            top: `${15 + (i * 8)}%`,
            left: `${5 + (i * 7)}%`,
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.8, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 4 + (i * 0.3),
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Interactive Learning Icons */}
      {[
        { icon: "📚", top: "20%", left: "15%" },
        { icon: "🎓", top: "60%", right: "20%" },
        { icon: "💡", top: "30%", right: "15%" },
        { icon: "🚀", bottom: "25%", left: "12%" },
        { icon: "⭐", top: "70%", left: "20%" },
      ].map((item, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl opacity-60 hover:opacity-100 cursor-pointer"
          style={item}
          animate={{
            y: [0, -15, 0],
            rotate: [0, 10, -10, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3 + (i * 0.4),
            repeat: Infinity,
            delay: i * 0.3,
          }}
          whileHover={{
            scale: 1.5,
            rotate: 360,
            transition: { duration: 0.3 }
          }}
        >
          {item.icon}
        </motion.div>
      ))}

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex items-center gap-2 mb-6"
            >
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                <GraduationCap className="text-white" size={24} />
              </div>
              <span className="text-lg font-medium opacity-90">
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
                className="text-white"
              >
                Never Stop{" "}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.6 }}
                className="text-blue-400"
              >
                Teaching
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-xl lg:text-2xl mb-8 opacity-90 leading-relaxed text-[#4B2E2E]"
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
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    className="btn-secondary btn-glow text-white font-semibold text-lg px-8 py-4 group relative overflow-hidden"
                    data-testid="hero-enroll-button"
                  >
                    <span className="relative z-10">Enroll Now</span>
                    <motion.div
                      className="ml-2 relative z-10"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight
                        className="group-hover:translate-x-2 transition-transform duration-300"
                        size={20}
                      />
                    </motion.div>
                  </Button>
                </motion.div>
              </Link>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 font-semibold text-lg px-8 py-4 group glass-morphism"
                  data-testid="hero-watch-demo"
                >
                  <div className="mr-2 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Play className="text-white" size={20} />
                    </motion.div>
                  </div>
                  Watch Demo
                </Button>
              </motion.div>
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
                  className="text-3xl font-bold mb-1"
                  data-testid="hero-stat-students"
                  style={{ color: '#5C4033' }}
                >
                  80K+
                </div>
                <div className="text-sm opacity-80" style={{ color: '#5C4033' }}>Active Students</div>
              </div>
              <div className="text-center">
                <div
                  className="text-3xl font-bold mb-1"
                  style={{ color: '#5C4033' }}
                  data-testid="hero-stat-courses"
                >
                  80+
                </div>
                <div className="text-sm opacity-80" style={{ color: '#5C4033' }}>Expert Courses</div>
              </div>
              <div className="text-center">
                <div
                  className="text-3xl font-bold mb-1"
                  style={{ color: '#5C4033' }}
                  data-testid="hero-stat-instructors"
                >
                  80+
                </div>
                <div className="text-sm opacity-80" style={{ color: '#5C4033' }}>Top Instructors</div>
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
