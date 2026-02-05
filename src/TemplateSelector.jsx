// ==========================================
// OPTIMIZED TEMPLATE SELECTOR - مع تحسينات الأداء وإمكانية الوصول
// ==========================================
import React, { useState, useRef, useCallback } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import MotivationalQuotes from './components/Tips.jsx';

// ==========================================
// TEMPLATE CARD COMPONENT - Memoized
// ==========================================
const TemplateCard = React.memo(({ 
  template, 
  index,
  language, 
  onSelect,
  isFocused,
  onKeyDown,
  cardRef
}) => {
  const t = language === 'ar' ? {
    free: 'مجاني',
    selectBtn: 'اختيار',
    withPhoto: 'مع صورة',
    noPhoto: 'بدون صورة'
  } : {
    free: 'Free',
    selectBtn: 'Select',
    withPhoto: 'With Photo',
    noPhoto: 'No Photo'
  };

  // ==========================================
  // OPTIMIZED IMAGE URLS - WebP مع Fallback
  // ==========================================
  const getTemplateImages = useCallback((templateId) => {
    const base = import.meta.env.BASE_URL; 
    
    return {
      webp: `${base}images/${templateId}.webp`,
      webpSmall: `${base}images/${templateId}.webp`, 
      webpMedium: `${base}images/${templateId}.webp`,
      png: `${base}images/${templateId}.png`
    };
  }, []);

  const images = getTemplateImages(template.id);

  return (
    <div 
      ref={cardRef}
      className="template-card"
      onClick={() => onSelect(template)}
      onKeyDown={onKeyDown}
      tabIndex={isFocused ? 0 : -1}
      role="listitem" 
      aria-labelledby={`title-${template.id}`} 
    >
      {/* ==========================================
          OPTIMIZED IMAGE - WebP + Responsive + Lazy
          ========================================== */}
      <div className="template-image-container">
        <picture>
          {/* WebP مع srcset للأحجام المختلفة */}
          <img 
            src={images.png}
            alt={`${template.name} preview`}
            className="template-image"
            loading={index < 2 ? "eager" : "lazy"} 
            fetchPriority={index < 2 ? "high" : "auto"}
            decoding="async"
            width="400"
            height="500"
          />
          
          {/* PNG Fallback */}
          <img 
            src={images.png}
            alt={`${template.name} template preview`}
            className="template-image"
            loading="lazy"
            decoding="async"
            width="400"
            height="500"
            onError={(e) => {
              e.target.style.display = 'none';
              const placeholder = document.createElement('div');
              placeholder.className = 'template-image-placeholder';
              placeholder.textContent = template.icon;
              placeholder.setAttribute('role', 'img');
              placeholder.setAttribute('aria-label', `${template.name} icon`);
              e.target.parentElement.appendChild(placeholder);
            }}
          />
        </picture>
      </div>

      {/* ==========================================
          TEMPLATE INFO
          ========================================== */}
      <div className="template-info">
        <div className="template-header">
          <span className="template-emoji" aria-hidden="true">{template.icon}</span>
          <h3 className="template-name">{template.name}</h3>
        </div>
        <p className="template-description">{template.description}</p>
        
        {/* Photo Badge */}
        {template.hasPhoto && (
          <div className="photo-badge" aria-label={t.withPhoto}>
            <span aria-hidden="true">📷</span> {t.withPhoto}
          </div>
        )}
      </div>

      {/* ==========================================
          TEMPLATE FOOTER
          ========================================== */}
      <div className="template-footer">
        <div className="free-badge" aria-hidden="true">{t.free}</div>
        <button 
          className="select-button"
          aria-label={`${t.selectBtn} ${template.name}`}
          tabIndex="-1" 
        >
          {t.selectBtn}
          <ChevronRight size={18} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
});

TemplateCard.displayName = 'TemplateCard';

// ==========================================
// MAIN TEMPLATE SELECTOR COMPONENT
// ==========================================
const TemplateSelector = ({ templates, language, onSelect }) => {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const cardRefs = useRef([]);
  const templatesRef = useRef(null);

  // ==========================================
  // SCROLL TO TEMPLATES FUNCTION
  // ==========================================
  const scrollToTemplates = () => {
    templatesRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  // ==========================================
  // TRANSLATIONS
  // ==========================================
  const t = language === 'ar' ? {
    templatesTitle: 'اختر قالبك المثالي',
    templatesSubtitle: 'جميع القوالب مجانية تماماً - اختر ما يناسبك وابدأ الآن',
    scrollBtn: 'اذهب للقوالب'
  } : {
    templatesTitle: 'Choose Your Perfect Template',
    templatesSubtitle: 'All templates are completely free - Pick one and get started',
    scrollBtn: 'Go to Templates'
  };

  // ==========================================
  // KEYBOARD NAVIGATION
  // ==========================================
  const handleKeyDown = useCallback((e, index) => {
    const gridCols = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
    const totalCards = templates.length;

    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        const nextIndex = (index + 1) % totalCards;
        cardRefs.current[nextIndex]?.focus();
        setFocusedIndex(nextIndex);
        break;
        
      case 'ArrowLeft':
        e.preventDefault();
        const prevIndex = (index - 1 + totalCards) % totalCards;
        cardRefs.current[prevIndex]?.focus();
        setFocusedIndex(prevIndex);
        break;
        
      case 'ArrowDown':
        e.preventDefault();
        const downIndex = Math.min(index + gridCols, totalCards - 1);
        cardRefs.current[downIndex]?.focus();
        setFocusedIndex(downIndex);
        break;
        
      case 'ArrowUp':
        e.preventDefault();
        const upIndex = Math.max(index - gridCols, 0);
        cardRefs.current[upIndex]?.focus();
        setFocusedIndex(upIndex);
        break;
        
      case 'Enter':
      case ' ':
        e.preventDefault();
        onSelect(templates[index]);
        break;
        
      case 'Home':
        e.preventDefault();
        cardRefs.current[0]?.focus();
        setFocusedIndex(0);
        break;
        
      case 'End':
        e.preventDefault();
        const lastIndex = totalCards - 1;
        cardRefs.current[lastIndex]?.focus();
        setFocusedIndex(lastIndex);
        break;
    }
  }, [templates, onSelect]);

  return (
    <>
      {/* ==========================================
          SCROLL TO TEMPLATES BUTTON - زر النزول للقوالب (أول حاجة)
          ========================================== */}
      <div className="scroll-to-templates-container" style={{
        display: 'flex',
        justifyContent: 'center',
        margin: '2rem 0 3rem',
        padding: '0 1rem'
      }}>
        <button 
          onClick={scrollToTemplates}
          className="scroll-to-templates-btn"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '1rem 2.5rem',
            fontSize: '1.1rem',
            fontWeight: '600',
            // backfaceVisibility: 'initial !important',
              border: '2px solid #60a5fa',
             color: '#60a5fa ',
              backgroundColor: 'transparent',
            // border: 'none',
            borderRadius: '50px',
            cursor: 'pointer',
            // boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-3px)';
            e.target.style.boxShadow = '0 6px 20px rgba(99, 102, 241, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 15px rgba(99, 102, 241, 0.3)';
          }}
        >
          {t.scrollBtn}
          <ChevronDown size={20} />
        </button>
      </div>

      {/* ==========================================
          MOTIVATIONAL QUOTES - المقولات الملهمة
          ========================================== */}
      <MotivationalQuotes language={language} />

      {/* ==========================================
          TEMPLATES SECTION HEADER - نص فوق القوالب
          ========================================== */}
      <div 
        ref={templatesRef}
        className="templates-section-header"
        style={{
          textAlign: 'center',
          margin: '4rem auto 3rem',
          padding: '0 1.5rem',
          maxWidth: '800px'
        }}
      >
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          marginBottom: '1rem',
          background: '#60a5fa',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          {t.templatesTitle}
        </h2>
        <p style={{
          fontSize: '1.2rem',
          color: '#ffffff',
          lineHeight: '1.8'
        }}>
          {t.templatesSubtitle}
        </p>
      </div>

      {/* ==========================================
          TEMPLATES GRID - القوالب
          ========================================== */}
      <div 
        className="template-grid" 
        role="list"
        aria-label={language === 'ar' ? 'قوالب السيرة الذاتية' : 'CV Templates'}
      >
        {templates.map((template, index) => (
          <TemplateCard
            key={template.id}
            template={template}
            index={index}
            language={language}
            onSelect={onSelect}
            isFocused={index === focusedIndex}
            onKeyDown={(e) => handleKeyDown(e, index)}
            cardRef={el => cardRefs.current[index] = el}
          />
        ))}
      </div>
    </>
  );
};

export default TemplateSelector;