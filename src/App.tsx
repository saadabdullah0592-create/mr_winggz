import { useState, useCallback, useEffect } from 'react';
import { CartProvider } from '@/context/CartContext';
import { AdminAuthProvider, useAdminAuth } from '@/context/AdminAuthContext';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import PromoStrip from '@/components/PromoStrip';
import MenuSection from '@/components/MenuSection';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import CheckoutPage from '@/components/CheckoutPage';
import AdminLogin from '@/components/AdminLogin';
import AdminPanel from '@/components/AdminPanel';

type View = 'home' | 'checkout' | 'admin';

function AppContent() {
  const { session, loading: authLoading } = useAdminAuth();
  const [view, setView] = useState<View>('home');

  // Hash-based routing for /#admin
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#admin') {
        setView('admin');
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const goToCheckout = useCallback(() => setView('checkout'), []);
  const goHome = useCallback(() => {
    if (window.location.hash === '#admin') {
      window.history.replaceState(null, '', window.location.pathname);
    }
    setView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Admin view
  if (view === 'admin') {
    if (authLoading) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-black">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-red-600 border-t-transparent" />
        </div>
      );
    }
    if (!session) {
      return <AdminLogin onBack={goHome} />;
    }
    return <AdminPanel onBack={goHome} />;
  }

  return (
    <CartProvider>
      <div className="min-h-screen bg-black">
        <Navbar />

        {view === 'checkout' ? (
          <CheckoutPage onBack={goHome} />
        ) : (
          <main>
            <Hero />
            <PromoStrip />
            <MenuSection />
            <About />
            <Contact />
          </main>
        )}

        <Footer />

        <CartDrawer onCheckout={goToCheckout} />
      </div>
    </CartProvider>
  );
}

function App() {
  return (
    <AdminAuthProvider>
      <AppContent />
    </AdminAuthProvider>
  );
}

export default App;
