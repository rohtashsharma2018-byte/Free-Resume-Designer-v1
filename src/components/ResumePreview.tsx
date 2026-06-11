import React from 'react';
import { 
  Phone, Mail, MapPin, Linkedin, Github, Globe, GraduationCap, 
  Briefcase, Award, Sparkles, BookOpen, User, Wrench, Languages 
} from 'lucide-react';
import { ResumeData } from '../types';

interface ResumePreviewProps {
  data: ResumeData;
  zoom?: number; // scale percent e.g., 0.8, 1.0, 1.2
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ data, zoom = 1.0 }) => {
  const {
    personalInfo,
    education,
    experience,
    skills,
    projects,
    certifications,
    awards = [],
    achievements = [],
    languages,
    templateId,
    primaryColor,
    fontSize,
    fontFamily,
  } = data;

  // Determine standard font family-classes
  const fontClass = 
    fontFamily === 'serif' ? 'font-serif' : 
    fontFamily === 'mono' ? 'font-mono' : 
    fontFamily === 'display' ? 'font-sans tracking-tight' : 'font-sans';

  // Determine standard base font sizes
  const fontSizeClass = 
    fontSize === 'sm' ? 'text-xs' : 
    fontSize === 'lg' ? 'text-base' : 'text-sm';

  const headingFontSizeClass = 
    fontSize === 'sm' ? 'text-base' : 
    fontSize === 'lg' ? 'text-xl' : 'text-lg';

  const nameSizeClass = 
    fontSize === 'sm' ? 'text-2xl' : 
    fontSize === 'lg' ? 'text-4xl' : 'text-3xl';

  // Custom style for tracking dynamic primary color
  const colorStyle = { color: primaryColor };
  const bgStyle = { backgroundColor: primaryColor };
  const borderStyle = { borderColor: primaryColor };

  // Helper to determine text brightness on dynamic colors
  const isColorDark = (hexcolor: string) => {
    if (!hexcolor.startsWith('#')) return true;
    const r = parseInt(hexcolor.substring(1, 3), 16);
    const g = parseInt(hexcolor.substring(3, 5), 16);
    const b = parseInt(hexcolor.substring(5, 7), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq < 128; // returns true if dark color
  };

  const textOnAccentClass = isColorDark(primaryColor) ? 'text-white' : 'text-slate-900';

  // Render Personal Info Header
  const renderHeader = () => {
    switch (templateId) {
      case 'ats-optimized':
        return (
          <div className="p-8 text-center border-b border-slate-300" id="preview-header-ats">
            <h1 className="font-sans font-bold tracking-wide uppercase text-2xl text-slate-900">
              {personalInfo.fullName || 'Your Name'}
            </h1>
            {personalInfo.jobTitle && (
              <p className="text-sm font-semibold tracking-wider text-slate-600 uppercase mt-1">
                {personalInfo.jobTitle}
              </p>
            )}
            
            <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 mt-3 text-xs text-slate-700 font-sans">
              {personalInfo.email && <span className="hover:text-slate-900">Email: {personalInfo.email}</span>}
              {personalInfo.phone && <span> | Phone: {personalInfo.phone}</span>}
              {personalInfo.location && <span> | Location: {personalInfo.location}</span>}
              {personalInfo.nationality && <span> | Nationality: {personalInfo.nationality}</span>}
              {personalInfo.gender && <span> | Gender: {personalInfo.gender}</span>}
              {personalInfo.website && <span> | Web: {personalInfo.website}</span>}
              {personalInfo.linkedin && <span> | LinkedIn: {personalInfo.linkedin}</span>}
              {personalInfo.github && <span> | GitHub: {personalInfo.github}</span>}
            </div>
            
            {personalInfo.bio && (
              <p className="mt-4 text-slate-600 text-sm max-w-2xl mx-auto leading-relaxed border-t border-slate-100 pt-3">
                {personalInfo.bio}
              </p>
            )}
          </div>
        );

      case 'creative-bold':
        return (
          <div 
            style={bgStyle} 
            className={`p-8 rounded-t-xl ${textOnAccentClass} transition-all duration-300 relative overflow-hidden`}
            id="preview-header-creative"
          >
            <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
            <div className="flex flex-row items-center gap-6 z-10 relative">
              {personalInfo.photoUrl && (
                <img 
                  src={personalInfo.photoUrl} 
                  alt={personalInfo.fullName} 
                  className="w-24 h-24 rounded-full border-4 border-white/20 object-cover shadow-md shrink-0"
                  referrerPolicy="no-referrer"
                />
              )}
              <div className="text-left flex-1">
                <h1 className={`font-extrabold ${nameSizeClass} tracking-tight`}>
                  {personalInfo.fullName || 'Your Name'}
                </h1>
                <p className="text-lg font-medium opacity-90 mt-1">
                  {personalInfo.jobTitle || 'Desired Professional Position'}
                </p>
                
                <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4 text-xs opacity-85 justify-start font-mono">
                  {personalInfo.email && <span className="flex items-center gap-1">{personalInfo.email}</span>}
                  {personalInfo.phone && <span className="flex items-center gap-1">{personalInfo.phone}</span>}
                  {personalInfo.location && <span className="flex items-center gap-1">{personalInfo.location}</span>}
                  {personalInfo.nationality && <span className="flex items-center gap-1">{personalInfo.nationality}</span>}
                  {personalInfo.gender && <span className="flex items-center gap-1">{personalInfo.gender}</span>}
                  {personalInfo.website && <span className="flex items-center gap-1">{personalInfo.website}</span>}
                  {personalInfo.linkedin && <span className="flex items-center gap-1">in/ {personalInfo.linkedin}</span>}
                  {personalInfo.github && <span className="flex items-center gap-1">git/ {personalInfo.github}</span>}
                </div>
              </div>
            </div>
            {personalInfo.bio && (
              <p className="mt-4 text-sm opacity-90 leading-relaxed border-t border-white/15 pt-4 text-left">
                {personalInfo.bio}
              </p>
            )}
          </div>
        );

      case 'classic-professional':
        return (
          <div className="p-8 text-center border-b-4" style={borderStyle} id="preview-header-classic">
            {personalInfo.photoUrl && (
              <div className="flex justify-center mb-4">
                <img 
                  src={personalInfo.photoUrl} 
                  alt={personalInfo.fullName} 
                  className="w-24 h-24 rounded-full border shadow-sm object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}
            <h1 className={`font-serif font-bold tracking-wide uppercase ${nameSizeClass} text-slate-800`}>
              {personalInfo.fullName || 'Your Name'}
            </h1>
            <p className="text-md font-semibold tracking-wider text-slate-600 uppercase mt-1">
              {personalInfo.jobTitle || 'Desired Professional Position'}
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mt-3 text-xs text-slate-500 font-mono">
              {personalInfo.email && <span>{personalInfo.email}</span>}
              {personalInfo.phone && <span>{personalInfo.phone}</span>}
              {personalInfo.location && <span>{personalInfo.location}</span>}
              {personalInfo.nationality && <span>{personalInfo.nationality}</span>}
              {personalInfo.gender && <span>{personalInfo.gender}</span>}
              {personalInfo.website && <span>{personalInfo.website}</span>}
              {personalInfo.linkedin && <span>in/ {personalInfo.linkedin}</span>}
              {personalInfo.github && <span>git/ {personalInfo.github}</span>}
            </div>
            
            {personalInfo.bio && (
              <p className="mt-4 text-slate-600 italic text-sm max-w-2xl mx-auto leading-relaxed">
                "{personalInfo.bio}"
              </p>
            )}
          </div>
        );

      case 'executive-premium':
        return (
          <div className="p-8 bg-slate-50 border-b border-slate-200" id="preview-header-executive">
            <div className="flex flex-row justify-between items-start gap-6">
              <div className="flex items-center gap-5">
                {personalInfo.photoUrl && (
                  <img 
                    src={personalInfo.photoUrl} 
                    alt={personalInfo.fullName} 
                    className="w-20 h-20 rounded-lg object-cover shadow-sm border border-slate-200 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                )}
                <div>
                  <h1 className="font-semibold text-3xl text-slate-950 uppercase tracking-widest">
                    {personalInfo.fullName || 'Your Name'}
                  </h1>
                  <p className="text-sm font-medium tracking-widest uppercase mt-1" style={colorStyle}>
                    {personalInfo.jobTitle || 'EXECUTIVE LEADERSHIP'}
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col gap-1 text-xs text-slate-600 text-right font-mono shrink-0">
                {personalInfo.email && <div>{personalInfo.email}</div>}
                {personalInfo.phone && <div>{personalInfo.phone}</div>}
                {personalInfo.location && <div>{personalInfo.location}</div>}
                {personalInfo.nationality && <div>{personalInfo.nationality}</div>}
                {personalInfo.gender && <div>{personalInfo.gender}</div>}
                {personalInfo.website && <div>{personalInfo.website}</div>}
                {personalInfo.linkedin && <div>in/ {personalInfo.linkedin}</div>}
                {personalInfo.github && <div>git/ {personalInfo.github}</div>}
              </div>
            </div>
            
            {personalInfo.bio && (
              <div className="mt-4 border-l-2 pl-4 py-1 text-slate-700 text-sm max-w-4xl italic" style={borderStyle}>
                {personalInfo.bio}
              </div>
            )}
          </div>
        );

      case 'academic-technical':
        return (
          <div className="p-8 border-b border-slate-300 flex flex-row justify-between items-start gap-4" id="preview-header-academic">
            <div>
              <h1 className="font-bold text-3xl tracking-tight text-slate-900 font-mono">
                {personalInfo.fullName || 'Your Name'}
              </h1>
              <p className="text-md font-mono mt-1 text-slate-700">
                {personalInfo.jobTitle || 'Researcher / Technical Consultant'}
              </p>
              {personalInfo.bio && (
                <p className="mt-3 text-slate-600 text-sm max-w-xl leading-relaxed">
                  {personalInfo.bio}
                </p>
              )}
            </div>
            
            <div className="text-xs text-slate-600 space-y-1 font-mono text-right shrink-0">
              {personalInfo.email && <div>Email: {personalInfo.email}</div>}
              {personalInfo.phone && <div>Phone: {personalInfo.phone}</div>}
              {personalInfo.location && <div>Location: {personalInfo.location}</div>}
              {personalInfo.nationality && <div>Nationality: {personalInfo.nationality}</div>}
              {personalInfo.gender && <div>Gender: {personalInfo.gender}</div>}
              {personalInfo.website && <div>Web: {personalInfo.website}</div>}
              {personalInfo.linkedin && <div>LinkedIn: {personalInfo.linkedin}</div>}
              {personalInfo.github && <div>GitHub: {personalInfo.github}</div>}
            </div>
          </div>
        );

      case 'template-two-colum-1':
        return null;

      case 'modern-minimal':
      default:
        return (
          <div className="p-8 flex flex-row gap-6 items-start justify-between border-b border-slate-100" id="preview-header-minimal">
            <div className="flex items-center gap-5">
              {personalInfo.photoUrl && (
                <img 
                  src={personalInfo.photoUrl} 
                  alt={personalInfo.fullName} 
                  className="w-20 h-20 rounded-full object-cover border border-slate-100 shadow-sm shrink-0"
                  referrerPolicy="no-referrer"
                />
              )}
              <div>
                <h1 className="font-extrabold text-3xl text-slate-900 tracking-tight">
                  {personalInfo.fullName || 'Your Name'}
                </h1>
                <p className="text-sm font-semibold tracking-wide uppercase mt-1" style={colorStyle}>
                  {personalInfo.jobTitle || 'Your Profession'}
                </p>
                {personalInfo.bio && (
                  <p className="mt-3 text-slate-600 text-sm max-w-xl leading-relaxed">
                    {personalInfo.bio}
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex flex-col gap-1 text-xs text-slate-500 text-right font-sans shrink-0">
              {personalInfo.email && <span>{personalInfo.email}</span>}
              {personalInfo.phone && <span>{personalInfo.phone}</span>}
              {personalInfo.location && <span>{personalInfo.location}</span>}
              {personalInfo.nationality && <span>{personalInfo.nationality}</span>}
              {personalInfo.gender && <span>{personalInfo.gender}</span>}
              {personalInfo.website && <span>{personalInfo.website}</span>}
              {personalInfo.linkedin && <span>in/ {personalInfo.linkedin}</span>}
              {personalInfo.github && <span>git/ {personalInfo.github}</span>}
            </div>
          </div>
        );
    }
  };

  // Section Heading Builder
  const renderSectionHeader = (title: string, onDark?: boolean) => {
    return (
      <div className="mb-4 mt-2">
        <h2 
          className={`font-bold tracking-wide uppercase ${headingFontSizeClass} border-b pb-1 flex items-center justify-between`}
          style={onDark ? { color: '#ffffff', borderBottomColor: '#ffffff' } : { ...colorStyle, borderBottomColor: primaryColor }}
        >
          {title}
        </h2>
      </div>
    );
  };

  // Render Experience Area
  const renderExperienceSection = () => {
    if (!experience || experience.length === 0) return null;
    return (
      <div className="mb-6" id="preview-section-experience">
        {renderSectionHeader('Experience')}
        <div className="space-y-4">
          {experience.map((exp) => (
            <div key={exp.id} className="transition-all hover:bg-slate-50/50 p-1 rounded-sm">
              <div className="flex justify-between items-baseline flex-wrap">
                <h3 className="font-bold text-slate-900">{exp.position}</h3>
                <span className="text-xs font-mono font-bold text-slate-500">
                  {exp.startDate} – {exp.currentlyWorking ? 'Present' : exp.endDate}
                </span>
              </div>
              <div className="flex justify-between items-baseline text-xs text-slate-700 font-medium">
                <span>{exp.company}{exp.location ? `, ${exp.location}` : ''}</span>
              </div>
              {exp.description && (
                <p className="mt-2 text-xs text-slate-600 leading-relaxed whitespace-pre-line">
                  {exp.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render Education Area
  const renderEducationSection = () => {
    if (!education || education.length === 0) return null;
    return (
      <div className="mb-6" id="preview-section-education">
        {renderSectionHeader('Education')}
        <div className="space-y-4">
          {education.map((edu) => (
            <div key={edu.id} className="transition-all hover:bg-slate-50/50 p-1 rounded-sm">
              <div className="flex justify-between items-baseline flex-wrap">
                <h3 className="font-bold text-slate-900">
                  {edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}
                </h3>
                <span className="text-xs font-mono font-bold text-slate-500">
                  {edu.startDate} – {edu.currentlyStudying ? 'Present' : edu.endDate}
                </span>
              </div>
              <div className="text-xs text-slate-700 font-medium">{edu.institution}{edu.location ? `, ${edu.location}` : ''}</div>
              {edu.description && (
                <p className="mt-1.5 text-xs text-slate-600 leading-relaxed whitespace-pre-line">
                  {edu.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render Projects Area
  const renderProjectsSection = () => {
    if (!projects || projects.length === 0) return null;
    return (
      <div className="mb-6" id="preview-section-projects">
        {renderSectionHeader('Projects')}
        <div className="space-y-4">
          {projects.map((proj) => (
            <div key={proj.id} className="transition-all hover:bg-slate-50/50 p-1 rounded-sm">
              <div className="flex justify-between items-baseline flex-wrap">
                <h3 className="font-bold text-slate-900">{proj.title}</h3>
                <span className="text-xs font-mono font-bold text-slate-500">
                  {proj.startDate} – {proj.isCurrent ? 'Present' : proj.endDate}
                </span>
              </div>
              <div className="flex justify-between items-baseline text-xs text-slate-700 font-medium">
                <span>{proj.role}</span>
                {proj.link && (
                  <a href={proj.link} target="_blank" rel="noopener noreferrer" className="hover:underline transition-all text-xs" style={colorStyle}>
                    Link
                  </a>
                )}
              </div>
              {proj.description && (
                <p className="mt-2 text-xs text-slate-600 leading-relaxed whitespace-pre-line">
                  {proj.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render Skills Area
  const renderSkillsSection = (onDark?: boolean) => {
    const validSkills = skills.filter((cat) => cat.skills && cat.skills.length > 0);
    if (validSkills.length === 0) return null;

    return (
      <div className="mb-6" id="preview-section-skills">
        {renderSectionHeader('Skills', onDark)}
        <div className="space-y-3">
          {validSkills.map((cat) => (
            <div key={cat.id} className="p-1">
              <h4 className={`text-xs font-bold uppercase tracking-wider mb-1.5 ${onDark ? 'text-blue-100' : 'text-slate-800'}`}>{cat.name}</h4>
              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((skill, sIdx) => (
                  <span 
                    key={sIdx} 
                    className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${onDark ? 'bg-white/15 text-white border border-white/25 shadow-none' : 'bg-slate-100 text-slate-700 border border-slate-200 shadow-sm'}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render Certifications Area
  const renderCertificationsSection = (onDark?: boolean) => {
    if (!certifications || certifications.length === 0) return null;
    return (
      <div className="mb-6" id="preview-section-certifications">
        {renderSectionHeader('Certifications', onDark)}
        <div className="space-y-3">
          {certifications.map((cert) => (
            <div key={cert.id} className={`text-xs transition-all ${onDark ? 'hover:bg-white/10' : 'hover:bg-slate-50/50'} p-1 rounded-sm`}>
              <div className="flex justify-between items-baseline">
                <span className={`font-bold ${onDark ? 'text-white' : 'text-slate-900'}`}>{cert.name}</span>
                <span className={`text-xs font-mono font-bold ${onDark ? 'text-slate-300' : 'text-slate-500'}`}>{cert.date}</span>
              </div>
              <div className={`flex justify-between items-baseline ${onDark ? 'text-slate-200' : 'text-slate-600'} mt-0.5`}>
                <span>{cert.issuer}</span>
                {cert.link && (
                  <a href={cert.link} target="_blank" rel="noopener noreferrer" className="hover:underline opacity-80" style={onDark ? { color: '#60a5fa' } : colorStyle}>
                    Verify
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render Awards Area
  const renderAwardsSection = (onDark?: boolean) => {
    if (!awards || awards.length === 0) return null;
    return (
      <div className="mb-6" id="preview-section-awards">
        {renderSectionHeader('Awards', onDark)}
        <div className="space-y-3">
          {awards.map((award) => (
            <div key={award.id} className={`text-xs transition-all ${onDark ? 'hover:bg-white/10' : 'hover:bg-slate-50/50'} p-1 rounded-sm`}>
              <div className="flex justify-between items-baseline">
                <span className={`font-bold ${onDark ? 'text-white' : 'text-slate-900'}`}>{award.name}</span>
                <span className={`text-xs font-mono font-bold ${onDark ? 'text-slate-300' : 'text-slate-500'}`}>{award.date}</span>
              </div>
              <div className={`flex justify-between items-baseline ${onDark ? 'text-slate-200' : 'text-slate-600'} mt-0.5`}>
                <span>{award.issuer}</span>
                {award.link && (
                  <a href={award.link} target="_blank" rel="noopener noreferrer" className="hover:underline opacity-80" style={onDark ? { color: '#60a5fa' } : colorStyle}>
                    Link
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render Achievements Area
  const renderAchievementsSection = (onDark?: boolean) => {
    if (!achievements || achievements.length === 0) return null;
    return (
      <div className="mb-6" id="preview-section-achievements">
        {renderSectionHeader('Achievements', onDark)}
        <div className="space-y-3">
          {achievements.map((ach) => (
            <div key={ach.id} className={`text-xs transition-all ${onDark ? 'hover:bg-white/10' : 'hover:bg-slate-50/50'} p-1 rounded-sm`}>
              <div className="flex justify-between items-baseline">
                <span className={`font-bold ${onDark ? 'text-white' : 'text-slate-900'}`}>{ach.name}</span>
                <span className={`text-xs font-mono font-bold ${onDark ? 'text-slate-300' : 'text-slate-500'}`}>{ach.date}</span>
              </div>
              {ach.link && (
                <div className="flex justify-end mt-0.5">
                  <a href={ach.link} target="_blank" rel="noopener noreferrer" className="hover:underline opacity-80" style={onDark ? { color: '#60a5fa' } : colorStyle}>
                    Link
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render Languages Area
  const renderLanguagesSection = (onDark?: boolean) => {
    if (!languages || languages.length === 0) return null;
    return (
      <div className="mb-6" id="preview-section-languages">
        {renderSectionHeader('Languages', onDark)}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2">
          {languages.map((lang) => (
            <div key={lang.id} className={`flex justify-between items-baseline border-b border-dashed ${onDark ? 'border-white/20' : 'border-slate-200'} pb-1 text-xs`}>
              <span className={`font-semibold ${onDark ? 'text-white' : 'text-slate-800'}`}>{lang.name}</span>
              <span className={`${onDark ? 'text-slate-300' : 'text-slate-500'} font-medium font-mono`}>{lang.proficiency}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const useTwoColumn = templateId === 'modern-minimal' || templateId === 'executive-premium';

  return (
    <div 
      className="bg-white text-slate-800 shadow-xl mx-auto rounded-xl border border-slate-200 overflow-hidden select-none transition-transform duration-200 shrink-0"
      style={{
        width: '210mm',
        minWidth: '210mm',
        minHeight: '297mm', // Exact A4 aspect ratio representation
        transform: `scale(${zoom})`,
        transformOrigin: 'top center',
        marginBottom: `calc(297mm * ${zoom - 1})`, // offset space
        marginRight: `calc(210mm * ${zoom - 1} / 2)`,
        marginLeft: `calc(210mm * ${zoom - 1} / 2)`
      }}
    >
      <div className={`${(templateId === 'two-column-popular' || templateId === 'two-column-gravity' || templateId === 'two-column-grow' || templateId === 'ats-standout' || templateId === 'ats-lunar' || templateId === 'ats-universe' || templateId === 'ats-supernova' || templateId === 'ats-shining-star' || templateId === 'ats-navy-classic' || templateId === 'template-two-colum-1' || templateId === 'template-two-colum-2' || templateId === 'template-two-colum-3' || templateId === 'template-mixed-column' || templateId === 'template-column-4' || templateId === 'template-column-5' || templateId === 'template-mixed-column-2' || templateId === 'template-mixed-column-3' || templateId === 'template-mixed-column-4' || templateId === 'template-mixed-column-5' || templateId === 'template-single-column-1' || templateId === 'template-single-column-2' || templateId === 'template-single-column-3' || templateId === 'template-single-column-4' || templateId === 'template-single-column-5' || templateId === 'template-ats-compliant-1' || templateId === 'template-ats-compliant-2' || templateId === 'template-ats-compliant-3' || templateId === 'template-ats-compliant-4' || templateId === 'template-ats-compliant-5' || templateId === 'template-ats-compliant-6' || templateId === 'template-ats-compliant-7' || templateId === 'template-ats-compliant-8' || templateId === 'template-ats-compliant-9' || templateId === 'template-ats-compliant-10' || templateId === 'template-industry-pro-11' || templateId === 'template-industry-pro-12' || templateId === 'template-industry-pro-13' || templateId === 'template-industry-pro-14' || templateId === 'template-industry-pro-15') ? 'p-0' : 'p-10'} ${fontClass} ${fontSizeClass} h-full flex flex-col justify-between`}>
        {templateId === 'two-column-gravity' ? (() => {
          return (
            <div className="flex flex-row h-full w-full bg-white p-6 md:p-8" id="preview-template-gravity">
              {/* Left Sidebar */}
              <div className="w-[30%] pr-4 md:pr-6 border-r border-slate-200 flex flex-col gap-6">
                <div className="text-center mb-4">
                  <h1 className="font-bold uppercase tracking-wider mb-1" style={{ fontSize: fontSize === 'sm' ? '1.25rem' : fontSize === 'lg' ? '1.75rem' : '1.5rem', color: '#0f172a' }}>
                    {personalInfo.fullName}
                  </h1>
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 font-medium">{personalInfo.jobTitle}</p>
                </div>

                <div className="space-y-6">
                  {/* Contact section */}
                  <div className="space-y-2">
                    <h3 className="font-bold uppercase tracking-widest border-b pb-1" style={{ fontSize: '0.7rem', borderColor: primaryColor, color: primaryColor }}>Contact</h3>
                    <div className="space-y-1 text-slate-600" style={{ fontSize: fontSize === 'sm' ? '9px' : fontSize === 'lg' ? '11px' : '10px' }}>
                       {personalInfo.email && <div className="break-all">{personalInfo.email}</div>}
                       {personalInfo.phone && <div>{personalInfo.phone}</div>}
                       {personalInfo.location && <div>{personalInfo.location}</div>}
                       {personalInfo.gender && <div>{personalInfo.gender}</div>}
                       {personalInfo.nationality && <div>{personalInfo.nationality}</div>}
                       {personalInfo.github && <div className="break-all">{personalInfo.github}</div>}
                       {personalInfo.website && <div className="break-all">{personalInfo.website}</div>}
                       {personalInfo.linkedin && <div className="break-all">{personalInfo.linkedin}</div>}
                    </div>
                  </div>

                  {/* Skills section */}
                  {skills && skills.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="font-bold uppercase tracking-widest border-b pb-1" style={{ fontSize: '0.7rem', borderColor: primaryColor, color: primaryColor }}>Skills</h3>
                      <div className="space-y-2" style={{ fontSize: fontSize === 'sm' ? '9px' : fontSize === 'lg' ? '11px' : '10px' }}>
                       {skills.map(cat => (
                         <div key={cat.id} className="space-y-1">
                           <p className="font-semibold text-slate-800">{cat.name}</p>
                           <div className="flex flex-wrap gap-1">
                             {cat.skills.map((skill, idx) => (
                               <span key={skill} className="text-slate-600">
                                 {skill}{idx < cat.skills.length - 1 && <span className="mx-1 text-slate-300">|</span>}
                               </span>
                             ))}
                           </div>
                         </div>
                       ))}
                      </div>
                    </div>
                  )}

                  {/* Languages section */}
                  {languages && languages.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="font-bold uppercase tracking-widest border-b pb-1" style={{ fontSize: '0.7rem', borderColor: primaryColor, color: primaryColor }}>Languages</h3>
                      <div className="space-y-1" style={{ fontSize: fontSize === 'sm' ? '9px' : fontSize === 'lg' ? '11px' : '10px' }}>
                        {languages.map(lang => (
                          <div key={lang.id} className="flex justify-between text-slate-600">
                            <span className="font-medium">{lang.name}</span>
                            <span className="text-slate-400 italic">{lang.proficiency}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Awards section */}
                  {awards && awards.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="font-bold uppercase tracking-widest border-b pb-1" style={{ fontSize: '0.7rem', borderColor: primaryColor, color: primaryColor }}>Awards</h3>
                      <div className="space-y-2" style={{ fontSize: fontSize === 'sm' ? '9px' : fontSize === 'lg' ? '11px' : '10px' }}>
                        {awards.map(award => (
                          <div key={award.id} className="text-slate-600">
                            <p className="font-semibold text-slate-800">{award.name}</p>
                            <p className="text-[9px] text-slate-400">{award.issuer} | {award.date}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Certifications section */}
                  {certifications && certifications.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="font-bold uppercase tracking-widest border-b pb-1" style={{ fontSize: '0.7rem', borderColor: primaryColor, color: primaryColor }}>Certifications</h3>
                      <div className="space-y-2" style={{ fontSize: fontSize === 'sm' ? '9px' : fontSize === 'lg' ? '11px' : '10px' }}>
                        {certifications.map(cert => (
                          <div key={cert.id} className="text-slate-600">
                            <p className="font-semibold text-slate-800">{cert.name}</p>
                            <p className="text-[9px] text-slate-400">{cert.issuer} | {cert.date}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Main Content Area */}
              <div className="w-[70%] pl-4 md:pl-6 space-y-6 flex flex-col">
                {personalInfo.bio && (
                  <div>
                    <h3 className="font-bold uppercase tracking-widest border-b pb-1 mb-2" style={{ fontSize: '0.8rem', borderColor: primaryColor, color: primaryColor }}>About Me</h3>
                    <p className="text-slate-600 leading-relaxed" style={{ fontSize: fontSize === 'sm' ? '9px' : fontSize === 'lg' ? '11px' : '10px' }}>{personalInfo.bio}</p>
                  </div>
                )}

                {experience && experience.length > 0 && (
                   <div className="space-y-3">
                     <h3 className="font-bold uppercase tracking-widest border-b pb-1 mb-2" style={{ fontSize: '0.8rem', borderColor: primaryColor, color: primaryColor }}>Experience</h3>
                     <div className="space-y-4">
                       {experience.map(exp => (
                         <div key={exp.id} className="space-y-1">
                           <div className="flex justify-between items-baseline">
                             <span className="font-bold text-slate-800" style={{ fontSize: '0.85rem' }}>{exp.position}</span>
                             <span className="text-[9px] uppercase tracking-wider text-slate-400 font-mono">{exp.startDate} — {exp.currentlyWorking ? 'Present' : exp.endDate}</span>
                           </div>
                           <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide">{exp.company} | {exp.location}</div>
                           <p className="text-slate-600 whitespace-pre-line leading-relaxed mt-1 italic pl-2 border-l-2 border-slate-100" style={{ fontSize: fontSize === 'sm' ? '9px' : fontSize === 'lg' ? '11px' : '10px' }}>{exp.description}</p>
                         </div>
                       ))}
                     </div>
                   </div>
                )}

                {education && education.length > 0 && (
                   <div className="space-y-3">
                     <h3 className="font-bold uppercase tracking-widest border-b pb-1 mb-2" style={{ fontSize: '0.8rem', borderColor: primaryColor, color: primaryColor }}>Education</h3>
                     <div className="space-y-3">
                        {education.map(edu => (
                          <div key={edu.id}>
                            <div className="flex justify-between items-baseline">
                              <span className="font-bold text-slate-800" style={{ fontSize: '0.85rem' }}>{edu.degree} in {edu.fieldOfStudy}</span>
                              <span className="text-[9px] text-slate-400 font-mono italic">{edu.startDate} — {edu.currentlyStudying ? 'Present' : edu.endDate}</span>
                            </div>
                            <div className="text-[10px] text-slate-500 font-medium">{edu.institution} | {edu.location}</div>
                            {edu.description && <p className="text-slate-600 mt-1 pl-2" style={{ fontSize: fontSize === 'sm' ? '9px' : fontSize === 'lg' ? '11px' : '10px' }}>{edu.description}</p>}
                          </div>
                        ))}
                     </div>
                   </div>
                )}

                {projects && projects.length > 0 && (
                   <div className="space-y-3">
                     <h3 className="font-bold uppercase tracking-widest border-b pb-1 mb-2" style={{ fontSize: '0.8rem', borderColor: primaryColor, color: primaryColor }}>Projects</h3>
                     <div className="space-y-3">
                        {projects.map(proj => (
                          <div key={proj.id} className="space-y-1">
                            <div className="flex justify-between items-baseline font-bold text-slate-800">
                               <span style={{ fontSize: '0.85rem' }}>{proj.title}</span>
                               <span className="text-[9px] text-slate-400 font-mono">{proj.startDate} — {proj.isCurrent ? 'Present' : proj.endDate}</span>
                            </div>
                            <div className="text-[10px] text-slate-500 italic font-medium">{proj.role} {proj.link && <span className="normal-case not-italic text-blue-400 ml-2">({proj.link})</span>}</div>
                            <p className="text-slate-600 leading-relaxed" style={{ fontSize: fontSize === 'sm' ? '9px' : fontSize === 'lg' ? '11px' : '10px' }}>{proj.description}</p>
                          </div>
                        ))}
                     </div>
                   </div>
                )}

                {achievements && achievements.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-bold uppercase tracking-widest border-b pb-1 mb-2" style={{ fontSize: '0.8rem', borderColor: primaryColor, color: primaryColor }}>Achievements</h3>
                    <ul className="text-slate-600 space-y-1 list-disc pl-4" style={{ fontSize: fontSize === 'sm' ? '9px' : fontSize === 'lg' ? '11px' : '10px' }}>
                      {achievements.map(ach => (
                        <li key={ach.id} className="leading-relaxed">
                          <span className="font-semibold text-slate-700">{ach.name}</span> {ach.date && <span>({ach.date})</span>}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )
        })() : templateId === 'two-column-popular' ? (() => {
          const isAccentDark = isColorDark(primaryColor);
          const sidebarAccentStyle = isAccentDark ? { color: '#cbd5e1' } : { color: primaryColor };
          const sidebarAccentColorText = isAccentDark ? { color: '#a5b4fc' } : { color: primaryColor };
          const sidebarLineBg = isAccentDark ? { backgroundColor: '#6366f1' } : { backgroundColor: primaryColor };
          
          const bodyTextSizeClass = fontSize === 'sm' ? 'text-[9.5px]' : fontSize === 'lg' ? 'text-[11.5px]' : 'text-[10.5px]';
          const sidebarSubTitleSizeClass = fontSize === 'sm' ? 'text-[9.5px]' : fontSize === 'lg' ? 'text-xs' : 'text-[11px]';
          const entryTitleSizeClass = fontSize === 'sm' ? 'text-[10.5px]' : fontSize === 'lg' ? 'text-[13px]' : 'text-[11.5px]';
          const subEntrySizeClass = fontSize === 'sm' ? 'text-[9.5px]' : fontSize === 'lg' ? 'text-[11.5px]' : 'text-[10.5px]';
          const entryMetaSizeClass = fontSize === 'sm' ? 'text-[8.5px]' : fontSize === 'lg' ? 'text-[10.5px]' : 'text-[9.5px]';
          
          return (
            <div className="flex flex-row h-full min-h-[297mm] text-left bg-white relative overflow-hidden">
              {/* Left Sidebar: Dark Background */}
              <div className="w-[33%] bg-[#1a1a1a] text-slate-200 p-8 flex flex-col space-y-6 shrink-0 relative">
                {/* Subtle dynamic accent line */}
                <div className="absolute top-0 left-0 bottom-0 w-[3px]" style={sidebarLineBg} />
                
                {/* Profile Image/Placeholder & Name Header block */}
                <div className="space-y-4">
                  {personalInfo.photoUrl ? (
                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-slate-700 mx-auto">
                      <img 
                        src={personalInfo.photoUrl} 
                        alt={personalInfo.fullName} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 text-2xl font-bold mx-auto border border-slate-700">
                      {personalInfo.fullName ? personalInfo.fullName.split(' ').map(n=>n[0]).join('').substring(0,2).toUpperCase() : 'JD'}
                    </div>
                  )}
                  
                  <div className="text-center">
                    <h1 className="text-lg font-bold tracking-tight text-white leading-tight">
                      {personalInfo.fullName || 'Your Name'}
                    </h1>
                    {personalInfo.jobTitle && (
                      <p className={`font-semibold tracking-wider uppercase mt-1 ${sidebarSubTitleSizeClass}`} style={sidebarAccentColorText}>
                        {personalInfo.jobTitle}
                      </p>
                    )}
                  </div>
                </div>

                {/* Identity/Contact Details block */}
                <div className="space-y-3 pt-4 border-t border-slate-800">
                  <h3 className={`font-bold uppercase tracking-widest text-slate-400 ${fontSize === 'sm' ? 'text-[9.5px]' : fontSize === 'lg' ? 'text-xs' : 'text-[10.5px]'}`}>Contact Details</h3>
                  <div className="space-y-2 text-slate-300" style={{ fontSize: fontSize === 'sm' ? '9px' : fontSize === 'lg' ? '11px' : '10px' }}>
                    {personalInfo.email && (
                      <div className="flex flex-col">
                        <span className="text-[8px] text-slate-500 uppercase tracking-wider font-semibold">Email</span>
                        <span className="break-all">{personalInfo.email}</span>
                      </div>
                    )}
                    {personalInfo.phone && (
                      <div className="flex flex-col">
                        <span className="text-[8px] text-slate-500 uppercase tracking-wider font-semibold">Phone</span>
                        <span>{personalInfo.phone}</span>
                      </div>
                    )}
                    {personalInfo.location && (
                      <div className="flex flex-col">
                        <span className="text-[8px] text-slate-500 uppercase tracking-wider font-semibold">Location</span>
                        <span>{personalInfo.location}</span>
                      </div>
                    )}
                    {personalInfo.nationality && (
                      <div className="flex flex-col">
                        <span className="text-[8px] text-slate-500 uppercase tracking-wider font-semibold">Nationality</span>
                        <span>{personalInfo.nationality}</span>
                      </div>
                    )}
                    {personalInfo.gender && (
                      <div className="flex flex-col">
                        <span className="text-[8px] text-slate-500 uppercase tracking-wider font-semibold">Gender</span>
                        <span>{personalInfo.gender}</span>
                      </div>
                    )}
                    {personalInfo.website && (
                      <div className="flex flex-col">
                        <span className="text-[8px] text-slate-500 uppercase tracking-wider font-semibold">Website</span>
                        <span className="break-all">{personalInfo.website}</span>
                      </div>
                    )}
                    {personalInfo.linkedin && (
                      <div className="flex flex-col">
                        <span className="text-[8px] text-slate-500 uppercase tracking-wider font-semibold">LinkedIn</span>
                        <span className="break-all">{personalInfo.linkedin}</span>
                      </div>
                    )}
                    {personalInfo.github && (
                      <div className="flex flex-col">
                        <span className="text-[8px] text-slate-500 uppercase tracking-wider font-semibold">GitHub</span>
                        <span className="break-all">{personalInfo.github}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Skills section */}
                {skills && skills.length > 0 && (
                  <div className="space-y-3 pt-4 border-t border-slate-800">
                    <h3 className={`font-bold uppercase tracking-widest text-slate-400 ${fontSize === 'sm' ? 'text-[9.5px]' : fontSize === 'lg' ? 'text-xs' : 'text-[10.5px]'}`}>Skills</h3>
                    <div className="space-y-2">
                      {skills.map((cat) => (
                        <div key={cat.id} className="space-y-1">
                          <span className="text-[9px] font-semibold uppercase tracking-wider" style={sidebarAccentColorText}>{cat.name}</span>
                          <div className="flex flex-wrap gap-1">
                            {cat.skills && cat.skills.map((skill, sIdx) => (
                              <span key={sIdx} className="text-[9px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded border border-slate-700/50">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Certifications section */}
                {certifications && certifications.length > 0 && (
                  <div className="space-y-3 pt-4 border-t border-slate-800">
                    <h3 className={`font-bold uppercase tracking-widest text-slate-400 ${fontSize === 'sm' ? 'text-[9.5px]' : fontSize === 'lg' ? 'text-xs' : 'text-[10.5px]'}`}>Certifications</h3>
                    <div className="space-y-2">
                      {certifications.map((cert) => (
                        <div key={cert.id} className="text-[9.5px]">
                          <p className="font-semibold text-white leading-tight">{cert.name}</p>
                          <p className="text-slate-400 text-[8.5px] mt-0.5">{cert.issuer} {cert.date && `• ${cert.date}`}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Awards section */}
                {awards && awards.length > 0 && (
                  <div className="space-y-3 pt-4 border-t border-slate-800">
                    <h3 className={`font-bold uppercase tracking-widest text-slate-400 ${fontSize === 'sm' ? 'text-[9.5px]' : fontSize === 'lg' ? 'text-xs' : 'text-[10.5px]'}`}>Awards</h3>
                    <div className="space-y-2">
                      {awards.map((awr) => (
                        <div key={awr.id} className="text-[9.5px]">
                          <p className="font-semibold text-white leading-tight">{awr.name}</p>
                          <p className="text-slate-405 text-[8.5px] mt-0.5" style={{ color: '#94a3b8' }}>{awr.issuer} {awr.date && `• ${awr.date}`}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Achievements section */}
                {achievements && achievements.length > 0 && (
                  <div className="space-y-3 pt-4 border-t border-slate-800">
                    <h3 className={`font-bold uppercase tracking-widest text-slate-400 ${fontSize === 'sm' ? 'text-[9.5px]' : fontSize === 'lg' ? 'text-xs' : 'text-[10.5px]'}`}>Achievements</h3>
                    <div className="space-y-2">
                      {achievements.map((ach) => (
                        <div key={ach.id} className="text-[9.5px]">
                          <p className="font-semibold text-white leading-tight">{ach.name}</p>
                          {ach.date && <p className="text-slate-400 text-[8.5px] mt-0.5">{ach.date}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Languages section */}
                {languages && languages.length > 0 && (
                  <div className="space-y-3 pt-4 border-t border-slate-800">
                    <h3 className={`font-bold uppercase tracking-widest text-slate-400 ${fontSize === 'sm' ? 'text-[9.5px]' : fontSize === 'lg' ? 'text-xs' : 'text-[10.5px]'}`}>Languages</h3>
                    <div className="space-y-1">
                      {languages.map((lang) => (
                        <div key={lang.id} className="flex justify-between text-[9.5px]">
                          <span className="text-white">{lang.name}</span>
                          <span className="text-slate-400 font-medium italic">{lang.proficiency}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Main Column: Clean grid layout with vibrant accent colors */}
              <div className="w-[67%] bg-white p-9 flex flex-col space-y-6">
                
                {/* Summary / Bio if provided */}
                {personalInfo.bio && (
                  <div className="space-y-2">
                    <h2 className={`font-bold uppercase tracking-wider flex items-center ${headingFontSizeClass}`} style={colorStyle}>
                      Professional Summary
                    </h2>
                    <div className="h-[2px]" style={{ backgroundColor: primaryColor, opacity: 0.2 }} />
                    <p className={`text-slate-600 leading-relaxed ${bodyTextSizeClass}`}>
                      {personalInfo.bio}
                    </p>
                  </div>
                )}

                {/* Work Experience */}
                {experience && experience.length > 0 && (
                  <div className="space-y-3">
                    <h2 className={`font-bold uppercase tracking-wider flex items-center ${headingFontSizeClass}`} style={colorStyle}>
                      Professional Experience
                    </h2>
                    <div className="h-[2px]" style={{ backgroundColor: primaryColor, opacity: 0.2 }} />
                    <div className="space-y-4">
                      {experience.map((exp) => (
                        <div key={exp.id} className="group text-left">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className={`font-bold text-slate-800 leading-tight ${entryTitleSizeClass}`}>
                                {exp.position}
                              </h4>
                              <p className={`font-semibold mt-0.5 ${subEntrySizeClass}`} style={colorStyle}>
                                {exp.company}
                              </p>
                            </div>
                            <div className={`text-right font-medium text-slate-500 ${entryMetaSizeClass}`}>
                              <span className="block">{exp.startDate} – {exp.currentlyWorking ? 'Present' : exp.endDate}</span>
                              {exp.location && <span className="text-slate-400">{exp.location}</span>}
                            </div>
                          </div>
                          {exp.description && (
                            <div className={`text-slate-600 mt-1 whitespace-pre-line leading-relaxed pl-3 border-l ${bodyTextSizeClass}`} style={{ borderLeftColor: `${primaryColor}33` }}>
                              {exp.description}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Projects */}
                {projects && projects.length > 0 && (
                  <div className="space-y-3">
                    <h2 className={`font-bold uppercase tracking-wider flex items-center ${headingFontSizeClass}`} style={colorStyle}>
                      Projects
                    </h2>
                    <div className="h-[2px]" style={{ backgroundColor: primaryColor, opacity: 0.2 }} />
                    <div className="space-y-4">
                      {projects.map((proj) => (
                        <div key={proj.id} className="text-left">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className={`font-bold text-slate-800 leading-tight ${entryTitleSizeClass}`}>
                                {proj.title}
                              </h4>
                              {proj.role && (
                                <p className={`text-slate-500 font-medium mt-0.5 ${subEntrySizeClass}`}>
                                  Role: {proj.role}
                                </p>
                              )}
                            </div>
                            <div className={`text-right font-medium text-slate-500 ${entryMetaSizeClass}`}>
                              <span>{proj.startDate} – {proj.isCurrent ? 'Present' : proj.endDate}</span>
                              {proj.link && (
                                <span className="block mt-0.5 underline transition-all hover:opacity-85" style={colorStyle}>{proj.link}</span>
                              )}
                            </div>
                          </div>
                          {proj.description && (
                            <div className={`text-slate-600 mt-1 whitespace-pre-line leading-relaxed pl-3 border-l ${bodyTextSizeClass}`} style={{ borderLeftColor: `${primaryColor}33` }}>
                              {proj.description}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Education */}
                {education && education.length > 0 && (
                  <div className="space-y-3">
                    <h2 className={`font-bold uppercase tracking-wider flex items-center ${headingFontSizeClass}`} style={colorStyle}>
                      Education
                    </h2>
                    <div className="h-[2px]" style={{ backgroundColor: primaryColor, opacity: 0.2 }} />
                    <div className="space-y-4">
                      {education.map((edu) => (
                        <div key={edu.id} className="text-left">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className={`font-bold text-slate-800 leading-tight ${entryTitleSizeClass}`}>
                                {edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}
                              </h4>
                              <p className={`font-semibold mt-0.5 ${subEntrySizeClass}`} style={colorStyle}>
                                {edu.institution}
                              </p>
                            </div>
                            <div className={`text-right font-medium text-slate-500 ${entryMetaSizeClass}`}>
                              <span className="block">{edu.startDate} – {edu.currentlyStudying ? 'Present' : edu.endDate}</span>
                              {edu.location && <span className="text-slate-400">{edu.location}</span>}
                            </div>
                          </div>
                          {edu.description && (
                            <div className={`text-slate-600 mt-1 whitespace-pre-line leading-relaxed pl-3 border-l ${bodyTextSizeClass}`} style={{ borderLeftColor: `${primaryColor}33` }}>
                              {edu.description}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
          );
        })() : templateId === 'two-column-grow' ? (() => {
          const bodyTextSizeClass = fontSize === 'sm' ? 'text-[9.5px]' : fontSize === 'lg' ? 'text-[11.5px]' : 'text-[10.5px]';
          const sidebarSubTitleSizeClass = fontSize === 'sm' ? 'text-[9.5px]' : fontSize === 'lg' ? 'text-xs' : 'text-[11px]';
          const entryTitleSizeClass = fontSize === 'sm' ? 'text-[10.5px]' : fontSize === 'lg' ? 'text-[13px]' : 'text-[11.5px]';
          const subEntrySizeClass = fontSize === 'sm' ? 'text-[9.5px]' : fontSize === 'lg' ? 'text-[11.5px]' : 'text-[10.5px]';
          const entryMetaSizeClass = fontSize === 'sm' ? 'text-[8.5px]' : fontSize === 'lg' ? 'text-[10.5px]' : 'text-[9.5px]';

          return (
            <div className="flex flex-col h-full min-h-[297mm] text-left bg-white relative overflow-hidden">
              {/* Modern Top Header - Full Width */}
              <div className="w-full bg-[#facc15] text-slate-900 p-8 relative">
                {/* Accent thin colored top border */}
                <div className="absolute top-0 left-0 right-0 h-[4px]" style={{ backgroundColor: primaryColor }} />
                
                <div className="flex justify-between items-center">
                  <div className="space-y-1.5 max-w-[75%]">
                    <h1 className="text-3xl font-extrabold tracking-tight leading-tight text-slate-950">
                      {personalInfo.fullName || 'Your Name'}
                    </h1>
                    {personalInfo.jobTitle && (
                      <p className="text-sm font-bold uppercase tracking-widest text-slate-900">
                        {personalInfo.jobTitle}
                      </p>
                    )}
                    
                    {/* Compact contact bar inside header */}
                    <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1.5 text-slate-800 text-[10px]">
                      {personalInfo.email && (
                        <span className="flex items-center gap-1">
                          <span className="text-slate-900">●</span> {personalInfo.email}
                        </span>
                      )}
                      {personalInfo.phone && (
                        <span className="flex items-center gap-1">
                          <span className="text-slate-900">●</span> {personalInfo.phone}
                        </span>
                      )}
                      {personalInfo.location && (
                        <span className="flex items-center gap-1">
                          <span className="text-slate-900">●</span> {personalInfo.location}
                        </span>
                      )}
                    </div>
                  </div>

                  {personalInfo.photoUrl ? (
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-slate-800 shrink-0">
                      <img 
                        src={personalInfo.photoUrl} 
                        alt={personalInfo.fullName} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-slate-900 flex items-center justify-center text-[#facc15] text-xl font-bold border border-slate-800 shrink-0">
                      {personalInfo.fullName ? personalInfo.fullName.split(' ').map(n=>n[0]).join('').substring(0,2).toUpperCase() : 'JD'}
                    </div>
                  )}
                </div>
              </div>

              {/* Columns wrapper */}
              <div className="flex flex-row flex-1 w-full bg-white">
                {/* Left Column (33%) - Light Blueish Slate Background */}
                <div className="w-[33%] bg-slate-50/80 p-6 flex flex-col space-y-5 border-r border-slate-100 shrink-0">
                  {/* Additional Contact details (website, socials) if present */}
                  {(personalInfo.website || personalInfo.linkedin || personalInfo.github || personalInfo.nationality || personalInfo.gender) && (
                    <div className="space-y-2">
                      <h3 className="font-bold uppercase tracking-wider text-slate-800 text-[10.5px]">Links & Info</h3>
                      <div className="h-[1.5px]" style={{ backgroundColor: primaryColor, opacity: 0.15 }} />
                      <div className="space-y-1.5 text-slate-600 text-[9.5px]">
                        {personalInfo.website && (
                          <div>
                            <span className="text-[8px] text-slate-400 uppercase tracking-wider block font-semibold">Website</span>
                            <span className="break-all">{personalInfo.website}</span>
                          </div>
                        )}
                        {personalInfo.linkedin && (
                          <div>
                            <span className="text-[8px] text-slate-400 uppercase tracking-wider block font-semibold">LinkedIn</span>
                            <span className="break-all">{personalInfo.linkedin}</span>
                          </div>
                        )}
                        {personalInfo.github && (
                          <div>
                            <span className="text-[8px] text-slate-400 uppercase tracking-wider block font-semibold">GitHub</span>
                            <span className="break-all">{personalInfo.github}</span>
                          </div>
                        )}
                        {personalInfo.nationality && (
                          <div>
                            <span className="text-[8px] text-slate-400 uppercase tracking-wider block font-semibold">Nationality</span>
                            <span>{personalInfo.nationality}</span>
                          </div>
                        )}
                        {personalInfo.gender && (
                          <div>
                            <span className="text-[8px] text-slate-400 uppercase tracking-wider block font-semibold">Gender</span>
                            <span>{personalInfo.gender}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Skills */}
                  {skills && skills.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="font-bold uppercase tracking-wider text-slate-800 text-[10.5px]">Skills</h3>
                      <div className="h-[1.5px]" style={{ backgroundColor: primaryColor, opacity: 0.15 }} />
                      <div className="space-y-2.5">
                        {skills.map((cat) => (
                          <div key={cat.id} className="space-y-1">
                            <span className="text-[9px] font-bold text-slate-700 uppercase tracking-wider">{cat.name}</span>
                            <div className="flex flex-wrap gap-1">
                              {cat.skills && cat.skills.map((skill, sIdx) => (
                                <span key={sIdx} className="text-[9px] bg-white text-slate-800 px-1.5 py-0.5 rounded border border-slate-200/80 shadow-sm font-medium">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Certifications */}
                  {certifications && certifications.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="font-bold uppercase tracking-wider text-slate-800 text-[10.5px]">Certifications</h3>
                      <div className="h-[1.5px]" style={{ backgroundColor: primaryColor, opacity: 0.15 }} />
                      <div className="space-y-1.5">
                        {certifications.map((cert) => (
                          <div key={cert.id} className="text-[9.5px]">
                            <p className="font-semibold text-slate-800 leading-tight">{cert.name}</p>
                            <p className="text-slate-500 text-[8.5px] mt-0.5">{cert.issuer} {cert.date && `• ${cert.date}`}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Awards */}
                  {awards && awards.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="font-bold uppercase tracking-wider text-slate-800 text-[10.5px]">Awards</h3>
                      <div className="h-[1.5px]" style={{ backgroundColor: primaryColor, opacity: 0.15 }} />
                      <div className="space-y-1.5">
                        {awards.map((awr) => (
                          <div key={awr.id} className="text-[9.5px]">
                            <p className="font-semibold text-slate-800 leading-tight">{awr.name}</p>
                            <p className="text-slate-500 text-[8.5px] mt-0.5">{awr.issuer} {awr.date && `• ${awr.date}`}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Achievements */}
                  {achievements && achievements.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="font-bold uppercase tracking-wider text-slate-800 text-[10.5px]">Achievements</h3>
                      <div className="h-[1.5px]" style={{ backgroundColor: primaryColor, opacity: 0.15 }} />
                      <div className="space-y-1.5">
                        {achievements.map((ach) => (
                          <div key={ach.id} className="text-[9.5px]">
                            <p className="font-semibold text-slate-800 leading-tight">{ach.name}</p>
                            {ach.date && <p className="text-slate-500 text-[8.5px] mt-0.5">{ach.date}</p>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Languages */}
                  {languages && languages.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="font-bold uppercase tracking-wider text-slate-800 text-[10.5px]">Languages</h3>
                      <div className="h-[1.5px]" style={{ backgroundColor: primaryColor, opacity: 0.15 }} />
                      <div className="space-y-1">
                        {languages.map((lang) => (
                          <div key={lang.id} className="flex justify-between text-[9.5px]">
                            <span className="text-slate-800 font-medium">{lang.name}</span>
                            <span className="text-slate-500 font-medium italic">{lang.proficiency}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column (67%) - Main details */}
                <div className="w-[67%] bg-white p-7 flex flex-col space-y-5">
                  {/* Professional Summary */}
                  {personalInfo.bio && (
                    <div className="space-y-2">
                      <h2 className={`font-bold uppercase tracking-wider text-slate-900 ${headingFontSizeClass}`}>
                        Professional Summary
                      </h2>
                      <div className="h-[2px]" style={{ backgroundColor: primaryColor }} />
                      <p className={`text-slate-600 leading-relaxed ${bodyTextSizeClass}`}>
                        {personalInfo.bio}
                      </p>
                    </div>
                  )}

                  {/* Experience */}
                  {experience && experience.length > 0 && (
                    <div className="space-y-3">
                      <h2 className={`font-bold uppercase tracking-wider text-slate-900 ${headingFontSizeClass}`}>
                        Professional Experience
                      </h2>
                      <div className="h-[2px]" style={{ backgroundColor: primaryColor }} />
                      <div className="space-y-4">
                        {experience.map((exp) => (
                          <div key={exp.id} className="text-left">
                            <div className="flex justify-between items-start">
                              <div className="flex-1 pr-3">
                                <h4 className={`font-bold text-slate-800 leading-tight ${entryTitleSizeClass}`}>
                                  {exp.position}
                                </h4>
                                <p className={`font-semibold mt-0.5 ${subEntrySizeClass}`} style={{ color: primaryColor }}>
                                  {exp.company}
                                </p>
                              </div>
                              <div className={`text-right font-medium text-slate-500 shrink-0 ${entryMetaSizeClass}`}>
                                <span className="block">{exp.startDate} – {exp.currentlyWorking ? 'Present' : exp.endDate}</span>
                                {exp.location && <span className="text-slate-400">{exp.location}</span>}
                              </div>
                            </div>
                            {exp.description && (
                              <div className={`text-slate-600 mt-1 whitespace-pre-line leading-relaxed pl-3 border-l-2 ${bodyTextSizeClass}`} style={{ borderLeftColor: `${primaryColor}aa` }}>
                                {exp.description}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Projects */}
                  {projects && projects.length > 0 && (
                    <div className="space-y-3">
                      <h2 className={`font-bold uppercase tracking-wider text-slate-900 ${headingFontSizeClass}`}>
                        Projects
                      </h2>
                      <div className="h-[2px]" style={{ backgroundColor: primaryColor }} />
                      <div className="space-y-4">
                        {projects.map((proj) => (
                          <div key={proj.id} className="text-left">
                            <div className="flex justify-between items-start">
                              <div className="flex-1 pr-3">
                                <h4 className={`font-bold text-slate-800 leading-tight ${entryTitleSizeClass}`}>
                                  {proj.title}
                                </h4>
                                {proj.role && (
                                  <p className={`text-slate-500 font-medium mt-0.5 ${subEntrySizeClass}`}>
                                    Role: {proj.role}
                                  </p>
                                )}
                              </div>
                              <div className={`text-right font-medium text-slate-500 shrink-0 ${entryMetaSizeClass}`}>
                                <span className="block">{proj.startDate} – {proj.isCurrent ? 'Present' : proj.endDate}</span>
                                {proj.link && (
                                  <span className="block mt-0.5 underline text-blue-600 truncate max-w-[120px]">{proj.link}</span>
                                )}
                              </div>
                            </div>
                            {proj.description && (
                              <div className={`text-slate-600 mt-1 whitespace-pre-line leading-relaxed pl-3 border-l-2 ${bodyTextSizeClass}`} style={{ borderLeftColor: `${primaryColor}aa` }}>
                                {proj.description}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Education */}
                  {education && education.length > 0 && (
                    <div className="space-y-3">
                      <h2 className={`font-bold uppercase tracking-wider text-slate-900 ${headingFontSizeClass}`}>
                        Education
                      </h2>
                      <div className="h-[2px]" style={{ backgroundColor: primaryColor }} />
                      <div className="space-y-4">
                        {education.map((edu) => (
                          <div key={edu.id} className="text-left">
                            <div className="flex justify-between items-start">
                              <div className="flex-1 pr-3">
                                <h4 className={`font-bold text-slate-800 leading-tight ${entryTitleSizeClass}`}>
                                  {edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}
                                </h4>
                                <p className={`font-semibold mt-0.5 ${subEntrySizeClass}`} style={{ color: primaryColor }}>
                                  {edu.institution}
                                </p>
                              </div>
                              <div className={`text-right font-medium text-slate-500 shrink-0 ${entryMetaSizeClass}`}>
                                <span className="block">{edu.startDate} – {edu.currentlyStudying ? 'Present' : edu.endDate}</span>
                                {edu.location && <span className="text-slate-400">{edu.location}</span>}
                              </div>
                            </div>
                            {edu.description && (
                              <div className={`text-slate-600 mt-1 whitespace-pre-line leading-relaxed pl-3 border-l-2 ${bodyTextSizeClass}`} style={{ borderLeftColor: `${primaryColor}aa` }}>
                                {edu.description}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })() : templateId === 'ats-standout' ? (
          <div className="flex flex-col h-full min-h-[297mm] text-left bg-white p-11 space-y-5 font-sans relative">
            {/* Top border header accent in Gold Yellow */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-amber-500" />
            
            {/* Header: Centered or Left and Right depending on photo presence */}
            <div className="border-b-[3px] border-slate-700 pb-5 pt-3">
              <div className="flex justify-between items-start flex-wrap gap-4">
                <div>
                  <h1 className="text-3xl font-extrabold uppercase tracking-tight text-slate-900 leading-none">
                    {personalInfo.fullName || 'Your Name'}
                  </h1>
                  {personalInfo.jobTitle && (
                    <p className="text-sm font-bold text-amber-600 tracking-wider uppercase mt-1.5">
                      {personalInfo.jobTitle}
                    </p>
                  )}
                </div>
                {personalInfo.photoUrl && (
                  <img 
                    src={personalInfo.photoUrl} 
                    alt={personalInfo.fullName} 
                    className="w-16 h-16 rounded-lg object-cover shadow-sm grayscale"
                    referrerPolicy="no-referrer"
                  />
                )}
              </div>

              {/* Pipe Separated Contact details: highly digestible for ATS standard parsers */}
              <div className="flex flex-wrap gap-x-2.5 gap-y-1 mt-3 text-[10.5px] text-slate-600 font-medium">
                {personalInfo.email && <span>{personalInfo.email}</span>}
                {personalInfo.phone && <span> | {personalInfo.phone}</span>}
                {personalInfo.location && <span> | {personalInfo.location}</span>}
                {personalInfo.nationality && <span> | Nationality: {personalInfo.nationality}</span>}
                {personalInfo.gender && <span> | Gender: {personalInfo.gender}</span>}
                {personalInfo.website && <span> | Web: {personalInfo.website}</span>}
                {personalInfo.linkedin && <span> | LinkedIn: {personalInfo.linkedin}</span>}
                {personalInfo.github && <span> | GitHub: {personalInfo.github}</span>}
              </div>

              {personalInfo.bio && (
                <p className="mt-3 text-[11px] text-slate-600 leading-relaxed italic border-t border-slate-100 pt-2.5">
                  {personalInfo.bio}
                </p>
              )}
            </div>

            {/* Split Dual-Column Grid */}
            <div className="grid grid-cols-12 gap-7 grow items-stretch">
              {/* Left Column representing 7 Columns - Focuses on experience and projects */}
              <div className="col-span-12 md:col-span-7 space-y-6">
                
                {/* Work Experience with all details */}
                {experience && experience.length > 0 && (
                  <div className="space-y-3">
                    <h2 className="text-xs font-black uppercase tracking-widest text-slate-900 border-l-[3.5px] border-amber-500 pl-2 bg-slate-100 py-1">
                      Professional Experience
                    </h2>
                    <div className="space-y-4">
                      {experience.map((exp) => (
                        <div key={exp.id} className="space-y-1">
                          <div className="flex justify-between items-baseline flex-wrap gap-1.5">
                            <h3 className="text-[12.5px] font-bold text-slate-950">{exp.position}</h3>
                            <span className="text-[10.5px] font-mono font-bold text-slate-500 bg-slate-50 px-1 rounded">
                              {exp.startDate} – {exp.currentlyWorking ? 'Present' : exp.endDate}
                            </span>
                          </div>
                          <p className="text-[11px] font-semibold text-amber-700 italic">
                            {exp.company}{exp.location ? ` | ${exp.location}` : ''}
                          </p>
                          {exp.description && (
                            <p className="text-[11px] text-slate-600 leading-relaxed whitespace-pre-line">
                              {exp.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Projects with all details */}
                {projects && projects.length > 0 && (
                  <div className="space-y-3">
                    <h2 className="text-xs font-black uppercase tracking-widest text-slate-900 border-l-[3.5px] border-amber-500 pl-2 bg-slate-100 py-1">
                      Featured Projects
                    </h2>
                    <div className="space-y-4">
                      {projects.map((proj) => (
                        <div key={proj.id} className="space-y-1">
                          <div className="flex justify-between items-baseline flex-wrap gap-1.5">
                            <h3 className="text-[12.5px] font-bold text-slate-950">{proj.title}</h3>
                            <span className="text-[10.5px] font-mono font-bold text-slate-500 bg-slate-50 px-1 rounded">
                              {proj.startDate} – {proj.isCurrent ? 'Present' : proj.endDate}
                            </span>
                          </div>
                          {proj.role && (
                            <p className="text-[11px] font-semibold text-slate-700 italic">{proj.role}</p>
                          )}
                          {proj.description && (
                            <p className="text-[11px] text-slate-600 leading-relaxed whitespace-pre-line">
                              {proj.description}
                            </p>
                          )}
                          {proj.link && (
                            <p className="text-[10px] font-mono text-amber-600 hover:underline">
                              Link: {proj.link}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column representing 5 Columns - Skills, Edu, Certs, Languages, Awards, Achievements */}
              <div className="col-span-12 md:col-span-5 space-y-6 border-l border-slate-100 pl-4">
                
                {/* Skills/Competencies list */}
                {skills && skills.length > 0 && (
                  <div className="space-y-2">
                    <h2 className="text-xs font-black uppercase tracking-widest text-slate-900 border-l-[3.5px] border-amber-500 pl-2 bg-slate-100 py-1">
                      Core Skills
                    </h2>
                    <div className="space-y-2">
                      {skills.map((cat) => (
                        <div key={cat.id} className="space-y-0.5">
                          <p className="text-[10.5px] font-bold text-slate-800 leading-tight">{cat.name}</p>
                          <p className="text-[10.5px] text-slate-600 leading-snug">{cat.skills.join(', ')}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Education list */}
                {education && education.length > 0 && (
                  <div className="space-y-2">
                    <h2 className="text-xs font-black uppercase tracking-widest text-slate-900 border-l-[3.5px] border-amber-500 pl-2 bg-slate-100 py-1">
                      Education
                    </h2>
                    <div className="space-y-3">
                      {education.map((edu) => (
                        <div key={edu.id} className="space-y-0.5">
                          <div className="flex justify-between items-baseline flex-wrap gap-1">
                            <h3 className="text-[11.5px] font-bold text-slate-900">{edu.degree}</h3>
                            <span className="text-[9.5px] font-mono text-slate-500 bg-slate-50 px-0.5">{edu.startDate} – {edu.endDate}</span>
                          </div>
                          {edu.fieldOfStudy && (
                            <p className="text-[10.5px] text-slate-700 font-medium leading-none mb-0.5">{edu.fieldOfStudy}</p>
                          )}
                          <p className="text-[11px] text-slate-600 font-semibold leading-normal">{edu.institution}{edu.location ? ` | ${edu.location}` : ''}</p>
                          {edu.description && (
                            <p className="text-[10px] text-slate-500 leading-normal italic">{edu.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Certifications details */}
                {certifications && certifications.length > 0 && (
                  <div className="space-y-2">
                    <h2 className="text-xs font-black uppercase tracking-widest text-slate-900 border-l-[3.5px] border-amber-500 pl-2 bg-slate-100 py-1">
                      Certifications
                    </h2>
                    <div className="space-y-2.5">
                      {certifications.map((cert) => (
                        <div key={cert.id} className="space-y-0.5">
                          <div className="flex justify-between items-baseline flex-wrap gap-1">
                            <h4 className="text-[11px] font-bold text-slate-900">{cert.name}</h4>
                            <span className="text-[9.5px] font-mono text-slate-500">{cert.date}</span>
                          </div>
                          <p className="text-[10.5px] text-slate-600 italic leading-snug">{cert.issuer}</p>
                          {cert.link && (
                            <p className="text-[9.5px] font-mono text-amber-600 hover:underline">Verify: {cert.link}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Languages details */}
                {languages && languages.length > 0 && (
                  <div className="space-y-2">
                    <h2 className="text-xs font-black uppercase tracking-widest text-slate-900 border-l-[3.5px] border-amber-500 pl-2 bg-slate-100 py-1">
                      Languages
                    </h2>
                    <div className="flex flex-wrap gap-x-3 gap-y-1">
                      {languages.map((lang) => (
                        <div key={lang.id} className="text-[10.5px] text-slate-700">
                          <span className="font-bold">{lang.name}</span> <span className="text-slate-500">({lang.proficiency})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Awards details */}
                {awards && awards.length > 0 && (
                  <div className="space-y-2">
                    <h2 className="text-xs font-black uppercase tracking-widest text-slate-900 border-l-[3.5px] border-amber-500 pl-2 bg-slate-100 py-1">
                      Awards & Honors
                    </h2>
                    <div className="space-y-2.5">
                      {awards.map((award) => (
                        <div key={award.id} className="space-y-0.5">
                          <div className="flex justify-between items-baseline flex-wrap gap-1">
                            <h4 className="text-[11px] font-bold text-slate-900">{award.name}</h4>
                            <span className="text-[9.5px] font-mono text-slate-500">{award.date}</span>
                          </div>
                          <p className="text-[10.5px] text-slate-600 leading-snug">{award.issuer}</p>
                          {award.link && (
                            <p className="text-[9.5px] font-mono text-amber-600 hover:underline">{award.link}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Achievements details */}
                {achievements && achievements.length > 0 && (
                  <div className="space-y-2">
                    <h2 className="text-xs font-black uppercase tracking-widest text-slate-900 border-l-[3.5px] border-amber-500 pl-2 bg-slate-100 py-1">
                      Key Highlights
                    </h2>
                    <div className="space-y-2.5">
                      {achievements.map((ach) => (
                        <div key={ach.id} className="space-y-0.5">
                          <div className="flex justify-between items-baseline flex-wrap gap-1">
                            <h4 className="text-[11px] font-bold text-slate-900">{ach.name}</h4>
                            {ach.date && <span className="text-[9.5px] font-mono text-slate-500">{ach.date}</span>}
                          </div>
                          {ach.link && (
                            <p className="text-[9.5px] font-mono text-amber-600 hover:underline">{ach.link}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom identifier footer block */}
            <div className="text-[10px] text-slate-400 mt-6 pt-3 border-t border-slate-150 font-mono flex justify-between shrink-0">
              <span></span>
              <span>Last active: {new Date(data.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>
        ) : templateId === 'ats-lunar' ? (
          <div className="flex flex-col h-full min-h-[297mm] text-left bg-[#f8fafc] p-12 space-y-6 font-serif relative" id="layout-ats-lunar">
            {/* Centered Minimal Header */}
            <div className="flex flex-col items-center text-center space-y-3 mb-4">
              {personalInfo.photoUrl && (
                <img 
                  src={personalInfo.photoUrl} 
                  alt={personalInfo.fullName} 
                  className="w-20 h-20 rounded-full object-cover shadow-sm ring-2 ring-indigo-100"
                  referrerPolicy="no-referrer"
                />
              )}
              <div>
                <h1 className="text-4xl font-light tracking-widest text-slate-900 uppercase">
                  {personalInfo.fullName || 'Your Name'}
                </h1>
                {personalInfo.jobTitle && (
                  <p className="text-sm font-medium text-indigo-600 tracking-[0.2em] uppercase mt-2">
                    {personalInfo.jobTitle}
                  </p>
                )}
              </div>
              
              <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 mt-2 text-[11px] text-slate-500">
                {personalInfo.email && <span>{personalInfo.email}</span>}
                {personalInfo.phone && <span>• {personalInfo.phone}</span>}
                {personalInfo.location && <span>• {personalInfo.location}</span>}
                {personalInfo.nationality && <span>• Nat: {personalInfo.nationality}</span>}
                {personalInfo.gender && <span>• Gender: {personalInfo.gender}</span>}
                {personalInfo.website && <span>• {personalInfo.website}</span>}
                {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
                {personalInfo.github && <span>• GitHub: {personalInfo.github}</span>}
              </div>

              {personalInfo.bio && (
                <p className="mt-4 text-[12px] text-slate-700 leading-relaxed italic max-w-3xl border-t border-slate-200 pt-4">
                  "{personalInfo.bio}"
                </p>
              )}
            </div>

            {/* Single Column Layout */}
            <div className="space-y-7 grow">
              
              {experience && experience.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-indigo-900 border-b border-indigo-200 pb-1.5">
                    Experience
                  </h2>
                  <div className="space-y-5">
                    {experience.map((exp) => (
                      <div key={exp.id} className="space-y-1.5">
                        <div className="flex justify-between items-baseline flex-wrap gap-2">
                          <h3 className="text-[13px] font-bold text-slate-800">{exp.position}</h3>
                          <span className="text-[11px] font-medium text-indigo-600">
                            {exp.startDate} – {exp.currentlyWorking ? 'Present' : exp.endDate}
                          </span>
                        </div>
                        <p className="text-[12px] font-medium text-slate-600">
                          {exp.company}{exp.location ? ` | ${exp.location}` : ''}
                        </p>
                        {exp.description && (
                          <p className="text-[11.5px] text-slate-600 leading-relaxed whitespace-pre-line mt-1">
                            {exp.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {projects && projects.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-indigo-900 border-b border-indigo-200 pb-1.5">
                    Projects
                  </h2>
                  <div className="space-y-4 rounded-md">
                    {projects.map((proj) => (
                      <div key={proj.id} className="space-y-1.5">
                        <div className="flex justify-between items-baseline flex-wrap gap-2">
                          <h3 className="text-[13px] font-bold text-slate-800">{proj.title}</h3>
                          <span className="text-[11px] font-medium text-indigo-600">
                            {proj.startDate} – {proj.isCurrent ? 'Present' : proj.endDate}
                          </span>
                        </div>
                        {proj.role && (
                          <p className="text-[12px] font-medium text-slate-600">{proj.role}</p>
                        )}
                        {proj.description && (
                          <p className="text-[11.5px] text-slate-600 leading-relaxed whitespace-pre-line mt-1">
                            {proj.description}
                          </p>
                        )}
                        {proj.link && (
                          <p className="text-[10.5px] text-indigo-500 hover:underline">
                            {proj.link}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Grid for Skills, Education, etc */}
              <div className="grid grid-cols-2 gap-x-8 gap-y-7">
                
                {skills && skills.length > 0 && (
                  <div className="space-y-3">
                    <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-indigo-900 border-b border-indigo-200 pb-1.5">
                      Skills
                    </h2>
                    <div className="space-y-2">
                      {skills.map((cat) => (
                        <div key={cat.id} className="space-y-0.5">
                          <span className="text-[11.5px] font-bold text-slate-700 mr-2">{cat.name}:</span>
                          <span className="text-[11.5px] text-slate-600">{cat.skills.join(', ')}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {education && education.length > 0 && (
                  <div className="space-y-3">
                    <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-indigo-900 border-b border-indigo-200 pb-1.5">
                      Education
                    </h2>
                    <div className="space-y-3">
                      {education.map((edu) => (
                        <div key={edu.id} className="space-y-0.5">
                          <div className="flex justify-between items-baseline">
                            <h3 className="text-[12px] font-bold text-slate-800">{edu.degree}</h3>
                            <span className="text-[10px] text-indigo-600">{edu.startDate} – {edu.endDate}</span>
                          </div>
                          {edu.fieldOfStudy && (
                            <p className="text-[11.5px] text-slate-700">{edu.fieldOfStudy}</p>
                          )}
                          <p className="text-[11px] text-slate-500">{edu.institution}{edu.location ? ` | ${edu.location}` : ''}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {certifications && certifications.length > 0 && (
                  <div className="space-y-3">
                    <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-indigo-900 border-b border-indigo-200 pb-1.5">
                      Certifications
                    </h2>
                    <div className="space-y-2">
                      {certifications.map((cert) => (
                        <div key={cert.id} className="space-y-0.5">
                          <div className="flex justify-between items-baseline">
                            <h4 className="text-[11.5px] font-bold text-slate-800">{cert.name}</h4>
                            <span className="text-[10px] text-slate-500">{cert.date}</span>
                          </div>
                          <p className="text-[11px] text-slate-600">{cert.issuer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {languages && languages.length > 0 && (
                  <div className="space-y-3">
                    <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-indigo-900 border-b border-indigo-200 pb-1.5">
                      Languages
                    </h2>
                    <div className="flex flex-col space-y-1.5">
                      {languages.map((lang) => (
                        <div key={lang.id} className="text-[11.5px] text-slate-700">
                          <span className="font-semibold">{lang.name}</span> <span className="text-slate-500 text-[10.5px]">({lang.proficiency})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
              
              {(awards?.length > 0 || achievements?.length > 0) && (
                <div className="grid grid-cols-2 gap-x-8 mt-7">
                  {awards && awards.length > 0 && (
                    <div className="space-y-3">
                      <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-indigo-900 border-b border-indigo-200 pb-1.5">
                        Awards
                      </h2>
                      <div className="space-y-2">
                        {awards.map((award) => (
                          <div key={award.id} className="space-y-0.5">
                            <div className="flex justify-between items-baseline">
                              <h4 className="text-[11.5px] font-bold text-slate-800">{award.name}</h4>
                              <span className="text-[10px] text-slate-500">{award.date}</span>
                            </div>
                            <p className="text-[11px] text-slate-600">{award.issuer}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {achievements && achievements.length > 0 && (
                    <div className="space-y-3">
                      <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-indigo-900 border-b border-indigo-200 pb-1.5">
                        Highlights
                      </h2>
                      <div className="space-y-2">
                        {achievements.map((ach) => (
                          <div key={ach.id} className="space-y-0.5">
                            <div className="flex justify-between items-baseline">
                              <h4 className="text-[11.5px] font-bold text-slate-800">{ach.name}</h4>
                              {ach.date && <span className="text-[10px] text-slate-500">{ach.date}</span>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

            </div>

            <div className="text-[10px] text-slate-400 mt-6 pt-3 border-t border-slate-200 flex justify-between shrink-0">
              <span></span>
              <span>Last active: {new Date(data.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>
        ) : templateId === 'ats-universe' ? (
          <div className="flex flex-col h-full min-h-[297mm] text-left bg-white p-11 space-y-6 font-sans relative" id="layout-ats-universe">
            {/* Elegant Cosmic theme dark header strip */}
            <div className="bg-zinc-900 text-white rounded-lg p-7 relative overflow-hidden shadow-sm">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-yellow-500" />
              <div className="flex justify-between items-start flex-wrap gap-4">
                <div>
                  <h1 className="text-3xl font-extrabold uppercase tracking-tight text-white leading-none">
                    {personalInfo.fullName || 'Your Name'}
                  </h1>
                  {personalInfo.jobTitle && (
                    <p className="text-xs font-black text-yellow-400 tracking-[0.15em] uppercase mt-2">
                      {personalInfo.jobTitle}
                    </p>
                  )}
                </div>
                {personalInfo.photoUrl && (
                  <img 
                    src={personalInfo.photoUrl} 
                    alt={personalInfo.fullName} 
                    className="w-16 h-16 rounded object-cover border-2 border-yellow-500 grayscale"
                    referrerPolicy="no-referrer"
                  />
                )}
              </div>

              {/* Pipe Separated Contact details: highly legible for ATS standard parsers */}
              <div className="flex flex-wrap gap-x-3 gap-y-1 mt-4 text-[11px] text-zinc-300 font-medium">
                {personalInfo.email && <span>{personalInfo.email}</span>}
                {personalInfo.phone && <span className="text-yellow-500">|</span>}
                {personalInfo.phone && <span>{personalInfo.phone}</span>}
                {personalInfo.location && <span className="text-yellow-500">|</span>}
                {personalInfo.location && <span>{personalInfo.location}</span>}
                {personalInfo.nationality && <span className="text-yellow-500">|</span>}
                {personalInfo.nationality && <span>Nationality: {personalInfo.nationality}</span>}
                {personalInfo.gender && <span className="text-yellow-500">|</span>}
                {personalInfo.gender && <span>Gender: {personalInfo.gender}</span>}
                {personalInfo.website && <span className="text-yellow-500">|</span>}
                {personalInfo.website && <span>Web: {personalInfo.website}</span>}
                {personalInfo.linkedin && <span className="text-yellow-500">|</span>}
                {personalInfo.linkedin && <span>LinkedIn: {personalInfo.linkedin}</span>}
                {personalInfo.github && <span className="text-yellow-500">|</span>}
                {personalInfo.github && <span>GitHub: {personalInfo.github}</span>}
              </div>

              {personalInfo.bio && (
                <p className="mt-3.5 text-[11px] text-zinc-400 leading-relaxed italic border-t border-zinc-800 pt-3">
                  {personalInfo.bio}
                </p>
              )}
            </div>

            {/* Asymmetric Section Layout block - No overlaps, highly structured */}
            <div className="space-y-6 grow">
              
              {/* Professional Experience */}
              {experience && experience.length > 0 && (
                <div className="grid grid-cols-12 gap-4 border-b border-zinc-100 pb-5 last:border-0">
                  <div className="col-span-12 md:col-span-3 text-left md:text-right border-l-4 md:border-l-0 md:border-r-4 border-yellow-500 pl-3 md:pl-0 md:pr-4 py-0.5">
                    <h2 className="text-[11px] font-black uppercase tracking-[0.18em] text-zinc-500 leading-tight">
                      Experience
                    </h2>
                  </div>
                  <div className="col-span-12 md:col-span-9 space-y-4">
                    {experience.map((exp) => (
                      <div key={exp.id} className="space-y-1">
                        <div className="flex justify-between items-baseline flex-wrap gap-1.5">
                          <h3 className="text-[12.5px] font-bold text-zinc-950">{exp.position}</h3>
                          <span className="text-[10.5px] font-mono font-bold text-zinc-500 bg-zinc-50 px-1.5 py-0.5 rounded flex-shrink-0">
                            {exp.startDate} – {exp.currentlyWorking ? 'Present' : exp.endDate}
                          </span>
                        </div>
                        <p className="text-[11px] font-bold text-yellow-600 italic">
                          {exp.company}{exp.location ? ` | ${exp.location}` : ''}
                        </p>
                        {exp.description && (
                          <p className="text-[11px] text-zinc-600 leading-relaxed whitespace-pre-line">
                            {exp.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects */}
              {projects && projects.length > 0 && (
                <div className="grid grid-cols-12 gap-4 border-b border-zinc-100 pb-5 last:border-0">
                  <div className="col-span-12 md:col-span-3 text-left md:text-right border-l-4 md:border-l-0 md:border-r-4 border-yellow-500 pl-3 md:pl-0 md:pr-4 py-0.5">
                    <h2 className="text-[11px] font-black uppercase tracking-[0.18em] text-zinc-500 leading-tight">
                      Projects
                    </h2>
                  </div>
                  <div className="col-span-12 md:col-span-9 space-y-4">
                    {projects.map((proj) => (
                      <div key={proj.id} className="space-y-1">
                        <div className="flex justify-between items-baseline flex-wrap gap-1.5">
                          <h3 className="text-[12.5px] font-bold text-zinc-950">{proj.title}</h3>
                          <span className="text-[10.5px] font-mono font-bold text-zinc-500 bg-zinc-50 px-1.5 py-0.5 rounded flex-shrink-0">
                            {proj.startDate} – {proj.isCurrent ? 'Present' : proj.endDate}
                          </span>
                        </div>
                        {proj.role && (
                          <p className="text-[11px] font-bold text-zinc-700 italic">{proj.role}</p>
                        )}
                        {proj.description && (
                          <p className="text-[11px] text-zinc-600 leading-relaxed whitespace-pre-line">
                            {proj.description}
                          </p>
                        )}
                        {proj.link && (
                          <p className="text-[10.5px] font-mono text-yellow-600 hover:underline">
                            Link: {proj.link}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills */}
              {skills && skills.length > 0 && (
                <div className="grid grid-cols-12 gap-4 border-b border-zinc-100 pb-5 last:border-0">
                  <div className="col-span-12 md:col-span-3 text-left md:text-right border-l-4 md:border-l-0 md:border-r-4 border-yellow-500 pl-3 md:pl-0 md:pr-4 py-0.5">
                    <h2 className="text-[11px] font-black uppercase tracking-[0.18em] text-zinc-500 leading-tight">
                      Skills
                    </h2>
                  </div>
                  <div className="col-span-12 md:col-span-9">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                      {skills.map((cat) => (
                        <div key={cat.id} className="space-y-0.5">
                          <p className="text-[11px] font-bold text-zinc-800 leading-tight">{cat.name}</p>
                          <p className="text-[11px] text-zinc-600 leading-snug">{cat.skills.join(', ')}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Education */}
              {education && education.length > 0 && (
                <div className="grid grid-cols-12 gap-4 border-b border-zinc-100 pb-5 last:border-0">
                  <div className="col-span-12 md:col-span-3 text-left md:text-right border-l-4 md:border-l-0 md:border-r-4 border-yellow-500 pl-3 md:pl-0 md:pr-4 py-0.5">
                    <h2 className="text-[11px] font-black uppercase tracking-[0.18em] text-zinc-500 leading-tight">
                      Education
                    </h2>
                  </div>
                  <div className="col-span-12 md:col-span-9 space-y-4">
                    {education.map((edu) => (
                      <div key={edu.id} className="space-y-1">
                        <div className="flex justify-between items-baseline flex-wrap gap-1.5">
                          <h3 className="text-[12px] font-bold text-zinc-950">{edu.degree}</h3>
                          <span className="text-[10px] font-mono font-bold text-zinc-500 bg-zinc-50 px-1.5 py-0.5 rounded flex-shrink-0">
                            {edu.startDate} – {edu.endDate}
                          </span>
                        </div>
                        {edu.fieldOfStudy && (
                          <p className="text-[11px] text-zinc-700 font-bold leading-none mb-0.5">{edu.fieldOfStudy}</p>
                        )}
                        <p className="text-[11px] text-zinc-600 font-bold leading-normal">{edu.institution}{edu.location ? ` | ${edu.location}` : ''}</p>
                        {edu.description && (
                          <p className="text-[10px] text-zinc-500 leading-normal italic">{edu.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Certifications */}
              {certifications && certifications.length > 0 && (
                <div className="grid grid-cols-12 gap-4 border-b border-zinc-100 pb-5 last:border-0">
                  <div className="col-span-12 md:col-span-3 text-left md:text-right border-l-4 md:border-l-0 md:border-r-4 border-yellow-500 pl-3 md:pl-0 md:pr-4 py-0.5">
                    <h2 className="text-[11px] font-black uppercase tracking-[0.18em] text-zinc-500 leading-tight">
                      Certificates
                    </h2>
                  </div>
                  <div className="col-span-12 md:col-span-9 space-y-3">
                    {certifications.map((cert) => (
                      <div key={cert.id} className="space-y-0.5">
                        <div className="flex justify-between items-baseline flex-wrap gap-1.5">
                          <h4 className="text-[11px] font-bold text-zinc-900">{cert.name}</h4>
                          <span className="text-[9.5px] font-mono text-zinc-500">{cert.date}</span>
                        </div>
                        <p className="text-[10.5px] text-zinc-650 italic leading-snug">{cert.issuer}</p>
                        {cert.link && (
                          <p className="text-[9.5px] font-mono text-yellow-600 hover:underline">Verify: {cert.link}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Languages */}
              {languages && languages.length > 0 && (
                <div className="grid grid-cols-12 gap-4 border-b border-zinc-100 pb-5 last:border-0">
                  <div className="col-span-12 md:col-span-3 text-left md:text-right border-l-4 md:border-l-0 md:border-r-4 border-yellow-500 pl-3 md:pl-0 md:pr-4 py-0.5">
                    <h2 className="text-[11px] font-black uppercase tracking-[0.18em] text-zinc-500 leading-tight">
                      Languages
                    </h2>
                  </div>
                  <div className="col-span-12 md:col-span-9 flex flex-wrap gap-x-4 gap-y-1">
                    {languages.map((lang) => (
                      <div key={lang.id} className="text-[11px] text-zinc-700">
                        <span className="font-bold">{lang.name}</span> <span className="text-zinc-500">({lang.proficiency})</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Awards */}
              {awards && awards.length > 0 && (
                <div className="grid grid-cols-12 gap-4 border-b border-zinc-100 pb-5 last:border-0">
                  <div className="col-span-12 md:col-span-3 text-left md:text-right border-l-4 md:border-l-0 md:border-r-4 border-yellow-500 pl-3 md:pl-0 md:pr-4 py-0.5">
                    <h2 className="text-[11px] font-black uppercase tracking-[0.18em] text-zinc-500 leading-tight">
                      Awards
                    </h2>
                  </div>
                  <div className="col-span-12 md:col-span-9 space-y-3">
                    {awards.map((award) => (
                      <div key={award.id} className="space-y-0.5">
                        <div className="flex justify-between items-baseline flex-wrap gap-1.5">
                          <h4 className="text-[11px] font-bold text-zinc-900">{award.name}</h4>
                          <span className="text-[9.5px] font-mono text-zinc-500">{award.date}</span>
                        </div>
                        <p className="text-[10.5px] text-zinc-600 leading-snug">{award.issuer}</p>
                        {award.link && (
                          <p className="text-[9.5px] font-mono text-yellow-600 hover:underline">{award.link}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Achievements */}
              {achievements && achievements.length > 0 && (
                <div className="grid grid-cols-12 gap-4 border-b border-zinc-100 pb-5 last:border-0">
                  <div className="col-span-12 md:col-span-3 text-left md:text-right border-l-4 md:border-l-0 md:border-r-4 border-yellow-500 pl-3 md:pl-0 md:pr-4 py-0.5">
                    <h2 className="text-[11px] font-black uppercase tracking-[0.18em] text-zinc-500 leading-tight">
                      Highlights
                    </h2>
                  </div>
                  <div className="col-span-12 md:col-span-9 space-y-3">
                    {achievements.map((ach) => (
                      <div key={ach.id} className="space-y-0.5">
                        <div className="flex justify-between items-baseline flex-wrap gap-1.5">
                          <h4 className="text-[11px] font-bold text-zinc-900">{ach.name}</h4>
                          {ach.date && <span className="text-[9.5px] font-mono text-zinc-500">{ach.date}</span>}
                        </div>
                        {ach.link && (
                          <p className="text-[9.5px] font-mono text-yellow-600 hover:underline">{ach.link}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom identifier footer block */}
            <div className="text-[10px] text-zinc-400 mt-6 pt-3 border-t border-zinc-150 font-mono flex justify-between shrink-0">
               <span></span>
               <span>Last active: {new Date(data.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>
        ) : templateId === 'ats-supernova' ? ( (() => {
          const nameSize = fontSize === 'sm' ? 'text-[36px]' : fontSize === 'lg' ? 'text-[52px]' : 'text-[44px]';
          const titleSize = fontSize === 'sm' ? 'text-base' : fontSize === 'lg' ? 'text-xl' : 'text-lg';
          const bioSize = fontSize === 'sm' ? 'text-[11px]' : fontSize === 'lg' ? 'text-[15px]' : 'text-[13px]';
          const contactSize = fontSize === 'sm' ? 'text-[9.5px]' : fontSize === 'lg' ? 'text-[12.5px]' : 'text-[11px]';
          const sectionTitleSize = fontSize === 'sm' ? 'text-lg' : fontSize === 'lg' ? 'text-2xl' : 'text-xl';
          const itemTitleSize = fontSize === 'sm' ? 'text-[12px]' : fontSize === 'lg' ? 'text-base' : 'text-[14px]';
          const itemSubtitleSize = fontSize === 'sm' ? 'text-[10px]' : fontSize === 'lg' ? 'text-[13px]' : 'text-xs';
          const bodySize = fontSize === 'sm' ? 'text-[9.5px]' : fontSize === 'lg' ? 'text-[12.5px]' : 'text-[11px]';
          const smallSize = fontSize === 'sm' ? 'text-[8.5px]' : fontSize === 'lg' ? 'text-[11.5px]' : 'text-[10px]';

          return (
          <div className="flex flex-col h-full min-h-[297mm] text-left text-slate-800 p-0 relative" style={{ backgroundColor: `${primaryColor}0a` }} id="layout-ats-supernova">
            {/* Header */}
            <div className="bg-slate-900 text-white pt-16 pb-12 px-12 relative overflow-hidden">
               <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-30 pointer-events-none" style={{ backgroundColor: primaryColor }} />
               <div className="absolute bottom-0 left-0 w-full h-2" style={{ backgroundColor: primaryColor }} />
               
               <div className="flex justify-between items-end">
                 <div className="max-w-2xl pr-4">
                   <h1 className={`${nameSize} font-black tracking-tight leading-none mb-3 uppercase text-white`} style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                     {personalInfo.fullName || 'Your Name'}
                   </h1>
                   {personalInfo.jobTitle && (
                     <p className={`${titleSize} font-bold tracking-widest uppercase`} style={{ color: primaryColor }}>
                       {personalInfo.jobTitle}
                     </p>
                   )}
                 </div>
                 {personalInfo.photoUrl && (
                   <img 
                     src={personalInfo.photoUrl} 
                     alt={personalInfo.fullName} 
                     className="w-24 h-24 rounded-full object-cover border-4 border-slate-800 shadow-xl ring-2 z-10 shrink-0"
                     style={{ WebkitBoxShadow: `0 0 0 2px ${primaryColor}` }}
                     referrerPolicy="no-referrer"
                   />
                 )}
               </div>

               {personalInfo.bio && (
                 <p className={`mt-8 ${bioSize} text-slate-300 leading-relaxed font-medium max-w-3xl`}>
                   {personalInfo.bio}
                 </p>
               )}
            </div>

            {/* Contact Details Bar */}
            <div className={`text-white py-3 px-12 flex flex-wrap gap-x-6 gap-y-2 ${contactSize} font-semibold tracking-wide shadow-md z-10 relative`} style={{ backgroundColor: primaryColor }}>
                {[
                  personalInfo.email,
                  personalInfo.phone,
                  personalInfo.location,
                  personalInfo.website,
                  personalInfo.linkedin,
                  personalInfo.github
                ].filter(Boolean).map((detail, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-white opacity-60" />
                    <span style={{ color: textOnAccentClass }}>{detail}</span>
                  </div>
                ))}
            </div>

            {/* Main Content Area */}
            <div className="px-12 py-10 space-y-8 flex-1 w-full box-border">
              
              {experience.length > 0 && (
                <section>
                  <h2 className={`${sectionTitleSize} font-black text-slate-900 border-b-2 pb-2 mb-6 tracking-tight flex items-center gap-2 uppercase`} style={{ borderColor: `${primaryColor}40` }}>
                    <span className="shadow-sm p-1 rounded mr-1" style={{ color: primaryColor, backgroundColor: `${primaryColor}20` }}>Exp</span>erience
                  </h2>
                  <div className="space-y-6">
                    {experience.map((exp: any) => (
                      <div key={exp.id} className="relative pl-6 border-l-2 border-slate-200 pb-2">
                        <div className="absolute w-3 h-3 rounded-full -left-[7px] top-1.5 ring-4" style={{ backgroundColor: primaryColor, boxShadow: `0 0 0 4px ${primaryColor}10` }} />
                        <div className="flex flex-col mb-1.5">
                          <h3 className={`${itemTitleSize} font-bold text-slate-900`}>{exp.position ?? exp.title}</h3>
                          <div className={`flex flex-wrap items-center gap-2 ${itemSubtitleSize} font-semibold`}>
                            <span style={{ color: primaryColor }}>{exp.company}</span>
                            {exp.location && (
                              <>
                                <span className="text-slate-300">•</span>
                                <span className="text-slate-600">{exp.location}</span>
                              </>
                            )}
                            <span className="text-slate-300">•</span>
                            <span className="text-slate-500">{exp.startDate} – {exp.currentlyWorking ? 'Present' : exp.endDate}</span>
                          </div>
                        </div>
                        <p className={`${bodySize} text-slate-700 leading-relaxed whitespace-pre-wrap`}>
                          {exp.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {projects && projects.length > 0 && (
                <section>
                  <h2 className={`${sectionTitleSize} font-black text-slate-900 border-b-2 pb-2 mb-6 tracking-tight flex items-center gap-2 uppercase`} style={{ borderColor: `${primaryColor}40` }}>
                    <span className="shadow-sm p-1 rounded mr-1" style={{ color: primaryColor, backgroundColor: `${primaryColor}20` }}>Pro</span>jects
                  </h2>
                  <div className="space-y-6">
                    {projects.map((proj: any) => (
                      <div key={proj.id} className="relative pl-6 border-l-2 border-slate-200 pb-2">
                         <div className="flex flex-col mb-1.5">
                          <h3 className={`${itemTitleSize} font-bold text-slate-900`}>{proj.title}</h3>
                          <div className={`flex flex-wrap items-center gap-2 ${itemSubtitleSize} font-semibold`}>
                             {proj.role && <span style={{ color: primaryColor }}>{proj.role}</span>}
                             {proj.role && <span className="text-slate-300">•</span>}
                             <span className="text-slate-500">{proj.startDate} – {proj.isCurrent ? 'Present' : proj.endDate}</span>
                          </div>
                        </div>
                        <p className={`${bodySize} text-slate-700 leading-relaxed whitespace-pre-wrap mt-2`}>
                          {proj.description}
                        </p>
                        {proj.link && (
                          <a href={proj.link} target="_blank" rel="noreferrer" className={`${smallSize} underline font-semibold mt-1 inline-block`} style={{ color: primaryColor }}>
                            View Project
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {education.length > 0 && (
                <section>
                  <h2 className={`${sectionTitleSize} font-black text-slate-900 border-b-2 pb-2 mb-6 tracking-tight flex items-center gap-2 uppercase`} style={{ borderColor: `${primaryColor}40` }}>
                    <span className="shadow-sm p-1 rounded mr-1" style={{ color: primaryColor, backgroundColor: `${primaryColor}20` }}>Edu</span>cation
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {education.map((edu: any) => (
                      <div key={edu.id} className="bg-white p-4 rounded-xl border shadow-sm relative overflow-hidden" style={{ borderColor: `${primaryColor}30` }}>
                        <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: primaryColor }} />
                        <h3 className={`${itemTitleSize} font-bold text-slate-900 mb-1`}>{edu.degree}</h3>
                        <p className={`${itemSubtitleSize} font-semibold mb-2`} style={{ color: primaryColor }}>{edu.institution}</p>
                        <p className={`${smallSize} text-slate-500 font-medium uppercase tracking-wider`}>{edu.startDate} – {edu.endDate}</p>
                        {edu.description && <p className={`${smallSize} text-slate-600 mt-2`}>{edu.description}</p>}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {skills.length > 0 && (
                <section>
                  <h2 className={`${sectionTitleSize} font-black text-slate-900 border-b-2 pb-2 mb-6 tracking-tight flex items-center gap-2 uppercase`} style={{ borderColor: `${primaryColor}40` }}>
                    <span className="shadow-sm p-1 rounded mr-1" style={{ color: primaryColor, backgroundColor: `${primaryColor}20` }}>Ski</span>lls
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill: any) => (
                      <span key={skill.id} className={`px-3 py-1.5 bg-slate-900 ${bodySize} font-bold tracking-wide rounded hover:-translate-y-0.5 transition-transform shadow-sm border-b-2 border-slate-700`} style={{ color: `${primaryColor}10` > '#808080' ? '#fff' : '#f8fafc' }}>
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {languages && languages.length > 0 && (
                 <section>
                  <h2 className={`${sectionTitleSize} font-black text-slate-900 border-b-2 pb-2 mb-6 tracking-tight flex items-center gap-2 uppercase`} style={{ borderColor: `${primaryColor}40` }}>
                    <span className="shadow-sm p-1 rounded mr-1" style={{ color: primaryColor, backgroundColor: `${primaryColor}20` }}>Lan</span>guages
                  </h2>
                  <div className="flex flex-wrap gap-4">
                    {languages.map((lang: any) => (
                      <div key={lang.id} className="flex flex-col items-center justify-center p-3 border border-slate-200 bg-white rounded-lg shadow-sm w-24">
                        <span className={`${itemSubtitleSize} font-black text-slate-900 uppercase`}>{lang.name}</span>
                        <span className={`${smallSize} font-semibold uppercase tracking-widest mt-1`} style={{ color: primaryColor }}>{lang.proficiency}</span>
                      </div>
                    ))}
                  </div>
                 </section>
              )}

              {certifications && certifications.length > 0 && (
                 <section>
                   <h2 className={`${sectionTitleSize} font-black text-slate-900 border-b-2 pb-2 mb-6 tracking-tight flex items-center gap-2 uppercase`} style={{ borderColor: `${primaryColor}40` }}>
                     <span className="shadow-sm p-1 rounded mr-1" style={{ color: primaryColor, backgroundColor: `${primaryColor}20` }}>Cer</span>tifications
                   </h2>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {certifications.map((cert: any) => (
                       <div key={cert.id} className="flex flex-col bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                         <h3 className={`${itemTitleSize} font-bold text-slate-900`}>{cert.name}</h3>
                         <p className={`${bodySize} font-semibold`} style={{ color: primaryColor }}>{cert.issuer}</p>
                         <p className={`${smallSize} text-slate-500 font-medium uppercase tracking-wider mt-1`}>{cert.date}</p>
                       </div>
                     ))}
                   </div>
                 </section>
              )}

              {awards && awards.length > 0 && (
                 <section>
                   <h2 className={`${sectionTitleSize} font-black text-slate-900 border-b-2 pb-2 mb-6 tracking-tight flex items-center gap-2 uppercase`} style={{ borderColor: `${primaryColor}40` }}>
                     <span className="shadow-sm p-1 rounded mr-1" style={{ color: primaryColor, backgroundColor: `${primaryColor}20` }}>Awa</span>rds
                   </h2>
                   <ul className="space-y-3">
                     {awards.map((award: any) => (
                       <li key={award.id} className="flex gap-3 items-start px-4 py-3 rounded-lg border border-slate-100" style={{ backgroundColor: `${primaryColor}08` }}>
                         <span className={`shrink-0 mt-0.5 font-bold ${itemTitleSize}`} style={{ color: primaryColor }}>🏆</span>
                         <div>
                           <div className="flex flex-wrap gap-2 items-baseline mb-1">
                             <h3 className={`${itemSubtitleSize} font-bold text-slate-900`}>{award.title || award.name}</h3>
                             <span className={`${smallSize} font-semibold`} style={{ color: primaryColor }}>{award.date || award.year}</span>
                           </div>
                           {(award.description || award.issuer) && <p className={`${bodySize} text-slate-600 leading-relaxed`}>{award.description || award.issuer}</p>}
                         </div>
                       </li>
                     ))}
                   </ul>
                 </section>
              )}

              {achievements && achievements.length > 0 && (
                 <section>
                   <h2 className={`${sectionTitleSize} font-black text-slate-900 border-b-2 pb-2 mb-6 tracking-tight flex items-center gap-2 uppercase`} style={{ borderColor: `${primaryColor}40` }}>
                     <span className="shadow-sm p-1 rounded mr-1" style={{ color: primaryColor, backgroundColor: `${primaryColor}20` }}>Ach</span>ievements
                   </h2>
                   <ul className="space-y-3">
                     {achievements.map((ach: any) => (
                       <li key={ach.id} className="flex gap-3 items-start px-4 py-3 rounded-lg border border-slate-100" style={{ backgroundColor: `${primaryColor}08` }}>
                         <span className={`shrink-0 mt-0.5 font-bold ${itemTitleSize}`} style={{ color: primaryColor }}>★</span>
                         <div>
                           <div className="flex flex-wrap gap-2 items-baseline mb-1">
                             <h3 className={`${itemSubtitleSize} font-bold text-slate-900`}>{ach.title}</h3>
                             {ach.date && <span className={`${smallSize} font-semibold`} style={{ color: primaryColor }}>{ach.date}</span>}
                             {ach.year && !ach.date && <span className={`${smallSize} font-semibold`} style={{ color: primaryColor }}>{ach.year}</span>}
                           </div>
                           <p className={`${bodySize} text-slate-600 leading-relaxed`}>{ach.description}</p>
                         </div>
                       </li>
                     ))}
                   </ul>
                 </section>
              )}
            </div>
            
            <div className="absolute top-4 right-4 print:hidden opacity-30 text-[9px] text-slate-500 font-mono text-right pointer-events-none">
               <div>ASTRO //</div>
               <span>Supernova</span>
            </div>
          </div>
          );
        })()
        ) : templateId === 'ats-navy-classic' ? (
          <div className="flex flex-col h-full min-h-[297mm] text-left bg-white text-slate-800 p-12 space-y-5 font-sans relative" id="layout-ats-navy-classic">
            {/* Elegant, clean subtle navy top accent border */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-blue-900" />

            {/* Identify Header */}
            <div className="border-b border-slate-200 pb-4 pt-2">
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                {personalInfo.fullName || 'Your Name'}
              </h1>
              {personalInfo.jobTitle && (
                <p className="text-sm font-semibold text-blue-900 uppercase tracking-widest mt-1">
                  {personalInfo.jobTitle}
                </p>
              )}
              {/* Contact Details (No Icons) */}
              <div className="flex flex-wrap gap-x-3 gap-y-1 mt-3 text-[11px] text-slate-600 font-medium">
                {personalInfo.email && <span>{personalInfo.email}</span>}
                {personalInfo.phone && <span>• {personalInfo.phone}</span>}
                {personalInfo.location && <span>• {personalInfo.location}</span>}
                {personalInfo.nationality && <span>• Nationality: {personalInfo.nationality}</span>}
                {personalInfo.gender && <span>• Gender: {personalInfo.gender}</span>}
                {personalInfo.website && <span>• Web: {personalInfo.website}</span>}
                {personalInfo.linkedin && <span>• LinkedIn: {personalInfo.linkedin}</span>}
                {personalInfo.github && <span>• GitHub: {personalInfo.github}</span>}
              </div>
            </div>

            {/* Bio summary */}
            {personalInfo.bio && (
              <p className="text-[11px] text-slate-650 leading-relaxed italic border-l-2 border-blue-900 pl-3">
                {personalInfo.bio}
              </p>
            )}

            {/* Sections Container */}
            <div className="space-y-4 grow">
              
              {/* Experience */}
              {experience && experience.length > 0 && (
                <div className="space-y-2">
                  <div className="border-b border-blue-900/35 pb-1">
                    <h2 className="text-[12px] font-bold uppercase tracking-[0.15em] text-blue-900">
                      Experience
                    </h2>
                  </div>
                  <div className="space-y-3">
                    {experience.map((exp) => (
                      <div key={exp.id} className="space-y-1">
                        <div className="flex justify-between items-baseline flex-wrap gap-1.5">
                          <h3 className="text-[11px] font-bold text-slate-900">{exp.position}</h3>
                          <span className="text-[10px] font-mono text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                            {exp.startDate} – {exp.currentlyWorking ? 'Present' : exp.endDate}
                          </span>
                        </div>
                        <p className="text-[10.5px] font-semibold text-blue-900/80">
                          {exp.company}{exp.location ? `, ${exp.location}` : ''}
                        </p>
                        {exp.description && (
                          <p className="text-[10.5px] text-slate-650 leading-relaxed whitespace-pre-line pl-1.5 border-l border-slate-100">
                            {exp.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects */}
              {projects && projects.length > 0 && (
                <div className="space-y-2">
                  <div className="border-b border-blue-900/35 pb-1">
                    <h2 className="text-[12px] font-bold uppercase tracking-[0.15em] text-blue-900">
                      Projects
                    </h2>
                  </div>
                  <div className="space-y-3">
                    {projects.map((proj) => (
                      <div key={proj.id} className="space-y-1">
                        <div className="flex justify-between items-baseline flex-wrap gap-1.5">
                          <h3 className="text-[11px] font-bold text-slate-900">{proj.title}</h3>
                          <span className="text-[10px] font-mono text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                            {proj.startDate} – {proj.isCurrent ? 'Present' : proj.endDate}
                          </span>
                        </div>
                        {proj.role && (
                          <p className="text-[10.5px] font-semibold text-blue-900/80">{proj.role}</p>
                        )}
                        {proj.description && (
                          <p className="text-[10.5px] text-slate-650 leading-relaxed whitespace-pre-line pl-1.5 border-l border-slate-100">
                            {proj.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {education && education.length > 0 && (
                <div className="space-y-2">
                  <div className="border-b border-blue-900/35 pb-1">
                    <h2 className="text-[12px] font-bold uppercase tracking-[0.15em] text-blue-900">
                      Education
                    </h2>
                  </div>
                  <div className="space-y-3">
                    {education.map((edu) => (
                      <div key={edu.id} className="space-y-1">
                        <div className="flex justify-between items-baseline flex-wrap gap-1.5">
                          <h3 className="text-[11px] font-bold text-slate-900">{edu.institution}</h3>
                          <span className="text-[10px] font-mono text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                            {edu.startDate} – {edu.currentlyStudying ? 'Present' : edu.endDate}
                          </span>
                        </div>
                        <p className="text-[10.5px] font-semibold text-blue-900/80">
                          {edu.degree} in {edu.fieldOfStudy}{edu.location ? `, ${edu.location}` : ''}
                        </p>
                        {edu.description && (
                          <p className="text-[10.5px] text-slate-650 leading-relaxed whitespace-pre-line pl-1.5 border-l border-slate-100">
                            {edu.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills */}
              {skills && skills.length > 0 && (
                <div className="space-y-2">
                  <div className="border-b border-blue-900/35 pb-1">
                    <h2 className="text-[12px] font-bold uppercase tracking-[0.15em] text-blue-900">
                      Skills
                    </h2>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {skills.map((category) => (
                      <div key={category.id} className="text-[11px] leading-relaxed">
                        <span className="font-bold text-slate-800">{category.name}: </span>
                        <span className="text-slate-600">{(category.skills || []).join(', ')}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Certifications */}
              {certifications && certifications.length > 0 && (
                <div className="space-y-2">
                  <div className="border-b border-blue-900/35 pb-1">
                    <h2 className="text-[12px] font-bold uppercase tracking-[0.15em] text-blue-900">
                      Certifications
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {certifications.map((cert) => (
                      <div key={cert.id} className="text-[11px] leading-relaxed">
                        <div className="flex justify-between items-baseline">
                          <span className="font-bold text-slate-800">{cert.name}</span>
                          <span className="text-[10.5px] text-slate-500 font-mono">{cert.date}</span>
                        </div>
                        {cert.issuer && (
                          <p className="text-[10px] text-slate-600">
                            {cert.issuer}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Achievements, Awards, Languages combined single-column row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                {/* Achievements */}
                {achievements && achievements.length > 0 && (
                  <div className="space-y-2">
                    <div className="border-b border-blue-900/35 pb-1">
                      <h2 className="text-[11px] font-bold uppercase tracking-[0.1em] text-blue-900">Achievements</h2>
                    </div>
                    <ul className="space-y-1.5 text-[10.5px] text-slate-600 list-disc list-inside">
                      {achievements.map((ach) => (
                        <li key={ach.id} className="leading-relaxed">
                          <span className="font-semibold text-slate-850">{ach.name}</span>
                          {ach.date ? ` (${ach.date})` : ''}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Awards */}
                {awards && awards.length > 0 && (
                  <div className="space-y-2">
                    <div className="border-b border-blue-900/35 pb-1">
                      <h2 className="text-[11px] font-bold uppercase tracking-[0.1em] text-blue-900">Awards</h2>
                    </div>
                    <ul className="space-y-1.5 text-[10.5px] text-slate-600 list-disc list-inside">
                      {awards.map((award) => (
                        <li key={award.id} className="leading-relaxed">
                          <span className="font-semibold text-slate-850">{award.name}</span>
                          {award.issuer ? ` by ${award.issuer}` : ''}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Languages */}
                {languages && languages.length > 0 && (
                  <div className="space-y-2">
                    <div className="border-b border-blue-900/35 pb-1">
                      <h2 className="text-[11px] font-bold uppercase tracking-[0.1em] text-blue-900">Languages</h2>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {languages.map((lang) => (
                        <span key={lang.id} className="text-[10px] text-slate-700 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded font-medium">
                          {lang.name} ({lang.proficiency})
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Bottom identifier */}
            <div className="text-[10px] text-slate-400 mt-6 pt-3 border-t border-slate-200 font-mono flex justify-between shrink-0">
               <span></span>
               <span>Last active: {new Date(data.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>
        ) : templateId === 'ats-shining-star' ? (
          <div className="flex flex-col h-full min-h-[297mm] text-left bg-slate-100 text-slate-800 p-11 space-y-6 font-sans relative" id="layout-ats-shining-star">
            {/* Standard shining star top accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-cyan-500" />

            {/* Premium Corporate/Tech Header with shining star accents */}
            <div className="flex justify-between items-start flex-wrap gap-4 border-b border-slate-300 pb-5 pt-2">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl font-extrabold uppercase tracking-wider text-slate-900">
                    {personalInfo.fullName || 'Your Name'}
                  </h1>
                </div>
                {personalInfo.jobTitle && (
                  <p className="text-xs font-bold text-cyan-700 tracking-[0.2em] uppercase">
                    {personalInfo.jobTitle}
                  </p>
                )}
                {/* Pipe Separated Contact details with Cyan/Gold colored separators */}
                <div className="flex flex-wrap gap-x-3 gap-y-1 mt-3 text-[11px] text-slate-600 font-medium pb-1">
                  {personalInfo.email && <span>{personalInfo.email}</span>}
                  {personalInfo.phone && <span className="text-cyan-500">|</span>}
                  {personalInfo.phone && <span>{personalInfo.phone}</span>}
                  {personalInfo.location && <span className="text-cyan-500">|</span>}
                  {personalInfo.location && <span>{personalInfo.location}</span>}
                  {personalInfo.nationality && <span className="text-cyan-500">|</span>}
                  {personalInfo.nationality && <span>Nationality: {personalInfo.nationality}</span>}
                  {personalInfo.gender && <span className="text-cyan-500">|</span>}
                  {personalInfo.gender && <span>Gender: {personalInfo.gender}</span>}
                  {personalInfo.website && <span className="text-cyan-500">|</span>}
                  {personalInfo.website && <span>Web: {personalInfo.website}</span>}
                  {personalInfo.linkedin && <span className="text-cyan-500">|</span>}
                  {personalInfo.linkedin && <span>LinkedIn: {personalInfo.linkedin}</span>}
                  {personalInfo.github && <span className="text-cyan-500">|</span>}
                  {personalInfo.github && <span>GitHub: {personalInfo.github}</span>}
                </div>
              </div>

              {personalInfo.photoUrl && (
                <img 
                  src={personalInfo.photoUrl} 
                  alt={personalInfo.fullName} 
                  className="w-16 h-16 rounded border border-cyan-500 object-cover"
                  referrerPolicy="no-referrer"
                />
              )}
            </div>

            {/* Quick summary if present */}
            {personalInfo.bio && (
              <p className="text-[11px] text-slate-650 leading-relaxed italic bg-white border-l-4 border-cyan-500 p-3 rounded shadow-sm">
                {personalInfo.bio}
              </p>
            )}

            {/* Clean Section Layout block with star bullets and horizontal rule dividers */}
            <div className="space-y-5 grow">
              
              {/* Professional Experience */}
              {experience && experience.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 border-b border-slate-300 pb-1.5">
                    <h2 className="text-[12px] font-bold uppercase tracking-[0.15em] text-slate-900">
                      Experience
                    </h2>
                  </div>
                  <div className="space-y-4">
                    {experience.map((exp) => (
                      <div key={exp.id} className="space-y-1">
                        <div className="flex justify-between items-baseline flex-wrap gap-1.5">
                          <h3 className="text-[12px] font-bold text-cyan-800">{exp.position}</h3>
                          <span className="text-[10px] font-mono text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200 shadow-sm">
                            {exp.startDate} – {exp.currentlyWorking ? 'Present' : exp.endDate}
                          </span>
                        </div>
                        <p className="text-[11px] font-bold text-slate-700">
                          {exp.company}{exp.location ? ` | ${exp.location}` : ''}
                        </p>
                        {exp.description && (
                          <p className="text-[11px] text-slate-600 leading-relaxed whitespace-pre-line">
                            {exp.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects */}
              {projects && projects.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 border-b border-slate-300 pb-1.5">
                    <h2 className="text-[12px] font-bold uppercase tracking-[0.15em] text-slate-900">
                      Projects
                    </h2>
                  </div>
                  <div className="space-y-4">
                    {projects.map((proj) => (
                      <div key={proj.id} className="space-y-1">
                        <div className="flex justify-between items-baseline flex-wrap gap-1.5">
                          <h3 className="text-[12px] font-bold text-cyan-800">{proj.title}</h3>
                          <span className="text-[10px] font-mono text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200 shadow-sm">
                            {proj.startDate} – {proj.isCurrent ? 'Present' : proj.endDate}
                          </span>
                        </div>
                        {proj.role && (
                          <p className="text-[11px] text-slate-700 font-medium italic">{proj.role}</p>
                        )}
                        {proj.description && (
                          <p className="text-[11px] text-slate-600 leading-relaxed whitespace-pre-line">
                            {proj.description}
                          </p>
                        )}
                        {proj.link && (
                          <p className="text-[10.5px] font-mono text-cyan-700 hover:underline">
                            Link: {proj.link}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills */}
              {skills && skills.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 border-b border-slate-300 pb-1.5">
                    <h2 className="text-[12px] font-bold uppercase tracking-[0.15em] text-slate-900">
                      Skills
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                    {skills.map((cat) => (
                      <div key={cat.id} className="space-y-0.5 bg-white p-2.5 rounded border border-slate-200 shadow-sm">
                        <p className="text-[11px] font-bold text-cyan-800">{cat.name}</p>
                        <p className="text-[11px] text-slate-600">{cat.skills.join(', ')}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {education && education.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 border-b border-slate-300 pb-1.5">
                    <h2 className="text-[12px] font-bold uppercase tracking-[0.15em] text-slate-900">
                      Education
                    </h2>
                  </div>
                  <div className="space-y-4">
                    {education.map((edu) => (
                      <div key={edu.id} className="space-y-1">
                        <div className="flex justify-between items-baseline flex-wrap gap-1.5">
                          <h3 className="text-[12px] font-bold text-cyan-800">{edu.degree}</h3>
                          <span className="text-[10px] font-mono text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200 shadow-sm">
                            {edu.startDate} – {edu.endDate}
                          </span>
                        </div>
                        {edu.fieldOfStudy && (
                          <p className="text-[11px] text-slate-800 font-bold">{edu.fieldOfStudy}</p>
                        )}
                        <p className="text-[11px] text-slate-700">{edu.institution}{edu.location ? ` | ${edu.location}` : ''}</p>
                        {edu.description && (
                          <p className="text-[10px] text-slate-500 italic">{edu.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Certifications */}
              {certifications && certifications.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 border-b border-slate-300 pb-1.5">
                    <h2 className="text-[12px] font-bold uppercase tracking-[0.15em] text-slate-900">
                      Certificates
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {certifications.map((cert) => (
                      <div key={cert.id} className="bg-white p-2.5 rounded border border-slate-200 shadow-sm space-y-0.5">
                        <div className="flex justify-between items-baseline flex-wrap gap-1">
                          <h4 className="text-[11px] font-bold text-slate-900">{cert.name}</h4>
                          <span className="text-[9.5px] font-mono text-slate-500">{cert.date}</span>
                        </div>
                        <p className="text-[10px] text-slate-600 italic">{cert.issuer}</p>
                        {cert.link && (
                          <p className="text-[9.5px] font-mono text-cyan-700 hover:underline">Verify: {cert.link}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Languages */}
              {languages && languages.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 border-b border-slate-300 pb-1.5">
                    <h2 className="text-[12px] font-bold uppercase tracking-[0.15em] text-slate-900">
                      Languages
                    </h2>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1">
                    {languages.map((lang) => (
                      <div key={lang.id} className="text-[11px] text-slate-700 bg-white px-3 py-1 rounded border border-slate-200 shadow-sm">
                        <span className="font-bold text-cyan-700">{lang.name}</span> <span className="text-slate-500">({lang.proficiency})</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Awards */}
              {awards && awards.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 border-b border-slate-300 pb-1.5">
                    <h2 className="text-[12px] font-bold uppercase tracking-[0.15em] text-slate-900">
                      Awards
                    </h2>
                  </div>
                  <div className="space-y-3">
                    {awards.map((award) => (
                      <div key={award.id} className="space-y-0.5 bg-white p-2.5 rounded border border-slate-200 shadow-sm">
                        <div className="flex justify-between items-baseline flex-wrap gap-1.5">
                          <h4 className="text-[11px] font-bold text-slate-900">{award.name}</h4>
                          <span className="text-[9.5px] font-mono text-slate-500">{award.date}</span>
                        </div>
                        <p className="text-[10.5px] text-slate-600">{award.issuer}</p>
                        {award.link && (
                          <p className="text-[9.5px] font-mono text-cyan-700 hover:underline">{award.link}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Achievements */}
              {achievements && achievements.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 border-b border-slate-300 pb-1.5">
                    <h2 className="text-[12px] font-bold uppercase tracking-[0.15em] text-slate-900">
                      Highlights
                    </h2>
                  </div>
                  <div className="space-y-3">
                    {achievements.map((ach) => (
                      <div key={ach.id} className="space-y-0.5 bg-white p-2.5 rounded border border-slate-200 shadow-sm">
                        <div className="flex justify-between items-baseline flex-wrap gap-1.5">
                          <h4 className="text-[11px] font-bold text-slate-900">{ach.name}</h4>
                          {ach.date && <span className="text-[9.5px] font-mono text-slate-500">{ach.date}</span>}
                        </div>
                        {ach.link && (
                          <p className="text-[9.5px] font-mono text-cyan-700 hover:underline">{ach.link}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom identifier footer block */}
            <div className="text-[10px] text-slate-500 mt-6 pt-3 border-t border-slate-300 font-mono flex justify-between shrink-0">
               <span></span>
               <span>Last active: {new Date(data.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>
        ) : templateId === 'template-ats-compliant-1' ? (
          <div className="flex flex-col h-full min-h-[297mm] text-left bg-white p-12 space-y-8">
            {/* Header - Teal & Indigo */}
            <div className="border-b-4 border-teal-600 pb-8">
               <h1 className="text-4xl font-bold text-slate-900 mb-2">{personalInfo.fullName || 'Your Name'}</h1>
               <p className="text-lg font-semibold text-teal-600 mb-4">{personalInfo.jobTitle}</p>
               <div className="flex flex-wrap gap-4 text-sm text-slate-500 font-medium">
                  {personalInfo.email && <span className="border-r border-slate-200 pr-4">{personalInfo.email}</span>}
                  {personalInfo.phone && <span className="border-r border-slate-200 pr-4">{personalInfo.phone}</span>}
                  {personalInfo.location && <span>{personalInfo.location}</span>}
               </div>
            </div>

            <div className="space-y-10">
               {personalInfo.bio && (
                 <div className="space-y-3">
                    <h2 className="text-sm font-bold text-teal-700 uppercase tracking-widest border-b border-teal-100 pb-1">Professional Profile</h2>
                    <p className="text-[13px] text-slate-600 leading-relaxed">{personalInfo.bio}</p>
                 </div>
               )}

               {experience && experience.length > 0 && (
                 <div className="space-y-6">
                    <h2 className="text-sm font-bold text-teal-700 uppercase tracking-widest border-b border-teal-100 pb-1">Work Experience</h2>
                    <div className="space-y-8">
                       {experience.map(exp => (
                         <div key={exp.id} className="space-y-2">
                            <div className="flex justify-between items-baseline">
                               <h3 className="text-base font-bold text-slate-900">{exp.position}</h3>
                               <span className="text-xs font-bold text-indigo-600">{exp.startDate} – {exp.currentlyWorking ? 'Present' : exp.endDate}</span>
                            </div>
                            <p className="text-sm font-bold text-teal-600 italic">{exp.company}</p>
                            <p className="text-[13px] text-slate-600 leading-relaxed">{exp.description}</p>
                         </div>
                       ))}
                    </div>
                 </div>
               )}

               <div className="grid grid-cols-2 gap-12">
                  {skills && skills.length > 0 && (
                    <div className="space-y-4">
                       <h2 className="text-sm font-bold text-teal-700 uppercase tracking-widest border-b border-teal-100 pb-1">Key Expertise</h2>
                       <div className="space-y-3">
                        {skills.map(cat => (
                          <div key={cat.id}>
                            <p className="text-[12px] font-bold text-slate-800 mb-1">{cat.name}</p>
                            <p className="text-[12px] text-slate-500 leading-normal">{cat.skills.join(', ')}</p>
                          </div>
                        ))}
                       </div>
                    </div>
                  )}

                  {education && education.length > 0 && (
                    <div className="space-y-4">
                       <h2 className="text-sm font-bold text-teal-700 uppercase tracking-widest border-b border-teal-100 pb-1">Education</h2>
                       <div className="space-y-4">
                         {education.map(edu => (
                           <div key={edu.id}>
                             <h3 className="text-[13px] font-bold text-slate-900">{edu.degree}</h3>
                             <p className="text-[12px] text-teal-600 font-medium">{edu.institution}</p>
                             <p className="text-[11px] text-slate-400 mt-1">{edu.startDate} - {edu.endDate}</p>
                           </div>
                         ))}
                       </div>
                    </div>
                  )}
               </div>
            </div>
            <div className="mt-auto pt-8 border-t border-slate-50 text-[10px] text-slate-300 text-center tracking-widest uppercase">ATS Optimized Structure v1</div>
          
<div className="p-8 w-full block shrink-0" style={{marginTop: 'auto'}}>
{renderProjectsSection()}{renderCertificationsSection()}{renderAwardsSection()}{renderAchievementsSection()}{renderLanguagesSection()}
</div>
</div>
        ) : templateId === 'template-ats-compliant-2' ? (
          <div className="flex flex-col h-full min-h-[297mm] text-left bg-[#fcfdfd] p-12 space-y-10">
            {/* Header - Crimson & Slate */}
            <div className="flex justify-between items-start border-l-8 border-rose-700 pl-8 py-2">
               <div>
                 <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tight">{personalInfo.fullName || 'Your Name'}</h1>
                 <p className="text-lg font-bold text-rose-700 tracking-widest uppercase mt-1">{personalInfo.jobTitle}</p>
                 <div className="mt-4 flex gap-6 text-[12px] font-bold text-slate-400">
                    {personalInfo.email && <span className="flex items-center gap-2">{personalInfo.email}</span>}
                    {personalInfo.phone && <span className="flex items-center gap-2">{personalInfo.phone}</span>}
                    {personalInfo.location && <span className="flex items-center gap-2">{personalInfo.location}</span>}
                 </div>
               </div>
            </div>

            <div className="space-y-12">
               {personalInfo.bio && (
                 <div className="space-y-4">
                    <h2 className="text-[14px] font-black text-slate-900 uppercase tracking-[0.2em] bg-rose-50 px-3 py-1 inline-block">Profile Narrative</h2>
                    <p className="text-[13px] text-slate-600 leading-relaxed font-medium">{personalInfo.bio}</p>
                 </div>
               )}

               {experience && experience.length > 0 && (
                 <div className="space-y-8">
                    <h2 className="text-[14px] font-black text-slate-900 uppercase tracking-[0.2em] bg-rose-50 px-3 py-1 inline-block">Career Experience</h2>
                    <div className="space-y-10">
                       {experience.map(exp => (
                         <div key={exp.id} className="relative pl-8 border-l-2 border-slate-100 ml-2">
                            <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-rose-700" />
                            <div className="flex justify-between items-center mb-1">
                               <h3 className="text-base font-bold text-slate-900 tracking-tight">{exp.position}</h3>
                               <p className="text-[11px] font-black bg-slate-900 text-white px-2 py-0.5 tracking-tighter">
                                 {exp.startDate} - {exp.currentlyWorking ? 'NOW' : exp.endDate}
                               </p>
                            </div>
                            <p className="text-sm font-bold text-rose-700 uppercase italic mb-3 tracking-widest">{exp.company}</p>
                            <p className="text-[13px] text-slate-600 leading-relaxed">{exp.description}</p>
                         </div>
                       ))}
                    </div>
                 </div>
               )}

               <div className="grid grid-cols-2 gap-16 pt-4">
                  {skills && skills.length > 0 && (
                    <div className="space-y-6">
                       <h2 className="text-[14px] font-black text-slate-900 uppercase tracking-[0.2em] border-b-2 border-rose-700 pb-1">Core Expertise</h2>
                       <div className="space-y-4">
                        {skills.map(cat => (
                          <div key={cat.id}>
                            <p className="text-[12px] font-black text-slate-800 mb-1 border-l-2 border-rose-300 pl-3">{cat.name}</p>
                            <div className="flex flex-wrap gap-2 pl-3">
                              {cat.skills.map((s, i) => (
                                <span key={i} className="text-[12px] text-slate-500 font-medium">{s}{i !== cat.skills.length - 1 ? ' • ' : ''}</span>
                              ))}
                            </div>
                          </div>
                        ))}
                       </div>
                    </div>
                  )}

                  {education && education.length > 0 && (
                    <div className="space-y-6">
                       <h2 className="text-[14px] font-black text-slate-900 uppercase tracking-[0.2em] border-b-2 border-rose-700 pb-1">Academic Background</h2>
                       <div className="space-y-6">
                         {education.map(edu => (
                           <div key={edu.id} className="pl-4">
                             <h3 className="text-[13px] font-bold text-slate-900 mb-1">{edu.degree}</h3>
                             <p className="text-[12px] text-rose-700 font-bold italic">{edu.institution}</p>
                             <p className="text-[11px] text-slate-400 font-bold mt-1 tracking-tighter">{edu.startDate} — {edu.endDate}</p>
                           </div>
                         ))}
                       </div>
                    </div>
                  )}
               </div>
            </div>
            <div className="mt-auto pt-10 text-[10px] font-black text-rose-200 uppercase tracking-[1em] text-center italic">ATS Bold Format v2</div>
          
<div className="p-8 w-full block shrink-0" style={{marginTop: 'auto'}}>
{renderProjectsSection()}{renderCertificationsSection()}{renderAwardsSection()}{renderAchievementsSection()}{renderLanguagesSection()}
</div>
</div>
        ) : templateId === 'template-ats-compliant-3' ? (
          <div className="flex flex-col h-full min-h-[297mm] text-left bg-white p-16 space-y-12">
            {/* Header - Amber & Forest (Earth Tones) */}
            <div className="bg-slate-900 p-10 rounded-3xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-full bg-amber-500 opacity-20 transform skew-x-12 translate-x-16" />
               <h1 className="text-5xl font-black text-white tracking-tighter mb-4 leading-none">
                 {personalInfo.fullName || 'Your Name'}
               </h1>
               <div className="flex items-center gap-6">
                  <p className="text-lg font-bold text-amber-500 uppercase tracking-[0.2em]">{personalInfo.jobTitle}</p>
                  <div className="h-4 w-px bg-white/20" />
                  <div className="flex gap-4 text-[11px] text-white/60 font-bold uppercase tracking-widest">
                    {personalInfo.location && <span>{personalInfo.location}</span>}
                    {personalInfo.email && <span className="text-amber-500">{personalInfo.email}</span>}
                  </div>
               </div>
            </div>

            {/* Logical Section Flow */}
            <div className="space-y-16">
               <div className="grid grid-cols-[160px_1fr] gap-12">
                  <h2 className="text-[13px] font-black uppercase text-amber-600 tracking-[0.3em] pt-1">About Me</h2>
                  <p className="text-[14px] text-slate-600 leading-relaxed font-serif italic border-l border-slate-100 pl-10">
                    {personalInfo.bio}
                  </p>
               </div>

               {experience && experience.length > 0 && (
                 <div className="grid grid-cols-[160px_1fr] gap-12">
                    <h2 className="text-[13px] font-black uppercase text-amber-600 tracking-[0.3em] pt-1">Expertise</h2>
                    <div className="space-y-12">
                       {experience.map(exp => (
                         <div key={exp.id} className="space-y-4">
                            <div className="flex justify-between items-baseline mb-2">
                               <h3 className="text-xl font-bold text-slate-900 tracking-tight">{exp.position}</h3>
                               <span className="text-[12px] font-black text-emerald-700 bg-emerald-50 px-2 py-1 rounded">{exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}</span>
                            </div>
                            <div className="flex items-center gap-3">
                               <p className="text-sm font-black text-slate-400 uppercase tracking-widest">{exp.company}</p>
                               <div className="h-1 w-1 rounded-full bg-amber-500" />
                            </div>
                            <p className="text-[13px] text-slate-600 leading-relaxed border-l-2 border-amber-100 pl-6">
                               {exp.description}
                            </p>
                         </div>
                       ))}
                    </div>
                 </div>
               )}

               <div className="grid grid-cols-[160px_1fr] gap-12">
                  <h2 className="text-[13px] font-black uppercase text-amber-600 tracking-[0.3em] pt-1">Knowledge</h2>
                  <div className="grid grid-cols-2 gap-10">
                    {skills && skills.length > 0 && (
                      <div className="space-y-6">
                        {skills.map(cat => (
                          <div key={cat.id} className="space-y-2">
                            <p className="text-[11px] font-black text-emerald-800 uppercase italic opacity-50 tracking-tighter">{cat.name}</p>
                            <p className="text-[13px] text-slate-600 font-medium leading-relaxed">{cat.skills.join(' / ')}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    {education && education.length > 0 && (
                      <div className="space-y-8">
                        {education.map(edu => (
                          <div key={edu.id} className="border-l-4 border-emerald-500 pl-6 py-1">
                            <h3 className="text-sm font-black text-slate-900 uppercase leading-none mb-2">{edu.degree}</h3>
                            <p className="text-xs font-bold text-amber-600 tracking-widest">{edu.institution}</p>
                            <p className="text-[10px] text-slate-300 font-bold mt-2">{edu.startDate} — {edu.endDate}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
               </div>
            </div>

            <div className="mt-auto pt-10 text-[10px] font-black text-slate-100 uppercase tracking-[1em] text-right">
              Earth Tone System v3
            </div>
          
<div className="p-8 w-full block shrink-0" style={{marginTop: 'auto'}}>
{renderProjectsSection()}{renderCertificationsSection()}{renderAwardsSection()}{renderAchievementsSection()}{renderLanguagesSection()}
</div>
</div>
        ) : templateId === 'template-ats-compliant-4' ? (
          <div className="flex flex-col h-full min-h-[297mm] text-left bg-slate-50 p-16 space-y-12">
            {/* Header - Violet & Amber */}
            <div className="flex flex-col gap-6">
               <div className="flex justify-between items-end">
                  <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-none border-b-8 border-violet-600 pb-4">
                    {personalInfo.fullName || 'Your Name'}
                  </h1>
                  <div className="text-right">
                     <p className="text-sm font-black text-violet-700 uppercase tracking-[0.5em] mb-1">{personalInfo.jobTitle}</p>
                     <div className="h-1 w-20 bg-amber-400 ml-auto" />
                  </div>
               </div>
               <div className="flex justify-between items-center text-[11px] font-bold text-slate-400 uppercase tracking-widest bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                  {personalInfo.email && <span className="text-violet-600 px-4 border-r border-slate-50">{personalInfo.email}</span>}
                  {personalInfo.phone && <span className="px-4 border-r border-slate-50">{personalInfo.phone}</span>}
                  {personalInfo.location && <span className="px-4">{personalInfo.location}</span>}
               </div>
            </div>

            <div className="space-y-16">
               {/* Summary section */}
               {personalInfo.bio && (
                  <div className="bg-gradient-to-r from-violet-600 to-indigo-700 p-8 rounded-2xl text-white shadow-xl shadow-violet-100 overflow-hidden relative">
                     <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                     <h2 className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 text-amber-300">Executive Summary</h2>
                     <p className="text-[14px] leading-relaxed font-medium opacity-90">{personalInfo.bio}</p>
                  </div>
               )}

               {/* Employment section */}
               {experience && experience.length > 0 && (
                  <div className="space-y-8">
                     <div className="flex items-center gap-6">
                        <h2 className="text-[14px] font-black uppercase text-slate-900 tracking-widest shrink-0">Professional Trajectory</h2>
                        <div className="flex-1 h-2 bg-slate-900/5 rounded-full" />
                     </div>
                     <div className="space-y-12">
                        {experience.map(exp => (
                           <div key={exp.id} className="group">
                              <div className="flex justify-between items-baseline mb-4">
                                 <div className="flex items-center gap-6">
                                    <div className="w-12 h-[2px] bg-amber-400 group-hover:w-16 transition-all" />
                                    <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">{exp.position}</h3>
                                 </div>
                                 <span className="text-[11px] font-black text-violet-600 px-3 py-1 bg-violet-50 rounded-full">{exp.startDate} – {exp.currentlyWorking ? 'PRESENT' : exp.endDate}</span>
                              </div>
                              <p className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-4 pl-[72px]">{exp.company}</p>
                              <div className="pl-[72px]">
                                 <p className="text-[13px] text-slate-600 leading-relaxed indent-4 border-r-4 border-violet-50 pr-8 italic">
                                    {exp.description}
                                 </p>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               )}

               {/* Bottom Grid for Skills & Education */}
               <div className="grid grid-cols-[1fr_280px] gap-16">
                  {/* Skills Cloud-like Flow */}
                  <div className="space-y-8">
                     <h2 className="text-[12px] font-black uppercase text-slate-400 tracking-widest border-b border-slate-100 pb-2">Technical Core</h2>
                     <div className="space-y-6">
                        {skills && skills.map(cat => (
                           <div key={cat.id} className="space-y-3">
                              <p className="text-[10px] font-black text-violet-600 uppercase tracking-tighter opacity-70">{cat.name}</p>
                              <div className="flex flex-wrap gap-2">
                                 {cat.skills.map((s, i) => (
                                    <span key={i} className="px-3 py-1 bg-white border border-slate-200 rounded text-[11px] font-bold text-slate-600">
                                       {s}
                                    </span>
                                 ))}
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>

                  {/* Education Vertical Cards */}
                  <div className="space-y-8">
                     <h2 className="text-[12px] font-black uppercase text-slate-400 tracking-widest border-b border-slate-100 pb-2">Academic</h2>
                     <div className="space-y-4">
                        {education && education.map(edu => (
                           <div key={edu.id} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                              <h3 className="text-[12px] font-black text-slate-900 uppercase leading-tight mb-2">{edu.degree}</h3>
                              <p className="text-[11px] font-bold text-violet-700 italic mb-3">{edu.institution}</p>
                              <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{edu.startDate} - {edu.endDate}</p>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>

            <div className="mt-auto pt-12 text-[10px] font-black text-slate-200 uppercase tracking-[1em] text-center">
               Vibrant ATS Stack v4
            </div>
          
<div className="p-8 w-full block shrink-0" style={{marginTop: 'auto'}}>
{renderProjectsSection()}{renderCertificationsSection()}{renderAwardsSection()}{renderAchievementsSection()}{renderLanguagesSection()}
</div>
</div>
        ) : templateId === 'template-ats-compliant-5' ? (
          <div className="flex flex-col h-full min-h-[297mm] text-left bg-white p-12 space-y-12">
             {/* Header - Emerald & Navy (Modern Corporate) */}
             <div className="flex flex-row gap-12 items-center bg-slate-50 p-10 rounded-2xl border-2 border-slate-100 relative">
                <div className="absolute top-0 left-10 w-20 h-2 bg-emerald-500" />
                <div className="flex-1">
                   <h1 className="text-4xl font-black text-slate-900 tracking-tighter leading-none mb-3">
                      {personalInfo.fullName || 'Your Name'}
                   </h1>
                   <p className="text-base font-bold text-emerald-600 uppercase tracking-[0.3em]">{personalInfo.jobTitle}</p>
                </div>
                <div className="text-right space-y-3 border-l-2 border-slate-200 pl-10">
                   <div className="space-y-1">
                      {personalInfo.email && <p className="text-[11px] font-black text-slate-900">{personalInfo.email}</p>}
                      {personalInfo.phone && <p className="text-[11px] font-bold text-slate-400 tracking-tighter">{personalInfo.phone}</p>}
                      {personalInfo.location && <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{personalInfo.location}</p>}
                   </div>
                </div>
             </div>

             {/* Content */}
             <div className="space-y-16">
                {/* Profile Block */}
                {personalInfo.bio && (
                   <div className="space-y-6">
                      <div className="flex items-center gap-4">
                         <h2 className="text-[12px] font-black uppercase text-slate-900 tracking-[0.3em] shrink-0">Executive Summary</h2>
                         <div className="flex-1 h-px bg-slate-100" />
                      </div>
                      <p className="text-[13px] text-slate-600 leading-relaxed font-medium bg-emerald-50/30 p-8 rounded-xl border border-emerald-100/50 italic">
                         {personalInfo.bio}
                      </p>
                   </div>
                )}

                {/* Experience Block */}
                {experience && experience.length > 0 && (
                   <div className="space-y-8">
                      <div className="flex items-center gap-4">
                         <h2 className="text-[12px] font-black uppercase text-slate-900 tracking-[0.3em] shrink-0">Professional Milestone</h2>
                         <div className="flex-1 h-px bg-slate-100" />
                      </div>
                      <div className="space-y-12">
                         {experience.map(exp => (
                            <div key={exp.id} className="grid grid-cols-[180px_1fr] gap-10">
                               <div className="space-y-1">
                                  <span className="text-[13px] font-black text-slate-900 tracking-tighter">{exp.startDate} - {exp.currentlyWorking ? 'NOW' : exp.endDate}</span>
                                  <div className="flex flex-row items-center gap-2">
                                     <div className="w-4 h-[2px] bg-emerald-500" />
                                     <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Chronology</span>
                                  </div>
                               </div>
                               <div className="space-y-4">
                                  <div>
                                     <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter leading-none">{exp.position}</h3>
                                     <p className="text-[13px] font-bold text-emerald-600 mt-1 italic">{exp.company}</p>
                                  </div>
                                  <p className="text-[13px] text-slate-600 leading-relaxed">
                                     {exp.description}
                                  </p>
                               </div>
                            </div>
                         ))}
                      </div>
                   </div>
                )}

                <div className="grid grid-cols-2 gap-16 pt-10 border-t border-slate-100">
                   {/* Technical Arsenal */}
                   {skills && skills.length > 0 && (
                      <div className="space-y-8">
                         <h2 className="text-[11px] font-black uppercase text-slate-900 tracking-[0.4em]">Integrated Stack</h2>
                         <div className="grid grid-cols-1 gap-6">
                            {skills.map(cat => (
                               <div key={cat.id} className="space-y-3">
                                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-tighter">{cat.name}</p>
                                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] font-black text-slate-800 uppercase tracking-tighter">
                                     {cat.skills.join(' • ')}
                                  </div>
                               </div>
                            ))}
                         </div>
                      </div>
                   )}

                   {/* Major Qualifications */}
                   {education && education.length > 0 && (
                      <div className="space-y-8">
                         <h2 className="text-[11px] font-black uppercase text-slate-900 tracking-[0.4em]">Qualifications</h2>
                         <div className="space-y-8">
                            {education.map(edu => (
                               <div key={edu.id} className="relative pl-10 border-l-2 border-emerald-500">
                                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full border-4 border-white bg-slate-900" />
                                  <h3 className="text-sm font-black text-slate-900 uppercase leading-none mb-2">{edu.degree}</h3>
                                  <p className="text-xs font-bold text-emerald-600 italic mb-2">{edu.institution}</p>
                                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{edu.startDate} — {edu.endDate}</span>
                               </div>
                            ))}
                         </div>
                      </div>
                   )}
                </div>
             </div>

             <div className="mt-auto py-6 bg-slate-900 rounded-2xl flex justify-between px-8 items-center">
                <span className="text-[9px] font-black text-white opacity-20 uppercase tracking-[0.8em]">Modern Professional ATS v5</span>
                <div className="flex gap-2">
                   <div className="w-2 h-2 rounded-full bg-emerald-500" />
                   <div className="w-2 h-2 rounded-full bg-emerald-500/50" />
                   <div className="w-2 h-2 rounded-full bg-emerald-500/20" />
                </div>
             </div>
          
<div className="p-8 w-full block shrink-0" style={{marginTop: 'auto'}}>
{renderProjectsSection()}{renderCertificationsSection()}{renderAwardsSection()}{renderAchievementsSection()}{renderLanguagesSection()}
</div>
</div>
        ) : templateId === 'template-ats-compliant-6' ? (
          <div className="flex flex-col h-full min-h-[297mm] text-left bg-[#fcfdfe] p-12 space-y-10">
             {/* Header - Sky Blue & Charcoal */}
             <div className="border-l-[12px] border-sky-500 pl-10 py-6 bg-slate-900 rounded-r-3xl">
                <h1 className="text-4xl font-extrabold text-white tracking-tight uppercase leading-none">{personalInfo.fullName || 'Your Name'}</h1>
                <p className="text-lg font-bold text-sky-400 mt-2 uppercase tracking-widest">{personalInfo.jobTitle}</p>
                <div className="mt-6 flex flex-wrap gap-x-10 gap-y-4 text-[12px] font-bold text-white/50 uppercase tracking-widest leading-none">
                   {personalInfo.email && <span className="flex items-center gap-2 text-sky-200">{personalInfo.email}</span>}
                   {personalInfo.phone && <span className="flex items-center gap-2">{personalInfo.phone}</span>}
                   {personalInfo.location && <span className="flex items-center gap-2">{personalInfo.location}</span>}
                </div>
             </div>

             <div className="space-y-12 shrink-0">
                {personalInfo.bio && (
                   <div className="space-y-4">
                      <div className="flex items-center gap-6">
                         <h2 className="text-[14px] font-black uppercase text-slate-900 tracking-[0.3em] shrink-0">Core Narrative</h2>
                         <div className="flex-1 h-px bg-slate-100" />
                      </div>
                      <p className="text-[13px] text-slate-600 leading-relaxed font-semibold italic border-l-4 border-sky-100 pl-8 py-2 bg-sky-50/20">
                         {personalInfo.bio}
                      </p>
                   </div>
                )}

                {experience && experience.length > 0 && (
                   <div className="space-y-8">
                      <div className="flex items-center gap-6">
                         <h2 className="text-[14px] font-black uppercase text-slate-900 tracking-[0.3em] shrink-0">Carrier History</h2>
                         <div className="flex-1 h-px bg-slate-100" />
                      </div>
                      <div className="space-y-10">
                         {experience.map(exp => (
                            <div key={exp.id} className="grid grid-cols-[200px_1fr] gap-12">
                               <div className="space-y-2">
                                  <p className="text-[14px] font-black text-slate-900 tracking-tighter">{exp.startDate} - {exp.currentlyWorking ? 'PRESENT' : exp.endDate}</p>
                                  <div className="h-1.5 w-12 bg-sky-500 rounded-full" />
                               </div>
                               <div className="space-y-4">
                                  <div>
                                     <h3 className="text-xl font-black text-slate-900 tracking-tighter uppercase leading-none">{exp.position}</h3>
                                     <p className="text-[13px] font-bold text-sky-600 mt-2 italic tracking-tight">{exp.company}</p>
                                  </div>
                                  <p className="text-[13.5px] text-slate-600 leading-relaxed font-medium">
                                     {exp.description}
                                  </p>
                               </div>
                            </div>
                         ))}
                      </div>
                   </div>
                )}

                <div className="grid grid-cols-[1fr_300px] gap-16 pt-6">
                   {skills && skills.length > 0 && (
                      <div className="space-y-8">
                         <h2 className="text-[12px] font-black uppercase text-slate-900 tracking-[0.4em] border-b-2 border-slate-900 pb-2">Technical Arsenal</h2>
                         <div className="grid grid-cols-2 gap-x-12 gap-y-8 text-[12px] font-black text-slate-700">
                            {skills.map(cat => (
                               <div key={cat.id} className="space-y-2">
                                  <p className="text-[10px] font-black text-sky-600 uppercase tracking-widest leading-none">{cat.name}</p>
                                  <p className="leading-relaxed border-l-2 border-sky-100 pl-4 uppercase tracking-tighter">
                                     {cat.skills.join(' / ')}
                                  </p>
                               </div>
                            ))}
                         </div>
                      </div>
                   )}

                   {education && education.length > 0 && (
                      <div className="space-y-8">
                         <h2 className="text-[12px] font-black uppercase text-slate-900 tracking-[0.4em] border-b-2 border-slate-900 pb-2">Qualifications</h2>
                         <div className="space-y-8">
                            {education.map(edu => (
                               <div key={edu.id} className="space-y-2">
                                  <div className="flex flex-col gap-1">
                                     <h3 className="text-[13px] font-black text-slate-900 uppercase leading-tight tracking-tighter">{edu.degree}</h3>
                                     <p className="text-[12px] font-bold text-sky-600 italic">{edu.institution}</p>
                                  </div>
                                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{edu.startDate} — {edu.endDate}</p>
                               </div>
                            ))}
                         </div>
                      </div>
                   )}
                </div>
             </div>

             <div className="mt-auto pt-10 flex justify-between items-end border-t border-slate-100">
                <div className="space-y-1">
                   <p className="text-[10px] font-black text-slate-900 uppercase tracking-[0.5em] leading-none opacity-20">Sky Blue System v6</p>
                   <p className="text-[8px] font-bold text-slate-300 uppercase tracking-widest">ATS Compliant Structure</p>
                </div>
                <div className="h-10 w-10 border-4 border-sky-500 rounded-full flex items-center justify-center">
                   <div className="w-4 h-4 bg-slate-900 rounded-full" />
                </div>
             </div>
          
<div className="p-8 w-full block shrink-0" style={{marginTop: 'auto'}}>
{renderProjectsSection()}{renderCertificationsSection()}{renderAwardsSection()}{renderAchievementsSection()}{renderLanguagesSection()}
</div>
</div>
        ) : templateId === 'template-ats-compliant-7' ? (
          <div className="flex flex-col h-full min-h-[297mm] text-left bg-white p-14 space-y-12">
             {/* Header - Lavender & Gold */}
             <div className="flex flex-col gap-8 relative pb-10 border-b-8 border-violet-900">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="space-y-4">
                   <h1 className="text-5xl font-black text-violet-900 tracking-tighter leading-[0.8]">{personalInfo.fullName || 'Your Name'}</h1>
                   <p className="text-xl font-black text-amber-600 uppercase tracking-[0.4em] italic leading-none">{personalInfo.jobTitle}</p>
                </div>
                <div className="flex flex-wrap gap-8 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                   {personalInfo.email && <span className="text-violet-700 bg-violet-50 px-4 py-2 rounded-full border border-violet-100">{personalInfo.email}</span>}
                   {personalInfo.phone && <span className="px-4 py-2 bg-slate-50 rounded-full">{personalInfo.phone}</span>}
                   {personalInfo.location && <span className="px-4 py-2 bg-slate-50 rounded-full">{personalInfo.location}</span>}
                </div>
             </div>

             <div className="space-y-16">
                {personalInfo.bio && (
                   <div className="grid grid-cols-[140px_1fr] gap-10">
                      <h2 className="text-[12px] font-black text-violet-900 uppercase tracking-[0.5em] pt-1">About</h2>
                      <div className="bg-gradient-to-br from-violet-50 to-white p-8 rounded-3xl border border-violet-100 shadow-sm">
                         <p className="text-[14px] text-slate-600 leading-relaxed font-semibold italic text-justify">
                            {personalInfo.bio}
                         </p>
                      </div>
                   </div>
                )}

                {experience && experience.length > 0 && (
                   <div className="grid grid-cols-[140px_1fr] gap-10">
                      <h2 className="text-[12px] font-black text-violet-900 uppercase tracking-[0.5em] pt-1">Journey</h2>
                      <div className="space-y-12">
                         {experience.map(exp => (
                            <div key={exp.id} className="relative pl-12 border-l-4 border-amber-200">
                               <div className="absolute -left-[14px] top-0 w-6 h-6 rounded-full bg-violet-900 border-4 border-white shadow-md" />
                               <div className="flex justify-between items-baseline mb-3">
                                  <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase leading-none">{exp.position}</h3>
                                  <span className="text-[11px] font-black text-amber-600 tracking-widest">{exp.startDate} - {exp.currentlyWorking ? 'NOW' : exp.endDate}</span>
                               </div>
                               <p className="text-sm font-black text-violet-700 uppercase tracking-[0.3em] mb-4 italic opacity-70 leading-none">{exp.company}</p>
                               <p className="text-[14px] text-slate-600 leading-relaxed font-medium">
                                  {exp.description}
                                </p>
                            </div>
                         ))}
                      </div>
                   </div>
                )}

                <div className="grid grid-cols-2 gap-20">
                   {skills && skills.length > 0 && (
                      <div className="space-y-8">
                         <h2 className="text-[12px] font-black text-violet-900 uppercase tracking-[0.5em] border-b border-violet-100 pb-2">Skills</h2>
                         <div className="space-y-6">
                            {skills.map(cat => (
                               <div key={cat.id} className="space-y-3">
                                  <p className="text-xs font-black text-amber-600 uppercase tracking-tighter leading-none opacity-50">{cat.name}</p>
                                  <div className="flex flex-wrap gap-2">
                                     {cat.skills.map((s, i) => (
                                        <span key={i} className="text-[13px] font-black text-slate-900 border-b-2 border-violet-100 pb-1 uppercase tracking-tighter leading-none">
                                           {s}
                                        </span>
                                     ))}
                                  </div>
                               </div>
                            ))}
                         </div>
                      </div>
                   )}

                   {education && education.length > 0 && (
                      <div className="space-y-8">
                         <h2 className="text-[12px] font-black text-violet-900 uppercase tracking-[0.5em] border-b border-violet-100 pb-2">Academic</h2>
                         <div className="space-y-8">
                            {education.map(edu => (
                               <div key={edu.id} className="space-y-3 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                  <div>
                                     <h3 className="text-[14px] font-black text-slate-900 uppercase tracking-tighter leading-tight">{edu.degree}</h3>
                                     <p className="text-[12px] font-bold text-violet-700 italic mt-1">{edu.institution}</p>
                                  </div>
                                  <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase">{edu.startDate} - {edu.endDate}</p>
                               </div>
                            ))}
                         </div>
                      </div>
                   )}
                </div>
             </div>

             <div className="mt-auto py-8 bg-violet-900 rounded-[3rem] px-12 flex justify-between items-center text-white overflow-hidden relative">
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/5 rotate-45 translate-x-12 translate-y-12" />
                <span className="text-[11px] font-black uppercase tracking-[1em] opacity-40 italic"> Lavender Strategic v7</span>
                <div className="w-12 h-1 bg-amber-400 rounded-full" />
             </div>
          
<div className="p-8 w-full block shrink-0" style={{marginTop: 'auto'}}>
{renderProjectsSection()}{renderCertificationsSection()}{renderAwardsSection()}{renderAchievementsSection()}{renderLanguagesSection()}
</div>
</div>
        ) : templateId === 'template-ats-compliant-8' ? (
          <div className="flex flex-col h-full min-h-[297mm] text-left bg-[#fdfaf8] p-16 space-y-16">
             {/* Header - Warm Orange & Navy */}
             <div className="flex flex-col gap-10">
                <div className="flex justify-between items-center">
                   <h1 className="text-6xl font-black text-slate-900 tracking-tighter leading-none">{personalInfo.fullName || 'Your Name'}</h1>
                   <div className="w-24 h-24 bg-orange-500 rounded-full" />
                </div>
                <div className="flex items-center gap-10 pt-6 border-t-2 border-slate-900">
                   <p className="text-xl font-black text-orange-600 uppercase tracking-[0.3em] italic shrink-0">{personalInfo.jobTitle}</p>
                   <div className="flex-1 h-px bg-slate-200" />
                   <div className="flex gap-6 text-[11px] font-black uppercase text-slate-400">
                      {personalInfo.email && <span>{personalInfo.email}</span>}
                      {personalInfo.location && <span>{personalInfo.location}</span>}
                   </div>
                </div>
             </div>

             <div className="space-y-20 shrink-0">
                {personalInfo.bio && (
                   <div className="space-y-6">
                      <h2 className="text-[10px] font-black uppercase tracking-[0.8em] text-orange-600 leading-none">Perspective</h2>
                      <p className="text-[15px] text-slate-700 leading-relaxed font-black uppercase tracking-tighter text-justify">
                         {personalInfo.bio}
                      </p>
                   </div>
                )}

                {experience && experience.length > 0 && (
                   <div className="space-y-12">
                      <h2 className="text-[10px] font-black uppercase tracking-[0.8em] text-orange-600 leading-none">Trajectory</h2>
                      <div className="space-y-16">
                         {experience.map(exp => (
                            <div key={exp.id} className="grid grid-cols-[140px_1fr] gap-12 group">
                               <div className="space-y-2">
                                  <p className="text-[18px] font-black text-slate-900 tracking-tighter leading-none">{exp.startDate}</p>
                                  <p className="text-[11px] font-black text-slate-300 uppercase tracking-[0.2em] leading-none opacity-50">To {exp.currentlyWorking ? 'Present' : exp.endDate}</p>
                                  <div className="h-10 border-r-4 border-orange-500 w-full opacity-0 group-hover:opacity-100 transition-opacity" />
                               </div>
                               <div className="space-y-4">
                                  <div>
                                     <h3 className="text-3xl font-black text-slate-900 tracking-tighter leading-none mb-4">{exp.position}</h3>
                                     <div className="flex items-center gap-4">
                                        <p className="text-sm font-black text-orange-600 uppercase tracking-widest">{exp.company}</p>
                                        <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                                     </div>
                                  </div>
                                  <p className="text-[15px] text-slate-600 leading-relaxed font-medium bg-white p-8 rounded-r-3xl border-l-[12px] border-slate-900 shadow-sm">
                                     {exp.description}
                                  </p>
                               </div>
                            </div>
                         ))}
                      </div>
                   </div>
                )}

                <div className="grid grid-cols-2 gap-20">
                   {skills && skills.length > 0 && (
                      <div className="space-y-10">
                         <h2 className="text-[10px] font-black uppercase tracking-[0.8em] text-orange-600 leading-none">Compentencies</h2>
                         <div className="space-y-8">
                            {skills.map(cat => (
                               <div key={cat.id} className="space-y-3">
                                  <p className="text-[11px] font-black text-slate-300 uppercase border-b border-slate-100 pb-2 leading-none flex justify-between">
                                     <span>{cat.name}</span>
                                     <span className="text-orange-500 font-serif font-bold italic tracking-tighter">Essential</span>
                                  </p>
                                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-[14px] font-black text-slate-900 uppercase tracking-tighter">
                                     {cat.skills.join(' / ')}
                                  </div>
                               </div>
                            ))}
                         </div>
                      </div>
                   )}

                   <div className="bg-slate-900 p-12 rounded-[4rem] text-white space-y-10">
                      <h2 className="text-[10px] font-black uppercase tracking-[0.6em] text-orange-400 leading-none">Academic Records</h2>
                      <div className="space-y-10">
                         {education && education.map(edu => (
                            <div key={edu.id} className="space-y-3">
                               <h3 className="text-[16px] font-black uppercase tracking-tighter leading-tight border-l-2 border-orange-500 pl-4">{edu.degree}</h3>
                               <div className="pl-4">
                                  <p className="text-[12px] font-bold text-orange-400 tracking-widest leading-none">{edu.institution}</p>
                                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-2">{edu.startDate} - {edu.endDate}</p>
                               </div>
                            </div>
                         ))}
                      </div>
                   </div>
                </div>
             </div>

             <div className="mt-auto py-6 border-y-2 border-slate-100 flex justify-center">
                <span className="text-[11px] font-black uppercase tracking-[2em] text-slate-200">Dynamic Orange v8</span>
             </div>
          
<div className="p-8 w-full block shrink-0" style={{marginTop: 'auto'}}>
{renderProjectsSection()}{renderCertificationsSection()}{renderAwardsSection()}{renderAchievementsSection()}{renderLanguagesSection()}
</div>
</div>
        ) : templateId === 'template-ats-compliant-9' ? (
          <div className="flex flex-col h-full min-h-[297mm] text-left bg-white p-12 space-y-12">
             {/* Header - Mint & Navy */}
             <div className="flex items-start gap-12 border-b-[20px] border-emerald-500 pb-16">
                <div className="w-40 h-40 bg-slate-900 rounded-lg flex items-center justify-center shrink-0">
                   <span className="text-7xl font-black text-white">
                      {personalInfo.fullName ? personalInfo.fullName.charAt(0) : 'Y'}
                   </span>
                </div>
                <div className="space-y-6 pt-4">
                   <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase leading-[0.8]">{personalInfo.fullName || 'Your Name'}</h1>
                   <div className="flex items-center gap-6">
                      <p className="text-lg font-black text-emerald-600 uppercase tracking-[0.4em] leading-none shrink-0">{personalInfo.jobTitle}</p>
                      <div className="flex-1 h-px bg-slate-100" />
                   </div>
                   <div className="grid grid-cols-2 gap-x-12 gap-y-2 text-[11px] font-black uppercase tracking-widest text-slate-400">
                      {personalInfo.email && <span className="text-emerald-500">{personalInfo.email}</span>}
                      {personalInfo.phone && <span>{personalInfo.phone}</span>}
                      {personalInfo.location && <span>{personalInfo.location}</span>}
                   </div>
                </div>
             </div>

             <div className="space-y-16">
                {personalInfo.bio && (
                   <div className="space-y-6">
                      <h2 className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-300">Executive Charter</h2>
                      <p className="text-[14px] text-slate-700 leading-relaxed font-bold tracking-tight border-l-8 border-emerald-500 pl-10 py-2">
                         {personalInfo.bio}
                      </p>
                   </div>
                )}

                <div className="grid grid-cols-[1fr_320px] gap-20">
                   {experience && experience.length > 0 && (
                      <div className="space-y-12">
                         <h2 className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-300">Engagement Record</h2>
                         <div className="space-y-16">
                            {experience.map(exp => (
                               <div key={exp.id} className="space-y-6">
                                  <div className="flex justify-between items-baseline mb-2">
                                     <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase leading-none">{exp.position}</h3>
                                     <span className="text-[11px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded tracking-tighter">{exp.startDate} - {exp.endDate}</span>
                                  </div>
                                  <p className="text-sm font-black text-slate-400 uppercase tracking-[0.3em] leading-none">{exp.company}</p>
                                  <p className="text-[14px] text-slate-600 leading-relaxed font-medium border-b border-slate-50 pb-8">
                                     {exp.description}
                                  </p>
                               </div>
                            ))}
                         </div>
                      </div>
                   )}

                   <div className="space-y-16">
                      {skills && skills.length > 0 && (
                         <div className="space-y-8">
                            <h2 className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-300">Technical Unit</h2>
                            <div className="space-y-6">
                               {skills.map(cat => (
                                  <div key={cat.id} className="bg-slate-50 p-6 rounded-lg border border-slate-100">
                                     <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest leading-none mb-4">{cat.name}</p>
                                     <div className="flex flex-wrap gap-2">
                                        {cat.skills.map((s, i) => (
                                           <span key={i} className="text-[11px] font-black text-slate-900 bg-white px-2 py-1 border border-slate-200 rounded uppercase">
                                              {s}
                                           </span>
                                        ))}
                                     </div>
                                  </div>
                               ))}
                            </div>
                         </div>
                      )}

                      {education && education.length > 0 && (
                         <div className="space-y-8">
                            <h2 className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-300">Credentials</h2>
                            <div className="space-y-10">
                               {education.map(edu => (
                                  <div key={edu.id} className="space-y-2 border-t-2 border-emerald-500 pt-4">
                                     <h3 className="text-[13px] font-black tracking-tighter uppercase text-slate-900">{edu.degree}</h3>
                                     <p className="text-[11px] font-bold text-emerald-600 italic leading-none">{edu.institution}</p>
                                     <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mt-2">{edu.startDate} — {edu.endDate}</p>
                                  </div>
                               ))}
                            </div>
                         </div>
                      )}
                   </div>
                </div>
             </div>

             <div className="mt-auto py-10 flex justify-between items-center">
                <p className="text-[11px] font-black text-slate-900 uppercase tracking-[1em] opacity-20">Mint Minimalist v9</p>
                <div className="flex gap-1">
                   <div className="w-12 h-1 bg-emerald-500" />
                   <div className="w-12 h-1 bg-slate-900" />
                </div>
             </div>
          
<div className="p-8 w-full block shrink-0" style={{marginTop: 'auto'}}>
{renderProjectsSection()}{renderCertificationsSection()}{renderAwardsSection()}{renderAchievementsSection()}{renderLanguagesSection()}
</div>
</div>
        ) : templateId === 'template-ats-compliant-10' ? (
          <div className="flex flex-col h-full min-h-[297mm] text-left bg-white p-14 space-y-12">
             {/* Header - Goldenrod & Graphite */}
             <div className="grid grid-cols-[1fr_300px] gap-10 items-end border-b-[12px] border-slate-900 pb-16">
                <div className="space-y-6">
                   <h1 className="text-6xl font-black text-slate-900 tracking-tighter uppercase leading-[0.8]">{personalInfo.fullName || 'Your Name'}</h1>
                   <p className="text-xl font-black text-amber-500 uppercase tracking-[0.4em] leading-none">{personalInfo.jobTitle}</p>
                </div>
                <div className="space-y-3 bg-amber-500 p-8 rounded-3xl text-white shadow-xl shadow-amber-100">
                   <p className="text-[11px] font-black uppercase tracking-widest">{personalInfo.email}</p>
                   <p className="text-[11px] font-black uppercase tracking-widest border-t border-white/20 pt-3">{personalInfo.phone}</p>
                   <p className="text-[11px] font-black uppercase tracking-widest border-t border-white/20 pt-3">{personalInfo.location}</p>
                </div>
             </div>

             <div className="space-y-16">
                {personalInfo.bio && (
                   <div className="space-y-6">
                      <div className="flex items-center gap-4">
                         <h2 className="text-[12px] font-black uppercase text-slate-900 tracking-[0.6em] shrink-0">Profile Overview</h2>
                         <div className="flex-1 h-px bg-slate-100" />
                      </div>
                      <p className="text-[14px] text-slate-600 leading-relaxed font-black uppercase tracking-tighter text-justify bg-slate-50 p-8 rounded-2xl border border-slate-100">
                         {personalInfo.bio}
                      </p>
                   </div>
                )}

                {experience && experience.length > 0 && (
                   <div className="space-y-10">
                      <div className="flex items-center gap-4">
                         <h2 className="text-[12px] font-black uppercase text-slate-900 tracking-[0.6em] shrink-0">Carrier Milestone</h2>
                         <div className="flex-1 h-px bg-slate-100" />
                      </div>
                      <div className="space-y-16">
                         {experience.map(exp => (
                            <div key={exp.id} className="relative pl-16">
                               <div className="absolute left-0 top-0 h-full w-2 bg-amber-500 rounded-full" />
                               <div className="flex justify-between items-baseline mb-4">
                                  <h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">{exp.position}</h3>
                                  <span className="text-[12px] font-black text-amber-600 bg-white border border-amber-100 px-4 py-2 rounded-full shadow-sm">{exp.startDate} – {exp.currentlyWorking ? 'PRESENT' : exp.endDate}</span>
                               </div>
                               <p className="text-sm font-black text-slate-400 uppercase tracking-[0.3em] mb-6 leading-none italic">{exp.company}</p>
                               <p className="text-[14px] text-slate-600 leading-relaxed font-medium max-w-3xl">
                                  {exp.description}
                               </p>
                            </div>
                         ))}
                      </div>
                   </div>
                )}

                <div className="grid grid-cols-[380px_1fr] gap-20">
                   {skills && skills.length > 0 && (
                      <div className="space-y-8">
                         <h2 className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-300">Technical Expertise</h2>
                         <div className="grid grid-cols-1 gap-6">
                            {skills.map(cat => (
                               <div key={cat.id} className="space-y-3">
                                  <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest leading-none border-l-4 border-amber-500 pl-4">{cat.name}</p>
                                  <div className="flex flex-wrap gap-x-8 gap-y-3 text-[14px] font-black text-slate-800 uppercase tracking-tighter">
                                     {cat.skills.join(' / ')}
                                  </div>
                               </div>
                            ))}
                         </div>
                      </div>
                   )}

                   {education && education.length > 0 && (
                      <div className="space-y-8">
                         <h2 className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-300">Major Credentials</h2>
                         <div className="space-y-10">
                            {education.map(edu => (
                               <div key={edu.id} className="space-y-3 p-8 border-2 border-slate-900 rounded-[2rem] relative">
                                  <div className="absolute -top-4 -right-4 w-10 h-10 bg-amber-500 rounded-full" />
                                  <div>
                                     <h3 className="text-[15px] font-black uppercase tracking-tighter text-slate-900 leading-tight">{edu.degree}</h3>
                                     <p className="text-[12px] font-bold text-amber-600 italic mt-1">{edu.institution}</p>
                                  </div>
                                  <p className="text-[10px] font-black text-slate-300 tracking-[0.3em] uppercase">{edu.startDate} — {edu.endDate}</p>
                               </div>
                            ))}
                         </div>
                      </div>
                   )}
                </div>
             </div>

             <div className="mt-auto pt-16 flex justify-between items-center text-slate-900/20">
                <span className="text-[12px] font-black uppercase tracking-[1.5em] italic">Elite Executive v10</span>
                <div className="flex gap-4">
                   <div className="w-4 h-4 bg-amber-500 rounded-full" />
                   <div className="w-4 h-4 bg-slate-900 rounded-full" />
                </div>
             </div>
          
<div className="p-8 w-full block shrink-0" style={{marginTop: 'auto'}}>
{renderProjectsSection()}{renderCertificationsSection()}{renderAwardsSection()}{renderAchievementsSection()}{renderLanguagesSection()}
</div>
</div>
        ) : templateId === 'template-industry-pro-11' ? (
          <div className="flex flex-col h-full min-h-[297mm] text-left bg-white p-16 space-y-12 text-slate-900">
             {/* Header - Clean Light Theme */}
             <div className="flex justify-between items-center border-b-2 border-slate-200 pb-10">
                <div className="space-y-4">
                   <h1 className="text-5xl font-black tracking-tight uppercase leading-none">{personalInfo.fullName || 'Your Name'}</h1>
                   <p className="text-xl font-bold text-sky-500 tracking-widest uppercase">{personalInfo.jobTitle}</p>
                </div>
                <div className="text-right space-y-2 text-sm font-medium text-slate-500">
                   {personalInfo.email && <p>{personalInfo.email}</p>}
                   {personalInfo.phone && <p>{personalInfo.phone}</p>}
                   {personalInfo.location && <p>{personalInfo.location}</p>}
                </div>
             </div>
             
             <div className="grid grid-cols-[1fr_300px] gap-20">
                <div className="space-y-12">
                   {personalInfo.bio && (
                      <div className="space-y-4">
                         <h2 className="text-xs font-black uppercase tracking-[0.4em] text-sky-500">The Abstract</h2>
                         <p className="text-lg font-light leading-relaxed text-slate-700 italic">{personalInfo.bio}</p>
                      </div>
                   )}
                   
                   {experience && experience.length > 0 && (
                      <div className="space-y-8">
                         <h2 className="text-xs font-black uppercase tracking-[0.4em] text-sky-500">Career Vector</h2>
                         <div className="space-y-12">
                            {experience.map(exp => (
                               <div key={exp.id} className="relative pl-10 border-l border-slate-200">
                                  <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 bg-sky-500 rounded-full shadow-[0_0_10px_rgba(14,165,233,0.5)]" />
                                  <div className="flex justify-between items-baseline mb-3">
                                     <h3 className="text-xl font-black text-slate-900 tracking-tight">{exp.position}</h3>
                                     <span className="text-xs font-bold text-slate-500">{exp.startDate} - {exp.currentlyWorking ? 'NOW' : exp.endDate}</span>
                                  </div>
                                  <p className="text-sm font-bold text-sky-500 uppercase mb-4 tracking-widest italic">{exp.company}</p>
                                  <p className="text-base text-slate-600 leading-relaxed font-light">{exp.description}</p>
                               </div>
                            ))}
                         </div>
                      </div>
                   )}
                </div>
                
                <div className="space-y-16">
                   {skills && skills.length > 0 && (
                      <div className="space-y-8">
                         <h2 className="text-xs font-black uppercase tracking-[0.4em] text-sky-500">Core Arsenal</h2>
                         <div className="space-y-8">
                            {skills.map(cat => (
                               <div key={cat.id} className="space-y-3">
                                  <p className="text-xs font-black text-slate-400 uppercase tracking-tighter">{cat.name}</p>
                                  <div className="flex flex-wrap gap-2">
                                     {cat.skills.map((s, i) => (
                                        <span key={i} className="px-3 py-1 bg-slate-100 border border-slate-200 rounded text-xs font-bold text-slate-700 hover:bg-sky-500 hover:text-white transition-colors">{s}</span>
                                     ))}
                                  </div>
                               </div>
                            ))}
                         </div>
                      </div>
                   )}
                   
                   {education && education.length > 0 && (
                      <div className="space-y-8">
                         <h2 className="text-xs font-black uppercase tracking-[0.4em] text-sky-500">Education</h2>
                         <div className="space-y-8">
                            {education.map(edu => (
                               <div key={edu.id} className="space-y-2">
                                  <h3 className="text-lg font-black text-slate-900 tracking-tight uppercase leading-tight">{edu.degree}</h3>
                                  <p className="text-sm font-bold text-slate-500 italic uppercase">{edu.institution}</p>
                                  <p className="text-xs font-bold text-slate-400">{edu.startDate} — {edu.endDate}</p>
                               </div>
                            ))}
                         </div>
                      </div>
                   )}
                </div>
             </div>
             
             <div className="mt-auto pt-10 text-[10px] font-black text-slate-300 uppercase tracking-[1.5em] text-center border-t border-slate-200">
                Modern Edge Pro
             </div>
          
<div className="p-8 w-full block shrink-0" style={{marginTop: 'auto'}}>
{renderProjectsSection()}{renderCertificationsSection()}{renderAwardsSection()}{renderAchievementsSection()}{renderLanguagesSection()}
</div>
</div>
        ) : templateId === 'template-industry-pro-12' ? (
          <div className="flex flex-col h-full min-h-[297mm] text-left bg-[#f8fafc] p-0">
             {/* Sustainable Tech Template - Forest & Sand */}
             <div className="flex flex-row flex-1">
                <div className="w-[320px] bg-[#1e293b] p-12 text-white flex flex-col gap-12">
                   <div className="flex flex-col gap-6">
                      <div className="w-24 h-24 rounded-full bg-emerald-500 flex items-center justify-center text-4xl font-black">
                         {personalInfo.fullName ? personalInfo.fullName.charAt(0) : 'Y'}
                      </div>
                      <div>
                         <h1 className="text-3xl font-black tracking-tight leading-none mb-2">{personalInfo.fullName || 'Your Name'}</h1>
                         <p className="text-sm font-bold text-emerald-400 uppercase tracking-widest">{personalInfo.jobTitle}</p>
                      </div>
                   </div>
                   
                   <div className="space-y-1 text-xs font-medium text-slate-400 border-l border-emerald-500/30 pl-4 py-2">
                      {personalInfo.email && <p className="text-emerald-50">{personalInfo.email}</p>}
                      {personalInfo.phone && <p>{personalInfo.phone}</p>}
                      {personalInfo.location && <p>{personalInfo.location}</p>}
                   </div>
                   
                   {skills && (
                      <div className="space-y-8 mt-4">
                         <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500">Top Skills</h2>
                         <div className="space-y-6">
                            {skills.map(cat => (
                               <div key={cat.id} className="space-y-2">
                                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{cat.name}</p>
                                  <div className="flex flex-wrap gap-1.5">
                                     {cat.skills.map((s, i) => (
                                        <span key={i} className="text-[11px] font-bold text-emerald-100">{s}{i !== cat.skills.length - 1 ? ' • ' : ''}</span>
                                     ))}
                                  </div>
                               </div>
                            ))}
                         </div>
                      </div>
                   )}
                   
                   <div className="mt-auto pt-10 text-[9px] font-black text-slate-700 uppercase tracking-widest">Sustainable Tech</div>
                </div>
                
                <div className="flex-1 p-16 space-y-16">
                   {personalInfo.bio && (
                      <div className="space-y-4">
                         <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 border-b-2 border-emerald-500 pb-2 inline-block">The Vision</h2>
                         <p className="text-[15px] font-medium text-slate-600 leading-relaxed italic">{personalInfo.bio}</p>
                      </div>
                   )}
                   
                   {experience && experience.length > 0 && (
                      <div className="space-y-12">
                         <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 border-b-2 border-emerald-500 pb-2 inline-block">Professional Path</h2>
                         <div className="space-y-16">
                            {experience.map(exp => (
                               <div key={exp.id} className="grid grid-cols-[120px_1fr] gap-10">
                                  <div className="text-right">
                                     <p className="text-sm font-black text-slate-900">{exp.startDate}</p>
                                     <p className="text-[10px] font-bold text-slate-300 uppercase tracking-tighter italic">To {exp.currentlyWorking ? 'Present' : exp.endDate}</p>
                                  </div>
                                  <div className="space-y-3">
                                     <h3 className="text-xl font-bold text-slate-900 tracking-tight leading-tight">{exp.position}</h3>
                                     <p className="text-sm font-black text-emerald-600 uppercase italic tracking-widest">{exp.company}</p>
                                     <p className="text-sm text-slate-500 leading-relaxed font-bold">{exp.description}</p>
                                  </div>
                               </div>
                            ))}
                         </div>
                      </div>
                   )}
                   
                   {education && education.length > 0 && (
                      <div className="space-y-10">
                         <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 border-b-2 border-emerald-500 pb-2 inline-block">Academic Journey</h2>
                         <div className="grid grid-cols-2 gap-10">
                            {education.map(edu => (
                               <div key={edu.id} className="space-y-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                  <div className="w-2 h-2 rounded-full bg-emerald-500 mb-2" />
                                  <h3 className="text-base font-black text-slate-900 leading-tight">{edu.degree}</h3>
                                  <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest italic">{edu.institution}</p>
                                  <span className="text-[10px] font-bold text-slate-300 block mt-2 font-mono uppercase">{edu.startDate} - {edu.endDate}</span>
                               </div>
                            ))}
                         </div>
                      </div>
                   )}
                </div>
             </div>
          
<div className="p-8 w-full block shrink-0" style={{marginTop: 'auto'}}>
{renderProjectsSection()}{renderCertificationsSection()}{renderAwardsSection()}{renderAchievementsSection()}{renderLanguagesSection()}
</div>
</div>
        ) : templateId === 'template-industry-pro-13' ? (
          <div className="flex flex-col h-full min-h-[297mm] text-left bg-[#ffffff] p-16 space-y-16">
             {/* Dynamic Branding */}
             <div className="flex flex-row justify-between items-start gap-12 border-b-8 border-[#1e293b] pb-16">
                <div className="flex-1 space-y-6">
                   <h1 className="text-7xl font-black text-[#1e293b] tracking-tighter leading-[0.8]">
                      {personalInfo.fullName ? (
                        <>
                          <span className="text-[#a855f7]">{personalInfo.fullName.split(' ')[0]}</span>
                          <br />
                          {personalInfo.fullName.split(' ').slice(1).join(' ')}
                        </>
                      ) : 'Your Name'}
                   </h1>
                   <p className="text-xl font-bold bg-[#1e293b] text-white px-4 py-1.5 inline-block tracking-widest uppercase">{personalInfo.jobTitle}</p>
                </div>
                <div className="flex flex-col gap-1 items-end pt-4 font-mono font-black text-[#94a3b8] tracking-tighter uppercase text-xs">
                   {personalInfo.email && <div className="text-[#a855f7] underline decoration-2 underline-offset-4">{personalInfo.email}</div>}
                   {personalInfo.phone && <div className="mt-2 text-[#1e293b]">{personalInfo.phone}</div>}
                   {personalInfo.location && <div className="text-[#1e293b]">{personalInfo.location}</div>}
                </div>
             </div>
             
             <div className="space-y-16">
                {personalInfo.bio && (
                   <div className="grid grid-cols-[180px_1fr] gap-12 group">
                      <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#a855f7] pt-2 border-r-2 border-[#f3e8ff] pr-10 text-right group-hover:border-[#a855f7] transition-colors italic">Executive Summary</h2>
                      <p className="text-[18px] font-black text-[#1e293b] leading-tight tracking-tight uppercase">{personalInfo.bio}</p>
                   </div>
                ) }
                
                {experience && experience.length > 0 && (
                   <div className="grid grid-cols-[180px_1fr] gap-12 group">
                      <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#a855f7] pt-2 border-r-2 border-[#f3e8ff] pr-10 text-right group-hover:border-[#a855f7] transition-colors italic">Career Pulse</h2>
                      <div className="space-y-16">
                         {experience.map(exp => (
                            <div key={exp.id} className="space-y-4">
                               <div className="flex justify-between items-end border-b-2 border-slate-50 pb-2">
                                  <h3 className="text-2xl font-black text-[#1e293b] tracking-tighter uppercase leading-none">{exp.position}</h3>
                                  <span className="text-[12px] font-black bg-[#f3e8ff] text-[#a855f7] px-3 py-1 rounded-full uppercase tracking-widest">{exp.startDate} - {exp.currentlyWorking ? 'NOW' : exp.endDate}</span>
                               </div>
                               <p className="text-sm font-black text-slate-400 tracking-widest uppercase italic">{exp.company}</p>
                               <p className="text-base text-slate-600 leading-relaxed font-bold border-l-4 border-slate-50 pl-6 indent-4">{exp.description}</p>
                            </div>
                         ))}
                      </div>
                   </div>
                )}
                
                <div className="grid grid-cols-[180px_1fr] gap-12 border-t-2 border-slate-50 pt-16">
                   <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#a855f7] pt-2 italic pr-10 text-right">Expert Stack</h2>
                   <div className="flex flex-wrap gap-3">
                      {skills && skills.flatMap(c => c.skills).map((s, i) => (
                         <span key={i} className="px-6 py-2 bg-[#1e293b] text-white font-black uppercase tracking-widest text-[11px] rounded shadow-lg shadow-slate-200">{s}</span>
                      ))}
                   </div>
                </div>
             </div>
             
             <div className="mt-auto flex justify-between items-center text-[10px] font-black text-[#cbd5e1] uppercase tracking-[1em]">
                <span>Dynamic Branding</span>
                <div className="flex gap-2">
                   <div className="w-12 h-2 bg-[#a855f7]" />
                   <div className="w-12 h-2 bg-[#1e293b]" />
                </div>
             </div>
          
<div className="p-8 w-full block shrink-0" style={{marginTop: 'auto'}}>
{renderProjectsSection()}{renderCertificationsSection()}{renderAwardsSection()}{renderAchievementsSection()}{renderLanguagesSection()}
</div>
</div>
        ) : templateId === 'template-industry-pro-14' ? (
          <div className="flex flex-col h-full min-h-[297mm] text-left bg-white p-0">
             {/* Global Consulting */}
             <div className="bg-[#1d4ed8] p-16 pb-24 text-white relative">
                <div className="absolute bottom-0 right-0 w-full h-8 bg-[#cbd5e1] transform skew-y-1 origin-bottom" />
                <div className="relative z-10 flex flex-row justify-between items-end">
                   <div className="space-y-6">
                      <h1 className="text-5xl font-black uppercase tracking-tight leading-none">{personalInfo.fullName || 'Your Name'}</h1>
                      <div className="h-1 w-24 bg-[#cbd5e1]" />
                      <p className="text-xl font-bold tracking-[0.3em] uppercase italic text-blue-100">{personalInfo.jobTitle}</p>
                   </div>
                   <div className="flex flex-col gap-2 text-right font-medium text-blue-100 text-[11px] uppercase tracking-widest">
                      {personalInfo.email && <div className="border-b border-blue-500 pb-1">{personalInfo.email}</div>}
                      {personalInfo.phone && <div>{personalInfo.phone}</div>}
                      {personalInfo.location && <div>{personalInfo.location}</div>}
                   </div>
                </div>
             </div>
             
             <div className="flex-1 p-16 pt-24 grid grid-cols-[1fr_260px] gap-20">
                <div className="space-y-16">
                   {personalInfo.bio && (
                      <div className="space-y-6">
                         <h2 className="text-xs font-black uppercase tracking-[0.4em] text-[#1d4ed8]">Executive Summary</h2>
                         <p className="text-base text-slate-600 leading-relaxed font-bold border-l-4 border-[#1d4ed8] pl-8 italic">{personalInfo.bio}</p>
                      </div>
                   )}
                   
                   {experience && experience.length > 0 && (
                      <div className="space-y-10">
                         <h2 className="text-xs font-black uppercase tracking-[0.4em] text-[#1d4ed8]">Milestone Record</h2>
                         <div className="space-y-12">
                            {experience.map(exp => (
                               <div key={exp.id} className="space-y-4 group">
                                  <div className="flex justify-between items-baseline mb-2">
                                     <h3 className="text-xl font-black text-slate-900 uppercase group-hover:text-[#1d4ed8] transition-colors">{exp.position}</h3>
                                     <span className="text-xs font-black text-slate-300 font-mono italic">{exp.startDate} — {exp.currentlyWorking ? 'NOW' : exp.endDate}</span>
                                  </div>
                                  <p className="text-sm font-black text-slate-400 tracking-widest uppercase mb-4 pl-10 border-l border-slate-100">{exp.company}</p>
                                  <p className="text-sm text-slate-500 leading-relaxed font-medium pl-10">{exp.description}</p>
                               </div>
                            ))}
                         </div>
                      </div>
                   )}
                </div>
                
                <div className="space-y-16">
                   {skills && skills.length > 0 && (
                      <div className="space-y-8">
                         <h2 className="text-xs font-black uppercase tracking-[0.4em] text-[#1d4ed8]">Top Competencies</h2>
                         <div className="space-y-8">
                            {skills.map(cat => (
                               <div key={cat.id} className="space-y-3">
                                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">{cat.name}</p>
                                  <div className="flex flex-wrap gap-2 text-xs font-bold text-slate-700 leading-relaxed">
                                     {cat.skills.join(' / ')}
                                  </div>
                               </div>
                            ))}
                         </div>
                      </div>
                   )}
                   
                   {education && education.length > 0 && (
                      <div className="space-y-8">
                         <h2 className="text-xs font-black uppercase tracking-[0.4em] text-[#1d4ed8]">Academic Background</h2>
                         <div className="space-y-8">
                            {education.map(edu => (
                               <div key={edu.id} className="space-y-2">
                                  <h3 className="text-sm font-black text-slate-900 uppercase leading-tight">{edu.degree}</h3>
                                  <p className="text-[11px] font-black text-[#1d4ed8] uppercase italic">{edu.institution}</p>
                                  <p className="text-[10px] font-bold text-slate-300 uppercase mt-2">{edu.startDate} - {edu.endDate}</p>
                               </div>
                            ))}
                         </div>
                      </div>
                   )}
                </div>
             </div>
             
             <div className="p-16 py-8 bg-slate-900 text-white flex justify-between items-center text-[9px] font-black uppercase tracking-[1em]">
                <span>Global Consulting</span>
                <div className="flex gap-4">
                   <div className="w-1 h-1 rounded-full bg-[#1d4ed8]" />
                   <div className="w-1 h-1 rounded-full bg-[#1d4ed8]" />
                </div>
             </div>
          
<div className="p-8 w-full block shrink-0" style={{marginTop: 'auto'}}>
{renderProjectsSection()}{renderCertificationsSection()}{renderAwardsSection()}{renderAchievementsSection()}{renderLanguagesSection()}
</div>
</div>
        ) : templateId === 'template-industry-pro-15' ? (
          <div className="flex flex-col h-full min-h-[297mm] text-center bg-[#fdfcfb] p-24 space-y-24">
             {/* Minimalist Zen */}
             <div className="space-y-8">
                <h1 className="text-6xl font-serif font-light text-[#1e293b] tracking-[0.3em] uppercase leading-none">
                   {personalInfo.fullName || 'Your Name'}
                </h1>
                <div className="flex flex-col items-center gap-4">
                   <div className="h-[2px] w-12 bg-[#1e293b]" />
                   <p className="text-sm font-bold tracking-[0.8em] text-slate-400 uppercase italic">
                      {personalInfo.jobTitle}
                   </p>
                </div>
                <div className="flex justify-center gap-12 text-[10px] font-medium text-slate-400 uppercase tracking-[0.2em] pt-8">
                   {personalInfo.email && <span className="underline decoration-slate-200 underline-offset-8">{personalInfo.email}</span>}
                   {personalInfo.phone && <span>{personalInfo.phone}</span>}
                   {personalInfo.location && <span>{personalInfo.location}</span>}
                </div>
             </div>
             
             <div className="max-w-3xl mx-auto w-full space-y-24 text-left">
                {personalInfo.bio && (
                   <div className="text-center space-y-8">
                      <h2 className="text-[9px] font-black uppercase tracking-[0.6em] text-slate-200">Perspective</h2>
                      <p className="text-xl leading-relaxed text-slate-600 font-serif italic max-w-2xl mx-auto font-light">
                        {personalInfo.bio}
                      </p>
                   </div>
                )}
                
                {experience && experience.length > 0 && (
                   <div className="space-y-16">
                      <h2 className="text-[9px] font-black uppercase tracking-[0.6em] text-slate-200 text-center border-b border-slate-100 pb-12 mb-12">The Narrative</h2>
                      <div className="space-y-20">
                         {experience.map(exp => (
                            <div key={exp.id} className="space-y-6 group">
                               <div className="flex justify-between items-baseline flex-wrap gap-4">
                                  <h3 className="font-serif font-light italic text-2xl text-slate-900 brightness-75 group-hover:brightness-100 transition-all">{exp.position}</h3>
                                  <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{exp.startDate} / {exp.currentlyWorking ? 'PRESENT' : exp.endDate}</span>
                               </div>
                               <p className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] font-sans">{exp.company}</p>
                               <p className="text-sm text-slate-500 leading-relaxed font-serif font-light opacity-80 group-hover:opacity-100 transition-opacity">
                                  {exp.description}
                               </p>
                            </div>
                         ))}
                      </div>
                   </div>
                )}
                
                <div className="grid grid-cols-2 gap-20 border-t border-slate-100 pt-24 mt-24">
                   {skills && (
                      <div className="space-y-10">
                         <h2 className="text-[9px] font-black uppercase tracking-[0.6em] text-slate-200">Competencies</h2>
                         <div className="space-y-10">
                            {skills.map(cat => (
                               <div key={cat.id} className="space-y-2">
                                  <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest">{cat.name}</p>
                                  <p className="text-sm font-serif font-light leading-relaxed text-slate-600 italic">
                                     {cat.skills.join(' • ')}
                                  </p>
                               </div>
                            ))}
                         </div>
                      </div>
                   )}
                   
                   {education && education.length > 0 && (
                      <div className="space-y-10 text-right">
                         <h2 className="text-[9px] font-black uppercase tracking-[0.6em] text-slate-200">Scholastics</h2>
                         <div className="space-y-12">
                            {education.map(edu => (
                               <div key={edu.id} className="space-y-2">
                                  <h3 className="text-sm font-serif font-light uppercase text-slate-800 tracking-widest">{edu.degree}</h3>
                                  <p className="text-[11px] text-slate-400 font-serif italic mb-1">{edu.institution}</p>
                                  <p className="text-[9px] text-slate-300 font-sans font-bold uppercase">{edu.startDate} — {edu.endDate}</p>
                               </div>
                            ))}
                         </div>
                      </div>
                   )}
                </div>
             </div>
             
             <div className="mt-auto pt-24 text-[8px] font-serif font-black italic text-slate-200 text-center tracking-[2em] uppercase brightness-150">
                Zen Flow
             </div>
          
<div className="p-8 w-full block shrink-0" style={{marginTop: 'auto'}}>
{renderProjectsSection()}{renderCertificationsSection()}{renderAwardsSection()}{renderAchievementsSection()}{renderLanguagesSection()}
</div>
</div>
        ) : templateId === 'template-single-column-1' ? (
          <div className="flex flex-col h-full min-h-[297mm] text-center bg-[#fdfcfb] p-16 space-y-12">
            {/* Elegant Centered Header */}
            <div className="space-y-6">
              <h1 className="text-5xl font-serif font-light text-slate-900 tracking-[0.2em] uppercase leading-none">
                {personalInfo.fullName || 'Your Name'}
              </h1>
              {personalInfo.jobTitle && (
                <p className="text-sm font-bold tracking-[0.5em] text-slate-400 uppercase italic">
                  {personalInfo.jobTitle}
                </p>
              )}
              <div className="flex justify-center gap-10 text-[11px] font-medium text-slate-500 uppercase tracking-widest pt-4">
                {personalInfo.email && <span>{personalInfo.email}</span>}
                {personalInfo.phone && <span>{personalInfo.phone}</span>}
                {personalInfo.location && <span>{personalInfo.location}</span>}
              </div>
            </div>

            <div className="max-w-3xl mx-auto w-full space-y-16 text-left">
              {/* Profile Summary - Centered Text Style */}
              {personalInfo.bio && (
                <div className="space-y-6 text-center">
                  <div className="w-12 h-px bg-slate-200 mx-auto" />
                  <p className="text-[14px] leading-relaxed text-slate-600 font-serif italic max-w-2xl mx-auto">
                    {personalInfo.bio}
                  </p>
                </div>
              )}

              {/* Work History */}
              {experience && experience.length > 0 && (
                <div className="space-y-10">
                  <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-center text-slate-300 border-b border-slate-100 pb-4">Professional Record</h2>
                  <div className="space-y-12">
                    {experience.map(exp => (
                      <div key={exp.id} className="space-y-3">
                        <div className="flex justify-between items-baseline border-b border-slate-50 pb-1">
                          <h3 className="font-bold text-slate-900 text-sm uppercase tracking-tight">{exp.position}</h3>
                          <span className="text-[10px] font-bold text-slate-400 uppercase">{exp.startDate} — {exp.currentlyWorking ? 'Present' : exp.endDate}</span>
                        </div>
                        <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest italic" style={colorStyle}>{exp.company}</p>
                        <p className="text-[11.5px] text-slate-600 leading-relaxed indent-8">
                          {exp.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills and Education Grid */}
              <div className="grid grid-cols-2 gap-16 border-t border-slate-100 pt-16">
                 {/* Education */}
                 {education && education.length > 0 && (
                   <div className="space-y-8 text-right pr-8 border-r border-slate-50">
                     <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-300 italic">Academic</h2>
                     <div className="space-y-6">
                       {education.map(edu => (
                         <div key={edu.id}>
                           <h3 className="font-bold text-slate-800 text-[11px] mb-1 leading-tight uppercase tracking-tight">{edu.degree}</h3>
                           <p className="text-[10.5px] text-slate-500 font-serif italic mb-1">{edu.institution}</p>
                           <p className="text-[9px] text-slate-400 font-bold uppercase">{edu.startDate} - {edu.endDate}</p>
                         </div>
                       ))}
                     </div>
                   </div>
                 )}

                 {/* Skills */}
                 {skills && skills.length > 0 && (
                   <div className="space-y-8 pl-8">
                     <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-300 italic">Expertise</h2>
                     <div className="space-y-4">
                       {skills.map(cat => (
                         <div key={cat.id}>
                           <p className="font-bold text-[9px] text-slate-800 uppercase mb-2 tracking-tighter italic">{cat.name}</p>
                           <p className="text-[10.5px] text-slate-600 leading-relaxed">
                             {cat.skills.join(' • ')}
                           </p>
                         </div>
                       ))}
                    </div>
                  </div>
                 )}
              </div>
            </div>

            <div className="mt-auto pt-10 text-[9px] text-slate-300 font-serif lowercase italic tracking-[0.5em]">
              Elegant Single Flow v1
            </div>
          
<div className="p-8 w-full block shrink-0" style={{marginTop: 'auto'}}>
{renderProjectsSection()}{renderCertificationsSection()}{renderAwardsSection()}{renderAchievementsSection()}{renderLanguagesSection()}
</div>
</div>
        ) : templateId === 'template-single-column-2' ? (
          <div className="flex flex-col h-full min-h-[297mm] text-left bg-white p-12 space-y-10">
            {/* Tech-Focused Left Header */}
            <div className="flex justify-between items-end border-b-4 border-slate-900 pb-8">
               <div>
                 <h1 className="text-5xl font-black uppercase tracking-tighter leading-none mb-4 text-slate-900">
                   {personalInfo.fullName || 'Your Name'}
                 </h1>
                 {personalInfo.jobTitle && (
                   <p className="text-base font-bold bg-slate-900 text-white px-3 py-1 inline-block uppercase tracking-[0.2em]">
                     {personalInfo.jobTitle}
                   </p>
                 )}
               </div>
               <div className="text-right space-y-1 text-[11px] font-bold font-mono text-slate-500 uppercase">
                  {personalInfo.email && <div className="text-slate-900">{personalInfo.email}</div>}
                  {personalInfo.phone && <div>{personalInfo.phone}</div>}
                  {personalInfo.location && <div>{personalInfo.location}</div>}
               </div>
            </div>

            {/* Profile Section */}
            {personalInfo.bio && (
              <div className="flex gap-10 items-start">
                 <div className="w-24 shrink-0 pt-1 border-r border-slate-100">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Summary</span>
                 </div>
                 <p className="text-[12px] text-slate-600 leading-relaxed font-medium">
                   {personalInfo.bio}
                 </p>
              </div>
            )}

            {/* Main Content Area */}
            <div className="space-y-12">
               {/* Work Experience */}
               {experience && experience.length > 0 && (
                 <div className="space-y-6">
                    <div className="flex items-center gap-4">
                       <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-900 shrink-0">Experience</h2>
                       <div className="flex-1 h-px bg-slate-900/5" />
                    </div>
                    <div className="space-y-8 pl-12 border-l border-slate-100 ml-12">
                      {experience.map(exp => (
                        <div key={exp.id} className="relative group">
                          <div className="absolute -left-[53px] top-1.5 w-2 h-2 rounded-full border-2 border-slate-900 bg-white group-hover:bg-slate-900 transition-colors" />
                          <div className="flex justify-between items-baseline mb-2">
                            <h3 className="text-sm font-black text-slate-900 uppercase">{exp.position}</h3>
                            <span className="text-[10px] font-mono font-black px-2 py-1 bg-slate-50 text-slate-400">
                              {exp.startDate} - {exp.currentlyWorking ? 'PRESENT' : exp.endDate}
                            </span>
                          </div>
                          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3 italic" style={colorStyle}>{exp.company}</p>
                          <p className="text-[11px] text-slate-600 leading-relaxed">
                            {exp.description}
                          </p>
                        </div>
                      ))}
                    </div>
                 </div>
               )}

               {/* Bottom Flex Section */}
               <div className="grid grid-cols-2 gap-12">
                  {/* Skills List */}
                  {skills && skills.length > 0 && (
                    <div className="space-y-6">
                       <div className="flex items-center gap-4">
                          <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-900 shrink-0">Expertise</h2>
                          <div className="flex-1 h-px bg-slate-900/5" />
                       </div>
                       <div className="space-y-4">
                        {skills.map(cat => (
                          <div key={cat.id}>
                            <p className="text-[10px] font-black text-slate-900 uppercase mb-2 tracking-tighter italic" style={colorStyle}>{cat.name}</p>
                            <div className="flex flex-wrap gap-2">
                              {cat.skills.map((skill, si) => (
                                <span key={si} className="text-[10.5px] font-mono text-slate-600 bg-slate-100/50 px-2 py-0.5 border border-slate-200">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                       </div>
                    </div>
                  )}

                  {/* Education Vertical */}
                  {education && education.length > 0 && (
                    <div className="space-y-6">
                       <div className="flex items-center gap-4">
                          <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-900 shrink-0">Education</h2>
                          <div className="flex-1 h-px bg-slate-900/5" />
                       </div>
                       <div className="space-y-6">
                         {education.map(edu => (
                           <div key={edu.id} className="border-b border-slate-50 pb-4 last:border-0">
                             <h3 className="text-sm font-black text-slate-900 uppercase mb-1 leading-tight">{edu.degree}</h3>
                             <p className="text-[11px] font-bold text-slate-400 italic mb-1">{edu.institution}</p>
                             <span className="text-[9px] font-mono font-bold text-slate-300">{edu.startDate} — {edu.endDate}</span>
                           </div>
                         ))}
                       </div>
                    </div>
                  )}
               </div>
            </div>

            <div className="mt-auto pt-10 text-[9px] font-black text-slate-200 uppercase tracking-[1em]">
              Tech-Mono Single Stack v2
            </div>
          
<div className="p-8 w-full block shrink-0" style={{marginTop: 'auto'}}>
{renderProjectsSection()}{renderCertificationsSection()}{renderAwardsSection()}{renderAchievementsSection()}{renderLanguagesSection()}
</div>
</div>
        ) : templateId === 'template-single-column-3' ? (
          <div className="flex flex-col h-full min-h-[297mm] text-left bg-white p-20 space-y-16">
            {/* Bold Editorial Header */}
            <div>
               <h1 className="text-7xl font-serif font-black tracking-tighter text-slate-900 leading-[0.8] mb-6">
                 {personalInfo.fullName ? (
                   <>
                     {personalInfo.fullName.split(' ')[0]}
                     <br />
                     <span style={colorStyle}>{personalInfo.fullName.split(' ').slice(1).join(' ')}</span>
                   </>
                 ) : 'Your Name'}
               </h1>
               <div className="flex items-center gap-8 border-t border-slate-100 pt-8 mt-12">
                  {personalInfo.jobTitle && (
                    <p className="text-lg font-black uppercase text-slate-900 tracking-tighter">
                      {personalInfo.jobTitle}
                    </p>
                  )}
                  <div className="h-4 w-px bg-slate-200" />
                  <div className="flex gap-6 text-[10px] font-black uppercase tracking-widest text-slate-300">
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.location && <span>{personalInfo.location}</span>}
                  </div>
               </div>
            </div>

            {/* Deep Profile Summary */}
            {personalInfo.bio && (
              <div className="relative">
                <div className="absolute -left-10 top-0 text-7xl font-serif font-black text-slate-50 leading-none select-none">“</div>
                <p className="text-2xl font-serif text-slate-800 leading-snug tracking-tight indent-8 relative z-10 italic">
                  {personalInfo.bio}
                </p>
              </div>
            )}

            {/* Experience Blocks */}
            {experience && experience.length > 0 && (
              <div className="space-y-12">
                <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-200 border-b border-slate-50 pb-4">Professional Narrative</h2>
                <div className="space-y-12">
                  {experience.map(exp => (
                    <div key={exp.id} className="space-y-4">
                      <div className="flex justify-between items-end">
                        <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">{exp.position}</h3>
                        <span className="text-[12px] font-bold text-slate-300 uppercase tracking-widest">{exp.startDate} - {exp.currentlyWorking ? 'Now' : exp.endDate}</span>
                      </div>
                      <p className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] italic underline decoration-slate-100 underline-offset-8" style={colorStyle}>{exp.company}</p>
                      <p className="text-[14px] text-slate-600 leading-relaxed font-medium">
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills as Inline Flow */}
            {skills && skills.length > 0 && (
              <div className="pt-10 space-y-6">
                <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-200">Competencies</h2>
                <div className="flex flex-wrap gap-x-12 gap-y-4 text-sm font-black text-slate-900 uppercase tracking-tighter">
                  {skills.flatMap(cat => cat.skills).map((skill, idx) => (
                    <span key={idx} className="flex items-center gap-2">
                       <span className="w-2 h-2 rounded-full" style={bgStyle} />
                       {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-auto border-t border-slate-900/10 pt-10 text-[10px] font-serif font-black italic text-slate-200 text-right">
              Magazine Editorial Layout v3
            </div>
          
<div className="p-8 w-full block shrink-0" style={{marginTop: 'auto'}}>
{renderProjectsSection()}{renderCertificationsSection()}{renderAwardsSection()}{renderAchievementsSection()}{renderLanguagesSection()}
</div>
</div>
        ) : templateId === 'template-single-column-4' ? (
          <div className="flex flex-col h-full min-h-[297mm] text-left bg-white">
            {/* Geometric Block Header */}
            <div className="relative h-64 overflow-hidden mb-12">
               <div className="absolute inset-0 bg-slate-900 transform -skew-y-3 origin-top-left translate-y-[-20%] z-0" style={{ backgroundColor: primaryColor }} />
               <div className="absolute inset-0 flex flex-col justify-center px-16 z-10">
                  <h1 className={`text-6xl font-black tracking-tighter uppercase leading-none ${textOnAccentClass}`}>
                    {personalInfo.fullName || 'Your Name'}
                  </h1>
                  {personalInfo.jobTitle && (
                    <p className={`text-sm font-bold tracking-[0.4em] uppercase mt-4 opacity-70 ${textOnAccentClass}`}>
                      {personalInfo.jobTitle}
                    </p>
                  )}
                  <div className={`mt-8 flex gap-8 text-[10px] font-bold uppercase tracking-widest opacity-60 ${textOnAccentClass}`}>
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo.location && <span>{personalInfo.location}</span>}
                  </div>
               </div>
            </div>

            {/* Single Stream Content */}
            <div className="px-16 pb-16 space-y-16">
               {/* Summary */}
               {personalInfo.bio && (
                 <div className="flex flex-row gap-12">
                    <div className="w-24 shrink-0 text-right pt-1">
                       <h2 className="text-[10px] font-black uppercase text-slate-300 tracking-widest" style={colorStyle}>About</h2>
                    </div>
                    <p className="flex-1 text-[13px] text-slate-600 leading-relaxed font-bold border-l-2 border-slate-100 pl-8">
                       {personalInfo.bio}
                    </p>
                 </div>
               )}

               {/* Experience Section */}
               {experience && experience.length > 0 && (
                 <div className="space-y-12">
                    <div className="flex flex-row gap-12 items-center">
                       <h2 className="text-[11px] font-black uppercase text-slate-900 tracking-[0.4em] w-24 text-right shrink-0">History</h2>
                       <div className="flex-1 h-px bg-slate-100" />
                    </div>
                    <div className="space-y-12">
                       {experience.map(exp => (
                         <div key={exp.id} className="flex flex-row gap-12">
                            <div className="w-24 shrink-0 text-right pt-1">
                               <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{exp.startDate} - {exp.currentlyWorking ? 'PRST' : exp.endDate}</span>
                            </div>
                            <div className="flex-1 space-y-4">
                               <div className="flex justify-between items-baseline underline decoration-slate-100 underline-offset-8">
                                  <h3 className="text-[15px] font-black text-slate-900 uppercase">{exp.position}</h3>
                                  <span className="text-[10px] font-black text-slate-400 italic" style={colorStyle}>@{exp.company}</span>
                               </div>
                               <p className="text-[12px] text-slate-600 leading-relaxed indent-4">
                                  {exp.description}
                               </p>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
               )}

               {/* Hybrid Bottom Section */}
               <div className="grid grid-cols-2 gap-16 border-t border-slate-50 pt-12">
                  {/* Expertise Tags */}
                  {skills && skills.length > 0 && (
                    <div className="space-y-8">
                       <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-200">Stack</h2>
                       <div className="flex flex-wrap gap-2">
                          {skills.flatMap(cat => cat.skills).map((skill, idx) => (
                            <span key={idx} className="px-3 py-1 bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest rounded" style={bgStyle}>
                               {skill}
                            </span>
                          ))}
                       </div>
                    </div>
                  )}

                  {/* Education Minimal */}
                  {education && education.length > 0 && (
                    <div className="space-y-8">
                       <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-200">Credentials</h2>
                       <div className="space-y-6">
                         {education.map(edu => (
                           <div key={edu.id}>
                             <h3 className="text-[11px] font-black text-slate-900 uppercase mb-1">{edu.degree}</h3>
                             <p className="text-[10px] font-bold text-slate-400 italic">{edu.institution}</p>
                           </div>
                         ))}
                       </div>
                    </div>
                  )}
               </div>
            </div>

            <div className="mt-auto p-12 text-[8px] font-black text-slate-200 uppercase tracking-[1em] text-center">
              Geometric Minimalist v4
            </div>
          
<div className="p-8 w-full block shrink-0" style={{marginTop: 'auto'}}>
{renderProjectsSection()}{renderCertificationsSection()}{renderAwardsSection()}{renderAchievementsSection()}{renderLanguagesSection()}
</div>
</div>
        ) : templateId === 'template-single-column-5' ? (
          <div className="flex flex-col h-full min-h-[297mm] text-left bg-slate-50 p-16 space-y-12">
            {/* High Impact Professional Header */}
            <div className="flex flex-row justify-between items-start border-b-8 border-slate-900 pb-12 pt-4">
               <div className="space-y-4">
                  <h1 className="text-6xl font-black text-slate-900 tracking-tighter uppercase leading-[0.8]">
                    {personalInfo.fullName ? (
                      <>
                        {personalInfo.fullName.split(' ')[0]}
                        <br />
                        <span className="text-slate-200" style={{WebkitTextStroke: '2px #0f172a'}}>{personalInfo.fullName.split(' ').slice(1).join(' ')}</span>
                      </>
                    ) : 'Your Name'}
                  </h1>
                  {personalInfo.jobTitle && (
                    <p className="text-xl font-bold bg-slate-900 text-white px-4 py-1 inline-block tracking-tighter uppercase" style={bgStyle}>
                      {personalInfo.jobTitle}
                    </p>
                  )}
               </div>
               <div className="text-right space-y-3">
                  <div className="flex flex-col gap-1 items-end">
                    {personalInfo.email && <div className="text-[11px] font-black text-slate-900 px-3 py-1 bg-white border border-slate-200 rounded">{personalInfo.email}</div>}
                    {personalInfo.phone && <div className="text-[11px] font-black text-slate-900 px-3 py-1 bg-white border border-slate-200 rounded">{personalInfo.phone}</div>}
                    {personalInfo.location && <div className="text-[11px] font-black text-slate-900 px-3 py-1 bg-white border border-slate-200 rounded">{personalInfo.location}</div>}
                  </div>
               </div>
            </div>

            {/* Corporate Flow */}
            <div className="flex-1 space-y-16">
               {/* Summary Profile */}
               {personalInfo.bio && (
                 <div className="bg-white p-10 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-2 h-full bg-slate-900 group-hover:w-4 transition-all" style={bgStyle} />
                    <h2 className="text-[10px] font-black uppercase text-slate-300 tracking-widest mb-6">Mission & Value</h2>
                    <p className="text-[14px] text-slate-700 leading-relaxed font-medium">
                       {personalInfo.bio}
                    </p>
                 </div>
               )}

               {/* Experience Stream */}
               {experience && experience.length > 0 && (
                 <div className="space-y-10">
                    <h2 className="text-[11px] font-black uppercase text-slate-900 tracking-[0.4em] border-b-2 border-slate-900 pb-4">Professional Record</h2>
                    <div className="space-y-12">
                       {experience.map(exp => (
                         <div key={exp.id} className="grid grid-cols-[150px_1fr] gap-10">
                            <div>
                               <span className="text-[12px] font-black text-slate-900">{exp.startDate}</span>
                               <br />
                               <span className="text-[10px] font-bold text-slate-300 uppercase italic">{exp.currentlyWorking ? 'Present' : exp.endDate}</span>
                            </div>
                            <div className="space-y-3">
                               <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter leading-none">{exp.position}</h3>
                               <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest italic" style={colorStyle}>{exp.company}</p>
                               <p className="text-[12px] text-slate-600 leading-relaxed font-bold">
                                  {exp.description}
                               </p>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
               )}

               {/* Skills Block */}
               {skills && skills.length > 0 && (
                 <div className="space-y-8">
                    <h2 className="text-[11px] font-black uppercase text-slate-900 tracking-[0.4em] border-b-2 border-slate-900 pb-4">Technical Expertise</h2>
                    <div className="grid grid-cols-2 gap-x-12 gap-y-8">
                       {skills.map(cat => (
                         <div key={cat.id} className="space-y-3">
                            <h3 className="text-[10px] font-black text-slate-300 uppercase">{cat.name}</h3>
                            <div className="flex flex-wrap gap-2 text-sm font-black text-slate-900 uppercase">
                               {cat.skills.join(' / ')}
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
               )}
            </div>

            <div className="p-10 bg-slate-900 rounded-3xl text-right">
               <span className="text-[10px] font-black text-white opacity-20 uppercase tracking-[1em]">Corporate Single Stream v5</span>
            </div>
          
<div className="p-8 w-full block shrink-0" style={{marginTop: 'auto'}}>
{renderProjectsSection()}{renderCertificationsSection()}{renderAwardsSection()}{renderAchievementsSection()}{renderLanguagesSection()}
</div>
</div>
        ) : templateId === 'template-mixed-column-2' ? (
          <div className="flex flex-col h-full min-h-[297mm] text-left bg-[#fffbeb]">
            {/* Elegant Serif Header - Single Column */}
            <div className="p-12 border-b-2 border-emerald-900/10 text-center">
              <h1 className="text-4xl font-serif font-bold text-emerald-900 tracking-tight mb-2">
                {personalInfo.fullName || 'Your Name'}
              </h1>
              {personalInfo.jobTitle && (
                <p className="text-sm font-bold uppercase tracking-[0.4em] text-emerald-700/60 mb-6">
                  {personalInfo.jobTitle}
                </p>
              )}
              <div className="flex justify-center gap-6 text-xs font-serif italic text-emerald-800/70">
                {personalInfo.email && <span>{personalInfo.email}</span>}
                {personalInfo.phone && <span>{personalInfo.phone}</span>}
                {personalInfo.location && <span>{personalInfo.location}</span>}
              </div>
            </div>

            {/* Body - Mixed Columns */}
            <div className="flex flex-row flex-1">
              {/* Left Column - Main Content (65%) */}
              <div className="w-[65%] p-10 space-y-10 border-r border-emerald-900/5">
                {/* Summary */}
                {personalInfo.bio && (
                  <div className="space-y-4">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-emerald-900 border-b border-emerald-900/20 pb-1">Professional Narrative</h2>
                    <p className="text-[11.5px] leading-relaxed text-emerald-900/80 font-serif italic">
                      {personalInfo.bio}
                    </p>
                  </div>
                )}

                {/* Experience */}
                {experience && experience.length > 0 && (
                  <div className="space-y-6">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-emerald-900 border-b border-emerald-900/20 pb-1">Chronological Career</h2>
                    <div className="space-y-8">
                      {experience.map(exp => (
                        <div key={exp.id}>
                          <div className="flex justify-between items-baseline">
                            <h3 className="font-bold text-emerald-900 text-sm">{exp.position}</h3>
                            <span className="text-[10px] font-serif text-emerald-700/50 uppercase">{exp.startDate} — {exp.currentlyWorking ? 'Present' : exp.endDate}</span>
                          </div>
                          <p className="text-[11px] font-bold text-emerald-700 mb-2">{exp.company}</p>
                          <p className="text-[10.5px] text-emerald-900/70 leading-relaxed indent-4">
                            {exp.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column - Sidebar (35%) */}
              <div className="w-[35%] p-10 space-y-10 bg-emerald-900/5 backdrop-blur-sm">
                {/* Expertise */}
                {skills && skills.length > 0 && (
                  <div className="space-y-4">
                    <h2 className="text-xs font-black uppercase tracking-widest text-emerald-900">Core Expertise</h2>
                    <div className="space-y-4">
                      {skills.map(cat => (
                        <div key={cat.id}>
                          <p className="font-bold text-[9px] text-emerald-700 uppercase mb-2 tracking-tighter">{cat.name}</p>
                          <div className="flex flex-wrap gap-2">
                            {cat.skills.map((skill, si) => (
                              <span key={si} className="text-[10.5px] text-emerald-900/70 font-serif underline decoration-emerald-900/10 underline-offset-4">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Academic Path */}
                {education && education.length > 0 && (
                  <div className="space-y-4">
                    <h2 className="text-xs font-black uppercase tracking-widest text-emerald-900">Academic History</h2>
                    <div className="space-y-4">
                      {education.map(edu => (
                        <div key={edu.id}>
                          <h3 className="font-bold text-emerald-900 text-[10.5px] mb-1">{edu.degree}</h3>
                          <p className="text-[10px] text-emerald-700 font-serif italic mb-1">{edu.institution}</p>
                          <p className="text-[9px] text-emerald-600/50 uppercase font-bold">{edu.startDate} - {edu.endDate}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Languages */}
                {languages && languages.length > 0 && (
                  <div className="space-y-4">
                    <h2 className="text-xs font-black uppercase tracking-widest text-emerald-900">Linguistic</h2>
                    <div className="space-y-2">
                      {languages.map(lang => (
                        <div key={lang.id} className="flex justify-between text-[10.5px] text-emerald-900/70 py-1 border-b border-emerald-900/5">
                          <span className="font-serif italic">{lang.name}</span>
                          <span className="text-[9.5px] font-bold uppercase tracking-widest text-emerald-700/40">{lang.proficiency}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          
<div className="p-8 w-full block shrink-0" style={{marginTop: 'auto'}}>
{renderProjectsSection()}{renderCertificationsSection()}{renderAwardsSection()}{renderAchievementsSection()}
</div>
</div>
        ) : templateId === 'template-mixed-column-3' ? (
          <div className="flex flex-col h-full min-h-[297mm] text-left bg-white">
            {/* Modern Brutalist Split Header */}
            <div className="flex flex-row h-56 border-b-8 border-slate-900">
              <div className="w-[40%] bg-slate-900 p-10 flex flex-col justify-center text-white">
                <h1 className="text-3xl font-black uppercase tracking-tighter leading-none mb-4">
                  {personalInfo.fullName || 'Your Name'}
                </h1>
                <div className="space-y-1 text-[10px] font-bold tracking-widest opacity-60">
                   {personalInfo.email && <div className="break-all">{personalInfo.email}</div>}
                   {personalInfo.phone && <div>{personalInfo.phone}</div>}
                   {personalInfo.linkedin && <div className="break-all">{personalInfo.linkedin}</div>}
                </div>
              </div>
              <div className="w-[60%] bg-white p-10 flex flex-col justify-center">
                {personalInfo.jobTitle && (
                  <p className="text-sm font-black uppercase tracking-[0.3em] text-slate-400 mb-4">
                    {personalInfo.jobTitle}
                  </p>
                )}
                {personalInfo.bio && (
                  <p className="text-[11px] text-slate-600 leading-relaxed font-medium indent-8">
                    {personalInfo.bio}
                  </p>
                )}
              </div>
            </div>

            {/* Body Area */}
            <div className="flex-1 p-12 space-y-12">
               {/* Experience - Single Column (Full Width) */}
               {experience && experience.length > 0 && (
                  <div className="space-y-8">
                    <h2 className="text-[11px] font-black uppercase text-white bg-slate-900 px-3 py-1 inline-block tracking-widest">Experience / History</h2>
                    <div className="space-y-8">
                      {experience.map(exp => (
                        <div key={exp.id} className="relative pl-6">
                          <div className="absolute left-0 top-0 w-1 h-full bg-slate-100" />
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="text-[13px] font-black text-slate-900 uppercase">
                              {exp.position}
                              <span className="block text-[11px] font-bold text-slate-400 mt-1 uppercase tracking-tighter">{exp.company}</span>
                            </h3>
                            <span className="text-[10px] font-black px-2 py-1 bg-slate-100 rounded">
                              {exp.startDate} - {exp.currentlyWorking ? 'NOW' : exp.endDate}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-600 leading-relaxed font-bold italic">
                            {exp.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
               )}

               {/* Bottom Grid - 2 Columns */}
               <div className="grid grid-cols-2 gap-12">
                  {/* Skills/Expertise */}
                  {skills && skills.length > 0 && (
                    <div className="space-y-6">
                      <h2 className="text-[11px] font-black uppercase text-white bg-slate-900 px-3 py-1 inline-block tracking-widest">Skill Stack</h2>
                      <div className="space-y-4">
                        {skills.map(cat => (
                          <div key={cat.id}>
                            <p className="text-[10px] font-black text-slate-400 uppercase mb-2 italic tracking-widest border-l-2 border-slate-200 pl-2">{cat.name}</p>
                            <div className="flex flex-wrap gap-1.5">
                              {cat.skills.map((s, idx) => (
                                <span key={idx} className="bg-slate-50 border border-slate-100 px-2 py-1 rounded text-[10px] font-bold text-slate-700">
                                  {s}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Projects/Impact */}
                  {projects && projects.length > 0 && (
                    <div className="space-y-6">
                      <h2 className="text-[11px] font-black uppercase text-white bg-slate-900 px-3 py-1 inline-block tracking-widest">Case Studies</h2>
                      <div className="space-y-6">
                        {projects.map(proj => (
                          <div key={proj.id} className="border-b border-dashed border-slate-200 pb-4">
                            <h3 className="text-[11px] font-black text-slate-900 uppercase mb-2">{proj.title}</h3>
                            <p className="text-[10px] text-slate-500 font-bold leading-relaxed line-clamp-3">
                              {proj.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
               </div>
            </div>
          
<div className="p-8 w-full block shrink-0" style={{marginTop: 'auto'}}>
{renderCertificationsSection()}{renderAwardsSection()}{renderAchievementsSection()}{renderLanguagesSection()}
</div>
</div>
        ) : templateId === 'template-mixed-column-4' ? (
          <div className="flex flex-col h-full min-h-[297mm] text-center bg-white p-12">
             {/* Centered Minimalist Header */}
             <div className="space-y-4 mb-16">
                <h1 className="text-5xl font-sans font-thin text-rose-900 tracking-tighter uppercase leading-none">
                  {personalInfo.fullName || 'Your Name'}
                </h1>
                {personalInfo.jobTitle && (
                  <p className="text-xs font-bold tracking-[1em] text-rose-700/40 uppercase">
                    {personalInfo.jobTitle}
                  </p>
                )}
                <div className="w-16 h-px bg-rose-900/10 mx-auto" />
                <div className="flex justify-center gap-8 text-[10px] font-bold text-rose-900/60 uppercase tracking-widest">
                  {personalInfo.email && <span>{personalInfo.email}</span>}
                  {personalInfo.location && <span>{personalInfo.location}</span>}
                  {personalInfo.phone && <span>{personalInfo.phone}</span>}
                </div>
             </div>

             {/* Mixed Content Flow */}
             <div className="flex-1 space-y-16 text-left max-w-4xl mx-auto w-full">
                {/* Profile Flow - Single Column */}
                {personalInfo.bio && (
                   <div className="flex flex-row gap-12 items-start">
                      <div className="w-24 shrink-0 text-right mt-1">
                        <h2 className="text-[10px] font-black uppercase tracking-widest text-rose-900/30">Profile</h2>
                      </div>
                      <p className="text-[13px] text-rose-900/80 leading-relaxed font-light tracking-wide italic">
                        {personalInfo.bio}
                      </p>
                   </div>
                )}

                {/* Experience Flow - Full Width with Indentation */}
                {experience && experience.length > 0 && (
                   <div className="space-y-10">
                      <div className="flex flex-row gap-12 items-center mb-6">
                        <h2 className="text-[10px] font-black uppercase tracking-widest text-rose-900/30 w-24 text-right">Career</h2>
                        <div className="flex-1 h-px bg-rose-900/5" />
                      </div>
                      <div className="space-y-12">
                        {experience.map(exp => (
                          <div key={exp.id} className="flex flex-row gap-12">
                            <div className="w-24 shrink-0 text-right pt-1">
                              <span className="text-[9px] font-black text-rose-900/40 uppercase whitespace-nowrap">{exp.startDate} - {exp.currentlyWorking ? 'PRST' : exp.endDate}</span>
                            </div>
                            <div className="flex-1 space-y-3">
                              <div className="flex justify-between items-baseline">
                                <h3 className="text-sm font-black text-rose-900 uppercase tracking-tight">{exp.position}</h3>
                                <p className="text-[10px] font-black text-rose-700/60 uppercase italic tracking-tighter">{exp.company}</p>
                              </div>
                              <p className="text-[11px] text-rose-900/70 leading-relaxed font-normal">
                                {exp.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                   </div>
                )}

                {/* Grid Section for Education & Skills */}
                <div className="grid grid-cols-2 gap-24 border-t border-rose-900/5 pt-12">
                   {/* Education */}
                   {education && education.length > 0 && (
                      <div className="space-y-8">
                        <h2 className="text-[10px] font-black uppercase tracking-widest text-rose-900/30">Academic</h2>
                        <div className="space-y-6">
                           {education.map(edu => (
                              <div key={edu.id}>
                                <h3 className="text-[11px] font-black text-rose-900 uppercase mb-1">{edu.degree}</h3>
                                <p className="text-[10px] font-bold text-rose-700/40 uppercase tracking-tighter mb-1">{edu.institution}</p>
                                <span className="text-[9px] font-black text-rose-900/20">{edu.startDate} — {edu.endDate}</span>
                              </div>
                           ))}
                        </div>
                      </div>
                   )}

                   {/* Skills as simple list tags */}
                   {skills && skills.length > 0 && (
                      <div className="space-y-8">
                        <h2 className="text-[10px] font-black uppercase tracking-widest text-rose-900/30">Expertise</h2>
                        <div className="flex flex-wrap gap-2">
                           {skills.flatMap(cat => cat.skills).map((skill, idx) => (
                             <span key={idx} className="px-3 py-1 border border-rose-900/10 rounded-full text-[10px] font-bold text-rose-900/70 uppercase tracking-widest">
                               {skill}
                             </span>
                           ))}
                        </div>
                      </div>
                   )}
                </div>
             </div>

             <div className="mt-20 text-[9px] font-black text-rose-900/10 tracking-[1em] uppercase">
                Minimalist Design Concept v4
             </div>
          
<div className="p-8 w-full block shrink-0" style={{marginTop: 'auto'}}>
{renderProjectsSection()}{renderCertificationsSection()}{renderAwardsSection()}{renderAchievementsSection()}{renderLanguagesSection()}
</div>
</div>
        ) : templateId === 'template-mixed-column-5' ? (
          <div className="flex flex-col h-full min-h-[297mm] text-left bg-[#f1f5f9]">
             {/* Modern Technical Header Strip */}
             <div className="h-4 w-full bg-violet-700" />
             <div className="bg-white p-10 flex flex-row justify-between items-center border-b border-violet-100">
                <div>
                   <h1 className="text-4xl font-black text-slate-900 tracking-tighter leading-none mb-2">
                     {personalInfo.fullName || 'Your Name'}
                   </h1>
                   {personalInfo.jobTitle && (
                     <p className="text-sm font-bold text-violet-700 uppercase tracking-widest">
                       {personalInfo.jobTitle}
                     </p>
                   )}
                </div>
                <div className="text-right space-y-1 text-[10px] font-bold font-mono text-slate-400 uppercase tracking-tighter">
                   {personalInfo.email && <div className="text-slate-900/80">{personalInfo.email}</div>}
                   {personalInfo.phone && <div>{personalInfo.phone}</div>}
                   {personalInfo.linkedin && <div className="text-violet-600 underline">in/{personalInfo.linkedin}</div>}
                </div>
             </div>

             {/* Mixed 3-Column Body */}
             <div className="flex flex-row flex-1 p-6 gap-6">
                {/* Left Sidebar (20%) - Contact/Meta */}
                <div className="w-[20%] space-y-8 py-6">
                   {personalInfo.location && (
                      <div className="space-y-2">
                        <h2 className="text-[9px] font-black uppercase text-slate-300">Base</h2>
                        <p className="text-[11px] font-bold text-slate-700">{personalInfo.location}</p>
                      </div>
                   )}
                   {languages && languages.length > 0 && (
                      <div className="space-y-4">
                        <h2 className="text-[9px] font-black uppercase text-slate-300">Lingo</h2>
                        <div className="space-y-3">
                           {languages.map(lang => (
                              <div key={lang.id}>
                                <div className="flex justify-between text-[10px] font-bold mb-1">
                                  <span>{lang.name}</span>
                                </div>
                                <div className="h-1 w-full bg-slate-200 rounded-full overflow-hidden">
                                  <div className="h-full bg-violet-500" style={{ width: lang.proficiency === 'Native' ? '100%' : lang.proficiency === 'Fluent' ? '90%' : '70%' }} />
                                </div>
                              </div>
                           ))}
                        </div>
                      </div>
                   )}
                </div>

                {/* Main Body (60%) - Core Experience */}
                <div className="w-[60%] bg-white rounded-xl shadow-sm border border-slate-200/50 p-8 space-y-12">
                   {/* Summary Top */}
                   {personalInfo.bio && (
                      <div className="space-y-4">
                         <div className="flex items-center gap-3">
                            <span className="w-6 h-1 bg-violet-700" />
                            <h2 className="text-[11px] font-black uppercase text-slate-900 tracking-wider">Mission Statement</h2>
                         </div>
                         <p className="text-[11.5px] text-slate-600 leading-relaxed font-medium">
                            {personalInfo.bio}
                          </p>
                      </div>
                   )}

                   {/* Major Exp */}
                   {experience && experience.length > 0 && (
                      <div className="space-y-8">
                         <div className="flex items-center gap-3">
                            <span className="w-6 h-1 bg-violet-700" />
                            <h2 className="text-[11px] font-black uppercase text-slate-900 tracking-wider">Technical Professional</h2>
                         </div>
                         <div className="space-y-10">
                            {experience.map(exp => (
                               <div key={exp.id} className="group relative pl-4">
                                  <div className="absolute left-0 top-1 w-1 h-3 bg-violet-300 group-hover:h-full transition-all duration-300" />
                                  <div className="flex justify-between mb-3 items-baseline">
                                     <h3 className="text-[13px] font-black text-slate-900 uppercase tracking-tight">{exp.position}</h3>
                                     <span className="text-[9px] font-mono font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded">{exp.startDate} - {exp.currentlyWorking ? 'NOW' : exp.endDate}</span>
                                  </div>
                                  <p className="text-[11px] font-bold text-violet-600/60 uppercase mb-3">{exp.company}</p>
                                  <p className="text-[10.5px] text-slate-600 font-medium leading-relaxed">
                                     {exp.description}
                                  </p>
                               </div>
                            ))}
                         </div>
                      </div>
                   )}
                </div>

                {/* Right Sidebar (20%) - Skills/Edu */}
                <div className="w-[20%] space-y-8 py-6">
                   {skills && skills.length > 0 && (
                      <div className="space-y-4">
                        <h2 className="text-[9px] font-black uppercase text-slate-300">Stack</h2>
                        <div className="flex flex-col gap-3">
                           {skills.map(cat => (
                              <div key={cat.id}>
                                <h3 className="text-[10px] font-black text-slate-900 mb-2 truncate">{cat.name}</h3>
                                <div className="flex flex-wrap gap-1">
                                   {cat.skills.map((s, idx) => (
                                     <span key={idx} className="bg-violet-50 text-violet-700 px-1.5 py-0.5 rounded text-[8px] font-black uppercase">
                                       {s}
                                     </span>
                                   ))}
                                </div>
                              </div>
                           ))}
                        </div>
                      </div>
                   )}

                   {education && education.length > 0 && (
                      <div className="space-y-4">
                        <h2 className="text-[9px] font-black uppercase text-slate-300">Credentials</h2>
                        <div className="space-y-4">
                           {education.map(edu => (
                              <div key={edu.id} className="bg-slate-900 p-3 rounded-lg text-white">
                                <h3 className="text-[9px] font-black uppercase mb-1 leading-tight">{edu.degree}</h3>
                                <p className="text-[8px] text-slate-400 font-bold uppercase truncate">{edu.institution}</p>
                              </div>
                           ))}
                        </div>
                      </div>
                   )}
                </div>
             </div>

             <div className="p-4 bg-slate-950 text-right">
                <span className="text-[8px] font-mono font-bold text-violet-400/30 uppercase tracking-[0.5em]">System-6 Integrated Resume v5</span>
             </div>
          
<div className="p-8 w-full block shrink-0" style={{marginTop: 'auto'}}>
{renderProjectsSection()}{renderCertificationsSection()}{renderAwardsSection()}{renderAchievementsSection()}
</div>
</div>
        ) : templateId === 'template-column-4' ? (
          <div className="flex flex-row h-full min-h-[297mm] items-stretch text-left">
            {/* Sidebar with light textured background */}
            <div className="w-[30%] bg-slate-50 p-8 border-r border-slate-100 flex flex-col gap-8">
              <div className="text-left">
                <h1 className="font-extrabold text-2xl text-slate-800 tracking-tight leading-tight">
                  {personalInfo.fullName || 'Your Name'}
                </h1>
                {personalInfo.jobTitle && (
                  <p className="text-xs font-bold uppercase tracking-widest mt-2" style={colorStyle}>
                    {personalInfo.jobTitle}
                  </p>
                )}
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Contact</h2>
                <div className="space-y-2 text-[10.5px] text-slate-600 font-medium">
                  {personalInfo.email && <div className="break-all">{personalInfo.email}</div>}
                  {personalInfo.phone && <div>{personalInfo.phone}</div>}
                  {personalInfo.location && <div>{personalInfo.location}</div>}
                  {personalInfo.linkedin && <div className="break-all">{personalInfo.linkedin}</div>}
                </div>
              </div>

              {/* Skills as simple list */}
              {skills && skills.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Skills</h2>
                  <div className="space-y-3">
                    {skills.map(cat => (
                      <div key={cat.id}>
                        <p className="font-bold text-[9px] text-slate-500 uppercase mb-1">{cat.name}</p>
                        <p className="text-[10.5px] text-slate-600 leading-tight">
                          {cat.skills.join(', ')}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Languages */}
              {languages && languages.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Languages</h2>
                  <div className="space-y-2 text-[10.5px] text-slate-600">
                    {languages.map(lang => (
                      <div key={lang.id} className="flex justify-between font-medium">
                        <span>{lang.name}</span>
                        <span className="text-slate-400 italic text-[9.5px]">{lang.proficiency}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Main body with light background pattern */}
            <div className="w-[70%] p-10 bg-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50/50 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />
              
              <div className="relative space-y-10">
                {/* Profile Summary */}
                {personalInfo.bio && (
                  <div className="space-y-3">
                    <h2 className="text-[11px] font-bold uppercase tracking-widest flex items-baseline gap-2">
                       <span style={bgStyle} className="w-6 h-px" />
                       <span style={colorStyle}>About Me</span>
                    </h2>
                    <p className="text-[11.5px] text-slate-600 leading-relaxed indent-4">
                      {personalInfo.bio}
                    </p>
                  </div>
                )}

                {/* Experience */}
                {experience && experience.length > 0 && (
                  <div className="space-y-6">
                    <h2 className="text-[11px] font-bold uppercase tracking-widest flex items-baseline gap-2">
                       <span style={bgStyle} className="w-6 h-px" />
                       <span style={colorStyle}>Experience</span>
                    </h2>
                    <div className="space-y-6">
                      {experience.map(exp => (
                        <div key={exp.id} className="border-l-2 border-slate-50 pl-4 py-1">
                          <div className="flex justify-between items-baseline mb-2">
                            <h3 className="font-bold text-slate-800 uppercase text-[11.5px]">{exp.position}</h3>
                            <span className="text-[10px] font-mono font-bold text-slate-400">
                              {exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}
                            </span>
                          </div>
                          <p className="text-[10.5px] font-bold text-slate-500 mb-2 italic" style={colorStyle}>{exp.company}</p>
                          {exp.description && (
                            <p className="text-[10.5px] text-slate-600 leading-relaxed line-clamp-6">
                              {exp.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Education */}
                {education && education.length > 0 && (
                  <div className="space-y-6">
                    <h2 className="text-[11px] font-bold uppercase tracking-widest flex items-baseline gap-2">
                       <span style={bgStyle} className="w-6 h-px" />
                       <span style={colorStyle}>Education</span>
                    </h2>
                    <div className="grid grid-cols-2 gap-6">
                      {education.map(edu => (
                        <div key={edu.id}>
                          <h3 className="font-bold text-slate-800 text-[11px] mb-1 leading-tight">{edu.degree}</h3>
                          <p className="text-[10.5px] text-slate-500 font-medium mb-1">{edu.institution}</p>
                          <p className="text-[9.5px] text-slate-400 font-mono italic">{edu.startDate} - {edu.endDate}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-auto pt-20 text-[8px] text-slate-300 font-mono uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full" style={bgStyle} />
                Neo-Classic Design v.4
              </div>
            </div>
          
<div className="p-8 w-full block shrink-0" style={{marginTop: 'auto'}}>
{renderProjectsSection()}{renderCertificationsSection()}{renderAwardsSection()}{renderAchievementsSection()}
</div>
</div>
        ) : templateId === 'template-column-5' ? (
          <div className="flex flex-col h-full min-h-[297mm] text-left">
            {/* Split Header with color block */}
            <div className="flex w-full items-stretch h-48 border-b-4" style={{ borderColor: primaryColor }}>
              <div className="w-2/3 p-10 flex flex-col justify-center bg-white">
                <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                  {personalInfo.fullName || 'Your Name'}
                </h1>
                {personalInfo.jobTitle && (
                  <p className="text-sm font-bold tracking-[0.3em] uppercase mt-4 text-slate-400">
                    {personalInfo.jobTitle}
                  </p>
                )}
              </div>
              <div className="w-1/3 p-10 flex flex-col justify-center gap-2" style={bgStyle}>
                <div className={`space-y-1.5 text-[10px] font-bold ${textOnAccentClass}`}>
                  {personalInfo.email && <div className="break-all opacity-90">{personalInfo.email}</div>}
                  {personalInfo.phone && <div className="opacity-90">{personalInfo.phone}</div>}
                  {personalInfo.location && <div className="opacity-90">{personalInfo.location}</div>}
                  {personalInfo.linkedin && <div className="break-all opacity-90">{personalInfo.linkedin}</div>}
                </div>
              </div>
            </div>

            {/* Content Area with a bento-style subtle background grid */}
            <div className="flex flex-row flex-1 bg-slate-50/30">
              {/* Main Sidebar (Left) */}
              <div className="w-[30%] bg-white/50 backdrop-blur-sm border-r border-slate-100 p-8 space-y-10">
                {/* Profile */}
                {personalInfo.bio && (
                  <div className="space-y-4">
                    <h2 className="text-[11px] font-black uppercase text-slate-900 flex items-center gap-2">
                      <span className="w-1 h-4" style={bgStyle} />
                      Summary
                    </h2>
                    <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                      {personalInfo.bio}
                    </p>
                  </div>
                )}

                {/* Skills Visual */}
                {skills && skills.length > 0 && (
                  <div className="space-y-4">
                    <h2 className="text-[11px] font-black uppercase text-slate-900 flex items-center gap-2">
                      <span className="w-1 h-4" style={bgStyle} />
                      Expertise
                    </h2>
                    <div className="flex flex-wrap gap-1.5">
                      {skills.flatMap(cat => cat.skills).map((skill, idx) => (
                        <span key={idx} className="px-2 py-1 bg-slate-100/50 rounded text-[9.5px] font-bold text-slate-600 border border-slate-200/50">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Languages */}
                {languages && languages.length > 0 && (
                  <div className="space-y-4">
                    <h2 className="text-[11px] font-black uppercase text-slate-900 flex items-center gap-2">
                      <span className="w-1 h-4" style={bgStyle} />
                      Language
                    </h2>
                    <div className="space-y-3">
                      {languages.map(lang => (
                        <div key={lang.id}>
                          <div className="flex justify-between text-[10px] font-bold mb-1">
                            <span>{lang.name}</span>
                            <span style={colorStyle}>{lang.proficiency}</span>
                          </div>
                          <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full" style={{ width: lang.proficiency === 'Native' ? '100%' : lang.proficiency === 'Fluent' ? '90%' : lang.proficiency === 'Professional' ? '75%' : '50%', ...bgStyle }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Main Content (Right) */}
              <div className="w-[70%] p-10 space-y-12 bg-white">
                {/* Professional History */}
                {experience && experience.length > 0 && (
                  <div className="space-y-8">
                    <h2 className="text-[11px] font-black uppercase text-slate-300 tracking-[0.2em] italic">Work Experience</h2>
                    <div className="space-y-10">
                      {experience.map(exp => (
                        <div key={exp.id} className="relative">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-[13px] font-black text-slate-900 uppercase">{exp.position}</h3>
                              <p className="text-[11px] font-bold italic mt-1" style={colorStyle}>{exp.company}</p>
                            </div>
                            <div className="text-right">
                              <span className="text-[10px] font-black px-2 py-1 bg-slate-900 text-white rounded">
                                {exp.startDate} - {exp.currentlyWorking ? 'PRESENT' : exp.endDate}
                              </span>
                              {exp.location && <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-tighter">{exp.location}</p>}
                            </div>
                          </div>
                          {exp.description && (
                            <p className="text-[10.5px] text-slate-600 mt-4 leading-relaxed font-medium">
                              {exp.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Projects Grid */}
                {projects && projects.length > 0 && (
                  <div className="space-y-6">
                    <h2 className="text-[11px] font-black uppercase text-slate-300 tracking-[0.2em] italic">Impact Projects</h2>
                    <div className="grid grid-cols-2 gap-4">
                      {projects.map(proj => (
                        <div key={proj.id} className="p-4 bg-slate-50/50 rounded-lg border border-slate-100 border-b-2">
                          <h3 className="text-[10.5px] font-black text-slate-800 uppercase mb-2">{proj.title}</h3>
                          <p className="text-[9.5px] text-slate-500 font-medium leading-normal line-clamp-3 italic">
                            {proj.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 bg-slate-900 text-right">
              <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.5em]">Modern Split Design Concept v.5</span>
            </div>
          
<div className="p-8 w-full block shrink-0" style={{marginTop: 'auto'}}>
{renderCertificationsSection()}{renderAwardsSection()}{renderAchievementsSection()}
</div>
</div>
        ) : templateId === 'template-two-colum-3' ? (
          <div className="flex flex-row h-full min-h-[297mm] items-stretch text-left">
            {/* Left Column: Bold Primary Background Sidebar */}
            <div className="w-[30%] text-white p-8 flex flex-col justify-between" style={bgStyle}>
              <div>
                <div className="mb-10 text-left">
                  <h1 className="font-black text-3xl uppercase tracking-tighter leading-none mb-2">
                    {personalInfo.fullName || 'Your Name'}
                  </h1>
                  {personalInfo.jobTitle && (
                    <div className="h-1 w-12 bg-white/40 mb-3" />
                  )}
                  <p className="text-xs font-bold opacity-80 uppercase tracking-widest leading-relaxed">
                    {personalInfo.jobTitle}
                  </p>
                </div>

                {/* Contact Section - No Icons */}
                <div className="space-y-6 mb-12 text-left">
                  <div className="border-t border-white/20 pt-4">
                    <h2 className="text-[10px] font-black uppercase tracking-widest mb-3 opacity-60">Contact</h2>
                    <div className="space-y-2 text-[10.5px]">
                      {personalInfo.phone && <div className="font-medium">{personalInfo.phone}</div>}
                      {personalInfo.email && <div className="break-all font-medium">{personalInfo.email}</div>}
                      {personalInfo.linkedin && <div className="break-all font-medium">{personalInfo.linkedin}</div>}
                      {personalInfo.location && <div className="font-medium">{personalInfo.location}</div>}
                    </div>
                  </div>

                  {/* Skills Section - No Icons */}
                  {skills && skills.filter(cat => cat.skills && cat.skills.length > 0).length > 0 && (
                    <div className="border-t border-white/20 pt-4">
                      <h2 className="text-[10px] font-black uppercase tracking-widest mb-3 opacity-60">Expertise</h2>
                      <div className="space-y-4">
                        {skills.filter(cat => cat.skills && cat.skills.length > 0).map(cat => (
                          <div key={cat.id}>
                            <p className="font-bold text-[9px] uppercase tracking-tighter mb-1 text-white/50">{cat.name}</p>
                            <div className="flex flex-wrap gap-1">
                              {cat.skills.map((skill, sIdx) => (
                                <span key={sIdx} className="text-[10px] leading-tight font-medium block">
                                  {skill}{sIdx < cat.skills.length - 1 ? ' •' : ''}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Languages - No Icons */}
                  {languages && languages.length > 0 && (
                    <div className="border-t border-white/20 pt-4">
                      <h2 className="text-[10px] font-black uppercase tracking-widest mb-3 opacity-60">Languages</h2>
                      <div className="space-y-2">
                        {languages.map((lang) => (
                          <div key={lang.id} className="flex justify-between text-[10.5px] font-medium border-b border-white/10 pb-1">
                            <span>{lang.name}</span>
                            <span className="opacity-60 text-[9px] uppercase font-bold italic">{lang.proficiency}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="text-[9px] opacity-40 font-mono">
                {new Date(data.updatedAt).getFullYear()} • Resume Designer
              </div>
            </div>

            {/* Right Column: Clean Content Area */}
            <div className="w-[70%] bg-white p-10 flex flex-col gap-10 text-left">
              {/* Profile Summary if exists */}
              {personalInfo.bio && (
                <div className="relative">
                  <h2 className="text-[11px] font-black uppercase tracking-[0.2em] mb-4 text-slate-300">Profile</h2>
                  <p className="text-[12px] text-slate-700 leading-relaxed font-medium">
                    {personalInfo.bio}
                  </p>
                </div>
              )}

              {/* Experience */}
              {experience && experience.length > 0 && (
                <div>
                  <h2 className="text-[11px] font-black uppercase tracking-[0.2em] mb-6 text-slate-300">Professional Experience</h2>
                  <div className="space-y-8">
                    {experience.map((exp) => (
                      <div key={exp.id} className="group">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-black text-sm uppercase tracking-tight text-slate-900 group-hover:text-slate-700 transition-colors">
                              {exp.position}
                            </h3>
                            <p className="text-[11px] font-bold" style={colorStyle}>{exp.company}</p>
                          </div>
                          <span className="text-[10px] font-bold text-slate-400 font-mono tracking-tighter">
                            {exp.startDate} — {exp.currentlyWorking ? 'Present' : exp.endDate}
                          </span>
                        </div>
                        {exp.description && (
                          <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                            {exp.description}
                          </p>
                        )}
                        {exp.location && (
                          <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest mt-2">{exp.location}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {education && education.length > 0 && (
                <div>
                  <h2 className="text-[11px] font-black uppercase tracking-[0.2em] mb-6 text-slate-300">Education</h2>
                  <div className="space-y-6">
                    {education.map((edu) => (
                      <div key={edu.id}>
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-bold text-slate-900 text-xs uppercase tracking-tight">
                            {edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}
                          </h3>
                          <span className="text-[10px] font-bold text-slate-400 font-mono">
                            {edu.startDate} — {edu.endDate}
                          </span>
                        </div>
                        <p className="text-[11px] font-bold opacity-60 italic">{edu.institution}{edu.location ? `, ${edu.location}` : ''}</p>
                        {edu.description && (
                          <p className="mt-2 text-[10.5px] text-slate-600 italic">
                            {edu.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects if any - Creative layout */}
              {projects && projects.length > 0 && (
                <div>
                  <h2 className="text-[11px] font-black uppercase tracking-[0.2em] mb-6 text-slate-300">Key Projects</h2>
                  <div className="grid grid-cols-2 gap-6">
                    {projects.map((proj) => (
                      <div key={proj.id}>
                        <h3 className="font-bold text-slate-900 text-[11px] uppercase border-b border-slate-100 pb-1 mb-2 tracking-tight">
                          {proj.title}
                        </h3>
                        <p className="text-[10px] text-slate-600 leading-relaxed font-medium line-clamp-4">
                          {proj.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          
<div className="p-8 w-full block shrink-0" style={{marginTop: 'auto'}}>
{renderCertificationsSection()}{renderAwardsSection()}{renderAchievementsSection()}
</div>
</div>
        ) : templateId === 'template-mixed-column' ? (
          <div className="flex flex-col h-full min-h-[297mm] text-left">
            {/* Header: Name and contact on white bg */}
            <div className="p-8 pb-4 flex flex-row justify-between items-start">
              <div className="flex-1">
                <h1 className="font-extrabold text-3xl text-slate-900 tracking-tight">
                  {personalInfo.fullName || 'Your Name'}
                </h1>
                {personalInfo.jobTitle && (
                  <p className="text-sm font-semibold tracking-wide uppercase mt-1" style={colorStyle}>
                    {personalInfo.jobTitle}
                  </p>
                )}
              </div>
              <div className="text-right text-[10.5px] text-slate-600 space-y-0.5 max-w-[200px]">
                {personalInfo.phone && <div>{personalInfo.phone}</div>}
                {personalInfo.email && <div className="break-all">{personalInfo.email}</div>}
                {personalInfo.linkedin && <div className="break-all">{personalInfo.linkedin}</div>}
                {personalInfo.website && <div className="break-all">{personalInfo.website}</div>}
                {personalInfo.location && <div>{personalInfo.location}</div>}
              </div>
            </div>

            {/* Profile Summary: Full width with primary background */}
            {personalInfo.bio && (
              <div style={bgStyle} className={`mx-0 my-4 p-8 py-6 ${textOnAccentClass} leading-relaxed text-[11px]`}>
                <p className="whitespace-pre-line">
                  {personalInfo.bio}
                </p>
              </div>
            )}

            {/* Content: Two Columns */}
            <div className="flex flex-row flex-1 p-8 pt-4 gap-8">
              {/* Left Column (Main) */}
              <div className="w-[65%] space-y-8">
                {/* Experience */}
                {experience && experience.length > 0 && (
                  <div className="text-left">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-2.5 h-2.5 rounded-full" style={bgStyle} />
                      <h2 className="font-bold uppercase tracking-widest text-[11px]" style={colorStyle}>Experience</h2>
                    </div>
                    <div className="space-y-6">
                      {experience.map((exp) => (
                        <div key={exp.id} className="relative">
                          <div className="flex justify-between items-baseline mb-1">
                            <h3 className="font-bold text-slate-900 text-xs">{exp.company}</h3>
                            <span style={bgStyle} className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold text-white`}>
                              {exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}
                            </span>
                          </div>
                          <div className="text-[10px] font-bold text-slate-500 mb-2 italic">
                            {exp.position}{exp.location ? ` | ${exp.location}` : ''}
                          </div>
                          {exp.description && (
                            <p className="text-[10.5px] text-slate-600 leading-relaxed whitespace-pre-line decoration-slate-200">
                              {exp.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Education */}
                {education && education.length > 0 && (
                  <div className="text-left">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-2.5 h-2.5 rounded-full" style={bgStyle} />
                      <h2 className="font-bold uppercase tracking-widest text-[11px]" style={colorStyle}>Education</h2>
                    </div>
                    <div className="space-y-4">
                      {education.map((edu) => (
                        <div key={edu.id}>
                          <div className="flex justify-between items-baseline mb-1">
                            <h3 className="font-bold text-slate-900 text-xs">{edu.institution}</h3>
                            <span style={bgStyle} className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold text-white`}>
                              {edu.startDate} - {edu.currentlyStudying ? 'Present' : edu.endDate}
                            </span>
                          </div>
                          <div className="text-[10.5px] text-slate-500 font-bold mb-1">
                            {edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}
                          </div>
                          {edu.location && <div className="text-[9.5px] text-slate-400 font-bold italic" style={colorStyle}>{edu.location}</div>}
                          {edu.description && (
                            <p className="mt-2 text-[10px] text-slate-600 italic">
                              {edu.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Projects */}
                {projects && projects.length > 0 && (
                  <div className="text-left">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-2.5 h-2.5 rounded-full" style={bgStyle} />
                      <h2 className="font-bold uppercase tracking-widest text-[11px]" style={colorStyle}>Projects</h2>
                    </div>
                    <div className="space-y-4">
                      {projects.map((proj) => (
                        <div key={proj.id}>
                          <h3 className="font-bold text-slate-900 text-xs mb-1">{proj.title}</h3>
                          {proj.description && (
                            <p className="text-[10px] text-slate-600 leading-relaxed whitespace-pre-line decoration-slate-200">
                              {proj.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Achievements */}
                {achievements && achievements.length > 0 && (
                  <div className="text-left">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-2.5 h-2.5 rounded-full" style={bgStyle} />
                      <h2 className="font-bold uppercase tracking-widest text-[11px]" style={colorStyle}>Achievements</h2>
                    </div>
                    <div className="space-y-4">
                      {achievements.map((ach) => (
                        <div key={ach.id}>
                          <h3 className="font-bold text-slate-900 text-xs mb-1">• {ach.name}</h3>
                          {ach.date && <div className="text-[9.5px] text-slate-400 font-bold italic ml-2.5 mb-1">{ach.date}</div>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column (Sidebar) */}
              <div className="w-[35%] space-y-8">
                {/* Skills */}
                {skills && skills.filter(cat => cat.skills && cat.skills.length > 0).length > 0 && (
                  <div className="text-left">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-2.5 h-2.5 rounded-full" style={bgStyle} />
                      <h2 className="font-bold uppercase tracking-widest text-[11px]" style={colorStyle}>Skills</h2>
                    </div>
                    <div className="space-y-3">
                      {skills.filter(cat => cat.skills && cat.skills.length > 0).map(cat => (
                        <div key={cat.id}>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-1 select-none">• {cat.name}</p>
                          <p className="text-[10.5px] text-slate-600 leading-relaxed font-medium">
                            {cat.skills.join(', ')}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Languages */}
                {languages && languages.length > 0 && (
                  <div className="text-left">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-2.5 h-2.5 rounded-full" style={bgStyle} />
                      <h2 className="font-bold uppercase tracking-widest text-[11px]" style={colorStyle}>Language</h2>
                    </div>
                    <div className="space-y-1.5 text-[10.5px] text-slate-600">
                      {languages.map((lang) => (
                        <div key={lang.id} className="flex justify-between border-b border-dotted border-slate-200 pb-0.5">
                          <span className="font-semibold">• {lang.name}</span>
                          <span className="text-[9.5px] text-slate-400 italic">{lang.proficiency}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Certifications */}
                {certifications && certifications.length > 0 && (
                  <div className="text-left">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-2.5 h-2.5 rounded-full" style={bgStyle} />
                      <h2 className="font-bold uppercase tracking-widest text-[11px]" style={colorStyle}>Certifications</h2>
                    </div>
                    <div className="space-y-3">
                      {certifications.map((cert) => (
                        <div key={cert.id} className="text-[10.5px] text-slate-600">
                          <p className="font-bold leading-tight select-none">• {cert.name}</p>
                          <p className="text-[9.5px] text-slate-400 italic">{cert.issuer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Awards */}
                {awards && awards.length > 0 && (
                  <div className="text-left">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-2.5 h-2.5 rounded-full" style={bgStyle} />
                      <h2 className="font-bold uppercase tracking-widest text-[11px]" style={colorStyle}>Awards</h2>
                    </div>
                    <div className="space-y-2.5">
                      {awards.map((award) => (
                        <div key={award.id} className="text-[10.5px] text-slate-600">
                          <p className="font-bold leading-tight select-none">• {award.name}</p>
                          <p className="text-[9.5px] text-slate-400 italic">{award.date}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="p-8 pt-0 mt-auto text-right text-[8.5px] text-slate-300 font-mono italic">
              Mixed Column Design Concept
            </div>
          </div>
        ) : templateId === 'template-two-colum-2' ? (
          <div className="flex flex-row h-full min-h-[297mm] items-stretch text-left">
            {/* Left Column: White / very light grey bg with a left accent border */}
            <div className="w-[35%] bg-slate-50/50 border-r border-slate-100 p-6 flex flex-col justify-between relative text-left" style={{ borderLeft: `8px solid ${primaryColor}` }}>
              <div>
                {/* Name & Job Title Card with Primary Color Background */}
                <div 
                  style={bgStyle} 
                  className={`p-5 rounded-2xl ${textOnAccentClass} transition-all duration-300 relative overflow-hidden mb-6 shadow-xs text-left`}
                >
                  {/* Subtle decorative background circle */}
                  <div className="absolute right-0 top-0 w-16 h-16 bg-white/10 rounded-full blur-xl -mr-6 -mt-6" />
                  
                  {personalInfo.photoUrl && (
                    <div className="mb-3">
                      <img 
                        src={personalInfo.photoUrl} 
                        alt={personalInfo.fullName} 
                        className="w-16 h-16 rounded-full border-2 border-white/30 object-cover shadow-xs mx-auto"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                  
                  <h1 className="font-extrabold text-xl tracking-tight leading-tight text-white">
                    {personalInfo.fullName || 'Your Name'}
                  </h1>
                  {personalInfo.jobTitle && (
                    <p className="text-xs font-semibold opacity-95 tracking-wide mt-1 text-white">
                      {personalInfo.jobTitle}
                    </p>
                  )}
                </div>

                {/* Contact List with elegant subtle icons */}
                <div className="space-y-3 pl-1 mb-6 text-left">
                  {personalInfo.phone && (
                    <div className="flex items-center gap-2 text-slate-700 text-[11px] text-left">
                      <Phone className="w-3.5 h-3.5 shrink-0" style={colorStyle} />
                      <span className="truncate">{personalInfo.phone}</span>
                    </div>
                  )}
                  {personalInfo.email && (
                    <div className="flex items-center gap-2 text-slate-700 text-[11px] text-left">
                      <Mail className="w-3.5 h-3.5 shrink-0" style={colorStyle} />
                      <span className="truncate break-all">{personalInfo.email}</span>
                    </div>
                  )}
                  {personalInfo.linkedin && (
                    <div className="flex items-center gap-2 text-slate-700 text-[11px] text-left">
                      <Linkedin className="w-3.5 h-3.5 shrink-0" style={colorStyle} />
                      <span className="truncate break-all">{personalInfo.linkedin}</span>
                    </div>
                  )}
                  {personalInfo.github && (
                    <div className="flex items-center gap-2 text-slate-700 text-[11px] text-left">
                      <Github className="w-3.5 h-3.5 shrink-0" style={colorStyle} />
                      <span className="truncate break-all">{personalInfo.github}</span>
                    </div>
                  )}
                  {personalInfo.website && (
                    <div className="flex items-center gap-2 text-slate-700 text-[11px] text-left">
                      <Globe className="w-3.5 h-3.5 shrink-0" style={colorStyle} />
                      <span className="truncate break-all">{personalInfo.website}</span>
                    </div>
                  )}
                  {personalInfo.location && (
                    <div className="flex items-center gap-2 text-slate-700 text-[11px] text-left">
                      <MapPin className="w-3.5 h-3.5 shrink-0" style={colorStyle} />
                      <span className="truncate">{personalInfo.location}</span>
                    </div>
                  )}
                </div>

                {/* Skills section */}
                {skills && skills.filter(cat => cat.skills && cat.skills.length > 0).length > 0 && (
                  <div className="mb-6 text-left">
                    <div className="flex items-center gap-1.5 border-b pb-1 mb-3" style={borderStyle}>
                      <Wrench className="w-4 h-4 shrink-0" style={colorStyle} />
                      <h2 className="font-bold uppercase tracking-wider text-xs text-slate-900" style={colorStyle}>Skills</h2>
                    </div>
                    <div className="space-y-2 text-slate-750 text-[10.5px] text-left">
                      {skills.filter(cat => cat.skills && cat.skills.length > 0).map(cat => (
                        <div key={cat.id} className="text-left">
                          <p className="font-bold text-[9px] uppercase text-slate-500 tracking-wider mb-1 text-left">{cat.name}</p>
                          <ul className="list-disc pl-4 space-y-0.5 text-left">
                            {cat.skills.map((skill, sIdx) => (
                              <li key={sIdx} className="leading-tight text-left">{skill}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Languages section */}
                {languages && languages.length > 0 && (
                  <div className="mb-6 text-left">
                    <div className="flex items-center gap-1.5 border-b pb-1 mb-3" style={borderStyle}>
                      <Languages className="w-4 h-4 shrink-0" style={colorStyle} />
                      <h2 className="font-bold uppercase tracking-wider text-xs text-slate-900" style={colorStyle}>Languages</h2>
                    </div>
                    <div className="space-y-1.5 text-slate-750 text-[10.5px]">
                      {languages.map((lang) => (
                        <div key={lang.id} className="flex justify-between items-baseline border-b border-slate-100 border-dashed pb-0.5 text-left">
                          <span className="font-semibold leading-tight">{lang.name}</span>
                          <span className="text-[9.5px] text-slate-400 font-mono italic">{lang.proficiency}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Minimal brand identifier matching the general style */}
              <div className="text-[8.5px] text-slate-400 pt-3 border-t border-slate-200/60 font-mono text-left">
                Updated: {new Date(data.updatedAt).toLocaleDateString()}
              </div>
            </div>

            {/* Right Column */}
            <div className="w-[65%] bg-white p-7 flex flex-col justify-between text-left">
              <div>
                {/* Professional Summary Card */}
                {personalInfo.bio && (
                  <div 
                    style={bgStyle} 
                    className={`p-5 rounded-2xl text-white tracking-normal leading-relaxed text-xs transition duration-300 relative overflow-hidden mb-6 shadow-xs text-left`}
                  >
                    <div className="absolute right-0 bottom-0 w-24 h-24 bg-white/5 rounded-full blur-2xl -mr-8 -mb-8" />
                    <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-xs mb-2 border-b border-white/20 pb-1 text-left text-white">
                      <User className="w-4 h-4 shrink-0 text-white" />
                      <span className="text-white">Professional Summary</span>
                    </div>
                    <p className="text-[11.5px] opacity-95 whitespace-pre-line leading-relaxed text-white text-left">
                      {personalInfo.bio}
                    </p>
                  </div>
                )}

                <div className="space-y-5 text-left">
                  {/* Education */}
                  {education && education.length > 0 && (
                    <div className="mb-4 text-left">
                      <div className="flex items-center gap-1.5 border-b pb-1 mb-3 text-left" style={borderStyle}>
                        <GraduationCap className="w-4 h-4 shrink-0" style={colorStyle} />
                        <h2 className="font-bold uppercase tracking-wider text-xs text-slate-900" style={colorStyle}>Education</h2>
                      </div>
                      <div className="space-y-3 text-left">
                        {education.map((edu) => (
                          <div key={edu.id} className="text-xs text-left">
                            <div className="flex justify-between items-baseline flex-wrap gap-2 text-left">
                              <h3 className="font-bold text-slate-900 leading-tight text-left">
                                {edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}
                              </h3>
                              <span style={bgStyle} className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold text-white font-mono shrink-0 shadow-3xs`}>
                                {edu.startDate} – {edu.currentlyStudying ? 'Present' : edu.endDate}
                              </span>
                            </div>
                            <div className="text-[10px] text-slate-500 font-semibold mt-0.5 text-left">{edu.institution}{edu.location ? `, ${edu.location}` : ''}</div>
                            {edu.description && (
                              <p className="mt-1.5 text-[10.5px] text-slate-600 leading-relaxed whitespace-pre-line text-left">
                                {edu.description}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Experience */}
                  {experience && experience.length > 0 && (
                    <div className="mb-4 text-left">
                      <div className="flex items-center gap-1.5 border-b pb-1 mb-3 text-left" style={borderStyle}>
                        <Briefcase className="w-4 h-4 shrink-0" style={colorStyle} />
                        <h2 className="font-bold uppercase tracking-wider text-xs text-slate-900" style={colorStyle}>Experience</h2>
                      </div>
                      <div className="space-y-4 text-left">
                        {experience.map((exp) => (
                          <div key={exp.id} className="text-xs text-left">
                            <div className="flex justify-between items-baseline flex-wrap gap-2 text-left">
                              <h3 className="font-bold text-slate-900 leading-tight text-left">{exp.position}</h3>
                              <span style={bgStyle} className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold text-white font-mono shrink-0 shadow-3xs`}>
                                {exp.startDate} – {exp.currentlyWorking ? 'Present' : exp.endDate}
                              </span>
                            </div>
                            <div className="text-[10px] text-slate-500 font-semibold mt-0.5 text-left">{exp.company}{exp.location ? `, ${exp.location}` : ''}</div>
                            {exp.description && (
                              <p className="mt-1.5 text-[10.5px] text-slate-600 leading-normal whitespace-pre-line text-left">
                                {exp.description}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Projects */}
                  {projects && projects.length > 0 && (
                    <div className="mb-4 text-left">
                      <div className="flex items-center gap-1.5 border-b pb-1 mb-3 text-left" style={borderStyle}>
                        <BookOpen className="w-4 h-4 shrink-0" style={colorStyle} />
                        <h2 className="font-bold uppercase tracking-wider text-xs text-slate-900" style={colorStyle}>Projects</h2>
                      </div>
                      <div className="space-y-3.5 text-left">
                        {projects.map((proj) => (
                          <div key={proj.id} className="text-xs text-left">
                            <div className="flex justify-between items-baseline flex-wrap gap-2 text-left">
                              <h3 className="font-bold text-slate-900 leading-tight text-left">{proj.title}</h3>
                              <span style={bgStyle} className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold text-white font-mono shrink-0 shadow-3xs`}>
                                {proj.startDate} – {proj.isCurrent ? 'Present' : proj.endDate}
                              </span>
                            </div>
                            <div className="flex justify-between text-[10px] text-slate-500 font-semibold mt-0.5 text-left">
                              <span className="text-left">{proj.role}</span>
                              {proj.link && (
                                <a href={proj.link} target="_blank" rel="noopener noreferrer" className="hover:underline transition-all text-[9.5px] ml-2" style={colorStyle}>
                                  Link
                                </a>
                              )}
                            </div>
                            {proj.description && (
                              <p className="mt-1 text-[10.5px] text-slate-600 leading-relaxed whitespace-pre-line text-left">
                                {proj.description}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Certifications, Awards, Achievements */}
                  {(certifications && certifications.length > 0) || (awards && awards.length > 0) ? (
                    <div className="grid grid-cols-2 gap-4 text-left">
                      {certifications && certifications.length > 0 && (
                        <div className="text-left">
                          <div className="flex items-center gap-1.5 border-b pb-1 mb-2 text-left" style={borderStyle}>
                            <Award className="w-3.5 h-3.5 shrink-0" style={colorStyle} />
                            <h2 className="font-bold uppercase tracking-wider text-[10.5px] text-slate-900" style={colorStyle}>Certifications</h2>
                          </div>
                          <div className="space-y-2 text-left">
                            {certifications.map((cert) => (
                              <div key={cert.id} className="text-[10.5px] text-left">
                                <div className="font-semibold text-slate-900 leading-tight text-left">{cert.name}</div>
                                <div className="text-[9px] text-slate-500 font-mono text-left">{cert.date} | {cert.issuer}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {awards && awards.length > 0 && (
                        <div className="text-left">
                          <div className="flex items-center gap-1.5 border-b pb-1 mb-2 text-left" style={borderStyle}>
                            <Sparkles className="w-3.5 h-3.5 shrink-0" style={colorStyle} />
                            <h2 className="font-bold uppercase tracking-wider text-[10.5px] text-slate-900" style={colorStyle}>Awards</h2>
                          </div>
                          <div className="space-y-2 text-left">
                            {awards.map((award) => (
                              <div key={award.id} className="text-[10.5px] text-left">
                                <div className="font-semibold text-slate-900 leading-tight text-left">{award.name}</div>
                                <div className="text-[9px] text-slate-500 font-mono text-left">{award.date} | {award.issuer}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="text-right text-[8.5px] text-slate-400 mt-6 pt-4 border-t border-slate-100 font-mono">
                
              </div>
            </div>
          
<div className="p-8 w-full block shrink-0" style={{marginTop: 'auto'}}>
{renderAchievementsSection()}
</div>
</div>
        ) : templateId === 'template-two-colum-1' ? (
          <div className="flex flex-row h-full min-h-[297mm] items-stretch">
            {/* First Column: navy blue bg, white text */}
            <div className="w-[35%] bg-blue-950 text-white p-7 flex flex-col justify-between">
              <div>
                {/* Photo & Identity */}
                {personalInfo.photoUrl && (
                  <div className="flex justify-center mb-5">
                    <img 
                      src={personalInfo.photoUrl} 
                      alt={personalInfo.fullName} 
                      className="w-24 h-24 rounded-full border-4 border-white/20 object-cover shadow-md"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}
                
                <div className="text-left mb-6">
                  <h1 className="font-extrabold text-xl text-white tracking-tight leading-tight">
                    {personalInfo.fullName || 'Your Name'}
                  </h1>
                  {personalInfo.jobTitle && (
                    <p className="text-xs font-semibold tracking-wider text-blue-300 uppercase mt-1">
                      {personalInfo.jobTitle}
                    </p>
                  )}
                </div>

                {/* Identity Details Heading */}
                <div className="mb-4 mt-2">
                  <h2 
                    className={`font-bold tracking-wide uppercase ${headingFontSizeClass} border-b pb-1`}
                    style={{ color: '#ffffff', borderBottomColor: '#ffffff' }}
                  >
                    Identity Details
                  </h2>
                </div>

                {/* Contacts List without icons */}
                <div className="space-y-2 text-[10.5px] text-slate-200 pb-4 font-sans leading-relaxed">
                  {personalInfo.email && <div className="break-all">{personalInfo.email}</div>}
                  {personalInfo.phone && <div>{personalInfo.phone}</div>}
                  {personalInfo.location && <div>{personalInfo.location}</div>}
                  {personalInfo.nationality && <div>{personalInfo.nationality}</div>}
                  {personalInfo.gender && <div>{personalInfo.gender}</div>}
                  {personalInfo.website && <div className="break-all">{personalInfo.website}</div>}
                  {personalInfo.linkedin && <div className="break-all">{personalInfo.linkedin}</div>}
                  {personalInfo.github && <div className="break-all">{personalInfo.github}</div>}
                </div>

                {personalInfo.bio && (
                  <div className="border-t pt-4 pb-4" style={{ borderTopColor: '#ffffff' }}>
                    <p className="text-[11px] text-slate-300 leading-relaxed italic">
                      {personalInfo.bio}
                    </p>
                  </div>
                )}

                {/* Skills details */}
                <div className="text-white mt-4">
                  {renderSkillsSection(true)}
                </div>

                {/* Language details */}
                <div className="text-white mt-4">
                  {renderLanguagesSection(true)}
                </div>
              </div>

              <div className="text-[9px] text-slate-400 mt-6 pt-4 border-t font-mono" style={{ borderTopColor: '#ffffff' }}>
                Last active: {new Date(data.updatedAt).toLocaleDateString()}
              </div>
            </div>

            {/* Second Column: Experience, Projects, Education, Skills, Certifications */}
            <div className="w-[65%] bg-white p-7 flex flex-col justify-between">
              <div className="space-y-2">
                {renderExperienceSection()}
                {renderProjectsSection()}
                {renderEducationSection()}
                {renderCertificationsSection(false)}
                {renderAwardsSection(false)}
                {renderAchievementsSection(false)}
              </div>

              <div className="text-right text-[10px] text-slate-450 mt-6 pt-4 border-t border-slate-100 font-mono">
                
              </div>
            </div>
          </div>
        ) : (
          <>
            <div>
              {renderHeader()}

              {useTwoColumn ? (
                // Two-column grid layout
                <div className="grid grid-cols-12 gap-8 mt-6">
                  {/* Left Main column - 8 cols */}
                  <div className="col-span-8 space-y-2">
                    {renderExperienceSection()}
                    {renderProjectsSection()}
                    {renderEducationSection()}
                  </div>

                  {/* Right Sidebar column - 4 cols */}
                  <div className="col-span-4 space-y-2 border-l border-slate-100 pl-6">
                    {renderSkillsSection()}
                    {renderLanguagesSection()}
                    {renderCertificationsSection()}
                    {renderAwardsSection()}
                    {renderAchievementsSection()}
                  </div>
                </div>
              ) : (
                // Full width vertical flow layout
                <div className="mt-6 space-y-2 font-sans">
                  {renderExperienceSection()}
                  {renderProjectsSection()}
                  {renderEducationSection()}
                  {renderSkillsSection()}
                  {templateId === 'ats-optimized' ? (
                    <div className="space-y-2">
                      {renderCertificationsSection()}
                      {renderAwardsSection()}
                      {renderAchievementsSection()}
                      {renderLanguagesSection()}
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-8">
                      {renderCertificationsSection()}
                      {renderAwardsSection()}
                      {renderAchievementsSection()}
                      {renderLanguagesSection()}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Dynamic bottom resume identifier */}
            <div className="text-right text-[10px] text-slate-400 mt-12 pt-4 border-t border-slate-100 font-mono flex justify-between">
              <span></span>
              <span>Last active: {new Date(data.updatedAt).toLocaleDateString()}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
