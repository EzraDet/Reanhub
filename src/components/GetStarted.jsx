import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SocialLoginModal from './SocialLoginModal';

const GetStarted = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState('');

  const validateForm = () => {
    const newErrors = {};
    
    if (!isLogin) {
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
      } else if (formData.name.length < 2) {
        newErrors.name = 'Name must be at least 2 characters';
      }
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!isLogin) {
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      if (!formData.agreeTerms) {
        newErrors.agreeTerms = 'You must agree to the terms and conditions';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Form submitted:', formData);
      
      if (isLogin) {
        navigate('/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Open social login modal
  const handleSocialLogin = (provider) => {
    setSelectedProvider(provider);
    setModalOpen(true);
  };

  // Handle successful social login
  const handleSocialLoginSuccess = (data) => {
    console.log('Social login success:', data);
    // Redirect to dashboard or home
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Brand Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="relative">
              <i className="fas fa-graduation-cap text-cyan-400 text-3xl transition-transform group-hover:scale-110 duration-300"></i>
              <div className="absolute -inset-1 bg-cyan-400/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <span className="text-white text-2xl font-bold tracking-tight">
              Rean<span className="text-cyan-400">hub</span>
            </span>
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-white">
            {isLogin ? 'Welcome back!' : 'Create your account'}
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setErrors({});
                setFormData({ ...formData, name: '', confirmPassword: '', agreeTerms: false });
              }}
              className="font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>

        {/* Main Form */}
        <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-slate-700/50 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field (Signup only) */}
            {!isLogin && (
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <i className="fas fa-user absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={`w-full bg-slate-900/70 border rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all ${
                      errors.name ? 'border-red-500' : 'border-slate-700'
                    }`}
                  />
                </div>
                {errors.name && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    <i className="fas fa-exclamation-circle"></i>
                    {errors.name}
                  </p>
                )}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-1">
                Email Address <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <i className="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className={`w-full bg-slate-900/70 border rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all ${
                    errors.email ? 'border-red-500' : 'border-slate-700'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                  <i className="fas fa-exclamation-circle"></i>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-1">
                Password <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={isLogin ? 'Enter your password' : 'Create a password'}
                  className={`w-full bg-slate-900/70 border rounded-xl pl-12 pr-12 py-3 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all ${
                    errors.password ? 'border-red-500' : 'border-slate-700'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                  <i className="fas fa-exclamation-circle"></i>
                  {errors.password}
                </p>
              )}
              {!isLogin && (
                <p className="text-gray-500 text-xs mt-1">
                  Password must be at least 6 characters
                </p>
              )}
            </div>

            {/* Confirm Password (Signup only) */}
            {!isLogin && (
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1">
                  Confirm Password <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <i className="fas fa-check-circle absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className={`w-full bg-slate-900/70 border rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all ${
                      errors.confirmPassword ? 'border-red-500' : 'border-slate-700'
                    }`}
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    <i className="fas fa-exclamation-circle"></i>
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            )}

            {/* Terms (Signup only) */}
            {!isLogin && (
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 rounded border-slate-700 bg-slate-900/70 text-cyan-500 focus:ring-cyan-400 focus:ring-2 transition-all"
                />
                <label className="text-sm text-gray-400">
                  I agree to the{' '}
                  <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                    Terms of Service
                  </a>
                  {' '}and{' '}
                  <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                    Privacy Policy
                  </a>
                </label>
              </div>
            )}
            {errors.agreeTerms && (
              <p className="text-red-400 text-xs flex items-center gap-1">
                <i className="fas fa-exclamation-circle"></i>
                {errors.agreeTerms}
              </p>
            )}

            {/* Forgot Password (Login only) */}
            {isLogin && (
              <div className="text-right">
                <a href="#" className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
                  Forgot password?
                </a>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 flex items-center justify-center gap-2 ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <>
                  <div className="inline-block animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  {isLogin ? 'Signing in...' : 'Creating account...'}
                </>
              ) : (
                <>
                  <i className={`fas ${isLogin ? 'fa-sign-in-alt' : 'fa-user-plus'}`}></i>
                  {isLogin ? 'Sign In' : 'Create Account'}
                </>
              )}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-slate-800/60 text-gray-400">Or continue with</span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => handleSocialLogin('google')}
                className="flex items-center justify-center gap-2 bg-slate-700/50 hover:bg-slate-700 text-white px-4 py-3 rounded-xl transition-all hover:scale-105 border border-slate-600 hover:border-red-500/50 group"
              >
                <i className="fab fa-google text-red-400 text-lg group-hover:scale-110 transition-transform"></i>
                <span className="text-sm hidden sm:inline">Google</span>
              </button>
              <button
                type="button"
                onClick={() => handleSocialLogin('facebook')}
                className="flex items-center justify-center gap-2 bg-slate-700/50 hover:bg-slate-700 text-white px-4 py-3 rounded-xl transition-all hover:scale-105 border border-slate-600 hover:border-blue-500/50 group"
              >
                <i className="fab fa-facebook-f text-blue-400 text-lg group-hover:scale-110 transition-transform"></i>
                <span className="text-sm hidden sm:inline">Facebook</span>
              </button>
              <button
                type="button"
                onClick={() => handleSocialLogin('github')}
                className="flex items-center justify-center gap-2 bg-slate-700/50 hover:bg-slate-700 text-white px-4 py-3 rounded-xl transition-all hover:scale-105 border border-slate-600 hover:border-gray-400/50 group"
              >
                <i className="fab fa-github text-gray-300 text-lg group-hover:scale-110 transition-transform"></i>
                <span className="text-sm hidden sm:inline">GitHub</span>
              </button>
            </div>
          </form>
        </div>

        {/* Demo Note */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            Demo credentials: demo@reanhub.com / password123
          </p>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center justify-center gap-2">
            <i className="fas fa-arrow-left"></i>
            Back to Home
          </Link>
        </div>
      </div>

      {/* Social Login Modal */}
      <SocialLoginModal
        provider={selectedProvider}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={handleSocialLoginSuccess}
      />
    </div>
  );
};

export default GetStarted;