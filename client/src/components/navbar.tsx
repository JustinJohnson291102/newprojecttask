import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, GraduationCap, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();
  const [packagesOpen, setPackagesOpen] = useState(false); // for mobile
  const [hoverPackages, setHoverPackages] = useState(false); // for desktop

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const isActive = (path: string) => location === path;

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/courses", label: "Courses" },
    {
      path: "/packages",
      label: "Packages",
      dropdown: [
        { path: "/packages/1", label: "Grow Wave" },
        { path: "/packages/2", label: "Expert Wave" },
        { path: "/packages/3", label: "Finance Wave" },
        { path: "/packages/4", label: "Creator Wave" },
        { path: "/packages/5", label: "Tech Wave" },
      ],
    },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 text-black backdrop-blur-md shadow-lg ${isScrolled ? "bg-white" : "bg-transparent"}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" data-testid="logo-link">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-primary">
                Knowledge Wave India
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) =>
              item.dropdown ? (
                <div
                  key={item.path}
                  className="relative group"
                  onMouseEnter={() => setHoverPackages(true)}
                  onMouseLeave={() => setHoverPackages(false)}
                >
                  <span
                    className={`flex items-center gap-1 font-medium cursor-pointer transition-colors hover:text-                       primary ${
                      hoverPackages || isActive(item.path)
                        ? "text-primary"
                        : isScrolled
                          ? "text-neutral-800"
                          : "text-black"
                    }`}
                  >
                    {item.label} <ChevronDown className="w-4 h-4" />
                  </span>
                  {hoverPackages && (
                    <div className="absolute top-full mt-2 bg-white shadow-lg rounded-lg z-50 py-2 w-48">
                      {item.dropdown.map((sub) => (
                        <Link href={sub.path} key={sub.path}>
                          <div className="px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">
                            {sub.label}
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.path}
                  href={item.path}
                  data-testid={`nav-link-${item.label.toLowerCase()}`}
                >
                  <span
                    className={`font-medium transition-colors hover:text-primary ${isActive(item.path) ? "text-primary" : "text-black"}`}
                  >
                    {item.label}
                  </span>
                </Link>
              ),
            )}
            <Link href="/login" data-testid="login-button">
              <Button className="btn-primary text-white font-medium">
                Login
              </Button>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className={`p-2 rounded-lg transition-colors ${isScrolled ? "text-neutral-800" : "text-white"}`}
              data-testid="mobile-menu-button"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white shadow-lg rounded-lg mt-2"
              data-testid="mobile-menu"
            >
              <div className="px-4 py-2 space-y-2">
                {navItems.map((item) =>
                  item.dropdown ? (
                    <div key={item.label}>
                      <button
                        onClick={() => setPackagesOpen(!packagesOpen)}
                        className="w-full text-left px-3 py-2 font-medium text-neutral-800 hover:text-primary flex justify-between items-center"
                      >
                        {item.label}
                        <ChevronDown
                          className={`w-4 h-4 transform transition-transform ${packagesOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      {packagesOpen && (
                        <div className="pl-4 space-y-1">
                          {item.dropdown.map((sub) => (
                            <Link
                              href={sub.path}
                              key={sub.path}
                              onClick={() => setIsOpen(false)}
                            >
                              <div className="text-sm py-1 px-2 rounded hover:bg-neutral-100 text-neutral-700">
                                {sub.label}
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      key={item.path}
                      href={item.path}
                      onClick={() => setIsOpen(false)}
                      data-testid={`mobile-nav-${item.label.toLowerCase()}`}
                    >
                      <div
                        className={`block px-3 py-2 rounded-lg transition-colors ${isActive(item.path) ? "text-primary bg-primary/10" : "text-neutral-800 hover:text-primary hover:bg-neutral-100"}`}
                      >
                        {item.label}
                      </div>
                    </Link>
                  ),
                )}
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  data-testid="mobile-login-button"
                >
                  <Button className="w-full mt-4 btn-primary text-white">
                    Login
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
