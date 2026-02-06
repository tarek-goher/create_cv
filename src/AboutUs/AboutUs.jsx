// ==========================================
// ABOUT US PAGE - من نحن
// ==========================================
import React from 'react';
import './AboutUs.css';
import { Award, Target, Users, Lightbulb, CheckCircle, Heart } from 'lucide-react';

function AboutUs({ language }) {
  const content = {
    ar: {
      title: 'من نحن',
      subtitle: 'نساعدك في بناء مستقبلك المهني',
      intro: 'منشئ السيرة الذاتية الاحترافية هو منصة مجانية بالكامل تهدف إلى مساعدة الباحثين عن عمل في إنشاء سيرة ذاتية احترافية تبرز مهاراتهم وخبراتهم.',
      
      mission: {
        title: 'مهمتنا',
        description: 'تمكين كل باحث عن عمل من إنشاء سيرة ذاتية احترافية مجاناً، بغض النظر عن خلفيته أو خبرته.'
      },
      
      vision: {
        title: 'رؤيتنا',
        description: 'أن نكون المنصة الأولى عربياً لإنشاء السير الذاتية الاحترافية والوصول إلى فرص العمل.'
      },
      
      values: {
        title: 'قيمنا',
        items: [
          { icon: <Heart size={40} />, title: 'المجانية', desc: 'جميع خدماتنا مجانية 100%' },
          { icon: <Users size={40} />, title: 'التميز', desc: 'نوفر أفضل القوالب الاحترافية' },
          { icon: <Lightbulb size={40} />, title: 'الابتكار', desc: 'نطور أدوات عصرية وسهلة الاستخدام' },
          { icon: <CheckCircle size={40} />, title: 'الجودة', desc: 'نضمن أعلى معايير الجودة' }
        ]
      },
      
      features: {
        title: 'لماذا نحن؟',
        items: [
          '9 قوالب احترافية متنوعة',
          'تصميمات متوافقة مع أنظمة ATS',
          'تحميل بصيغ Word و PDF',
          'واجهة سهلة وبديهية',
          'دعم كامل للغة العربية والإنجليزية',
          'أدوات تحويل PDF إلى Word',
          'نصائح احترافية لكتابة السيرة الذاتية',
          'تحديثات مستمرة ومجانية'
        ]
      },
      
      team: {
        title: 'فريق العمل',
        description: 'فريق من المطورين والمصممين المتحمسين لمساعدتك في الوصول إلى وظيفة أحلامك.'
      }
    },
    
    en: {
      title: 'About Us',
      subtitle: 'Helping you build your professional future',
      intro: 'Professional CV Builder is a completely free platform aimed at helping job seekers create professional resumes that highlight their skills and experience.',
      
      mission: {
        title: 'Our Mission',
        description: 'Empower every job seeker to create a professional CV for free, regardless of their background or experience.'
      },
      
      vision: {
        title: 'Our Vision',
        description: 'To be the leading Arabic platform for creating professional CVs and accessing job opportunities.'
      },
      
      values: {
        title: 'Our Values',
        items: [
          { icon: <Heart size={40} />, title: 'Free', desc: 'All our services are 100% free' },
          { icon: <Users size={40} />, title: 'Excellence', desc: 'We provide the best professional templates' },
          { icon: <Lightbulb size={40} />, title: 'Innovation', desc: 'We develop modern and easy-to-use tools' },
          { icon: <CheckCircle size={40} />, title: 'Quality', desc: 'We ensure the highest quality standards' }
        ]
      },
      
      features: {
        title: 'Why Choose Us?',
        items: [
          '9 diverse professional templates',
          'ATS-compatible designs',
          'Download in Word & PDF formats',
          'Easy and intuitive interface',
          'Full support for Arabic and English',
          'PDF to Word conversion tools',
          'Professional CV writing tips',
          'Continuous free updates'
        ]
      },
      
      team: {
        title: 'Our Team',
        description: 'A team of passionate developers and designers helping you land your dream job.'
      }
    }
  };

  const t = content[language];

  return (
    <div className={`about-us-page ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      {/* Header Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1 className="about-title">{t.title}</h1>
          <p className="about-subtitle">{t.subtitle}</p>
          <p className="about-intro">{t.intro}</p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-vision-section">
        <div className="mission-vision-grid">
          <div className="mission-card">
            <div className="card-icon">
              <Target size={50} />
            </div>
            <h2>{t.mission.title}</h2>
            <p>{t.mission.description}</p>
          </div>
          
          <div className="vision-card">
            <div className="card-icon">
              <Award size={50} />
            </div>
            <h2>{t.vision.title}</h2>
            <p>{t.vision.description}</p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <h2 className="section-title">{t.values.title}</h2>
        <div className="values-grid">
          {t.values.items.map((value, index) => (
            <div key={index} className="value-card">
              <div className="value-icon">{value.icon}</div>
              <h3>{value.title}</h3>
              <p>{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">{t.features.title}</h2>
        <div className="features-grid">
          {t.features.items.map((feature, index) => (
            <div key={index} className="feature-item">
              <CheckCircle size={24} className="feature-icon" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="team-content">
          <Users size={60} className="team-icon" />
          <h2>{t.team.title}</h2>
          <p>{t.team.description}</p>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;