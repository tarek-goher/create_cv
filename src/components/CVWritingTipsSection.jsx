// CVWritingTipsSection.jsx
import React from 'react';
import { CheckCircle, Target, Zap, Award } from 'lucide-react';
import './CVWritingTipsSection.css';

const CVWritingTipsSection = ({ language }) => {
  const content = language === 'ar' ? {
    title: 'نصائح لكتابة سيرة ذاتية احترافية',
    subtitle: 'اتبع هذه النصائح لتحصل على سيرة ذاتية متميزة',
    tips: [
      {
        icon: <Target size={32} />,
        title: 'خصص سيرتك الذاتية',
        desc: 'اجعل كل سيرة ذاتية مخصصة للوظيفة المستهدفة. استخدم الكلمات المفتاحية من إعلان الوظيفة لزيادة فرص القبول في أنظمة ATS.'
      },
      {
        icon: <CheckCircle size={32} />,
        title: 'ركز على الإنجازات',
        desc: 'بدلاً من سرد المهام، اذكر إنجازاتك بأرقام واضحة. مثال: "زيادة المبيعات بنسبة 25%" بدلاً من "مسؤول عن المبيعات".'
      },
      {
        icon: <Zap size={32} />,
        title: 'اجعلها مختصرة وواضحة',
        desc: 'صفحة واحدة للخريجين الجدد، وصفحتان كحد أقصى لذوي الخبرة. استخدم جمل قصيرة ونقاط واضحة.'
      },
      {
        icon: <Award size={32} />,
        title: 'التوافق مع أنظمة ATS',
        desc: 'أكثر من 90% من الشركات تستخدم أنظمة ATS. قوالبنا مصممة خصيصاً للمرور من هذه الأنظمة وزيادة فرصك.'
      }
    ],
    cta: 'ابدأ الآن في إنشاء سيرتك الذاتية',
    extraInfo: {
      title: 'هل تعلم؟',
      text: 'يقضي مسؤول التوظيف في المتوسط 6-7 ثوانٍ فقط في قراءة السيرة الذاتية! لذلك يجب أن تكون سيرتك واضحة ومباشرة من الوهلة الأولى.'
    }
  } : {
    title: 'Professional CV Writing Tips',
    subtitle: 'Follow these tips to create an outstanding CV',
    tips: [
      {
        icon: <Target size={32} />,
        title: 'Customize Your CV',
        desc: 'Tailor each CV to the target job. Use keywords from the job posting to increase your chances of passing ATS systems.'
      },
      {
        icon: <CheckCircle size={32} />,
        title: 'Focus on Achievements',
        desc: 'Instead of listing tasks, highlight your achievements with clear numbers. Example: "Increased sales by 25%" instead of "Responsible for sales".'
      },
      {
        icon: <Zap size={32} />,
        title: 'Keep It Concise',
        desc: 'One page for recent graduates, maximum two pages for experienced professionals. Use short sentences and clear bullet points.'
      },
      {
        icon: <Award size={32} />,
        title: 'ATS Compatibility',
        desc: 'Over 90% of companies use ATS systems. Our templates are specifically designed to pass these systems and increase your chances.'
      }
    ],
    cta: 'Start Creating Your CV Now',
    extraInfo: {
      title: 'Did You Know?',
      text: 'Recruiters spend an average of only 6-7 seconds reviewing a CV! That\'s why your CV must be clear and direct at first glance.'
    }
  };

  return (
    <section className={`cv-tips-section ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="tips-container">
        <div className="tips-header">
          <h2>{content.title}</h2>
          <p>{content.subtitle}</p>
        </div>

        <div className="tips-grid">
          {content.tips.map((tip, index) => (
            <div key={index} className="tip-card">
              <div className="tip-icon">{tip.icon}</div>
              <h3>{tip.title}</h3>
              <p>{tip.desc}</p>
            </div>
          ))}
        </div>

        <div className="did-you-know">
          <h3>💡 {content.extraInfo.title}</h3>
          <p>{content.extraInfo.text}</p>
        </div>
      </div>
    </section>
  );
};

export default CVWritingTipsSection;