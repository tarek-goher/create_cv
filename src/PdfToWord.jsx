// ==========================================
// PDF TO WORD CONVERTER - محول PDF إلى Word حقيقي (.docx)
// ==========================================
import React, { useState, useRef } from 'react';
import { Upload, Download, FileText, AlertCircle, CheckCircle, Loader, X, Home } from 'lucide-react';
import { Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel, ImageRun } from 'docx';
import { saveAs } from 'file-saver';
import './css/word.css';

const PdfToWord = ({ language = 'ar', onNavigateHome }) => {
  const [file, setFile] = useState(null);
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const t = language === 'ar' ? {
    title: 'تحويل PDF إلى Word',
    subtitle: 'حول ملفات PDF الخاصة بك إلى مستندات Word قابلة للتعديل',
    uploadBtn: 'اختر ملف PDF',
    convertBtn: 'تحويل إلى Word',
    converting: 'جاري التحويل...',
    success: 'تم التحويل بنجاح! جاري التحميل...',
    error: 'حدث خطأ أثناء التحويل',
    selectFile: 'اسحب ملف PDF هنا أو انقر للاختيار',
    fileSelected: 'الملف المحدد:',
    maxSize: 'الحد الأقصى: 50 ميجابايت',
    reset: 'تحويل ملف آخر',
    remove: 'إزالة الملف',
    home: 'الرئيسية',
    features: [
      '✓ ملف Word حقيقي (.docx)',
      '✓ قابل للتعديل بالكامل',
      '✓ جودة عالية',
      '✓ مجاني تماماً'
    ],
    processing: 'معالجة الملف...',
    extracting: 'استخراج المحتوى...',
    creating: 'إنشاء ملف Word...',
    downloading: 'تحميل الملف...',
    invalidFile: 'يرجى اختيار ملف PDF فقط',
    fileTooLarge: 'الملف أكبر من 50 ميجابايت',
    selectFileFirst: 'الرجاء اختيار ملف أولاً',
    conversionError: 'حدث خطأ أثناء التحويل. يرجى المحاولة مرة أخرى.',
    scannedPdf: 'هذا ملف PDF مصور، سيتم تحويله كصور...',
    rendering: 'تحويل الصفحات إلى صور...'
  } : {
    title: 'PDF to Word Converter',
    subtitle: 'Convert your PDF files to editable Word documents',
    uploadBtn: 'Choose PDF File',
    convertBtn: 'Convert to Word',
    converting: 'Converting...',
    success: 'Converted successfully! Downloading...',
    error: 'An error occurred during conversion',
    selectFile: 'Drag PDF file here or click to select',
    fileSelected: 'Selected file:',
    maxSize: 'Max size: 50 MB',
    reset: 'Convert another file',
    remove: 'Remove file',
    home: 'Home',
    features: [
      '✓ Real Word file (.docx)',
      '✓ Fully editable',
      '✓ High quality',
      '✓ Completely free'
    ],
    processing: 'Processing file...',
    extracting: 'Extracting content...',
    creating: 'Creating Word file...',
    downloading: 'Downloading file...',
    invalidFile: 'Please select a PDF file only',
    fileTooLarge: 'File is larger than 50 MB',
    selectFileFirst: 'Please select a file first',
    conversionError: 'Conversion error. Please try again.',
    scannedPdf: 'This is a scanned PDF, converting as images...',
    rendering: 'Rendering pages to images...'
  };

  // ==========================================
  // FILE UPLOAD HANDLER
  // ==========================================
  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (selectedFile.type !== 'application/pdf') {
      setError(t.invalidFile);
      return;
    }

    if (selectedFile.size > 50 * 1024 * 1024) {
      setError(t.fileTooLarge);
      return;
    }

    setFile(selectedFile);
    setError(null);
    setSuccess(false);
    setProgress(0);
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // ==========================================
  // LOAD PDF.JS LIBRARY
  // ==========================================
  const loadPdfJs = () => {
    return new Promise((resolve, reject) => {
      if (window.pdfjsLib) {
        resolve(window.pdfjsLib);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
      
      script.onload = () => {
        if (window.pdfjsLib) {
          window.pdfjsLib.GlobalWorkerOptions.workerSrc = 
            'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
          resolve(window.pdfjsLib);
        } else {
          reject(new Error('PDF.js failed to load'));
        }
      };
      
      script.onerror = () => reject(new Error('Failed to load PDF.js'));
      document.head.appendChild(script);
    });
  };

  // ==========================================
  // RENDER PAGE TO IMAGE
  // ==========================================
  const renderPageToImage = async (page, scale = 2) => {
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    await page.render({
      canvasContext: context,
      viewport: viewport
    }).promise;

    // تحويل Canvas إلى Blob
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, 'image/jpeg', 0.9);
    });
  };

  // ==========================================
  // CREATE REAL DOCX WITH TEXT
  // ==========================================
  const createRealDocxWithText = async (text, originalFilename) => {
    const isRTL = language === 'ar';
    
    // تقسيم النص لفقرات
    const paragraphs = text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map(para => 
        new Paragraph({
          children: [
            new TextRun({
              text: para,
              font: isRTL ? 'Arial' : 'Calibri',
              size: 22 // 11pt = 22 half-points
            })
          ],
          alignment: isRTL ? AlignmentType.RIGHT : AlignmentType.JUSTIFIED,
          spacing: { after: 200 },
          bidirectional: isRTL
        })
      );

    // إنشاء مستند Word حقيقي
    const doc = new Document({
      sections: [{
        properties: {
          page: {
            margin: {
              top: 1440,    // 1 inch = 1440 twips
              right: 1440,
              bottom: 1440,
              left: 1440
            }
          }
        },
        children: paragraphs
      }]
    });

    // حفظ الملف
    const blob = await Packer.toBlob(doc);
    const fileName = originalFilename.replace('.pdf', '.docx');
    saveAs(blob, fileName);
  };

  // ==========================================
  // CREATE REAL DOCX WITH IMAGES
  // ==========================================
  const createRealDocxWithImages = async (imageBlobs, originalFilename) => {
    const children = [];

    for (let i = 0; i < imageBlobs.length; i++) {
      const imageBuffer = await imageBlobs[i].arrayBuffer();
      
      children.push(
        new Paragraph({
          children: [
            new ImageRun({
              data: imageBuffer,
              transformation: {
                width: 595,  // A4 width in points (approx)
                height: 842  // A4 height in points (approx)
              }
            })
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 }
        })
      );

      // فاصل صفحات بين الصور
      if (i < imageBlobs.length - 1) {
        children.push(
          new Paragraph({
            pageBreakBefore: true
          })
        );
      }
    }

    const doc = new Document({
      sections: [{
        properties: {
          page: {
            margin: {
              top: 720,
              right: 720,
              bottom: 720,
              left: 720
            }
          }
        },
        children: children
      }]
    });

    const blob = await Packer.toBlob(doc);
    const fileName = originalFilename.replace('.pdf', '.docx');
    saveAs(blob, fileName);
  };

  // ==========================================
  // PDF TO WORD CONVERSION - الدالة الرئيسية
  // ==========================================
  const convertPdfToWord = async () => {
    if (!file) {
      setError(t.selectFileFirst);
      return;
    }

    setConverting(true);
    setProgress(0);
    setError(null);
    setSuccess(false);

    try {
      // تحميل PDF.js
      setProgress(5);
      const pdfjsLib = await loadPdfJs();
      
      // قراءة ملف PDF
      setProgress(10);
      const arrayBuffer = await file.arrayBuffer();
      
      // تحميل مستند PDF
      setProgress(15);
      const loadingTask = pdfjsLib.getDocument({ 
        data: arrayBuffer,
        verbosity: 0 
      });
      const pdf = await loadingTask.promise;
      const totalPages = pdf.numPages;
      
      // فحص وجود نص
      setProgress(20);
      let fullText = '';
      let hasText = false;
      
      // فحص أول 3 صفحات
      const pagesToCheck = Math.min(3, totalPages);
      for (let i = 1; i <= pagesToCheck; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map(item => item.str)
          .join(' ')
          .trim();
        
        if (pageText.length > 50) {
          hasText = true;
          break;
        }
      }

      if (hasText) {
        // استخراج النص من كل الصفحات
        for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
          const currentProgress = 20 + (pageNum / totalPages) * 50;
          setProgress(Math.round(currentProgress));
          
          const page = await pdf.getPage(pageNum);
          const textContent = await page.getTextContent();
          
          const pageText = textContent.items
            .map(item => item.str)
            .join(' ')
            .trim();
          
          if (pageText) {
            fullText += pageText + '\n\n';
          }
        }

        if (fullText.trim().length < 10) {
          throw new Error('Not enough text content');
        }

        setProgress(75);
        
        // إنشاء ملف Word حقيقي بالنص
        await createRealDocxWithText(fullText, file.name);
        
      } else {
        // PDF مصور - تحويل لصور
        setError(t.scannedPdf);
        
        const imageBlobs = [];
        
        for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
          const currentProgress = 20 + (pageNum / totalPages) * 70;
          setProgress(Math.round(currentProgress));
          
          const page = await pdf.getPage(pageNum);
          const imageBlob = await renderPageToImage(page);
          imageBlobs.push(imageBlob);
        }

        setProgress(95);
        
        // إنشاء ملف Word حقيقي بالصور
        await createRealDocxWithImages(imageBlobs, file.name);
      }
      
      setProgress(100);
      setSuccess(true);
      setError(null);
      
    } catch (err) {
      console.error('Conversion error:', err);
      setError(t.conversionError + (err.message ? `\n${err.message}` : ''));
    } finally {
      setConverting(false);
    }
  };

  // ==========================================
  // DRAG & DROP
  // ==========================================
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const droppedFile = e.dataTransfer?.files?.[0];
    if (droppedFile) {
      const fakeEvent = { target: { files: [droppedFile] } };
      handleFileChange(fakeEvent);
    }
  };

  // ==========================================
  // RESET
  // ==========================================
  const handleReset = () => {
    setFile(null);
    setError(null);
    setSuccess(false);
    setProgress(0);
    setConverting(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getProgressMessage = () => {
    if (progress < 20) return t.processing;
    if (progress < 70) return t.extracting;
    if (progress < 95) return t.creating;
    return t.downloading;
  };

  return (
    <div className={`word-converter ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      {onNavigateHome && (
       <button 
  className="wc-home-btn no-print" 
  onClick={onNavigateHome}
  aria-label={t.home} // ✅ بيخلي الزرار متعرف بوضوح لقارئ الشاشة
>
  <Home size={20} aria-hidden="true" /> 
  <span>{t.home}</span>
</button>
      )}

      <div className="wc-header">
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
      </div>

      <div className="wc-container">
        <div 
          className={`wc-upload ${file ? 'has-file' : ''}`}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={!file ? handleUploadClick : undefined}
          style={{ cursor: !file ? 'pointer' : 'default' }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          
          {!file ? (
            <div className="wc-upload-area">
              <Upload size={64} />
              <h3>{t.selectFile}</h3>
              <p>{t.maxSize}</p>
      <button 
  type="button" 
  className="wc-select-btn"
  onClick={(e) => {
    e.stopPropagation();
    handleUploadClick();
  }}
  aria-label={t.uploadBtn} // ✅ تحديد اسم واضح للزرار
>
  {/* // ✅ إخفاء الأيقونة عن قارئ الشاشة */}
  <FileText size={20} aria-hidden="true" /> 
  {/* // ✅ وضع النص داخل span أفضل للتنظيم */}
  <span>{t.uploadBtn}</span> 
</button>
            </div>
          ) : (
            <div className="wc-file-preview">
              <div className="wc-file-info">
                <FileText size={48} />
                <div>
                  <p className="wc-file-label">{t.fileSelected}</p>
                  <p className="wc-filename">{file.name}</p>
                  <p className="wc-filesize">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
            <button 
  className="wc-remove-btn" 
  onClick={(e) => {
    e.stopPropagation();
    handleReset();
  }}
  type="button"
  disabled={converting}
  aria-label={language === 'ar' ? "حذف الملف" : "Remove file"} // ✅ الحل السحري هنا
>
  {/* // ✅ إخفاء الأيقونة عن قارئ الشاشة */}
  <X size={20} aria-hidden="true" /> 
</button>
            </div>
          )}
        </div>

        {converting && (
          <div className="wc-progress">
            <p className="wc-progress-text">{getProgressMessage()}</p>
            <div className="wc-progress-bar">
              <div 
                className="wc-progress-fill" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="wc-progress-percent">{Math.round(progress)}%</p>
          </div>
        )}

        {error && !converting && (
          <div className="wc-alert wc-error">
            <AlertCircle size={24} />
            <div>
              <p>{error}</p>
            </div>
          </div>
        )}

        {error && converting && (
          <div className="wc-alert" style={{
            background: 'rgba(251, 191, 36, 0.1)',
            border: '2px solid #f59e0b',
            color: '#f59e0b'
          }}>
            <AlertCircle size={24} />
            <div>
              <p>{error}</p>
            </div>
          </div>
        )}

        {success && (
          <div className="wc-alert wc-success">
            <CheckCircle size={24} />
            <p>{t.success}</p>
          </div>
        )}

        {file && !success && (
<button 
  className="wc-convert-btn" 
  onClick={convertPdfToWord}
  disabled={converting}
  type="button"
  // aria-live بيخلي قارئ الشاشة ينطق التغيير فوراً أول ما النص يتغير
  aria-live="polite" 
  // aria-label بيضمن إن الاسم دايماً واضح بغض النظر عن الأيقونات
  aria-label={converting ? t.converting : t.convertBtn}
>
  {converting ? (
    <>
      <Loader size={20} className="wc-spin" aria-hidden="true" />
      <span style={{ marginInlineStart: '8px' }}>{t.converting}</span>
    </>
  ) : (
    <>
      <Download size={20} aria-hidden="true" />
      <span style={{ marginInlineStart: '8px' }}>{t.convertBtn}</span>
    </>
  )}
</button>
        )}

        {success && (
     <button 
  className="wc-reset-btn" 
  onClick={handleReset} 
  type="button"
  aria-label={t.reset} // ✅ تعريف واضح للزرار
>
  {/* // ✅ تجاهل الأيقونة برمجياً */}
  <FileText size={20} aria-hidden="true" /> 
  {/* // ✅ وضع النص في وعاء مستقل */}
  <span>{t.reset}</span> 
</button>
        )}

        <div className="wc-features">
          {t.features.map((feature, index) => (
            <div key={index} className="wc-feature">{feature}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PdfToWord;