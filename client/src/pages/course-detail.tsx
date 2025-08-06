import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { Star, Clock, Users, Award, ArrowLeft, Play, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Course, Instructor } from "@shared/schema";

export default function CourseDetail() {
  const { id } = useParams();
  const { toast } = useToast();

  const { data: course, isLoading, error } = useQuery<Course>({
    queryKey: ["/api/courses", id],
  });

  const { data: instructors = [] } = useQuery<Instructor[]>({
    queryKey: ["/api/instructors"],
  });

  const enrollMutation = useMutation({
    mutationFn: (data: { userId: string; courseId: string }) => 
      apiRequest("POST", "/api/enrollments", data),
    onSuccess: () => {
      toast({
        title: "Enrollment Successful!",
        description: "You have been enrolled in this course. Check your email for details.",
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
    enrollMutation.mutate({ userId, courseId: id! });
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">Course Not Found</h2>
          <p className="text-neutral-600 mb-6">The course you're looking for doesn't exist.</p>
          <Link href="/courses">
            <Button>Back to Courses</Button>
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

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">Course Not Found</h2>
          <p className="text-neutral-600 mb-6">The course you're looking for doesn't exist.</p>
          <Link href="/courses">
            <Button>Back to Courses</Button>
          </Link>
        </div>
      </div>
    );
  }

  const instructor = instructors.find(inst => inst.id === course.instructorId);

  return (
    <div className="min-h-screen bg-white" data-testid="course-detail-page">
      {/* Breadcrumb */}
      <div className="pt-24 pb-8 bg-neutral-100">
        <div className="container mx-auto px-4">
          <Link href="/courses">
            <Button variant="ghost" className="mb-4" data-testid="back-to-courses">
              <ArrowLeft className="mr-2" size={16} />
              Back to Courses
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
              {/* Course Image */}
              <div className="relative mb-8">
                <img
                  src={course.thumbnail || "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"}
                  alt={course.title}
                  className="w-full h-64 lg:h-80 object-cover rounded-2xl shadow-lg"
                  data-testid="course-detail-image"
                />
                <Badge className="absolute top-4 left-4 bg-primary text-white">
                  {course.category}
                </Badge>
                <Button
                  variant="secondary"
                  size="lg"
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-neutral-900"
                  data-testid="play-preview-button"
                >
                  <Play className="mr-2" size={20} />
                  Preview Course
                </Button>
              </div>

              {/* Course Info */}
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center text-yellow-400">
                    <Star className="fill-current" size={20} />
                    <span className="ml-1 font-semibold" data-testid="course-rating">
                      {course.rating} (4.8 Reviews)
                    </span>
                  </div>
                  <Badge variant="outline">{course.category}</Badge>
                  <span className="text-sm text-neutral-600">Updated recently</span>
                </div>

                <h1 className="text-4xl font-bold text-neutral-900 mb-4" data-testid="course-title">
                  {course.title}
                </h1>

                <p className="text-xl text-neutral-600 mb-6" data-testid="course-description">
                  {course.description || "Master new skills with this comprehensive course designed by industry experts. Learn at your own pace with hands-on projects and real-world examples."}
                </p>

                <div className="flex items-center gap-6 text-sm text-neutral-600">
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>{course.lessons} lessons</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={16} />
                    <span>15,000+ students</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award size={16} />
                    <span>Certificate included</span>
                  </div>
                </div>
              </div>

              {/* Instructor Info */}
              {instructor && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-neutral-900 mb-4" data-testid="instructor-section-title">
                    Your Instructor
                  </h2>
                  <Card className="instructor-card">
                    <CardContent className="p-6">
                      <div className="flex gap-4 items-center">
                        <img
                          src={instructor.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"}
                          alt={instructor.name}
                          className="w-16 h-16 rounded-full object-cover"
                          data-testid="instructor-avatar"
                        />
                        <div className="flex-1">
                          <h3 className="font-bold text-xl mb-1" data-testid="instructor-name">
                            {instructor.name}
                          </h3>
                          <p className="text-neutral-600 mb-2" data-testid="instructor-title">
                            {instructor.title}
                          </p>
                          <div className="flex items-center gap-1 text-yellow-400">
                            <Star className="fill-current" size={16} />
                            <span className="text-neutral-600" data-testid="instructor-rating">
                              {instructor.rating} instructor rating
                            </span>
                          </div>
                        </div>
                      </div>
                      {instructor.bio && (
                        <p className="text-neutral-600 mt-4" data-testid="instructor-bio">
                          {instructor.bio}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Course Curriculum */}
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-6" data-testid="curriculum-title">
                  Course Curriculum
                </h2>
                <div className="space-y-4">
                  {Array.from({ length: course.lessons || 5 }, (_, index) => (
                    <Card key={index} className="course-card" data-testid={`lesson-${index}`}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <BookOpen className="text-primary" size={16} />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold mb-1">
                              Lesson {index + 1}: Introduction to {course.title.split(' ').slice(-2).join(' ')}
                            </h3>
                            <p className="text-sm text-neutral-600">
                              Learn the fundamentals and best practices in this comprehensive lesson.
                            </p>
                          </div>
                          <div className="text-sm text-neutral-500">
                            {10 + index * 2} min
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
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
                    <div className="text-4xl font-bold text-primary mb-2" data-testid="course-price">
                      Free
                    </div>
                    <p className="text-neutral-600">Full access included</p>
                  </div>

                  <Button
                    onClick={handleEnroll}
                    disabled={enrollMutation.isPending}
                    className="w-full btn-primary text-white font-semibold text-lg py-4 mb-4"
                    data-testid="enroll-course-button"
                  >
                    {enrollMutation.isPending ? (
                      <div className="flex items-center gap-2">
                        <div className="spinner" />
                        Enrolling...
                      </div>
                    ) : (
                      "Enroll for Free"
                    )}
                  </Button>

                  <p className="text-center text-sm text-neutral-600 mb-6">
                    Start learning immediately
                  </p>

                  <Separator className="my-6" />

                  <div className="space-y-4">
                    <h3 className="font-bold text-lg">This course includes:</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-3">
                        <Clock className="text-primary" size={16} />
                        <span>{course.lessons} video lessons</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <BookOpen className="text-primary" size={16} />
                        <span>Downloadable resources</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Award className="text-primary" size={16} />
                        <span>Certificate of completion</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="text-primary" size={16} />
                        <span>Access to community</span>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div>
                    <h4 className="font-semibold mb-3">Share this course:</h4>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" data-testid="share-facebook">
                        Facebook
                      </Button>
                      <Button variant="outline" size="sm" data-testid="share-twitter">
                        Twitter
                      </Button>
                      <Button variant="outline" size="sm" data-testid="share-linkedin">
                        LinkedIn
                      </Button>
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
