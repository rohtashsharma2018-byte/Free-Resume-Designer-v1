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
  templateId: 'modern-minimal' | 'classic-professional' | 'creative-bold' | 'academic-technical' | 'executive-premium' | 'ats-optimized' | 'template-two-colum-1' | 'ats-standout' | 'ats-lunar' | 'ats-universe' | 'ats-shining-star' | 'ats-navy-classic' | 'two-column-popular' | 'two-column-grow' | 'two-column-gravity';
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
