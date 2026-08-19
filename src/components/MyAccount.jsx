import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const MyAccount = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  // User data state
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    joinedDate: 'January 15, 2024',
    bio: 'Full-stack developer passionate about learning and teaching. Currently exploring React and Node.js.',
    location: 'San Francisco, CA',
    occupation: 'Software Engineer',
    website: 'https://johndoe.dev',
    github: 'johndoe',
    twitter: '@johndoe',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80'
  });

  const [formData, setFormData] = useState({ ...userData });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordErrors, setPasswordErrors] = useState({});

  // Enrolled courses data
  const enrolledCourses = [
    {
      id: 1,
      title: 'Full Stack Web Development',
      instructor: 'Dr. Sarah Johnson',
      progress: 75,
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=150&q=80',
      lastAccessed: '2 hours ago',
      nextLesson: 'Building REST APIs'
    },
    {
      id: 3,
      title: 'Data Science & Analytics',
      instructor: 'Prof. Michael Brown',
      progress: 45,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=150&q=80',
      lastAccessed: 'Yesterday',
      nextLesson: 'Machine Learning Basics'
    },
    {
      id: 5,
      title: 'Artificial Intelligence Fundamentals',
      instructor: 'Dr. Alan Turing',
      progress: 20,
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=150&q=80',
      lastAccessed: '3 days ago',
      nextLesson: 'Neural Networks Introduction'
    }
  ];

  // Course certificates
  const certificates = [
    {
      id: 1,
      title: 'Full Stack Web Development',
      date: '2024-01-15',
      credentialId: 'RHC-2024-001',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=150&q=80'
    },
    {
      id: 2,
      title: 'React Native Mobile Development',
      date: '2024-02-01',
      credentialId: 'RHC-2024-002',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=150&q=80'
    }
  ];

  // Activity history
  const activities = [
    { id: 1, type: 'course_started', title: 'Started "AI Fundamentals"', date: '2024-02-10', icon: 'fa-play-circle' },
    { id: 2, type: 'certificate_earned', title: 'Earned certificate for "Full Stack Web Development"', date: '2024-01-15', icon: 'fa-certificate' },
    { id: 3, type: 'course_completed', title: 'Completed "React Native Mobile Development"', date: '2024-01-28', icon: 'fa-check-circle' },
    { id: 4, type: 'review', title: 'Reviewed "Data Science & Analytics"', date: '2024-01-20', icon: 'fa-star' }
  ];

  // Handle profile edit
  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      setUserData(formData);
      setSuccessMessage('Profile updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle password change
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value
    });
  };

  const validatePassword = () => {
    const errors = {};
    if (!passwordData.currentPassword) {
      errors.currentPassword = 'Current password is required';
    }
    if (!passwordData.newPassword) {
      errors.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 6) {
      errors.newPassword = 'Password must be at least 6 characters';
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword()) return;

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccessMessage('Password updated successfully!');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      navigate('/');
    }
  };

  const renderProgressBar = (progress) => {
    const color = progress >= 70 ? 'bg-green-500' : progress >= 40 ? 'bg-yellow-500' : 'bg-cyan-500';
    return (
      <div className="w-full bg-slate-700 rounded-full h-2.5">
        <div 
          className={`h-2.5 rounded-full ${color} transition-all duration-500`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    );
  };

  // Tab configuration
  const tabs = [
    { id: 'profile', label: 'Profile', icon: 'fa-user' },
    { id: 'courses', label: 'My Courses', icon: 'fa-book' },
    { id: 'certificates', label: 'Certificates', icon: 'fa-certificate' },
    { id: 'activity', label: 'Activity', icon: 'fa-clock' },
    { id: 'settings', label: 'Settings', icon: 'fa-cog' }
  ];

  return (
    <div className="min-h-screen bg-slate-900 pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              My <span className="text-cyan-400">Account</span>
            </h1>
            <p className="text-gray-400 mt-1">Manage your profile and learning progress</p>
          </div>
          <Link to="/" className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2 mt-4 md:mt-0">
            <i className="fas fa-arrow-left"></i>
            Back to Home
          </Link>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-4 mb-6 flex items-center gap-3 animate-fade-in">
            <i className="fas fa-check-circle text-green-400 text-xl"></i>
            <p className="text-green-300">{successMessage}</p>
          </div>
        )}

        {/* Profile Card */}
        <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative">
              <img 
                src={userData.avatar} 
                alt={userData.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-cyan-400/50"
              />
              <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-cyan-500 hover:bg-cyan-600 text-white flex items-center justify-center transition-all shadow-lg shadow-cyan-500/30">
                <i className="fas fa-camera text-sm"></i>
              </button>
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-2xl font-bold text-white">{userData.name}</h2>
                <span className="text-xs bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full">
                  Member since {userData.joinedDate}
                </span>
              </div>
              <p className="text-gray-400 mt-1">{userData.email}</p>
              {userData.bio && <p className="text-gray-300 mt-2 text-sm max-w-2xl">{userData.bio}</p>}
              <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-400">
                {userData.location && (
                  <span className="flex items-center gap-1">
                    <i className="fas fa-map-marker-alt text-cyan-400"></i>
                    {userData.location}
                  </span>
                )}
                {userData.occupation && (
                  <span className="flex items-center gap-1">
                    <i className="fas fa-briefcase text-cyan-400"></i>
                    {userData.occupation}
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="text-red-400 hover:text-red-300 transition-colors flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-red-500/10"
            >
              <i className="fas fa-sign-out-alt"></i>
              Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-700/50 mb-8">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  px-6 py-3 rounded-t-lg text-sm font-medium transition-all flex items-center gap-2
                  ${activeTab === tab.id 
                    ? 'bg-slate-800 text-cyan-400 border-b-2 border-cyan-400' 
                    : 'text-gray-400 hover:text-white hover:bg-slate-800/50'}
                `}
              >
                <i className={`fas ${tab.icon}`}></i>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">Personal Information</h3>
                  <button
                    onClick={handleEditToggle}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      isEditing 
                        ? 'bg-green-500 hover:bg-green-600 text-white' 
                        : 'bg-cyan-500 hover:bg-cyan-600 text-white'
                    }`}
                  >
                    {isEditing ? (
                      <><i className="fas fa-save mr-2"></i> Save Changes</>
                    ) : (
                      <><i className="fas fa-edit mr-2"></i> Edit Profile</>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-1">Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-slate-900/70 border border-slate-700 rounded-xl px-4 py-2 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all"
                      />
                    ) : (
                      <p className="text-white">{userData.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-1">Email Address</label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-slate-900/70 border border-slate-700 rounded-xl px-4 py-2 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all"
                      />
                    ) : (
                      <p className="text-white">{userData.email}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-1">Location</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full bg-slate-900/70 border border-slate-700 rounded-xl px-4 py-2 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all"
                      />
                    ) : (
                      <p className="text-white">{userData.location || 'Not specified'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-1">Occupation</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="occupation"
                        value={formData.occupation}
                        onChange={handleInputChange}
                        className="w-full bg-slate-900/70 border border-slate-700 rounded-xl px-4 py-2 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all"
                      />
                    ) : (
                      <p className="text-white">{userData.occupation || 'Not specified'}</p>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-gray-400 text-sm font-medium mb-1">Bio</label>
                  {isEditing ? (
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full bg-slate-900/70 border border-slate-700 rounded-xl px-4 py-2 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all resize-none"
                    />
                  ) : (
                    <p className="text-white">{userData.bio || 'No bio yet'}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-1">Website</label>
                    {isEditing ? (
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        className="w-full bg-slate-900/70 border border-slate-700 rounded-xl px-4 py-2 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all"
                      />
                    ) : (
                      <p className="text-white">{userData.website || 'Not specified'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-1">GitHub</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="github"
                        value={formData.github}
                        onChange={handleInputChange}
                        className="w-full bg-slate-900/70 border border-slate-700 rounded-xl px-4 py-2 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all"
                      />
                    ) : (
                      <p className="text-white">{userData.github || 'Not specified'}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Change Password */}
              <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
                <h3 className="text-xl font-bold text-white mb-6">Change Password</h3>
                <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-1">Current Password</label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className={`w-full bg-slate-900/70 border rounded-xl px-4 py-2 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all ${
                        passwordErrors.currentPassword ? 'border-red-500' : 'border-slate-700'
                      }`}
                    />
                    {passwordErrors.currentPassword && (
                      <p className="text-red-400 text-xs mt-1">{passwordErrors.currentPassword}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-1">New Password</label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className={`w-full bg-slate-900/70 border rounded-xl px-4 py-2 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all ${
                        passwordErrors.newPassword ? 'border-red-500' : 'border-slate-700'
                      }`}
                    />
                    {passwordErrors.newPassword && (
                      <p className="text-red-400 text-xs mt-1">{passwordErrors.newPassword}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-1">Confirm New Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className={`w-full bg-slate-900/70 border rounded-xl px-4 py-2 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all ${
                        passwordErrors.confirmPassword ? 'border-red-500' : 'border-slate-700'
                      }`}
                    />
                    {passwordErrors.confirmPassword && (
                      <p className="text-red-400 text-xs mt-1">{passwordErrors.confirmPassword}</p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-xl transition-all shadow-lg shadow-cyan-500/30 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        Updating...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-key"></i>
                        Update Password
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* My Courses Tab */}
          {activeTab === 'courses' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {enrolledCourses.map((course) => (
                  <div key={course.id} className="bg-slate-800/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 hover:border-cyan-400/50 transition-all">
                    <div className="flex gap-4 p-4">
                      <img 
                        src={course.image} 
                        alt={course.title}
                        className="w-24 h-24 rounded-xl object-cover flex-shrink-0"
                      />
                      <div className="flex-1">
                        <h4 className="text-white font-semibold hover:text-cyan-400 transition-colors">
                          {course.title}
                        </h4>
                        <p className="text-gray-400 text-sm">{course.instructor}</p>
                        <div className="mt-2">
                          <div className="flex justify-between text-xs text-gray-400 mb-1">
                            <span>Progress {course.progress}%</span>
                            <span>{course.progress >= 100 ? 'Completed' : `${course.progress}% complete`}</span>
                          </div>
                          {renderProgressBar(course.progress)}
                        </div>
                        <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
                          <span>Last accessed: {course.lastAccessed}</span>
                          {course.progress < 100 && (
                            <span className="text-cyan-400">Next: {course.nextLesson}</span>
                          )}
                        </div>
                        <button className="mt-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium flex items-center gap-1">
                          {course.progress >= 100 ? 'Review Course' : 'Continue Learning'}
                          <i className="fas fa-arrow-right text-xs"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <Link to="/courses" className="inline-block bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-full transition-all shadow-lg shadow-cyan-500/30">
                  <i className="fas fa-plus mr-2"></i>
                  Browse More Courses
                </Link>
              </div>
            </div>
          )}

          {/* Certificates Tab */}
          {activeTab === 'certificates' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {certificates.map((cert) => (
                  <div key={cert.id} className="bg-slate-800/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 hover:border-cyan-400/50 transition-all">
                    <img 
                      src={cert.image} 
                      alt={cert.title}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-4">
                      <h4 className="text-white font-semibold">{cert.title}</h4>
                      <p className="text-gray-400 text-sm">Issued: {cert.date}</p>
                      <p className="text-gray-500 text-xs">Credential ID: {cert.credentialId}</p>
                      <button className="mt-3 text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-medium flex items-center gap-1">
                        <i className="fas fa-download"></i>
                        Download Certificate
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Activity Tab */}
          {activeTab === 'activity' && (
            <div className="space-y-6">
              <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-4 pb-4 border-b border-slate-700/50 last:border-0">
                      <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 flex-shrink-0">
                        <i className={`fas ${activity.icon}`}></i>
                      </div>
                      <div className="flex-1">
                        <p className="text-white">{activity.title}</p>
                        <p className="text-gray-400 text-sm">{activity.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
                <h3 className="text-xl font-bold text-white mb-4">Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Email Notifications</p>
                      <p className="text-gray-400 text-sm">Receive updates about your courses</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-slate-700 rounded-full peer peer-checked:bg-cyan-500 transition-all"></div>
                      <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-5"></span>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Dark Mode</p>
                      <p className="text-gray-400 text-sm">Enable dark theme</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-slate-700 rounded-full peer peer-checked:bg-cyan-500 transition-all"></div>
                      <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-5"></span>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Two-Factor Authentication</p>
                      <p className="text-gray-400 text-sm">Add an extra layer of security</p>
                    </div>
                    <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg transition-all text-sm">
                      Enable
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-red-400 mb-2">Danger Zone</h3>
                <p className="text-gray-400 text-sm mb-4">Permanently delete your account and all data</p>
                <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl transition-all">
                  <i className="fas fa-trash mr-2"></i>
                  Delete Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyAccount;