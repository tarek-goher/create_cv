// ==========================================
// PDF GENERATOR - مولّد PDF مع دعم كامل للعربي
// ==========================================
// import jsPDF from 'jspdf';
import html2pdf from 'html2pdf.js';
// import html2canvas from 'html2canvas';

/**
 */
// ==========================================
// PDF Generator - مولد PDF محسّن مع دعم كامل للعربي
// ==========================================
/**
 * تحويل السيرة الذاتية إلى PDF مع دعم كامل للعربي
 */
export const generatePDFFromHTML = async (formData, template, language = 'ar', fileName = 'CV') => {
  try {
    const element = document.getElementById('cv-preview-content');
    
    if (!element) {
      return {
        success: false,
        message: language === 'ar' ? 'لم يتم العثور على السيرة الذاتية' : 'CV preview not found'
      };
    }

    console.log('🎨 جاري تحويل السيرة الذاتية إلى PDF...');

const options = {
  // ✅ لجعل التصميم يملأ الصفحة تماماً بدون حواف بيضاء تفسد القالب
  margin: 0, 
  
  filename: `${fileName}_${template.id}.pdf`,
  image: { type: 'jpeg', quality: 1.0 },
  
  html2canvas: { 
    scale: 4, 
    useCORS: true, 
    letterRendering: true,
    allowTaint: false,
    logging: false,
    backgroundColor: '#ffffff',
    
    // ✅ السر هنا: 794px هو العرض القياسي لـ A4 بـ 96 DPI
    // نثبت العرض لضمان عدم تحرك العناصر عند التحويل
    width: 794, 
    windowWidth: 794,
    
    scrollY: 0,
    scrollX: 0
  },
  
  jsPDF: { 
    unit: 'mm', 
    format: 'a4', 
    orientation: 'portrait',
    compress: true
  },
  
  // ✅ يمنع قطع الكلام أو الصور في منتصف الصفحة
  pagebreak: { 
    mode: ['avoid-all', 'css', 'legacy'] 
  }
};

    // تحويل وحفظ PDF
    await html2pdf().set(options).from(element).save();

    console.log('✅ تم إنشاء PDF بنجاح');

    return {
      success: true,
      message: language === 'ar' 
        ? '✅ تم التحميل بنجاح - PDF بجودة عالية مع دعم كامل للعربي' 
        : '✅ Downloaded successfully - High quality PDF with full Arabic support'
    };

  } catch (error) {
    console.error('❌ خطأ في إنشاء PDF:', error);
    return {
      success: false,
      message: language === 'ar' 
        ? '❌ حدث خطأ: ' + error.message
        : '❌ Error: ' + error.message
    };
  }
};

/**
 * ====================================================
 * دالة PDF نصي - ATS Friendly (للإنجليزي فقط)
 * ====================================================
 */
