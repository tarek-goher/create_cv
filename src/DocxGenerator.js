// ==========================================
// DOCX GENERATOR - مولّد ملفات Word الحقيقية (.docx)
// ==========================================
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle } from 'docx';
import { saveAs } from 'file-saver';

/**
 * دالة لتحويل السيرة الذاتية إلى Word حقيقي (.docx) - نصوص قابلة للتعديل
 * @param {object} formData - بيانات السيرة الذاتية
 * @param {string} language - اللغة (ar أو en)
 * @param {string} fileName - اسم الملف
 */
export const generateWordDocument = async (formData, language = 'ar', fileName = 'CV') => {
  try {
    const isRTL = language === 'ar';
    
    const t = language === 'ar' ? {
      summary: 'نبذة تعريفية',
      experience: 'الخبرات العملية',
      education: 'التعليم',
      skills: 'المهارات',
      contact: 'معلومات التواصل'
    } : {
      summary: 'Professional Summary',
      experience: 'Work Experience',
      education: 'Education',
      skills: 'Skills',
      contact: 'Contact Information'
    };

    // إنشاء مصفوفة الأقسام
    const sections = [];

    // ==========================================
    // HEADER - الترويسة
    // ==========================================
    sections.push(
      new Paragraph({
        text: formData.fullName || 'Your Name',
        heading: HeadingLevel.TITLE,
        alignment: AlignmentType.CENTER,
        spacing: { after: 100 },
        bidirectional: isRTL
      })
    );

    sections.push(
      new Paragraph({
        text: formData.jobTitle || 'Job Title',
        heading: HeadingLevel.HEADING_2,
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
        bidirectional: isRTL
      })
    );

    // معلومات الاتصال
    const contactParts = [];
    if (formData.email) contactParts.push(`📧 ${formData.email}`);
    if (formData.phone) contactParts.push(`📱 ${formData.phone}`);
    if (formData.address) contactParts.push(`📍 ${formData.address}`);

    if (contactParts.length > 0) {
      sections.push(
        new Paragraph({
          text: contactParts.join(' | '),
          alignment: AlignmentType.CENTER,
          spacing: { after: 300 },
          bidirectional: isRTL
        })
      );
    }

    // ==========================================
    // SUMMARY - النبذة التعريفية
    // ==========================================
    if (formData.summary) {
      sections.push(
        new Paragraph({
          text: t.summary,
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 200, after: 100 },
          bidirectional: isRTL,
          border: {
            bottom: {
              color: "2980B9",
              space: 1,
              style: BorderStyle.SINGLE,
              size: 6
            }
          }
        })
      );

      sections.push(
        new Paragraph({
          text: formData.summary,
          spacing: { after: 300 },
          bidirectional: isRTL,
          alignment: isRTL ? AlignmentType.RIGHT : AlignmentType.LEFT
        })
      );
    }

    // ==========================================
    // EXPERIENCE - الخبرات العملية
    // ==========================================
    if (formData.experience && formData.experience.some(exp => exp.company || exp.position)) {
      sections.push(
        new Paragraph({
          text: t.experience,
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 200, after: 100 },
          bidirectional: isRTL,
          border: {
            bottom: {
              color: "2980B9",
              space: 1,
              style: BorderStyle.SINGLE,
              size: 6
            }
          }
        })
      );

      formData.experience.forEach((exp, index) => {
        if (exp.company || exp.position) {
          // المنصب
          sections.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: exp.position || 'Position',
                  bold: true,
                  size: 24
                })
              ],
              spacing: { before: 150, after: 50 },
              bidirectional: isRTL,
              alignment: isRTL ? AlignmentType.RIGHT : AlignmentType.LEFT
            })
          );

          // الشركة والمدة
          const companyDuration = `${exp.company || ''} ${exp.duration ? '• ' + exp.duration : ''}`;
          sections.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: companyDuration,
                  italics: true,
                  color: "666666"
                })
              ],
              spacing: { after: 50 },
              bidirectional: isRTL,
              alignment: isRTL ? AlignmentType.RIGHT : AlignmentType.LEFT
            })
          );

          // الوصف
          if (exp.description) {
            sections.push(
              new Paragraph({
                text: exp.description,
                spacing: { after: 200 },
                bidirectional: isRTL,
                alignment: isRTL ? AlignmentType.RIGHT : AlignmentType.LEFT
              })
            );
          }
        }
      });
    }

    // ==========================================
    // EDUCATION - التعليم
    // ==========================================
    if (formData.education && formData.education.some(edu => edu.institution || edu.degree)) {
      sections.push(
        new Paragraph({
          text: t.education,
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 200, after: 100 },
          bidirectional: isRTL,
          border: {
            bottom: {
              color: "2980B9",
              space: 1,
              style: BorderStyle.SINGLE,
              size: 6
            }
          }
        })
      );

      formData.education.forEach((edu) => {
        if (edu.institution || edu.degree) {
          // الدرجة العلمية
          sections.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: edu.degree || 'Degree',
                  bold: true,
                  size: 24
                })
              ],
              spacing: { before: 150, after: 50 },
              bidirectional: isRTL,
              alignment: isRTL ? AlignmentType.RIGHT : AlignmentType.LEFT
            })
          );

          // المؤسسة والسنة
          const institutionYear = `${edu.institution || ''} ${edu.year ? '• ' + edu.year : ''}`;
          sections.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: institutionYear,
                  italics: true,
                  color: "666666"
                })
              ],
              spacing: { after: 50 },
              bidirectional: isRTL,
              alignment: isRTL ? AlignmentType.RIGHT : AlignmentType.LEFT
            })
          );

          // الوصف
          if (edu.description) {
            sections.push(
              new Paragraph({
                text: edu.description,
                spacing: { after: 200 },
                bidirectional: isRTL,
                alignment: isRTL ? AlignmentType.RIGHT : AlignmentType.LEFT
              })
            );
          }
        }
      });
    }

    // ==========================================
    // SKILLS - المهارات
    // ==========================================
    if (formData.skills && formData.skills.some(skill => skill)) {
      sections.push(
        new Paragraph({
          text: t.skills,
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 200, after: 100 },
          bidirectional: isRTL,
          border: {
            bottom: {
              color: "2980B9",
              space: 1,
              style: BorderStyle.SINGLE,
              size: 6
            }
          }
        })
      );

      const skillsList = formData.skills.filter(skill => skill);
      
      skillsList.forEach((skill) => {
        sections.push(
          new Paragraph({
            text: `• ${skill}`,
            spacing: { after: 100 },
            bidirectional: isRTL,
            alignment: isRTL ? AlignmentType.RIGHT : AlignmentType.LEFT
          })
        );
      });
    }

    // ==========================================
    // CREATE DOCUMENT
    // ==========================================
    const doc = new Document({
      sections: [{
        properties: {},
        children: sections
      }]
    });

    // ==========================================
    // SAVE DOCUMENT
    // ==========================================
    const blob = await Packer.toBlob(doc);
    const finalFileName = `${fileName}_${new Date().getTime()}.docx`;
    saveAs(blob, finalFileName);

    return {
      success: true,
      message: language === 'ar' 
        ? '✅ تم التحميل بنجاح - ملف Word حقيقي قابل للتعديل' 
        : '✅ Downloaded successfully - Real editable Word document'
    };

  } catch (error) {
    console.error('Word Generation Error:', error);
    return {
      success: false,
      message: language === 'ar' 
        ? '❌ حدث خطأ أثناء إنشاء الملف' 
        : '❌ Error generating Word document',
      error: error.message
    };
  }
};