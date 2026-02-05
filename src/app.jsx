// ==========================================
// MAIN APP COMPONENT - CV BUILDER
// ==========================================
import React, { useState, useEffect } from 'react';
import { Printer, Globe, Sun, Moon } from 'lucide-react';
import './css/style.css';
import './css/templates-styles.css';
import './index.css'
import TemplateSelector from './TemplateSelector';
import CVForm from './CVForm';
import CVPreview from './CVPreview';
// import PdfToWord from './wor.jsx';
import  PdfToWord from './PdfToWord.jsx'
import Footer from './footer/footer.jsx'; 
// ==========================================
// CV TEMPLATES DATA - قوالب السيرة الذاتية (ALL FREE)
// ==========================================
const CV_TEMPLATES = {
  ar: [
    {
      id: 'modern',
      name: 'عصري - Modern',
      icon: '📄',
      description: 'تصميم بسيط واحترافي للمبتدئين',
      hasPhoto: false
    },
    {
      id: 'professional',
      name: 'احترافي - Professional',
      icon: '💼',
      description: 'مناسب للشركات الكبرى مع صورة',
      hasPhoto: true
    },
    {
      id: 'creative',
      name: 'إبداعي - Creative',
      icon: '🎨',
      description: 'تصميم مميز للمجالات الإبداعية',
      hasPhoto: true
    },
    {
      id: 'executive',
      name: 'تنفيذي - Executive',
      icon: '👔',
      description: 'للمناصب الإدارية العليا',
      hasPhoto: false
    },
    {
      id: 'minimal',
      name: 'بسيط - Minimal',
      icon: '✨',
      description: 'تصميم نظيف بدون زخارف',
      hasPhoto: false
    },
    {
      id: 'elegant',
      name: 'أنيق - Elegant',
      icon: '💎',
      description: 'تصميم راقي مع صورة شخصية',
      hasPhoto: true
    },
    {
      id: 'ats-optimized',
      name: 'ATS محسّن - ATS Optimized',
      icon: '🤖',
      description: 'مصمم خصيصاً لأنظمة التوظيف الآلية',
      hasPhoto: false
    },
    {
      id: 'corporate',
      name: 'مؤسسي - Corporate',
      icon: '🏢',
      description: 'تصميم رسمي للمؤسسات الكبرى',
      hasPhoto: true
    },
    {
      id: 'technical',
      name: 'تقني - Technical',
      icon: '⚙️',
      description: 'مثالي للوظائف التقنية والهندسية',
      hasPhoto: false
    }
  ],
  en: [
    {
      id: 'modern',
      name: 'Modern',
      icon: '📄',
      description: 'Simple and professional for beginners',
      hasPhoto: false
    },
    {
      id: 'professional',
      name: 'Professional',
      icon: '💼',
      description: 'Perfect for large companies with photo',
      hasPhoto: true
    },
    {
      id: 'creative',
      name: 'Creative',
      icon: '🎨',
      description: 'Unique design for creative fields',
      hasPhoto: true
    },
    {
      id: 'executive',
      name: 'Executive',
      icon: '👔',
      description: 'For senior management positions',
      hasPhoto: false
    },
    {
      id: 'minimal',
      name: 'Minimal',
      icon: '✨',
      description: 'Clean design without decorations',
      hasPhoto: false
    },
    {
      id: 'elegant',
      name: 'Elegant',
      icon: '💎',
      description: 'Sophisticated with personal photo',
      hasPhoto: true
    },
    {
      id: 'ats-optimized',
      name: 'ATS Optimized',
      icon: '🤖',
      description: 'Designed specifically for applicant tracking systems',
      hasPhoto: false
    },
    {
      id: 'corporate',
      name: 'Corporate',
      icon: '🏢',
      description: 'Formal design for large corporations',
      hasPhoto: true
    },
    {
      id: 'technical',
      name: 'Technical',
      icon: '⚙️',
      description: 'Ideal for technical and engineering roles',
      hasPhoto: false
    }
  ]
};

// ==========================================
// TRANSLATION STRINGS - النصوص المترجمة
// ==========================================
const TRANSLATIONS = {
  ar: {
    title: 'منشئ السيرة الذاتية الاحترافية',
    subtitle: 'اختر القالب المناسب وابدأ في إنشاء سيرتك الذاتية',
    selectTemplate: 'اختر القالب',
    fillData: 'أدخل البيانات',
    preview: 'معاينة وطباعة',
    free: 'مجاني',
    selectBtn: 'اختيار',
    backBtn: 'رجوع',
    nextBtn: 'التالي',
    printBtn: 'طباعة',
    personalInfo: 'المعلومات الشخصية',
    experience: 'الخبرات العملية',
    education: 'التعليم',
    skills: 'المهارات',
    photo: 'الصورة الشخصية'
  },
  en: {
    title: 'Professional CV Builder',
    subtitle: 'Choose the right template and start creating your CV',
    selectTemplate: 'Select Template',
    fillData: 'Fill Data',
    preview: 'Preview & Print',
    free: 'Free',
    selectBtn: 'Select',
    backBtn: 'Back',
    nextBtn: 'Next',
    printBtn: 'Print',
    personalInfo: 'Personal Information',
    experience: 'Work Experience',
    education: 'Education',
    skills: 'Skills',
    photo: 'Profile Photo'
  }
};

