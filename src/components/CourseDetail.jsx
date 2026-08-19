import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedLesson, setSelectedLesson] = useState(null);

  // Mock course data - In real app, fetch from API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const courseData = getCourseData(parseInt(id));
      if (courseData) {
        setCourse(courseData);
        setSelectedLesson(courseData.curriculum[0]);
      }
      setLoading(false);
    }, 500);
  }, [id]);

  const getCourseData = (courseId) => {
    const courses = {
      1: {
        id: 1,
        title: 'Full Stack Web Development',
        instructor: 'Dr. Sarah Johnson',
        category: 'Development',
        level: 'Advanced',
        rating: 4.9,
        students: 12450,
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
        tags: ['React', 'Node.js', 'MongoDB', 'Express', 'JavaScript'],
        description: 'Master full stack web development with MERN stack. Build real-world applications from scratch with this comprehensive course. Learn both frontend and backend development with modern tools and best practices.',
        longDescription: 'This comprehensive Full Stack Web Development course is designed to take you from a complete beginner to a professional full stack developer. You\'ll learn everything from HTML, CSS, and JavaScript basics to advanced concepts like React, Node.js, Express, and MongoDB.\n\nThroughout the course, you\'ll build multiple real-world projects that will strengthen your portfolio and prepare you for job interviews. You\'ll also learn about deployment, version control with Git, and modern development workflows.',
        prerequisites: ['Basic understanding of programming concepts', 'Familiarity with HTML/CSS', 'No prior React or Node.js experience required'],
        whatYouLearn: [
          'Build complete full stack applications with MERN',
          'Create RESTful APIs with Node.js and Express',
          'Build interactive UIs with React and Hooks',
          'Manage database with MongoDB and Mongoose',
          'Implement authentication and authorization',
          'Deploy applications to cloud platforms',
          'Use Git and GitHub for version control',
          'Write clean, maintainable code'
        ],
        curriculum: [
          {
            title: 'Introduction to Web Development',
            lessons: [
              'Course Overview and Setup',
              'How the Web Works',
              'Setting Up Your Development Environment',
              'Introduction to HTML5',
              'CSS3 Fundamentals',
              'JavaScript Basics'
            ]
          },
          {
            title: 'Frontend Development with React',
            lessons: [
              'Introduction to React',
              'Components and Props',
              'State and Lifecycle',
              'Hooks in Depth',
              'React Router',
              'State Management with Redux',
              'Building Reusable Components',
              'React Performance Optimization'
            ]
          },
          {
            title: 'Backend Development with Node.js',
            lessons: [
              'Node.js Fundamentals',
              'Express.js Framework',
              'Building REST APIs',
              'Authentication with JWT',
              'Database Integration with MongoDB',
              'Error Handling and Validation',
              'API Documentation'
            ]
          },
          {
            title: 'Full Stack Project: E-Commerce App',
            lessons: [
              'Project Planning and Setup',
              'Building the Backend API',
              'Creating the Frontend Interface',
              'Implementing User Authentication',
              'Shopping Cart Functionality',
              'Payment Integration',
              'Order Management',
              'Deployment to Production'
            ]
          }
        ],
        reviews: [
          {
            id: 1,
            user: 'John Doe',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80',
            rating: 5,
            date: '2024-01-15',
            comment: 'This course is absolutely fantastic! The instructor explains complex concepts in a very understandable way. I went from knowing nothing about web development to building my own full stack applications. Highly recommended!'
          },
          {
            id: 2,
            user: 'Jane Smith',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80',
            rating: 5,
            date: '2024-01-10',
            comment: 'One of the best courses I\'ve ever taken. The project-based approach really helps solidify the concepts. The instructor is very responsive to questions and provides great feedback.'
          },
          {
            id: 3,
            user: 'Mike Johnson',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80',
            rating: 4,
            date: '2024-01-05',
            comment: 'Great course content! The only reason I\'m giving 4 stars is that some sections could be more detailed. Overall, I learned a lot and would recommend it to others.'
          }
        ],
        relatedCourses: [
          { id: 3, title: 'Data Science & Analytics', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=150&q=80' },
          { id: 5, title: 'Artificial Intelligence Fundamentals', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=150&q=80' },
          { id: 7, title: 'React Native Mobile Development', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=150&q=80' }
        ]
      },
      // Add more course data for other IDs...
    };
    return courses[courseId] || null;
  };

  const handleEnroll = () => {
    setIsEnrolled(!isEnrolled);
    // In real app, this would make an API call
  };

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <i key={i} className={`fas fa-star ${i < rating ? 'text-yellow-400' : 'text-gray-600'}`}></i>
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-cyan-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-400">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
        <div className="text-center">
          <i className="fas fa-exclamation-circle text-6xl text-gray-600 mb-4"></i>
          <h2 className="text-2xl font-bold text-white">Course Not Found</h2>
          <p className="text-gray-400 mt-2">The course you're looking for doesn't exist.</p>
          <Link to="/courses" className="mt-6 inline-block bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-full transition-all">
            <i className="fas fa-arrow-left mr-2"></i>
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-700/50">
        <div className="absolute inset-0 opacity-10">
          <img src={course.image} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Link to="/courses" className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2 mb-4">
                <i className="fas fa-arrow-left"></i>
                Back to Courses
              </Link>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs text-cyan-400 font-medium bg-cyan-400/10 px-3 py-1 rounded-full">
                  {course.category}
                </span>
                <span className="text-xs text-gray-400 font-medium bg-slate-700/50 px-3 py-1 rounded-full">
                  {course.level}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                {course.title}
              </h1>
              <p className="text-gray-300 text-lg mb-6">{course.description}</p>
              <div className="flex flex-wrap items-center gap-4 text-gray-400">
                <div className="flex items-center gap-2">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50&q=80" 
                    alt={course.instructor}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm text-white">{course.instructor}</p>
                    <p className="text-xs">Instructor</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex">{renderStars(course.rating)}</div>
                  <span className="text-white font-semibold">{course.rating}</span>
                  <span className="text-gray-500">({course.reviews.length} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fas fa-users"></i>
                  <span>{course.students.toLocaleString()} students</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 shadow-xl">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
                <div className="flex items-end gap-3 mb-4">
                  <span className="text-3xl font-bold text-white">${course.price}</span>
                  <span className="text-gray-400 text-sm line-through">${(course.price * 1.3).toFixed(2)}</span>
                  <span className="text-green-400 text-sm font-medium">30% off</span>
                </div>
                <button
                  onClick={handleEnroll}
                  className={`
                    w-full py-3 rounded-xl font-semibold transition-all shadow-lg mb-3
                    ${isEnrolled 
                      ? 'bg-green-500 hover:bg-green-600 text-white shadow-green-500/30' 
                      : 'bg-cyan-500 hover:bg-cyan-600 text-white shadow-cyan-500/30 hover:shadow-cyan-500/50'
                    }
                  `}
                >
                  {isEnrolled ? (
                    <><i className="fas fa-check mr-2"></i> Enrolled</>
                  ) : (
                    <><i className="fas fa-shopping-cart mr-2"></i> Enroll Now</>
                  )}
                </button>
                <div className="space-y-2 text-sm text-gray-400">
                  <p className="flex items-center gap-2">
                    <i className="fas fa-clock text-cyan-400 w-5"></i>
                    <span>Full lifetime access</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <i className="fas fa-certificate text-cyan-400 w-5"></i>
                    <span>Certificate of completion</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <i className="fas fa-mobile-alt text-cyan-400 w-5"></i>
                    <span>Access on mobile and TV</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <i className="fas fa-refresh text-cyan-400 w-5"></i>
                    <span>30-day money-back guarantee</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tabs */}
        <div className="border-b border-slate-700/50 mb-8">
          <div className="flex flex-wrap gap-2">
            {['overview', 'curriculum', 'reviews', 'instructor'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  px-6 py-3 rounded-t-lg text-sm font-medium transition-all capitalize
                  ${activeTab === tab 
                    ? 'bg-slate-800 text-cyan-400 border-b-2 border-cyan-400' 
                    : 'text-gray-400 hover:text-white hover:bg-slate-800/50'}
                `}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Course Description</h2>
                <p className="text-gray-300 whitespace-pre-line">{course.longDescription}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">What You'll Learn</h3>
                  <ul className="space-y-2">
                    {course.whatYouLearn.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-300">
                        <i className="fas fa-check-circle text-cyan-400 mt-1"></i>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Prerequisites</h3>
                  <ul className="space-y-2">
                    {course.prerequisites.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-300">
                        <i className="fas fa-check-circle text-cyan-400 mt-1"></i>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Course Stats */}
              <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
                <h3 className="text-xl font-semibold text-white mb-4">Course Statistics</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">Total Students</p>
                    <p className="text-white font-semibold">{course.students.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Rating</p>
                    <p className="text-white font-semibold">{course.rating} ★</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Total Reviews</p>
                    <p className="text-white font-semibold">{course.reviews.length}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Lessons</p>
                    <p className="text-white font-semibold">{course.curriculum.reduce((acc, curr) => acc + curr.lessons.length, 0)}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Curriculum Tab */}
          {activeTab === 'curriculum' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Course Curriculum</h2>
              <div className="space-y-4">
                {course.curriculum.map((section, index) => (
                  <div key={index} className="bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700/50">
                    <div className="p-4 bg-slate-800/80 cursor-pointer hover:bg-slate-800 transition-colors">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-white">
                          {index + 1}. {section.title}
                        </h3>
                        <span className="text-sm text-gray-400">{section.lessons.length} lessons</span>
                      </div>
                    </div>
                    <div className="p-4 space-y-2">
                      {section.lessons.map((lesson, idx) => (
                        <div 
                          key={idx}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-700/30 transition-colors cursor-pointer"
                          onClick={() => setSelectedLesson({ section: section.title, lesson })}
                        >
                          <i className="fas fa-play-circle text-cyan-400"></i>
                          <span className="text-gray-300 text-sm">{lesson}</span>
                          <span className="ml-auto text-xs text-gray-500">15 min</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">Reviews</h2>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex">{renderStars(course.rating)}</div>
                    <span className="text-white font-semibold text-lg">{course.rating}</span>
                    <span className="text-gray-400">({course.reviews.length} reviews)</span>
                  </div>
                </div>
                <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-full transition-all">
                  Write a Review
                </button>
              </div>

              <div className="space-y-6">
                {course.reviews.map((review) => (
                  <div key={review.id} className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
                    <div className="flex items-start gap-4">
                      <img 
                        src={review.avatar} 
                        alt={review.user}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="text-white font-semibold">{review.user}</p>
                            <div className="flex items-center gap-2">
                              <div className="flex">{renderStars(review.rating)}</div>
                              <span className="text-xs text-gray-500">{review.date}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-300">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Instructor Tab */}
          {activeTab === 'instructor' && (
            <div>
              <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700/50">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80" 
                    alt={course.instructor}
                    className="w-32 h-32 rounded-full object-cover border-4 border-cyan-400/50"
                  />
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white">{course.instructor}</h2>
                    <p className="text-cyan-400 text-sm mb-4">Senior Instructor & Developer</p>
                    <div className="flex gap-6 mb-4 text-sm">
                      <div>
                        <p className="text-gray-400">Students</p>
                        <p className="text-white font-semibold">15,234</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Courses</p>
                        <p className="text-white font-semibold">8</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Rating</p>
                        <p className="text-white font-semibold">4.9 ★</p>
                      </div>
                    </div>
                    <p className="text-gray-300">
                      Dr. Sarah Johnson is a passionate educator with over 15 years of experience 
                      in web development and teaching. She holds a Ph.D. in Computer Science and 
                      has taught at several top universities. Her mission is to make complex 
                      concepts accessible and enjoyable for all learners.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Related Courses */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-6">Related Courses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {course.relatedCourses.map((related) => (
              <Link 
                key={related.id} 
                to={`/course/${related.id}`}
                className="group bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700/50 hover:border-cyan-400/50 transition-all hover:-translate-y-1"
              >
                <img 
                  src={related.image} 
                  alt={related.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4">
                  <h3 className="text-white font-semibold group-hover:text-cyan-400 transition-colors">
                    {related.title}
                  </h3>
                  <button className="mt-2 text-cyan-400 hover:text-cyan-300 transition-colors text-sm flex items-center gap-1">
                    View Course <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CourseDetail;