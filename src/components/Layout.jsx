import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="bg-slate-900 min-h-screen text-white antialiased">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;