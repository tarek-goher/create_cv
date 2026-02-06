import React from 'react';
import { Mail, Shield, Lightbulb, FileText, Home, Info, MessageSquare, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './footer.css';

const Footer = ({ language, resetToHome }) => {
  const navigate = useNavigate();

  const t = language === 'ar' ? {
    brandName: 'منشئ السيرة الذاتية',
    brandSlogan: 'اصنع سيرتك الذاتية الاحترافية',
    quickLinks: 'روابط سريعة',
    resources: 'موارد مفيدة',
    contact: 'تواصل معنا',
    home: 'الرئيسية',
    about: 'من نحن',
    cvTips: 'نصائح السيرة الذاتية',
    interviewQuestions: 'أسئلة الإنترفيو',
    motivationalQuotes: 'اقتباسات تحفيزية',
    contactUs: 'اتصل بنا',
    privacy: 'سياسة الخصوصية',
    rights: '© 2026 منشئ السيرة الذاتية. جميع الحقوق محفوظة.',
  } : {
    brandName: 'CV Builder',
    brandSlogan: 'Create Your Professional CV',
    quickLinks: 'Quick Links',
    resources: 'Resources',
    contact: 'Contact',
    home: 'Home',
    about: 'About Us',
    cvTips: 'CV Tips',
    interviewQuestions: 'Interview Questions',
    motivationalQuotes: 'Motivational Quotes',
    contactUs: 'Contact Us',
    privacy: 'Privacy Policy',
    rights: '© 2026 CV Builder. All rights reserved.',
  };

  const quickLinks = [
    { path: '/', label: t.home, icon: <Home size={18} /> },
    { path: '/about', label: t.about, icon: <Info size={18} /> },
  ];

  const resourceLinks = [
    { path: '/cv-tips', label: t.cvTips, icon: <FileText size={18} /> },
    { path: '/interview-questions', label: t.interviewQuestions, icon: <MessageSquare size={18} /> },
    { path: '/Tips', label: t.motivationalQuotes, icon: <Lightbulb size={18} /> },
  ];

  const contactLinks = [
    { path: '/contact', label: t.contactUs, icon: <Mail size={18} /> },
    { path: '/privacy', label: t.privacy, icon: <Shield size={18} /> },
  ];

  // دالة للتنقل مع الصعود لأول الصفحة
  const handleNavigation = (path) => {
    if (path === '/') {
      // لو رايح للصفحة الرئيسية، اعمل reset كامل
      resetToHome();
    }
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`footer ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="footer-content">
        
        {/* Brand Section */}
        <div className="footer-section footer-brand-section">
          <div className="footer-brand">
            <div className="footer-logo">
              <Briefcase size={32} />
            </div>
            <div className="brand-text-footer">
              <h3>{t.brandName}</h3>
              <p>{t.brandSlogan}</p>
            </div>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="footer-section">
          <h4 className="footer-section-title">{t.quickLinks}</h4>
          <div className="footer-links-group">
            {quickLinks.map((link, index) => (
              <button 
                key={index}
                className="footer-link" 
                onClick={() => handleNavigation(link.path)}
              >
                {link.icon}
                <span>{link.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Resources Section */}
        <div className="footer-section">
          <h4 className="footer-section-title">{t.resources}</h4>
          <div className="footer-links-group">
            {resourceLinks.map((link, index) => (
              <button 
                key={index}
                className="footer-link" 
                onClick={() => handleNavigation(link.path)}
              >
                {link.icon}
                <span>{link.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="footer-section">
          <h4 className="footer-section-title">{t.contact}</h4>
          <div className="footer-links-group">
            {contactLinks.map((link, index) => (
              <button 
                key={index}
                className="footer-link" 
                onClick={() => handleNavigation(link.path)}
              >
                {link.icon}
                <span>{link.label}</span>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <div className="footer-copy">
          {t.rights}
        </div>
      </div>
    </footer>
  );
};

export default Footer;