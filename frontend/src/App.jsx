import React, { Suspense, lazy, useEffect, Component } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LoadingSpinner from './components/shared/LoadingSpinner';
import { TranslationProvider } from './hooks/useTranslation';

// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home'));
const ProductCatalog = lazy(() => import('./pages/ProductCatalog'));
const Contact = lazy(() => import('./pages/Contact'));

// Error Boundary to prevent "ghost" redirects
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Application Crash:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 text-center px-4">
          <h1 className="text-3xl font-serif font-bold text-midnight-900 mb-4">Something went wrong.</h1>
          <p className="text-gray-600 mb-6 max-w-md">We encountered an unexpected error. Please refresh the page.</p>
          <pre className="bg-gray-100 p-4 rounded text-xs text-left overflow-auto max-w-full mb-6 border border-gray-300 font-mono text-red-600">
            {this.state.error?.message}
          </pre>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-gold-500 text-midnight-900 font-bold rounded hover:bg-gold-400 transition-colors"
          >
            Refresh Application
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Scroll to top helper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  return (
    <ErrorBoundary>
      <TranslationProvider>
        <Router>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen font-sans text-gray-800 antialiased selection:bg-ocean-200 selection:text-ocean-900">
            <Navbar />

            <main className="flex-grow">
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<ProductCatalog />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </Suspense>
            </main>

            <Footer />
          </div>
        </Router>
      </TranslationProvider>
    </ErrorBoundary>
  );
};

export default App;
