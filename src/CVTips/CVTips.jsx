import React from 'react';
import { ArrowLeft, ArrowRight, Lightbulb, CheckCircle, XCircle, Star, TrendingUp, Award, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './CVTips.css';

const CVTips = ({ language }) => {
  const navigate = useNavigate();

  const t = language === 'ar' ? {
    back: 'رجوع',
    title: 'نصائح لكتابة سيرة ذاتية احترافية',
    subtitle: 'دليلك الشامل لإنشاء CV يجذب أصحاب العمل',
    
    // أهمية السيرة الذاتية
    importanceTitle: 'لماذا السيرة الذاتية مهمة؟',
    importanceText: 'السيرة الذاتية هي بطاقة تعريفك المهنية وأول انطباع تتركه لدى صاحب العمل. إنها الأداة التي تفتح لك أبواب الفرص الوظيفية وتميزك عن المنافسين.',
    
    // قسم الأساسيات
    basicsTitle: 'الأساسيات الضرورية',
    basics: [
      'معلومات الاتصال الواضحة (رقم الهاتف، البريد الإلكتروني)',
      'عنوان احترافي يعكس مجال تخصصك',
      'ملخص مهني قوي في 3-4 أسطر',
      'قائمة بالمهارات الرئيسية ذات الصلة بالوظيفة',
      'تاريخ وظيفي مرتب من الأحدث للأقدم',
      'المؤهلات الأكاديمية والشهادات المعتمدة',
    ],
    
    // نصائح ذهبية
    tipsTitle: 'نصائح ذهبية للتميز',
    tips: [
      {
        title: 'كن مختصراً وواضحاً',
        desc: 'السيرة المثالية لا تتجاوز صفحتين. ركز على المعلومات المهمة فقط وتجنب الحشو.',
        icon: '📝'
      },
      {
        title: 'استخدم أرقاماً ملموسة',
        desc: 'بدلاً من "زيادة المبيعات"، اكتب "زيادة المبيعات بنسبة 35% خلال 6 أشهر".',
        icon: '📊'
      },
      {
        title: 'خصص CV لكل وظيفة',
        desc: 'عدّل سيرتك الذاتية لتناسب متطلبات كل وظيفة. استخدم الكلمات المفتاحية من إعلان الوظيفة.',
        icon: '🎯'
      },
      {
        title: 'ابرز إنجازاتك وليس مسؤولياتك',
        desc: 'ركز على ماذا حققت وليس فقط ماذا كانت مهامك. استخدم أفعالاً قوية.',
        icon: '🏆'
      },
      {
        title: 'اهتم بالتنسيق والتصميم',
        desc: 'استخدم خطوط واضحة، عناوين بارزة، ومسافات مناسبة. التنسيق الجيد يسهل القراءة.',
        icon: '🎨'
      },
      {
        title: 'راجع الأخطاء الإملائية',
        desc: 'أي خطأ إملائي قد يكلفك الوظيفة. اطلب من شخص آخر مراجعة سيرتك.',
        icon: '✅'
      },
    ],
    
    // الأخطاء الشائعة
    mistakesTitle: 'أخطاء يجب تجنبها',
    mistakes: [
      'استخدام بريد إلكتروني غير احترافي (مثل: coolguy123@...)',
      'إضافة معلومات شخصية غير ضرورية (الحالة الاجتماعية، الديانة)',
      'الكذب أو المبالغة في المهارات والخبرات',
      'استخدام قالب واحد لجميع الوظائف',
      'إرفاق صورة شخصية غير احترافية',
      'كتابة السيرة في أكثر من 3 صفحات',
      'عدم ذكر إنجازات قابلة للقياس',
      'نسيان تحديث معلومات الاتصال',
    ],
    
    // قسم ATS
    atsTitle: 'نصائح للنجاح مع أنظمة ATS',
    atsDesc: 'أنظمة ATS (Applicant Tracking Systems) هي برامج تستخدمها الشركات لفرز السير الذاتية آلياً. إليك كيف تتجاوزها:',
    atsPoints: [
      'استخدم كلمات مفتاحية من إعلان الوظيفة',
      'تجنب الجداول والأعمدة المعقدة',
      'استخدم خطوط قياسية (Arial, Calibri, Times New Roman)',
      'احفظ ملف CV بصيغة .docx أو .pdf نصي',
      'تجنب استخدام Header و Footer',
      'اكتب عناوين الأقسام بشكل واضح ومباشر',
    ],
    
    // إحصائيات
    statsTitle: 'إحصائيات مهمة',
    stats: [
      { number: '6 ثواني', label: 'متوسط وقت قراءة CV' },
      { number: '75%', label: 'من CVs تُرفض بواسطة ATS' },
      { number: '3x', label: 'زيادة فرصك بـ CV مخصص' },
    ],
    
  } : {
    back: 'Back',
    title: 'Tips for Writing a Professional CV',
    subtitle: 'Your Complete Guide to Creating a CV that Attracts Employers',
    
    importanceTitle: 'Why is a CV Important?',
    importanceText: 'Your CV is your professional calling card and the first impression you make on an employer. It\'s the tool that opens doors to job opportunities and sets you apart from competitors.',
    
    basicsTitle: 'Essential Basics',
    basics: [
      'Clear contact information (phone number, email)',
      'Professional title reflecting your field',
      'Strong professional summary in 3-4 lines',
      'List of key skills relevant to the job',
      'Work history ordered from newest to oldest',
      'Academic qualifications and certified credentials',
    ],
    
    tipsTitle: 'Golden Tips to Stand Out',
    tips: [
      {
        title: 'Be Concise and Clear',
        desc: 'The ideal CV doesn\'t exceed two pages. Focus only on important information and avoid filler.',
        icon: '📝'
      },
      {
        title: 'Use Concrete Numbers',
        desc: 'Instead of "increased sales", write "increased sales by 35% in 6 months".',
        icon: '📊'
      },
      {
        title: 'Customize CV for Each Job',
        desc: 'Tailor your CV to match each job\'s requirements. Use keywords from the job posting.',
        icon: '🎯'
      },
      {
        title: 'Highlight Achievements, Not Responsibilities',
        desc: 'Focus on what you achieved, not just what your tasks were. Use strong action verbs.',
        icon: '🏆'
      },
      {
        title: 'Care About Formatting and Design',
        desc: 'Use clear fonts, prominent headings, and appropriate spacing. Good formatting makes reading easier.',
        icon: '🎨'
      },
      {
        title: 'Review Spelling Errors',
        desc: 'Any spelling mistake could cost you the job. Have someone else review your CV.',
        icon: '✅'
      },
    ],
    
    mistakesTitle: 'Mistakes to Avoid',
    mistakes: [
      'Using unprofessional email (like: coolguy123@...)',
      'Adding unnecessary personal info (marital status, religion)',
      'Lying or exaggerating skills and experience',
      'Using one template for all jobs',
      'Attaching unprofessional personal photo',
      'Writing CV in more than 3 pages',
      'Not mentioning measurable achievements',
      'Forgetting to update contact information',
    ],
    
    atsTitle: 'Tips for ATS Success',
    atsDesc: 'ATS (Applicant Tracking Systems) are programs companies use to automatically filter CVs. Here\'s how to pass them:',
    atsPoints: [
      'Use keywords from the job posting',
      'Avoid complex tables and columns',
      'Use standard fonts (Arial, Calibri, Times New Roman)',
      'Save CV file as .docx or text .pdf',
      'Avoid using Header and Footer',
      'Write section titles clearly and directly',
    ],
    
    statsTitle: 'Important Statistics',
    stats: [
      { number: '6 seconds', label: 'Average CV reading time' },
      { number: '75%', label: 'of CVs rejected by ATS' },
      { number: '3x', label: 'Increase your chances with custom CV' },
    ],
  };

  return (
    <div className={`cv-tips-page ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="tips-container">
        {/* <button className="back-btn" onClick={() => navigate('/')}>
          {language === 'ar' ? <ArrowRight size={20} /> : <ArrowLeft size={20} />}
          {t.back}
        </button> */}

        {/* Header */}
        <div className="tips-header">
          <Lightbulb size={60} className="tips-icon" />
          <h1>{t.title}</h1>
          <p>{t.subtitle}</p>
        </div>

        {/* أهمية السيرة الذاتية */}
        <div className="importance-section">
          <div className="section-icon-large">
            <Star size={32} />
          </div>
          <h2>{t.importanceTitle}</h2>
          <p>{t.importanceText}</p>
        </div>

        {/* الأساسيات */}
        <div className="basics-section">
          <h2>
            <Target size={28} />
            {t.basicsTitle}
          </h2>
          <ul className="basics-list">
            {t.basics.map((item, index) => (
              <li key={index}>
                <CheckCircle size={20} />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* النصائح الذهبية */}
        <div className="golden-tips-section">
          <h2>
            <Award size={28} />
            {t.tipsTitle}
          </h2>
          <div className="tips-grid">
            {t.tips.map((tip, index) => (
              <div key={index} className="tip-card">
                <div className="tip-icon">{tip.icon}</div>
                <h3>{tip.title}</h3>
                <p>{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* الأخطاء الشائعة */}
        <div className="mistakes-section">
          <h2>
            <XCircle size={28} />
            {t.mistakesTitle}
          </h2>
          <ul className="mistakes-list">
            {t.mistakes.map((mistake, index) => (
              <li key={index}>
                <XCircle size={18} />
                {mistake}
              </li>
            ))}
          </ul>
        </div>

        {/* نصائح ATS */}
        <div className="ats-section">
          <h2>
            <TrendingUp size={28} />
            {t.atsTitle}
          </h2>
          <p className="ats-desc">{t.atsDesc}</p>
          <ul className="ats-list">
            {t.atsPoints.map((point, index) => (
              <li key={index}>
                <CheckCircle size={18} />
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* الإحصائيات */}
        <div className="stats-section">
          <h2>{t.statsTitle}</h2>
          <div className="stats-grid">
            {t.stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default CVTips;