// ==========================================
// MAIN APP COMPONENT
// ==========================================
function App() {
  // STATE MANAGEMENT - إدارة الحالة
  const [language, setLanguage] = useState('en');
  const [theme, setTheme] = useState('dark');
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showConverter, setShowConverter] = useState(false);
const [formData, setFormData] = useState({
    fullName: 'Mahmoud Mohamed ',
    jobTitle: 'Senior Full Stack Developer',
    email: 'mahmoud.dev@example.com',
    phone: '+20 100 123 4567',
    address: 'Maadi, Cairo, Egypt',
    summary: 'Results-oriented Full Stack Developer with 5+ years of experience in building scalable web applications. Expert in React.js, Node.js, and cloud technologies. Proven track record of improving site performance by 40%.',
    photo: null,
    photoPreview: null,
    experience: [
      { 
        company: 'Tech Solutions Inc.', 
        position: 'Senior Frontend Engineer', 
        duration: 'Jan 2022 - Present', 
        description: 'Developed complex UI components using React and Tailwind CSS. Integrated RESTful APIs and optimized state management.' 
      },
      { 
        company: 'Digital Creative Agency', 
        position: 'Full Stack Developer', 
        duration: 'June 2019 - Dec 2021', 
        description: 'Built responsive websites for international clients. Reduced page load time by 50% through optimization.' 
      }
    ],
    education: [
      { 
        institution: 'Cairo University', 
        degree: 'B.Sc. in Computer Science', 
        year: '2015 - 2019', 
        description: 'Graduated with Honors (GPA: 3.8/4.0).' 
      }
    ],
    skills: ['React.js', 'Node.js', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'Git']
  });

  const t = TRANSLATIONS[language];
  const templates = CV_TEMPLATES[language];

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // ==========================================
  // TEMPLATE SELECTION HANDLER - معالج اختيار القالب
  // ==========================================
  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setCurrentStep(2);
  };

  // ==========================================
  // FORM DATA HANDLER - معالج بيانات النموذج
  // ==========================================
  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  // ==========================================
  // PRINT HANDLER - معالج الطباعة
  // ==========================================
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={`app ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      {/* ==========================================
          NAVBAR - شريط التنقل
          ========================================== */}
      <nav className="navbar no-print">
        <div className="navbar-content">
          <div className="navbar-brand" onClick={() => setCurrentStep(1)}>
            <span className="brand-icon">📄</span>
            <span className="brand-text">{language === 'ar' ? 'منشئ السيرة الذاتية' : 'CV Builder'}</span>
          </div>
          
          <div className="navbar-actions">
            <button 
              className="converter-btn"
              onClick={() => {
                setShowConverter(true);
                setCurrentStep(1);
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
              </svg>
              {language === 'ar' ? 'PDF إلى Word' : 'PDF to Word'}
            </button>
            {currentStep !== 1 && !showConverter && (
              <button className="home-btn" onClick={() => setCurrentStep(1)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                {language === 'ar' ? 'الرئيسية' : 'Home'}
              </button>
            )}
            {showConverter && (
              <button className="home-btn" onClick={() => setShowConverter(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                {language === 'ar' ? 'الرئيسية' : 'Home'}
              </button>
            )}
            <button className="theme-toggle" onClick={toggleTheme}>
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button 
              className="lang-toggle"
              onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
            >
              <Globe size={20} />
              {language === 'ar' ? 'EN' : 'عربي'}
            </button>
          </div>
        </div>
      </nav>

      {/* ==========================================
          HEADER - الهيدر
          ========================================== */}
      {!showConverter && (
        <header className="header no-print">
          <h1 className="main-title">{t.title}</h1>
          <p className="subtitle">{t.subtitle}</p>
          
          {/* PROGRESS STEPS - خطوات التقدم */}
          <div className="progress-steps">
          <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
            <div className="step-number">1</div>
            <div className="step-label">{t.selectTemplate}</div>
          </div>
          <div className="step-line"></div>
          <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
            <div className="step-number">2</div>
            <div className="step-label">{t.fillData}</div>
          </div>
          <div className="step-line"></div>
          <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
            <div className="step-number">3</div>
            <div className="step-label">{t.preview}</div>
          </div>
        </div>
      </header>
      )}

      {/* ==========================================
          MAIN CONTENT - المحتوى الرئيسي
          ========================================== */}
      <main className="main-content">
        {/* PDF TO WORD CONVERTER */}
        {showConverter && (
          <PdfToWord language={language} />
        )}

        {/* STEP 1: TEMPLATE SELECTION - اختيار القالب */}
        {!showConverter && currentStep === 1 && (
          <TemplateSelector 
            templates={templates}
            language={language}
            onSelect={handleTemplateSelect}
          />
        )}

        {/* STEP 2: FORM - النموذج */}
        {!showConverter && currentStep === 2 && (
          <CVForm 
            formData={formData}
            language={language}
            selectedTemplate={selectedTemplate}
            onChange={handleInputChange}
            onBack={() => setCurrentStep(1)}
            onNext={() => setCurrentStep(3)}
          />
        )}

        {/* STEP 3: PREVIEW - المعاينة */}
        {!showConverter && currentStep === 3 && (
          <CVPreview 
            template={selectedTemplate}
            formData={formData}
            language={language}
            onBack={() => setCurrentStep(2)}
            onPrint={handlePrint}
          />
        )}
      </main>
      <Footer language={language} />
    </div>
  );
}

export default App;