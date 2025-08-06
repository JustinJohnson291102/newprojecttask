import { randomUUID } from "crypto";

// Type definitions
export interface Course {
  id: string;
  title: string;
  description?: string;
  category: string;
  createdAt: Date;
}

export interface InsertCourse extends Omit<Course, "id" | "createdAt"> {}

export interface Package {
  id: string;
  title: string;
  description: string;
  image: string;
  originalPrice: string;
  discountedPrice: string;
  category: string;
  rating: string;
  features: string[];
  courseIds: string[];
  createdAt: Date;
}

export interface InsertPackage extends Omit<Package, "id" | "createdAt"> {}

export interface Instructor {
  id: string;
  name: string;
  title: string;
  bio: string;
  avatar: string;
  rating: string;
  expertise: string[];
  createdAt: Date;
}

export interface InsertInstructor extends Omit<Instructor, "id" | "createdAt"> {}

export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
}

export interface InsertUser extends Omit<User, "id" | "createdAt"> {}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: Date;
}

export interface InsertEnrollment extends Omit<Enrollment, "id" | "enrolledAt"> {}

export interface Newsletter {
  id: string;
  email: string;
  subscribedAt: Date;
}

// Sample data
const sampleCourses: Course[] = [
  {
    id: "1",
    title: "Intro to Web Development",
    description: "Learn the basics of HTML, CSS, and JS.",
    category: "Development",
    createdAt: new Date(),
  },
  {
    id: "2",
    title: "Digital Marketing 101",
    description: "Master the basics of online marketing.",
    category: "Marketing",
    createdAt: new Date(),
  },
  {
    id: "3",
    title: "Finance Fundamentals",
    description: "Understand the core principles of finance.",
    category: "Finance",
    createdAt: new Date(),
  },
  {
    id: "4",
    title: "React for Beginners",
    description: "Learn React.js with real-world examples.",
    category: "Development",
    createdAt: new Date(),
  },
  {
    id: "5",
    title: "Stock Market Basics",
    description: "Get started with investing and trading.",
    category: "Finance",
    createdAt: new Date(),
  },
  {
    id: "6",
    title: "YouTube Growth Mastery",
    description: "Grow your channel with proven techniques.",
    category: "Creative",
    createdAt: new Date(),
  },
  {
    id: "7",
    title: "Instagram Reels Masterclass",
    description: "Create viral Reels and build your brand.",
    category: "Creative",
    createdAt: new Date(),
  },
  {
    id: "8",
    title: "Machine Learning A-Z",
    description: "Beginner to expert in ML and AI.",
    category: "Technology",
    createdAt: new Date(),
  },
  {
    id: "9",
    title: "Python Programming Bootcamp",
    description: "Complete Python course from beginner to advanced.",
    category: "Development",
    createdAt: new Date(),
  },
  {
    id: "10",
    title: "Data Science Masterclass",
    description: "Learn data analysis, visualization, and machine learning.",
    category: "Technology",
    createdAt: new Date(),
  },
  {
    id: "11",
    title: "UI/UX Design Fundamentals",
    description: "Master user interface and user experience design.",
    category: "Design",
    createdAt: new Date(),
  },
  {
    id: "12",
    title: "Business Strategy & Planning",
    description: "Learn strategic thinking and business planning.",
    category: "Business",
    createdAt: new Date(),
  },
];

