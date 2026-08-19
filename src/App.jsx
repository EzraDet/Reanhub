import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import About from './components/About';
import Contact from './components/Contact';
import GetStarted from './components/GetStarted';
import MyAccount from './components/MyAccount';
import MyLearning from './components/MyLearning';
import Payment from './components/Payment';
import PaymentSuccess from './components/PaymentSuccess';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route index element={<Home />} />
        <Route path="courses" element={<Courses />} />
        <Route path="course/:id" element={<CourseDetail />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="get-started" element={<GetStarted />} />
        
        {/* User Routes */}
        <Route path="my-account" element={<MyAccount />} />
        <Route path="my-learning" element={<MyLearning />} />
        
        {/* Payment Routes */}
        <Route path="payment" element={<Payment />} />
        <Route path="payment-success" element={<PaymentSuccess />} />
      </Route>
    </Routes>
  );
}

export default App;