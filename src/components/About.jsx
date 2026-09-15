import { useState } from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  const [activeTab, setActiveTab] = useState('mission');

  const teamMembers = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://media.istockphoto.com/id/2228766181/photo/warmly-smiling-japanese-man-sitting-in-soft-backlight-at-home.jpg?s=2048x2048&w=is&k=20&c=ILCclUlRwjEA0SmiMfKSofngWA-yeSmXLYgY2yRElfg=',
      bio: 'Former professor with 15+ years in education technology'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: 'https://media.istockphoto.com/id/2228766181/photo/warmly-smiling-japanese-man-sitting-in-soft-backlight-at-home.jpg?s=2048x2048&w=is&k=20&c=ILCclUlRwjEA0SmiMfKSofngWA-yeSmXLYgY2yRElfg=',
      bio: 'Full-stack developer passionate about accessible learning'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Content',
      image: 'https://images.unsplash.com/photo-1621390842036-f01b53d9cbfd?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      bio: 'Curriculum designer with experience at top universities'
    },
    {
      name: 'David Kim',
      role: 'Community Manager',
      image: 'https://images.unsplash.com/photo-1621390842036-f01b53d9cbfd?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      bio: 'Building inclusive learning communities worldwide'
    }
  ];

  const stats = [
    { value: '12,450+', label: 'Active Students', icon: 'fa-users' },
    { value: '150+', label: 'Courses', icon: 'fa-book-open' },
    { value: '4.9', label: 'Average Rating', icon: 'fa-star' },
    { value: '98%', label: 'Satisfaction Rate', icon: 'fa-smile' }
  ];

  const milestones = [
    { year: '2020', title: 'Founded', description: 'Reanhub was born from a vision to democratize education' },
    { year: '2021', title: 'First 1000 Students', description: 'Reached 1000 students in our first year' },
    { year: '2022', title: 'Expansion', description: 'Launched 50+ new courses across multiple disciplines' },
    { year: '2023', title: 'Global Community', description: 'Students from 50+ countries joined our platform' },
    { year: '2024', title: 'Innovation', description: 'Introduced AI-powered learning recommendations' }
  ];

  return (
    <div className="min-h-screen bg-slate-900 pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            About <span className="text-cyan-400">Reanhub</span>
          </h1>
          <p className="mt-3 text-gray-400 text-lg max-w-2xl mx-auto">
            We're on a mission to make quality education accessible to everyone, everywhere.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 text-center hover:border-cyan-400/50 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-2xl mx-auto mb-3">
                <i className={`fas ${stat.icon}`}></i>
              </div>
              <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Mission/Vision Tabs */}
        <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 md:p-8 mb-16">
          <div className="flex flex-wrap gap-2 mb-6">
            {['mission', 'vision', 'values'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  px-6 py-2 rounded-full text-sm font-medium transition-all capitalize
                  ${activeTab === tab 
                    ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30' 
                    : 'bg-slate-700/50 text-gray-300 hover:bg-slate-700'}
                `}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="text-gray-300">
            {activeTab === 'mission' && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
                <p className="text-lg leading-relaxed">
                  To democratize education by providing high-quality, accessible, and affordable 
                  learning opportunities to people around the world. We believe that everyone 
                  deserves the chance to learn, grow, and achieve their full potential.
                </p>
              </div>
            )}
            {activeTab === 'vision' && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
                <p className="text-lg leading-relaxed">
                  A world where geographic and economic barriers no longer determine access to 
                  quality education. We envision a global community of lifelong learners who 
                  continuously grow and contribute to making the world a better place.
                </p>
              </div>
            )}
            {activeTab === 'values' && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Our Values</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-700/30 rounded-xl p-4">
                    <h4 className="text-cyan-400 font-semibold mb-2">🎯 Excellence</h4>
                    <p className="text-sm text-gray-400">We strive for the highest quality in everything we do</p>
                  </div>
                  <div className="bg-slate-700/30 rounded-xl p-4">
                    <h4 className="text-cyan-400 font-semibold mb-2">🤝 Inclusivity</h4>
                    <p className="text-sm text-gray-400">Everyone is welcome, regardless of background or skill level</p>
                  </div>
                  <div className="bg-slate-700/30 rounded-xl p-4">
                    <h4 className="text-cyan-400 font-semibold mb-2">💡 Innovation</h4>
                    <p className="text-sm text-gray-400">We continuously evolve to meet the needs of modern learners</p>
                  </div>
                  <div className="bg-slate-700/30 rounded-xl p-4">
                    <h4 className="text-cyan-400 font-semibold mb-2">🌍 Community</h4>
                    <p className="text-sm text-gray-400">Learning is better together, and we foster meaningful connections</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Timeline/Milestones */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Our <span className="text-cyan-400">Journey</span>
          </h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-cyan-500/30"></div>
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="flex-1 md:px-8">
                    <div className={`bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-cyan-400/50 transition-all ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <div className="flex items-center gap-3 mb-2 justify-start md:justify-end">
                        <span className="text-2xl font-bold text-cyan-400">{milestone.year}</span>
                        <span className="text-white font-semibold">{milestone.title}</span>
                      </div>
                      <p className="text-gray-400">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="relative flex items-center justify-center w-8 h-8 my-4 md:my-0">
                    <div className="w-4 h-4 rounded-full bg-cyan-500 border-4 border-slate-900 z-10"></div>
                  </div>
                  <div className="flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div>
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Meet Our <span className="text-cyan-400">Team</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 text-center hover:border-cyan-400/50 transition-all hover:-translate-y-2">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-cyan-400/50"
                />
                <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                <p className="text-cyan-400 text-sm font-medium">{member.role}</p>
                <p className="text-gray-400 text-sm mt-2">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-3xl p-8 md:p-12 border border-cyan-400/20 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to start your learning journey?
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Join 12,000+ students already learning on Reanhub
          </p>
          <Link to="/courses">
            <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg shadow-cyan-500/30 transition-all hover:shadow-cyan-500/50">
              Explore Courses <i className="fas fa-arrow-right ml-2"></i>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
