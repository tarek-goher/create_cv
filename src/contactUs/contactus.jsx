import React, { useState } from 'react';
import { Mail, User, MessageSquare } from 'lucide-react';
import emailjs from '@emailjs/browser';
import './ContactUs.css';

const ContactUs = ({ language }) => {
  const [loading, setLoading] = useState(false);

  const t = language === 'ar' ? {
    title: 'اتصل بنا',
    subtitle: 'نسعد بالرد على استفساراتكم وملاحظاتكم',
    intro: 'نحن هنا لمساعدتك في بناء سيرتك الذاتية الاحترافية. سواء كنت تواجه مشكلة تقنية، لديك استفسار حول القوالب، أو تحتاج إلى نصيحة حول كيفية تحسين سيرتك الذاتية، فريقنا جاهز للمساعدة.',
    whyContact: 'لماذا تتواصل معنا؟',
    reason1: 'الحصول على مساعدة فنية في استخدام الموقع',
    reason2: 'الاستفسار عن القوالب المتاحة وكيفية اختيار الأنسب',
    reason3: 'طلب نصائح احترافية لتحسين سيرتك الذاتية',
    reason4: 'اقتراح ميزات جديدة أو تقديم ملاحظات',
    reason5: 'الإبلاغ عن مشاكل تقنية أو أخطاء',
    howHelp: 'كيف يمكننا مساعدتك؟',
    helpText: 'املأ النموذج أدناه وسنرد عليك في أقرب وقت ممكن. نحن ملتزمون بتقديم أفضل تجربة ممكنة لمستخدمينا.',
    name: 'الاسم',
    namePlaceholder: 'أدخل اسمك الكامل',
    email: 'البريد الإلكتروني',
    emailPlaceholder: 'example@email.com',
    message: 'رسالتك',
    messagePlaceholder: 'اكتب رسالتك هنا... أخبرنا كيف يمكننا مساعدتك',
    send: 'إرسال الرسالة',
    sending: 'جاري الإرسال...',
    success: 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً ✅',
    error: 'حدث خطأ أثناء الإرسال. حاول مرة أخرى ❌',
    responseTime: 'وقت الاستجابة',
    responseText: 'نهدف للرد على جميع الرسائل خلال 24-48 ساعة في أيام العمل.',
  } : {
    title: 'Contact Us',
    subtitle: 'We\'d love to hear from you',
    intro: 'We\'re here to help you build your professional CV. Whether you\'re experiencing a technical issue, have questions about our templates, or need advice on improving your CV, our team is ready to assist.',
    whyContact: 'Why Contact Us?',
    reason1: 'Get technical support for using the website',
    reason2: 'Learn about available templates and how to choose the best one',
    reason3: 'Request professional advice to improve your CV',
    reason4: 'Suggest new features or provide feedback',
    reason5: 'Report technical problems or errors',
    howHelp: 'How Can We Help You?',
    helpText: 'Fill out the form below and we\'ll get back to you as soon as possible. We\'re committed to providing the best experience for our users.',
    name: 'Name',
    namePlaceholder: 'Enter your full name',
    email: 'Email',
    emailPlaceholder: 'example@email.com',
    message: 'Message',
    messagePlaceholder: 'Write your message here... Tell us how we can help you',
    send: 'Send Message',
    sending: 'Sending...',
    success: 'Your message has been sent successfully! We will contact you soon ✅',
    error: 'An error occurred while sending. Try again ❌',
    responseTime: 'Response Time',
    responseText: 'We aim to respond to all messages within 24-48 hours on business days.',
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
        
        {/* Header */}
        <div className="contact-header">
          <h1>{t.title}</h1>
          <p className="subtitle">{t.subtitle}</p>
        </div>

        {/* Introduction Section */}
        <div className="contact-intro">
          <p>{t.intro}</p>
        </div>

        {/* Why Contact Section */}
        <div className="contact-section">
          <h2>{t.whyContact}</h2>
          <ul className="reasons-list">
            <li>{t.reason1}</li>
            <li>{t.reason2}</li>
            <li>{t.reason3}</li>
            <li>{t.reason4}</li>
            <li>{t.reason5}</li>
          </ul>
        </div>

        {/* How We Can Help */}
        <div className="contact-section">
          <h2>{t.howHelp}</h2>
          <p>{t.helpText}</p>
        </div>

        {/* Contact Form */}
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

        {/* Response Time */}
        <div className="response-info">
          <h3>{t.responseTime}</h3>
          <p>{t.responseText}</p>
        </div>

      </div>
    </div>
  );
};

export default ContactUs;