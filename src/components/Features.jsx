const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-slate-800/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/60 hover:border-cyan-400/50 transition-all hover:-translate-y-1 shadow-xl">
    <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-2xl mb-4">
      <i className={`fas fa-${icon}`}></i>
    </div>
    <h3 className="text-xl font-semibold text-white">{title}</h3>
    <p className="text-gray-400 mt-2 text-sm leading-relaxed">{desc}</p>
  </div>
);

const Features = () => {
  const features = [
    {
      icon: 'video',
      title: 'Interactive Videos',
      desc: 'Learn with high-quality, interactive video lessons from industry experts.',
    },
    {
      icon: 'users',
      title: 'Community Forums',
      desc: 'Collaborate, ask questions, and grow with a global community of learners.',
    },
    {
      icon: 'certificate',
      title: 'Certificates',
      desc: 'Earn verifiable certificates to showcase your skills and achievements.',
    },
    {
      icon: 'chart-line',
      title: 'Progress Tracking',
      desc: 'Monitor your learning journey with detailed analytics and milestones.',
    },
  ];

  return (
    <section id="courses" className="py-16 md:py-24 px-4 bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Built for modern <span className="text-cyan-400">learners</span>
          </h2>
          <p className="mt-3 text-gray-400 max-w-2xl mx-auto">
            Everything you need to master new skills and advance your career.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;