const samplePackages: Package[] = [
  {
    id: "1",
    title: "Grow Wave",
    description: "Perfect for beginners looking to start their learning journey with essential skills and foundational knowledge.",
    image: "https://images.unsplash.com/photo-1553484771-371a605b060b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    originalPrice: "2999",
    discountedPrice: "1999",
    category: "Beginner",
    rating: "4.7",
    features: [
      "5 Comprehensive Courses",
      "Lifetime Access",
      "Certificate of Completion",
      "Community Support",
      "Mobile & Desktop Access"
    ],
    courseIds: ["1", "2", "3", "4", "5"],
    createdAt: new Date(),
  },
  {
    id: "2",
    title: "Expert Wave",
    description: "Advanced package for professionals seeking to master cutting-edge technologies and industry best practices.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    originalPrice: "4999",
    discountedPrice: "3499",
    category: "Advanced",
    rating: "4.9",
    features: [
      "8 Expert-Level Courses",
      "1-on-1 Mentorship",
      "Industry Projects",
      "Job Placement Support",
      "Premium Resources"
    ],
    courseIds: ["4", "8", "9", "10", "11", "12", "1", "2"],
    createdAt: new Date(),
  },
  {
    id: "3",
    title: "Finance Wave",
    description: "Comprehensive financial education package covering investment, trading, and wealth management strategies.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    originalPrice: "3999",
    discountedPrice: "2799",
    category: "Finance",
    rating: "4.8",
    features: [
      "6 Finance Courses",
      "Stock Market Simulator",
      "Investment Tools",
      "Financial Planning Templates",
      "Expert Webinars"
    ],
    courseIds: ["3", "5", "12"],
    createdAt: new Date(),
  },
  {
    id: "4",
    title: "Creator Wave",
    description: "Perfect for content creators and digital marketers looking to build their online presence and monetize their skills.",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    originalPrice: "3499",
    discountedPrice: "2299",
    category: "Creative",
    rating: "4.6",
    features: [
      "7 Creative Courses",
      "Content Creation Tools",
      "Brand Building Guide",
      "Monetization Strategies",
      "Creator Community Access"
    ],
    courseIds: ["2", "6", "7", "11"],
    createdAt: new Date(),
  },
  {
    id: "5",
    title: "Tech Wave",
    description: "Complete technology package for aspiring developers and tech professionals with hands-on projects and real-world applications.",
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    originalPrice: "5999",
    discountedPrice: "3999",
    category: "Technology",
    rating: "4.9",
    features: [
      "10 Technology Courses",
      "Hands-on Projects",
      "Code Review Sessions",
      "Industry Mentorship",
      "Job Interview Prep",
      "GitHub Portfolio Setup"
    ],
    courseIds: ["1", "4", "8", "9", "10", "11"],
    createdAt: new Date(),
  },
];

const sampleInstructors: Instructor[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    title: "Senior Software Engineer at Google",
    bio: "With over 10 years of experience in software development, Dr. Johnson specializes in full-stack development and machine learning.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b5b8b30b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    rating: "4.9",
    expertise: ["JavaScript", "Python", "Machine Learning", "React"],
    createdAt: new Date(),
  },
  {
    id: "2",
    name: "Michael Chen",
    title: "Digital Marketing Director",
    bio: "Michael has helped over 500 businesses grow their online presence through strategic digital marketing campaigns.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    rating: "4.8",
    expertise: ["Digital Marketing", "SEO", "Social Media", "Content Strategy"],
    createdAt: new Date(),
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    title: "Financial Advisor & Investment Strategist",
    bio: "Emily is a certified financial planner with expertise in investment strategies and wealth management for individuals and businesses.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    rating: "4.7",
    expertise: ["Investment Planning", "Financial Analysis", "Risk Management", "Portfolio Management"],
    createdAt: new Date(),
  },
  {
    id: "4",
    name: "David Kim",
    title: "UX/UI Design Lead at Adobe",
    bio: "David is a creative professional with 8+ years of experience in user experience design and interface development.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    rating: "4.9",
    expertise: ["UI/UX Design", "Figma", "Adobe Creative Suite", "User Research"],
    createdAt: new Date(),
  },
  {
    id: "5",
    name: "Lisa Thompson",
    title: "Data Science Manager at Microsoft",
    bio: "Lisa leads data science teams and has extensive experience in machine learning, data analysis, and business intelligence.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    rating: "4.8",
    expertise: ["Data Science", "Machine Learning", "Python", "SQL", "Business Intelligence"],
    createdAt: new Date(),
  },
  {
    id: "6",
    name: "James Wilson",
    title: "Business Strategy Consultant",
    bio: "James has consulted for Fortune 500 companies on business strategy, operations, and digital transformation initiatives.",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    rating: "4.7",
    expertise: ["Business Strategy", "Operations", "Leadership", "Digital Transformation"],
    createdAt: new Date(),
  },
  {
    id: "7",
    name: "Anna Petrov",
    title: "Content Creator & YouTuber",
    bio: "Anna has built a successful YouTube channel with over 1M subscribers and helps others create engaging content and grow their audience.",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    rating: "4.6",
    expertise: ["Content Creation", "YouTube Growth", "Video Editing", "Social Media Marketing"],
    createdAt: new Date(),
  },
  {
    id: "8",
    name: "Robert Garcia",
    title: "Full Stack Developer & Tech Lead",
    bio: "Robert is a seasoned developer with expertise in modern web technologies and has led development teams at several tech startups.",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    rating: "4.9",
    expertise: ["Full Stack Development", "Node.js", "React", "DevOps", "Team Leadership"],
    createdAt: new Date(),
  },
];

