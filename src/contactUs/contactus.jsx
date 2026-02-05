import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Mail, User, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import './ContactUs.css';

const ContactUs = ({ language }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const t = language === 'ar' ? {
    back: 'رجوع',
    title: 'اتصل بنا',
    subtitle: 'نسعد بالرد على استفساراتكم وملاحظاتكم',
    name: 'الاسم',
    namePlaceholder: 'أدخل اسمك الكامل',
    email: 'البريد الإلكتروني',
    emailPlaceholder: 'example@email.com',
    message: 'رسالتك',
    messagePlaceholder: 'اكتب رسالتك هنا...',
    send: 'إرسال الرسالة',
    sending: 'جاري الإرسال...',
    success: 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً ✅',
    error: 'حدث خطأ أثناء الإرسال. حاول مرة أخرى ❌',
  } : {
    back: 'Back',
    title: 'Contact Us',
    subtitle: 'We\'d love to hear from you',
    name: 'Name',
    namePlaceholder: 'Enter your full name',
    email: 'Email',
    emailPlaceholder: 'example@email.com',
    message: 'Message',
    messagePlaceholder: 'Write your message here...',
    send: 'Send Message',
    sending: 'Sending...',
    success: 'Your message has been sent successfully! We will contact you soon ✅',
    error: 'An error occurred while sending. Try again ❌',
  };

  const handleSubmit = (e) => {
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
    <div className={`contact-page ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="contact-container">
        <button className="back-btn" onClick={() => navigate('/')}>
          {language === 'ar' ? <ArrowRight size={20} /> : <ArrowLeft size={20} />}
          {t.back}
        </button>

        <div className="contact-header">
          <h1>{t.title}</h1>
          <p>{t.subtitle}</p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              <User size={18} />
              {t.name}
            </label>
            <input
              type="text"
              name="from_name"
              required
              placeholder={t.namePlaceholder}
            />
          </div>

          <div className="form-group">
            <label>
              <Mail size={18} />
              {t.email}
            </label>
            <input
              type="email"
              name="from_email"
              required
              placeholder={t.emailPlaceholder}
            />
          </div>

          <div className="form-group">
            <label>
              <MessageSquare size={18} />
              {t.message}
            </label>
            <textarea
              name="message"
              rows="6"
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
  );
};

export default ContactUs;