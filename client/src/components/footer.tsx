import { Link } from "wouter";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-neutral-700 text-white py-16" data-testid="footer">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3
              className="text-2xl text-white font-bold mb-6"
              data-testid="footer-brand"
            >
              Knowledge Wave India
            </h3>
            <p className="text-white mb-6">
              Empowering learners worldwide with quality education and expert
              instruction across diverse fields.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-white hover:text-white transition-colors"
                data-testid="social-facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-white hover:text-white transition-colors"
                data-testid="social-twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-white hover:text-white transition-colors"
                data-testid="social-instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-white hover:text-white transition-colors"
                data-testid="social-linkedin"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg text-white font-semibold mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/">
                  <span
                    className="text-white hover:text-white transition-colors"
                    data-testid="footer-link-home"
                  >
                    Home
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/courses">
                  <span
                    className="text-neutral-300 hover:text-white transition-colors"
                    data-testid="footer-link-courses"
                  >
                    Courses
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/packages">
                  <span
                    className="text-neutral-300 hover:text-white transition-colors"
                    data-testid="footer-link-packages"
                  >
                    Packages
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <span
                    className="text-neutral-300 hover:text-white transition-colors"
                    data-testid="footer-link-about"
                  >
                    About
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <span
                    className="text-neutral-300 hover:text-white transition-colors"
                    data-testid="footer-link-contact"
                  >
                    Contact
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg text-white font-semibold mb-6">
              Categories
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-neutral-300 hover:text-white transition-colors"
                  data-testid="category-development"
                >
                  Development
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-neutral-300 hover:text-white transition-colors"
                  data-testid="category-business"
                >
                  Business
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-neutral-300 hover:text-white transition-colors"
                  data-testid="category-marketing"
                >
                  Marketing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-neutral-300 hover:text-white transition-colors"
                  data-testid="category-design"
                >
                  Design
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-neutral-300 hover:text-white transition-colors"
                  data-testid="category-personal"
                >
                  Personal Development
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg text-white font-semibold mb-6">
              Contact Info
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="text-primary" size={20} />
                <span className="text-neutral-300" data-testid="contact-email">
                  info@knowledgewaveindia.com
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-primary text-white" size={20} />
                <span className="text-neutral-300" data-testid="contact-phone">
                  +91 9876543210
                </span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="text-primary text-white" size={20} />
                <span
                  className="text-neutral-300"
                  data-testid="contact-address"
                >
                  New Delhi, India
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-12 pt-8 text-center">
          <p className="text-white" data-testid="copyright">
            © 2024 Knowledge Wave India. All rights reserved. | Privacy Policy
            | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
}
