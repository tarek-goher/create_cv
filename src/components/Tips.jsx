// ==========================================
// MOTIVATIONAL QUOTES COMPONENT
// ==========================================
import React, { useState } from 'react';
import './MotivationalQuotes.css';

const MotivationalQuotes = ({ language }) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const t = language === 'ar' ? {
    title: 'مقولات ملهمة',
    subtitle: 'كلمات تحفيزية لرحلتك المهنية',
    categories: {
      all: 'الكل',
      cv: 'السيرة الذاتية',
      success: 'النجاح',
      career: 'المسيرة المهنية'
    }
  } : {
    title: 'Motivational Quotes',
    subtitle: 'Inspiring words for your career journey',
    categories: {
      all: 'All',
      cv: 'CV Writing',
      success: 'Success',
      career: 'Career'
    }
  };

  const quotes = language === 'ar' ? [
    {
      id: 1,
      category: 'cv',
      text: 'سيرتك الذاتية ليست مجرد ورقة، إنها قصة نجاحك المكتوبة',
      author: 'مجهول',
      icon: '📄'
    },
    {
      id: 2,
      category: 'success',
      text: 'النجاح ليس نهاية الطريق، والفشل ليس كارثة. الشجاعة للاستمرار هي ما يهم',
      author: 'ونستون تشرشل',
      icon: '🏆'
    },
    {
      id: 3,
      category: 'career',
      text: 'اختر وظيفة تحبها، ولن تضطر للعمل يوماً في حياتك',
      author: 'كونفوشيوس',
      icon: '💼'
    },
    {
      id: 4,
      category: 'cv',
      text: 'السيرة الذاتية الجيدة تفتح الأبواب، لكن مهاراتك هي التي تبقيها مفتوحة',
      author: 'مجهول',
      icon: '🚪'
    },
    {
      id: 5,
      category: 'success',
      text: 'الطريقة الوحيدة للقيام بعمل عظيم هي أن تحب ما تفعله',
      author: 'ستيف جوبز',
      icon: '⭐'
    },
    {
      id: 6,
      category: 'career',
      text: 'لا تنتظر الفرصة المثالية، اصنعها بنفسك',
      author: 'مجهول',
      icon: '🎯'
    },
    {
      id: 7,
      category: 'cv',
      text: 'أفضل سيرة ذاتية هي التي تعكس شخصيتك الحقيقية وإنجازاتك الواقعية',
      author: 'مجهول',
      icon: '✨'
    },
    {
      id: 8,
      category: 'success',
      text: 'النجاح هو مجموع الجهود الصغيرة المتكررة يوماً بعد يوم',
      author: 'روبرت كولير',
      icon: '🌟'
    },
    {
      id: 9,
      category: 'career',
      text: 'استثمر في نفسك، فهو أفضل استثمار على الإطلاق',
      author: 'وارن بافيت',
      icon: '💎'
    }
  ] : [
    {
      id: 1,
      category: 'cv',
      text: 'Your CV is not just a paper, it\'s your success story written down',
      author: 'Unknown',
      icon: '📄'
    },
    {
      id: 2,
      category: 'success',
      text: 'Success is not final, failure is not fatal: it is the courage to continue that counts',
      author: 'Winston Churchill',
      icon: '🏆'
    },
    {
      id: 3,
      category: 'career',
      text: 'Choose a job you love, and you will never have to work a day in your life',
      author: 'Confucius',
      icon: '💼'
    },
    {
      id: 4,
      category: 'cv',
      text: 'A good CV opens doors, but your skills keep them open',
      author: 'Unknown',
      icon: '🚪'
    },
    {
      id: 5,
      category: 'success',
      text: 'The only way to do great work is to love what you do',
      author: 'Steve Jobs',
      icon: '⭐'
    },
    {
      id: 6,
      category: 'career',
      text: 'Don\'t wait for the perfect opportunity, create it yourself',
      author: 'Unknown',
      icon: '🎯'
    },
    {
      id: 7,
      category: 'cv',
      text: 'The best CV is one that reflects your true personality and real achievements',
      author: 'Unknown',
      icon: '✨'
    },
    {
      id: 8,
      category: 'success',
      text: 'Success is the sum of small efforts repeated day in and day out',
      author: 'Robert Collier',
      icon: '🌟'
    },
    {
      id: 9,
      category: 'career',
      text: 'Invest in yourself, it\'s the best investment you can make',
      author: 'Warren Buffett',
      icon: '💎'
    }
  ];

  const filteredQuotes = activeCategory === 'all' 
    ? quotes 
    : quotes.filter(q => q.category === activeCategory);

  return (
    <div className={`quotes-container ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <header className="quotes-header">
        <h1 className="quotes-title">{t.title}</h1>
        <p className="quotes-subtitle">{t.subtitle}</p>
      </header>

      {/* Category Filter */}
      <nav className="quotes-categories" aria-label={language === 'ar' ? 'تصنيفات المقولات' : 'Quote categories'}>
        {Object.entries(t.categories).map(([key, label]) => (
          <button
            key={key}
            className={`category-btn ${activeCategory === key ? 'active' : ''}`}
            onClick={() => setActiveCategory(key)}
            aria-pressed={activeCategory === key}
          >
            {label}
          </button>
        ))}
      </nav>

      {/* Quotes Grid */}
      <div className="quotes-grid">
        {filteredQuotes.map((quote) => (
          <article key={quote.id} className="quote-card">
            <div className="quote-icon" aria-hidden="true">{quote.icon}</div>
            <blockquote className="quote-text">
              <p>"{quote.text}"</p>
            </blockquote>
            <footer className="quote-author">
              <cite>— {quote.author}</cite>
            </footer>
          </article>
        ))}
      </div>
    </div>
  );
};

export default MotivationalQuotes;