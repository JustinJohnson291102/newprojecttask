import { motion } from "framer-motion";
import { Users, Award, BookOpen, Target, Heart, Lightbulb } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import StatsCounter from "@/components/stats-counter";
import InstructorsCarousel from "@/components/instructors-carousel";

export default function About() {
  return (
    <div className="min-h-screen bg-white" data-testid="about-page">
      {/* Hero Section */}
      <section className="gradient-bg pt-32 pb-16 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold mb-6" data-testid="about-hero-title">
              About <span className="text-secondary">Knowledge Wave India</span>
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto" data-testid="about-hero-subtitle">
              Empowering learners worldwide with quality education and expert instruction across diverse fields.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=500"
                alt="Professional online learning students collaborating"
                className="rounded-2xl shadow-2xl w-full h-auto"
                data-testid="mission-image"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-neutral-900 mb-6" data-testid="mission-title">
                Our Mission
              </h2>
              <p className="text-lg text-neutral-600 mb-6" data-testid="mission-description">
                At Knowledge Wave India, we believe that education is the foundation of progress. Our mission is to democratize access to high-quality learning experiences, making it possible for anyone, anywhere, to acquire new skills and advance their careers.
              </p>
              <p className="text-lg text-neutral-600 mb-8">
                We strive to bridge the gap between traditional education and the rapidly evolving demands of the modern workforce by providing practical, industry-relevant courses taught by experienced professionals.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="text-primary" size={24} />
                  </div>
                  <h3 className="font-bold text-lg mb-2">80K+</h3>
                  <p className="text-neutral-600">Students Worldwide</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <BookOpen className="text-secondary" size={24} />
                  </div>
                  <h3 className="font-bold text-lg mb-2">80+</h3>
                  <p className="text-neutral-600">Expert Courses</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Award className="text-accent" size={24} />
                  </div>
                  <h3 className="font-bold text-lg mb-2">80+</h3>
                  <p className="text-neutral-600">Industry Experts</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-neutral-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-neutral-900 mb-4" data-testid="values-title">
              Our Core Values
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto" data-testid="values-subtitle">
              The principles that guide everything we do and shape our commitment to excellence in education.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Target className="text-primary text-3xl" />,
                title: "Excellence",
                description: "We are committed to delivering the highest quality educational content and learning experiences."
              },
              {
                icon: <Heart className="text-secondary text-3xl" />,
                title: "Accessibility",
                description: "Education should be accessible to everyone, regardless of background, location, or financial situation."
              },
              {
                icon: <Lightbulb className="text-accent text-3xl" />,
                title: "Innovation",
                description: "We continuously innovate our teaching methods and technology to enhance the learning experience."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                data-testid={`value-${index}`}
              >
                <Card className="text-center h-full card-hover">
                  <CardContent className="p-8">
                    <div className="mb-6">{value.icon}</div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-4">{value.title}</h3>
                    <p className="text-neutral-600">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Counter */}
      <StatsCounter />

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-neutral-900 mb-6" data-testid="story-title">
                Our Story
              </h2>
              <p className="text-lg text-neutral-600 mb-6" data-testid="story-description">
                Knowledge Wave India was founded with a simple yet powerful vision: to make quality education accessible to everyone. What started as a small initiative has grown into a comprehensive learning platform that serves thousands of students worldwide.
              </p>
              <p className="text-lg text-neutral-600 mb-6">
                Our founders recognized the gap between traditional education systems and the rapidly changing demands of the modern workforce. They envisioned a platform where industry experts could share their knowledge directly with learners, creating a more practical and relevant educational experience.
              </p>
              <p className="text-lg text-neutral-600">
                Today, we continue to evolve and expand our offerings, always staying true to our core mission of empowering individuals through education.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=500"
                alt="Modern classroom setting with interactive learning environment"
                className="rounded-2xl shadow-2xl w-full h-auto"
                data-testid="story-image"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <InstructorsCarousel />

      {/* Achievement Section */}
      <section className="py-20 bg-neutral-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-neutral-900 mb-4" data-testid="achievements-title">
              Our Achievements
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto" data-testid="achievements-subtitle">
              Milestones that reflect our commitment to educational excellence and student success.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                number: "80K+",
                label: "Students Enrolled",
                description: "Learners from around the world have chosen our platform"
              },
              {
                number: "95%",
                label: "Completion Rate",
                description: "High engagement and course completion rates"
              },
              {
                number: "4.8/5",
                label: "Average Rating",
                description: "Consistently high ratings from our students"
              },
              {
                number: "50+",
                label: "Countries",
                description: "Global reach with students from diverse backgrounds"
              }
            ].map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
                data-testid={`achievement-${index}`}
              >
                <div className="text-4xl font-bold text-primary mb-2">{achievement.number}</div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">{achievement.label}</h3>
                <p className="text-neutral-600">{achievement.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
