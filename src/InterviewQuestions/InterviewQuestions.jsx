// ==========================================
// INTERVIEW QUESTIONS PAGE
// ==========================================
import React, { useState } from 'react';
import { ChevronDown, CheckCircle, AlertCircle, Lightbulb, Users, Code, Briefcase } from 'lucide-react';
import './InterviewQuestions.css';

const InterviewQuestions = ({ language }) => {
  const [openQuestion, setOpenQuestion] = useState(null);
  const [activeTab, setActiveTab] = useState('general');

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  const content = {
    ar: {
      title: 'أسئلة الإنترفيو',
      subtitle: 'دليلك عشان تستعد لمقابلة الشغل بثقة واحترافية',
      tabs: {
        general: 'أسئلة عامة',
        behavioral: 'أسئلة سلوكية',
        technical: 'أسئلة تقنية',
        tips: 'نصائح مهمة'
      },
      generalQuestions: [
        {
          question: 'قولي عن نفسك',
          answer: 'ركز على شغلك ومهاراتك وإنجازاتك. ابدأ بدراستك وبعدين اتكلم عن خبراتك في الشغل وإزاي بتناسب الوظيفة اللي إنت قدمت عليها. خلي إجابتك مختصرة (2-3 دقايق) ومركزة على اللي يهم صاحب الشغل.',
          tips: [
            'متتكلمش عن حياتك الشخصية كتير',
            'ركز على إنجازاتك في الشغل',
            'اربط خبراتك باللي الوظيفة محتاجاه'
          ]
        },
        {
          question: 'إيه نقاط القوة عندك؟',
          answer: 'اختار 2-3 نقاط قوة ليها علاقة بالوظيفة، وادعمها بأمثلة حقيقية. مثلاً: "أنا كويس في حل المشاكل المعقدة، وساعدت فريقي إننا نقلل وقت الشغل 30%"',
          tips: [
            'اختار نقاط قوة ليها علاقة بالشغل',
            'ادي أمثلة محددة بأرقام لو تقدر',
            'ابعد عن الكلام العام اللي كله بيقوله'
          ]
        },
        {
          question: 'إيه نقاط الضعف عندك؟',
          answer: 'اختار حاجة حقيقية بس مش حاجة أساسية للشغل، واشرح إزاي بتحاول تحسنها. مثلاً: "كنت بخاف من التقديم قدام ناس كتير، بس اخدت كورسات وبقيت واثق من نفسي أكتر"',
          tips: [
            'كن صادق بس متختارش حاجة خطيرة',
            'قول بتعمل إيه عشان تحسنها',
            'متقولش حاجة أساسية للوظيفة'
          ]
        },
        {
          question: 'ليه عايز تشتغل عندنا؟',
          answer: 'ابحث عن الشركة كويس، واتكلم عن حاجات محددة زي: ثقافة الشركة، فرص التطور، المشاريع الحلوة، أو قيم الشركة اللي بتناسبك. ورّي إنك فعلاً مهتم.',
          tips: [
            'اعرف عن الشركة كويس قبل الإنترفيو',
            'اربط أهدافك بأهداف الشركة',
            'متتكلمش عن الفلوس بس'
          ]
        },
        {
          question: 'فين شايف نفسك بعد 5 سنين؟',
          answer: 'ورّي إنك طموح بس واقعي، واربط أهدافك بفرص التطور في الشركة. مثلاً: "نفسي أبقى قائد فريق في المجال ده، وأساعد في تطوير استراتيجيات جديدة للشركة"',
          tips: [
            'كن طموح بس واقعي',
            'اربط أهدافك بفرص النمو في الشركة',
            'ورّي إنك ملتزم على المدى الطويل'
          ]
        },
        {
          question: 'ليه سيبت / عايز تسيب شغلك الحالي؟',
          answer: 'كن إيجابي ومحترف. ركز على إنك بتدور على فرص جديدة للتطور، مش على المشاكل في شغلك الحالي. مثلاً: "بدور على تحديات جديدة وفرص أطور مهاراتي في المجال ده"',
          tips: [
            'متنتقدش مديرك أو شركتك القديمة',
            'ركز على الإيجابيات والمستقبل',
            'كن صادق بس محترم'
          ]
        },
        {
          question: 'متوقع كام في المرتب؟',
          answer: 'ابحث عن متوسط المرتبات للوظيفة دي في السوق. قول رقم معقول بناءً على خبرتك ومهاراتك. ممكن تقول: "بناءً على بحثي وخبرتي، متوقع من X لـ Y، بس أنا مرن حسب الباكدج كامل"',
          tips: [
            'اعرف متوسط المرتبات في السوق',
            'كن مرن ومستعد للتفاوض',
            'حط في بالك المزايا التانية مش المرتب بس'
          ]
        },
        {
          question: 'عندك أسئلة تسألنا؟',
          answer: 'دايماً اسأل أسئلة ذكية تورّي إنك مهتم. مثلاً: "إيه أكبر تحديات بيواجهها الفريق دلوقتي؟" أو "إزاي بتقيسوا النجاح في الدور ده؟" أو "إيه فرص التطور المتاحة؟"',
          tips: [
            'حضّر 3-5 أسئلة ذكية من قبلها',
            'اسأل عن الفريق والثقافة والتحديات',
            'متسألش عن الإجازات في أول إنترفيو'
          ]
        }
      ],
      behavioralQuestions: [
        {
          question: 'احكيلي عن موقف صعب واجهته وإزاي تعاملت معاه؟',
          answer: 'استخدم طريقة STAR (الموقف، المهمة، الإجراء، النتيجة): قول إيه الموقف، إيه كان مطلوب منك، عملت إيه، وإيه النتيجة اللي وصلتلها. كن محدد واستخدم أرقام لو تقدر.',
          tips: [
            'استخدم طريقة STAR في إجابتك',
            'اختار مثال يورّي مهاراتك',
            'ركز على النتايج الإيجابية'
          ]
        },
        {
          question: 'احكيلي عن موقف اشتغلت فيه مع فريق عشان تحققوا هدف',
          answer: 'اتكلم عن دورك في الفريق، ساهمت إزاي، تعاونت إزاي مع الباقيين، وإزاي عديتوا التحديات مع بعض. ورّي مهاراتك في التواصل والشغل الجماعي.',
          tips: [
            'ورّي دورك من غير ما تقلل من دور الناس التانية',
            'قول ساهمت إزاي في نجاح الفريق',
            'اذكر النتايج اللي حصلت'
          ]
        },
        {
          question: 'بتتعامل إزاي مع الضغط والمواعيد الضيقة؟',
          answer: 'ورّي إنك عارف ترتب أولوياتك، تنظم وقتك، وتفضل هادي تحت الضغط. ادي مثال حقيقي إنك نجحت تسلم شغل كويس رغم إن الوقت كان ضيق.',
          tips: [
            'ورّي مهاراتك في تنظيم الوقت',
            'قول بتحافظ إزاي على الجودة',
            'اذكر أدوات أو طرق بتستخدمها'
          ]
        },
        {
          question: 'احكيلي عن غلطة عملتها واتعلمت إيه منها؟',
          answer: 'كن صادق، اختار غلطة حقيقية بس مش كارثة. ركز على اللي اتعلمته وإزاي بقيت أحسن. ورّي إنك ناضج وبتطور نفسك.',
          tips: [
            'اختار غلطة حقيقية بس مش خطيرة',
            'ركز على الدرس اللي اتعلمته',
            'قول متكررتش إزاي'
          ]
        },
        {
          question: 'احكيلي عن موقف اختلفت فيه مع حد في الشغل وحليتوه إزاي؟',
          answer: 'ورّي إنك محترف في التعامل مع الخلافات. قول سمعت للطرف التاني إزاي، وصلتوا لحل إزاي، وحافظت على العلاقة المهنية.',
          tips: [
            'كن محترم ومهني',
            'ورّي مهاراتك في التواصل والحل',
            'متحطش اللوم على الناس'
          ]
        }
      ],
      technicalQuestions: [
        {
          question: 'إيه الأدوات والتكنولوجيا اللي إنت شاطر فيها؟',
          answer: 'اذكر الأدوات والتكنولوجيا اللي ليها علاقة بالشغل. صنّفها حسب مستواك (خبير، متقدم، متوسط). ادي أمثلة على مشاريع استخدمتها فيها.',
          tips: [
            'كن صادق في مستوى خبرتك',
            'ركز على الأدوات اللي الشغل محتاجها',
            'استعد لأسئلة تقنية عنها'
          ]
        },
        {
          question: 'بتتابع إزاي آخر التطورات في مجالك؟',
          answer: 'اتكلم عن مصادر التعلم بتاعتك: كورسات أونلاين، مدونات تقنية، مؤتمرات، كتب، أو مشاريع شخصية. ورّي إنك شغوف بالتطوير.',
          tips: [
            'اذكر مصادر محددة بتتابعها',
            'ورّي إنك ملتزم بالتعلم المستمر',
            'اتكلم عن آخر حاجة اتعلمتها'
          ]
        },
        {
          question: 'احكيلي عن مشروع فخور بيه',
          answer: 'اختار مشروع يورّي مهاراتك التقنية وقدرتك على حل المشاكل. قول إيه التحديات، الحلول التقنية، ودورك في النجاح. استخدم أرقام للنتايج.',
          tips: [
            'اختار مشروع ليه علاقة بالوظيفة',
            'قول دورك بالتفصيل',
            'اذكر التحديات وإزاي تغلبت عليها'
          ]
        }
      ],
      importantTips: {
        before: {
          title: 'قبل الإنترفيو',
          tips: [
            'ابحث عن الشركة كويس (موقعهم، منتجاتهم، آخر أخبارهم)',
            'راجع متطلبات الوظيفة وحضّر أمثلة لكل حاجة',
            'حضّر أسئلة ذكية تسألها للمُقابِل',
            'جهّز هدوم مناسبة واحترافية',
            'تأكد من مكان وميعاد الإنترفيو (أو اللينك لو أونلاين)',
            'اطبع نسخ من السيرة الذاتية بتاعتك'
          ]
        },
        during: {
          title: 'وقت الإنترفيو',
          tips: [
            'وصل بدري (10-15 دقيقة)',
            'صافح بثقة وابتسم',
            'حافظ على التواصل بالعين',
            'اسمع كويس قبل ما تجاوب',
            'كن محدد وادي أمثلة حقيقية',
            'لغة جسمك مهمة - اقعد بظهر مستقيم وكن واثق',
            'متقاطعش المُقابِل',
            'اسأل أسئلتك المحضرة في الآخر'
          ]
        },
        after: {
          title: 'بعد الإنترفيو',
          tips: [
            'ابعت إيميل شكر خلال 24 ساعة',
            'قيّم أدائك واكتب ملاحظات',
            'كن صبور في انتظار الرد',
            'متوقفش عن البحث عن فرص تانية',
            'لو متقبلتش، اطلب feedback عشان تتحسن'
          ]
        }
      }
    },
    en: {
      title: 'Interview Questions',
      subtitle: 'Your comprehensive guide to preparing for job interviews with confidence',
      tabs: {
        general: 'General Questions',
        behavioral: 'Behavioral Questions',
        technical: 'Technical Questions',
        tips: 'Important Tips'
      },
      generalQuestions: [
        {
          question: 'Tell me about yourself',
          answer: 'Focus on your professional journey, core skills, and key achievements. Start with your education, move to work experience, and how it aligns with the role. Keep it brief (2-3 minutes) and relevant to what the employer needs.',
          tips: [
            'Don\'t discuss personal life in detail',
            'Focus on relevant professional achievements',
            'Connect your experience to job requirements'
          ]
        },
        {
          question: 'What are your strengths?',
          answer: 'Choose 2-3 job-relevant strengths and support them with real examples. E.g., "I excel at solving complex problems. I helped my team reduce processing time by 30%"',
          tips: [
            'Choose strengths related to the job',
            'Provide specific, measurable examples',
            'Avoid generic clichés'
          ]
        },
        {
          question: 'What are your weaknesses?',
          answer: 'Choose a real but non-critical weakness and explain how you\'re improving. E.g., "I used to struggle with public speaking, but I took training courses and now present confidently"',
          tips: [
            'Be honest but strategic',
            'Show your improvement plan',
            'Don\'t mention core job requirements'
          ]
        },
        {
          question: 'Why do you want to work here?',
          answer: 'Research the company well and mention specific reasons: company culture, growth opportunities, innovative projects, or values that align with yours. Show genuine enthusiasm.',
          tips: [
            'Research the company beforehand',
            'Align your goals with company goals',
            'Avoid answers about salary only'
          ]
        },
        {
          question: 'Where do you see yourself in 5 years?',
          answer: 'Show ambition with realism, linking your goals to growth paths in the company. E.g., "I aspire to become a team leader in [field], contributing to developing new strategies"',
          tips: [
            'Be ambitious yet realistic',
            'Link goals to company opportunities',
            'Show long-term commitment'
          ]
        },
        {
          question: 'Why did you leave / want to leave your current job?',
          answer: 'Be positive and professional. Focus on seeking new growth opportunities, not negatives about your current job. E.g., "I\'m looking for new challenges and opportunities to develop my skills in [field]"',
          tips: [
            'Don\'t criticize your manager or company',
            'Focus on positives and future growth',
            'Be honest but diplomatic'
          ]
        },
        {
          question: 'What are your salary expectations?',
          answer: 'Research market average for the role. Provide a reasonable range based on your experience and skills. You can say: "Based on my research and experience, I expect a range between X and Y, but I\'m flexible depending on the full package"',
          tips: [
            'Research market salary averages',
            'Be flexible and ready to negotiate',
            'Consider benefits beyond salary'
          ]
        },
        {
          question: 'Do you have any questions for us?',
          answer: 'Always ask smart questions showing your interest. E.g., "What are the main challenges the team currently faces?" or "How do you measure success in this role?" or "What career development opportunities are available?"',
          tips: [
            'Prepare 3-5 smart questions beforehand',
            'Ask about team, culture, and challenges',
            'Avoid asking about vacation in first interview'
          ]
        }
      ],
      behavioralQuestions: [
        {
          question: 'Tell me about a challenging situation you faced and how you handled it',
          answer: 'Use the STAR method (Situation, Task, Action, Result): Describe the situation, required task, actions you took, and results achieved. Be specific and use measurable numbers when possible.',
          tips: [
            'Use STAR method in your answer',
            'Choose an example highlighting your skills',
            'Focus on positive results'
          ]
        },
        {
          question: 'Describe a situation where you worked in a team to achieve a common goal',
          answer: 'Talk about your role in the team, how you contributed, collaborated with others, and overcame challenges together. Show communication and teamwork skills.',
          tips: [
            'Highlight your role without diminishing others',
            'Show how you contributed to team success',
            'Mention tangible results'
          ]
        },
        {
          question: 'How do you handle pressure and tight deadlines?',
          answer: 'Show your ability to prioritize, manage time, and stay calm under pressure. Provide a real example where you delivered high-quality work despite time constraints.',
          tips: [
            'Show time management skills',
            'Explain how you maintain quality',
            'Mention tools or techniques you use'
          ]
        },
        {
          question: 'Tell me about a mistake you made and what you learned from it',
          answer: 'Be honest, choose a real but non-catastrophic mistake. Focus on what you learned and how you improved. Show maturity and self-development ability.',
          tips: [
            'Choose a real but non-severe mistake',
            'Focus on the lesson learned',
            'Show how you avoided repeating it'
          ]
        },
        {
          question: 'Describe a situation where you disagreed with a colleague or manager and how you resolved it',
          answer: 'Show professional maturity in handling conflicts. Explain how you listened, sought compromise, and maintained a positive professional relationship.',
          tips: [
            'Be diplomatic and professional',
            'Show communication and resolution skills',
            'Don\'t blame others'
          ]
        }
      ],
      technicalQuestions: [
        {
          question: 'What tools and technologies are you proficient in?',
          answer: 'Mention job-relevant tools and technologies. Classify by proficiency level (expert, advanced, intermediate). Provide examples of projects where you used them.',
          tips: [
            'Be honest about your expertise level',
            'Focus on job-required tools',
            'Be ready for technical questions about them'
          ]
        },
        {
          question: 'How do you stay updated with the latest developments in your field?',
          answer: 'Mention continuous learning sources: online courses, tech blogs, conferences, books, or personal projects. Show your passion for professional development.',
          tips: [
            'Mention specific sources you follow',
            'Show commitment to continuous learning',
            'Talk about the latest technology you learned'
          ]
        },
        {
          question: 'Tell me about a project you\'re proud of',
          answer: 'Choose a project showcasing your technical skills and problem-solving abilities. Explain challenges, technical solutions, and your role in success. Use metrics for results.',
          tips: [
            'Choose a job-relevant project',
            'Detail your role',
            'Mention challenges and how you overcame them'
          ]
        }
      ],
      importantTips: {
        before: {
          title: 'Before the Interview',
          tips: [
            'Research the company thoroughly (website, products, recent news)',
            'Review job requirements and prepare examples for each',
            'Prepare smart questions to ask the interviewer',
            'Prepare appropriate professional attire',
            'Confirm interview location and time (or online meeting link)',
            'Print copies of your resume'
          ]
        },
        during: {
          title: 'During the Interview',
          tips: [
            'Arrive early (10-15 minutes)',
            'Firm handshake and smile',
            'Maintain eye contact',
            'Listen carefully before answering',
            'Be specific and provide real examples',
            'Body language matters - sit straight and be confident',
            'Don\'t interrupt the interviewer',
            'Ask your prepared questions at the end'
          ]
        },
        after: {
          title: 'After the Interview',
          tips: [
            'Send a thank you email within 24 hours',
            'Evaluate your performance and take notes',
            'Be patient waiting for response',
            'Don\'t stop looking for other opportunities',
            'If not accepted, ask for feedback to improve'
          ]
        }
      }
    }
  };

  const t = content[language];

  return (
    <div className={`interview-questions-page ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      {/* Header */}
      <div className="iq-header">
        <h1 className="iq-title">{t.title}</h1>
        <p className="iq-subtitle">{t.subtitle}</p>
      </div>

      {/* Tabs */}
      <div className="iq-tabs">
        <button
          className={`iq-tab ${activeTab === 'general' ? 'active' : ''}`}
          onClick={() => setActiveTab('general')}
        >
          <Briefcase size={18} />
          {t.tabs.general}
        </button>
        <button
          className={`iq-tab ${activeTab === 'behavioral' ? 'active' : ''}`}
          onClick={() => setActiveTab('behavioral')}
        >
          <Users size={18} />
          {t.tabs.behavioral}
        </button>
        <button
          className={`iq-tab ${activeTab === 'technical' ? 'active' : ''}`}
          onClick={() => setActiveTab('technical')}
        >
          <Code size={18} />
          {t.tabs.technical}
        </button>
        <button
          className={`iq-tab ${activeTab === 'tips' ? 'active' : ''}`}
          onClick={() => setActiveTab('tips')}
        >
          <Lightbulb size={18} />
          {t.tabs.tips}
        </button>
      </div>

      {/* Content */}
      <div className="iq-content">
        {/* General Questions */}
        {activeTab === 'general' && (
          <div className="iq-questions">
            {t.generalQuestions.map((item, index) => (
              <div key={index} className="iq-question-card">
                <div
                  className="iq-question-header"
                  onClick={() => toggleQuestion(`general-${index}`)}
                >
                  <h3 className="iq-question-text">
                    <span className="iq-question-number">{index + 1}</span>
                    {item.question}
                  </h3>
                  <ChevronDown
                    className={`iq-chevron ${openQuestion === `general-${index}` ? 'rotate' : ''}`}
                    size={20}
                  />
                </div>
                {openQuestion === `general-${index}` && (
                  <div className="iq-question-body">
                    <div className="iq-answer">
                      <CheckCircle size={18} />
                      <p>{item.answer}</p>
                    </div>
                    <div className="iq-tips">
                      <h4>
                        <Lightbulb size={16} />
                        {language === 'ar' ? 'نصايح:' : 'Tips:'}
                      </h4>
                      <ul>
                        {item.tips.map((tip, i) => (
                          <li key={i}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Behavioral Questions */}
        {activeTab === 'behavioral' && (
          <div className="iq-questions">
            {t.behavioralQuestions.map((item, index) => (
              <div key={index} className="iq-question-card">
                <div
                  className="iq-question-header"
                  onClick={() => toggleQuestion(`behavioral-${index}`)}
                >
                  <h3 className="iq-question-text">
                    <span className="iq-question-number">{index + 1}</span>
                    {item.question}
                  </h3>
                  <ChevronDown
                    className={`iq-chevron ${openQuestion === `behavioral-${index}` ? 'rotate' : ''}`}
                    size={20}
                  />
                </div>
                {openQuestion === `behavioral-${index}` && (
                  <div className="iq-question-body">
                    <div className="iq-answer">
                      <CheckCircle size={18} />
                      <p>{item.answer}</p>
                    </div>
                    <div className="iq-tips">
                      <h4>
                        <Lightbulb size={16} />
                        {language === 'ar' ? 'نصايح:' : 'Tips:'}
                      </h4>
                      <ul>
                        {item.tips.map((tip, i) => (
                          <li key={i}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Technical Questions */}
        {activeTab === 'technical' && (
          <div className="iq-questions">
            {t.technicalQuestions.map((item, index) => (
              <div key={index} className="iq-question-card">
                <div
                  className="iq-question-header"
                  onClick={() => toggleQuestion(`technical-${index}`)}
                >
                  <h3 className="iq-question-text">
                    <span className="iq-question-number">{index + 1}</span>
                    {item.question}
                  </h3>
                  <ChevronDown
                    className={`iq-chevron ${openQuestion === `technical-${index}` ? 'rotate' : ''}`}
                    size={20}
                  />
                </div>
                {openQuestion === `technical-${index}` && (
                  <div className="iq-question-body">
                    <div className="iq-answer">
                      <CheckCircle size={18} />
                      <p>{item.answer}</p>
                    </div>
                    <div className="iq-tips">
                      <h4>
                        <Lightbulb size={16} />
                        {language === 'ar' ? 'نصايح:' : 'Tips:'}
                      </h4>
                      <ul>
                        {item.tips.map((tip, i) => (
                          <li key={i}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Important Tips */}
        {activeTab === 'tips' && (
          <div className="iq-tips-section">
            <div className="iq-tips-card">
              <div className="iq-tips-header">
                <AlertCircle size={20} />
                <h3>{t.importantTips.before.title}</h3>
              </div>
              <ul className="iq-tips-list">
                {t.importantTips.before.tips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>

            <div className="iq-tips-card">
              <div className="iq-tips-header">
                <CheckCircle size={20} />
                <h3>{t.importantTips.during.title}</h3>
              </div>
              <ul className="iq-tips-list">
                {t.importantTips.during.tips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>

            <div className="iq-tips-card">
              <div className="iq-tips-header">
                <Lightbulb size={20} />
                <h3>{t.importantTips.after.title}</h3>
              </div>
              <ul className="iq-tips-list">
                {t.importantTips.after.tips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewQuestions;