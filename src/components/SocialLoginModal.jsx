import { useState, useEffect } from 'react';

const SocialLoginModal = ({ provider, isOpen, onClose, onSuccess }) => {
  const [step, setStep] = useState('loading');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Simulate OAuth redirect flow
  useEffect(() => {
    if (isOpen) {
      setStep('loading');
      setError('');
      
      // Simulate loading the OAuth provider
      const timer = setTimeout(() => {
        setStep('form');
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, provider]);

  const getProviderConfig = () => {
    const configs = {
      google: {
        icon: 'fab fa-google',
        color: 'text-red-400',
        bgColor: 'hover:border-red-500/50',
        label: 'Google',
        brandColor: '#EA4335'
      },
      facebook: {
        icon: 'fab fa-facebook-f',
        color: 'text-blue-400',
        bgColor: 'hover:border-blue-500/50',
        label: 'Facebook',
        brandColor: '#1877F2'
      },
      github: {
        icon: 'fab fa-github',
        color: 'text-gray-300',
        bgColor: 'hover:border-gray-400/50',
        label: 'GitHub',
        brandColor: '#333333'
      }
    };
    return configs[provider] || configs.google;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock validation
      if (!email || !password) {
        setError('Please fill in all fields');
        setIsLoading(false);
        return;
      }

      if (password.length < 6) {
        setError('Password must be at least 6 characters');
        setIsLoading(false);
        return;
      }

      // Success
      setStep('success');
      setTimeout(() => {
        onSuccess({ provider, email });
        onClose();
      }, 1000);
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      onClose();
    }
  };

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, isLoading]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const config = getProviderConfig();

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={handleClose}
    >
      <div 
        className="bg-slate-800/95 rounded-2xl max-w-md w-full border border-slate-700/50 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative p-6 border-b border-slate-700/50">
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
            disabled={isLoading}
          >
            <i className="fas fa-times text-xl"></i>
          </button>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl bg-slate-700/50 flex items-center justify-center ${config.color} text-2xl`}>
              <i className={config.icon}></i>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">
                Continue with {config.label}
              </h3>
              <p className="text-sm text-gray-400">Connect your account</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {step === 'loading' && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-cyan-500 border-t-transparent"></div>
              <p className="mt-4 text-gray-400">Redirecting to {config.label}...</p>
            </div>
          )}

          {step === 'form' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <i className="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-slate-900/70 border border-slate-700 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1">
                  Password
                </label>
                <div className="relative">
                  <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full bg-slate-900/70 border border-slate-700 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all"
                    required
                  />
                </div>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-xs text-gray-500">Password must be at least 6 characters</p>
                  <button type="button" className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors">
                    Forgot password?
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-3 flex items-start gap-2">
                  <i className="fas fa-exclamation-circle text-red-400 mt-0.5"></i>
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="inline-block animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    Connecting...
                  </>
                ) : (
                  <>
                    <i className={config.icon}></i>
                    Continue with {config.label}
                  </>
                )}
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-700"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-4 bg-slate-800 text-gray-400">or</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setStep('loading');
                  setTimeout(() => setStep('form'), 1000);
                }}
                className="w-full bg-slate-700/50 hover:bg-slate-700 text-white py-3 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <i className="fas fa-sync-alt"></i>
                Try another account
              </button>
            </form>
          )}

          {step === 'success' && (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-check-circle text-green-400 text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Successfully Connected!</h3>
              <p className="text-gray-400">
                You are now signed in with {config.label}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-700/50 bg-slate-800/50">
          <p className="text-xs text-gray-500 text-center">
            By continuing, you agree to our{' '}
            <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors">
              Terms of Service
            </a>
            {' '}and{' '}
            <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SocialLoginModal;