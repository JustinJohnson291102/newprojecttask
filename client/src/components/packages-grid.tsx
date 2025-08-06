import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Star, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import type { Package } from "@shared/schema";
import Carousel from "@/components/ui/carousel";

interface PackagesGridProps {
  title?: string;
  subtitle?: string;
  limit?: number;
  showViewAll?: boolean;
  useCarousel?: boolean;
  slidesPerView?: number;
}

export default function PackagesGrid({ 
  title = "Explore Our World's Best Packages",
  subtitle = "Explore the world's best learning packages with KnowledgeWaveIndia, offering top-notch courses in various fields.",
  limit,
  showViewAll = false,
  useCarousel = false,
  slidesPerView = 5
}: PackagesGridProps) {
  const { data: packages = [], isLoading } = useQuery<Package[]>({
    queryKey: ["/api/packages"],
  });

  const filteredPackages = limit ? packages.slice(0, limit) : packages;

  if (isLoading) {
    return (
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-neutral-200 h-48 rounded-t-xl" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-neutral-200 rounded" />
                  <div className="h-6 bg-neutral-200 rounded w-3/4" />
                  <div className="h-8 bg-neutral-200 rounded" />
                  <div className="h-10 bg-neutral-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-20 bg-white" data-testid="packages-grid">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h3 className="text-secondary text-lg font-semibold mb-2">Top Class Packages</h3>
          <h2 className="text-4xl font-bold text-neutral-900 mb-4" data-testid="packages-title">
            {title}
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto" data-testid="packages-subtitle">
            {subtitle}
          </p>
        </motion.div>

        {/* Packages Grid */}
        {useCarousel ? (
          <Carousel
            slidesPerView={slidesPerView}
            autoSlide={true}
            spacing={32}
            className="packages-carousel"
          >
            {filteredPackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ y: -10, scale: 1.03, rotateY: 5 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="package-card card-hover h-full" data-testid={`package-card-${pkg.id}`}>
                  <div className="relative">
                    <img
                      src={pkg.image || `https://images.unsplash.com/photo-${
                        [
                          "1553484771-371a605b060b",
                          "1516321318423-f06f85e504b3",
                          "1611224923853-80b023f02d71",
                          "1557804506-669a67965ba0",
                          "1573164713988-8665fc963095"
                        ][index % 5]
                      }?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300`}
                      alt={`${pkg.title} package bundle`}
                      className="w-full h-48 object-cover rounded-t-xl"
                      data-testid={`package-image-${pkg.id}`}
                    />
                    {pkg.originalPrice && pkg.discountedPrice && (
                      <div className="absolute top-3 right-3 bg-secondary text-white px-2 py-1 rounded-full text-sm font-semibold">
                        Save ₹{(parseFloat(pkg.originalPrice) - parseFloat(pkg.discountedPrice)).toFixed(0)}
                      </div>
                    )}
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className="bg-primary text-white">
                        {pkg.category}
                      </Badge>
                      <div className="flex items-center text-yellow-400 text-sm">
                        <Star className="fill-current" size={14} />
                        <span className="ml-1" data-testid={`package-rating-${pkg.id}`}>
                          ({pkg.rating} Reviews)
                        </span>
                      </div>
                    </div>
                    
                    <h4 className="font-bold text-xl mb-4" data-testid={`package-title-${pkg.id}`}>
                      {pkg.title}
                    </h4>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl font-bold text-primary" data-testid={`package-price-${pkg.id}`}>
                        ₹ {pkg.discountedPrice}
                      </span>
                      {pkg.originalPrice && (
                        <span className="text-lg text-neutral-500 line-through">
                          ₹ {pkg.originalPrice}
                        </span>
                      )}
                    </div>

                    {pkg.features && pkg.features.length > 0 && (
                      <div className="mb-4 space-y-2">
                        {pkg.features.slice(0, 3).map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <Check className="text-accent" size={14} />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <Link href={`/packages/${pkg.id}`}>
                      <Button 
                        className="w-full btn-secondary text-white group"
                        data-testid={`package-enroll-${pkg.id}`}
                      >
                        Enroll Now
                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Carousel>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {filteredPackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ y: -10, scale: 1.03, rotateY: 5 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="package-card card-hover h-full" data-testid={`package-card-${pkg.id}`}>
                  <div className="relative">
                    <img
                      src={pkg.image || `https://images.unsplash.com/photo-${
                        [
                          "1553484771-371a605b060b",
                          "1516321318423-f06f85e504b3",
                          "1611224923853-80b023f02d71",
                          "1557804506-669a67965ba0",
                          "1573164713988-8665fc963095"
                        ][index % 5]
                      }?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300`}
                      alt={`${pkg.title} package bundle`}
                      className="w-full h-48 object-cover rounded-t-xl"
                      data-testid={`package-image-${pkg.id}`}
                    />
                    {pkg.originalPrice && pkg.discountedPrice && (
                      <div className="absolute top-3 right-3 bg-secondary text-white px-2 py-1 rounded-full text-sm font-semibold">
                        Save ₹{(parseFloat(pkg.originalPrice) - parseFloat(pkg.discountedPrice)).toFixed(0)}
                      </div>
                    )}
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className="bg-primary text-white">
                        {pkg.category}
                      </Badge>
                      <div className="flex items-center text-yellow-400 text-sm">
                        <Star className="fill-current" size={14} />
                        <span className="ml-1" data-testid={`package-rating-${pkg.id}`}>
                          ({pkg.rating} Reviews)
                        </span>
                      </div>
                    </div>
                    
                    <h4 className="font-bold text-xl mb-4" data-testid={`package-title-${pkg.id}`}>
                      {pkg.title}
                    </h4>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl font-bold text-primary" data-testid={`package-price-${pkg.id}`}>
                        ₹ {pkg.discountedPrice}
                      </span>
                      {pkg.originalPrice && (
                        <span className="text-lg text-neutral-500 line-through">
                          ₹ {pkg.originalPrice}
                        </span>
                      )}
                    </div>

                    {pkg.features && pkg.features.length > 0 && (
                      <div className="mb-4 space-y-2">
                        {pkg.features.slice(0, 3).map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <Check className="text-accent" size={14} />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <Link href={`/packages/${pkg.id}`}>
                      <Button 
                        className="w-full btn-secondary text-white group"
                        data-testid={`package-enroll-${pkg.id}`}
                      >
                        Enroll Now
                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
        {/* View All Button */}
        {showViewAll && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/packages">
              <Button size="lg" variant="outline" className="px-8" data-testid="view-all-packages">
                View All Packages
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
