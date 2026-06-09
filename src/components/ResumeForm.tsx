import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { isSectionFull } from '../lib/completion';
import { ResumeData, Education, Experience, SkillCategory, Project, Certification, Language, Award as AwardType, Achievement } from '../types';
import { 
  User, GraduationCap, Briefcase, Award, FolderGit2, Wrench, Globe, Plus, Trash2, 
  ArrowUp, ArrowDown, Sparkles, CheckCircle2, AlertCircle, Calendar, MapPin, 
  Info, Loader2, ImagePlus, PanelLeftClose, PanelLeft, LayoutGrid, Trophy, Star
} from 'lucide-react';

interface ResumeFormProps {
  data: ResumeData;
  onChange: (updatedData: ResumeData) => void;
  activeSection?: string;
  setActiveSection?: (section: string) => void;
}

interface ValidationErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  location?: string;
  experience?: Record<string, string>;
  education?: Record<string, string>;
  projects?: Record<string, string>;
  certifications?: Record<string, string>;
  awards?: Record<string, string>;
  achievements?: Record<string, string>;
}

const formatYYYYMMToMMMYYYY = (yyyyMM: string) => {
  if (!yyyyMM) return '';
  const [yyyy, mm] = yyyyMM.split('-');
  if (!yyyy || !mm) return yyyyMM;
  const date = new Date(parseInt(yyyy), parseInt(mm) - 1);
  return date.toLocaleString('en-US', { month: 'short', year: 'numeric' });
};

