
import { ResumeData } from '../types';

export const SECTION_POINTS = {
  personal: 20,
  experience: 20,
  education: 20,
  skills: 15,
  languages: 10,
  projects: 5,
  awards: 5,
  achievements: 5,
  certifications: 5,
};

export const isSectionFull = (data: ResumeData, secId: string): boolean => {
  switch (secId) {
    case 'personal': return !!(data.personalInfo.fullName && data.personalInfo.email && data.personalInfo.phone && data.personalInfo.location && data.personalInfo.jobTitle && data.personalInfo.bio);
    case 'experience': return data.experience.length > 0 && data.experience.every(exp => !!(exp.company && exp.position && exp.description && exp.description.trim()));
    case 'education': return data.education.length > 0 && data.education.every(edu => !!(edu.institution && edu.degree && edu.description && edu.description.trim()));
    case 'skills': return data.skills.length > 0 && data.skills.some(cat => cat.skills && cat.skills.length > 0);
    case 'languages': return data.languages.length > 0 && data.languages.every(lang => !!(lang.name && lang.name.trim()));
    case 'projects': return data.projects.length > 0 && data.projects.every(proj => !!(proj.title && proj.description && proj.description.trim()));
    case 'awards': return (data.awards || []).length > 0 && (data.awards || []).every(award => !!(award.name && award.name.trim()));
    case 'achievements': return (data.achievements || []).length > 0 && (data.achievements || []).every(ach => !!(ach.name && ach.name.trim()));
    case 'certifications': return data.certifications.length > 0 && data.certifications.every(cert => !!(cert.name && cert.name.trim()));
    default: return false;
  }
};

export const getResumeCompletionScore = (data: ResumeData): number => {
  let totalScore = 0;
  for (const [key, points] of Object.entries(SECTION_POINTS)) {
    if (isSectionFull(data, key)) {
      totalScore += points;
    }
  }
  return totalScore;
};
