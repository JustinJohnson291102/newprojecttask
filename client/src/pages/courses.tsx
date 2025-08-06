import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Search, Filter, Star, Clock, Users, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "wouter";
import type { Course } from "@shared/schema";

export default function Courses() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("popular");

  const { data: courses = [], isLoading, error } = useQuery<Course[]>({
    queryKey: ["/api/courses", selectedCategory, searchQuery],
  });

  const categories = ["All", "Development", "Design", "Business", "Marketing", "Finance", "Technology"];
  const sortOptions = [
    { value: "popular", label: "Most Popular" },
    { value: "newest", label: "Newest First" },
    { value: "rating", label: "Highest Rated" },
    { value: "title", label: "A-Z" },
  ];

  const filteredAndSortedCourses = courses
    .filter(course => 
      (!searchQuery || course.title.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (!selectedCategory || selectedCategory === "all" || selectedCategory === "All" || course.category === selectedCategory)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime();
        case "rating":
          return parseFloat(b.rating!) - parseFloat(a.rating!);
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">Failed to Load Courses</h2>
          <p className="text-neutral-600">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white" data-testid="courses-page">
      {/* Hero Section */}
      <section className="gradient-bg pt-32 pb-16 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold mb-6" data-testid="courses-hero-title">
              Explore Our <span className="text-secondary">Courses</span>
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto" data-testid="courses-hero-subtitle">
              Discover a world of knowledge with our comprehensive course collection designed by industry experts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-12 bg-neutral-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
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
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger data-testid="category-filter">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category === "All" ? "all" : category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger data-testid="sort-filter">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-neutral-600" data-testid="courses-count">
                {filteredAndSortedCourses.length} courses found
              </p>
              <div className="flex items-center gap-2 text-sm text-neutral-500">
                <Filter size={16} />
                <span>Filters applied: {selectedCategory && selectedCategory !== "All" ? 1 : 0}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(12)].map((_, i) => (
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
          ) : filteredAndSortedCourses.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <BookOpen className="mx-auto h-16 w-16 text-neutral-400 mb-4" />
              <h3 className="text-2xl font-bold text-neutral-900 mb-2" data-testid="no-courses-title">
                No Courses Found
              </h3>
              <p className="text-neutral-600 mb-6" data-testid="no-courses-description">
                Try adjusting your search criteria or browse all courses.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("");
                }}
                data-testid="clear-filters-button"
              >
                Clear Filters
              </Button>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAndSortedCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                >
                  <Card className="course-card card-hover h-full" data-testid={`course-card-${course.id}`}>
                    <div className="relative">
                      <img
                        src={course.thumbnail || `https://images.unsplash.com/photo-${
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
                        }?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250`}
                        alt={course.title}
                        className="w-full h-48 object-cover rounded-t-xl"
                        data-testid={`course-image-${course.id}`}
                      />
                      <Badge className="absolute top-3 left-3 bg-primary text-white">
                        {course.category}
                      </Badge>
                    </div>
                    
                    <CardContent className="p-6">
                      <h4 className="font-bold text-lg mb-2 line-clamp-2" data-testid={`course-title-${course.id}`}>
                        {course.title}
                      </h4>
                      
                      <p className="text-neutral-600 text-sm mb-4 line-clamp-3">
                        {course.description || "Master new skills with this comprehensive course designed by industry experts."}
                      </p>
                      
                      <div className="flex items-center justify-between mb-4 text-sm text-neutral-600">
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span data-testid={`course-lessons-${course.id}`}>{course.lessons || Math.floor(Math.random() * 20) + 5} Lessons</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="text-yellow-400 fill-current" size={14} />
                          <span data-testid={`course-rating-${course.id}`}>{course.rating}</span>
                        </div>
                      </div>
                      
                      <Link href={`/courses/${course.id}`}>
                        <Button 
                          className="w-full btn-primary text-white"
                          data-testid={`course-enroll-${course.id}`}
                        >
                          View Course
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
    </div>
  );
}
