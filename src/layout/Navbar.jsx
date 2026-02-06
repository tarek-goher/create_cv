// ==========================================
// NAVBAR COMPONENT WITH SIDEBAR
// ==========================================
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, FileText, Home, Lightbulb, Mail, Shield, Info, Globe, Moon, Sun, MessageSquare } from 'lucide-react';
import './Navbar.css';

function Navbar({ 
  language,
  theme,
  toggleTheme,
  toggleLanguage,
  currentStep, 
  setCurrentStep, 
  setShowConverter,
  resetToHome // الدالة الجديدة من App
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // دالة التنقل المحسّنة
  const handleNavClick = (path) => {
    if (path === '/') {
      // لو رايح للصفحة الرئيسية، اعمل reset كامل
      resetToHome();
    } else {
      // لو رايح لأي صفحة تانية، اعمل reset برضو
      setCurrentStep(1);
      setShowConverter(false);
    }
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // الصعود لأول الصفحة
    closeSidebar();
  };

  const handleBrandClick = () => {
    resetToHome();
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    closeSidebar();
  };

  const handleConverterClick = () => {
    setShowConverter(true);
    setCurrentStep(1);
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    closeSidebar();
  };

  // قائمة الروابط
  const navLinks = [
    { 
      path: '/', 
      labelAr: 'الرئيسية', 
      labelEn: 'Home',
      icon: <Home size={18} />
    },
    { 
      path: '/about', 
      labelAr: 'من نحن', 
      labelEn: 'About Us',
      icon: <Info size={18} />
    },
    { 
      path: '/cv-tips', 
      labelAr: 'نصائح السيرة الذاتية', 
      labelEn: 'CV Tips',
      icon: <FileText size={18} />
    },
    {
      path: '/interview-questions',
      labelAr: 'أسئلة المقابلات',
      labelEn: 'Interview Questions',
      icon: <MessageSquare size={18} />
    },
    { 
      path: '/contact', 
      labelAr: 'اتصل بنا', 
      labelEn: 'Contact Us',
      icon: <Mail size={18} />
    },
    { 
      path: '/privacy', 
      labelAr: 'سياسة الخصوصية', 
      labelEn: 'Privacy Policy',
      icon: <Shield size={18} />
    }
  ];

  return (
    <>
      <nav className="navbar no-print">
        <div className="navbar-content">
          {/* Brand Logo */}
          <div className="navbar-brand" onClick={handleBrandClick}>
            <span className="brand-icon">📄</span>
            <span className="brand-text">
              {language === 'ar' ? 'منشئ السيرة الذاتية' : 'CV Builder'}
            </span>
          </div>
          
          {/* Desktop Navigation Links */}
          <div className="navbar-links">
            {navLinks.map((link) => (
              <button
                key={link.path}
                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                onClick={() => handleNavClick(link.path)}
              >
                <span className="nav-link-icon">{link.icon}</span>
                <span className="nav-link-text">
                  {language === 'ar' ? link.labelAr : link.labelEn}
                </span>
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="navbar-actions">
            {/* PDF to Word Converter Button */}
            <button className="converter-btn" onClick={handleConverterClick}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
              </svg>
              <span className="btn-text">
                {language === 'ar' ? 'PDF إلى Word' : 'PDF to Word'}
              </span>
            </button>

            {/* Language Toggle Button */}
            <button 
              className="icon-btn language-btn" 
              onClick={toggleLanguage}
              aria-label="Toggle language"
              title={language === 'ar' ? 'English' : 'العربية'}
            >
              <Globe size={20} />
              <span className="btn-text">
                {language === 'ar' ? 'EN' : 'AR'}
              </span>
            </button>

            {/* Dark Mode Toggle Button */}
            <button 
              className="icon-btn theme-btn" 
              onClick={toggleTheme}
              aria-label="Toggle theme"
              title={theme === 'dark' ? (language === 'ar' ? 'الوضع الفاتح' : 'Light Mode') : (language === 'ar' ? 'الوضع الداكن' : 'Dark Mode')}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Mobile Menu Button */}
            <button 
              className="mobile-menu-btn" 
              onClick={toggleSidebar}
              aria-label="Toggle menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      <div 
        className={`sidebar-overlay ${isSidebarOpen ? 'open' : ''}`} 
        onClick={closeSidebar}
      ></div>

      {/* Mobile Sidebar */}
      <div className={`mobile-sidebar ${isSidebarOpen ? 'open' : ''} ${language === 'ar' ? 'rtl' : 'ltr'}`}>
        {/* Sidebar Header */}
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <span className="brand-icon">📄</span>
            <span className="brand-text">
              {language === 'ar' ? 'منشئ السيرة الذاتية' : 'CV Builder'}
            </span>
          </div>
          <button className="close-sidebar-btn" onClick={closeSidebar}>
            <X size={24} />
          </button>
        </div>

        {/* Sidebar Links */}
        <div className="sidebar-links">
          {navLinks.map((link) => (
            <button
              key={link.path}
              className={`sidebar-link ${location.pathname === link.path ? 'active' : ''}`}
              onClick={() => handleNavClick(link.path)}
            >
              <span className="sidebar-link-icon">{link.icon}</span>
              <span className="sidebar-link-text">
                {language === 'ar' ? link.labelAr : link.labelEn}
              </span>
            </button>
          ))}
        </div>

        {/* Sidebar Footer - بس زر التحويل */}
        <div className="sidebar-footer">
          <button className="sidebar-converter-btn" onClick={handleConverterClick}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
            </svg>
            <span>{language === 'ar' ? 'PDF إلى Word' : 'PDF to Word'}</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default Navbar;