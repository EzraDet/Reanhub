import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  // Mock course data - in real app, this would come from state/context
  const courseData = location.state || {
    course: {
      id: 1,
      title: 'Full Stack Web Development',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
      instructor: 'Dr. Sarah Johnson'
    }
  };

  // Payment form state
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: ''
  });

  const [paypalEmail, setPaypalEmail] = useState('');
  const [cryptoAddress, setCryptoAddress] = useState('');

  const [cardErrors, setCardErrors] = useState({});

  // Format card number with spaces
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  // Format expiry date
  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  // Validate card
  const validateCard = () => {
    const errors = {};
    const cardNum = cardDetails.cardNumber.replace(/\s/g, '');
    
    if (cardNum.length < 16) {
      errors.cardNumber = 'Card number must be 16 digits';
    }
    if (!cardDetails.cardName.trim()) {
      errors.cardName = 'Name on card is required';
    }
    if (cardDetails.expiry.length < 5) {
      errors.expiry = 'Expiry date is required';
    }
    if (cardDetails.cvv.length < 3) {
      errors.cvv = 'CVV is required';
    }
    
    setCardErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle payment submission
  const handlePayment = async (e) => {
    e.preventDefault();
    
    if (selectedMethod === 'card') {
      if (!validateCard()) return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Random success/failure for demo
      const success = Math.random() > 0.2;
      
      if (success) {
        setIsSuccess(true);
        setPaymentComplete(true);
        setTimeout(() => {
          navigate('/payment-success', { 
            state: { 
              course: courseData.course,
              transactionId: 'TXN-' + Math.random().toString(36).substring(2, 10).toUpperCase()
            }
          });
        }, 1500);
      } else {
        throw new Error('Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle input changes
  const handleCardChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (name === 'expiry') {
      formattedValue = formatExpiry(value);
    }

    setCardDetails({
      ...cardDetails,
      [name]: formattedValue
    });

    if (cardErrors[name]) {
      setCardErrors({
        ...cardErrors,
        [name]: ''
      });
    }
  };

  // Payment methods
  const paymentMethods = [
    { id: 'card', label: 'Credit/Debit Card', icon: 'fa-credit-card', color: 'text-blue-400' },
    { id: 'paypal', label: 'PayPal', icon: 'fa-paypal', color: 'text-blue-400' },
    { id: 'crypto', label: 'Cryptocurrency', icon: 'fa-bitcoin', color: 'text-orange-400' },
    { id: 'bank', label: 'Bank Transfer', icon: 'fa-university', color: 'text-green-400' }
  ];

  return (
    <div className="min-h-screen bg-slate-900 pt-8 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <Link to="/courses" className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2 mb-4">
            <i className="fas fa-arrow-left"></i>
            Back to Courses
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Checkout
          </h1>
          <p className="text-gray-400 mt-1">Complete your purchase securely</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Method Selection */}
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
              <h2 className="text-xl font-bold text-white mb-4">Payment Method</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`
                      p-4 rounded-xl border-2 transition-all text-center
                      ${selectedMethod === method.id 
                        ? 'border-cyan-400 bg-cyan-500/10' 
                        : 'border-slate-700 hover:border-slate-600 bg-slate-900/50'}
                    `}
                  >
                    <i className={`fas ${method.icon} text-2xl ${method.color}`}></i>
                    <p className="text-xs text-gray-300 mt-2">{method.label}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Form */}
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
              <form onSubmit={handlePayment}>
                {/* Credit/Debit Card Form */}
                {selectedMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-1">
                        Card Number <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <i className="fas fa-credit-card absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>
                        <input
                          type="text"
                          name="cardNumber"
                          value={cardDetails.cardNumber}
                          onChange={handleCardChange}
                          placeholder="1234 5678 9012 3456"
                          maxLength="19"
                          className={`w-full bg-slate-900/70 border rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all ${
                            cardErrors.cardNumber ? 'border-red-500' : 'border-slate-700'
                          }`}
                        />
                      </div>
                      {cardErrors.cardNumber && (
                        <p className="text-red-400 text-xs mt-1">{cardErrors.cardNumber}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-1">
                        Name on Card <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="cardName"
                        value={cardDetails.cardName}
                        onChange={handleCardChange}
                        placeholder="John Doe"
                        className={`w-full bg-slate-900/70 border rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all ${
                          cardErrors.cardName ? 'border-red-500' : 'border-slate-700'
                        }`}
                      />
                      {cardErrors.cardName && (
                        <p className="text-red-400 text-xs mt-1">{cardErrors.cardName}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-1">
                          Expiry Date <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          name="expiry"
                          value={cardDetails.expiry}
                          onChange={handleCardChange}
                          placeholder="MM/YY"
                          maxLength="5"
                          className={`w-full bg-slate-900/70 border rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all ${
                            cardErrors.expiry ? 'border-red-500' : 'border-slate-700'
                          }`}
                        />
                        {cardErrors.expiry && (
                          <p className="text-red-400 text-xs mt-1">{cardErrors.expiry}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-1">
                          CVV <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="password"
                          name="cvv"
                          value={cardDetails.cvv}
                          onChange={handleCardChange}
                          placeholder="123"
                          maxLength="4"
                          className={`w-full bg-slate-900/70 border rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all ${
                            cardErrors.cvv ? 'border-red-500' : 'border-slate-700'
                          }`}
                        />
                        {cardErrors.cvv && (
                          <p className="text-red-400 text-xs mt-1">{cardErrors.cvv}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-400 mt-2">
                      <i className="fas fa-lock text-cyan-400"></i>
                      <span>Your payment is secure and encrypted</span>
                    </div>
                  </div>
                )}

                {/* PayPal Form */}
                {selectedMethod === 'paypal' && (
                  <div className="space-y-4">
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex items-center gap-3">
                      <i className="fab fa-paypal text-blue-400 text-2xl"></i>
                      <div>
                        <p className="text-white font-medium">PayPal Checkout</p>
                        <p className="text-gray-400 text-sm">You'll be redirected to PayPal to complete your payment</p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-1">
                        PayPal Email
                      </label>
                      <input
                        type="email"
                        value={paypalEmail}
                        onChange={(e) => setPaypalEmail(e.target.value)}
                        placeholder="your-email@paypal.com"
                        className="w-full bg-slate-900/70 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all"
                      />
                    </div>
                  </div>
                )}

                {/* Cryptocurrency Form */}
                {selectedMethod === 'crypto' && (
                  <div className="space-y-4">
                    <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4 flex items-center gap-3">
                      <i className="fab fa-bitcoin text-orange-400 text-2xl"></i>
                      <div>
                        <p className="text-white font-medium">Cryptocurrency Payment</p>
                        <p className="text-gray-400 text-sm">We accept BTC, ETH, and USDC</p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-1">
                        Wallet Address
                      </label>
                      <input
                        type="text"
                        value={cryptoAddress}
                        onChange={(e) => setCryptoAddress(e.target.value)}
                        placeholder="Enter your wallet address"
                        className="w-full bg-slate-900/70 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all"
                      />
                    </div>
                    <div className="bg-slate-700/30 rounded-xl p-4">
                      <p className="text-sm text-gray-400">
                        <i className="fas fa-info-circle mr-2"></i>
                        Send the exact amount to the wallet address that will be displayed after confirmation.
                      </p>
                    </div>
                  </div>
                )}

                {/* Bank Transfer Form */}
                {selectedMethod === 'bank' && (
                  <div className="space-y-4">
                    <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                      <p className="text-white font-medium mb-2">Bank Transfer Details</p>
                      <div className="space-y-2 text-sm text-gray-400">
                        <p><span className="text-gray-300">Bank:</span> Chase Bank</p>
                        <p><span className="text-gray-300">Account Name:</span> Reanhub Inc.</p>
                        <p><span className="text-gray-300">Account Number:</span> 123456789</p>
                        <p><span className="text-gray-300">Routing Number:</span> 021000021</p>
                      </div>
                    </div>
                    <div className="bg-slate-700/30 rounded-xl p-4">
                      <p className="text-sm text-gray-400">
                        <i className="fas fa-info-circle mr-2"></i>
                        Please include your order number in the transfer description.
                      </p>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isProcessing || paymentComplete}
                  className={`w-full mt-6 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 flex items-center justify-center gap-2 ${
                    (isProcessing || paymentComplete) ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <div className="inline-block animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      Processing Payment...
                    </>
                  ) : paymentComplete ? (
                    <>
                      <i className="fas fa-check-circle"></i>
                      Payment Complete!
                    </>
                  ) : (
                    <>
                      <i className="fas fa-lock"></i>
                      Pay ${courseData.course.price.toFixed(2)}
                    </>
                  )}
                </button>

                {/* Security Badge */}
                <div className="flex items-center justify-center gap-6 mt-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <i className="fas fa-lock text-cyan-400"></i>
                    Secure Payment
                  </span>
                  <span className="flex items-center gap-1">
                    <i className="fas fa-shield-alt text-cyan-400"></i>
                    256-bit Encryption
                  </span>
                  <span className="flex items-center gap-1">
                    <i className="fas fa-check-circle text-cyan-400"></i>
                    SSL Certified
                  </span>
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 sticky top-24">
              <h2 className="text-xl font-bold text-white mb-4">Order Summary</h2>
              
              {/* Course Preview */}
              <div className="flex gap-4 mb-4 pb-4 border-b border-slate-700/50">
                <img 
                  src={courseData.course.image} 
                  alt={courseData.course.title}
                  className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-sm truncate">{courseData.course.title}</p>
                  <p className="text-gray-400 text-xs">{courseData.course.instructor}</p>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>Course Price</span>
                  <span>${courseData.course.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>Discount</span>
                  <span className="text-green-400">-${(courseData.course.price * 0.1).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>Tax</span>
                  <span>${(courseData.course.price * 0.08).toFixed(2)}</span>
                </div>
              </div>

              {/* Total */}
              <div className="pt-4 border-t border-slate-700/50">
                <div className="flex justify-between text-white text-lg font-bold">
                  <span>Total</span>
                  <span className="text-cyan-400">${(courseData.course.price * 1.08 - courseData.course.price * 0.1).toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Including tax and discount</p>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-slate-700/50">
                <div className="flex justify-around text-gray-500 text-xs">
                  <div className="flex flex-col items-center gap-1">
                    <i className="fas fa-shield-alt text-cyan-400 text-lg"></i>
                    <span>Secure</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <i className="fas fa-undo text-cyan-400 text-lg"></i>
                    <span>30-Day Refund</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <i className="fas fa-headset text-cyan-400 text-lg"></i>
                    <span>24/7 Support</span>
                  </div>
                </div>
              </div>

              {/* Help Link */}
              <div className="mt-4 text-center">
                <button className="text-gray-500 hover:text-gray-300 transition-colors text-xs flex items-center justify-center gap-1">
                  <i className="fas fa-question-circle"></i>
                  Need help with payment?
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;