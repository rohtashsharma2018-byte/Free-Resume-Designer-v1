export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  nationality?: string;
  website: string;
  linkedin: string;
  github: string;
  bio: string;
  photoUrl?: string; // base64 or URL
  gender?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  location: string;
  startDate: string;
  endDate: string;
  currentlyStudying: boolean;
  description: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  description: string;
}

export interface SkillCategory {
  id: string;
  name: string; // e.g. "Languages", "Frontend"
  skills: string[]; // e.g. ["TypeScript", "JavaScript"]
}

export interface Project {
  id: string;
  title: string;
  role: string;
  link: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link: string;
}

export interface Award {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link: string;
}

export interface Achievement {
  id: string;
  name: string;
  date: string;
  link: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: string; // "Native", "Fluent", "Professional", "Conversational", "Basic"
}

export interface ResumeData {
  id: string;
  title: string; // Name of this resume in dashboard
  templateId: 'modern-minimal' | 'classic-professional' | 'creative-bold' | 'academic-technical' | 'executive-premium' | 'ats-optimized' | 'template-two-colum-1' | 'template-two-colum-2' | 'template-mixed-column' | 'template-two-colum-3' | 'template-column-4' | 'template-column-5' | 'template-mixed-column-2' | 'template-mixed-column-3' | 'template-mixed-column-4' | 'template-mixed-column-5' | 'template-single-column-1' | 'template-single-column-2' | 'template-single-column-3' | 'template-single-column-4' | 'template-single-column-5' | 'template-ats-compliant-1' | 'template-ats-compliant-2' | 'template-ats-compliant-3' | 'template-ats-compliant-4' | 'template-ats-compliant-5' | 'template-ats-compliant-6' | 'template-ats-compliant-7' | 'template-ats-compliant-8' | 'template-ats-compliant-9' | 'template-ats-compliant-10' | 'template-industry-pro-11' | 'template-industry-pro-12' | 'template-industry-pro-13' | 'template-industry-pro-14' | 'template-industry-pro-15';
  primaryColor: string; // Hex code
  fontSize: 'sm' | 'base' | 'lg';
  fontFamily: 'sans' | 'serif' | 'mono' | 'display';
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: SkillCategory[];
  projects: Project[];
  certifications: Certification[];
  awards: Award[];
  achievements: Achievement[];
  languages: Language[];
  createdAt: number;
  updatedAt: number;
}

export interface HistoryState {
  past: ResumeData[];
  present: ResumeData;
  future: ResumeData[];
}
