// ==========================================
// MAIN APP COMPONENT - CV BUILDER (CLEANED)
// ==========================================
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './css/style.css';
import './css/templates-styles.css';
import './index.css';

// استيراد الكومبوننتات
import Navbar from './layout/Navbar'; 
import TemplateSelector from './TemplateSelector';
import CVForm from './CVForm';
import CVPreview from './CVPreview';
import PdfToWord from './PdfToWord.jsx';
import ContactUs from './contactUs/contactus.jsx';
import CVTips from './CVTips/CVTips.jsx';
import Privacy from './Privacy/Privacy.jsx';
import Footer from './Footer/footer.jsx'; 
import MotivationalQuotes from './components/Tips.jsx';
import AboutUs from './AboutUs/AboutUs.jsx';
import InterviewQuestions from './InterviewQuestions/InterviewQuestions.jsx';

// ==========================================
// CV TEMPLATES DATA
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
// TRANSLATION STRINGS
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
  // STATE MANAGEMENT
  const [language, setLanguage] = useState('en');
  const [theme, setTheme] = useState('dark');
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showConverter, setShowConverter] = useState(false);
  const location = useLocation(); // للحصول على الـ path الحالي
  
  const [formData, setFormData] = useState({
    fullName: 'Mahmoud Mohamed',
    jobTitle: 'Senior Full Stack Developer',
    email: 'mahmoud.dev@example.com',
    phone: '+20 100 123 4567',
    address: 'Maadi, Cairo, Egypt',
    summary: 'Results-oriented Full Stack Developer with 5+ years of experience...',
    photo: null,
    photoPreview: null,
    experience: [
      { 
        company: 'Tech Solutions Inc.', 
        position: 'Senior Frontend Engineer', 
        duration: 'Jan 2022 - Present', 
        description: 'Developed complex UI components...' 
      },
      { 
        company: 'Digital Creative Agency', 
        position: 'Full Stack Developer', 
        duration: 'June 2019 - Dec 2021', 
        description: 'Built responsive websites...' 
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

  // Toggle language
  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  // Template selection handler
  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setCurrentStep(2);
  };

  // Form data handler
  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  // Print handler
  const handlePrint = () => {
    window.print();
  };

  // Reset to home - دالة جديدة
  const resetToHome = () => {
    setCurrentStep(1);
    setShowConverter(false);
    setSelectedTemplate(null);
  };

  // تحديد إذا كنا في الصفحة الرئيسية
  const isMainRoute = location.pathname === '/';

  return (
    <div className={`app ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      {/* ==========================================
          NAVBAR - كل الأزرار جواه
          ========================================== */}
      <Navbar 
        language={language}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        setShowConverter={setShowConverter}
        theme={theme}
        toggleTheme={toggleTheme}
        toggleLanguage={toggleLanguage}
        resetToHome={resetToHome}
      />

      {/* ==========================================
          HEADER - يظهر فقط في الصفحة الرئيسية والخطوات 2 و 3
          ========================================== */}
      {isMainRoute && !showConverter && currentStep !== 1 && (
        <header className="header no-print">
          <h1 className="main-title">{t.title}</h1>
          <p className="subtitle">{t.subtitle}</p>
          
          {/* PROGRESS STEPS */}
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
          MAIN CONTENT
          ========================================== */}
      <Routes>
        <Route path="/" element={
          <main className="main-content">
            {showConverter && <PdfToWord language={language} />}
            {!showConverter && currentStep === 1 && (
              <TemplateSelector 
                templates={templates}
                language={language}
                onSelect={handleTemplateSelect}
              />
            )}
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
        } />
        <Route path='/Tips' element={<MotivationalQuotes language={language} />} />
        <Route path="/about" element={<AboutUs language={language} />} />
        <Route path="/interview-questions" element={<InterviewQuestions language={language} />} />
        <Route path="/contact" element={<ContactUs language={language} />} />
        <Route path="/cv-tips" element={<CVTips language={language} />} />
        <Route path="/privacy" element={<Privacy language={language} />} />
      </Routes>

      <Footer language={language} resetToHome={resetToHome} />
    </div>
  );
}

export default App;