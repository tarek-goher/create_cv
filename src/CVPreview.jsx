// ==========================================
// CV PREVIEW COMPONENT - COMPLETE VERSION ✅
// كل الـ 9 Templates مع Accessibility كاملة
// ==========================================
import React, { useState } from 'react';

import { ChevronLeft, ChevronRight, Download, FileText } from 'lucide-react';
import { generatePDFFromHTML } from './PdfGenerator';
import { generateWordDocument } from './DocxGenerator';

const CVPreview = ({ template, formData, language, onBack }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingWord, setIsGeneratingWord] = useState(false);
  
  const t = language === 'ar' ? {
    backBtn: 'رجوع',
    downloadPdf: 'تحميل PDF',
    downloadWord: 'تحميل Word',
    generating: 'جاري الإنشاء...',
    experience: 'الخبرات العملية',
    education: 'التعليم',
    skills: 'المهارات',
    contact: 'معلومات التواصل',
    summary: 'نبذة تعريفية',
    backToForm: 'العودة إلى النموذج',
    downloadPdfAria: 'تحميل السيرة الذاتية بصيغة PDF',
    downloadWordAria: 'تحميل السيرة الذاتية بصيغة Word',
    cvPreview: 'معاينة السيرة الذاتية'
  } : {
    backBtn: 'Back',
    downloadPdf: 'Download PDF',
    downloadWord: 'Download Word',
    generating: 'Generating...',
    experience: 'Work Experience',
    education: 'Education',
    skills: 'Skills',
    contact: 'Contact Information',
    summary: 'Professional Summary',
    backToForm: 'Go back to form',
    downloadPdfAria: 'Download CV as PDF',
    downloadWordAria: 'Download CV as Word document',
    cvPreview: 'CV Preview'
  };

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    const fileName = formData.fullName || 'CV';
    const result = await generatePDFFromHTML(formData, template, language, fileName);
    setIsGenerating(false);
    
    if (result.success) {
      alert(result.message);
    } else {
      alert(result.message);
    }
  };

  const handleDownloadWord = async () => {
    setIsGeneratingWord(true);
    const fileName = formData.fullName || 'CV';
    const result = await generateWordDocument(formData, language, fileName);
    setIsGeneratingWord(false);
    
    if (result.success) {
      alert(result.message);
    } else {
      alert(result.message);
    }
  };

  const renderCV = () => {
    if (!template || !template.id) {
      console.warn('⚠️ No template selected, using Modern template as default');
      return <ModernTemplate formData={formData} language={language} t={t} />;
    }

    console.log('🎨 Rendering template:', template.id);

    const templates = {
      'modern': ModernTemplate,
      'professional': ProfessionalTemplate,
      'creative': CreativeTemplate,
      'executive': ExecutiveTemplate,
      'minimal': MinimalTemplate,
      'elegant': ElegantTemplate,
      'ats-optimized': ATSOptimizedTemplate,
      'corporate': CorporateTemplate,
      'technical': TechnicalTemplate
    };

    const SelectedTemplate = templates[template.id] || ModernTemplate;
    return <SelectedTemplate formData={formData} language={language} t={t} />;
  };

  return (
    <div className="cv-preview-container">
      <nav className="preview-actions no-print" aria-label={language === 'ar' ? 'إجراءات السيرة الذاتية' : 'CV actions'}>
        <button 
          className="back-button" 
          onClick={onBack}
          aria-label={t.backToForm}
        >
          {language === 'ar' ? <ChevronRight size={20} aria-hidden="true" /> : <ChevronLeft size={20} aria-hidden="true" />}
          <span>{t.backBtn}</span>
        </button>
        
        <div className="download-buttons-group" role="group" aria-label={language === 'ar' ? 'خيارات التحميل' : 'Download options'}>
          <button 
            className="download-button word-button" 
            onClick={handleDownloadWord}
            disabled={isGeneratingWord}
            aria-label={t.downloadWordAria}
            aria-busy={isGeneratingWord}
          >
            <FileText size={20} aria-hidden="true" />
            <span>{isGeneratingWord ? t.generating : t.downloadWord}</span>
          </button>

          <button 
            className="download-button pdf-button" 
            onClick={handleDownloadPDF}
            disabled={isGenerating}
            aria-label={t.downloadPdfAria}
            aria-busy={isGenerating}
          >
            <Download size={20} aria-hidden="true" />
            <span>{isGenerating ? t.generating : t.downloadPdf}</span>
          </button>
        </div>
      </nav>

      <div 
        className="cv-preview" 
        id="cv-preview-content"
        role="region"
        aria-label={t.cvPreview}
      >
        {renderCV()}
      </div>
    </div>
  );
};

