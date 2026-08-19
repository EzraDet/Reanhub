import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Courses = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const categories = ['All', 'Development', 'Design', 'Business', 'Marketing', 'Data Science', 'AI & ML'];

  const courses = [
    {
      id: 1,
      title: 'Full Stack Web Development',
      instructor: 'Dr. Sarah Johnson',
      category: 'Development',
      level: 'Advanced',
      rating: 4.9,
      students: 12450,
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
      tags: ['React', 'Node.js', 'MongoDB']
    },
    {
      id: 2,
      title: 'UI/UX Design Masterclass',
      instructor: 'Emily Chen',
      category: 'Design',
      level: 'Intermediate',
      rating: 4.8,
      students: 8730,
      price: 74.99,
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
      tags: ['Figma', 'Prototyping', 'User Research']
    },
    {
      id: 3,
      title: 'Data Science & Analytics',
      instructor: 'Prof. Michael Brown',
      category: 'Data Science',
      level: 'Advanced',
      rating: 4.9,
      students: 15420,
      price: 99.99,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
      tags: ['Python', 'Pandas', 'Machine Learning']
    },
    {
      id: 4,
      title: 'Digital Marketing Strategy',
      instructor: 'Jessica Williams',
      category: 'Marketing',
      level: 'Beginner',
      rating: 4.7,
      students: 9320,
      price: 64.99,
      image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f2c56d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
      tags: ['SEO', 'Social Media', 'Analytics']
    },
    {
      id: 5,
      title: 'Artificial Intelligence Fundamentals',
      instructor: 'Dr. Alan Turing',
      category: 'AI & ML',
      level: 'Intermediate',
      rating: 4.9,
      students: 11280,
      price: 94.99,
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
      tags: ['AI', 'Neural Networks', 'Deep Learning']
    },
    {
      id: 6,
      title: 'Business Strategy & Leadership',
      instructor: 'Robert Davis',
      category: 'Business',
      level: 'Advanced',
      rating: 4.6,
      students: 6540,
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
      tags: ['Leadership', 'Strategy', 'Management']
    },
    {
      id: 7,
      title: 'React Native Mobile Development',
      instructor: 'Mark Thompson',
      category: 'Development',
      level: 'Intermediate',
      rating: 4.8,
      students: 7810,
      price: 84.99,
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
      tags: ['React Native', 'Mobile', 'iOS', 'Android']
    },
    {
      id: 8,
      title: 'Graphic Design Bootcamp',
      instructor: 'Lisa Park',
      category: 'Design',
      level: 'Beginner',
      rating: 4.7,
      students: 10340,
      price: 59.99,
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
      tags: ['Photoshop', 'Illustrator', 'Design Theory']
    }
  ];

  // Handle enrollment - navigate to payment
  const handleEnroll = (course) => {
    // If already enrolled, you might want to show a message or navigate to course
    if (enrolledCourses.includes(course.id)) {
      alert('You are already enrolled in this course!');
      return;
    }
    
    // Navigate to payment page with course data
    navigate('/payment', { 
      state: { 
        course: course,
        from: 'courses' 
      } 
    });
  };

  // Filter and sort courses
  const filteredCourses = courses
    .filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'popular') return b.students - a.students;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return 0;
    });

  return (
    <div className="min-h-screen bg-slate-900 pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Explore <span className="text-cyan-400">Courses</span>
          </h1>
          <p className="mt-2 text-gray-400 text-lg">
            Discover {courses.length}+ courses taught by industry experts
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                placeholder="Search courses by title or instructor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-900/70 border border-slate-700 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-thin scrollbar-thumb-slate-700">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`
                    px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all
                    ${selectedCategory === category 
                      ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30' 
                      : 'bg-slate-700/50 text-gray-300 hover:bg-slate-700'}
                  `}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="relative min-w-[180px]">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-slate-900/70 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all appearance-none pr-10"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <i className="fas fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-400">
            Showing <span className="text-white font-semibold">{filteredCourses.length}</span> courses
          </p>
          <Link to="/" className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2">
            <i className="fas fa-arrow-left"></i>
            Back to Home
          </Link>
        </div>

        {/* Course Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map(course => {
              const isEnrolled = enrolledCourses.includes(course.id);
              return (
                <div key={course.id} className="group bg-slate-800/70 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/60 hover:border-cyan-400/50 transition-all hover:-translate-y-2 shadow-xl hover:shadow-cyan-500/10">
                  {/* Course Image */}
                  <Link to={`/course/${course.id}`}>
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={course.image} 
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3 bg-cyan-500/90 text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
                        {course.level}
                      </div>
                      {isEnrolled && (
                        <div className="absolute top-3 left-3 bg-green-500/90 text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm flex items-center gap-1">
                          <i className="fas fa-check-circle"></i>
                          Enrolled
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/80 to-transparent h-16"></div>
                    </div>
                  </Link>

                  {/* Course Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs text-cyan-400 font-medium bg-cyan-400/10 px-2 py-0.5 rounded-full">
                        {course.category}
                      </span>
                      <div className="flex items-center gap-1 text-yellow-400 text-sm">
                        <i className="fas fa-star"></i>
                        <span>{course.rating}</span>
                      </div>
                    </div>

                    <Link to={`/course/${course.id}`}>
                      <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors">
                        {course.title}
                      </h3>
                    </Link>
                    
                    <p className="text-sm text-gray-400 mb-3">
                      <i className="fas fa-user-graduate mr-2"></i>
                      {course.instructor}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {course.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-xs bg-slate-700/50 text-gray-300 px-2 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                      {course.tags.length > 2 && (
                        <span className="text-xs text-gray-500">+{course.tags.length - 2}</span>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
                      <div className="flex items-center gap-1 text-sm text-gray-400">
                        <i className="fas fa-users"></i>
                        <span>{course.students.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xl font-bold text-white">
                          ${course.price}
                        </span>
                        <button 
                          onClick={() => handleEnroll(course)}
                          className={`
                            px-4 py-1.5 rounded-full text-sm font-medium transition-all
                            ${isEnrolled 
                              ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/30 cursor-default' 
                              : 'bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50'
                            }
                          `}
                          disabled={isEnrolled}
                        >
                          {isEnrolled ? (
                            <><i className="fas fa-check mr-1"></i> Enrolled</>
                          ) : (
                            'Enroll Now'
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <i className="fas fa-search text-6xl text-gray-600 mb-4"></i>
            <h3 className="text-2xl font-semibold text-white">No courses found</h3>
            <p className="text-gray-400 mt-2">Try adjusting your search or filters</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="mt-4 bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-full transition-all"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Pagination (example) */}
        {filteredCourses.length > 0 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            <button className="px-4 py-2 rounded-lg border border-slate-700 text-gray-400 hover:text-white hover:border-slate-600 transition-colors">
              <i className="fas fa-chevron-left"></i>
            </button>
            <button className="px-4 py-2 rounded-lg bg-cyan-500 text-white font-medium">1</button>
            <button className="px-4 py-2 rounded-lg border border-slate-700 text-gray-400 hover:text-white hover:border-slate-600 transition-colors">
              2
            </button>
            <button className="px-4 py-2 rounded-lg border border-slate-700 text-gray-400 hover:text-white hover:border-slate-600 transition-colors">
              3
            </button>
            <span className="text-gray-600">...</span>
            <button className="px-4 py-2 rounded-lg border border-slate-700 text-gray-400 hover:text-white hover:border-slate-600 transition-colors">
              8
            </button>
            <button className="px-4 py-2 rounded-lg border border-slate-700 text-gray-400 hover:text-white hover:border-slate-600 transition-colors">
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;