// ==========================================
// OPTIMIZED TEMPLATE SELECTOR - مع تحسينات الأداء وإمكانية الوصول
// ==========================================
import React, { useState, useRef, useCallback } from 'react';
import { ChevronRight } from 'lucide-react';

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
  // BASE_URL هنا هتقرأ قيمة '/create_cv/' من ملف الـ config
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
  // التغيير هنا: خليها listitem عشان تناسب الـ list اللي بره
  role="listitem" 
  // خفف الـ label وخلي التفاصيل جوه التاجات نفسها (الـ h3 والـ p)
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
  // أول صورتين (index 0, 1) يتحملوا فوراً، الباقي يتأجل
  loading={index < 2 ? "eager" : "lazy"} 
  // تعليق أولوية التحميل لأول صورتين عشان يظهروا قبل أي ملف JS تاني
  fetchpriority={index < 2 ? "high" : "auto"}
  decoding="async"
  width="400"
  height="500"
  // ... الباقي
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
              // إخفاء الصورة وعرض Placeholder
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
  // تأكد إن الـ aria-label هنا واضح وصريح
  aria-label={`${t.selectBtn} ${template.name}`}
  // بما إن الكارد كله قابل للضغط، الزرار نفسه ممكن تخليه tabIndex={-1} 
  // عشان المستخدم ميتعبش وهو بيتنقل بالـ Tab
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
  );
};

export default TemplateSelector;