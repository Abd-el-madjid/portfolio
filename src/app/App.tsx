import { useState, useEffect } from 'react';
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

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

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
  }, [currentPage, selectedProject]);

  const toggleTheme = () => setIsDark(!isDark);

  const openBooking = () => {
    setIsBookingOpen(true);
    setIsMobileMenuOpen(false);
  };

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    setSelectedProject(null);
  };

  const openProject = (projectId: string) => {
    setSelectedProject(projectId);
  };

  const closeProject = () => {
    setSelectedProject(null);
  };

  const renderPage = () => {
    if (selectedProject) {
      return (
        <ProjectDetailPage
          isDark={isDark}
          projectId={selectedProject}
          onBack={closeProject}
          onProjectChange={setSelectedProject}
        />
      );
    }

    switch (currentPage) {
      case 'home':
        return <HomePage isDark={isDark} onNavigate={navigateTo} onOpenBooking={openBooking} />;
      case 'about':
        return <AboutPage isDark={isDark} />;
      case 'services':
        return <ServicesPage isDark={isDark} />;
      case 'projects':
        return <ProjectsPage isDark={isDark} onProjectClick={openProject} />;
      default:
        return <HomePage isDark={isDark} onNavigate={navigateTo} onOpenBooking={openBooking} />;
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
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

      {/* Main Content */}
      <main>{renderPage()}</main>

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
    </div>
  );
}
