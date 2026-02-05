import React from 'react';
import { Mail, Shield, Lightbulb, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './footer.css';

const Footer = ({ language }) => {
  const navigate = useNavigate();

  const t = language === 'ar' ? {
    brandName: 'منشئ السيرة الذاتية',
    contact: 'اتصل بنا',
    privacy: 'سياسة الخصوصية',
    tips: 'نصائح السيرة الذاتية',
    rights: '© 2026 منشئ السيرة الذاتية. جميع الحقوق محفوظة.',
  } : {
    brandName: 'CV Builder',
    contact: 'Contact Us',
    privacy: 'Privacy Policy',
    tips: 'CV Tips',
    rights: '© 2026 CV Builder. All rights reserved.',
  };

  return (
    <footer className={`footer ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="footer-content">
        
        {/* Brand Section with Icon */}
        <div className="footer-brand">
          <div className="footer-logo">
            <FileText size={32} />
          </div>
          <div className="brand-text-footer">
            <h3>{t.brandName}</h3>
            <p>Create Your Professional CV</p>
          </div>
        </div>

        {/* Links Section */}
        <div className="footer-links">
          <button 
            className="footer-link" 
            onClick={() => navigate('/contact')}
          >
            <Mail size={18} />
            {t.contact}
          </button>

          <button 
            className="footer-link" 
            onClick={() => navigate('/privacy')}
          >
            <Shield size={18} />
            {t.privacy}
          </button>

          <button 
            className="footer-link tips-link" 
            onClick={() => navigate('/cv-tips')}
          >
            <Lightbulb size={18} />
            {t.tips}
          </button>
        </div>

        {/* Copyright */}
        <div className="footer-copy">
          {t.rights}
        </div>
      </div>
    </footer>
  );
};

export default Footer;