export const generateTextBasedPDF = async (formData, template, language = 'ar', fileName = 'CV') => {
  try {
    // ⚠️ تحذير للمستخدمين العرب
    if (language === 'ar') {
      const confirmMsg = 'تنبيه: PDF النصي قد لا يعرض العربي بشكل صحيح.\n\nللحصول على أفضل نتيجة بالعربي، استخدم:\n- تحميل Word\n- تحميل PDF (تصميم)\n\nهل تريد المتابعة؟';
      
      if (!window.confirm(confirmMsg)) {
        return {
          success: false,
          message: 'تم الإلغاء'
        };
      }
    }

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    // استخدام Arial للعربي (أفضل من Helvetica)
    pdf.setFont('helvetica');
    
    let yPos = 20;
    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 20;
    const maxWidth = pageWidth - (margin * 2);

    const checkNewPage = (requiredSpace = 20) => {
      if (yPos + requiredSpace > pageHeight - margin) {
        pdf.addPage();
        yPos = 20;
        return true;
      }
      return false;
    };

    // ==========================================
    // HEADER
    // ==========================================
    pdf.setFillColor(41, 128, 185);
    pdf.rect(0, 0, pageWidth, 50, 'F');
    
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    
    // ⚠️ العربي قد يظهر معكوس - نحذر المستخدم مسبقاً
    const nameText = formData.fullName || 'Your Name';
    pdf.text(nameText, pageWidth / 2, 20, { align: 'center' });
    
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'normal');
    const titleText = formData.jobTitle || 'Job Title';
    pdf.text(titleText, pageWidth / 2, 30, { align: 'center' });
    
    // معلومات الاتصال
    pdf.setFontSize(10);
    const contactInfo = [
      formData.email && `${formData.email}`,
      formData.phone && `${formData.phone}`,
      formData.address && `${formData.address}`
    ].filter(Boolean).join('  |  ');
    
    pdf.text(contactInfo, pageWidth / 2, 40, { align: 'center' });
    
    yPos = 60;
    pdf.setTextColor(0, 0, 0);

    // ==========================================
    // باقي المحتوى (بنفس الطريقة السابقة)
    // ==========================================
    
    // SUMMARY
    if (formData.summary) {
      checkNewPage(30);
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(41, 128, 185);
      
      const summaryTitle = language === 'ar' ? 'نبذة تعريفية' : 'Professional Summary';
      pdf.text(summaryTitle, margin, yPos);
      yPos += 7;
      
      pdf.setDrawColor(41, 128, 185);
      pdf.setLineWidth(0.5);
      pdf.line(margin, yPos, pageWidth - margin, yPos);
      yPos += 5;
      
      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      
      const lines = pdf.splitTextToSize(formData.summary, maxWidth);
      lines.forEach((line) => {
        checkNewPage();
        pdf.text(line, margin, yPos);
        yPos += 6;
      });
      yPos += 10;
    }

    // EXPERIENCE
    if (formData.experience && formData.experience.some(exp => exp.company || exp.position)) {
      checkNewPage(30);
      
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(41, 128, 185);
      const expTitle = language === 'ar' ? 'الخبرات العملية' : 'Work Experience';
      pdf.text(expTitle, margin, yPos);
      yPos += 7;
      
      pdf.setDrawColor(41, 128, 185);
      pdf.line(margin, yPos, pageWidth - margin, yPos);
      yPos += 8;
      
      formData.experience.forEach((exp) => {
        if (exp.company || exp.position) {
          checkNewPage(25);
          
          pdf.setTextColor(0, 0, 0);
          pdf.setFontSize(12);
          pdf.setFont('helvetica', 'bold');
          pdf.text(exp.position || 'Position', margin, yPos);
          yPos += 6;
          
          pdf.setFontSize(10);
          pdf.setFont('helvetica', 'normal');
          pdf.setTextColor(100, 100, 100);
          const companyInfo = `${exp.company || ''} ${exp.duration ? '• ' + exp.duration : ''}`;
          pdf.text(companyInfo, margin, yPos);
          yPos += 6;
          
          if (exp.description) {
            pdf.setTextColor(0, 0, 0);
            const descLines = pdf.splitTextToSize(exp.description, maxWidth);
            descLines.forEach((line) => {
              checkNewPage();
              pdf.text(line, margin, yPos);
              yPos += 6;
            });
          }
          
          yPos += 8;
        }
      });
    }

    // EDUCATION
    if (formData.education && formData.education.some(edu => edu.institution || edu.degree)) {
      checkNewPage(30);
      
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(41, 128, 185);
      const eduTitle = language === 'ar' ? 'التعليم' : 'Education';
      pdf.text(eduTitle, margin, yPos);
      yPos += 7;
      
      pdf.setDrawColor(41, 128, 185);
      pdf.line(margin, yPos, pageWidth - margin, yPos);
      yPos += 8;
      
      formData.education.forEach((edu) => {
        if (edu.institution || edu.degree) {
          checkNewPage(20);
          
          pdf.setTextColor(0, 0, 0);
          pdf.setFontSize(12);
          pdf.setFont('helvetica', 'bold');
          pdf.text(edu.degree || 'Degree', margin, yPos);
          yPos += 6;
          
          pdf.setFontSize(10);
          pdf.setFont('helvetica', 'normal');
          pdf.setTextColor(100, 100, 100);
          const eduInfo = `${edu.institution || ''} ${edu.year ? '• ' + edu.year : ''}`;
          pdf.text(eduInfo, margin, yPos);
          yPos += 6;
          
          if (edu.description) {
            pdf.setTextColor(0, 0, 0);
            const descLines = pdf.splitTextToSize(edu.description, maxWidth);
            descLines.forEach((line) => {
              checkNewPage();
              pdf.text(line, margin, yPos);
              yPos += 6;
            });
          }
          
          yPos += 8;
        }
      });
    }

    // SKILLS
    if (formData.skills && formData.skills.some(skill => skill)) {
      checkNewPage(30);
      
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(41, 128, 185);
      const skillsTitle = language === 'ar' ? 'المهارات' : 'Skills';
      pdf.text(skillsTitle, margin, yPos);
      yPos += 7;
      
      pdf.setDrawColor(41, 128, 185);
      pdf.line(margin, yPos, pageWidth - margin, yPos);
      yPos += 8;
      
      const skillsList = formData.skills.filter(skill => skill);
      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      
      skillsList.forEach((skill) => {
        checkNewPage(8);
        pdf.text(`• ${skill}`, margin + 5, yPos);
        yPos += 6;
      });
    }

    // حفظ الملف
    const finalFileName = `${fileName}_ATS_${new Date().getTime()}.pdf`;
    pdf.save(finalFileName);

    return { 
      success: true, 
      message: language === 'ar' 
        ? '✅ تم التحميل - ملف نصي (قد تظهر العربية معكوسة)' 
        : '✅ Downloaded - Text-based PDF (ATS Friendly)'
    };

  } catch (error) {
    console.error('❌ خطأ في PDF:', error);
    return { 
      success: false, 
      message: language === 'ar' ? '❌ حدث خطأ' : '❌ Error',
      error: error.message
    };
  }
};