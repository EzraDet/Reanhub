import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile menu when clicking a link
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery)}`);
      setIsOpen(false);
    }
  };

  // Navigate to Get Started
  const handleGetStarted = () => {
    navigate('/get-started');
    setIsOpen(false);
  };

  // Navigate to My Account
  const handleMyAccount = () => {
    navigate('/my-account');
    setIsOpen(false);
  };

  // Navigate to My Learning
  const handleMyLearning = () => {
    navigate('/my-learning');
    setIsOpen(false);
  };

  // Navigation items configuration
  const navItems = [
    { path: '/', label: 'Home', icon: 'fa-home' },
    { path: '/courses', label: 'Courses', icon: 'fa-book' },
    { path: '/my-learning', label: 'My Learning', icon: 'fa-graduation-cap' },
    { path: '/about', label: 'About', icon: 'fa-info-circle' },
    { path: '/contact', label: 'Contact', icon: 'fa-envelope' },
  ];

  return (
    <nav 
      className={`
        sticky top-0 z-50 transition-all duration-300
        ${scrolled 
          ? 'bg-slate-900/95 backdrop-blur-md shadow-lg shadow-black/20' 
          : 'bg-slate-900/90 backdrop-blur-sm'
        }
        border-b border-slate-700/50
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo / Brand */}
          <NavLink 
            to="/" 
            className="flex items-center space-x-2 group cursor-pointer"
            onClick={handleLinkClick}
          >
            <div className="relative">
              <i className="fas fa-graduation-cap text-cyan-400 text-2xl md:text-3xl transition-transform group-hover:scale-110 duration-300"></i>
              <div className="absolute -inset-1 bg-cyan-400/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <span className="text-white text-xl md:text-2xl font-bold tracking-tight">
              Rean<span className="text-cyan-400">hub</span>
            </span>
          </NavLink>

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="w-full relative">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-800/70 border border-slate-700 rounded-full pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all"
              />
              <i className="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
            </form>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  px-3 py-2 rounded-lg text-sm font-medium transition-all hover:bg-white/5
                  ${isActive 
                    ? 'text-cyan-400 bg-cyan-500/10' 
                    : 'text-gray-300 hover:text-white'
                  }
                `}
                end={item.path === '/'}
              >
                {item.label}
              </NavLink>
            ))}
            
            <div className="w-px h-6 bg-slate-700 mx-2"></div>
            
            {/* Get Started Button - Desktop */}
            <button 
              onClick={handleGetStarted}
              className="relative group bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50"
            >
              <span className="relative z-10 flex items-center gap-2">
                <i className="fas fa-rocket"></i>
                Get Started
              </span>
              <div className="absolute inset-0 bg-cyan-400 rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
            </button>

            {/* User Avatar - Linked to My Account */}
            <button 
              onClick={handleMyAccount}
              className="ml-2 w-9 h-9 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-semibold hover:scale-110 transition-transform hover:shadow-lg hover:shadow-cyan-500/30"
              title="My Account"
            >
              <span className="text-sm">JD</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            {/* Mobile Search Toggle */}
            <button
              className="w-10 h-10 rounded-lg hover:bg-white/5 transition-colors flex items-center justify-center text-gray-300"
              onClick={() => {
                const searchInput = document.querySelector('.mobile-search-input');
                if (searchInput) {
                  searchInput.focus();
                }
              }}
            >
              <i className="fas fa-search text-lg"></i>
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative w-10 h-10 rounded-lg hover:bg-white/5 transition-colors flex items-center justify-center group"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              <div className="relative w-6 h-5">
                <span 
                  className={`
                    absolute left-0 w-6 h-0.5 bg-gray-300 rounded-full transition-all duration-300
                    ${isOpen ? 'rotate-45 top-2.5' : 'top-0'}
                  `}
                ></span>
                <span 
                  className={`
                    absolute left-0 w-6 h-0.5 bg-gray-300 rounded-full transition-all duration-300
                    ${isOpen ? 'opacity-0' : 'top-2.5 opacity-100'}
                  `}
                ></span>
                <span 
                  className={`
                    absolute left-0 w-6 h-0.5 bg-gray-300 rounded-full transition-all duration-300
                    ${isOpen ? '-rotate-45 top-2.5' : 'top-5'}
                  `}
                ></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div 
        className={`
          md:hidden overflow-hidden transition-all duration-300 ease-in-out
          ${isOpen ? 'max-h-[750px] opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="bg-slate-800/95 backdrop-blur-sm border-t border-slate-700/50 px-4 py-3">
          <div className="space-y-1">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="relative mb-3">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mobile-search-input w-full bg-slate-900/70 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all"
              />
              <i className="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"></i>
            </form>

            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={handleLinkClick}
                className={({ isActive }) => `
                  flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium transition-all
                  ${isActive 
                    ? 'text-cyan-400 bg-cyan-500/10' 
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }
                `}
                end={item.path === '/'}
              >
                <i className={`fas ${item.icon} w-5 text-cyan-400`}></i>
                {item.label}
              </NavLink>
            ))}
            
            {/* Get Started Button - Mobile */}
            <div className="pt-3 mt-2 border-t border-slate-700/50">
              <button 
                onClick={handleGetStarted}
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-3 rounded-xl text-sm font-medium transition-all shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-2"
              >
                <i className="fas fa-rocket"></i>
                Get Started
              </button>
            </div>

            {/* User Profile in Mobile - Clickable to My Account */}
            <button 
              onClick={handleMyAccount}
              className="flex items-center gap-3 pt-3 mt-2 border-t border-slate-700/50 w-full hover:bg-white/5 rounded-lg p-2 transition-all group"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-semibold flex-shrink-0">
                <span className="text-sm">JD</span>
              </div>
              <div className="flex-1 text-left">
                <p className="text-white text-sm font-medium group-hover:text-cyan-400 transition-colors">
                  John Doe
                </p>
                <p className="text-gray-400 text-xs">View Profile</p>
              </div>
              <i className="fas fa-chevron-right text-gray-500 group-hover:text-cyan-400 transition-colors"></i>
            </button>

            {/* Social Icons in Mobile */}
            <div className="flex items-center justify-center gap-6 pt-4 mt-2 border-t border-slate-700/50">
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-lg">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-lg">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-lg">
                <i className="fab fa-github"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-lg">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;