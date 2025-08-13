export const interviewQuestions = [
  // Behavioral Questions
  {
    id: 1,
    category: 'behavioral',
    difficulty: 'Medium',
    type: 'STAR Method',
    question: 'Tell me about a time when you had to work under pressure.',
    tags: ['pressure', 'stress management', 'deadlines', 'performance'],
    modelAnswer: `I'd like to share an experience from my previous role as a project coordinator. 

**Situation:** Our team was working on a critical client presentation for a $500K contract, and just two days before the deadline, our lead designer fell ill with the flu and couldn't complete the visual components.

**Task:** As the project coordinator, I needed to ensure we delivered a high-quality presentation on time while maintaining our professional standards and team morale.

**Action:** I immediately assessed what needed to be done and took several steps: First, I contacted the designer to understand exactly what remained and got access to all the files. Then I reached out to a freelance designer we'd worked with before and negotiated an expedited timeline. I also reorganized our team's schedule, taking on additional research tasks myself so others could focus on content review. I maintained constant communication with the client about our progress without revealing the internal challenge.

**Result:** We delivered the presentation on time, and it was well-received by the client. We secured the contract, and the client specifically praised the visual design quality. This experience taught me the importance of having backup plans and maintaining calm leadership during crises.`,
    tips: [
      'Use the STAR method to structure your response',
      'Choose a specific, relevant example that shows problem-solving skills',
      'Focus on your actions and decision-making process',
      'Quantify the results when possible',
      'Show what you learned from the experience'
    ],
    followUp: [
      'How do you typically handle stress in the workplace?',
      'What strategies do you use to prioritize tasks under pressure?',
      'How do you maintain quality when working with tight deadlines?'
    ]
  },
  {
    id: 2,
    category: 'behavioral',
    difficulty: 'Medium',
    type: 'STAR Method',
    question: 'Describe a situation where you had to work with a difficult team member.',
    tags: ['teamwork', 'conflict resolution', 'communication', 'collaboration'],
    modelAnswer: `I'll share an experience from when I was working on a software development project.

**Situation:** I was part of a 5-person development team, and one team member consistently missed deadlines, didn't communicate progress, and seemed resistant to feedback during our sprint reviews.

**Task:** As a senior team member, I needed to address this situation to ensure our project stayed on track and maintain team cohesion without escalating to management immediately.

**Action:** I first approached the team member privately for a one-on-one conversation to understand if there were underlying issues. I discovered they were struggling with some of the newer technologies we were using but felt embarrassed to ask for help. I offered to pair program with them on challenging tasks and suggested they attend some online training sessions. I also worked with them to break down their tasks into smaller, more manageable pieces and established daily check-ins.

**Result:** Within two weeks, their performance improved significantly. They became more communicative, started meeting deadlines, and even began contributing valuable ideas during team meetings. Our project was completed on time, and the team member later thanked me for the support. This experience reinforced the importance of addressing issues directly but compassionately.`,
    tips: [
      'Show empathy and understanding rather than just criticism',
      'Demonstrate your conflict resolution and leadership skills',
      'Focus on finding solutions rather than dwelling on problems',
      'Highlight the positive outcome for both the individual and team',
      'Show that you can handle difficult situations professionally'
    ],
    followUp: [
      'How do you handle disagreements with colleagues?',
      'What\'s your approach to giving constructive feedback?',
      'How do you build trust with team members?'
    ]
  },
  {
    id: 3,
    category: 'behavioral',
    difficulty: 'Hard',
    type: 'STAR Method',
    question: 'Tell me about a time you failed at something.',
    tags: ['failure', 'learning', 'resilience', 'growth mindset'],
    modelAnswer: `I'll share a challenging experience from early in my career that taught me valuable lessons.

**Situation:** In my first marketing role, I was tasked with launching a social media campaign for a new product. I was excited to prove myself and took on the entire project independently.

**Task:** I needed to create a comprehensive social media strategy, develop content, and execute the campaign across multiple platforms to drive awareness and sales for the product launch.

**Action:** I dove in enthusiastically, creating what I thought was engaging content and posting across all platforms. However, I made several critical mistakes: I didn't research our target audience thoroughly, failed to A/B test content, and didn't set up proper tracking mechanisms. I also didn't seek input from more experienced team members because I wanted to show I could handle it alone.

**Result:** The campaign performed poorly - engagement was low, and we saw minimal impact on sales. I had to present these disappointing results to leadership. However, I took full responsibility, analyzed what went wrong, and presented a detailed plan for improvement. My manager appreciated my honesty and accountability. I then worked with the team to relaunch the campaign with proper research, testing, and collaboration, which resulted in a 300% improvement in engagement and exceeded our sales targets.

This failure taught me the importance of collaboration, thorough research, and the value of asking for guidance when needed.`,
    tips: [
      'Choose a real failure, not a disguised strength',
      'Take full responsibility without making excuses',
      'Focus heavily on what you learned and how you improved',
      'Show how the failure led to better practices or results later',
      'Demonstrate resilience and growth mindset'
    ],
    followUp: [
      'How do you handle criticism?',
      'What do you do when you make a mistake?',
      'How has failure shaped your approach to work?'
    ]
  },
  {
    id: 4,
    category: 'behavioral',
    difficulty: 'Medium',
    type: 'STAR Method',
    question: 'Give me an example of when you showed leadership.',
    tags: ['leadership', 'initiative', 'team management', 'decision making'],
    modelAnswer: `I'd like to share an experience where I stepped up to lead during a challenging situation.

**Situation:** During my time as a senior analyst, our department was undergoing a major system migration, and the project manager unexpectedly left the company mid-project. The team was confused, deadlines were approaching, and morale was low.

**Task:** Although I wasn't officially assigned as the replacement, I recognized that someone needed to step up to keep the project moving and maintain team confidence.

**Action:** I called an immediate team meeting to assess where we stood and what needed to be done. I created a detailed project timeline, redistributed tasks based on each team member's strengths, and established daily stand-up meetings to track progress. I also took on the responsibility of communicating with stakeholders and upper management about our status. When team members faced technical challenges, I either helped solve them or connected them with the right resources. I made sure to recognize everyone's contributions and kept the team motivated during long hours.

**Result:** We completed the system migration on time and within budget. The transition was smooth, with minimal disruption to daily operations. Upper management was impressed with how I handled the situation, and I was promoted to team lead six months later. Most importantly, the team remained cohesive and several members mentioned that the experience increased their confidence in handling future challenges.`,
    tips: [
      'Show initiative rather than waiting to be asked',
      'Demonstrate multiple leadership qualities (communication, delegation, problem-solving)',
      'Include how you motivated and supported others',
      'Quantify the results and impact',
      'Show recognition from others validates your leadership'
    ],
    followUp: [
      'What\'s your leadership style?',
      'How do you motivate team members?',
      'How do you handle disagreements within your team?'
    ]
  },

  // Technical Questions
  {
    id: 5,
    category: 'technical',
    difficulty: 'Medium',
    type: 'Problem Solving',
    question: 'How would you approach learning a new technology or programming language?',
    tags: ['learning', 'adaptability', 'technology', 'self-development'],
    modelAnswer: `My approach to learning new technologies is systematic and hands-on:

**1. Foundation Building:** I start by understanding the fundamentals - what problem the technology solves, its core concepts, and how it fits into the broader ecosystem. I usually begin with official documentation and reputable online courses.

**2. Hands-on Practice:** I believe in learning by doing, so I create small projects or follow tutorials to get practical experience. For example, when learning React, I built a personal portfolio website to understand components, state management, and hooks.

**3. Community Engagement:** I join relevant communities (Stack Overflow, Reddit, Discord servers) to learn from others' experiences and stay updated on best practices and common pitfalls.

**4. Real-world Application:** I look for opportunities to apply the new technology in my current role or side projects. This helps solidify my understanding and demonstrates the value to my team.

**5. Continuous Learning:** I set aside regular time for learning - usually 30 minutes daily - and track my progress. I also follow industry blogs and attend webinars or conferences when possible.

**6. Teaching Others:** Once I'm comfortable, I share my knowledge through documentation, team presentations, or mentoring colleagues. Teaching helps reinforce my own understanding.

This approach helped me successfully transition from Java to Python in my previous role, where I became the go-to person for Python-related questions within three months.`,
    tips: [
      'Show a structured, methodical approach to learning',
      'Emphasize hands-on practice and real-world application',
      'Mention community involvement and continuous learning',
      'Give a specific example of successfully learning something new',
      'Show how you share knowledge with others'
    ],
    followUp: [
      'What\'s the most challenging technology you\'ve had to learn?',
      'How do you stay current with technology trends?',
      'How do you balance learning new technologies with your current responsibilities?'
    ]
  },
  {
    id: 6,
    category: 'technical',
    difficulty: 'Hard',
    type: 'Problem Solving',
    question: 'Describe your approach to debugging a complex technical issue.',
    tags: ['debugging', 'problem solving', 'analytical thinking', 'troubleshooting'],
    modelAnswer: `My debugging approach is systematic and methodical:

**1. Reproduce the Issue:** First, I try to consistently reproduce the problem. I document the exact steps, environment conditions, and inputs that trigger the issue. If I can't reproduce it, I gather as much information as possible from users or logs.

**2. Gather Information:** I collect all relevant data - error messages, logs, stack traces, system metrics, and user reports. I also check recent changes in code, configuration, or environment that might be related.

**3. Form Hypotheses:** Based on the information gathered, I develop theories about what might be causing the issue. I prioritize these based on likelihood and impact.

**4. Isolate the Problem:** I use techniques like binary search, commenting out code sections, or using debugging tools to narrow down the source. I often create minimal test cases that demonstrate the issue.

**5. Test Systematically:** I test each hypothesis methodically, changing one variable at a time. I document what I try and the results to avoid repeating unsuccessful approaches.

**6. Use the Right Tools:** Depending on the issue, I leverage debuggers, profilers, network analyzers, or logging frameworks. For example, I once used a memory profiler to identify a memory leak that was causing intermittent crashes.

**7. Collaborate When Needed:** If I'm stuck, I don't hesitate to ask colleagues for fresh perspectives or consult documentation and community resources.

**8. Document the Solution:** Once resolved, I document the root cause, solution, and prevention strategies for future reference.

This approach helped me resolve a critical production issue where API response times were intermittently spiking, which turned out to be caused by a database connection pool exhaustion during peak traffic.`,
    tips: [
      'Show a logical, step-by-step approach',
      'Emphasize the importance of reproducing and documenting issues',
      'Mention specific tools and techniques you use',
      'Include collaboration and knowledge sharing',
      'Give a concrete example of successful debugging'
    ],
    followUp: [
      'What\'s the most challenging bug you\'ve ever fixed?',
      'How do you prevent bugs in your code?',
      'What debugging tools do you prefer and why?'
    ]
  },

  // Situational Questions
  {
    id: 7,
    category: 'situational',
    difficulty: 'Medium',
    type: 'Hypothetical',
    question: 'How would you handle a situation where you disagree with your manager\'s decision?',
    tags: ['conflict resolution', 'communication', 'professionalism', 'hierarchy'],
    modelAnswer: `I believe healthy disagreement can lead to better outcomes when handled professionally:

**1. Understand the Decision:** First, I'd make sure I fully understand my manager's reasoning. I'd ask clarifying questions to ensure I'm not missing important context or constraints they're considering.

**2. Prepare My Perspective:** I'd organize my thoughts and gather supporting data or examples. I'd focus on the business impact and potential alternatives rather than personal preferences.

**3. Choose the Right Time and Setting:** I'd request a private meeting when my manager has time to discuss the matter thoroughly, rather than bringing it up in public or during stressful moments.

**4. Present Respectfully:** I'd express my concerns professionally, using phrases like "I'd like to share a different perspective" or "Have we considered..." I'd focus on the issue, not personalities.

**5. Listen Actively:** I'd be open to hearing additional information that might change my view. Sometimes managers have access to information or constraints that aren't immediately apparent.

**6. Find Common Ground:** I'd look for areas where we agree and build from there, focusing on shared goals and objectives.

**7. Accept the Final Decision:** If my manager maintains their position after our discussion, I'd support the decision fully. My job is to provide input, but ultimately respect the hierarchy and decision-making authority.

**8. Follow Up:** I'd monitor the outcomes and be prepared to provide support or adjustments if needed, while being careful not to say "I told you so" if issues arise.

The key is maintaining trust and professionalism while ensuring important perspectives are heard.`,
    tips: [
      'Show respect for hierarchy while demonstrating critical thinking',
      'Emphasize professional communication and timing',
      'Focus on business impact rather than personal opinions',
      'Show willingness to accept decisions even when you disagree',
      'Demonstrate emotional intelligence and maturity'
    ],
    followUp: [
      'How do you handle feedback from your manager?',
      'Describe a time when you had to implement a decision you disagreed with',
      'How do you build trust with your supervisor?'
    ]
  },
  {
    id: 8,
    category: 'situational',
    difficulty: 'Hard',
    type: 'Hypothetical',
    question: 'What would you do if you discovered a colleague was taking credit for your work?',
    tags: ['workplace ethics', 'conflict resolution', 'professionalism', 'integrity'],
    modelAnswer: `This is a delicate situation that requires careful handling to maintain professionalism while protecting my interests:

**1. Document Everything:** I'd immediately gather evidence of my contributions - emails, drafts, timestamps, meeting notes, or any other documentation that proves my involvement in the work.

**2. Self-Reflection:** I'd consider whether this might be a misunderstanding. Perhaps there was unclear communication about roles and responsibilities, or the colleague genuinely believes they contributed more than they did.

**3. Direct Conversation:** I'd approach the colleague privately first, giving them the benefit of the doubt. I'd say something like, "I noticed in the presentation that the XYZ project was attributed differently than I understood. Can we discuss how we should represent our respective contributions?"

**4. Seek Clarification:** If the direct approach doesn't resolve the issue, I'd speak with my manager to clarify roles and contributions. I'd present this as seeking guidance rather than making accusations: "I want to make sure I'm accurately representing everyone's contributions on the XYZ project."

**5. Focus on Future Prevention:** I'd establish clearer communication about roles and recognition for future projects. This might include documenting contributions in project plans or regular status updates.

**6. Maintain Professionalism:** Throughout the process, I'd avoid gossiping with other colleagues or letting emotions drive my actions. I'd focus on facts and professional resolution.

**7. Learn from the Experience:** I'd use this as an opportunity to be more proactive about documenting my contributions and ensuring clear communication about roles from the start of projects.

The goal is to resolve the situation while maintaining working relationships and professional integrity.`,
    tips: [
      'Show you can handle conflict professionally and diplomatically',
      'Emphasize documentation and evidence-based approaches',
      'Demonstrate emotional intelligence by considering multiple perspectives',
      'Focus on resolution and prevention rather than punishment',
      'Show you can maintain professionalism under difficult circumstances'
    ],
    followUp: [
      'How do you handle workplace conflicts?',
      'What would you do if you made a mistake that affected a colleague?',
      'How do you ensure you get proper recognition for your work?'
    ]
  },

  // Personal Questions
  {
    id: 9,
    category: 'personal',
    difficulty: 'Easy',
    type: 'Self-Assessment',
    question: 'What are your greatest strengths?',
    tags: ['strengths', 'self-awareness', 'skills', 'value proposition'],
    modelAnswer: `I'd highlight three key strengths that I believe make me effective in my work:

**1. Analytical Problem-Solving:** I excel at breaking down complex problems into manageable components and finding systematic solutions. For example, when our team faced declining user engagement, I analyzed user behavior data, identified three key friction points, and developed targeted solutions that increased engagement by 40% over three months.

**2. Collaborative Communication:** I'm skilled at working with diverse teams and translating technical concepts for different audiences. In my previous role, I regularly facilitated meetings between technical and business teams, helping bridge communication gaps and ensuring everyone was aligned on project goals and timelines.

**3. Adaptability and Continuous Learning:** I thrive in changing environments and actively seek opportunities to grow. When our company adopted new project management methodologies, I not only learned the new systems quickly but also became a resource for training other team members, ultimately helping our department transition smoothly.

What I particularly value about these strengths is how they complement each other - my analytical skills help me identify problems, my communication abilities help me collaborate on solutions, and my adaptability ensures I can handle whatever challenges arise.

I'm always working to develop these strengths further and find new ways to apply them to create value for my team and organization.`,
    tips: [
      'Choose 2-3 specific strengths relevant to the role',
      'Provide concrete examples that demonstrate each strength',
      'Show how your strengths create value for employers',
      'Connect your strengths to the job requirements',
      'Demonstrate self-awareness and ongoing development'
    ],
    followUp: [
      'How do you leverage these strengths in team settings?',
      'Which of these strengths do you want to develop further?',
      'How do your strengths complement your colleagues?'
    ]
  },
  {
    id: 10,
    category: 'personal',
    difficulty: 'Medium',
    type: 'Self-Assessment',
    question: 'What is your biggest weakness?',
    tags: ['weaknesses', 'self-improvement', 'growth', 'honesty'],
    modelAnswer: `I'd say my biggest weakness has been my tendency toward perfectionism, particularly when it comes to delivering presentations or written reports.

In the past, I would spend excessive time refining details that, while important to me, didn't significantly impact the overall quality or outcome. This sometimes led to missed deadlines or delayed deliverables, which affected not just my work but also my team's timeline.

**How I'm addressing it:** I've developed several strategies to manage this:

**1. Time-boxing:** I now set specific time limits for different phases of work and stick to them. For example, I'll allocate 2 hours for initial draft, 1 hour for revisions, and 30 minutes for final polish.

**2. Seeking feedback early:** Instead of perfecting work in isolation, I share drafts with colleagues or supervisors earlier in the process to get input on what level of detail is actually needed.

**3. Prioritizing impact:** I've learned to identify which elements truly matter for the audience and focus my perfectionist tendencies on those high-impact areas.

**4. Setting "good enough" standards:** I've developed criteria for when work meets the necessary quality threshold, even if it's not perfect by my personal standards.

This approach has helped me become more efficient while still maintaining high quality standards. In my last role, I improved my project delivery time by 30% while maintaining the same quality ratings from stakeholders.

I continue to work on this balance because I believe my attention to detail is valuable, but it needs to be applied strategically.`,
    tips: [
      'Choose a real weakness, not a strength in disguise',
      'Show specific steps you\'re taking to improve',
      'Demonstrate self-awareness and growth mindset',
      'Provide evidence of improvement or progress',
      'Connect the weakness to something that could be valuable if managed well'
    ],
    followUp: [
      'How do you handle feedback about areas for improvement?',
      'What other areas are you working to develop?',
      'How do you balance quality with efficiency?'
    ]
  },

  // Company-Specific Questions
  {
    id: 11,
    category: 'company',
    difficulty: 'Medium',
    type: 'Research-Based',
    question: 'Why do you want to work for our company?',
    tags: ['company research', 'motivation', 'cultural fit', 'career goals'],
    modelAnswer: `I'm excited about this opportunity for several specific reasons:

**1. Mission Alignment:** Your company's commitment to [specific company mission/values] really resonates with me. I've followed your recent initiatives in [specific area], and I'm impressed by how you're [specific example of company impact]. This aligns perfectly with my personal values and career goals.

**2. Innovation and Growth:** I'm particularly drawn to your company's reputation for innovation in [specific area relevant to role]. Your recent [specific product launch/initiative/achievement] demonstrates the kind of forward-thinking approach I want to be part of. I'm excited about the opportunity to contribute to projects that push boundaries and create real impact.

**3. Culture and Values:** From my research and conversations with current employees, it's clear that your company values [specific cultural elements - collaboration, learning, diversity, etc.]. This matches my work style and the kind of environment where I thrive. I particularly appreciate your commitment to [specific cultural initiative or program].

**4. Career Development:** Your company's track record of promoting from within and investing in employee development is impressive. I'm looking for a place where I can grow long-term, and your [specific programs, mentorship opportunities, or career paths] align perfectly with my professional development goals.

**5. Role-Specific Excitement:** This specific position would allow me to [specific aspects of the role that excite you], which builds directly on my experience in [relevant background] while challenging me to grow in [specific areas].

I see this as an opportunity to contribute meaningfully while continuing to develop my skills in an environment that values both individual growth and collective success.`,
    tips: [
      'Research the company thoroughly before the interview',
      'Be specific about what attracts you - avoid generic answers',
      'Connect company values to your personal values and goals',
      'Mention specific recent company news, initiatives, or achievements',
      'Show how you can contribute while also growing'
    ],
    followUp: [
      'What do you know about our company culture?',
      'How do you see yourself contributing to our team?',
      'What questions do you have about our company?'
    ]
  },
  {
    id: 12,
    category: 'company',
    difficulty: 'Easy',
    type: 'Research-Based',
    question: 'What do you know about our company?',
    tags: ['company research', 'preparation', 'interest level', 'due diligence'],
    modelAnswer: `I've done extensive research on your company and I'm impressed by what I've learned:

**Company Overview:** You're a [industry] company founded in [year] that specializes in [main products/services]. You currently serve [target market/customer base] and have grown to [size/scale information if public].

**Recent Developments:** I've been following your recent [specific recent news - product launches, partnerships, expansions, awards]. Your [specific recent achievement] particularly caught my attention because it demonstrates your commitment to [relevant value or strategy].

**Market Position:** You're recognized as [market position/reputation] in the industry, competing with companies like [competitors] but differentiating yourselves through [specific differentiators].

**Values and Culture:** Your company values [specific values from website/materials] really resonate with me. I particularly appreciate your focus on [specific cultural element] and your commitment to [specific initiative - sustainability, diversity, community involvement, etc.].

**Financial Health:** [If public company] Your recent financial results show [specific positive metrics], which indicates strong market position and growth potential.

**Future Direction:** I'm excited about your strategic focus on [future initiatives/goals mentioned in recent communications], particularly [specific area relevant to the role].

**Why This Matters to Me:** This research reinforces my interest in joining your team because [specific connection to your career goals or interests]. I see opportunities to contribute to [specific areas] while growing my skills in [relevant areas].

I'd love to learn more about [specific question about company strategy, culture, or recent developments] from your perspective.`,
    tips: [
      'Research multiple sources: website, news, social media, employee reviews',
      'Include recent developments and news (within last 6 months)',
      'Show understanding of company\'s market position and competition',
      'Demonstrate knowledge of company culture and values',
      'Connect your research to why you want to work there'
    ],
    followUp: [
      'What attracted you to work for this company?',
      'How has the company changed since you\'ve been here?',
      'What do you see as the biggest opportunities for the company?'
    ]
  }
];

