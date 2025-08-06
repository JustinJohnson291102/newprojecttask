import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Instructor } from "@shared/schema";
import Carousel from "@/components/ui/carousel";

interface InstructorsCarouselProps {
  useCarousel?: boolean;
  slidesPerView?: number;
}

export default function InstructorsCarousel({ 
  useCarousel = true, 
  slidesPerView = 4 
}: InstructorsCarouselProps) {
  const { data: instructors = [], isLoading } = useQuery<Instructor[]>({
    queryKey: ["/api/instructors"],
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse text-center">
                <div className="w-32 h-32 bg-neutral-200 rounded-full mx-auto mb-4" />
                <div className="h-4 bg-neutral-200 rounded mb-2" />
                <div className="h-3 bg-neutral-200 rounded w-3/4 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 section-bg-2 parallax-bg relative overflow-hidden" data-testid="instructors-carousel">
      {/* Animated Background Elements */}
      <div className="absolute top-16 left-16 w-36 h-36 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-xl animate-float" />
      <div className="absolute bottom-16 right-16 w-52 h-52 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-xl animate-pulse-slow" />
      <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-gradient-to-r from-rose-500/10 to-pink-500/10 rounded-full blur-lg animate-sparkle" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h3 
            className="text-secondary text-lg font-semibold mb-2 bg-gradient-to-r from-secondary to-orange-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Skilled Introduce
          </motion.h3>
          <motion.h2 
            className="text-4xl font-bold text-neutral-900 mb-4" 
            data-testid="instructors-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Our Top Class & Expert Instructors in One Place
          </motion.h2>
          <motion.p 
            className="text-xl text-neutral-600 max-w-2xl mx-auto" 
            data-testid="instructors-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Learn from top-class, expert instructors all in one place with KnowledgeWaveIndia.
          </motion.p>
        </motion.div>

        {/* Instructors Grid */}
        {useCarousel ? (
          <Carousel
            slidesPerView={slidesPerView}
            autoSlide={true}
            spacing={32}
            className="instructors-carousel"
          >
            {instructors.map((instructor, index) => (
              <motion.div
                key={instructor.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="instructor-card text-center h-full" data-testid={`instructor-card-${instructor.id}`}>
                  <CardContent className="p-6">
                    <div className="relative mb-4">
                      <img
                        src={instructor.avatar || `https://images.unsplash.com/photo-${
                          [
                            "1494790108755-2616b5b8b30b",
                            "1507003211169-0a1dd7228f2d",
                            "1438761681033-6461ffad8d80",
                            "1472099645785-5658abf4ff4e",
                            "1544005313-94ddf0286df2",
                            "1560250097-0b93528c311a",
                            "1487412720507-e7ab37603c6f",
                            "1519085360753-af0119f7cbe7"
                          ][index % 8]
                        }?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300`}
                        alt={`${instructor.name} - ${instructor.title}`}
                        className="w-32 h-32 object-cover rounded-full mx-auto shadow-lg"
                        data-testid={`instructor-image-${instructor.id}`}
                      />
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-md">
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="text-yellow-400 fill-current" size={14} />
                          <span className="font-medium" data-testid={`instructor-rating-${instructor.id}`}>
                            {instructor.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <h4 className="font-bold text-xl mb-2" data-testid={`instructor-name-${instructor.id}`}>
                      {instructor.name}
                    </h4>
                    
                    <p className="text-neutral-600 mb-3" data-testid={`instructor-title-${instructor.id}`}>
                      {instructor.title}
                    </p>
                    
                    <div className="text-sm text-neutral-500">
                      ({instructor.rating} Ratings)
                    </div>

                    {instructor.expertise && instructor.expertise.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1 justify-center">
                        {instructor.expertise.slice(0, 2).map((skill, idx) => (
                          <span
                            key={idx}
                            className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Carousel>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {instructors.map((instructor, index) => (
              <motion.div
                key={instructor.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="instructor-card text-center h-full" data-testid={`instructor-card-${instructor.id}`}>
                  <CardContent className="p-6">
                    <div className="relative mb-4">
                      <img
                        src={instructor.avatar || `https://images.unsplash.com/photo-${
                          [
                            "1494790108755-2616b5b8b30b",
                            "1507003211169-0a1dd7228f2d",
                            "1438761681033-6461ffad8d80",
                            "1472099645785-5658abf4ff4e",
                            "1544005313-94ddf0286df2",
                            "1560250097-0b93528c311a",
                            "1487412720507-e7ab37603c6f",
                            "1519085360753-af0119f7cbe7"
                          ][index % 8]
                        }?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300`}
                        alt={`${instructor.name} - ${instructor.title}`}
                        className="w-32 h-32 object-cover rounded-full mx-auto shadow-lg"
                        data-testid={`instructor-image-${instructor.id}`}
                      />
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-md">
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="text-yellow-400 fill-current" size={14} />
                          <span className="font-medium" data-testid={`instructor-rating-${instructor.id}`}>
                            {instructor.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <h4 className="font-bold text-xl mb-2" data-testid={`instructor-name-${instructor.id}`}>
                      {instructor.name}
                    </h4>
                    
                    <p className="text-neutral-600 mb-3" data-testid={`instructor-title-${instructor.id}`}>
                      {instructor.title}
                    </p>
                    
                    <div className="text-sm text-neutral-500">
                      ({instructor.rating} Ratings)
                    </div>

                    {instructor.expertise && instructor.expertise.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1 justify-center">
                        {instructor.expertise.slice(0, 2).map((skill, idx) => (
                          <span
                            key={idx}
                            className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}