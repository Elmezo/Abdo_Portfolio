import type { Locale } from './locale';

export interface UiDictionary {
  skipToContent: string;
  brand: string;
  nav: {
    home: string;
    about: string;
    skills: string;
    experience: string;
    projects: string;
    testimonials: string;
    caseStudies: string;
    github: string;
    contact: string;
  };
  language: {
    switchTo: string;
    en: string;
    ar: string;
  };
  hero: {
    badge: string;
    greeting: string;
    iBuild: string;
    contactMe: string;
    viewCaseStudies: string;
    githubProfile: string;
    downloadCv: string;
    scrollToAbout: string;
    typewriter: readonly string[];
  };
  sections: {
    about: string;
    aboutMeHighlight: string;
    whoIAm: string;
    skills: string;
    skillsDesc: string;
    experience: string;
    experienceDesc: string;
    projects: string;
    projectsDesc: string;
    testimonials: string;
    testimonialsDesc: string;
    caseStudies: string;
    caseStudiesDesc: string;
    github: string;
    githubDesc: string;
    contact: string;
    contactDesc: string;
  };
  footer: {
    blurb: string;
    quickLinks: string;
    connect: string;
    madeWith: string;
    in: string;
    backToTop: string;
  };
  error: {
    eyebrow: string;
    title: string;
    body: string;
    retry: string;
  };
  closeMenu: string;
}

export const dictionaries: Record<Locale, UiDictionary> = {
  en: {
    skipToContent: 'Skip to main content',
    brand: '<Abdelrahman />',
    nav: {
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      experience: 'Experience',
      projects: 'Projects',
      testimonials: 'Testimonials',
      caseStudies: 'Case Studies',
      github: 'GitHub',
      contact: 'Contact',
    },
    language: {
      switchTo: 'Language',
      en: 'EN',
      ar: 'ع',
    },
    hero: {
      badge: 'Internships · remote roles · freelance',
      greeting: "Hello, I'm",
      iBuild: 'I build',
      contactMe: 'Contact me',
      viewCaseStudies: 'View case studies',
      githubProfile: 'GitHub Profile',
      downloadCv: 'Download CV',
      scrollToAbout: 'Scroll to about section',
      typewriter: [
        'AI products',
        'ERP chatbots',
        'data dashboards',
        'cloud-ready apps',
      ],
    },
    sections: {
      about: 'About',
      aboutMeHighlight: 'Me',
      whoIAm: 'Who I Am',
      skills: 'My Skills',
      skillsDesc:
        'A comprehensive toolkit spanning software engineering, data science, and cloud technologies',
      experience: 'Work Experience',
      experienceDesc: 'My professional journey in software engineering and data science',
      projects: 'Work & Case Studies',
      projectsDesc:
        'Problem → solution → impact, with the stack and links that are safe to share publicly.',
      testimonials: 'Praise & Testimonials',
      testimonialsDesc:
        'What others have to say about my work, dedication, and technical expertise.',
      caseStudies: 'Case Studies',
      caseStudiesDesc: 'Behind-the-scenes stories of how I approach complex engineering challenges',
      github: 'GitHub Activity',
      githubDesc: 'My open source contributions and coding statistics',
      contact: 'Get In Touch',
      contactDesc: 'Have a project in mind or want to collaborate? Feel free to reach out!',
    },
    footer: {
      blurb:
        'Backend & Data Engineer building intelligent systems, analytics platforms, and automation tools.',
      quickLinks: 'Quick Links',
      connect: 'Connect',
      madeWith: 'Made with',
      in: 'in',
      backToTop: 'Back to top',
    },
    error: {
      eyebrow: 'Something went wrong',
      title: 'Could not load this page',
      body: 'Please try again. Use the EN | ع language switch — do not use Chrome auto-translate on this site.',
      retry: 'Try again',
    },
    closeMenu: 'Close menu',
  },
  ar: {
    skipToContent: 'تخطَّ إلى المحتوى الرئيسي',
    brand: '<عبدالرحمن />',
    nav: {
      home: 'الرئيسية',
      about: 'نبذة عني',
      skills: 'المهارات',
      experience: 'الخبرات',
      projects: 'المشاريع',
      testimonials: 'آراء العملاء',
      caseStudies: 'دراسات الحالة',
      github: 'GitHub',
      contact: 'تواصل',
    },
    language: {
      switchTo: 'اللغة',
      en: 'EN',
      ar: 'ع',
    },
    hero: {
      badge: 'تدريب · عمل عن بُعد · فريلانس',
      greeting: 'مرحباً، أنا',
      iBuild: 'أبني',
      contactMe: 'تواصل معي',
      viewCaseStudies: 'عرض دراسات الحالة',
      githubProfile: 'حساب GitHub',
      downloadCv: 'تحميل السيرة',
      scrollToAbout: 'الانتقال إلى نبذة عني',
      typewriter: [
        'منتجات ذكاء اصطناعي',
        'روبوتات محادثة ERP',
        'لوحات بيانات',
        'تطبيقات جاهزة للسحابة',
      ],
    },
    sections: {
      about: 'نبذة',
      aboutMeHighlight: 'عني',
      whoIAm: 'من أنا',
      skills: 'مهاراتي',
      skillsDesc: 'مجموعة أدوات شاملة في هندسة البرمجيات وعلوم البيانات وتقنيات السحابة',
      experience: 'الخبرة العملية',
      experienceDesc: 'مسيرتي المهنية في هندسة البرمجيات وعلوم البيانات',
      projects: 'الأعمال ودراسات الحالة',
      projectsDesc: 'المشكلة → الحل → الأثر، مع التقنيات والروابط المتاحة للمشاركة العامة.',
      testimonials: 'التزكيات والآراء',
      testimonialsDesc: 'ماذا يقول الآخرون عن عملي والتزامي وخبرتي التقنية.',
      caseStudies: 'دراسات الحالة',
      caseStudiesDesc: 'قصص من وراء الكواليس حول نهجي في التحديات الهندسية المعقدة',
      github: 'نشاط GitHub',
      githubDesc: 'مساهماتي مفتوحة المصدر وإحصائيات البرمجة',
      contact: 'تواصل معي',
      contactDesc: 'لديك مشروع أو ترغب بالتعاون؟ يسعدني التواصل معك!',
    },
    footer: {
      blurb:
        'مهندس خلفية وبيانات يبني أنظمة ذكية ومنصات تحليل وأدوات أتمتة.',
      quickLinks: 'روابط سريعة',
      connect: 'تواصل',
      madeWith: 'صُنع بـ',
      in: 'في',
      backToTop: 'العودة للأعلى',
    },
    error: {
      eyebrow: 'حدث خطأ',
      title: 'تعذر تحميل هذه الصفحة',
      body: 'حاول مرة أخرى. استخدم زر اللغة EN | ع من الشريط — لا تستخدم ترجمة كروم التلقائية على هذا الموقع.',
      retry: 'إعادة المحاولة',
    },
    closeMenu: 'إغلاق القائمة',
  },
};

export function getDictionary(locale: Locale): UiDictionary {
  return dictionaries[locale];
}
