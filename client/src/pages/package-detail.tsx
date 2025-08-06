import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { Star, Check, Clock, Users, Award, ArrowLeft, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Package, Course } from "@shared/schema";

export default function PackageDetail() {
  const { id } = useParams();
  const { toast } = useToast();

  const { data: packageData, isLoading, error } = useQuery<Package>({
    queryKey: ["/api/packages", id],
  });

  const { data: allCourses = [] } = useQuery<Course[]>({
    queryKey: ["/api/courses"],
  });

  const enrollMutation = useMutation({
    mutationFn: (data: { userId: string; packageId: string }) => 
      apiRequest("POST", "/api/enrollments", data),
    onSuccess: () => {
      toast({
        title: "Enrollment Successful!",
        description: "You have been enrolled in this package. Check your email for details.",
      });
    },
    onError: () => {
      toast({
        title: "Enrollment Failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    },
  });

  const handleEnroll = () => {
    // In a real app, you'd get the user ID from authentication context
    const userId = "demo-user-id";
    enrollMutation.mutate({ userId, packageId: id! });
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">Package Not Found</h2>
          <p className="text-neutral-600 mb-6">The package you're looking for doesn't exist.</p>
          <Link href="/packages">
            <Button>Back to Packages</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 pt-32">
          <div className="animate-pulse">
            <div className="h-8 bg-neutral-200 rounded w-48 mb-8" />
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="h-64 bg-neutral-200 rounded-2xl mb-6" />
                <div className="h-8 bg-neutral-200 rounded w-3/4 mb-4" />
                <div className="h-4 bg-neutral-200 rounded mb-2" />
                <div className="h-4 bg-neutral-200 rounded w-5/6" />
              </div>
              <div>
                <div className="h-96 bg-neutral-200 rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!packageData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">Package Not Found</h2>
          <p className="text-neutral-600 mb-6">The package you're looking for doesn't exist.</p>
          <Link href="/packages">
            <Button>Back to Packages</Button>
          </Link>
        </div>
      </div>
    );
  }

  const packageCourses = allCourses.filter(course => 
    packageData.courseIds?.includes(course.id)
  );

  return (
    <div className="min-h-screen bg-white" data-testid="package-detail-page">
      {/* Breadcrumb */}
      <div className="pt-24 pb-8 bg-neutral-100">
        <div className="container mx-auto px-4">
          <Link href="/packages">
            <Button variant="ghost" className="mb-4" data-testid="back-to-packages">
              <ArrowLeft className="mr-2" size={16} />
              Back to Packages
            </Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-20">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Package Image */}
              <div className="relative mb-8">
                <img
                  src={packageData.image || "https://images.unsplash.com/photo-1553484771-371a605b060b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"}
                  alt={`${packageData.title} package`}
                  className="w-full h-64 lg:h-80 object-cover rounded-2xl shadow-lg"
                  data-testid="package-detail-image"
                />
                <Badge className="absolute top-4 left-4 bg-primary text-white">
                  {packageData.category}
                </Badge>
                {packageData.originalPrice && packageData.discountedPrice && (
                  <div className="absolute top-4 right-4 bg-secondary text-white px-3 py-2 rounded-full font-semibold">
                    Save ₹{(parseFloat(packageData.originalPrice) - parseFloat(packageData.discountedPrice)).toFixed(0)}
                  </div>
                )}
              </div>

              {/* Package Info */}
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center text-yellow-400">
                    <Star className="fill-current" size={20} />
                    <span className="ml-1 font-semibold" data-testid="package-rating">
                      {packageData.rating} ({packageData.rating} Reviews)
                    </span>
                  </div>
                  <Badge variant="outline">{packageData.category}</Badge>
                </div>

                <h1 className="text-4xl font-bold text-neutral-900 mb-4" data-testid="package-title">
                  {packageData.title}
                </h1>

                <p className="text-xl text-neutral-600 mb-6" data-testid="package-description">
                  {packageData.description || "Comprehensive learning package designed to enhance your skills and advance your career."}
                </p>

                <div className="flex items-center gap-6 text-sm text-neutral-600">
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>Self-paced learning</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={16} />
                    <span>80K+ enrolled</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award size={16} />
                    <span>Certificate included</span>
                  </div>
                </div>
              </div>

              {/* Package Features */}
              {packageData.features && packageData.features.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-neutral-900 mb-4" data-testid="features-title">
                    What's Included
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {packageData.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3" data-testid={`feature-${index}`}>
                        <Check className="text-accent flex-shrink-0" size={20} />
                        <span className="text-neutral-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Included Courses */}
              {packageCourses.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-neutral-900 mb-6" data-testid="courses-title">
                    Courses in This Package ({packageCourses.length})
                  </h2>
                  <div className="space-y-4">
                    {packageCourses.map((course, index) => (
                      <Card key={course.id} className="course-card" data-testid={`course-${course.id}`}>
                        <CardContent className="p-6">
                          <div className="flex gap-4">
                            <img
                              src={course.thumbnail || "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=80"}
                              alt={course.title}
                              className="w-20 h-16 object-cover rounded-lg flex-shrink-0"
                            />
                            <div className="flex-1">
                              <h3 className="font-bold text-lg mb-2">{course.title}</h3>
                              <p className="text-neutral-600 text-sm mb-2 line-clamp-2">
                                {course.description || "Master new skills with this comprehensive course."}
                              </p>
                              <div className="flex items-center gap-4 text-sm text-neutral-500">
                                <span>{course.lessons} lessons</span>
                                <span className="flex items-center gap-1">
                                  <Star className="text-yellow-400 fill-current" size={12} />
                                  {course.rating}
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="sticky top-32"
            >
              <Card className="shadow-xl">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-4xl font-bold text-primary" data-testid="package-price">
                        ₹ {packageData.discountedPrice}
                      </span>
                      {packageData.originalPrice && (
                        <span className="text-2xl text-neutral-500 line-through">
                          ₹ {packageData.originalPrice}
                        </span>
                      )}
                    </div>
                    {packageData.originalPrice && packageData.discountedPrice && (
                      <p className="text-accent font-semibold">
                        {Math.round(((parseFloat(packageData.originalPrice) - parseFloat(packageData.discountedPrice)) / parseFloat(packageData.originalPrice)) * 100)}% OFF
                      </p>
                    )}
                  </div>

                  <Button
                    onClick={handleEnroll}
                    disabled={enrollMutation.isPending}
                    className="w-full btn-secondary text-white font-semibold text-lg py-4 mb-4"
                    data-testid="enroll-now-button"
                  >
                    {enrollMutation.isPending ? (
                      <div className="flex items-center gap-2">
                        <div className="spinner" />
                        Enrolling...
                      </div>
                    ) : (
                      <>
                        <ShoppingCart className="mr-2" size={20} />
                        Enroll Now
                      </>
                    )}
                  </Button>

                  <p className="text-center text-sm text-neutral-600 mb-6">
                    30-day money-back guarantee
                  </p>

                  <Separator className="my-6" />

                  <div className="space-y-4">
                    <h3 className="font-bold text-lg">This package includes:</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-3">
                        <Check className="text-accent" size={16} />
                        <span>Lifetime access to all courses</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Check className="text-accent" size={16} />
                        <span>Expert instructor support</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Check className="text-accent" size={16} />
                        <span>Downloadable resources</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Check className="text-accent" size={16} />
                        <span>Certificate of completion</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Check className="text-accent" size={16} />
                        <span>Access on mobile and desktop</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
