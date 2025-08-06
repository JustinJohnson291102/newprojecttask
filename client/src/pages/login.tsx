import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email.trim() || !formData.password.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Login Successful!",
        description: "Welcome back to Knowledge Wave India.",
      });
      // In a real app, you'd handle authentication here
    }, 2000);
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center py-12" data-testid="login-page">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Side - Branding */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600"
                alt="Professional online learning environment"
                className="rounded-2xl shadow-2xl w-full h-auto"
                data-testid="login-hero-image"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent rounded-2xl" />
              <div className="absolute bottom-8 left-8 text-white">
                <h2 className="text-3xl font-bold mb-2">Welcome Back!</h2>
                <p className="text-lg opacity-90">Continue your learning journey with us</p>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Login Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="shadow-2xl">
              <CardContent className="p-8 lg:p-12">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-neutral-900 mb-2" data-testid="login-title">
                    Sign In
                  </h1>
                  <p className="text-neutral-600" data-testid="login-subtitle">
                    Access your account and continue learning
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6" data-testid="login-form">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="Enter your email"
                        className="pl-10 form-input"
                        required
                        data-testid="login-email-input"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        placeholder="Enter your password"
                        className="pl-10 pr-10 form-input"
                        required
                        data-testid="login-password-input"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                        data-testid="toggle-password-visibility"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" data-testid="remember-me-checkbox" />
                      <span className="text-sm text-neutral-600">Remember me</span>
                    </label>
                    <a href="#" className="text-sm text-primary hover:underline" data-testid="forgot-password-link">
                      Forgot password?
                    </a>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full btn-primary text-white font-semibold text-lg py-3 group"
                    data-testid="login-submit-button"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="spinner" />
                        Signing In...
                      </div>
                    ) : (
                      <>
                        Sign In
                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                      </>
                    )}
                  </Button>
                </form>

                <div className="mt-8">
                  <Separator className="mb-6" />
                  
                  <div className="space-y-4">
                    <Button
                      variant="outline"
                      className="w-full font-semibold py-3"
                      data-testid="google-login-button"
                    >
                      <img 
                        src="https://developers.google.com/identity/images/g-logo.png" 
                        alt="Google" 
                        className="w-5 h-5 mr-2"
                      />
                      Continue with Google
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="w-full font-semibold py-3"
                      data-testid="facebook-login-button"
                    >
                      <div className="w-5 h-5 mr-2 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">f</span>
                      </div>
                      Continue with Facebook
                    </Button>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <p className="text-neutral-600">
                    Don't have an account?{" "}
                    <Link href="/register">
                      <span className="text-primary hover:underline font-semibold" data-testid="register-link">
                        Sign up here
                      </span>
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
