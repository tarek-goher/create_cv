// ==========================================
// CV FORM COMPONENT - نموذج إدخال البيانات
// ==========================================
import React from 'react';
import { ChevronLeft, ChevronRight, Plus, Trash2, Upload, X } from 'lucide-react';

const CVForm = ({ formData, language, selectedTemplate, onChange, onBack, onNext }) => {
  const t = language === 'ar' ? {
    personalInfo: 'المعلومات الشخصية',
    fullName: 'الاسم الكامل',
    jobTitle: 'المسمى الوظيفي',
    email: 'البريد الإلكتروني',
    phone: 'رقم الهاتف',
    address: 'العنوان',
    summary: 'نبذة تعريفية',
    photo: 'الصورة الشخصية',
    uploadPhoto: 'رفع صورة',
    removePhoto: 'حذف الصورة',
    experience: 'الخبرات العملية',
    company: 'الشركة',
    position: 'المنصب',
    duration: 'المدة',
    description: 'الوصف',
    education: 'التعليم',
    institution: 'المؤسسة التعليمية',
    degree: 'الدرجة العلمية',
    year: 'السنة',
    skills: 'المهارات',
    addExperience: 'إضافة خبرة',
    addEducation: 'إضافة مؤهل',
    addSkill: 'إضافة مهارة',
    remove: 'حذف',
    backBtn: 'رجوع',
    nextBtn: 'التالي',
    required: '*'
  } : {
    personalInfo: 'Personal Information',
    fullName: 'Full Name',
    jobTitle: 'Job Title',
    email: 'Email',
    phone: 'Phone Number',
    address: 'Address',
    summary: 'Professional Summary',
    photo: 'Profile Photo',
    uploadPhoto: 'Upload Photo',
    removePhoto: 'Remove Photo',
    experience: 'Work Experience',
    company: 'Company',
    position: 'Position',
    duration: 'Duration',
    description: 'Description',
    education: 'Education',
    institution: 'Institution',
    degree: 'Degree',
    year: 'Year',
    skills: 'Skills',
    addExperience: 'Add Experience',
    addEducation: 'Add Education',
    addSkill: 'Add Skill',
    remove: 'Remove',
    backBtn: 'Back',
    nextBtn: 'Next',
    required: '*'
  };

  // ==========================================
  // PHOTO UPLOAD HANDLER
  // ==========================================
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onChange('photo', file);
        onChange('photoPreview', event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    onChange('photo', null);
    onChange('photoPreview', null);
  };

  // ==========================================
  // ADD EXPERIENCE ENTRY
  // ==========================================
  const addExperience = () => {
    onChange('experience', [
      ...formData.experience,
      { company: '', position: '', duration: '', description: '' }
    ]);
  };

  const removeExperience = (index) => {
    const newExperience = formData.experience.filter((_, i) => i !== index);
    onChange('experience', newExperience);
  };

  const updateExperience = (index, field, value) => {
    const newExperience = [...formData.experience];
    newExperience[index][field] = value;
    onChange('experience', newExperience);
  };

  // ==========================================
  // ADD EDUCATION ENTRY
  // ==========================================
  const addEducation = () => {
    onChange('education', [
      ...formData.education,
      { institution: '', degree: '', year: '', description: '' }
    ]);
  };

  const removeEducation = (index) => {
    const newEducation = formData.education.filter((_, i) => i !== index);
    onChange('education', newEducation);
  };

  const updateEducation = (index, field, value) => {
    const newEducation = [...formData.education];
    newEducation[index][field] = value;
    onChange('education', newEducation);
  };

  // ==========================================
  // ADD SKILL
  // ==========================================
  const addSkill = () => {
    onChange('skills', [...formData.skills, '']);
  };

  const removeSkill = (index) => {
    const newSkills = formData.skills.filter((_, i) => i !== index);
    onChange('skills', newSkills);
  };

  const updateSkill = (index, value) => {
    const newSkills = [...formData.skills];
    newSkills[index] = value;
    onChange('skills', newSkills);
  };

  return (
    <div className="cv-form">
      {/* ==========================================
          SECTION 1: PERSONAL INFO
          ========================================== */}
      <div className="form-section">
        <h2 className="section-title">{t.personalInfo}</h2>
        
        <div className="form-grid">
          {/* PHOTO UPLOAD - Only show if template supports it */}
          {selectedTemplate?.hasPhoto && (
            <div className="form-group full-width">
              <label>{t.photo}</label>
              <div className="photo-upload-container">
                {formData.photoPreview ? (
                  <div className="photo-preview-box">
                    <img src={formData.photoPreview} alt="Preview" className="photo-preview-img" />
              <button 
  type="button"
  className="remove-photo-btn"
  onClick={removePhoto}
  // ✅ الحل السحري هنا عشان المتصفح يفهم وظيفة الزرار
  aria-label={language === 'ar' ? "حذف الصورة الشخصية" : "Remove profile photo"}
>
  {/* ✅ إخفاء الأيقونة عشان ميعتبرهاش نص غريب */}
  <X size={20} aria-hidden="true" /> 
</button>
                  </div>
                ) : (
                  <label className="photo-upload-label">
                    <input 
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      style={{ display: 'none' }}
                    />
                    <Upload size={32} />
                    <span>{t.uploadPhoto}</span>
                  </label>
                )}
              </div>
            </div>
          )}

          <div className="form-group">
            <label>{t.fullName} {t.required}</label>
            <input 
              type="text"
              value={formData.fullName}
              onChange={(e) => onChange('fullName', e.target.value)}
              placeholder={t.fullName}
            />
          </div>

          <div className="form-group">
            <label>{t.jobTitle} {t.required}</label>
            <input 
              type="text"
              value={formData.jobTitle}
              onChange={(e) => onChange('jobTitle', e.target.value)}
              placeholder={t.jobTitle}
            />
          </div>

          <div className="form-group">
            <label>{t.email} {t.required}</label>
            <input 
              type="email"
              value={formData.email}
              onChange={(e) => onChange('email', e.target.value)}
              placeholder={t.email}
            />
          </div>

          <div className="form-group">
            <label>{t.phone} {t.required}</label>
            <input 
              type="tel"
              value={formData.phone}
              onChange={(e) => onChange('phone', e.target.value)}
              placeholder={t.phone}
            />
          </div>

          <div className="form-group full-width">
            <label>{t.address}</label>
            <input 
              type="text"
              value={formData.address}
              onChange={(e) => onChange('address', e.target.value)}
              placeholder={t.address}
            />
          </div>

          <div className="form-group full-width">
            <label>{t.summary}</label>
            <textarea 
              rows="4"
              value={formData.summary}
              onChange={(e) => onChange('summary', e.target.value)}
              placeholder={t.summary}
            />
          </div>
        </div>
      </div>

      {/* ==========================================
          SECTION 2: EXPERIENCE
          ========================================== */}
      <div className="form-section">
        <div className="section-header">
          <h2 className="section-title">{t.experience}</h2>
        <button 
  className="add-button" 
  onClick={addExperience}
  type="button" // دايماً حدد النوع عشان تتجنب عمل Submit للفورم بالخطأ
  aria-label={t.addExperience} // يضمن تعريف الزرار بوضوح
>
  <Plus size={20} aria-hidden="true" /> {/* إخفاء الأيقونة عن قارئ الشاشة */}
  <span>{t.addExperience}</span>
</button>
        </div>

        {formData.experience.map((exp, index) => (
          <div key={index} className="entry-card">
            <div className="entry-header">
              <span className="entry-number">{index + 1}</span>
              {formData.experience.length > 1 && (
               <button 
  className="remove-button"
  onClick={() => removeExperience(index)}
  type="button"
  aria-label={`${t.remove} ${index + 1}`} // إضافة الرقم بيساعد المكفوفين يعرفوا أي خبرة بيحذفوها
>
  <Trash2 size={18} aria-hidden="true" />
  <span>{t.remove}</span>
</button>
              )}
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>{t.company}</label>
                <input 
                  type="text"
                  value={exp.company}
                  onChange={(e) => updateExperience(index, 'company', e.target.value)}
                  placeholder={t.company}
                />
              </div>

              <div className="form-group">
                <label>{t.position}</label>
                <input 
                  type="text"
                  value={exp.position}
                  onChange={(e) => updateExperience(index, 'position', e.target.value)}
                  placeholder={t.position}
                />
              </div>

              <div className="form-group full-width">
                <label>{t.duration}</label>
                <input 
                  type="text"
                  value={exp.duration}
                  onChange={(e) => updateExperience(index, 'duration', e.target.value)}
                  placeholder="2020 - 2023"
                />
              </div>

              <div className="form-group full-width">
                <label>{t.description}</label>
                <textarea 
                  rows="3"
                  value={exp.description}
                  onChange={(e) => updateExperience(index, 'description', e.target.value)}
                  placeholder={t.description}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ==========================================
          SECTION 3: EDUCATION
          ========================================== */}
      <div className="form-section">
        <div className="section-header">
          <h2 className="section-title">{t.education}</h2>
        <button 
  className="add-button" 
  onClick={addEducation}
  type="button"
  aria-label={t.addEducation} // ✅ تعريف واضح للزرار لقارئ الشاشة
>
  <Plus size={20} aria-hidden="true" /> {/* ✅ إخفاء الأيقونة لأن النص كافٍ */}
  <span>{t.addEducation}</span>
</button>
        </div>

        {formData.education.map((edu, index) => (
          <div key={index} className="entry-card">
            <div className="entry-header">
              <span className="entry-number">{index + 1}</span>
              {formData.education.length > 1 && (
             <button 
  className="remove-button"
  onClick={() => removeEducation(index)}
  type="button" // ضروري جداً لمنع أي سلوك غير متوقع للفورم
  aria-label={`${t.remove} ${language === 'ar' ? 'التعليم' : 'Education'} ${index + 1}`}
>
  <Trash2 size={18} aria-hidden="true" /> {/* إخفاء الأيقونة عن قارئ الشاشة */}
  <span>{t.remove}</span>
</button>
              )}
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>{t.institution}</label>
                <input 
                  type="text"
                  value={edu.institution}
                  onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                  placeholder={t.institution}
                />
              </div>

              <div className="form-group">
                <label>{t.degree}</label>
                <input 
                  type="text"
                  value={edu.degree}
                  onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                  placeholder={t.degree}
                />
              </div>

              <div className="form-group full-width">
                <label>{t.year}</label>
                <input 
                  type="text"
                  value={edu.year}
                  onChange={(e) => updateEducation(index, 'year', e.target.value)}
                  placeholder="2020"
                />
              </div>

              <div className="form-group full-width">
                <label>{t.description}</label>
                <textarea 
                  rows="2"
                  value={edu.description}
                  onChange={(e) => updateEducation(index, 'description', e.target.value)}
                  placeholder={t.description}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ==========================================
          SECTION 4: SKILLS
          ========================================== */}
      <div className="form-section">
        <div className="section-header">
          <h2 className="section-title">{t.skills}</h2>
         <button 
  className="add-button" 
  onClick={addSkill}
  type="button"
  // ✅ ضمان أن قارئ الشاشة يعرف وظيفة الزرار فوراً
  aria-label={t.addSkill} 
>
  {/* ✅ إخفاء الأيقونة برمجياً لأنها عنصر مرئي فقط */}
  <Plus size={20} aria-hidden="true" /> 
  <span>{t.addSkill}</span>
</button>
        </div>

        <div className="skills-grid">
          {formData.skills.map((skill, index) => (
            <div key={index} className="skill-item">
              <input 
                type="text"
                value={skill}
                onChange={(e) => updateSkill(index, e.target.value)}
                placeholder={`${t.skills} ${index + 1}`}
              />
              {formData.skills.length > 1 && (
             <button 
  className="skill-remove"
  onClick={() => removeSkill(index)}
  type="button"
  // ✅ لازم نوصف الحذف ونحدد أي مهارة عشان السكور يقفل 100
  aria-label={`${t.remove || 'حذف'} ${formData.skills[index] || 'المهارة'}`}
>
  <Trash2 size={16} aria-hidden="true" /> {/* ✅ إخفاء الأيقونة عن قارئ الشاشة */}
</button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ==========================================
          FORM ACTIONS
          ========================================== */}
      <div className="form-actions">
     <>
  <button 
    className="back-button" 
    onClick={onBack} 
    type="button"
    aria-label={t.backBtn}
  >
    <span aria-hidden="true">
      {language === 'ar' ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
    </span>
    <span>{t.backBtn}</span>
  </button>

  <button 
    className="next-button" 
    onClick={onNext} 
    type="button"
    aria-label={t.nextBtn}
  >
    <span>{t.nextBtn}</span>
    <span aria-hidden="true">
      {language === 'ar' ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
    </span>
  </button>
</>
      </div>
    </div>
  );
};

export default CVForm;