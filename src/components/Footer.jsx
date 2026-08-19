const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 py-8 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <i className="fas fa-graduation-cap text-cyan-400 text-xl"></i>
          <span className="text-white text-xl font-bold">
            Rean<span className="text-cyan-400">hub</span>
          </span>
        </div>
        <div className="flex gap-6 text-gray-400 text-sm">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Support</a>
        </div>
        <div className="flex gap-4 text-gray-400">
          <a href="#" className="hover:text-white transition-colors text-lg">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="hover:text-white transition-colors text-lg">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a href="#" className="hover:text-white transition-colors text-lg">
            <i className="fab fa-github"></i>
          </a>
          <a href="#" className="hover:text-white transition-colors text-lg">
            <i className="fab fa-youtube"></i>
          </a>
        </div>
      </div>
      <div className="text-center text-gray-500 text-xs mt-6 border-t border-slate-800/50 pt-6">
        &copy; {new Date().getFullYear()} Reanhub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;