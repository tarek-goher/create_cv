import React from 'react';
import { ArrowLeft, ArrowRight, Shield, Lock, Eye, FileText, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Privacy.css';

const Privacy = ({ language }) => {
  const navigate = useNavigate();

  const t = language === 'ar' ? {
    back: 'رجوع',
    title: 'سياسة الخصوصية',
    intro: 'نحن نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية.',
    
    dataCollection: 'جمع البيانات',
    dataCollectionText: 'نحن لا نقوم بجمع أو تخزين أي من بياناتك الشخصية. جميع المعلومات التي تدخلها في السيرة الذاتية تبقى على جهازك فقط ولا يتم إرسالها إلى أي خادم خارجي.',
    
    dataUsage: 'استخدام البيانات',
    dataUsageText: 'البيانات المدخلة تُستخدم فقط لإنشاء السيرة الذاتية وتحميلها على جهازك. لا نشارك أو نبيع أو نكشف بياناتك لأي طرف ثالث تحت أي ظرف من الظروف.',
    
    cookies: 'ملفات تعريف الارتباط (Cookies)',
    cookiesText: 'نستخدم ملفات تعريف الارتباط الأساسية لتحسين تجربة المستخدم، مثل حفظ اللغة المفضلة والثيم. قد نستخدم أيضاً خدمات طرف ثالث مثل Google AdSense لعرض الإعلانات، والتي قد تستخدم ملفات تعريف الارتباط لتقديم إعلانات مخصصة. يمكنك التحكم في ملفات تعريف الارتباط من خلال إعدادات المتصفح. لمزيد من المعلومات: https://policies.google.com/technologies/partner-sites',
    
    security: 'الأمان',
    securityText: 'جميع العمليات تتم محلياً على جهازك. لا يتم إرسال أي بيانات شخصية إلى خوادمنا أو أي خوادم خارجية. السيرة الذاتية يتم إنشاؤها بالكامل في متصفحك.',
    
    rights: 'حقوقك',
    rightsText: 'لك الحق الكامل في بياناتك. يمكنك حذف جميع المعلومات في أي وقت بمجرد تحديث الصفحة أو مسح ذاكرة التخزين المؤقت للمتصفح. لا توجد أي نسخ احتياطية على خوادمنا.',
  } : {
    back: 'Back',
    title: 'Privacy Policy',
    intro: 'We respect your privacy and are committed to protecting your personal data.',
    
    dataCollection: 'Data Collection',
    dataCollectionText: 'We do not collect or store any of your personal data. All information you enter in your CV stays on your device only and is not sent to any external server.',
    
    dataUsage: 'Data Usage',
    dataUsageText: 'The data you enter is only used to generate your CV and download it to your device. We do not share, sell, or disclose your data to any third party under any circumstances.',
    
    cookies: 'Cookies',
    cookiesText: 'We use essential cookies to improve user experience, such as saving your preferred language and theme. We may also use third-party services such as Google AdSense to display advertisements, which may use cookies to serve personalized ads. You can control cookies through your browser settings. For more information: https://policies.google.com/technologies/partner-sites',
    
    security: 'Security',
    securityText: 'All operations are performed locally on your device. No personal data is sent to our servers or any external servers. Your CV is generated entirely in your browser.',
    
    rights: 'Your Rights',
    rightsText: 'You have full rights to your data. You can delete all information at any time by refreshing the page or clearing your browser cache. There are no backups on our servers.',
  };

  return (
    <div className={`privacy-page ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="privacy-container">
        {/* <button className="back-btn" onClick={() => navigate('/')}>
          {language === 'ar' ? <ArrowRight size={20} /> : <ArrowLeft size={20} />}
          {t.back}
        </button> */}

        <div className="privacy-header">
          <Shield size={60} className="privacy-icon" />
          <h1>{t.title}</h1>
          <p>{t.intro}</p>
        </div>

        <div className="privacy-content">
          <div className="privacy-section">
            <div className="section-icon">
              <FileText size={24} />
            </div>
            <h3>{t.dataCollection}</h3>
            <p>{t.dataCollectionText}</p>
          </div>

          <div className="privacy-section">
            <div className="section-icon">
              <Eye size={24} />
            </div>
            <h3>{t.dataUsage}</h3>
            <p>{t.dataUsageText}</p>
          </div>

          <div className="privacy-section">
            <div className="section-icon">
              <CheckCircle size={24} />
            </div>
            <h3>{t.cookies}</h3>
            <p>{t.cookiesText}</p>
          </div>

          <div className="privacy-section">
            <div className="section-icon">
              <Lock size={24} />
            </div>
            <h3>{t.security}</h3>
            <p>{t.securityText}</p>
          </div>

          <div className="privacy-section">
            <div className="section-icon">
              <Shield size={24} />
            </div>
            <h3>{t.rights}</h3>
            <p>{t.rightsText}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;