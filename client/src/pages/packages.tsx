import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Star, Check, ArrowRight, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import type { Package as PackageType } from "@shared/schema";

export default function Packages() {
  const { data: packages = [], isLoading, error } = useQuery<PackageType[]>({
    queryKey: ["/api/packages"],
  });

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">Failed to Load Packages</h2>
          <p className="text-neutral-600">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white" data-testid="packages-page">
      {/* Hero Section */}
      <section className="gradient-bg pt-32 pb-16 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold mb-6" data-testid="packages-hero-title">
              Learning <span className="text-secondary">Packages</span>
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto" data-testid="packages-hero-subtitle">
              Choose from our carefully curated learning packages designed to accelerate your professional growth and skill development.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-neutral-900 mb-4" data-testid="packages-section-title">
              Choose Your Perfect Package
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto" data-testid="packages-section-subtitle">
              Each package is designed to provide comprehensive learning experiences with expert instruction and practical projects.
            </p>
          </motion.div>

          {isLoading ? (
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
          ) : packages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <Package className="mx-auto h-16 w-16 text-neutral-400 mb-4" />
              <h3 className="text-2xl font-bold text-neutral-900 mb-2" data-testid="no-packages-title">
                No Packages Available
              </h3>
              <p className="text-neutral-600" data-testid="no-packages-description">
                We're working on bringing you amazing learning packages. Check back soon!
              </p>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
              {packages.map((pkg, index) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card 
                    className={`package-card card-hover h-full relative ${
                      pkg.title === "Tech Wave" ? "ring-2 ring-primary" : ""
                    }`}
                    data-testid={`package-card-${pkg.id}`}
                  >
                    {pkg.title === "Tech Wave" && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Most Popular
                      </div>
                    )}
                    
                    <div className="relative">
                      <img
                        src={pkg.image || "https://images.unsplash.com/photo-1553484771-371a605b060b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"}
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
                      src={pkg.image || `https://images.unsplash.com/photo-${
                        [
                          "1553484771-371a605b060b",
                          "1516321318423-f06f85e504b3",
                          "1611224923853-80b023f02d71",
                          "1557804506-669a67965ba0",
                          "1573164713988-8665fc963095"
                        ][index % 5]
                      }?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300`}
                        </Badge>
                        <div className="flex items-center text-yellow-400 text-sm">
                          <Star className="fill-current" size={14} />
                          <span className="ml-1" data-testid={`package-rating-${pkg.id}`}>
                            ({pkg.rating} Reviews)
                          </span>
                        </div>
                      </div>
                      
                      <h4 className="font-bold text-xl mb-2" data-testid={`package-title-${pkg.id}`}>
                        {pkg.title}
                      </h4>
                      
                      <p className="text-neutral-600 text-sm mb-4 line-clamp-3">
                        {pkg.description || "Comprehensive learning package with expert instruction and practical projects."}
                      </p>
                      
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
                        <div className="mb-6 space-y-2">
                          {pkg.features.slice(0, 4).map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm">
                              <Check className="text-accent flex-shrink-0" size={14} />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <Link href={`/packages/${pkg.id}`}>
                        <Button 
                          className="w-full btn-secondary text-white group"
                          data-testid={`package-view-${pkg.id}`}
                        >
                          View Package
                          <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Our Packages */}
      <section className="py-20 bg-neutral-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-neutral-900 mb-4" data-testid="why-choose-title">
              Why Choose Our Packages?
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto" data-testid="why-choose-subtitle">
              Our learning packages are designed to provide maximum value and comprehensive skill development.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Expert Instruction",
                description: "Learn from industry professionals with years of real-world experience.",
                icon: "👨‍🏫"
              },
              {
                title: "Comprehensive Content",
                description: "Complete learning paths that take you from beginner to expert level.",
                icon: "📚"
              },
              {
                title: "Practical Projects",
                description: "Build real-world projects that you can showcase in your portfolio.",
                icon: "🚀"
              },
              {
                title: "Lifetime Access",
                description: "Access your courses anytime, anywhere with no time restrictions.",
                icon: "♾️"
              },
              {
                title: "Certificate of Completion",
                description: "Earn industry-recognized certificates upon successful completion.",
                icon: "🏆"
              },
              {
                title: "Community Support",
                description: "Join our active community of learners and get help when you need it.",
                icon: "🤝"
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
                data-testid={`benefit-${index}`}
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">{benefit.title}</h3>
                <p className="text-neutral-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