// Add more questions to reach 40+
export const additionalQuestions = [
  {
    id: 13,
    category: 'behavioral',
    difficulty: 'Medium',
    type: 'STAR Method',
    question: 'Tell me about a time you had to learn something quickly.',
    tags: ['learning agility', 'adaptability', 'quick thinking', 'pressure'],
    modelAnswer: 'Use STAR method to describe a situation where you had to rapidly acquire new skills or knowledge...',
    tips: ['Focus on your learning process', 'Show resourcefulness', 'Highlight successful application'],
    followUp: ['How do you approach learning new skills?', 'What resources do you use for quick learning?']
  },
  {
    id: 14,
    category: 'behavioral',
    difficulty: 'Hard',
    type: 'STAR Method',
    question: 'Describe a time when you had to make a difficult decision with limited information.',
    tags: ['decision making', 'uncertainty', 'risk assessment', 'judgment'],
    modelAnswer: 'Structure your response using STAR, focusing on your decision-making process...',
    tips: ['Explain your thought process', 'Show how you gathered available information', 'Discuss risk mitigation'],
    followUp: ['How do you handle uncertainty?', 'What factors do you consider when making decisions?']
  },
  {
    id: 15,
    category: 'technical',
    difficulty: 'Medium',
    type: 'Knowledge-Based',
    question: 'How do you ensure code quality in your projects?',
    tags: ['code quality', 'best practices', 'testing', 'review process'],
    modelAnswer: 'Discuss your approach to writing clean, maintainable code...',
    tips: ['Mention specific tools and practices', 'Include testing strategies', 'Discuss code review processes'],
    followUp: ['What testing frameworks do you prefer?', 'How do you handle technical debt?']
  }
  // Continue adding more questions to reach 40+...
];

// Combine all questions
export const allInterviewQuestions = [...interviewQuestions, ...additionalQuestions];
