import { useState } from 'react';
import { Link } from 'react-router-dom';

const MyLearning = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  // Mock enrolled courses data
  const enrolledCourses = [
    {
      id: 1,
      title: 'Full Stack Web Development',
      instructor: 'Dr. Sarah Johnson',
      progress: 75,
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
      lastAccessed: '2 hours ago',
      nextLesson: 'Building REST APIs',
      completed: false,
      certificate: false
    },
    {
      id: 3,
      title: 'Data Science & Analytics',
      instructor: 'Prof. Michael Brown',
      progress: 45,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
      lastAccessed: 'Yesterday',
      nextLesson: 'Machine Learning Basics',
      completed: false,
      certificate: false
    },
    {
      id: 5,
      title: 'Artificial Intelligence Fundamentals',
      instructor: 'Dr. Alan Turing',
      progress: 100,
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
      lastAccessed: '3 days ago',
      nextLesson: 'Course Completed!',
      completed: true,
      certificate: true
    },
    {
      id: 7,
      title: 'React Native Mobile Development',
      instructor: 'Mark Thompson',
      progress: 20,
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
      lastAccessed: '1 week ago',
      nextLesson: 'React Native Basics',
      completed: false,
      certificate: false
    }
  ];

  // Filter courses
  const getFilteredCourses = () => {
    if (activeFilter === 'in-progress') {
      return enrolledCourses.filter(c => !c.completed);
    } else if (activeFilter === 'completed') {
      return enrolledCourses.filter(c => c.completed);
    }
    return enrolledCourses;
  };

  const filteredCourses = getFilteredCourses();

  // Get stats
  const totalCourses = enrolledCourses.length;
  const completedCourses = enrolledCourses.filter(c => c.completed).length;
  const inProgressCourses = enrolledCourses.filter(c => !c.completed).length;
  const averageProgress = Math.round(
    enrolledCourses.reduce((acc, c) => acc + c.progress, 0) / totalCourses
  );

  const renderProgressBar = (progress) => {
    const color = progress >= 100 ? 'bg-green-500' : progress >= 70 ? 'bg-cyan-500' : progress >= 40 ? 'bg-yellow-500' : 'bg-blue-500';
    return (
      <div className="w-full bg-slate-700 rounded-full h-2.5">
        <div 
          className={`h-2.5 rounded-full ${color} transition-all duration-500`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-900 pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            My <span className="text-cyan-400">Learning</span>
          </h1>
          <p className="text-gray-400 mt-1">Track your progress and continue learning</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-4 border border-slate-700/50">
            <p className="text-gray-400 text-sm">Total Courses</p>
            <p className="text-2xl font-bold text-white">{totalCourses}</p>
          </div>
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-4 border border-slate-700/50">
            <p className="text-gray-400 text-sm">In Progress</p>
            <p className="text-2xl font-bold text-cyan-400">{inProgressCourses}</p>
          </div>
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-4 border border-slate-700/50">
            <p className="text-gray-400 text-sm">Completed</p>
            <p className="text-2xl font-bold text-green-400">{completedCourses}</p>
          </div>
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-4 border border-slate-700/50">
            <p className="text-gray-400 text-sm">Avg. Progress</p>
            <p className="text-2xl font-bold text-yellow-400">{averageProgress}%</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeFilter === 'all' 
                ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30' 
                : 'bg-slate-700/50 text-gray-300 hover:bg-slate-700'
            }`}
          >
            All Courses ({totalCourses})
          </button>
          <button
            onClick={() => setActiveFilter('in-progress')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeFilter === 'in-progress' 
                ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30' 
                : 'bg-slate-700/50 text-gray-300 hover:bg-slate-700'
            }`}
          >
            In Progress ({inProgressCourses})
          </button>
          <button
            onClick={() => setActiveFilter('completed')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeFilter === 'completed' 
                ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30' 
                : 'bg-slate-700/50 text-gray-300 hover:bg-slate-700'
            }`}
          >
            Completed ({completedCourses})
          </button>
        </div>

        {/* Course Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCourses.map((course) => (
              <div key={course.id} className="bg-slate-800/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 hover:border-cyan-400/50 transition-all hover:-translate-y-1">
                <div className="flex gap-4 p-4">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-24 h-24 rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-white font-semibold truncate hover:text-cyan-400 transition-colors">
                        {course.title}
                      </h4>
                      {course.completed && (
                        <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full flex-shrink-0">
                          <i className="fas fa-check-circle mr-1"></i>
                          Completed
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm">{course.instructor}</p>
                    
                    {/* Progress */}
                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      {renderProgressBar(course.progress)}
                    </div>

                    {/* Course Info */}
                    <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
                      <span>Last accessed: {course.lastAccessed}</span>
                      {!course.completed && (
                        <span className="text-cyan-400">Next: {course.nextLesson}</span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3 mt-3">
                      <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-1.5 rounded-full text-xs font-medium transition-all shadow-lg shadow-cyan-500/30">
                        {course.completed ? 'Review Course' : 'Continue Learning'}
                      </button>
                      {course.completed && course.certificate && (
                        <button className="text-cyan-400 hover:text-cyan-300 transition-colors text-xs flex items-center gap-1">
                          <i className="fas fa-certificate"></i>
                          Certificate
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-700/50">
            <i className="fas fa-book-open text-6xl text-gray-600 mb-4"></i>
            <h3 className="text-2xl font-semibold text-white">No courses found</h3>
            <p className="text-gray-400 mt-2">
              {activeFilter === 'in-progress' 
                ? 'You have no courses in progress. Start learning today!' 
                : activeFilter === 'completed'
                ? 'You haven\'t completed any courses yet. Keep learning!'
                : 'You haven\'t enrolled in any courses yet.'}
            </p>
            <Link to="/courses">
              <button className="mt-4 bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-full transition-all shadow-lg shadow-cyan-500/30">
                Browse Courses
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLearning;