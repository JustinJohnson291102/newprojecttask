import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Star, Clock, Users, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import type { Course } from "@shared/schema";
import Carousel from "@/components/ui/carousel";

interface CoursesGridProps {
  title?: string;
  subtitle?: string;
  showSearch?: boolean;
  limit?: number;
  showViewAll?: boolean;
  useCarousel?: boolean;
  slidesPerView?: number;
}

export default function CoursesGrid({
  title = "Top Courses We Have",
  subtitle = "Explore our most popular and sought-after courses designed to elevate your skills and knowledge.",
  showSearch = false,
  limit,
  showViewAll = false,
  useCarousel = false,
  slidesPerView = 4,
}: CoursesGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const { data: courses = [], isLoading } = useQuery<Course[]>({
    queryKey: ["/api/courses", selectedCategory, searchQuery],
  });

  const filteredCourses = limit ? courses.slice(0, limit) : courses;

  const categories = ["All", "Development", "Design", "Business", "Marketing"];

  if (isLoading) {
    return (
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-neutral-200 h-48 rounded-t-xl" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-neutral-200 rounded" />
                  <div className="h-4 bg-neutral-200 rounded w-3/4" />
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
    <section className="py-20 bg-white" data-testid="courses-grid">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h3 className="text-secondary text-lg font-semibold mb-2">
            Trending Courses
          </h3>
          <h2
            className="text-4xl font-bold text-neutral-900 mb-4"
            data-testid="courses-title"
          >
            {title}
          </h2>
          <p
            className="text-xl text-neutral-600 max-w-2xl mx-auto"
            data-testid="courses-subtitle"
          >
            {subtitle}
          </p>
        </motion.div>

        {/* Search and Filters */}
        {showSearch && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400"
                  size={20}
                />
                <Input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 form-input"
                  data-testid="course-search-input"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ||
                    (category === "All" && !selectedCategory)
                      ? "default"
                      : "outline"
                  }
                  onClick={() =>
                    setSelectedCategory(category === "All" ? "" : category)
                  }
                  className="transition-all"
                  data-testid={`category-filter-${category.toLowerCase()}`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Courses Grid */}
        {useCarousel ? (
          <Carousel
            slidesPerView={slidesPerView}
            autoSlide={true}
            spacing={24}
            className="courses-carousel"
          >
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  className="course-card card-hover h-full"
                  data-testid={`course-card-${course.id}`}
                >
                  <div className="relative">
                    <img
                      src={
                        course.thumbnail ||
                        `https://images.unsplash.com/photo-${
                          [
                            "1611224923853-80b023f02d71",
                            "1516321318423-f06f85e504b3",
                            "1553484771-371a605b060b",
                            "1557804506-669a67965ba0",
                            "1573164713988-8665fc963095",
                            "1567427017947-545c5f8d16ad",
                            "1522202176988-66273c2fd55f",
                            "1434030216411-0b793f4b4173",
                            "1571019613454-1cb2f99b2d8b",
                            "1481627834876-b7833e8f5570",
                            "1560472354-b33ff0c44a43",
                            "1573496359142-b8d87734a5a2"
                          ][index % 12]
                        }?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250`
                      }
                      alt={course.title}
                      className="w-full h-48 object-cover rounded-t-xl"
                      data-testid={`course-image-${course.id}`}
                    />
                    <Badge className="absolute top-3 left-3 bg-primary text-white">
                      {course.category}
                    </Badge>
                  </div>

                  <CardContent className="p-6">
                    <h4
                      className="font-bold text-lg mb-2 line-clamp-2"
                      data-testid={`course-title-${course.id}`}
                    >
                      {course.title}
                    </h4>

                    <div className="flex items-center justify-between mb-4 text-sm text-neutral-600">
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span data-testid={`course-lessons-${course.id}`}>
                          {course.lessons || Math.floor(Math.random() * 20) + 5} Lessons
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star
                          className="text-yellow-400 fill-current"
                          size={14}
                        />
                        <span data-testid={`course-rating-${course.id}`}>
                          {course.rating}
                        </span>
                      </div>
                    </div>

                    <Link href={`/courses/${course.id}`}>
                      <Button
                        className="w-full btn-primary text-white"
                        data-testid={`course-enroll-${course.id}`}
                      >
                        Enroll Now
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Carousel>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  className="course-card card-hover h-full"
                  data-testid={`course-card-${course.id}`}
                >
                  <div className="relative">
                    <img
                      src={
                        course.thumbnail ||
                        `https://images.unsplash.com/photo-${
                          [
                            "1611224923853-80b023f02d71",
                            "1516321318423-f06f85e504b3",
                            "1553484771-371a605b060b",
                            "1557804506-669a67965ba0",
                            "1573164713988-8665fc963095",
                            "1567427017947-545c5f8d16ad",
                            "1522202176988-66273c2fd55f",
                            "1434030216411-0b793f4b4173",
                            "1571019613454-1cb2f99b2d8b",
                            "1481627834876-b7833e8f5570",
                            "1560472354-b33ff0c44a43",
                            "1573496359142-b8d87734a5a2"
                          ][index % 12]
                        }?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250`
                      }
                      alt={course.title}
                      className="w-full h-48 object-cover rounded-t-xl"
                      data-testid={`course-image-${course.id}`}
                    />
                    <Badge className="absolute top-3 left-3 bg-primary text-white">
                      {course.category}
                    </Badge>
                  </div>

                  <CardContent className="p-6">
                    <h4
                      className="font-bold text-lg mb-2 line-clamp-2"
                      data-testid={`course-title-${course.id}`}
                    >
                      {course.title}
                    </h4>

                    <div className="flex items-center justify-between mb-4 text-sm text-neutral-600">
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span data-testid={`course-lessons-${course.id}`}>
                          {course.lessons || Math.floor(Math.random() * 20) + 5} Lessons
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star
                          className="text-yellow-400 fill-current"
                          size={14}
                        />
                        <span data-testid={`course-rating-${course.id}`}>
                          {course.rating}
                        </span>
                      </div>
                    </div>

                    <Link href={`/courses/${course.id}`}>
                      <Button
                        className="w-full btn-primary text-white"
                        data-testid={`course-enroll-${course.id}`}
                      >
                        Enroll Now
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
            <Link href="/courses">
              <Button
                size="lg"
                variant="outline"
                className="px-8"
                data-testid="view-all-courses"
              >
                View All Courses
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
