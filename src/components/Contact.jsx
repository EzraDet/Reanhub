import { useState } from 'react';
import { Link } from 'react-router-dom';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formData.subject.length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const contactInfo = [
    {
      icon: 'fa-envelope',
      title: 'Email',
      details: ['support@reanhub.com', 'hello@reanhub.com'],
      action: 'mailto:support@reanhub.com'
    },
    {
      icon: 'fa-phone',
      title: 'Phone',
      details: ['+(855) 123-4567', '+(855) 987-6543'],
      action: 'tel:+855012345678'
    },
    {
      icon: 'fa-map-marker-alt',
      title: 'Location',
      details: ['Siem Reap', 'San Francisco, Cambodia'],
      action: 'https://maps.google.com'
    }
  ];

  const faqs = [
    {
      question: 'How do I enroll in a course?',
      answer: 'Simply browse our course catalog, select a course you\'re interested in, and click the "Enroll" button. You\'ll need to create an account if you haven\'t already. Once enrolled, you\'ll have immediate access to all course materials.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. All payments are securely processed through our encrypted payment system. We also offer payment plans for select courses.'
    },
    {
      question: 'Can I get a refund?',
      answer: 'Yes, we offer a 30-day money-back guarantee for all courses. If you\'re not satisfied with your purchase for any reason, you can request a full refund within 30 days of enrollment. No questions asked.'
    },
    {
      question: 'Do I get a certificate after completion?',
      answer: 'Yes! All our courses include a verifiable certificate of completion that you can share on LinkedIn, add to your resume, or print. Our certificates are recognized by employers worldwide and include a unique verification code.'
    },
    {
      question: 'How long do I have access to the course?',
      answer: 'You get lifetime access to all course materials once you enroll. This includes all videos, downloadable resources, and future updates. You can learn at your own pace and revisit the content anytime.'
    },
    {
      question: 'Is there any prerequisite for the courses?',
      answer: 'Each course has its own prerequisites listed in the course description. We offer courses for all levels - from beginner to advanced. Check the course page for specific requirements before enrolling.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 text-cyan-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <i className="fas fa-headset"></i>
            <span>We're here to help</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Get in <span className="text-cyan-400">Touch</span>
          </h1>
          <p className="mt-3 text-gray-400 text-lg max-w-2xl mx-auto">
            Have questions, feedback, or partnership ideas? We'd love to hear from you!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2 bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                <i className="fas fa-pen"></i>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Send us a message</h2>
                <p className="text-sm text-gray-400">We'll get back to you within 24 hours</p>
              </div>
            </div>
            
            {isSubmitted && (
              <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-4 mb-6 flex items-start gap-3 animate-fade-in">
                <i className="fas fa-check-circle text-green-400 text-xl mt-0.5"></i>
                <div>
                  <p className="text-green-300 font-medium">Message sent successfully!</p>
                  <p className="text-green-300/70 text-sm">We'll get back to you as soon as possible.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <i className="fas fa-user absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className={`w-full bg-slate-900/70 border rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all ${
                        errors.name ? 'border-red-500' : 'border-slate-700'
                      }`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                      <i className="fas fa-exclamation-circle"></i>
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <i className="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      className={`w-full bg-slate-900/70 border rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all ${
                        errors.email ? 'border-red-500' : 'border-slate-700'
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                      <i className="fas fa-exclamation-circle"></i>
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1">
                  Subject <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <i className="fas fa-tag absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="What's this about?"
                    className={`w-full bg-slate-900/70 border rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all ${
                      errors.subject ? 'border-red-500' : 'border-slate-700'
                    }`}
                  />
                </div>
                {errors.subject && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    <i className="fas fa-exclamation-circle"></i>
                    {errors.subject}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1">
                  Message <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <i className="fas fa-comment absolute left-4 top-4 text-gray-500"></i>
                  <textarea
                    rows="5"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell us how we can help..."
                    className={`w-full bg-slate-900/70 border rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all resize-none ${
                      errors.message ? 'border-red-500' : 'border-slate-700'
                    }`}
                  ></textarea>
                </div>
                <div className="flex justify-between items-center mt-1">
                  {errors.message && (
                    <p className="text-red-400 text-xs flex items-center gap-1">
                      <i className="fas fa-exclamation-circle"></i>
                      {errors.message}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 ml-auto">
                    {formData.message.length}/500 characters
                  </p>
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 flex items-center justify-center gap-2 ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="inline-block animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane"></i>
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info & Social */}
          <div className="space-y-6">
            {/* Contact Info Cards */}
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.action}
                target={info.action.includes('http') ? '_blank' : '_self'}
                rel="noopener noreferrer"
                className="block group bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-cyan-400/50 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/5"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/30 transition-all">
                    <i className={`fas ${info.icon}`}></i>
                  </div>
                  <h3 className="text-lg font-semibold text-white">{info.title}</h3>
                </div>
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                    {detail}
                  </p>
                ))}
              </a>
            ))}

            {/* Social Links */}
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-cyan-400/50 transition-all">
              <h3 className="text-lg font-semibold text-white mb-4">Follow us</h3>
              <div className="flex flex-wrap gap-3">
                <a href="#" className="w-12 h-12 rounded-xl bg-slate-700/50 hover:bg-cyan-500/20 text-gray-400 hover:text-cyan-400 flex items-center justify-center text-xl transition-all border border-slate-700/50 hover:border-cyan-400/50 hover:-translate-y-1">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="w-12 h-12 rounded-xl bg-slate-700/50 hover:bg-cyan-500/20 text-gray-400 hover:text-cyan-400 flex items-center justify-center text-xl transition-all border border-slate-700/50 hover:border-cyan-400/50 hover:-translate-y-1">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="#" className="w-12 h-12 rounded-xl bg-slate-700/50 hover:bg-cyan-500/20 text-gray-400 hover:text-cyan-400 flex items-center justify-center text-xl transition-all border border-slate-700/50 hover:border-cyan-400/50 hover:-translate-y-1">
                  <i className="fab fa-github"></i>
                </a>
                <a href="#" className="w-12 h-12 rounded-xl bg-slate-700/50 hover:bg-cyan-500/20 text-gray-400 hover:text-cyan-400 flex items-center justify-center text-xl transition-all border border-slate-700/50 hover:border-cyan-400/50 hover:-translate-y-1">
                  <i className="fab fa-youtube"></i>
                </a>
                <a href="#" className="w-12 h-12 rounded-xl bg-slate-700/50 hover:bg-cyan-500/20 text-gray-400 hover:text-cyan-400 flex items-center justify-center text-xl transition-all border border-slate-700/50 hover:border-cyan-400/50 hover:-translate-y-1">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>

            {/* Back to Home */}
            <Link to="/" className="block">
              <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-4 border border-slate-700/50 hover:border-cyan-400/50 transition-all text-center group hover:-translate-y-1">
                <span className="text-cyan-400 group-hover:text-cyan-300 transition-colors flex items-center justify-center gap-2">
                  <i className="fas fa-arrow-left"></i>
                  Back to Home
                </span>
              </div>
            </Link>
          </div>
        </div>

        {/* FAQ Section with Accordion */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white">
              Frequently Asked <span className="text-cyan-400">Questions</span>
            </h2>
            <p className="text-gray-400 mt-2">Find answers to commonly asked questions</p>
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-700/50 hover:border-cyan-400/50 transition-all overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-700/20 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-white flex items-start gap-3">
                    <span className="text-cyan-400 mt-1 flex-shrink-0">Q:</span>
                    <span>{faq.question}</span>
                  </h3>
                  <span className={`text-cyan-400 transition-transform duration-300 flex-shrink-0 ${
                    openFaq === index ? 'rotate-180' : ''
                  }`}>
                    <i className="fas fa-chevron-down"></i>
                  </span>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-4 text-gray-400">
                    <p className="flex items-start gap-3">
                      <span className="text-cyan-400 flex-shrink-0">A:</span>
                      <span>{faq.answer}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16 bg-slate-800/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50">
          <div className="p-6 md:p-8">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <i className="fas fa-map-marked-alt text-cyan-400"></i>
              Find Us
            </h3>
            <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12945.304556417326!2d104.85682069833723!3d11.40091172230962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31095cbb6e934a05%3A0x8be9f88f1e96df62!2sSiem%20Reap!5e1!3m2!1sen!2skh!4v1787125490172!5m2!1sen!2skh"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Reanhub Location"
                className="filter brightness-90 hover:brightness-100 transition-all duration-300"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;