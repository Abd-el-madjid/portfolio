// File Location: src/App.tsx

import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { CosmicBackground } from './components/CosmicBackground';
import { CustomCursorOptimized } from './components/CustomCursorOptimized';
import { HeaderWithPages } from './components/HeaderWithPages';
import { MobileMenu } from './components/MobileMenu';
import { HomePage } from './components/pages/HomePage';
import { AboutPage } from './components/pages/AboutPage';
import { ServicesPage } from './components/pages/ServicesPage';
import { ProjectsPage } from './components/pages/ProjectsPage';
import { ProjectDetailPage } from './components/pages/ProjectDetailPage';
import { BookingOverlayImproved } from './components/BookingOverlayImproved';
import { LoadingScreen } from './components/LoadingScreen';
import { useImagePreloader, getCriticalImages } from './hooks/useImagePreloader';
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

// Wrapper component for project details to get projectId from URL
function ProjectDetailWrapper({ isDark }: { isDark: boolean }) {
  const navigate = useNavigate();
  const location = useLocation();
  const projectId = location.pathname.split('/projects/')[1];

  const handleBack = () => {
    navigate('/projects');
  };

  const handleProjectChange = (newProjectId: string) => {
    navigate(`/projects/${newProjectId}`);
  };

  return (
    <ProjectDetailPage
      isDark={isDark}
      projectId={projectId}
      onBack={handleBack}
      onProjectChange={handleProjectChange}
    />
  );
}

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  // Preload critical images (main project images)
  // Change to getAllProjectImages() to preload ALL images (slower but more comprehensive)
  const { isLoading, progress, loadedCount, totalCount } = useImagePreloader(
    getCriticalImages(),
    {
      minLoadTime: 800, // Minimum loading screen display time
      onProgress: (prog) => {
        if (import.meta.env.DEV) {
          console.log(`Loading progress: ${prog}%`);
        }
      }
    }
  );

  // Determine current page from URL
  const pathname = location.pathname;
  const currentPage = pathname === '/' ? 'home' 
    : pathname.startsWith('/projects') ? 'projects'
    : pathname.replace('/', '');

  // Apply theme class to document
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Hide default cursor
  useEffect(() => {
    document.body.style.cursor = 'none';
    const style = document.createElement('style');
    style.innerHTML = `
      *, *::before, *::after {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.body.style.cursor = 'auto';
      document.head.removeChild(style);
    };
  }, []);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  // Log loading stats in development
  useEffect(() => {
    if (import.meta.env.DEV && !isLoading) {
      console.log(`✅ Loaded ${loadedCount}/${totalCount} images successfully`);
    }
  }, [isLoading, loadedCount, totalCount]);

  const toggleTheme = () => setIsDark(!isDark);

  const openBooking = () => {
    setIsBookingOpen(true);
    setIsMobileMenuOpen(false);
  };

  const navigateTo = (page: string) => {
    navigate(`/${page === 'home' ? '' : page}`);
  };

  const openProject = (projectId: string) => {
    navigate(`/projects/${projectId}`);
  };

  // Show loading screen while preloading assets
  if (isLoading) {
    return <LoadingScreen isDark={isDark} progress={progress} />;
  }

  return (
    <div className="relative min-h-screen">
      {/* Cosmic Background */}
      <CosmicBackground isDark={isDark} />

      {/* Custom Cursor */}
      <CustomCursorOptimized isDark={isDark} />

      {/* Header */}
      <HeaderWithPages
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onOpenBooking={openBooking}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        currentPage={currentPage}
        onNavigate={navigateTo}
      />

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        isDark={isDark}
        onOpenBooking={openBooking}
        onNavigate={navigateTo}
      />

      {/* Main Content - Router */}
      <main>
        <Routes>
          <Route 
            path="/" 
            element={
              <HomePage 
                isDark={isDark} 
                onNavigate={navigateTo} 
                onOpenBooking={openBooking} 
              />
            } 
          />
          <Route 
            path="/about" 
            element={<AboutPage isDark={isDark} />} 
          />
          <Route 
            path="/services" 
            element={<ServicesPage isDark={isDark} />} 
          />
          <Route 
            path="/projects" 
            element={
              <ProjectsPage 
                isDark={isDark} 
                onProjectClick={openProject} 
              />
            } 
          />
          <Route 
            path="/projects/:projectId" 
            element={<ProjectDetailWrapper isDark={isDark} />} 
          />
        </Routes>
      </main>

      {/* Booking Overlay */}
      <BookingOverlayImproved
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        isDark={isDark}
      />

      {/* Footer */}
      <footer className="relative py-12 px-6 text-center">
        <div
          className="max-w-4xl mx-auto backdrop-blur-xl rounded-3xl p-8 shadow-2xl"
          style={{
            background: isDark
              ? 'rgba(10, 14, 39, 0.6)'
              : 'rgba(255, 255, 255, 0.5)',
            border: `1px solid ${
              isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(3, 105, 161, 0.2)'
            }`,
          }}
        >
          <p className={isDark ? 'text-gray-300' : 'text-slate-700'}>
            © {new Date().getFullYear()} Abd El Madjid. Built with intention, designed with purpose.
          </p>
        </div>
      </footer>

      {/* Vercel Analytics */}
      <SpeedInsights />
      <Analytics />
    </div>
  );
}