// MemStorage implementation
class MemStorage {
  users = new Map<string, User>();
  courses = new Map<string, Course>();
  packages = new Map<string, Package>();
  instructors = new Map<string, Instructor>();
  enrollments = new Map<string, Enrollment>();
  newsletters = new Map<string, Newsletter>();

  constructor() {
    sampleCourses.forEach(course => this.courses.set(course.id, course));
    samplePackages.forEach(pkg => this.packages.set(pkg.id, pkg));
    sampleInstructors.forEach(instructor => this.instructors.set(instructor.id, instructor));
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id, createdAt: new Date() };
    this.users.set(id, user);
    return user;
  }

  async getAllCourses(): Promise<Course[]> {
    return Array.from(this.courses.values());
  }

  async getCourse(id: string): Promise<Course | undefined> {
    return this.courses.get(id);
  }

  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    const id = randomUUID();
    const course: Course = { ...insertCourse, id, createdAt: new Date() };
    this.courses.set(id, course);
    return course;
  }

  async getCoursesByCategory(category: string): Promise<Course[]> {
    return Array.from(this.courses.values()).filter(course => course.category === category);
  }

  async searchCourses(query: string): Promise<Course[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.courses.values()).filter(course =>
      course.title.toLowerCase().includes(lowercaseQuery) ||
      course.description?.toLowerCase().includes(lowercaseQuery)
    );
  }

  async getAllPackages(): Promise<Package[]> {
    return Array.from(this.packages.values());
  }

  async getPackage(id: string): Promise<Package | undefined> {
    return this.packages.get(id);
  }

  async createPackage(insertPackage: InsertPackage): Promise<Package> {
    const id = randomUUID();
    const pkg: Package = { ...insertPackage, id, createdAt: new Date() };
    this.packages.set(id, pkg);
    return pkg;
  }

  async getAllInstructors(): Promise<Instructor[]> {
    return Array.from(this.instructors.values());
  }

  async getInstructor(id: string): Promise<Instructor | undefined> {
    return this.instructors.get(id);
  }

  async createInstructor(insertInstructor: InsertInstructor): Promise<Instructor> {
    const id = randomUUID();
    const instructor: Instructor = { ...insertInstructor, id, createdAt: new Date() };
    this.instructors.set(id, instructor);
    return instructor;
  }

  async createEnrollment(insertEnrollment: InsertEnrollment): Promise<Enrollment> {
    const id = randomUUID();
    const enrollment: Enrollment = { ...insertEnrollment, id, enrolledAt: new Date() };
    this.enrollments.set(id, enrollment);
    return enrollment;
  }

  async getUserEnrollments(userId: string): Promise<Enrollment[]> {
    return Array.from(this.enrollments.values()).filter(enrollment => enrollment.userId === userId);
  }

  async subscribeNewsletter(email: string): Promise<Newsletter> {
    const existing = Array.from(this.newsletters.values()).find(sub => sub.email === email);
    if (existing) {
      return existing;
    }

    const id = randomUUID();
    const newsletter: Newsletter = { id, email, subscribedAt: new Date() };
    this.newsletters.set(id, newsletter);
    return newsletter;
  }

  async getNewsletterSubscriptions(): Promise<Newsletter[]> {
    return Array.from(this.newsletters.values());
  }
}

export const storage = new MemStorage();
