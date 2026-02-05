import React, { useState } from 'react';
import { Mail, Shield, X } from 'lucide-react';
import emailjs from '@emailjs/browser';
import './Footer.css';

const Footer = ({ language }) => {
  const [showContact, setShowContact] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [loading, setLoading] = useState(false);

  const t = language === 'ar' ? {
    contact: 'اتصل بنا',
    privacy: 'سياسة الخصوصية',
    rights: '© 2026 منشئ السيرة الذاتية. جميع الحقوق محفوظة.',
    contactTitle: 'اتصل بنا',
    contactDesc: 'نسعد بالرد على استفساراتكم',
    email: 'البريد الإلكتروني',
    emailPlaceholder: 'أدخل بريدك الإلكتروني',
    name: 'الاسم',
    namePlaceholder: 'أدخل اسمك',
    message: 'الرسالة',
    messagePlaceholder: 'اكتب رسالتك هنا',
    send: 'إرسال',
    sending: 'جاري الإرسال...',
    close: 'إغلاق',
    success: 'تم الإرسال بنجاح! سنتواصل معك قريباً ✅',
    error: 'حدث خطأ! حاول مرة أخرى ❌',
    
    privacyTitle: 'سياسة الخصوصية',
    privacyIntro: 'نحن نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية.',
    dataCollection: 'جمع البيانات',
    dataCollectionText: 'نحن لا نقوم بجمع أو تخزين أي من بياناتك الشخصية. جميع المعلومات التي تدخلها في السيرة الذاتية تبقى على جهازك فقط.',
    dataUsage: 'استخدام البيانات',
    dataUsageText: 'البيانات المدخلة تُستخدم فقط لإنشاء السيرة الذاتية وتحميلها على جهازك. لا نشارك أو نبيع بياناتك لأي طرف ثالث.',
    cookies: 'ملفات تعريف الارتباط',
    cookiesText: 'نستخدم ملفات تعريف الارتباط الأساسية فقط لتحسين تجربة المستخدم (مثل حفظ اللغة والثيم المفضل).',
    security: 'الأمان',
    securityText: 'جميع العمليات تتم على جهازك. لا يتم إرسال أي بيانات إلى خوادمنا.',
    rights: 'حقوقك',
    rightsText: 'لك الحق الكامل في بياناتك. يمكنك حذف جميع المعلومات في أي وقت بمجرد تحديث الصفحة.'
  } : {
    contact: 'Contact Us',
    privacy: 'Privacy Policy',
    rights: '© 2026 CV Builder. All rights reserved.',
    contactTitle: 'Contact Us',
    contactDesc: 'We\'d love to hear from you',
    email: 'Email',
    emailPlaceholder: 'Enter your email',
    name: 'Name',
    namePlaceholder: 'Enter your name',
    message: 'Message',
    messagePlaceholder: 'Write your message here',
    send: 'Send',
    sending: 'Sending...',
    close: 'Close',
    success: 'Sent successfully! We will contact you soon ✅',
    error: 'Error occurred! Try again ❌',
    
    privacyTitle: 'Privacy Policy',
    privacyIntro: 'We respect your privacy and are committed to protecting your personal data.',
    dataCollection: 'Data Collection',
    dataCollectionText: 'We do not collect or store any of your personal data. All information you enter stays on your device only.',
    dataUsage: 'Data Usage',
    dataUsageText: 'The data you enter is only used to generate your CV and download it to your device. We do not share or sell your data to any third party.',
    cookies: 'Cookies',
    cookiesText: 'We only use essential cookies to improve user experience (such as saving your preferred language and theme).',
    security: 'Security',
    securityText: 'All operations are performed on your device. No data is sent to our servers.',
    rights: 'Your Rights',
    rightsText: 'You have full rights to your data. You can delete all information at any time by refreshing the page.'
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs.sendForm(
      'service_l2ronat',
      'template_wbqiifi',
      e.target,
      'p1GaqWaYCurEWGTdI'
    )
    .then(() => {
      alert(t.success);
      setShowContact(false);
      e.target.reset();
    })
    .catch((error) => {
      console.error('EmailJS Error:', error);
      alert(t.error);
    })
    .finally(() => {
      setLoading(false);
    });
  };

  return (
    <>
      <footer className={`footer ${language === 'ar' ? 'rtl' : 'ltr'}`}>
        <div className="footer-content">
          <div className="footer-links">
            <button className="footer-link" onClick={() => setShowContact(true)}>
              <Mail size={18} />
              {t.contact}
            </button>
            <button className="footer-link" onClick={() => setShowPrivacy(true)}>
              <Shield size={18} />
              {t.privacy}
            </button>
          </div>
          <div className="footer-copy">
            {t.rights}
          </div>
        </div>
      </footer>

      {showContact && (
        <div className="modal-overlay" onClick={() => setShowContact(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowContact(false)}>
              <X size={24} />
            </button>
            <h2>{t.contactTitle}</h2>
            <p className="modal-desc">{t.contactDesc}</p>
            <form onSubmit={handleContactSubmit}>
              <div className="form-group">
                <label>{t.name}</label>
                <input 
                  type="text"
                  name="from_name"
                  required 
                  placeholder={t.namePlaceholder}
                />
              </div>
              <div className="form-group">
                <label>{t.email}</label>
                <input 
                  type="email"
                  name="from_email"
                  required 
                  placeholder={t.emailPlaceholder}
                />
              </div>
              <div className="form-group">
                <label>{t.message}</label>
                <textarea 
                  rows="5"
                  name="message"
                  required 
                  placeholder={t.messagePlaceholder}
                ></textarea>
              </div>
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? t.sending : t.send}
              </button>
            </form>
          </div>
        </div>
      )}

      {showPrivacy && (
        <div className="modal-overlay" onClick={() => setShowPrivacy(false)}>
          <div className="modal-content privacy-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowPrivacy(false)}>
              <X size={24} />
            </button>
            <h2>{t.privacyTitle}</h2>
            <p className="modal-intro">{t.privacyIntro}</p>
            
            <div className="privacy-section">
              <h3>{t.dataCollection}</h3>
              <p>{t.dataCollectionText}</p>
            </div>
            
            <div className="privacy-section">
              <h3>{t.dataUsage}</h3>
              <p>{t.dataUsageText}</p>
            </div>
            
            <div className="privacy-section">
              <h3>{t.cookies}</h3>
              <p>{t.cookiesText}</p>
            </div>
            
            <div className="privacy-section">
              <h3>{t.security}</h3>
              <p>{t.securityText}</p>
            </div>
            
            <div className="privacy-section">
              <h3>{t.rights}</h3>
              <p>{t.rightsText}</p>
            </div>
            
            <button className="close-btn" onClick={() => setShowPrivacy(false)}>
              {t.close}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;