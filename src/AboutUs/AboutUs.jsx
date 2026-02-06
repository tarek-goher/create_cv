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
{/* // في ملف AboutUs.jsx
// ضيف القسم ده قبل Team Section */}

{/* Security & Privacy Section */}
<section className="security-section">
  <div className="security-content">
    <h2 className="section-title">
      {language === 'ar' ? 'الخصوصية والأمان' : 'Privacy & Security'}
    </h2>
    <p>
      {language === 'ar' 
        ? 'في منشئ السيرة الذاتية الاحترافية، نضع أمان بياناتك في المقام الأول. جميع المعلومات التي تدخلها على منصتنا تتم معالجتها محلياً في متصفحك، مما يضمن بقاء تفاصيلك الشخصية خاصة ولا يتم تخزينها على خوادمنا. هذا الالتزام بالخصوصية يجعل أداتنا واحدة من أكثر أدوات إنشاء السيرة الذاتية المجانية الموثوقة المتاحة عبر الإنترنت.'
        : 'At Professional CV Builder, we prioritize the security of your data. All information entered on our platform is processed locally in your browser, ensuring that your personal details remain private and are not stored on our servers. This commitment to privacy makes our tool one of the most trusted free CV makers available online.'
      }
    </p>
  </div>
</section>

{/* ATS Compatibility Section */}
<section className="ats-section">
  <div className="ats-content">
    <h2 className="section-title">
      {language === 'ar' ? 'التوافق مع أنظمة التوظيف الآلية (ATS)' : 'ATS Compatibility'}
    </h2>
    <p>
      {language === 'ar'
        ? 'تم تصميم قوالبنا بدقة لتكون متوافقة مع أنظمة تتبع المتقدمين (ATS)، والتي تستخدمها العديد من الشركات لفحص السير الذاتية. باستخدام تخطيطاتنا الاحترافية، فإنك تزيد من فرصك في اجتياز هذه المرشحات الآلية والحصول على سيرتك الذاتية في أيدي مسؤولي التوظيف البشريين. نحن نفهم أهمية المرور عبر هذه الأنظمة، لذلك نضمن أن كل قالب يتبع أفضل الممارسات في التنسيق والبنية.'
        : 'Our templates are meticulously designed to be compatible with Applicant Tracking Systems (ATS), which many companies use to screen resumes. By using our professional layouts, you increase your chances of passing these automated filters and getting your CV into the hands of human recruiters. We understand the importance of passing through these systems, so we ensure every template follows best practices in formatting and structure.'
      }
    </p>
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