const parseMMMYYYYToYYYYMM = (mmmYYYY: string) => {
  if (!mmmYYYY) return '';
  try {
    const parts = mmmYYYY.split(' ');
    if (parts.length !== 2) return '';
    const [mmm, yyyy] = parts;
    const date = new Date(`${mmm} 1, ${yyyy}`);
    if (isNaN(date.getTime())) return '';
    const mm = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${yyyy}-${mm}`;
  } catch (e) {
    return '';
  }
};

export const ResumeForm: React.FC<ResumeFormProps> = ({ 
  data, 
  onChange,
  activeSection: propActiveSection,
  setActiveSection: propSetActiveSection
}) => {
  const [localActiveSection, setLocalActiveSection] = useState<string>('templates');
  const activeSection = propActiveSection !== undefined ? propActiveSection : localActiveSection;
  const setActiveSection = propSetActiveSection !== undefined ? propSetActiveSection : setLocalActiveSection;
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{onConfirm: () => void, title: string, message: string} | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  
  // Real-time error validation hook
  useEffect(() => {
    const newErrors: ValidationErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;

    if (!data.personalInfo.fullName) {
      newErrors.fullName = 'Full name is required';
    }
    if (!data.personalInfo.email) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(data.personalInfo.email)) {
      newErrors.email = 'Please provide a valid email address';
    }
    if (!data.personalInfo.phone) {
      newErrors.phone = 'Phone number is required';
    }
    if (!data.personalInfo.location) {
      newErrors.location = 'Location is required';
    }
    if (data.personalInfo.website && !urlRegex.test(data.personalInfo.website)) {
      newErrors.website = 'Invalid web URL layout';
    }
    if (data.personalInfo.linkedin && data.personalInfo.linkedin.includes(' ')) {
      newErrors.linkedin = 'LinkedIn handle should not contain spaces';
    }
    if (data.personalInfo.github && data.personalInfo.github.includes(' ')) {
      newErrors.github = 'GitHub username should not contain spaces';
    }

    const expErrors: Record<string, string> = {};
    data.experience.forEach((exp) => {
      if (!exp.description) {
        expErrors[exp.id] = 'Description is required';
      }
    });

    if (Object.keys(expErrors).length > 0) {
      newErrors.experience = expErrors;
    }

    const eduErrors: Record<string, string> = {};
    data.education.forEach((edu) => {
      if (!edu.description) {
        eduErrors[edu.id] = 'Description is required';
      }
    });

    if (Object.keys(eduErrors).length > 0) {
      newErrors.education = eduErrors;
    }

    const projErrors: Record<string, string> = {};
    data.projects.forEach((proj) => {
      if (!proj.description) {
        projErrors[proj.id] = 'Description is required';
      }
    });

    if (Object.keys(projErrors).length > 0) {
      newErrors.projects = projErrors;
    }

    const certErrors: Record<string, string> = {};
    data.certifications.forEach((cert) => {
      if (!cert.name) {
        certErrors[cert.id] = 'Certificate name is required';
      }
    });

    if (Object.keys(certErrors).length > 0) {
      newErrors.certifications = certErrors;
    }

    const awardErrors: Record<string, string> = {};
    (data.awards || []).forEach((award) => {
      if (!award.name) {
        awardErrors[award.id] = 'Award name is required';
      }
    });

    if (Object.keys(awardErrors).length > 0) {
      newErrors.awards = awardErrors;
    }

    const achErrors: Record<string, string> = {};
    (data.achievements || []).forEach((ach) => {
      if (!ach.name) {
        achErrors[ach.id] = 'Achievement name is required';
      }
    });

    if (Object.keys(achErrors).length > 0) {
      newErrors.achievements = achErrors;
    }

    setErrors(newErrors);
  }, [data]);
  const handlePersonalInfoChange = (field: string, value: string) => {
    onChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [field]: value
      }
    });
  };

  // Profile image upload parser (Base64 conversion)
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('Photo is too large. Please upload an image smaller than 2MB.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      onChange({
        ...data,
        personalInfo: {
          ...data.personalInfo,
          photoUrl: reader.result as string
        }
      });
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    onChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        photoUrl: undefined
      }
    });
  };

  // Helper arrays update
  const addEdu = () => {
    const newEdu: Education = {
      id: Math.random().toString(),
      institution: '',
      degree: '',
      fieldOfStudy: '',
      location: '',
      startDate: '',
      endDate: '',
      currentlyStudying: false,
      description: ''
    };
    onChange({ ...data, education: [...data.education, newEdu] });
  };

  const updateEdu = (id: string, field: keyof Education, value: any) => {
    onChange({
      ...data,
      education: data.education.map((edu) => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    });
  };

  const removeEdu = (id: string) => {
    onChange({
      ...data,
      education: data.education.filter((edu) => edu.id !== id)
    });
  };

  // Experience updates
  const addExp = () => {
    const newExp: Experience = {
      id: Math.random().toString(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      currentlyWorking: false,
      description: ''
    };
    onChange({ ...data, experience: [...data.experience, newExp] });
  };

  const updateExp = (id: string, field: keyof Experience, value: any) => {
    onChange({
      ...data,
      experience: data.experience.map((exp) => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    });
  };

  const removeExp = (id: string) => {
    onChange({
      ...data,
      experience: data.experience.filter((exp) => exp.id !== id)
    });
  };

  // Skills updates
  const addSkillCategory = () => {
    const newCat: SkillCategory = {
      id: Math.random().toString(),
      name: 'New Skill Category',
      skills: []
    };
    onChange({ ...data, skills: [...data.skills, newCat] });
  };

  const updateSkillCategoryName = (id: string, name: string) => {
    onChange({
      ...data,
      skills: data.skills.map((cat) => cat.id === id ? { ...cat, name } : cat)
    });
  };

  const addSkillToCategory = (id: string, skill: string) => {
    if (!skill.trim()) return;
    onChange({
      ...data,
      skills: data.skills.map((cat) => {
        if (cat.id === id) {
          return {
            ...cat,
            skills: [...(cat.skills || []), skill.trim()]
          };
        }
        return cat;
      })
    });
  };

  const removeSkillFromCategory = (id: string, index: number) => {
    onChange({
      ...data,
      skills: data.skills.map((cat) => {
        if (cat.id === id) {
          const fresh = [...cat.skills];
          fresh.splice(index, 1);
          return { ...cat, skills: fresh };
        }
        return cat;
      })
    });
  };

  const removeSkillCategory = (id: string) => {
    onChange({
      ...data,
      skills: data.skills.filter((cat) => cat.id !== id)
    });
  };

  // Projects updates
  const addProj = () => {
    const newProj: Project = {
      id: Math.random().toString(),
      title: '',
      role: '',
      link: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      description: ''
    };
    onChange({ ...data, projects: [...data.projects, newProj] });
  };

  const updateProj = (id: string, field: keyof Project, value: any) => {
    onChange({
      ...data,
      projects: data.projects.map((proj) => 
        proj.id === id ? { ...proj, [field]: value } : proj
      )
    });
  };

  const removeProj = (id: string) => {
    onChange({
      ...data,
      projects: data.projects.filter((proj) => proj.id !== id)
    });
  };

  // Certifications
  const addCert = () => {
    const newCert: Certification = {
      id: Math.random().toString(),
      name: '',
      issuer: '',
      date: '',
      link: ''
    };
    onChange({ ...data, certifications: [...data.certifications, newCert] });
  };

  const updateCert = (id: string, field: keyof Certification, value: any) => {
    onChange({
      ...data,
      certifications: data.certifications.map((cert) => 
        cert.id === id ? { ...cert, [field]: value } : cert
      )
    });
  };

  const removeCert = (id: string) => {
    onChange({
      ...data,
      certifications: data.certifications.filter((cert) => cert.id !== id)
    });
  };

  // Awards
  const addAward = () => {
    const newAward: AwardType = {
      id: Math.random().toString(),
      name: '',
      issuer: '',
      date: '',
      link: ''
    };
    onChange({ ...data, awards: [...(data.awards || []), newAward] });
  };

  const updateAward = (id: string, field: keyof AwardType, value: any) => {
    onChange({
      ...data,
      awards: (data.awards || []).map((award) => 
        award.id === id ? { ...award, [field]: value } : award
      )
    });
  };

  const removeAward = (id: string) => {
    onChange({
      ...data,
      awards: (data.awards || []).filter((award) => award.id !== id)
    });
  };

  // Achievements
  const addAchievement = () => {
    const newAchievement: Achievement = {
      id: Math.random().toString(),
      name: '',
      date: '',
      link: ''
    };
    onChange({ ...data, achievements: [...(data.achievements || []), newAchievement] });
  };

  const updateAchievement = (id: string, field: keyof Achievement, value: any) => {
    onChange({
      ...data,
      achievements: (data.achievements || []).map((ach) => 
        ach.id === id ? { ...ach, [field]: value } : ach
      )
    });
  };

  const removeAchievement = (id: string) => {
    onChange({
      ...data,
      achievements: (data.achievements || []).filter((ach) => ach.id !== id)
    });
  };

  // Languages
  const addLang = () => {
    const newLang: Language = {
      id: Math.random().toString(),
      name: '',
      proficiency: 'Fluent'
    };
    onChange({ ...data, languages: [...data.languages, newLang] });
  };

  const updateLang = (id: string, field: keyof Language, value: any) => {
    onChange({
      ...data,
      languages: data.languages.map((lang) => 
        lang.id === id ? { ...lang, [field]: value } : lang
      )
    });
  };

  const removeLang = (id: string) => {
    onChange({
      ...data,
      languages: data.languages.filter((lang) => lang.id !== id)
    });
  };

  // List Item Reordering functions (Drag or Up/Down buttons)
  const moveItemInArray = (arrayName: 'education' | 'experience' | 'projects' | 'skills', index: number, direction: 'up' | 'down') => {
    const targetArray = [...data[arrayName]] as any[];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIdx < 0 || targetIdx >= targetArray.length) return;

    // Swap items
    const temp = targetArray[index];
    targetArray[index] = targetArray[targetIdx];
    targetArray[targetIdx] = temp;

    onChange({
      ...data,
      [arrayName]: targetArray
    });
  };

  // ATS Compliance Scanner Calculations & Auto-Fix actions
  const scanATS = () => {
    let score = 0;
    const items = [];

    // Template Check (Max 25)
    if (data.templateId === 'ats-optimized' || data.templateId === 'ats-navy-classic') {
      score += 25;
      items.push({
        status: 'pass',
        text: 'Using ATS-Optimized Single Column Template (25/25 pts)',
        fixable: false,
        desc: 'Ensures sequential document flow matches exact parsing order of screeners.',
      });
    } else if (data.templateId === 'classic-professional' || data.templateId === 'academic-technical') {
      score += 15;
      items.push({
        status: 'warning',
        text: 'Using standard single-column layout (15/25 pts)',
        fixable: true,
        fixType: 'template',
        desc: 'This is a solid layout, but switching to the strict "ATS Optimized" layout guarantees best parser readability.',
      });
    } else {
      items.push({
        status: 'fail',
        text: 'Using multi-column or visual template (5/25 pts)',
        fixable: true,
        fixType: 'template',
        desc: 'Multi-column sidebars may confuse basic parsing machinery that reads left-to-right across columns.',
      });
    }

    // Photo check (Max 15)
    if (data.personalInfo.photoUrl) {
      items.push({
        status: 'warning',
        text: 'Profile photo is attached (0/15 pts)',
        fixable: true,
        fixType: 'photo',
        desc: 'ATS companies usually discard resumes with images or photos to prevent bias. Try removing the picture.',
      });
    } else {
      score += 15;
      items.push({
        status: 'pass',
        text: 'No profile image or avatar (15/15 pts)',
        fixable: false,
        desc: 'Eliminates parsing errors and complies with blind hiring screening.',
      });
    }

    // Emojis check (Max 15)
    const hasEmojis = [
      data.personalInfo.fullName,
      data.personalInfo.jobTitle,
      data.personalInfo.email,
      data.personalInfo.phone,
      data.personalInfo.location,
      data.personalInfo.website,
    ].some(text => text && /[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]/.test(text));

    if (hasEmojis) {
      items.push({
        status: 'warning',
        text: 'Graphic/emoji symbols found in inputs (5/15 pts)',
        fixable: true,
        fixType: 'emojis',
        desc: 'Special emojis or custom symbols may get corrupted during PDF encoding. Replace them with plain titles.',
      });
    } else {
      score += 15;
      items.push({
        status: 'pass',
        text: 'Contact details are symbol-free (15/15 pts)',
        fixable: false,
        desc: 'Pruned of emojis to prevent conversion corruption inside scanner outputs.',
      });
    }

    // Standard core sections (Max 15)
    const hasExp = data.experience && data.experience.length > 0;
    const hasEdu = data.education && data.education.length > 0;
    const hasSkills = data.skills && data.skills.length > 0;

    if (hasExp && hasEdu && hasSkills) {
      score += 15;
      items.push({
        status: 'pass',
        text: 'All core sections are populated (15/15 pts)',
        fixable: false,
        desc: 'Standard sections (Experience, Education, Skills) are present and correctly filled.',
      });
    } else {
      const missing = [];
      if (!hasExp) missing.push('Experience');
      if (!hasEdu) missing.push('Education');
      if (!hasSkills) missing.push('Skills');
      items.push({
        status: 'fail',
        text: `Missing critical sections: ${missing.join(', ')} (0/15 pts)`,
        fixable: false,
        desc: 'Parsers categorize candidates by locating standard headers. Make sure these sections are populated.',
      });
    }

    // Experience descriptions bullet test (Max 15)
    const hasBullets = data.experience.every(exp => 
      !exp.description || 
      exp.description.includes('•') || 
      exp.description.includes('-') || 
      exp.description.includes('*') || 
      exp.description.split('\n').length > 1
    );

    if (data.experience.length > 0 && !hasBullets) {
      items.push({
        status: 'warning',
        text: 'Job description may lack itemized bullets (5/15 pts)',
        fixable: true,
        fixType: 'bullets',
        desc: 'Itemizing your career achievements using crisp bullet points ("•" or "-") makes them highly parseable.',
      });
    } else {
      score += 15;
      items.push({
        status: 'pass',
        text: 'Job details use structured lists/items (15/15 pts)',
        fixable: false,
        desc: 'Provides scannable achievements instead of a continuous text block.',
      });
    }

    // Web links check (Max 15)
    const hasCleanLinks = [
      data.personalInfo.email,
      data.personalInfo.website,
      data.personalInfo.linkedin,
      data.personalInfo.github
    ].every(link => !link || !/[✉☎📍🌐]/.test(link));

    if (hasCleanLinks) {
      score += 15;
      items.push({
        status: 'pass',
        text: 'Contact links are cleanly formatted (15/15 pts)',
        fixable: false,
        desc: 'Websites and profiles are readable as standard text URIs.',
      });
    } else {
      items.push({
        status: 'warning',
        text: 'Links have symbol prefixes (5/15 pts)',
        fixable: true,
        fixType: 'links',
        desc: 'Strip visual qualifiers from the text values of your URLs so the text copies correctly.',
      });
    }

    // Clamp score at 100
    score = Math.min(score, 100);

    return { score, items };
  };

  const autoFixCompliance = (type: string) => {
    if (type === 'template') {
      onChange({
        ...data,
        templateId: 'ats-optimized'
      });
    } else if (type === 'photo') {
      onChange({
        ...data,
        personalInfo: {
          ...data.personalInfo,
          photoUrl: undefined
        }
      });
    } else if (type === 'emojis') {
      const emojiRegex = /[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]/g;
      onChange({
        ...data,
        personalInfo: {
          ...data.personalInfo,
          fullName: data.personalInfo.fullName.replace(emojiRegex, '').trim(),
          jobTitle: data.personalInfo.jobTitle.replace(emojiRegex, '').trim(),
          email: data.personalInfo.email.replace(emojiRegex, '').trim(),
          phone: data.personalInfo.phone.replace(emojiRegex, '').trim(),
          location: data.personalInfo.location.replace(emojiRegex, '').trim(),
        }
      });
    } else if (type === 'bullets') {
      onChange({
        ...data,
        experience: data.experience.map(exp => {
          if (exp.description && !exp.description.includes('•') && !exp.description.includes('-') && !exp.description.includes('*')) {
            const lines = exp.description.split('\n').filter(l => l.trim().length > 0);
            return {
              ...exp,
              description: lines.map(line => `• ${line.trim()}`).join('\n')
            };
          }
          return exp;
        })
      });
    } else if (type === 'all') {
      const emojiRegex = /[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]/g;
      
      const fixedExperience = data.experience.map(exp => {
        if (exp.description && !exp.description.includes('•') && !exp.description.includes('-') && !exp.description.includes('*')) {
          const lines = exp.description.split('\n').filter(l => l.trim().length > 0);
          return {
            ...exp,
            description: lines.map(line => `• ${line.trim()}`).join('\n')
          };
        }
        return exp;
      });

      onChange({
        ...data,
        templateId: 'ats-optimized',
        personalInfo: {
          ...data.personalInfo,
          photoUrl: undefined,
          fullName: data.personalInfo.fullName.replace(emojiRegex, '').trim(),
          jobTitle: data.personalInfo.jobTitle.replace(emojiRegex, '').trim(),
          email: data.personalInfo.email.replace(emojiRegex, '').trim(),
          phone: data.personalInfo.phone.replace(emojiRegex, '').trim(),
          location: data.personalInfo.location.replace(emojiRegex, '').trim(),
        },
        experience: fixedExperience
      });
    }
  };

  // Tab Definitions
  const sections = [
    { id: 'templates', label: 'Layouts', icon: LayoutGrid, color: 'text-purple-500' },
    { id: 'personal', label: 'Identity', icon: User, color: 'text-blue-500' },
    { id: 'experience', label: 'Experience', icon: Briefcase, color: 'text-emerald-500' },
    { id: 'education', label: 'Education', icon: GraduationCap, color: 'text-amber-500' },
    { id: 'skills', label: 'Skills', icon: Wrench, color: 'text-violet-500' },
    { id: 'projects', label: 'Projects', icon: FolderGit2, color: 'text-rose-500' },
    { id: 'certifications', label: 'Certifications', icon: Award, color: 'text-cyan-500' },
    { id: 'awards', label: 'Awards', icon: Trophy, color: 'text-yellow-500' },
    { id: 'achievements', label: 'Achievements', icon: Star, color: 'text-orange-500' },
    { id: 'languages', label: 'Languages', icon: Globe, color: 'text-fuchsia-500' },
    { id: 'ats', label: 'ATS Check', icon: Sparkles, color: 'text-indigo-500' },
  ];

  const isSectionCompleted = (secId: string) => {
    return isSectionFull(data, secId);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col md:flex-row h-full max-h-[85vh]">
      {/* Left section selector tabs */}
      <div className={`p-3 bg-slate-50 border-r border-slate-100 flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-y-auto w-full select-none shrink-0 scrollbar-none transition-all duration-300 ${isSidebarCollapsed ? 'md:w-[68px]' : 'md:w-44'}`}>
        <div className="flex flex-row md:flex-col gap-1 flex-1">
          {sections.map((sec) => {
            const Icon = sec.icon;
            const isActive = activeSection === sec.id;
            return (
              <button
                id={`tab-select-${sec.id}`}
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                title={isSidebarCollapsed ? sec.label : undefined}
                className={`flex items-center ${isSidebarCollapsed ? 'justify-center mx-auto' : 'gap-2.5 px-3'} py-2.5 rounded-lg text-sm font-semibold cursor-pointer transition-all whitespace-nowrap text-left ${isSidebarCollapsed ? 'w-10 px-0' : 'md:w-full'} ${
                  isActive 
                    ? 'bg-slate-900 text-white shadow-xs' 
                    : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : sec.color}`} />
                {!isSidebarCollapsed && <span>{sec.label}</span>}
                {isSectionCompleted(sec.id) && (
                  <CheckCircle2 className={`w-3.5 h-3.5 ml-auto ${isActive ? 'text-emerald-300' : 'text-emerald-500'}`} />
                )}
              </button>
            );
          })}
        </div>
        
        {/* Toggle Collapse Button (Desktop Only) */}
        <div className="hidden md:flex justify-center mt-auto pt-4 border-t border-slate-200/50">
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="flex items-center justify-center w-10 h-10 rounded-lg text-slate-400 hover:bg-slate-200/50 hover:text-slate-900 transition-colors"
            title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isSidebarCollapsed ? <PanelLeft className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Form Content panel */}
      <div className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto" id="builder-editor-container">
        
        {/* TEMPLATE LIBRARY PANEL */}
        {activeSection === 'templates' && (
          <motion.div 
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-6" id="form-templates">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-md flex items-center gap-2">
                <LayoutGrid className="w-5 h-5 text-purple-500" />
                Resume Layout Library
              </h3>
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-600 mb-1">Select Layout Template</label>
              <select
                id="select-resume-template"
                value={data.templateId}
                onChange={(e) => onChange({ ...data, templateId: e.target.value as any })}
                className="w-full text-sm text-white bg-orange-600 border border-orange-600 rounded-lg px-3 py-2 outline-none focus:border-orange-700 cursor-pointer font-medium"
              >
                {[
                  { id: 'modern-minimal', name: 'Modern Minimal' },
                  { id: 'classic-professional', name: 'Classic Professional' },
                  { id: 'creative-bold', name: 'Creative Bold' },
                  { id: 'academic-technical', name: 'Academic Technical' },
                  { id: 'executive-premium', name: 'Executive Premium' },
                  { id: 'ats-optimized', name: 'ATS Optimized' },
                  { id: 'ats-standout', name: 'ATS Standout' },
                  { id: 'ats-lunar', name: 'ATS Lunar' },
                  { id: 'ats-universe', name: 'ATS Universe (Yellow & Dark Grey)' },
                  { id: 'ats-shining-star', name: 'ATS Shining Star (Navy Blue & Crisp Silver)' },
                  { id: 'ats-navy-classic', name: 'ATS Navy Classic (Single Column, Subtly Elegant Navy)' },
                ].map((template) => (
                  <option key={template.id} value={template.id} className="text-slate-900 bg-white">{template.name}</option>
                ))}
              </select>
            </div>
          </motion.div>
        )}

        {/* PERSONAL INFO (IDENTITY) PANEL */}
        {activeSection === 'personal' && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-6" id="form-personal-info">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-md flex items-center gap-2">
                <User className="w-5 h-5 text-indigo-500" />
                Personal & Contact Details
              </h3>
              <span className="text-[10px] font-mono text-slate-400">Section 1 of 7</span>
            </div>

            {/* Photo Avatar layout */}
            <div className="flex flex-col sm:flex-row items-center gap-5 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="relative group">
                {data.personalInfo.photoUrl ? (
                  <img 
                    src={data.personalInfo.photoUrl} 
                    alt="Uploaded Avatar" 
                    className="w-18 h-18 rounded-full object-cover border-2 border-indigo-400/50"
                  />
                ) : (
                  <div className="w-18 h-18 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500 border-2 border-dashed border-indigo-200">
                    <User className="w-8 h-8" />
                  </div>
                )}
              </div>
              <div className="text-center sm:text-left space-y-1.5 flex-1">
                <p className="text-sm font-semibold text-slate-700">Profile Resume Image</p>
                <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                  <label className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600 font-medium cursor-pointer shadow-xs transition-colors flex items-center gap-1.5">
                    <ImagePlus className="w-3.5 h-3.5 text-indigo-500" />
                    Upload Image
                    <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                  </label>
                  {data.personalInfo.photoUrl && (
                    <button 
                      onClick={removePhoto} 
                      className="px-3 py-1.5 bg-red-50 hover:bg-red-100 border border-red-100 rounded-lg text-sm text-red-600 font-medium cursor-pointer transition-colors"
                    >
                      Delete
                    </button>
                  )}
                </div>
                <p className="text-[10px] text-slate-400">Supported formats: JPG, PNG. Max size: 2MB.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">Full Name</label>
                <input
                  id="input-full-name"
                  type="text"
                  placeholder="e.g. Eleanor Vance"
                  value={data.personalInfo.fullName || ''}
                  onChange={(e) => handlePersonalInfoChange('fullName', e.target.value)}
                  className={`w-full px-3.5 py-2.5 text-sm text-slate-755 border rounded-lg outline-none transition-all placeholder:text-slate-400 ${
                    errors.fullName ? 'border-red-400 focus:ring-red-100 focus:border-red-500' : 'border-slate-200 focus:ring-indigo-500/10 focus:border-indigo-500'
                  }`}
                />
                {errors.fullName && (
                  <p className="text-[10px] text-red-500 font-mono mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">Job Title</label>
                <input
                  id="input-job-title"
                  type="text"
                  placeholder="e.g. Principal Architect / Full Stack Lead"
                  value={data.personalInfo.jobTitle || ''}
                  onChange={(e) => handlePersonalInfoChange('jobTitle', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm text-slate-755 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">Email Address</label>
                <input
                  id="input-email"
                  type="email"
                  placeholder="e.g. eleanor@vance.io"
                  value={data.personalInfo.email || ''}
                  onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                  className={`w-full px-3.5 py-2.5 text-sm text-slate-755 border rounded-lg outline-none transition-all placeholder:text-slate-400 ${
                    errors.email ? 'border-red-400 focus:ring-red-100 focus:border-red-500' : 'border-slate-200 focus:ring-indigo-500/10 focus:border-indigo-500'
                  }`}
                />
                {errors.email && (
                  <p className="text-[10px] text-red-500 font-mono mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">Phone Number</label>
                <input
                  id="input-phone"
                  type="tel"
                  placeholder="e.g. +1 (415) 555-0199"
                  value={data.personalInfo.phone || ''}
                  onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                  className={`w-full px-3.5 py-2.5 text-sm text-slate-755 border rounded-lg outline-none transition-all placeholder:text-slate-400 ${
                    errors.phone ? 'border-red-400 focus:ring-red-100 focus:border-red-500' : 'border-slate-200 focus:ring-indigo-500/10 focus:border-indigo-500'
                  }`}
                />
                {errors.phone && (
                  <p className="text-[10px] text-red-500 font-mono mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">Location / Address</label>
                <input
                  id="input-location"
                  type="text"
                  placeholder="e.g. San Francisco, CA"
                  value={data.personalInfo.location || ''}
                  onChange={(e) => handlePersonalInfoChange('location', e.target.value)}
                  className={`w-full px-3.5 py-2.5 text-sm text-slate-755 border rounded-lg outline-none transition-all placeholder:text-slate-400 ${
                    errors.location ? 'border-red-400 focus:ring-red-100 focus:border-red-500' : 'border-slate-200 focus:ring-indigo-500/10 focus:border-indigo-500'
                  }`}
                />
                {errors.location && (
                  <p className="text-[10px] text-red-500 font-mono mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.location}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">Nationality</label>
                <input
                  id="input-nationality"
                  type="text"
                  placeholder="e.g. American, British"
                  value={data.personalInfo.nationality || ''}
                  onChange={(e) => handlePersonalInfoChange('nationality', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm text-slate-755 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">Gender</label>
                <select
                  id="input-gender"
                  value={data.personalInfo.gender || ''}
                  onChange={(e) => handlePersonalInfoChange('gender', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm text-slate-755 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">Personal Site / Portfolio</label>
                <input
                  id="input-website"
                  type="text"
                  placeholder="e.g. vance-eleanor.com"
                  value={data.personalInfo.website || ''}
                  onChange={(e) => handlePersonalInfoChange('website', e.target.value)}
                  className={`w-full px-3.5 py-2.5 text-sm text-slate-755 border rounded-lg outline-none transition-all placeholder:text-slate-400 ${
                    errors.website ? 'border-red-400 focus:ring-red-100 focus:border-red-500' : 'border-slate-200 focus:ring-indigo-500/10 focus:border-indigo-500'
                  }`}
                />
                {errors.website && (
                  <p className="text-[10px] text-red-500 font-mono mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.website}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">LinkedIn Profile Handle</label>
                <input
                  id="input-linkedin"
                  type="text"
                  placeholder="e.g. eleanor-vance"
                  value={data.personalInfo.linkedin || ''}
                  onChange={(e) => handlePersonalInfoChange('linkedin', e.target.value)}
                  className={`w-full px-3.5 py-2.5 text-sm text-slate-755 border rounded-lg outline-none transition-all placeholder:text-slate-400 ${
                    errors.linkedin ? 'border-red-400 focus:ring-red-100 focus:border-red-500' : 'border-slate-200 focus:ring-indigo-500/10 focus:border-indigo-500'
                  }`}
                />
                {errors.linkedin && (
                  <p className="text-[10px] text-red-500 font-mono mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.linkedin}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">GitHub Username</label>
                <input
                  id="input-github"
                  type="text"
                  placeholder="e.g. eleanor-git"
                  value={data.personalInfo.github || ''}
                  onChange={(e) => handlePersonalInfoChange('github', e.target.value)}
                  className={`w-full px-3.5 py-2.5 text-sm text-slate-755 border rounded-lg outline-none transition-all placeholder:text-slate-400 ${
                    errors.github ? 'border-red-400 focus:ring-red-100 focus:border-red-500' : 'border-slate-200 focus:ring-indigo-500/10 focus:border-indigo-500'
                  }`}
                />
                {errors.github && (
                  <p className="text-[10px] text-red-500 font-mono mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.github}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Executive Bio / Summary Statement</label>
              <textarea
                id="input-bio"
                rows={4}
                placeholder="Briefly state your core value proposition, leadership capabilities, or career aspirations in 3-4 structured lines..."
                value={data.personalInfo.bio || ''}
                onChange={(e) => handlePersonalInfoChange('bio', e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm text-slate-755 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400 resize-y"
              />
            </div>
          </motion.div>
        )}

        {/* WORK EXPERIENCE HISTORY PANEL */}
        {activeSection === 'experience' && (
          <div className="space-y-6" id="form-experience">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-md flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-indigo-500" />
                Professional Work Experience
              </h3>
              <button 
                id="btn-add-experience"
                onClick={addExp} 
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-sm font-semibold cursor-pointer flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Work Position
              </button>
            </div>

            {data.experience.length === 0 ? (
              <div className="text-center py-12 bg-slate-50 border border-dashed border-slate-100 rounded-xl">
                <Briefcase className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <p className="text-sm text-slate-500">No work history details logged yet.</p>
                <button onClick={addExp} className="mt-3 text-sm text-indigo-600 hover:underline cursor-pointer font-semibold">
                  Add your first position here
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {data.experience.map((exp, index) => (
                  <div 
                    key={exp.id} 
                    className="p-4 border border-slate-200/80 bg-white rounded-xl shadow-xs space-y-4 relative group"
                  >
                    <div className="flex justify-between items-center bg-slate-50 p-2.5 -m-4 mb-1 rounded-t-xl border-b border-slate-100">
                      <span className="text-sm font-bold text-slate-700">Position #{index + 1}</span>
                      <div className="flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => moveItemInArray('experience', index, 'up')}
                          disabled={index === 0}
                          title="Move Up"
                          className="p-1 text-slate-400 hover:text-slate-700 hover:bg-white rounded transition-colors disabled:opacity-30 cursor-pointer"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => moveItemInArray('experience', index, 'down')}
                          disabled={index === data.experience.length - 1}
                          title="Move Down"
                          className="p-1 text-slate-400 hover:text-slate-700 hover:bg-white rounded transition-colors disabled:opacity-30 cursor-pointer"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => setDeleteConfirm({
                            title: 'Delete Position',
                            message: 'Are you sure you want to remove this work experience? This action cannot be undone.',
                            onConfirm: () => removeExp(exp.id)
                          })}
                          title="Delete Position"
                          className="p-1 text-red-400 hover:text-red-600 hover:bg-white rounded transition-colors cursor-pointer ml-1.5"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                      <div>
                        <label className="block text-sm font-medium text-slate-500 mb-1">Company / Organization</label>
                        <input
                          type="text"
                          placeholder="e.g. Stripe, Inc."
                          value={exp.company}
                          onChange={(e) => updateExp(exp.id, 'company', e.target.value)}
                          className="w-full px-3.5 py-2 text-sm text-slate-700 border border-slate-250 rounded-lg outline-none focus:border-indigo-500 transition-all placeholder:text-slate-400"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-500 mb-1">Position Title</label>
                        <input
                          type="text"
                          placeholder="e.g. Senior Frontend Engineer"
                          value={exp.position}
                          onChange={(e) => updateExp(exp.id, 'position', e.target.value)}
                          className="w-full px-3.5 py-2 text-sm text-slate-700 border border-slate-250 rounded-lg outline-none focus:border-indigo-500 transition-all placeholder:text-slate-400"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-500 mb-1">Location</label>
                        <input
                          type="text"
                          placeholder="e.g. San Francisco, CA (Remote)"
                          value={exp.location}
                          onChange={(e) => updateExp(exp.id, 'location', e.target.value)}
                          className="w-full px-3.5 py-2 text-sm text-slate-700 border border-slate-250 rounded-lg outline-none focus:border-indigo-500 transition-all placeholder:text-slate-400"
                        />
                      </div>
                      
                      {/* Dates + Toggle block */}
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="block text-sm font-medium text-slate-500">Employment Timeline</label>
                          <label className="flex items-center gap-1 text-[11px] font-medium text-slate-600 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={exp.currentlyWorking}
                              onChange={(e) => updateExp(exp.id, 'currentlyWorking', e.target.checked)}
                              className="accent-indigo-600 rounded"
                            />
                            Currently Working Here
                          </label>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="relative flex items-center w-full">
                            <input
                              type="text"
                              placeholder="Start (e.g. Jan 2024)"
                              value={exp.startDate}
                              onChange={(e) => updateExp(exp.id, 'startDate', e.target.value)}
                              className="w-full px-3.5 pr-8 py-2 text-sm text-slate-700 border border-slate-250 rounded-lg outline-none focus:border-indigo-500 transition-all placeholder:text-slate-400"
                            />
                            <Calendar className="absolute right-2.5 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                            <input
                              type="month"
                              value={parseMMMYYYYToYYYYMM(exp.startDate)}
                              onChange={(e) => updateExp(exp.id, 'startDate', formatYYYYMMToMMMYYYY(e.target.value))}
                              className="absolute right-0 top-0 bottom-0 w-8 opacity-0 cursor-pointer"
                            />
                          </div>
                          <div className="relative flex items-center w-full">
                            <input
                              type="text"
                              placeholder="End (e.g. Present)"
                              disabled={exp.currentlyWorking}
                              value={exp.currentlyWorking ? 'Present' : exp.endDate}
                              onChange={(e) => updateExp(exp.id, 'endDate', e.target.value)}
                              className="w-full px-3.5 pr-8 py-2 text-sm text-slate-700 border border-slate-250 rounded-lg outline-none focus:border-indigo-500 transition-all placeholder:text-slate-400 disabled:bg-slate-50 disabled:text-slate-400"
                            />
                            {!exp.currentlyWorking && <Calendar className="absolute right-2.5 w-3.5 h-3.5 text-slate-400 pointer-events-none" />}
                            {!exp.currentlyWorking && (
                              <input
                                type="month"
                                value={parseMMMYYYYToYYYYMM(exp.endDate)}
                                onChange={(e) => updateExp(exp.id, 'endDate', formatYYYYMMToMMMYYYY(e.target.value))}
                                className="absolute right-0 top-0 bottom-0 w-8 opacity-0 cursor-pointer"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-500 mb-1">Roles, Accomplishments & Impact</label>
                      <textarea
                        rows={3}
                        placeholder="Detail critical duties, key technical domains navigated, and measurable achievements (e.g. Boosted SEO conversions by 31%). Use clear paragraphs or bullet line drafts."
                        value={exp.description}
                        onChange={(e) => updateExp(exp.id, 'description', e.target.value)}
                        className={`w-full px-3.5 py-2 text-sm text-slate-700 border rounded-lg outline-none transition-all placeholder:text-slate-400 resize-y ${
                          errors.experience?.[exp.id] ? 'border-red-400 focus:ring-red-100 focus:border-red-500' : 'border-slate-255 focus:border-indigo-500'
                        }`}
                      />
                      {errors.experience?.[exp.id] && (
                        <p className="text-[10px] text-red-500 font-mono mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.experience?.[exp.id]}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* EDUCATION STUDIES PANEL */}
        {activeSection === 'education' && (
          <div className="space-y-6" id="form-education">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-md flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-indigo-500" />
                Educational Credentials
              </h3>
              <button 
                id="btn-add-education"
                onClick={addEdu} 
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-sm font-semibold cursor-pointer flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Institution
              </button>
            </div>

            {data.education.length === 0 ? (
              <div className="text-center py-12 bg-slate-50 border border-dashed border-slate-100 rounded-xl">
                <GraduationCap className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <p className="text-sm text-slate-500">No education entries saved yet.</p>
                <button onClick={addEdu} className="mt-2 text-sm text-indigo-600 hover:underline cursor-pointer font-semibold">
                  Add academic detail
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {data.education.map((edu, index) => (
                  <div 
                    key={edu.id} 
                    className="p-4 border border-slate-200/80 bg-white rounded-xl shadow-xs space-y-4 relative group"
                  >
                    <div className="flex justify-between items-center bg-slate-50 p-2.5 -m-4 mb-1 rounded-t-xl border-b border-slate-100">
                      <span className="text-sm font-bold text-slate-700">Institution #{index + 1}</span>
                      <div className="flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => moveItemInArray('education', index, 'up')}
                          disabled={index === 0}
                          title="Move Up"
                          className="p-1 text-slate-400 hover:text-slate-700 hover:bg-white rounded transition-colors disabled:opacity-30 cursor-pointer"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => moveItemInArray('education', index, 'down')}
                          disabled={index === data.education.length - 1}
                          title="Move Down"
                          className="p-1 text-slate-400 hover:text-slate-700 hover:bg-white rounded transition-colors disabled:opacity-30 cursor-pointer"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => setDeleteConfirm({
                            title: 'Delete Education',
                            message: 'Are you sure you want to remove this education detail? This action cannot be undone.',
                            onConfirm: () => removeEdu(edu.id)
                          })}
                          title="Delete School"
                          className="p-1 text-red-400 hover:text-red-600 hover:bg-white rounded transition-colors cursor-pointer ml-1.5"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                      <div>
                        <label className="block text-sm font-medium text-slate-500 mb-1">School / University</label>
                        <input
                          type="text"
                          placeholder="e.g. Stanford University"
                          value={edu.institution}
                          onChange={(e) => updateEdu(edu.id, 'institution', e.target.value)}
                          className="w-full px-3.5 py-2 text-sm text-slate-700 border border-slate-250 rounded-lg outline-none focus:border-indigo-500 transition-all placeholder:text-slate-400"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-500 mb-1">Degree Received</label>
                        <input
                          type="text"
                          placeholder="e.g. Master of Science (B.S.)"
                          value={edu.degree}
                          onChange={(e) => updateEdu(edu.id, 'degree', e.target.value)}
                          className="w-full px-3.5 py-2 text-sm text-slate-700 border border-slate-250 rounded-lg outline-none focus:border-indigo-500 transition-all placeholder:text-slate-400"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-500 mb-1">Field of Study</label>
                        <input
                          type="text"
                          placeholder="e.g. Intelligent Systems / Computer Science"
                          value={edu.fieldOfStudy}
                          onChange={(e) => updateEdu(edu.id, 'fieldOfStudy', e.target.value)}
                          className="w-full px-3.5 py-2 text-sm text-slate-700 border border-slate-250 rounded-lg outline-none focus:border-indigo-500 transition-all placeholder:text-slate-400"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="block text-sm font-medium text-slate-500">Timeline dates</label>
                          <label className="flex items-center gap-1 text-[11px] font-medium text-slate-600 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={edu.currentlyStudying}
                              onChange={(e) => updateEdu(edu.id, 'currentlyStudying', e.target.checked)}
                              className="accent-indigo-600 rounded"
                            />
                            Currently Enrolled
                          </label>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="relative flex items-center w-full">
                            <input
                              type="text"
                              placeholder="Start (e.g. Sep 2021)"
                              value={edu.startDate}
                              onChange={(e) => updateEdu(edu.id, 'startDate', e.target.value)}
                              className="w-full px-3.5 pr-8 py-2 text-sm text-slate-700 border border-slate-250 rounded-lg outline-none focus:border-indigo-500 transition-all placeholder:text-slate-400"
                            />
                            <Calendar className="absolute right-2.5 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                            <input
                              type="month"
                              value={parseMMMYYYYToYYYYMM(edu.startDate)}
                              onChange={(e) => updateEdu(edu.id, 'startDate', formatYYYYMMToMMMYYYY(e.target.value))}
                              className="absolute right-0 top-0 bottom-0 w-8 opacity-0 cursor-pointer"
                            />
                          </div>
                          <div className="relative flex items-center w-full">
                            <input
                              type="text"
                              placeholder="End (e.g. Jun 2023)"
                              disabled={edu.currentlyStudying}
                              value={edu.currentlyStudying ? 'Present' : edu.endDate}
                              onChange={(e) => updateEdu(edu.id, 'endDate', e.target.value)}
                              className="w-full px-3.5 pr-8 py-2 text-sm text-slate-700 border border-slate-250 rounded-lg outline-none focus:border-indigo-500 transition-all placeholder:text-slate-400 disabled:bg-slate-50 disabled:text-slate-400"
                            />
                            {!edu.currentlyStudying && <Calendar className="absolute right-2.5 w-3.5 h-3.5 text-slate-400 pointer-events-none" />}
                            {!edu.currentlyStudying && (
                              <input
                                type="month"
                                value={parseMMMYYYYToYYYYMM(edu.endDate)}
                                onChange={(e) => updateEdu(edu.id, 'endDate', formatYYYYMMToMMMYYYY(e.target.value))}
                                className="absolute right-0 top-0 bottom-0 w-8 opacity-0 cursor-pointer"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-500 mb-1">Description / Honors / GPA</label>
                      <input
                        type="text"
                        placeholder="e.g. Graduated with Honors. Cumulative GPA: 3.91. Focus core: Cloud Infrastructure, AI Engines."
                        value={edu.description}
                        onChange={(e) => updateEdu(edu.id, 'description', e.target.value)}
                        className={`w-full px-3.5 py-2 text-sm text-slate-700 border rounded-lg outline-none transition-all placeholder:text-slate-400 ${
                          errors.education?.[edu.id] ? 'border-red-400 focus:ring-red-100 focus:border-red-500' : 'border-slate-250 focus:border-indigo-500'
                        }`}
                      />
                      {errors.education?.[edu.id] && (
                        <p className="text-[10px] text-red-500 font-mono mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.education?.[edu.id]}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SKILLS PANEL */}
        {activeSection === 'skills' && (
          <div className="space-y-6" id="form-skills">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-md flex items-center gap-2">
                <Wrench className="w-5 h-5 text-indigo-500" />
                Categorized Core Skills
              </h3>
              <button 
                id="btn-add-skill-category"
                onClick={addSkillCategory} 
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-sm font-semibold cursor-pointer flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Category Class
              </button>
            </div>

            {data.skills.length === 0 ? (
              <div className="text-center py-12 bg-slate-50 border border-dashed border-slate-100 rounded-xl">
                <Wrench className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <p className="text-sm text-slate-500">No skill categories configured.</p>
                <button onClick={addSkillCategory} className="mt-2 text-sm text-indigo-600 hover:underline cursor-pointer font-semibold">
                  Add technical group
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {data.skills.map((cat, catIdx) => {
                  const tempInputId = `skill-input-${cat.id}`;
                  return (
                    <div 
                      key={cat.id} 
                      className="p-4 border border-slate-205 bg-slate-50/50 rounded-xl space-y-3 relative group"
                    >
                      <div className="flex justify-between items-center">
                        <input
                          type="text"
                          value={cat.name}
                          onChange={(e) => updateSkillCategoryName(cat.id, e.target.value)}
                          className="font-bold text-sm text-slate-800 bg-transparent border-b border-transparent focus:border-slate-550 outline-none pb-0.5"
                          placeholder="Category Name (e.g. Languages)"
                        />
                        <button 
                          onClick={() => setDeleteConfirm({
                            title: 'Delete Category',
                            message: 'Are you sure you want to remove this skill category and all its skills? This action cannot be undone.',
                            onConfirm: () => removeSkillCategory(cat.id)
                          })}
                          title="Delete Category"
                          className="p-1 text-slate-400 hover:text-red-500 rounded transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Display skills tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {cat.skills && cat.skills.map((skill, sIdx) => (
                          <span 
                            key={sIdx} 
                            className="inline-flex items-center gap-1 px-2.5 py-0.5 text-sm font-medium bg-slate-900 text-white rounded-lg shadow-sm"
                          >
                            {skill}
                            <button 
                              onClick={() => removeSkillFromCategory(cat.id, sIdx)}
                              className="hover:bg-white/20 p-0.5 rounded cursor-pointer text-indigo-200"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>

                      {/* Add new skill inline input */}
                      <form 
                        onSubmit={(e) => {
                          e.preventDefault();
                          const inputEl = document.getElementById(tempInputId) as HTMLInputElement;
                          if (inputEl && inputEl.value.trim()) {
                            addSkillToCategory(cat.id, inputEl.value);
                            inputEl.value = '';
                          }
                        }}
                        className="flex gap-2"
                      >
                        <input
                          id={tempInputId}
                          type="text"
                          placeholder="Type tag (e.g., React) and hit Enter..."
                          className="flex-1 px-3 py-1.5 text-sm text-slate-700 bg-white border border-slate-200 rounded-lg outline-none focus:border-indigo-400 placeholder:text-slate-400"
                        />
                        <button 
                          type="submit"
                          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-semibold cursor-pointer"
                        >
                          Add Block
                        </button>
                      </form>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* PROJECTS PANEL */}
        {activeSection === 'projects' && (
          <div className="space-y-6" id="form-projects">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-md flex items-center gap-2">
                <FolderGit2 className="w-5 h-5 text-indigo-500" />
                Featured Creative & Technical Projects
              </h3>
              <button 
                id="btn-add-project"
                onClick={addProj} 
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-sm font-semibold cursor-pointer flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Project Model
              </button>
            </div>

            {data.projects.length === 0 ? (
              <div className="text-center py-12 bg-slate-50 border border-dashed border-slate-100 rounded-xl">
                <FolderGit2 className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <p className="text-sm text-slate-500">No project list logged yet.</p>
                <button onClick={addProj} className="mt-2 text-sm text-indigo-600 hover:underline cursor-pointer font-semibold">
                  Add custom portfolio project
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {data.projects.map((proj, index) => (
                  <div 
                    key={proj.id} 
                    className="p-4 border border-slate-200/80 bg-white rounded-xl shadow-xs space-y-4 relative group"
                  >
                    <div className="flex justify-between items-center bg-slate-50 p-2.5 -m-4 mb-1 rounded-t-xl border-b border-slate-100">
                      <span className="text-sm font-bold text-slate-700">Project #{index + 1}</span>
                      <div className="flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => moveItemInArray('projects', index, 'up')}
                          disabled={index === 0}
                          title="Move Up"
                          className="p-1 text-slate-400 hover:text-slate-700 hover:bg-white rounded transition-colors disabled:opacity-30 cursor-pointer"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => moveItemInArray('projects', index, 'down')}
                          disabled={index === data.projects.length - 1}
                          title="Move Down"
                          className="p-1 text-slate-400 hover:text-slate-700 hover:bg-white rounded transition-colors disabled:opacity-30 cursor-pointer"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => setDeleteConfirm({
                            title: 'Delete Project',
                            message: 'Are you sure you want to remove this project? This action cannot be undone.',
                            onConfirm: () => removeProj(proj.id)
                          })}
                          className="p-1 text-red-500 hover:bg-red-55 rounded cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                      <div>
                        <label className="block text-sm font-medium text-slate-500 mb-1">Project Title</label>
                        <input
                          type="text"
                          placeholder="e.g. Distributed Consensus Engine"
                          value={proj.title}
                          onChange={(e) => updateProj(proj.id, 'title', e.target.value)}
                          className="w-full px-3.5 py-2 text-sm text-slate-700 border border-slate-250 rounded-lg outline-none focus:border-indigo-500 transition-all placeholder:text-slate-400"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-500 mb-1">Your Role / Contributions</label>
                        <input
                          type="text"
                          placeholder="e.g. Solo Developer / Lead Architect"
                          value={proj.role}
                          onChange={(e) => updateProj(proj.id, 'role', e.target.value)}
                          className="w-full px-3.5 py-2 text-sm text-slate-700 border border-slate-250 rounded-lg outline-none focus:border-indigo-500 transition-all placeholder:text-slate-400"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-500 mb-1">Project Demo / URL Link</label>
                        <input
                          type="text"
                          placeholder="e.g. github.com/user/consensus-engine"
                          value={proj.link}
                          onChange={(e) => updateProj(proj.id, 'link', e.target.value)}
                          className="w-full px-3.5 py-2 text-sm text-slate-700 border border-slate-250 rounded-lg outline-none focus:border-indigo-500 transition-all placeholder:text-slate-400"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="block text-sm font-medium text-slate-500">Project Timeline</label>
                          <label className="flex items-center gap-1 text-[11px] font-medium text-slate-600 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={proj.isCurrent}
                              onChange={(e) => updateProj(proj.id, 'isCurrent', e.target.checked)}
                              className="accent-indigo-600 rounded"
                            />
                            Currently Working
                          </label>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <div className="relative flex items-center w-full">
                              <input
                                type="text"
                                placeholder="e.g. Jul 2023"
                                value={proj.startDate}
                                onChange={(e) => updateProj(proj.id, 'startDate', e.target.value)}
                                className="w-full px-3.5 pr-8 py-2 text-sm text-slate-700 border border-slate-250 rounded-lg outline-none focus:border-indigo-500 transition-all placeholder:text-slate-400"
                              />
                              <Calendar className="absolute right-2.5 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                              <input
                                type="month"
                                value={parseMMMYYYYToYYYYMM(proj.startDate)}
                                onChange={(e) => updateProj(proj.id, 'startDate', formatYYYYMMToMMMYYYY(e.target.value))}
                                className="absolute right-0 top-0 bottom-0 w-8 opacity-0 cursor-pointer"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="relative flex items-center w-full">
                              <input
                                type="text"
                                placeholder="e.g. Dec 2023"
                                disabled={proj.isCurrent}
                                value={proj.isCurrent ? 'Present' : proj.endDate}
                                onChange={(e) => updateProj(proj.id, 'endDate', e.target.value)}
                                className="w-full px-3.5 pr-8 py-2 text-sm text-slate-700 border border-slate-250 rounded-lg outline-none focus:border-indigo-500 transition-all placeholder:text-slate-400 disabled:bg-slate-50 disabled:text-slate-400"
                              />
                              {!proj.isCurrent && <Calendar className="absolute right-2.5 w-3.5 h-3.5 text-slate-400 pointer-events-none" />}
                              {!proj.isCurrent && (
                                <input
                                  type="month"
                                  value={parseMMMYYYYToYYYYMM(proj.endDate)}
                                  onChange={(e) => updateProj(proj.id, 'endDate', formatYYYYMMToMMMYYYY(e.target.value))}
                                  className="absolute right-0 top-0 bottom-0 w-8 opacity-0 cursor-pointer"
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-500 mb-1">Project Description & Core Scope</label>
                      <textarea
                        rows={3}
                        placeholder="Detail system architectures crafted, libraries utilized, performance improvements, and real accomplishments."
                        value={proj.description}
                        onChange={(e) => updateProj(proj.id, 'description', e.target.value)}
                        className={`w-full px-3.5 py-2 text-sm text-slate-700 border rounded-lg outline-none transition-all placeholder:text-slate-400 resize-y ${
                          errors.projects?.[proj.id] ? 'border-red-400 focus:ring-red-100 focus:border-red-500' : 'border-slate-255 focus:border-indigo-500'
                        }`}
                      />
                      {errors.projects?.[proj.id] && (
                        <p className="text-[10px] text-red-500 font-mono mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.projects?.[proj.id]}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* CERTIFICATIONS PANEL */}
        {activeSection === 'certifications' && (
          <div className="space-y-6" id="form-certifications">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-md flex items-center gap-2">
                <Award className="w-5 h-5 text-indigo-500" />
                Certifications & Achievements
              </h3>
              <button 
                id="btn-add-certification"
                onClick={addCert} 
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-sm font-semibold cursor-pointer flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Certificate
              </button>
            </div>

            {data.certifications.length === 0 ? (
              <div className="text-center py-12 bg-slate-50 border border-dashed border-slate-100 rounded-xl">
                <Award className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <p className="text-sm text-slate-500">No industry certificates recorded yet.</p>
                <button onClick={addCert} className="mt-2 text-sm text-indigo-600 hover:underline cursor-pointer font-semibold">
                  Log your credentials
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {data.certifications.map((cert) => (
                  <div 
                    key={cert.id} 
                    className="p-4 border border-slate-200/80 bg-white rounded-xl shadow-xs space-y-4 relative"
                  >
                    <div className="absolute right-3 top-3">
                      <button 
                        onClick={() => setDeleteConfirm({
                          title: 'Delete Certification',
                          message: 'Are you sure you want to remove this certification? This action cannot be undone.',
                          onConfirm: () => removeCert(cert.id)
                        })}
                        className="p-1 text-slate-400 hover:text-red-500 rounded transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-500 mb-1">Certification Name</label>
                        <input
                          type="text"
                          placeholder="e.g. AWS Certified Solutions Architect"
                          value={cert.name}
                          onChange={(e) => updateCert(cert.id, 'name', e.target.value)}
                          className={`w-full px-3.5 py-2 text-sm text-slate-700 border rounded-lg outline-none transition-all placeholder:text-slate-400 ${
                            errors.certifications?.[cert.id] ? 'border-red-400 focus:ring-red-100 focus:border-red-500' : 'border-slate-250 focus:border-indigo-500'
                          }`}
                        />
                        {errors.certifications?.[cert.id] && (
                          <p className="text-[10px] text-red-500 font-mono mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.certifications?.[cert.id]}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-500 mb-1">Issuing Authority / Issuer</label>
                        <input
                          type="text"
                          placeholder="e.g. Amazon Web Services (AWS)"
                          value={cert.issuer}
                          onChange={(e) => updateCert(cert.id, 'issuer', e.target.value)}
                          className="w-full px-3.5 py-2 text-sm text-slate-700 border border-slate-250 rounded-lg outline-none focus:border-indigo-500 transition-all placeholder:text-slate-400"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-500 mb-1">Issue Date</label>
                        <div className="relative flex items-center w-full">
                          <input
                            type="text"
                            placeholder="e.g. Nov 2024"
                            value={cert.date}
                            onChange={(e) => updateCert(cert.id, 'date', e.target.value)}
                            className="w-full px-3.5 pr-8 py-2 text-sm text-slate-700 border border-slate-250 rounded-lg outline-none focus:border-indigo-500 transition-all placeholder:text-slate-400"
                          />
                          <Calendar className="absolute right-2.5 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                          <input
                            type="month"
                            value={parseMMMYYYYToYYYYMM(cert.date)}
                            onChange={(e) => updateCert(cert.id, 'date', formatYYYYMMToMMMYYYY(e.target.value))}
                            className="absolute right-0 top-0 bottom-0 w-8 opacity-0 cursor-pointer"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-500 mb-1">Credential URL Link</label>
                        <input
                          type="text"
                          placeholder="e.g. credentials.com/verify-aws-102"
                          value={cert.link}
                          onChange={(e) => updateCert(cert.id, 'link', e.target.value)}
                          className="w-full px-3.5 py-2 text-sm text-slate-700 border border-slate-250 rounded-lg outline-none focus:border-indigo-500 transition-all placeholder:text-slate-400"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* AWARDS PANEL */}
        {activeSection === 'awards' && (
          <div className="space-y-6" id="form-awards">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-md flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                Awards
              </h3>
              <button 
                id="btn-add-award"
                onClick={addAward} 
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-sm font-semibold cursor-pointer flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Award
              </button>
            </div>

            {(data.awards || []).length === 0 ? (
              <div className="text-center py-12 bg-slate-50 border border-dashed border-slate-100 rounded-xl">
                <Trophy className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <p className="text-sm text-slate-500">No organizational awards recorded yet.</p>
                <button onClick={addAward} className="mt-2 text-sm text-indigo-600 hover:underline cursor-pointer font-semibold">
                  Log your awards
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {(data.awards || []).map((award) => (
                  <div 
                    key={award.id} 
                    className="p-4 border border-slate-200/80 bg-white rounded-xl shadow-xs space-y-4 relative"
                  >
                    <div className="absolute right-3 top-3">
                      <button 
                        onClick={() => setDeleteConfirm({
                          title: 'Delete Award',
                          message: 'Are you sure you want to remove this award? This action cannot be undone.',
                          onConfirm: () => removeAward(award.id)
                        })}
                        className="p-1 text-slate-400 hover:text-red-500 rounded transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-500 mb-1">Award Title</label>
                        <input
                          type="text"
                          placeholder="e.g. Employee of the Month"
                          value={award.name}
                          onChange={(e) => updateAward(award.id, 'name', e.target.value)}
                          className={`w-full px-3.5 py-2 text-sm text-slate-700 border rounded-lg outline-none transition-all placeholder:text-slate-400 ${
                            errors.awards?.[award.id] ? 'border-red-400 focus:ring-red-100 focus:border-red-500' : 'border-slate-250 focus:border-indigo-500'
                          }`}
                        />
                        {errors.awards?.[award.id] && (
                          <p className="text-[10px] text-red-500 font-mono mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.awards?.[award.id]}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-500 mb-1">Issuing Organization</label>
                        <input
                          type="text"
                          placeholder="e.g. HashiCorp"
                          value={award.issuer}
                          onChange={(e) => updateAward(award.id, 'issuer', e.target.value)}
                          className="w-full px-3.5 py-2 text-sm text-slate-700 border border-slate-250 rounded-lg outline-none focus:border-indigo-500 transition-all placeholder:text-slate-400"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-500 mb-1">Date Received</label>
                        <div className="relative flex items-center w-full">
                          <input
                            type="text"
                            placeholder="e.g. Oct 2021"
                            value={award.date}
                            onChange={(e) => updateAward(award.id, 'date', e.target.value)}
                            className="w-full px-3.5 pr-8 py-2 text-sm text-slate-700 border border-slate-250 rounded-lg outline-none focus:border-indigo-500 transition-all placeholder:text-slate-400"
                          />
                          <Calendar className="absolute right-2.5 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                          <input
                            type="month"
                            value={parseMMMYYYYToYYYYMM(award.date)}
                            onChange={(e) => updateAward(award.id, 'date', formatYYYYMMToMMMYYYY(e.target.value))}
                            className="absolute right-0 top-0 bottom-0 w-8 opacity-0 cursor-pointer"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-500 mb-1">Verification Link</label>
                        <input
                          type="text"
                          placeholder="e.g. credentials.com/verify-award-102"
                          value={award.link}
                          onChange={(e) => updateAward(award.id, 'link', e.target.value)}
                          className="w-full px-3.5 py-2 text-sm text-slate-700 border border-slate-250 rounded-lg outline-none focus:border-indigo-500 transition-all placeholder:text-slate-400"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ACHIEVEMENTS PANEL */}
        {activeSection === 'achievements' && (
          <div className="space-y-6" id="form-achievements">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-md flex items-center gap-2">
                <Star className="w-5 h-5 text-orange-500" />
                Achievements
              </h3>
              <button 
                id="btn-add-achievement"
                onClick={addAchievement} 
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-sm font-semibold cursor-pointer flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Achievement
              </button>
            </div>

            {(data.achievements || []).length === 0 ? (
              <div className="text-center py-12 bg-slate-50 border border-dashed border-slate-100 rounded-xl">
                <Star className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <p className="text-sm text-slate-500">No key milestones recorded yet.</p>
                <button onClick={addAchievement} className="mt-2 text-sm text-indigo-600 hover:underline cursor-pointer font-semibold">
                  Record what you achieved
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {(data.achievements || []).map((ach) => (
                  <div 
                    key={ach.id} 
                    className="p-4 border border-slate-200/80 bg-white rounded-xl shadow-xs space-y-4 relative"
                  >
                    <div className="absolute right-3 top-3">
                      <button 
                        onClick={() => setDeleteConfirm({
                          title: 'Delete Achievement',
                          message: 'Are you sure you want to remove this achievement? This action cannot be undone.',
                          onConfirm: () => removeAchievement(ach.id)
                        })}
                        className="p-1 text-slate-400 hover:text-red-500 rounded transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Full span name input so it's spacious */}
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-slate-500 mb-1">Achievement Description</label>
                        <input
                          type="text"
                          placeholder="e.g. Secured first place in AWS Global Cluster Scaling Hackathon"
                          value={ach.name}
                          onChange={(e) => updateAchievement(ach.id, 'name', e.target.value)}
                          className={`w-full px-3.5 py-2 text-sm text-slate-700 border rounded-lg outline-none transition-all placeholder:text-slate-400 ${
                            errors.achievements?.[ach.id] ? 'border-red-400 focus:ring-red-100 focus:border-red-500' : 'border-slate-250 focus:border-indigo-500'
                          }`}
                        />
                        {errors.achievements?.[ach.id] && (
                          <p className="text-[10px] text-red-500 font-mono mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.achievements?.[ach.id]}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-500 mb-1">Date Achieved / Recorded</label>
                        <div className="relative flex items-center w-full">
                          <input
                            type="text"
                            placeholder="e.g. Nov 2022"
                            value={ach.date}
                            onChange={(e) => updateAchievement(ach.id, 'date', e.target.value)}
                            className="w-full px-3.5 pr-8 py-2 text-sm text-slate-700 border border-slate-250 rounded-lg outline-none focus:border-indigo-500 transition-all placeholder:text-slate-450"
                          />
                          <Calendar className="absolute right-2.5 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                          <input
                            type="month"
                            value={parseMMMYYYYToYYYYMM(ach.date)}
                            onChange={(e) => updateAchievement(ach.id, 'date', formatYYYYMMToMMMYYYY(e.target.value))}
                            className="absolute right-0 top-0 bottom-0 w-8 opacity-0 cursor-pointer"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-500 mb-1">Reference Link (Optional)</label>
                        <input
                          type="text"
                          placeholder="e.g. github.com/your-repo"
                          value={ach.link}
                          onChange={(e) => updateAchievement(ach.id, 'link', e.target.value)}
                          className="w-full px-3.5 py-2 text-sm text-slate-700 border border-slate-250 rounded-lg outline-none focus:border-indigo-500 transition-all placeholder:text-slate-400"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* LANGUAGES PANEL */}
        {activeSection === 'languages' && (
          <div className="space-y-6" id="form-languages">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-md flex items-center gap-2">
                <Globe className="w-5 h-5 text-indigo-500" />
                Spoken Languages & Proficiency
              </h3>
              <button 
                id="btn-add-language"
                onClick={addLang} 
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-sm font-semibold cursor-pointer flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Language
              </button>
            </div>

            {data.languages.length === 0 ? (
              <div className="text-center py-12 bg-slate-50 border border-dashed border-slate-100 rounded-xl">
                <Globe className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <p className="text-sm text-slate-500">No language data configured.</p>
                <button onClick={addLang} className="mt-2 text-sm text-indigo-600 hover:underline cursor-pointer font-semibold">
                  Add language detail
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.languages.map((lang) => (
                  <div 
                    key={lang.id} 
                    className="p-4 border border-slate-200/80 bg-white rounded-xl shadow-xs space-y-3 relative flex items-center gap-3 justify-between"
                  >
                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        placeholder="Language name (e.g. Spanish)"
                        value={lang.name}
                        onChange={(e) => updateLang(lang.id, 'name', e.target.value)}
                        className="w-full px-3 py-1.5 text-sm text-slate-700 bg-transparent border-b border-transparent focus:border-slate-300 outline-none placeholder:text-slate-400 font-bold"
                      />
                      <select
                        value={lang.proficiency}
                        onChange={(e) => updateLang(lang.id, 'proficiency', e.target.value)}
                        className="w-full text-sm text-slate-600 bg-white border border-slate-200 rounded px-2 py-1 outline-none font-mono"
                      >
                        <option value="Native">Native Speaker</option>
                        <option value="Fluent">Fully Fluent</option>
                        <option value="Professional">Professional Competency</option>
                        <option value="Conversational">Conversational Level</option>
                        <option value="Basic">Elementary knowledge</option>
                      </select>
                    </div>

                    <button 
                      onClick={() => setDeleteConfirm({
                        title: 'Delete Language',
                        message: 'Are you sure you want to remove this language? This action cannot be undone.',
                        onConfirm: () => removeLang(lang.id)
                      })}
                      className="p-1.5 text-slate-400 hover:text-red-500 bg-slate-50 rounded"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ATS CHECKER PANEL */}
        {activeSection === 'ats' && (() => {
          const { score, items } = scanATS();
          
          let scoreBg = 'bg-red-50 text-red-700 border-red-200';
          let scoreText = 'Needs Attention';
          let ringColor = 'border-red-500';
          if (score > 80) {
            scoreBg = 'bg-emerald-50 text-emerald-700 border-emerald-200';
            scoreText = 'Highly ATS Compliant';
            ringColor = 'border-emerald-500';
          } else if (score > 50) {
            scoreBg = 'bg-amber-50 text-amber-700 border-amber-200';
            scoreText = 'Good Compatibility';
            ringColor = 'border-amber-500';
          }

          const fixableItems = items.filter(item => item.fixable);

          return (
            <div className="space-y-6" id="form-ats-scanner">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-4">
                <h3 className="font-bold text-slate-900 text-md flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-500" />
                  ATS Compliance Scanner
                </h3>
                {fixableItems.length > 0 && (
                  <button
                    id="btn-ats-fix-all"
                    onClick={() => autoFixCompliance('all')}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold cursor-pointer flex items-center gap-1.5 shadow-sm transition-all animate-pulse"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    One-Click Fix All
                  </button>
                )}
              </div>

              {/* Score card summary widget */}
              <div className={`p-5 rounded-2xl border ${scoreBg} flex flex-col sm:flex-row items-center gap-6 shadow-xs`}>
                <div className={`w-20 h-20 rounded-full border-4 ${ringColor} flex flex-col items-center justify-center bg-white shadow-inner font-mono shrink-0`}>
                  <span className="text-xl font-bold font-mono text-slate-800">{score}</span>
                  <span className="text-[9px] text-slate-400 -mt-1 font-mono">/ 100</span>
                </div>
                <div className="text-center sm:text-left space-y-1">
                  <h4 className="font-bold text-slate-900 text-lg">{scoreText}</h4>
                  <p className="text-sm text-slate-600 leading-relaxed max-w-xl">
                    Applicant Tracking Systems (ATS) automatically scan, grade, and extract data from your resume document. 
                    Meeting these formatting markers ensures maximum readability and accurate keyword ingestion.
                  </p>
                </div>
              </div>

              {/* Items checklist */}
              <div className="space-y-4">
                <h4 className="font-semibold text-sm text-slate-400 uppercase tracking-wider font-mono">Scanner Checklist Results</h4>
                <div className="space-y-3">
                  {items.map((item, id) => (
                    <div 
                      key={id} 
                      className={`p-4 border rounded-xl flex items-start gap-3.5 justify-between transition-all duration-200 ${
                        item.status === 'pass' 
                          ? 'bg-slate-50/55 border-slate-100/80 hover:border-slate-200/50' 
                          : item.status === 'warning' 
                          ? 'bg-amber-50/20 border-amber-100/80 hover:border-amber-200/50' 
                          : 'bg-red-50/25 border-red-100/80 hover:border-red-200/50'
                      }`}
                    >
                      <div className="flex gap-3 items-start flex-1">
                        <div className="mt-0.5 shrink-0">
                          {item.status === 'pass' ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-50" />
                          ) : (
                            <AlertCircle className={`w-4 h-4 ${item.status === 'warning' ? 'text-amber-500' : 'text-red-500'}`} />
                          )}
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-bold text-slate-800">{item.text}</p>
                          <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>

                      {item.fixable && item.fixType && (
                        <button
                          onClick={() => autoFixCompliance(item.fixType!)}
                          className="px-2.5 py-1 text-[11px] font-semibold text-indigo-600 bg-indigo-50 border border-indigo-100 hover:bg-indigo-100 hover:text-indigo-700 rounded-md transition-all shrink-0 cursor-pointer"
                        >
                          Auto-Fix
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Standard ATS guidelines notice */}
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-sm text-slate-500 space-y-2">
                <h5 className="font-bold text-slate-700">💡 Professional Guidelines:</h5>
                <ul className="list-disc list-inside space-y-1 leading-relaxed">
                  <li>Use the <strong className="text-indigo-600">ATS Optimized (Single Column)</strong> layout preset for full mechanical compliance.</li>
                  <li>Incorporate concrete keyword phrases directly from your target job description.</li>
                  <li>Spell out common acronyms initially, e.g., "Search Engine Optimization (SEO)".</li>
                  <li>Provide absolute dates (e.g. "Jun 2024") instead of colloquial statements ("present semester").</li>
                </ul>
              </div>
            </div>
          );
        })()}

      </div>

      {/* Delete Confirmation Modal for ResumeForm Items */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 animate-in fade-in zoom-in duration-200">
            <h3 className="text-xl font-bold text-slate-900 mb-2">{deleteConfirm.title}</h3>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">
              {deleteConfirm.message}
            </p>
            <div className="flex gap-3 justify-end mt-2">
              <button 
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer text-sm"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  deleteConfirm.onConfirm();
                  setDeleteConfirm(null);
                }}
                className="px-4 py-2 font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm transition-colors cursor-pointer text-sm flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
