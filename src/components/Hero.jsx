const Hero = () => {
  return (
    <section className="hero-gradient text-white py-20 md:py-32 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Learn, Grow, <br />
            <span className="text-cyan-400">Connect</span> at Reanhub
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto md:mx-0">
            Your digital learning ecosystem. Explore courses, join communities, 
            and shape your future — all in one place.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start">
            <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-xl shadow-cyan-500/40 transition-all flex items-center gap-2">
              <i className="fas fa-rocket"></i> Start Learning
            </button>
            <button className="border border-white/30 hover:border-white text-white px-8 py-3 rounded-full text-lg font-medium transition-all flex items-center gap-2 backdrop-blur-sm">
              <i className="fas fa-play-circle"></i> Watch demo
            </button>
          </div>
          <div className="mt-10 flex items-center gap-8 text-gray-300 text-sm justify-center md:justify-start">
            <div className="flex items-center gap-2">
              <i className="fas fa-user-graduate text-cyan-400 text-xl"></i>
              <span>12k+ students</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fas fa-book-open text-cyan-400 text-xl"></i>
              <span>150+ courses</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fas fa-globe text-cyan-400 text-xl"></i>
              <span>4.9 rating</span>
            </div>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="relative w-72 h-72 md:w-96 md:h-96">
            <div className="absolute inset-0 bg-cyan-400/10 rounded-full blur-3xl"></div>
            <div className="relative flex items-center justify-center w-full h-full">
              <i className="fas fa-chalkboard-teacher text-9xl text-cyan-300/80 drop-shadow-2xl"></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;