// ==========================================
// MODERN TEMPLATE ✅
// ==========================================
const ModernTemplate = ({ formData, language, t }) => (
  <article className={`cv-template modern ${language === 'ar' ? 'rtl' : 'ltr'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
    <header className="cv-header modern-header">
      {formData.photoPreview && (
        <img 
          src={formData.photoPreview} 
          alt={`${formData.fullName || 'Profile'} photo`}
          className="modern-photo"
        />
      )}
      <h1 className="cv-name">{formData.fullName || 'Your Name'}</h1>
      <p className="cv-title">{formData.jobTitle || 'Job Title'}</p>
      <address className="cv-contact">
        {formData.email && <span>{language === 'ar' ? 'البريد:' : 'Email:'} {formData.email}</span>}
        {formData.phone && <span>{language === 'ar' ? 'الهاتف:' : 'Phone:'} {formData.phone}</span>}
        {formData.address && <span>{language === 'ar' ? 'العنوان:' : 'Address:'} {formData.address}</span>}
      </address>
    </header>

    {formData.summary && (
      <section className="cv-section" aria-labelledby="summary-heading">
        <h2 id="summary-heading" className="section-title">{t.summary}</h2>
        <p className="summary-text">{formData.summary}</p>
      </section>
    )}

    {formData.experience.some(exp => exp.company || exp.position) && (
      <section className="cv-section" aria-labelledby="experience-heading">
        <h2 id="experience-heading" className="section-title">{t.experience}</h2>
        {formData.experience.map((exp, index) => (
          exp.company || exp.position ? (
            <article key={index} className="experience-item">
              <header className="exp-header">
                <h3>{exp.position || 'Position'}</h3>
                <time className="duration">{exp.duration}</time>
              </header>
              <p className="company">{exp.company}</p>
              {exp.description && <p className="description">{exp.description}</p>}
            </article>
          ) : null
        ))}
      </section>
    )}

    {formData.education.some(edu => edu.institution || edu.degree) && (
      <section className="cv-section" aria-labelledby="education-heading">
        <h2 id="education-heading" className="section-title">{t.education}</h2>
        {formData.education.map((edu, index) => (
          edu.institution || edu.degree ? (
            <article key={index} className="education-item">
              <header className="edu-header">
                <h3>{edu.degree || 'Degree'}</h3>
                <time className="year">{edu.year}</time>
              </header>
              <p className="institution"><strong>{language === 'ar' ? 'الجامعة:' : 'University:'}</strong> {edu.institution}</p>
              {edu.description && <p className="description">{edu.description}</p>}
            </article>
          ) : null
        ))}
      </section>
    )}

    {formData.skills.some(skill => skill) && (
      <section className="cv-section" aria-labelledby="skills-heading">
        <h2 id="skills-heading" className="section-title">{t.skills}</h2>
        <ul className="skills-list" role="list">
          {formData.skills.filter(skill => skill).map((skill, index) => (
            <li key={index} className="skill-tag">{skill}</li>
          ))}
        </ul>
      </section>
    )}
  </article>
);

// ==========================================
// PROFESSIONAL TEMPLATE ✅
// ==========================================
const ProfessionalTemplate = ({ formData, language, t }) => (
  <article className={`cv-template professional ${language === 'ar' ? 'rtl' : 'ltr'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
    <div className="professional-layout">
      <aside className="sidebar">
        <header className="profile-section">
          {formData.photoPreview ? (
            <img 
              src={formData.photoPreview} 
              alt={`${formData.fullName || 'Profile'} photo`}
              className="profile-photo" 
            />
          ) : (
            <div className="profile-avatar" aria-label="Profile avatar">
              {(formData.fullName || 'N')[0].toUpperCase()}
            </div>
          )}
          <h1 className="profile-name">{formData.fullName || 'Your Name'}</h1>
          <p className="profile-title">{formData.jobTitle || 'Job Title'}</p>
        </header>

        <section className="sidebar-section" aria-labelledby="contact-heading">
          <h2 id="contact-heading" className="sidebar-title">{t.contact}</h2>
          <address className="contact-list">
            {formData.email && <div className="contact-item"><strong>{language === 'ar' ? 'البريد:' : 'Email:'}</strong><br/>{formData.email}</div>}
            {formData.phone && <div className="contact-item"><strong>{language === 'ar' ? 'الهاتف:' : 'Phone:'}</strong><br/>{formData.phone}</div>}
            {formData.address && <div className="contact-item"><strong>{language === 'ar' ? 'العنوان:' : 'Address:'}</strong><br/>{formData.address}</div>}
          </address>
        </section>

        {formData.skills.some(skill => skill) && (
          <section className="sidebar-section" aria-labelledby="sidebar-skills-heading">
            <h2 id="sidebar-skills-heading" className="sidebar-title">{t.skills}</h2>
            <ul className="sidebar-skills" role="list">
              {formData.skills.filter(skill => skill).map((skill, index) => (
                <li key={index} className="sidebar-skill">{skill}</li>
              ))}
            </ul>
          </section>
        )}
      </aside>

      <main className="main-content">
        {formData.summary && (
          <section className="content-section" aria-labelledby="main-summary-heading">
            <h2 id="main-summary-heading" className="content-title">{t.summary}</h2>
            <p className="summary-text">{formData.summary}</p>
          </section>
        )}

        {formData.experience.some(exp => exp.company || exp.position) && (
          <section className="content-section" aria-labelledby="main-experience-heading">
            <h2 id="main-experience-heading" className="content-title">{t.experience}</h2>
            {formData.experience.map((exp, index) => (
              exp.company || exp.position ? (
                <article key={index} className="timeline-item">
                  <div className="timeline-marker" aria-hidden="true"></div>
                  <div className="timeline-content">
                    <h3>{exp.position || 'Position'}</h3>
                    <p className="company-name">{exp.company}</p>
                    <time className="duration">{exp.duration}</time>
                    {exp.description && <p className="description">{exp.description}</p>}
                  </div>
                </article>
              ) : null
            ))}
          </section>
        )}

        {formData.education.some(edu => edu.institution || edu.degree) && (
          <section className="content-section" aria-labelledby="main-education-heading">
            <h2 id="main-education-heading" className="content-title">{t.education}</h2>
            {formData.education.map((edu, index) => (
              edu.institution || edu.degree ? (
                <article key={index} className="education-item">
                  <h3>{edu.degree || 'Degree'}</h3>
                  <p className="institution">{edu.institution}</p>
                  <time className="year">{edu.year}</time>
                  {edu.description && <p className="description">{edu.description}</p>}
                </article>
              ) : null
            ))}
          </section>
        )}
      </main>
    </div>
  </article>
);

// ==========================================
// CREATIVE TEMPLATE ✅
// ==========================================
const CreativeTemplate = ({ formData, language, t }) => (
  <article className={`cv-template creative ${language === 'ar' ? 'rtl' : 'ltr'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
    <header className="creative-header">
      <div className="creative-header-inner">
        {formData.photoPreview && (
          <img src={formData.photoPreview} alt={`${formData.fullName || 'Profile'} photo`} className="creative-photo" />
        )}
        <div className="creative-info">
          <h1 className="creative-name">{formData.fullName || 'Your Name'}</h1>
          <p className="creative-title">{formData.jobTitle || 'Job Title'}</p>
          <address className="creative-contact">
            {formData.email && <span>{language === 'ar' ? 'البريد:' : 'Email:'} {formData.email}</span>}
            {formData.phone && <span>{language === 'ar' ? 'الهاتف:' : 'Phone:'} {formData.phone}</span>}
            {formData.address && <span>{language === 'ar' ? 'العنوان:' : 'Address:'} {formData.address}</span>}
          </address>
        </div>
      </div>
    </header>

    <div className="creative-body">
      {formData.summary && (
        <section className="creative-section" aria-labelledby="creative-summary-heading">
          <div className="creative-section-icon" aria-hidden="true">✨</div>
          <div className="creative-section-content">
            <h2 id="creative-summary-heading">{t.summary}</h2>
            <p>{formData.summary}</p>
          </div>
        </section>
      )}

      {formData.experience.some(exp => exp.company || exp.position) && (
        <section className="creative-section" aria-labelledby="creative-experience-heading">
          <div className="creative-section-icon" aria-hidden="true">💼</div>
          <div className="creative-section-content">
            <h2 id="creative-experience-heading">{t.experience}</h2>
            {formData.experience.map((exp, index) => (
              exp.company || exp.position ? (
                <article key={index} className="creative-item">
                  <h3>{exp.position || 'Position'}</h3>
                  <p className="creative-meta">{exp.company} • {exp.duration}</p>
                  {exp.description && <p className="creative-desc">{exp.description}</p>}
                </article>
              ) : null
            ))}
          </div>
        </section>
      )}

      {formData.education.some(edu => edu.institution || edu.degree) && (
        <section className="creative-section" aria-labelledby="creative-education-heading">
          <div className="creative-section-icon" aria-hidden="true">🎓</div>
          <div className="creative-section-content">
            <h2 id="creative-education-heading">{t.education}</h2>
            {formData.education.map((edu, index) => (
              edu.institution || edu.degree ? (
                <article key={index} className="creative-item">
                  <h3>{edu.degree || 'Degree'}</h3>
                  <p className="creative-meta">{edu.institution} • {edu.year}</p>
                  {edu.description && <p className="creative-desc">{edu.description}</p>}
                </article>
              ) : null
            ))}
          </div>
        </section>
      )}

      {formData.skills.some(skill => skill) && (
        <section className="creative-section" aria-labelledby="creative-skills-heading">
          <div className="creative-section-icon" aria-hidden="true">🚀</div>
          <div className="creative-section-content">
            <h2 id="creative-skills-heading">{t.skills}</h2>
            <ul className="creative-skills" role="list">
              {formData.skills.filter(skill => skill).map((skill, index) => (
                <li key={index} className="creative-skill">{skill}</li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  </article>
);

// ==========================================
// EXECUTIVE TEMPLATE ✅
// ==========================================
const ExecutiveTemplate = ({ formData, language, t }) => (
  <article className={`cv-template executive ${language === 'ar' ? 'rtl' : 'ltr'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
    <header className="executive-header">
      <div className="executive-info">
        <h1>{formData.fullName || 'Your Name'}</h1>
        <p>{formData.jobTitle || 'Job Title'}</p>
      </div>
      <address className="executive-contact">
        {formData.email && <div><strong>{language === 'ar' ? 'البريد:' : 'Email:'}</strong> {formData.email}</div>}
        {formData.phone && <div><strong>{language === 'ar' ? 'الهاتف:' : 'Phone:'}</strong> {formData.phone}</div>}
        {formData.address && <div><strong>{language === 'ar' ? 'العنوان:' : 'Address:'}</strong> {formData.address}</div>}
      </address>
    </header>

    {formData.summary && (
      <section className="executive-section" aria-labelledby="exec-summary-heading">
        <h2 id="exec-summary-heading" className="executive-section-title">{t.summary}</h2>
        <p className="executive-summary">{formData.summary}</p>
      </section>
    )}

    {formData.experience.some(exp => exp.company || exp.position) && (
      <section className="executive-section" aria-labelledby="exec-experience-heading">
        <h2 id="exec-experience-heading" className="executive-section-title">{t.experience}</h2>
        {formData.experience.map((exp, index) => (
          exp.company || exp.position ? (
            <article key={index} className="executive-item">
              <header className="executive-item-header">
                <h3>{exp.position || 'Position'}</h3>
                <time className="executive-duration">{exp.duration}</time>
              </header>
              <p className="executive-company">{exp.company}</p>
              {exp.description && <p className="executive-desc">{exp.description}</p>}
            </article>
          ) : null
        ))}
      </section>
    )}

    <div className="executive-grid">
      {formData.education.some(edu => edu.institution || edu.degree) && (
        <section className="executive-section" aria-labelledby="exec-education-heading">
          <h2 id="exec-education-heading" className="executive-section-title">{t.education}</h2>
          {formData.education.map((edu, index) => (
            edu.institution || edu.degree ? (
              <article key={index} className="executive-edu">
                <h3>{edu.degree || 'Degree'}</h3>
                <p>{edu.institution}</p>
                <time>{edu.year}</time>
              </article>
            ) : null
          ))}
        </section>
      )}

      {formData.skills.some(skill => skill) && (
        <section className="executive-section" aria-labelledby="exec-skills-heading">
          <h2 id="exec-skills-heading" className="executive-section-title">{t.skills}</h2>
          <ul className="executive-skills" role="list">
            {formData.skills.filter(skill => skill).map((skill, index) => (
              <li key={index} className="executive-skill">{skill}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  </article>
);

// ==========================================
// MINIMAL TEMPLATE ✅
// ==========================================
const MinimalTemplate = ({ formData, language, t }) => (
  <article className={`cv-template minimal ${language === 'ar' ? 'rtl' : 'ltr'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
    <header className="minimal-header">
      <h1>{formData.fullName || 'YOUR NAME'}</h1>
      <p className="minimal-title">{formData.jobTitle || 'Job Title'}</p>
      <address className="minimal-contact">
        {formData.email && <span>{formData.email}</span>}
        {formData.phone && <span>{formData.phone}</span>}
        {formData.address && <span>{formData.address}</span>}
      </address>
    </header>

    {formData.summary && (
      <section className="minimal-section" aria-labelledby="minimal-summary-heading">
        <h2 id="minimal-summary-heading" className="sr-only">{t.summary}</h2>
        <p className="minimal-summary">{formData.summary}</p>
      </section>
    )}

    {formData.experience.some(exp => exp.company || exp.position) && (
      <section className="minimal-section" aria-labelledby="minimal-experience-heading">
        <h2 id="minimal-experience-heading">{t.experience}</h2>
        {formData.experience.map((exp, index) => (
          exp.company || exp.position ? (
            <article key={index} className="minimal-item">
              <header className="minimal-flex">
                <h3>{exp.position || 'Position'}</h3>
                <time>{exp.duration}</time>
              </header>
              <p>{exp.company}</p>
              {exp.description && <p className="minimal-desc">{exp.description}</p>}
            </article>
          ) : null
        ))}
      </section>
    )}

    {formData.education.some(edu => edu.institution || edu.degree) && (
      <section className="minimal-section" aria-labelledby="minimal-education-heading">
        <h2 id="minimal-education-heading">{t.education}</h2>
        {formData.education.map((edu, index) => (
          edu.institution || edu.degree ? (
            <article key={index} className="minimal-item">
              <header className="minimal-flex">
                <h3>{edu.degree || 'Degree'}</h3>
                <time>{edu.year}</time>
              </header>
              <p>{edu.institution}</p>
            </article>
          ) : null
        ))}
      </section>
    )}

    {formData.skills.some(skill => skill) && (
      <section className="minimal-section" aria-labelledby="minimal-skills-heading">
        <h2 id="minimal-skills-heading">{t.skills}</h2>
        <p className="minimal-skills">
          {formData.skills.filter(skill => skill).join(' • ')}
        </p>
      </section>
    )}
  </article>
);

// ==========================================
// ELEGANT TEMPLATE ✅
// ==========================================
const ElegantTemplate = ({ formData, language, t }) => (
  <article className={`cv-template elegant ${language === 'ar' ? 'rtl' : 'ltr'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
    <header className="elegant-header">
      <div className="elegant-ornament" aria-hidden="true"></div>
      {formData.photoPreview && (
        <img src={formData.photoPreview} alt={`${formData.fullName || 'Profile'} photo`} className="elegant-photo" />
      )}
      <h1 className="elegant-name">{formData.fullName || 'Your Name'}</h1>
      <p className="elegant-title">{formData.jobTitle || 'Job Title'}</p>
      <div className="elegant-divider" aria-hidden="true"></div>
      <address className="elegant-contact">
        {formData.email && <span>{formData.email}</span>}
        {formData.phone && <span>{formData.phone}</span>}
        {formData.address && <span>{formData.address}</span>}
      </address>
    </header>

    {formData.summary && (
      <section className="elegant-section" aria-labelledby="elegant-summary-heading">
        <h2 id="elegant-summary-heading" className="elegant-section-title">{t.summary}</h2>
        <p className="elegant-text">{formData.summary}</p>
      </section>
    )}

    {formData.experience.some(exp => exp.company || exp.position) && (
      <section className="elegant-section" aria-labelledby="elegant-experience-heading">
        <h2 id="elegant-experience-heading" className="elegant-section-title">{t.experience}</h2>
        {formData.experience.map((exp, index) => (
          exp.company || exp.position ? (
            <article key={index} className="elegant-item">
              <header className="elegant-item-header">
                <h3>{exp.position || 'Position'}</h3>
                <time className="elegant-duration">{exp.duration}</time>
              </header>
              <p className="elegant-company">{exp.company}</p>
              {exp.description && <p className="elegant-desc">{exp.description}</p>}
            </article>
          ) : null
        ))}
      </section>
    )}

    <div className="elegant-columns">
      {formData.education.some(edu => edu.institution || edu.degree) && (
        <section className="elegant-section" aria-labelledby="elegant-education-heading">
          <h2 id="elegant-education-heading" className="elegant-section-title">{t.education}</h2>
          {formData.education.map((edu, index) => (
            edu.institution || edu.degree ? (
              <article key={index} className="elegant-edu">
                <h3>{edu.degree || 'Degree'}</h3>
                <p>{edu.institution}</p>
                <time>{edu.year}</time>
              </article>
            ) : null
          ))}
        </section>
      )}

      {formData.skills.some(skill => skill) && (
        <section className="elegant-section" aria-labelledby="elegant-skills-heading">
          <h2 id="elegant-skills-heading" className="elegant-section-title">{t.skills}</h2>
          <ul className="elegant-skills" role="list">
            {formData.skills.filter(skill => skill).map((skill, index) => (
              <li key={index} className="elegant-skill">{skill}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  </article>
);

// ==========================================
// ATS OPTIMIZED TEMPLATE ✅
// ==========================================
const ATSOptimizedTemplate = ({ formData, language, t }) => (
  <article className={`cv-template ats-optimized ${language === 'ar' ? 'rtl' : 'ltr'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
    <header className="ats-header">
      <h1>{formData.fullName || 'YOUR NAME'}</h1>
      <address className="ats-contact-line">
        {formData.email && <span>{language === 'ar' ? 'البريد:' : 'Email:'} {formData.email}</span>}
        {formData.phone && <span>{language === 'ar' ? 'الهاتف:' : 'Phone:'} {formData.phone}</span>}
        {formData.address && <span>{language === 'ar' ? 'العنوان:' : 'Address:'} {formData.address}</span>}
      </address>
      <p className="ats-job-title">{formData.jobTitle || 'Job Title'}</p>
    </header>

    {formData.summary && (
      <section className="ats-section" aria-labelledby="ats-summary-heading">
        <h2 id="ats-summary-heading" className="ats-section-title">{t.summary.toUpperCase()}</h2>
        <p>{formData.summary}</p>
      </section>
    )}

    {formData.skills.some(skill => skill) && (
      <section className="ats-section" aria-labelledby="ats-skills-heading">
        <h2 id="ats-skills-heading" className="ats-section-title">{t.skills.toUpperCase()}</h2>
        <p className="ats-skills-text">
          {formData.skills.filter(skill => skill).join(', ')}
        </p>
      </section>
    )}

    {formData.experience.some(exp => exp.company || exp.position) && (
      <section className="ats-section" aria-labelledby="ats-experience-heading">
        <h2 id="ats-experience-heading" className="ats-section-title">{t.experience.toUpperCase()}</h2>
        {formData.experience.map((exp, index) => (
          exp.company || exp.position ? (
            <article key={index} className="ats-entry">
              <header className="ats-entry-header">
                <h3>{exp.position || 'Position'}</h3>
                {exp.duration && <time> | {exp.duration}</time>}
              </header>
              <p className="ats-entry-company">{exp.company}</p>
              {exp.description && <p className="ats-entry-desc">{exp.description}</p>}
            </article>
          ) : null
        ))}
      </section>
    )}

    {formData.education.some(edu => edu.institution || edu.degree) && (
      <section className="ats-section" aria-labelledby="ats-education-heading">
        <h2 id="ats-education-heading" className="ats-section-title">{t.education.toUpperCase()}</h2>
        {formData.education.map((edu, index) => (
          edu.institution || edu.degree ? (
            <article key={index} className="ats-entry">
              <header className="ats-entry-header">
                <h3>{edu.degree || 'Degree'}</h3>
                {edu.year && <time> | {edu.year}</time>}
              </header>
              <p className="ats-entry-company">{edu.institution}</p>
              {edu.description && <p className="ats-entry-desc">{edu.description}</p>}
            </article>
          ) : null
        ))}
      </section>
    )}
  </article>
);

// ==========================================
// CORPORATE TEMPLATE ✅
// ==========================================
const CorporateTemplate = ({ formData, language, t }) => (
  <article className={`cv-template corporate ${language === 'ar' ? 'rtl' : 'ltr'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
    <header className="corporate-header">
      <div className="corporate-header-left">
        {formData.photoPreview && (
          <img src={formData.photoPreview} alt={`${formData.fullName || 'Profile'} photo`} className="corporate-photo" />
        )}
        <div className="corporate-title-section">
          <h1 className="corporate-name">{formData.fullName || 'Your Name'}</h1>
          <p className="corporate-job-title">{formData.jobTitle || 'Job Title'}</p>
        </div>
      </div>
      <address className="corporate-header-right">
        {formData.email && <div className="corporate-contact-item"><strong>{language === 'ar' ? 'البريد:' : 'Email:'}</strong><br/>{formData.email}</div>}
        {formData.phone && <div className="corporate-contact-item"><strong>{language === 'ar' ? 'الهاتف:' : 'Phone:'}</strong><br/>{formData.phone}</div>}
        {formData.address && <div className="corporate-contact-item"><strong>{language === 'ar' ? 'العنوان:' : 'Address:'}</strong><br/>{formData.address}</div>}
      </address>
    </header>

    <div className="corporate-body">
      {formData.summary && (
        <section className="corporate-section" aria-labelledby="corp-summary-heading">
          <h2 id="corp-summary-heading" className="corporate-section-title">{t.summary}</h2>
          <div className="corporate-divider" aria-hidden="true"></div>
          <p className="corporate-text">{formData.summary}</p>
        </section>
      )}

      <div className="corporate-two-column">
        <div className="corporate-main-column">
          {formData.experience.some(exp => exp.company || exp.position) && (
            <section className="corporate-section" aria-labelledby="corp-experience-heading">
              <h2 id="corp-experience-heading" className="corporate-section-title">{t.experience}</h2>
              <div className="corporate-divider" aria-hidden="true"></div>
              {formData.experience.map((exp, index) => (
                exp.company || exp.position ? (
                  <article key={index} className="corporate-entry">
                    <header className="corporate-entry-header">
                      <h3>{exp.position || 'Position'}</h3>
                      <time className="corporate-date">{exp.duration}</time>
                    </header>
                    <p className="corporate-company">{exp.company}</p>
                    {exp.description && <p className="corporate-desc">{exp.description}</p>}
                  </article>
                ) : null
              ))}
            </section>
          )}
        </div>

        <aside className="corporate-side-column">
          {formData.education.some(edu => edu.institution || edu.degree) && (
            <section className="corporate-section" aria-labelledby="corp-education-heading">
              <h2 id="corp-education-heading" className="corporate-section-title">{t.education}</h2>
              <div className="corporate-divider" aria-hidden="true"></div>
              {formData.education.map((edu, index) => (
                edu.institution || edu.degree ? (
                  <article key={index} className="corporate-edu">
                    <h3>{edu.degree || 'Degree'}</h3>
                    <p>{edu.institution}</p>
                    <time className="corporate-year">{edu.year}</time>
                  </article>
                ) : null
              ))}
            </section>
          )}

          {formData.skills.some(skill => skill) && (
            <section className="corporate-section" aria-labelledby="corp-skills-heading">
              <h2 id="corp-skills-heading" className="corporate-section-title">{t.skills}</h2>
              <div className="corporate-divider" aria-hidden="true"></div>
              <ul className="corporate-skills" role="list">
                {formData.skills.filter(skill => skill).map((skill, index) => (
                  <li key={index} className="corporate-skill-item">{skill}</li>
                ))}
              </ul>
            </section>
          )}
        </aside>
      </div>
    </div>
  </article>
);

// ==========================================
// TECHNICAL TEMPLATE ✅
// ==========================================
const TechnicalTemplate = ({ formData, language, t }) => (
  <article className={`cv-template technical ${language === 'ar' ? 'rtl' : 'ltr'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
    <header className="technical-header">
      <div className="technical-name-section">
        <h1>{formData.fullName || 'YOUR NAME'}</h1>
        <div className="technical-title-bar">
          <p className="technical-job-title">{formData.jobTitle || 'Job Title'}</p>
        </div>
      </div>
      <address className="technical-contact-grid">
        {formData.email && (
          <div className="technical-contact-item">
            <span className="technical-label">{language === 'ar' ? 'البريد:' : 'Email:'}</span>
            <span>{formData.email}</span>
          </div>
        )}
        {formData.phone && (
          <div className="technical-contact-item">
            <span className="technical-label">{language === 'ar' ? 'الهاتف:' : 'Phone:'}</span>
            <span>{formData.phone}</span>
          </div>
        )}
        {formData.address && (
          <div className="technical-contact-item">
            <span className="technical-label">{language === 'ar' ? 'العنوان:' : 'Location:'}</span>
            <span>{formData.address}</span>
          </div>
        )}
      </address>
    </header>

    {formData.summary && (
      <section className="technical-section" aria-labelledby="tech-summary-heading">
        <h2 id="tech-summary-heading" className="technical-section-title">
          <span className="technical-icon" aria-hidden="true">▶</span>
          {t.summary}
        </h2>
        <p className="technical-text">{formData.summary}</p>
      </section>
    )}

    {formData.experience.some(exp => exp.company || exp.position) && (
      <section className="technical-section" aria-labelledby="tech-experience-heading">
        <h2 id="tech-experience-heading" className="technical-section-title">
          <span className="technical-icon" aria-hidden="true">▶</span>
          {t.experience}
        </h2>
        {formData.experience.map((exp, index) => (
          exp.company || exp.position ? (
            <article key={index} className="technical-entry">
              <header className="technical-entry-header">
                <div>
                  <h3>{exp.position || 'Position'}</h3>
                  <p className="technical-company">{exp.company}</p>
                  {exp.duration && <time className="technical-duration">{exp.duration}</time>}
                </div>
              </header>
              {exp.description && (
                <ul className="technical-desc-list">
                  {exp.description.split('\n').filter(line => line.trim()).map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              )}
            </article>
          ) : null
        ))}
      </section>
    )}

    {formData.education.some(edu => edu.institution || edu.degree) && (
      <section className="technical-section" aria-labelledby="tech-education-heading">
        <h2 id="tech-education-heading" className="technical-section-title">
          <span className="technical-icon" aria-hidden="true">▶</span>
          {t.education}
        </h2>
        {formData.education.map((edu, index) => (
          edu.institution || edu.degree ? (
            <article key={index} className="technical-edu">
              <header className="technical-edu-header">
                <h3>{edu.degree || 'Degree'}</h3>
                <p className="technical-institution">{edu.institution}</p>
                {edu.year && <time className="technical-year">{edu.year}</time>}
              </header>
            </article>
          ) : null
        ))}
      </section>
    )}

    {formData.skills.some(skill => skill) && (
      <section className="technical-section" aria-labelledby="tech-skills-heading">
        <h2 id="tech-skills-heading" className="technical-section-title">
          <span className="technical-icon" aria-hidden="true">▶</span>
          {t.skills}
        </h2>
        <ul className="technical-skills-grid" role="list">
          {formData.skills.filter(skill => skill).map((skill, index) => (
            <li key={index} className="technical-skill-box">{skill}</li>
          ))}
        </ul>
      </section>
    )}
  </article>
);

export default CVPreview;