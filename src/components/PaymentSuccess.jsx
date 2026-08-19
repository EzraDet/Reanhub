import { Link, useLocation } from 'react-router-dom';

const PaymentSuccess = () => {
  const location = useLocation();
  const { course, transactionId } = location.state || {
    course: { title: 'Course', price: 89.99 },
    transactionId: 'TXN-' + Math.random().toString(36).substring(2, 10).toUpperCase()
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 py-16">
      <div className="max-w-2xl w-full">
        <div className="bg-slate-800/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-slate-700/50 text-center">
          {/* Success Icon */}
          <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6 animate-bounce">
            <i className="fas fa-check-circle text-green-400 text-5xl"></i>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Payment Successful! 🎉
          </h1>
          <p className="text-gray-400 text-lg mb-6">
            Your enrollment in "{course.title}" is complete.
          </p>

          {/* Transaction Details */}
          <div className="bg-slate-900/50 rounded-2xl p-6 mb-8 text-left">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Transaction ID</span>
                <span className="text-cyan-400 font-mono">{transactionId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Course</span>
                <span className="text-white">{course.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Amount Paid</span>
                <span className="text-white font-bold">${course.price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Date</span>
                <span className="text-white">{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/my-account" className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-full transition-all shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-2">
              <i className="fas fa-user"></i>
              Go to My Courses
            </Link>
            <Link to="/courses" className="border border-slate-700 hover:border-slate-600 text-white px-8 py-3 rounded-full transition-all flex items-center justify-center gap-2">
              <i className="fas fa-book"></i>
              Browse More Courses
            </Link>
          </div>

          {/* Receipt Button */}
          <button className="mt-4 text-gray-500 hover:text-gray-300 transition-colors text-sm flex items-center justify-center gap-2">
            <i className="fas fa-download"></i>
            Download Receipt
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;