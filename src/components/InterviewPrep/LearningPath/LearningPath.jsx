import React, { useState, useEffect } from 'react';
import anime from 'animejs';
import './LearningPath.css';

const LearningPath = ({ userProgress, updateProgress }) => {
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [completedLessons, setCompletedLessons] = useState(userProgress.completedLessons || []);

  const lessons = [
    {
      id: 'interview-basics',
      title: 'Interview Basics',
      icon: '📋',
      duration: '10 min',
      difficulty: 'Beginner',
      description: 'Understanding different interview formats and what to expect',
      content: {
        overview: 'Learn the fundamentals of job interviews and set yourself up for success.',
        sections: [
          {
            title: 'Types of Interviews',
            content: `
              <h3>Common Interview Formats:</h3>
              <ul>
                <li><strong>Phone/Video Screening:</strong> Initial 15-30 minute conversation</li>
                <li><strong>One-on-One:</strong> Traditional face-to-face interview</li>
                <li><strong>Panel Interview:</strong> Multiple interviewers at once</li>
                <li><strong>Group Interview:</strong> Multiple candidates together</li>
                <li><strong>Technical Interview:</strong> Skills-based assessment</li>
                <li><strong>Behavioral Interview:</strong> Past experience focused</li>
              </ul>
            `
          },
          {
            title: 'Interview Timeline',
            content: `
              <h3>Typical Interview Process:</h3>
              <div class="timeline">
                <div class="timeline-item">
                  <strong>Application Review</strong> - 1-2 weeks
                </div>
                <div class="timeline-item">
                  <strong>Phone/Video Screening</strong> - 30 minutes
                </div>
                <div class="timeline-item">
                  <strong>First Round Interview</strong> - 1 hour
                </div>
                <div class="timeline-item">
                  <strong>Final Round/Panel</strong> - 2-3 hours
                </div>
                <div class="timeline-item">
                  <strong>Decision & Offer</strong> - 1-2 weeks
                </div>
              </div>
            `
          }
        ]
      }
    },
    {
      id: 'professional-appearance',
      title: 'Professional Appearance',
      icon: '👔',
      duration: '8 min',
      difficulty: 'Beginner',
      description: 'Dress codes, grooming, and making a great first impression',
      content: {
        overview: 'Your appearance speaks before you do. Learn how to dress for success.',
        sections: [
          {
            title: 'Dress Codes by Industry',
            content: `
              <h3>Industry-Specific Guidelines:</h3>
              <div class="dress-code-grid">
                <div class="dress-code-item">
                  <h4>Corporate/Finance</h4>
                  <p>Conservative business formal - suits, ties, minimal jewelry</p>
                </div>
                <div class="dress-code-item">
                  <h4>Tech/Startups</h4>
                  <p>Business casual to smart casual - clean, well-fitted clothes</p>
                </div>
                <div class="dress-code-item">
                  <h4>Creative Industries</h4>
                  <p>Express personality while staying professional</p>
                </div>
                <div class="dress-code-item">
                  <h4>Healthcare</h4>
                  <p>Clean, conservative, comfortable for movement</p>
                </div>
              </div>
            `
          },
          {
            title: 'Grooming Essentials',
            content: `
              <h3>Professional Grooming Checklist:</h3>
              <ul>
                <li>Clean, styled hair</li>
                <li>Fresh breath and good oral hygiene</li>
                <li>Trimmed, clean nails</li>
                <li>Minimal, professional fragrance</li>
                <li>Well-fitted, wrinkle-free clothes</li>
                <li>Polished shoes</li>
                <li>Subtle makeup (if applicable)</li>
              </ul>
            `
          }
        ]
      }
    },
    {
      id: 'communication-skills',
      title: 'Communication Excellence',
      icon: '🗣️',
      duration: '15 min',
      difficulty: 'Intermediate',
      description: 'Verbal and non-verbal communication techniques',
      content: {
        overview: 'Master the art of professional communication in interviews.',
        sections: [
          {
            title: 'Verbal Communication',
            content: `
              <h3>Speaking Effectively:</h3>
              <ul>
                <li><strong>Pace:</strong> Speak slowly and clearly (120-150 words per minute)</li>
                <li><strong>Volume:</strong> Project confidence without shouting</li>
                <li><strong>Tone:</strong> Enthusiastic but professional</li>
                <li><strong>Articulation:</strong> Pronounce words clearly</li>
                <li><strong>Pausing:</strong> Use strategic pauses instead of filler words</li>
              </ul>
              
              <h3>Common Filler Words to Avoid:</h3>
              <div class="filler-words">
                <span class="filler-word">Um</span>
                <span class="filler-word">Uh</span>
                <span class="filler-word">Like</span>
                <span class="filler-word">You know</span>
                <span class="filler-word">So</span>
                <span class="filler-word">Actually</span>
              </div>
            `
          },
          {
            title: 'Body Language',
            content: `
              <h3>Non-Verbal Communication:</h3>
              <div class="body-language-tips">
                <div class="tip-item">
                  <strong>Eye Contact:</strong> Maintain 50-70% eye contact
                </div>
                <div class="tip-item">
                  <strong>Posture:</strong> Sit up straight, lean slightly forward
                </div>
                <div class="tip-item">
                  <strong>Handshake:</strong> Firm, confident, 2-3 seconds
                </div>
                <div class="tip-item">
                  <strong>Gestures:</strong> Natural hand movements, avoid fidgeting
                </div>
                <div class="tip-item">
                  <strong>Facial Expression:</strong> Genuine smile, engaged expression
                </div>
              </div>
            `
          }
        ]
      }
    },
    {
      id: 'mindset-preparation',
      title: 'Mindset & Confidence',
      icon: '🧠',
      duration: '12 min',
      difficulty: 'Intermediate',
      description: 'Mental preparation, confidence building, and managing anxiety',
      content: {
        overview: 'Develop the right mindset and confidence for interview success.',
        sections: [
          {
            title: 'Pre-Interview Preparation',
            content: `
              <h3>Mental Preparation Strategies:</h3>
              <ul>
                <li><strong>Research:</strong> Know the company, role, and interviewer</li>
                <li><strong>Practice:</strong> Rehearse common questions and your stories</li>
                <li><strong>Visualization:</strong> Imagine successful interview scenarios</li>
                <li><strong>Positive Affirmations:</strong> Build confidence with self-talk</li>
                <li><strong>Mock Interviews:</strong> Practice with friends or AI</li>
              </ul>
            `
          },
          {
            title: 'Managing Interview Anxiety',
            content: `
              <h3>Anxiety Management Techniques:</h3>
              <div class="anxiety-techniques">
                <div class="technique">
                  <h4>Breathing Exercise</h4>
                  <p>4-7-8 technique: Inhale for 4, hold for 7, exhale for 8</p>
                </div>
                <div class="technique">
                  <h4>Progressive Relaxation</h4>
                  <p>Tense and release muscle groups from toes to head</p>
                </div>
                <div class="technique">
                  <h4>Reframe Thoughts</h4>
                  <p>Turn "I'm nervous" into "I'm excited and prepared"</p>
                </div>
                <div class="technique">
                  <h4>Power Posing</h4>
                  <p>Stand confidently for 2 minutes before the interview</p>
                </div>
              </div>
            `
          }
        ]
      }
    },
    {
      id: 'star-method',
      title: 'STAR Method Mastery',
      icon: '⭐',
      duration: '20 min',
      difficulty: 'Advanced',
      description: 'Structure compelling answers using the STAR framework',
      content: {
        overview: 'Learn to craft compelling behavioral interview answers using the STAR method.',
        sections: [
          {
            title: 'Understanding STAR',
            content: `
              <h3>STAR Framework:</h3>
              <div class="star-framework">
                <div class="star-item">
                  <div class="star-letter">S</div>
                  <div class="star-content">
                    <h4>Situation</h4>
                    <p>Set the context and background</p>
                  </div>
                </div>
                <div class="star-item">
                  <div class="star-letter">T</div>
                  <div class="star-content">
                    <h4>Task</h4>
                    <p>Describe your responsibility or challenge</p>
                  </div>
                </div>
                <div class="star-item">
                  <div class="star-letter">A</div>
                  <div class="star-content">
                    <h4>Action</h4>
                    <p>Explain the specific steps you took</p>
                  </div>
                </div>
                <div class="star-item">
                  <div class="star-letter">R</div>
                  <div class="star-content">
                    <h4>Result</h4>
                    <p>Share the outcome and what you learned</p>
                  </div>
                </div>
              </div>
            `
          },
          {
            title: 'STAR Examples',
            content: `
              <h3>Sample STAR Answer:</h3>
              <div class="star-example">
                <p><strong>Question:</strong> "Tell me about a time you had to work under pressure."</p>
                
                <div class="star-answer">
                  <p><strong>Situation:</strong> "During my internship at XYZ Company, our team was tasked with delivering a critical client presentation, but our lead designer fell ill two days before the deadline."</p>
                  
                  <p><strong>Task:</strong> "As the junior team member, I needed to step up and complete the visual design work while ensuring we met our client's expectations."</p>
                  
                  <p><strong>Action:</strong> "I worked with the designer remotely to understand her vision, put in extra hours to learn the design software, and collaborated closely with the account manager to ensure brand consistency."</p>
                  
                  <p><strong>Result:</strong> "We delivered the presentation on time, the client was impressed with the design quality, and we secured a $50K contract extension. I also gained valuable design skills that I continue to use."</p>
                </div>
              </div>
            `
          }
        ]
      }
    },
    {
      id: 'salary-negotiation',
      title: 'Salary Negotiation',
      icon: '💰',
      duration: '18 min',
      difficulty: 'Advanced',
      description: 'Navigate salary discussions and negotiate effectively',
      content: {
        overview: 'Learn to negotiate salary and benefits with confidence and professionalism.',
        sections: [
          {
            title: 'Research & Preparation',
            content: `
              <h3>Before You Negotiate:</h3>
              <ul>
                <li><strong>Market Research:</strong> Use Glassdoor, PayScale, LinkedIn Salary Insights</li>
                <li><strong>Know Your Worth:</strong> Calculate your value based on skills and experience</li>
                <li><strong>Total Compensation:</strong> Consider benefits, PTO, flexibility, growth opportunities</li>
                <li><strong>Timing:</strong> Wait for an offer before discussing salary</li>
              </ul>
              
              <h3>Salary Research Tools:</h3>
              <div class="salary-tools">
                <div class="tool">Glassdoor</div>
                <div class="tool">PayScale</div>
                <div class="tool">LinkedIn Salary</div>
                <div class="tool">Levels.fyi (Tech)</div>
                <div class="tool">Robert Half Salary Guide</div>
              </div>
            `
          },
          {
            title: 'Negotiation Strategies',
            content: `
              <h3>Effective Negotiation Tactics:</h3>
              <div class="negotiation-strategies">
                <div class="strategy">
                  <h4>Anchor High</h4>
                  <p>Start with a number slightly above your target</p>
                </div>
                <div class="strategy">
                  <h4>Focus on Value</h4>
                  <p>Emphasize what you bring to the role</p>
                </div>
                <div class="strategy">
                  <h4>Be Flexible</h4>
                  <p>Consider non-salary benefits and perks</p>
                </div>
                <div class="strategy">
                  <h4>Stay Professional</h4>
                  <p>Maintain positive, collaborative tone</p>
                </div>
              </div>
              
              <h3>Sample Negotiation Scripts:</h3>
              <div class="script-example">
                <p><strong>Initial Response:</strong> "I'm excited about this opportunity. Based on my research and experience, I was expecting something in the range of $X to $Y. Can we discuss how we might bridge that gap?"</p>
              </div>
            `
          }
        ]
      }
    }
  ];

  useEffect(() => {
    // Animate lesson cards on mount
    anime({
      targets: '.lesson-card',
      opacity: [0, 1],
      translateY: [30, 0],
      delay: anime.stagger(100),
      duration: 600,
      easing: 'easeOutQuart'
    });
  }, []);

  const openLesson = (lesson) => {
    setSelectedLesson(lesson);
    
    // Animate lesson modal
    anime({
      targets: '.lesson-modal',
      opacity: [0, 1],
      scale: [0.9, 1],
      duration: 400,
      easing: 'easeOutQuart'
    });
  };

  const closeLesson = () => {
    anime({
      targets: '.lesson-modal',
      opacity: [1, 0],
      scale: [1, 0.9],
      duration: 300,
      easing: 'easeInQuart',
      complete: () => setSelectedLesson(null)
    });
  };

  const completeLesson = (lessonId) => {
    if (!completedLessons.includes(lessonId)) {
      const newCompleted = [...completedLessons, lessonId];
      setCompletedLessons(newCompleted);
      updateProgress({ completedLessons: newCompleted });
      
      // Animate completion
      anime({
        targets: `.lesson-card[data-lesson-id="${lessonId}"] .completion-badge`,
        scale: [0, 1],
        rotate: [0, 360],
        duration: 600,
        easing: 'easeOutBack'
      });
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return '#27ae60';
      case 'Intermediate': return '#f39c12';
      case 'Advanced': return '#e74c3c';
      default: return '#3498db';
    }
  };

  return (
    <div className="learning-path">
      <div className="learning-path-header">
        <h2>📚 Step-by-Step Learning Path</h2>
        <p>Master interview skills from basics to advanced techniques</p>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${(completedLessons.length / lessons.length) * 100}%` }}
          ></div>
        </div>
        <span className="progress-text">
          {completedLessons.length} of {lessons.length} lessons completed
        </span>
      </div>

      <div className="lessons-grid">
        {lessons.map((lesson, index) => (
          <div 
            key={lesson.id} 
            className={`lesson-card ${completedLessons.includes(lesson.id) ? 'completed' : ''}`}
            data-lesson-id={lesson.id}
            onClick={() => openLesson(lesson)}
          >
            <div className="lesson-number">{index + 1}</div>
            <div className="lesson-icon">{lesson.icon}</div>
            <div className="lesson-content">
              <h3>{lesson.title}</h3>
              <p>{lesson.description}</p>
              <div className="lesson-meta">
                <span className="duration">⏱️ {lesson.duration}</span>
                <span 
                  className="difficulty" 
                  style={{ color: getDifficultyColor(lesson.difficulty) }}
                >
                  {lesson.difficulty}
                </span>
              </div>
            </div>
            {completedLessons.includes(lesson.id) && (
              <div className="completion-badge">✅</div>
            )}
          </div>
        ))}
      </div>

      {selectedLesson && (
        <div className="lesson-modal-overlay" onClick={closeLesson}>
          <div className="lesson-modal" onClick={(e) => e.stopPropagation()}>
            <div className="lesson-modal-header">
              <div className="lesson-modal-title">
                <span className="lesson-modal-icon">{selectedLesson.icon}</span>
                <h2>{selectedLesson.title}</h2>
              </div>
              <button className="close-button" onClick={closeLesson}>×</button>
            </div>
            
            <div className="lesson-modal-content">
              <div className="lesson-overview">
                <p>{selectedLesson.content.overview}</p>
              </div>
              
              {selectedLesson.content.sections.map((section, index) => (
                <div key={index} className="lesson-section">
                  <h3>{section.title}</h3>
                  <div 
                    className="section-content" 
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                </div>
              ))}
              
              <div className="lesson-actions">
                {!completedLessons.includes(selectedLesson.id) ? (
                  <button 
                    className="complete-lesson-btn"
                    onClick={() => completeLesson(selectedLesson.id)}
                  >
                    ✅ Mark as Complete
                  </button>
                ) : (
                  <div className="lesson-completed">
                    <span>✅ Lesson Completed!</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearningPath;
