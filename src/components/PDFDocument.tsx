import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Link } from '@react-pdf/renderer';
import { ResumeData } from '../types';

// Helper to determine text color contrast on dark backgrounds
const getContrastColor = (hexcolor: string) => {
  const r = parseInt(hexcolor.substring(1, 3), 16);
  const g = parseInt(hexcolor.substring(3, 5), 16);
  const b = parseInt(hexcolor.substring(5, 7), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? '#1e293b' : '#ffffff';
};

interface PDFDocumentProps {
  data: ResumeData;
}

export const PDFDocument: React.FC<PDFDocumentProps> = ({ data }) => {
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

  const fontSans = 'Helvetica';
  const fontSerif = 'Times-Roman';
  const fontMono = 'Courier';

  const chosenFont = 
    fontFamily === 'serif' ? fontSerif : 
    fontFamily === 'mono' ? fontMono : fontSans;

  const chosenFontBold = 
    fontFamily === 'serif' ? 'Times-Bold' : 
    fontFamily === 'mono' ? 'Courier-Bold' : 'Helvetica-Bold';

  // Base font size scaling
  const sizeMultiplier = fontSize === 'sm' ? 0.85 : fontSize === 'lg' ? 1.15 : 1;
  const baseSize = (sz: number) => sz * sizeMultiplier;

  // Global styles for react-pdf
  const styles = StyleSheet.create({
    page: {
      padding: (templateId === 'template-two-colum-1' || templateId === 'template-two-colum-2' || templateId === 'template-two-colum-3' || templateId === 'template-mixed-column' || templateId === 'template-column-4' || templateId === 'template-column-5' || templateId === 'template-mixed-column-2' || templateId === 'template-mixed-column-3' || templateId === 'template-mixed-column-4' || templateId === 'template-mixed-column-5' || templateId === 'template-single-column-1' || templateId === 'template-single-column-2' || templateId === 'template-single-column-3' || templateId === 'template-single-column-4' || templateId === 'template-single-column-5' || templateId === 'template-ats-compliant-1' || templateId === 'template-ats-compliant-2' || templateId === 'template-ats-compliant-3' || templateId === 'template-ats-compliant-4' || templateId === 'template-ats-compliant-5' || templateId === 'template-ats-compliant-6' || templateId === 'template-ats-compliant-7' || templateId === 'template-ats-compliant-8' || templateId === 'template-ats-compliant-9' || templateId === 'template-ats-compliant-10' || templateId === 'template-industry-pro-11' || templateId === 'template-industry-pro-12' || templateId === 'template-industry-pro-13' || templateId === 'template-industry-pro-14' || templateId === 'template-industry-pro-15') ? 0 : 36,
      fontFamily: chosenFont,
      color: '#1e293b',
      fontSize: baseSize(10),
      backgroundColor: '#ffffff',
    },
    templateTwoCol1Container: {
      flexDirection: 'row',
      flexGrow: 1,
    },
    templateTwoCol1Sidebar: {
      width: '35%',
      backgroundColor: '#172554', // Navy blue
      color: '#ffffff',
      padding: 24,
    },
    templateTwoCol1Main: {
      width: '65%',
      backgroundColor: '#ffffff',
      padding: 24,
    },
    // Layout template modern-minimal (2 columns)
    container2Col: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    leftCol: {
      width: '63%',
    },
    rightCol: {
      width: '32%',
    },
    // Sections & Dividers
    section: {
      marginBottom: 14,
    },
    sectionHeader: {
      borderBottomWidth: 1.5,
      borderBottomColor: primaryColor,
      paddingBottom: 3,
      marginBottom: 8,
    },
    sectionTitleText: {
      fontSize: baseSize(12),
      fontFamily: chosenFontBold,
      color: primaryColor,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    // Item styling
    itemRow: {
      marginBottom: 8,
    },
    itemHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: 2,
    },
    itemTitle: {
      fontFamily: chosenFontBold,
      fontSize: baseSize(11),
      color: '#0f172a',
      flex: 1,
      paddingRight: 10,
    },
    itemSubtitle: {
      fontFamily: chosenFontBold,
      fontSize: baseSize(10),
      color: '#475569',
      flex: 1,
      paddingRight: 10,
    },
    itemMeta: {
      fontSize: baseSize(9),
      fontFamily: chosenFontBold,
      color: '#64748b',
      flexShrink: 0,
      textAlign: 'right' as const,
    },
    itemDesc: {
      fontSize: baseSize(9),
      color: '#334155',
      lineHeight: 1.3,
    },
    // Personal Info styles based on templates
    headerContainer: {
      marginBottom: 16,
      borderBottomWidth: templateId === 'classic-professional' ? 3 : 0,
      borderBottomColor: primaryColor,
      paddingBottom: templateId === 'classic-professional' ? 8 : 0,
    },
    introRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatar: {
      width: baseSize(64),
      height: baseSize(64),
      borderRadius: 32,
      marginBottom: 8,
      marginRight: 14,
    },
    fullName: {
      fontSize: baseSize(24),
      fontFamily: chosenFontBold,
      color: templateId === 'creative-bold' ? '#ffffff' : '#0f172a',
      letterSpacing: -0.5,
    },
    jobTitle: {
      fontSize: baseSize(13),
      fontFamily: chosenFontBold,
      color: templateId === 'creative-bold' ? getContrastColor(primaryColor) : primaryColor,
      marginTop: 2,
    },
    contactGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 6,
      fontSize: baseSize(8.5),
      color: '#475569',
    },
    contactItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 10,
      marginBottom: 4,
    },
    bioText: {
      fontSize: baseSize(9.5),
      color: '#334155',
      marginTop: 6,
      lineHeight: 1.4,
    },
    // Creative Header Area
    creativeHeader: {
      flexDirection: 'column',
      backgroundColor: primaryColor,
      padding: 16,
      margin: -36,
      marginBottom: 24,
      borderRadius: 0,
    },
    creativeContactItem: {
      color: getContrastColor(primaryColor),
      fontSize: baseSize(8.5),
      marginRight: 12,
      marginBottom: 6,
    },
    creativeBio: {
      color: getContrastColor(primaryColor),
      opacity: 0.9,
      fontSize: baseSize(9.5),
      marginTop: 8,
      lineHeight: 1.4,
    },
    // Skills tags
    skillCatTitle: {
      fontFamily: chosenFontBold,
      fontSize: baseSize(9.5),
      color: '#334155',
      marginTop: 4,
      marginBottom: 2,
    },
    skillList: {
      fontSize: baseSize(9),
      color: '#475569',
      marginBottom: 6,
      lineHeight: 1.3,
    },
    langRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 4,
      fontSize: baseSize(9),
    },
  });

  // Render Header block
  const renderHeader = () => {
    if (templateId === 'template-two-colum-1' || templateId === 'template-two-colum-2' || templateId === 'template-two-colum-3' || templateId === 'template-mixed-column' || templateId === 'template-column-4' || templateId === 'template-column-5' || templateId === 'template-mixed-column-2' || templateId === 'template-mixed-column-3' || templateId === 'template-mixed-column-4' || templateId === 'template-mixed-column-5' || templateId === 'template-single-column-1' || templateId === 'template-single-column-2' || templateId === 'template-single-column-3' || templateId === 'template-single-column-4' || templateId === 'template-single-column-5' || templateId === 'template-ats-compliant-1' || templateId === 'template-ats-compliant-2' || templateId === 'template-ats-compliant-3' || templateId === 'template-ats-compliant-4' || templateId === 'template-ats-compliant-5' || templateId === 'template-ats-compliant-6' || templateId === 'template-ats-compliant-7' || templateId === 'template-ats-compliant-8' || templateId === 'template-ats-compliant-9' || templateId === 'template-ats-compliant-10' || templateId === 'template-industry-pro-11' || templateId === 'template-industry-pro-12' || templateId === 'template-industry-pro-13' || templateId === 'template-industry-pro-14' || templateId === 'template-industry-pro-15') {
      return null;
    }
    if (templateId === 'ats-optimized') {
      return (
        <View style={{ marginBottom: 16, borderBottomWidth: 1, borderBottomColor: '#475569', paddingBottom: 10, textAlign: 'center' }}>
          <Text style={{ fontSize: baseSize(18), fontFamily: chosenFontBold, color: '#0f172a', textTransform: 'uppercase', marginBottom: 4, letterSpacing: 0.5 }}>
            {personalInfo.fullName || 'Your Name'}
          </Text>
          {personalInfo.jobTitle ? (
            <Text style={{ fontSize: baseSize(11), fontFamily: chosenFontBold, color: '#475569', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              {personalInfo.jobTitle}
            </Text>
          ) : null}
          
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', fontSize: baseSize(8.5), color: '#334155', marginTop: 2 }}>
            {personalInfo.email && <Text style={{ marginRight: 8, marginBottom: 4 }}>Email: {personalInfo.email}</Text>}
            {personalInfo.phone && <Text style={{ marginRight: 8, marginBottom: 4 }}>| Phone: {personalInfo.phone}</Text>}
            {personalInfo.location && <Text style={{ marginRight: 8, marginBottom: 4 }}>| Location: {personalInfo.location}</Text>}
            {personalInfo.nationality && <Text style={{ marginRight: 8, marginBottom: 4 }}>| Nationality: {personalInfo.nationality}</Text>}
            {personalInfo.gender && <Text style={{ marginRight: 8, marginBottom: 4 }}>| Gender: {personalInfo.gender}</Text>}
            {personalInfo.website && <Text style={{ marginRight: 8, marginBottom: 4 }}>| Web: {personalInfo.website}</Text>}
            {personalInfo.linkedin && <Text style={{ marginRight: 8, marginBottom: 4 }}>| LinkedIn: {personalInfo.linkedin}</Text>}
            {personalInfo.github && <Text style={{ marginRight: 8, marginBottom: 4 }}>| GitHub: {personalInfo.github}</Text>}
          </View>
          
          {personalInfo.bio ? (
            <Text style={{ fontSize: baseSize(9), color: '#334155', marginTop: 8, lineHeight: 1.4, textAlign: 'center' }}>
              {personalInfo.bio}
            </Text>
          ) : null}
        </View>
      );
    }

    const isCreative = templateId === 'creative-bold';
    
    if (isCreative) {
      return (
        <View style={styles.creativeHeader}>
          <View style={personalInfo.photoUrl ? { flexDirection: 'row', alignItems: 'center' } : { flexDirection: 'column' }}>
            {personalInfo.photoUrl && (
              <Image src={personalInfo.photoUrl} style={styles.avatar} />
            )}
            <View style={personalInfo.photoUrl ? { flex: 1, flexDirection: 'column' } : { flexDirection: 'column' }}>
              <Text style={styles.fullName}>{personalInfo.fullName || 'Your Name'}</Text>
              <Text style={styles.jobTitle}>{personalInfo.jobTitle || 'Your Profession'}</Text>
            </View>
          </View>
          
          <View style={[styles.contactGrid, { marginTop: 10 }]}>
            {personalInfo.email && <Text style={styles.creativeContactItem}>{personalInfo.email}</Text>}
            {personalInfo.phone && <Text style={styles.creativeContactItem}>{personalInfo.phone}</Text>}
            {personalInfo.location && <Text style={styles.creativeContactItem}>{personalInfo.location}</Text>}
            {personalInfo.nationality && <Text style={styles.creativeContactItem}>Nationality: {personalInfo.nationality}</Text>}
            {personalInfo.gender && <Text style={styles.creativeContactItem}>Gender: {personalInfo.gender}</Text>}
            {personalInfo.website && <Text style={styles.creativeContactItem}>{personalInfo.website}</Text>}
            {personalInfo.linkedin && <Text style={styles.creativeContactItem}>{personalInfo.linkedin}</Text>}
            {personalInfo.github && <Text style={styles.creativeContactItem}>{personalInfo.github}</Text>}
          </View>
          
          {personalInfo.bio && (
            <Text style={styles.creativeBio}>{personalInfo.bio}</Text>
          )}
        </View>
      );
    }

    const isExecutive = templateId === 'executive-premium';
    if (isExecutive) {
      return (
        <View style={{ backgroundColor: '#f8fafc', borderBottomWidth: 1, borderBottomColor: '#e2e8f0', padding: 18, margin: -36, marginBottom: 20 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {personalInfo.photoUrl && (
                <Image src={personalInfo.photoUrl} style={{ width: baseSize(54), height: baseSize(54), borderRadius: 6, marginRight: 12, objectFit: 'cover' }} />
              )}
              <View>
                <Text style={{ fontSize: baseSize(18), fontFamily: chosenFontBold, color: '#0f172a', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  {personalInfo.fullName || 'Your Name'}
                </Text>
                <Text style={{ fontSize: baseSize(10.5), fontFamily: chosenFontBold, color: primaryColor, marginTop: 2, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  {personalInfo.jobTitle || 'EXECUTIVE LEADERSHIP'}
                </Text>
              </View>
            </View>
            
            <View style={{ flexDirection: 'column', alignItems: 'flex-end', fontSize: baseSize(8.2), color: '#475569', lineHeight: 1.3 }}>
              {personalInfo.email && <Text>{personalInfo.email}</Text>}
              {personalInfo.phone && <Text>{personalInfo.phone}</Text>}
              {personalInfo.location && <Text>{personalInfo.location}</Text>}
              {personalInfo.nationality && <Text>{personalInfo.nationality}</Text>}
              {personalInfo.gender && <Text>{personalInfo.gender}</Text>}
              {personalInfo.website && <Text>{personalInfo.website}</Text>}
              {personalInfo.linkedin && <Text>{personalInfo.linkedin}</Text>}
              {personalInfo.github && <Text>{personalInfo.github}</Text>}
            </View>
          </View>
          
          {personalInfo.bio && (
            <View style={{ marginTop: 10, borderLeftWidth: 2, borderLeftColor: primaryColor, paddingLeft: 8 }}>
              <Text style={{ fontSize: baseSize(9.2), color: '#334155', fontStyle: 'italic', lineHeight: 1.35 }}>
                {personalInfo.bio}
              </Text>
            </View>
          )}
        </View>
      );
    }

    // Standard Header for modern-minimal, classic, academic-technical
    const isClassic = templateId === 'classic-professional';
    const isAcademic = templateId === 'academic-technical';

    const textCenter = isClassic ? { textAlign: 'center' as const, alignItems: 'center' as const } : {};
    const gridCenter = isClassic ? { justifyContent: 'center' as const } : {};

    return (
      <View style={[styles.headerContainer, textCenter]}>
        <View style={[styles.introRow, textCenter]}>
          {personalInfo.photoUrl && (
            <Image src={personalInfo.photoUrl} style={styles.avatar} />
          )}
          <View style={textCenter}>
            <Text style={styles.fullName}>
              {personalInfo.fullName || 'Your Name'}
            </Text>
            <Text style={styles.jobTitle}>{personalInfo.jobTitle || 'Your Profession'}</Text>
          </View>
        </View>

        <View style={[styles.contactGrid, gridCenter]}>
          {personalInfo.email && <Text style={styles.contactItem}>{personalInfo.email}</Text>}
          {personalInfo.phone && <Text style={styles.contactItem}>{personalInfo.phone}</Text>}
          {personalInfo.location && <Text style={styles.contactItem}>{personalInfo.location}</Text>}
          {personalInfo.nationality && <Text style={styles.contactItem}>Nationality: {personalInfo.nationality}</Text>}
          {personalInfo.gender && <Text style={styles.contactItem}>Gender: {personalInfo.gender}</Text>}
          {personalInfo.website && <Text style={styles.contactItem}>{personalInfo.website}</Text>}
          {personalInfo.linkedin && <Text style={styles.contactItem}>{personalInfo.linkedin}</Text>}
          {personalInfo.github && <Text style={styles.contactItem}>{personalInfo.github}</Text>}
        </View>

        {personalInfo.bio && (
          <Text style={[styles.bioText, isClassic ? { textAlign: 'center' } : {}]}>
            {personalInfo.bio}
          </Text>
        )}
      </View>
    );
  };

  const renderSectionHeader = (title: string, onDark?: boolean) => {
    return (
      <View style={[styles.sectionHeader, onDark ? { borderBottomColor: '#ffffff' } : null]}>
        <Text style={[styles.sectionTitleText, onDark ? { color: '#ffffff' } : null]}>
          {title}
        </Text>
      </View>
    );
  };

  // Render Experience Section
  const renderExperience = () => {
    if (!experience || experience.length === 0) return null;
    return (
      <View style={styles.section}>
        {renderSectionHeader('Experience')}
        {experience.map((exp) => (
          <View key={exp.id} style={styles.itemRow} wrap={false}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemTitle}>{exp.position}</Text>
              <Text style={styles.itemMeta}>
                {exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}
              </Text>
            </View>
            <View style={styles.itemHeader}>
              <Text style={styles.itemSubtitle}>{exp.company}{exp.location ? `, ${exp.location}` : ''}</Text>
            </View>
            {exp.description && <Text style={styles.itemDesc}>{exp.description}</Text>}
          </View>
        ))}
      </View>
    );
  };

  // Render Education Section
  const renderEducation = () => {
    if (!education || education.length === 0) return null;
    return (
      <View style={styles.section}>
        {renderSectionHeader('Education')}
        {education.map((edu) => (
          <View key={edu.id} style={styles.itemRow} wrap={false}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemTitle}>
                {edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}
              </Text>
              <Text style={styles.itemMeta}>
                {edu.startDate} - {edu.currentlyStudying ? 'Present' : edu.endDate}
              </Text>
            </View>
            <View style={styles.itemHeader}>
              <Text style={styles.itemSubtitle}>{edu.institution}{edu.location ? `, ${edu.location}` : ''}</Text>
            </View>
            {edu.description && <Text style={styles.itemDesc}>{edu.description}</Text>}
          </View>
        ))}
      </View>
    );
  };

  // Render Projects Section
  const renderProjects = () => {
    if (!projects || projects.length === 0) return null;
    return (
      <View style={styles.section}>
        {renderSectionHeader('Projects')}
        {projects.map((proj) => (
          <View key={proj.id} style={styles.itemRow} wrap={false}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemTitle}>{proj.title}</Text>
              <Text style={styles.itemMeta}>
                {proj.startDate} - {proj.isCurrent ? 'Present' : proj.endDate}
              </Text>
            </View>
            <View style={styles.itemHeader}>
              <Text style={styles.itemSubtitle}>{proj.role}</Text>
              {proj.link && (
                <Text style={[styles.itemMeta, { color: primaryColor }]}>{proj.link}</Text>
              )}
            </View>
            {proj.description && <Text style={styles.itemDesc}>{proj.description}</Text>}
          </View>
        ))}
      </View>
    );
  };

  // Render Certifications Section
  const renderCertifications = (onDark?: boolean) => {
    if (!certifications || certifications.length === 0) return null;
    return (
      <View style={styles.section}>
        {renderSectionHeader('Certifications', onDark)}
        {certifications.map((cert) => (
          <View key={cert.id} style={{ marginBottom: 5 }} wrap={false}>
            <View style={styles.itemHeader}>
              <Text style={[styles.itemTitle, onDark ? { color: '#ffffff' } : null]}>{cert.name}</Text>
              <Text style={[styles.itemMeta, onDark ? { color: '#cbd5e1' } : null]}>{cert.date}</Text>
            </View>
            <View style={styles.itemHeader}>
              <Text style={[styles.itemSubtitle, onDark ? { color: '#94a3b8' } : null]}>{cert.issuer}</Text>
              {cert.link && <Text style={[styles.itemMeta, { color: onDark ? '#60a5fa' : primaryColor }]}>{cert.link}</Text>}
            </View>
          </View>
        ))}
      </View>
    );
  };

  // Render Awards Section
  const renderAwards = (onDark?: boolean) => {
    if (!awards || awards.length === 0) return null;
    return (
      <View style={styles.section}>
        {renderSectionHeader('Awards', onDark)}
        {awards.map((award) => (
          <View key={award.id} style={{ marginBottom: 5 }} wrap={false}>
            <View style={styles.itemHeader}>
              <Text style={[styles.itemTitle, onDark ? { color: '#ffffff' } : null]}>{award.name}</Text>
              <Text style={[styles.itemMeta, onDark ? { color: '#cbd5e1' } : null]}>{award.date}</Text>
            </View>
            <View style={styles.itemHeader}>
              <Text style={[styles.itemSubtitle, onDark ? { color: '#94a3b8' } : null]}>{award.issuer}</Text>
              {award.link && <Text style={[styles.itemMeta, { color: onDark ? '#60a5fa' : primaryColor }]}>{award.link}</Text>}
            </View>
          </View>
        ))}
      </View>
    );
  };

  // Render Achievements Section
  const renderAchievements = (onDark?: boolean) => {
    if (!achievements || achievements.length === 0) return null;
    return (
      <View style={styles.section}>
        {renderSectionHeader('Achievements', onDark)}
        {achievements.map((ach) => (
          <View key={ach.id} style={{ marginBottom: 5 }} wrap={false}>
            <View style={styles.itemHeader}>
              <Text style={[styles.itemTitle, onDark ? { color: '#ffffff' } : null]}>{ach.name}</Text>
              <Text style={[styles.itemMeta, onDark ? { color: '#cbd5e1' } : null]}>{ach.date}</Text>
            </View>
            {ach.link && (
              <View style={styles.itemHeader}>
                <Text style={[styles.itemMeta, { color: onDark ? '#60a5fa' : primaryColor }]}>{ach.link}</Text>
              </View>
            )}
          </View>
        ))}
      </View>
    );
  };

  // Render Skills Section (Sidebar or inline depending on Layout)
  const renderSkills = (onDark?: boolean) => {
    const validSkills = skills.filter((cat) => cat.skills && cat.skills.length > 0);
    if (validSkills.length === 0) return null;

    return (
      <View style={styles.section}>
        {renderSectionHeader('Skills', onDark)}
        {validSkills.map((cat) => (
          <View key={cat.id} style={{ marginBottom: 6 }}>
            <Text style={[styles.skillCatTitle, onDark ? { color: '#cbd5e1' } : null]}>{cat.name}</Text>
            <Text style={[styles.skillList, onDark ? { color: '#ffffff' } : null]}>{cat.skills.join(', ')}</Text>
          </View>
        ))}
      </View>
    );
  };

  // Render Languages Section
  const renderLanguages = (onDark?: boolean) => {
    if (!languages || languages.length === 0) return null;
    return (
      <View style={styles.section}>
        {renderSectionHeader('Languages', onDark)}
        {languages.map((lang) => (
          <View key={lang.id} style={styles.langRow}>
            <Text style={{ fontFamily: chosenFontBold, color: onDark ? '#ffffff' : '#0f172a' }}>{lang.name}</Text>
            <Text style={{ color: onDark ? '#cbd5e1' : '#64748b' }}>{lang.proficiency}</Text>
          </View>
        ))}
      </View>
    );
  };

  // 2-Column layouts can be used for Modern-Minimal or Executive Premium
  const isTemplateTwoColumn1 = templateId === 'template-two-colum-1';
  const useTwoColumn = templateId === 'modern-minimal' || templateId === 'executive-premium';

  return (
    <Document title={data.title || 'Resume'}>
      <Page size="A4" style={styles.page}>
        {renderHeader()}

        {templateId === 'template-ats-compliant-1' ? (
          <View style={{ flexDirection: 'column', flexGrow: 1, backgroundColor: '#ffffff', padding: 40 }}>
            {/* Header - Teal & Indigo */}
            <View style={{ borderBottomWidth: 4, borderBottomColor: '#0d9488', paddingBottom: 25, marginBottom: 30 }}>
               <Text style={{ fontSize: baseSize(32), fontFamily: chosenFontBold, color: '#0f172a' }}>{personalInfo.fullName || 'Your Name'}</Text>
               <Text style={{ fontSize: baseSize(14), fontFamily: chosenFontBold, color: '#0d9488', marginTop: 5 }}>{personalInfo.jobTitle}</Text>
               <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 15, marginTop: 15, fontSize: baseSize(9), color: '#64748b' }}>
                  {personalInfo.email ? <Text style={{ borderRightWidth: 1, borderRightColor: '#e2e8f0', paddingRight: 15 }}>{personalInfo.email}</Text> : null}
                  {personalInfo.phone ? <Text style={{ borderRightWidth: 1, borderRightColor: '#e2e8f0', paddingRight: 15 }}>{personalInfo.phone}</Text> : null}
                  {personalInfo.location ? <Text>{personalInfo.location}</Text> : null}
               </View>
            </View>

            <View style={{ gap: 30 }}>
               {personalInfo.bio ? (
                 <View style={{ marginBottom: 20 }}>
                    <Text style={{ fontSize: baseSize(9), fontFamily: chosenFontBold, color: '#0f766e', textTransform: 'uppercase', letterSpacing: 2, borderBottomWidth: 1, borderBottomColor: '#f1f5f9', paddingBottom: 3, marginBottom: 10 }}>Professional Profile</Text>
                    <Text style={{ fontSize: baseSize(10), color: '#475569', lineHeight: 1.5 }}>{personalInfo.bio}</Text>
                 </View>
               ) : null}

               {experience && experience.length > 0 ? (
                 <View style={{ marginBottom: 20 }}>
                    <Text style={{ fontSize: baseSize(9), fontFamily: chosenFontBold, color: '#0f766e', textTransform: 'uppercase', letterSpacing: 2, borderBottomWidth: 1, borderBottomColor: '#f1f5f9', paddingBottom: 3, marginBottom: 15 }}>Work Experience</Text>
                    {experience.map(exp => (
                      <View key={exp.id} style={{ marginBottom: 15 }}>
                         <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 }}>
                            <Text style={{ fontSize: baseSize(11), fontFamily: chosenFontBold, color: '#0f172a' }}>{exp.position}</Text>
                            <Text style={{ fontSize: baseSize(8.5), fontFamily: chosenFontBold, color: '#4f46e5' }}>{exp.startDate} – {exp.currentlyWorking ? 'Present' : exp.endDate}</Text>
                         </View>
                         <Text style={{ fontSize: baseSize(9.5), fontFamily: chosenFontBold, color: '#0d9488', fontStyle: 'italic', marginBottom: 5 }}>{exp.company}</Text>
                         {exp.description ? <Text style={{ fontSize: baseSize(10), color: '#475569', lineHeight: 1.4 }}>{exp.description}</Text> : null}
                      </View>
                    ))}
                 </View>
               ) : null}

               <View style={{ flexDirection: 'row', gap: 40 }}>
                  <View style={{ flex: 1 }}>
                     {skills && skills.length > 0 ? (
                       <View>
                          <Text style={{ fontSize: baseSize(9), fontFamily: chosenFontBold, color: '#0f766e', textTransform: 'uppercase', letterSpacing: 2, borderBottomWidth: 1, borderBottomColor: '#f1f5f9', paddingBottom: 3, marginBottom: 10 }}>Key Expertise</Text>
                          {skills.map(cat => (
                            <View key={cat.id} style={{ marginBottom: 8 }}>
                               <Text style={{ fontSize: baseSize(8.5), fontFamily: chosenFontBold, color: '#1e293b', marginBottom: 2 }}>{cat.name}</Text>
                               <Text style={{ fontSize: baseSize(9), color: '#64748b' }}>{cat.skills.join(', ')}</Text>
                            </View>
                          ))}
                       </View>
                     ) : null}
                  </View>
                  <View style={{ flex: 1 }}>
                     {education && education.length > 0 ? (
                       <View>
                          <Text style={{ fontSize: baseSize(9), fontFamily: chosenFontBold, color: '#0f766e', textTransform: 'uppercase', letterSpacing: 2, borderBottomWidth: 1, borderBottomColor: '#f1f5f9', paddingBottom: 3, marginBottom: 10 }}>Education</Text>
                          {education.map(edu => (
                            <View key={edu.id} style={{ marginBottom: 10 }}>
                               <Text style={{ fontSize: baseSize(9.5), fontFamily: chosenFontBold, color: '#0f172a' }}>{edu.degree}</Text>
                               <Text style={{ fontSize: baseSize(8.5), color: '#0d9488', fontStyle: 'italic' }}>{edu.institution}</Text>
                               <Text style={{ fontSize: baseSize(7.5), color: '#94a3b8', marginTop: 2 }}>{edu.startDate} - {edu.endDate}</Text>
                            </View>
                          ))}
                       </View>
                     ) : null}
                  </View>
               </View>
            </View>
            <View style={{ marginTop: 'auto', paddingTop: 20, borderTopWidth: 1, borderTopColor: '#f8fafc', alignItems: 'center' }}>
               <Text style={{ fontSize: baseSize(7), color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: 4 }}>ATS Optimized Structure v1</Text>
            </View>
          
<View style={{ padding: 12 }}>
{renderProjects()}{renderCertifications()}{renderAwards()}{renderAchievements()}{renderLanguages()}
</View>
</View>
        ) : templateId === 'template-ats-compliant-2' ? (
          <View style={{ flexDirection: 'column', flexGrow: 1, backgroundColor: '#ffffff', padding: 40 }}>
            <View style={{ flexGrow: 1 }}>
               {/* Header - Crimson & Slate */}
               <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', borderLeftWidth: 8, borderLeftColor: '#be123c', paddingLeft: 20, marginBottom: 40 }}>
                  <View>
                    <Text style={{ fontSize: baseSize(32), fontWeight: 900, color: '#0f172a', textTransform: 'uppercase' }}>{personalInfo.fullName || 'Your Name'}</Text>
                    <Text style={{ fontSize: baseSize(14), fontFamily: chosenFontBold, color: '#be123c', textTransform: 'uppercase', letterSpacing: 2, marginTop: 4 }}>{personalInfo.jobTitle}</Text>
                    <View style={{ flexDirection: 'row', gap: 15, marginTop: 15, fontSize: baseSize(8.5), fontFamily: chosenFontBold, color: '#94a3b8' }}>
                       {personalInfo.email ? <Text>{personalInfo.email}</Text> : null}
                       {personalInfo.phone ? <Text>{personalInfo.phone}</Text> : null}
                       {personalInfo.location ? <Text>{personalInfo.location}</Text> : null}
                    </View>
                  </View>
               </View>

               <View style={{ gap: 30 }}>
                  {personalInfo.bio ? (
                    <View style={{ marginBottom: 20 }}>
                       <Text style={{ alignSelf: 'flex-start', fontSize: baseSize(10), fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', letterSpacing: 2, backgroundColor: '#fff1f2', paddingHorizontal: 8, paddingVertical: 4, marginBottom: 10 }}>Profile Narrative</Text>
                       <Text style={{ fontSize: baseSize(10), color: '#475569', lineHeight: 1.5, fontWeight: 500 }}>{personalInfo.bio}</Text>
                    </View>
                  ) : null}

                  {experience && experience.length > 0 ? (
                    <View style={{ marginBottom: 20 }}>
                       <Text style={{ alignSelf: 'flex-start', fontSize: baseSize(10), fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', letterSpacing: 2, backgroundColor: '#fff1f2', paddingHorizontal: 8, paddingVertical: 4, marginBottom: 20 }}>Career Experience</Text>
                       <View style={{ borderLeftWidth: 1, borderLeftColor: '#f1f5f9', marginLeft: 15, paddingLeft: 20 }}>
                          {experience.map(exp => (
                            <View key={exp.id} style={{ marginBottom: 25, position: 'relative' }}>
                               <View style={{ position: 'absolute', left: -24, top: 4, width: 6, height: 6, borderRadius: 3, backgroundColor: '#be123c' }} />
                               <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 }}>
                                  <Text style={{ fontSize: baseSize(12), fontFamily: chosenFontBold, color: '#0f172a', textTransform: 'uppercase' }}>{exp.position}</Text>
                                  <View style={{ backgroundColor: '#0f172a', paddingHorizontal: 6, paddingVertical: 2 }}>
                                     <Text style={{ fontSize: baseSize(8), color: '#ffffff', fontWeight: 900 }}>{exp.startDate} - {exp.currentlyWorking ? 'NOW' : exp.endDate}</Text>
                                  </View>
                               </View>
                               <Text style={{ fontSize: baseSize(10), fontFamily: chosenFontBold, color: '#be123c', fontStyle: 'italic', textTransform: 'uppercase', marginBottom: 6 }}>{exp.company}</Text>
                               {exp.description ? <Text style={{ fontSize: baseSize(10), color: '#475569', lineHeight: 1.4 }}>{exp.description}</Text> : null}
                            </View>
                          ))}
                       </View>
                    </View>
                  ) : null}

                  <View style={{ flexDirection: 'row', gap: 40, marginTop: 10 }}>
                     <View style={{ flex: 1 }}>
                        {skills && skills.length > 0 ? (
                          <View>
                             <Text style={{ fontSize: baseSize(10), fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', letterSpacing: 2, borderBottomWidth: 2, borderBottomColor: '#be123c', paddingBottom: 4, marginBottom: 15 }}>Core Expertise</Text>
                             {skills.map(cat => (
                               <View key={cat.id} style={{ marginBottom: 10, borderLeftWidth: 2, borderLeftColor: '#fda4af', paddingLeft: 10 }}>
                                  <Text style={{ fontSize: baseSize(9), fontWeight: 900, color: '#1e293b', marginBottom: 2 }}>{cat.name}</Text>
                                  <Text style={{ fontSize: baseSize(9.5), color: '#64748b' }}>{cat.skills.join(' • ')}</Text>
                               </View>
                             ))}
                          </View>
                        ) : null}
                     </View>
                     <View style={{ flex: 1 }}>
                        {education && education.length > 0 ? (
                          <View>
                             <Text style={{ fontSize: baseSize(10), fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', letterSpacing: 2, borderBottomWidth: 2, borderBottomColor: '#be123c', paddingBottom: 4, marginBottom: 15 }}>Education</Text>
                             {education.map(edu => (
                               <View key={edu.id} style={{ marginBottom: 15, paddingLeft: 10 }}>
                                  <Text style={{ fontSize: baseSize(10), fontFamily: chosenFontBold, color: '#0f172a', textTransform: 'uppercase' }}>{edu.degree}</Text>
                                  <Text style={{ fontSize: baseSize(9), color: '#be123c', fontFamily: chosenFontBold, fontStyle: 'italic', marginTop: 2 }}>{edu.institution}</Text>
                                  <Text style={{ fontSize: baseSize(8), fontWeight: 900, color: '#cbd5e1', marginTop: 4 }}>{edu.startDate} — {edu.endDate}</Text>
                               </View>
                             ))}
                          </View>
                        ) : null}
                     </View>
                  </View>
               </View>
            </View>
            <View style={{ marginTop: 'auto', paddingTop: 20, alignItems: 'center' }}>
               <Text style={{ fontSize: baseSize(8), fontWeight: 900, color: '#ffe4e6', textTransform: 'uppercase', letterSpacing: 10, fontStyle: 'italic' }}>ATS Bold Format v2</Text>
            </View>
          
<View style={{ padding: 12 }}>
{renderProjects()}{renderCertifications()}{renderAwards()}{renderAchievements()}{renderLanguages()}
</View>
</View>
        ) : templateId === 'template-ats-compliant-3' ? (
          <View style={{ flexDirection: 'column', flexGrow: 1, backgroundColor: '#ffffff', padding: 50 }}>
            {/* Header - Amber & Forest */}
            <View style={{ backgroundColor: '#0f172a', padding: 30, borderRadius: 20, marginBottom: 40, position: 'relative' }}>
               <Text style={{ fontSize: baseSize(44), fontWeight: 900, color: '#ffffff', letterSpacing: -2, marginBottom: 10 }}>{personalInfo.fullName || 'Your Name'}</Text>
               <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
                  <Text style={{ fontSize: baseSize(14), fontFamily: chosenFontBold, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: 2 }}>{personalInfo.jobTitle}</Text>
                  <View style={{ width: 1, height: 12, backgroundColor: 'rgba(255,255,255,0.2)' }} />
                  <View style={{ flexDirection: 'row', gap: 15, fontSize: baseSize(9), fontFamily: chosenFontBold, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>
                     {personalInfo.location ? <Text>{personalInfo.location}</Text> : null}
                     {personalInfo.email ? <Text style={{ color: '#f59e0b' }}>{personalInfo.email}</Text> : null}
                  </View>
               </View>
            </View>

            <View style={{ gap: 40 }}>
               <View style={{ flexDirection: 'row', gap: 30 }}>
                  <Text style={{ width: 100, fontSize: baseSize(10), fontWeight: 900, color: '#d97706', textTransform: 'uppercase', letterSpacing: 3 }}>About Me</Text>
                  <View style={{ flex: 1, borderLeftWidth: 1, borderLeftColor: '#f1f5f9', paddingLeft: 25 }}>
                     <Text style={{ fontSize: baseSize(12), color: '#475569', lineHeight: 1.5, fontStyle: 'italic', fontFamily: 'serif' }}>{personalInfo.bio}</Text>
                  </View>
               </View>

               {experience && experience.length > 0 ? (
                 <View style={{ flexDirection: 'row', gap: 30 }}>
                    <Text style={{ width: 100, fontSize: baseSize(10), fontWeight: 900, color: '#d97706', textTransform: 'uppercase', letterSpacing: 3 }}>Expertise</Text>
                    <View style={{ flex: 1, gap: 30 }}>
                       {experience.map(exp => (
                         <View key={exp.id}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                               <Text style={{ fontSize: baseSize(16), fontFamily: chosenFontBold, color: '#0f172a' }}>{exp.position}</Text>
                               <View style={{ backgroundColor: '#ecfdf5', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4 }}>
                                  <Text style={{ fontSize: baseSize(9), fontWeight: 900, color: '#047857' }}>{exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}</Text>
                                </View>
                            </View>
                            <Text style={{ fontSize: baseSize(11), fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 }}>{exp.company}</Text>
                            <View style={{ borderLeftWidth: 2, borderLeftColor: '#fef3c7', paddingLeft: 15 }}>
                               <Text style={{ fontSize: baseSize(11), color: '#475569', lineHeight: 1.5 }}>{exp.description}</Text>
                            </View>
                         </View>
                       ))}
                    </View>
                 </View>
               ) : null}

               <View style={{ flexDirection: 'row', gap: 30 }}>
                  <Text style={{ width: 100, fontSize: baseSize(10), fontWeight: 900, color: '#d97706', textTransform: 'uppercase', letterSpacing: 3 }}>Knowledge</Text>
                  <View style={{ flex: 1, flexDirection: 'row', gap: 40 }}>
                     <View style={{ flex: 1 }}>
                        {skills && skills.length > 0 ? (
                           <View style={{ gap: 15 }}>
                              {skills.map(cat => (
                                 <View key={cat.id}>
                                    <Text style={{ fontSize: baseSize(9), fontWeight: 900, color: '#064e3b', textTransform: 'uppercase', fontStyle: 'italic', opacity: 0.5, marginBottom: 4 }}>{cat.name}</Text>
                                    <Text style={{ fontSize: baseSize(10.5), color: '#475569', fontWeight: 500 }}>{cat.skills.join(' / ')}</Text>
                                 </View>
                              ))}
                           </View>
                        ) : null}
                     </View>
                     <View style={{ flex: 1 }}>
                        {education && education.length > 0 ? (
                           <View style={{ gap: 20 }}>
                              {education.map(edu => (
                                 <View key={edu.id} style={{ borderLeftWidth: 4, borderLeftColor: '#10b981', paddingLeft: 15 }}>
                                    <Text style={{ fontSize: baseSize(11), fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', marginBottom: 4 }}>{edu.degree}</Text>
                                    <Text style={{ fontSize: baseSize(10), fontWeight: 900, color: '#d97706' }}>{edu.institution}</Text>
                                    <Text style={{ fontSize: baseSize(8), fontWeight: 900, color: '#cbd5e1', marginTop: 4 }}>{edu.startDate} — {edu.endDate}</Text>
                                 </View>
                              ))}
                           </View>
                        ) : null}
                     </View>
                  </View>
               </View>
            </View>
            <View style={{ marginTop: 'auto', paddingTop: 20, textAlign: 'right' }}>
               <Text style={{ fontSize: baseSize(9), fontWeight: 900, color: '#f1f5f9', textTransform: 'uppercase', letterSpacing: 8 }}>Earth Tone System v3</Text>
            </View>
          
<View style={{ padding: 12 }}>
{renderProjects()}{renderCertifications()}{renderAwards()}{renderAchievements()}{renderLanguages()}
</View>
</View>
        ) : templateId === 'template-ats-compliant-4' ? (
          <View style={{ flexDirection: 'column', flexGrow: 1, backgroundColor: '#f8fafc', padding: 40 }}>
             {/* Header - Violet & Amber */}
             <View style={{ marginBottom: 40, gap: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                   <Text style={{ fontSize: baseSize(44), fontWeight: 900, color: '#0f172a', letterSpacing: -2, borderBottomWidth: 8, borderBottomColor: '#7c3aed', paddingBottom: 10 }}>{personalInfo.fullName || 'Your Name'}</Text>
                   <View style={{ textAlign: 'right' }}>
                      <Text style={{ fontSize: baseSize(11), fontWeight: 900, color: '#7c3aed', textTransform: 'uppercase', letterSpacing: 4, marginBottom: 4 }}>{personalInfo.jobTitle}</Text>
                      <View style={{ alignSelf: 'flex-end', width: 60, height: 4, backgroundColor: '#fbbf24' }} />
                   </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ffffff', padding: 12, borderRadius: 12, borderWeight: 1, borderColor: '#f1f5f9' }}>
                   {personalInfo.email ? <Text style={{ fontSize: baseSize(9), fontWeight: 900, color: '#7c3aed', borderRightWidth: 1, borderRightColor: '#f1f5f9', paddingRight: 15 }}>{personalInfo.email}</Text> : null}
                   {personalInfo.phone ? <Text style={{ fontSize: baseSize(9), fontWeight: 900, color: '#64748b', borderRightWidth: 1, borderRightColor: '#f1f5f9', paddingRight: 15 }}>{personalInfo.phone}</Text> : null}
                   {personalInfo.location ? <Text style={{ fontSize: baseSize(9), fontWeight: 900, color: '#64748b' }}>{personalInfo.location}</Text> : null}
                </View>
             </View>

             <View style={{ gap: 40 }}>
                {personalInfo.bio ? (
                  <View style={{ backgroundColor: '#7c3aed', padding: 25, borderRadius: 20 }}>
                     <Text style={{ fontSize: baseSize(8), fontWeight: 900, color: '#fbbf24', textTransform: 'uppercase', letterSpacing: 4, marginBottom: 10 }}>Executive Summary</Text>
                     <Text style={{ fontSize: baseSize(11.5), color: '#ffffff', lineHeight: 1.5, fontWeight: 500 }}>{personalInfo.bio}</Text>
                  </View>
                ) : null}

                {experience && experience.length > 0 ? (
                  <View style={{ gap: 20 }}>
                     <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                        <Text style={{ fontSize: baseSize(11), fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', letterSpacing: 2 }}>Professional Trajectory</Text>
                        <View style={{ flex: 1, height: 2, backgroundColor: 'rgba(15,23,42,0.05)', borderRadius: 1 }} />
                     </View>
                     <View style={{ gap: 30 }}>
                        {experience.map(exp => (
                           <View key={exp.id}>
                              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                                 <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                                    <View style={{ width: 30, height: 2, backgroundColor: '#fbbf24' }} />
                                    <Text style={{ fontSize: baseSize(14), fontWeight: 900, color: '#0f172a', textTransform: 'uppercase' }}>{exp.position}</Text>
                                 </View>
                                 <Text style={{ fontSize: baseSize(9), fontWeight: 900, color: '#7c3aed', backgroundColor: '#f5f3ff', paddingHorizontal: 10, paddingVertical: 3, borderRadius: 20 }}>{exp.startDate} – {exp.currentlyWorking ? 'PRESENT' : exp.endDate}</Text>
                              </View>
                              <Text style={{ fontSize: baseSize(11), fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 2, paddingLeft: 45, marginBottom: 8 }}>{exp.company}</Text>
                              <View style={{ paddingLeft: 45 }}>
                                 <Text style={{ fontSize: baseSize(11), color: '#475569', lineHeight: 1.5, borderRightWidth: 3, borderRightColor: '#f5f3ff', paddingRight: 20, fontStyle: 'italic' }}>{exp.description}</Text>
                              </View>
                           </View>
                        ))}
                     </View>
                  </View>
                ) : null}

                <View style={{ flexDirection: 'row', gap: 40 }}>
                   <View style={{ flex: 1 }}>
                      {skills && skills.length > 0 ? (
                        <View style={{ gap: 15 }}>
                           <Text style={{ fontSize: baseSize(10), fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 2, borderBottomWidth: 1, borderBottomColor: '#f1f5f9', paddingBottom: 5 }}>Technical Core</Text>
                           {skills.map(cat => (
                              <View key={cat.id} style={{ gap: 5 }}>
                                 <Text style={{ fontSize: baseSize(8), fontWeight: 900, color: '#7c3aed', textTransform: 'uppercase', opacity: 0.6 }}>{cat.name}</Text>
                                 <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
                                    {cat.skills.map((s, i) => (
                                       <View key={i} style={{ backgroundColor: '#ffffff', borderWeight: 1, borderColor: '#e2e8f0', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4 }}>
                                          <Text style={{ fontSize: baseSize(9), fontWeight: 900, color: '#64748b' }}>{s}</Text>
                                       </View>
                                    ))}
                                 </View>
                              </View>
                           ))}
                        </View>
                      ) : null}
                   </View>
                   <View style={{ width: 200 }}>
                      {education && education.length > 0 ? (
                        <View style={{ gap: 15 }}>
                           <Text style={{ fontSize: baseSize(10), fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 2, borderBottomWidth: 1, borderBottomColor: '#f1f5f9', paddingBottom: 5 }}>Academic</Text>
                           {education.map(edu => (
                              <View key={edu.id} style={{ backgroundColor: '#ffffff', padding: 15, borderRadius: 12, borderWeight: 1, borderColor: '#f1f5f9' }}>
                                 <Text style={{ fontSize: baseSize(10), fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', marginBottom: 4 }}>{edu.degree}</Text>
                                 <Text style={{ fontSize: baseSize(9), fontWeight: 900, color: '#7c3aed', fontStyle: 'italic', marginBottom: 8 }}>{edu.institution}</Text>
                                 <Text style={{ fontSize: baseSize(8), fontWeight: 900, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: 1 }}>{edu.startDate} - {edu.endDate}</Text>
                              </View>
                           ))}
                        </View>
                      ) : null}
                   </View>
                </View>
             </View>
             <View style={{ marginTop: 'auto', paddingTop: 30, alignItems: 'center' }}>
                <Text style={{ fontSize: baseSize(8), fontWeight: 900, color: '#e2e8f0', textTransform: 'uppercase', letterSpacing: 10 }}>Vibrant ATS Stack v4</Text>
             </View>
          
<View style={{ padding: 12 }}>
{renderProjects()}{renderCertifications()}{renderAwards()}{renderAchievements()}{renderLanguages()}
</View>
</View>
        ) : templateId === 'template-ats-compliant-5' ? (
          <View style={{ flexDirection: 'column', flexGrow: 1, backgroundColor: '#ffffff', padding: 40 }}>
             {/* Header - Emerald & Navy */}
             <View style={{ flexDirection: 'row', backgroundColor: '#f8fafc', padding: 25, borderRadius: 15, borderWeight: 2, borderColor: '#f1f5f9', marginBottom: 40, position: 'relative' }}>
                <View style={{ position: 'absolute', top: 0, left: 30, width: 25, height: 2, backgroundColor: '#10b981' }} />
                <View style={{ flex: 1 }}>
                   <Text style={{ fontSize: baseSize(32), fontWeight: 900, color: '#0f172a', letterSpacing: -1 }}>{personalInfo.fullName || 'Your Name'}</Text>
                   <Text style={{ fontSize: baseSize(14), fontWeight: 900, color: '#10b981', textTransform: 'uppercase', letterSpacing: 3, marginTop: 4 }}>{personalInfo.jobTitle}</Text>
                </View>
                <View style={{ width: 140, paddingLeft: 20, borderLeftWidth: 2, borderLeftColor: '#e2e8f0', gap: 5 }}>
                   {personalInfo.email ? <Text style={{ fontSize: baseSize(8.5), fontWeight: 900, color: '#0f172a' }}>{personalInfo.email}</Text> : null}
                   {personalInfo.phone ? <Text style={{ fontSize: baseSize(8.5), fontWeight: 900, color: '#94a3b8' }}>{personalInfo.phone}</Text> : null}
                   {personalInfo.location ? <Text style={{ fontSize: baseSize(8), fontWeight: 900, color: '#10b981', textTransform: 'uppercase' }}>{personalInfo.location}</Text> : null}
                </View>
             </View>

             <View style={{ gap: 40 }}>
                {personalInfo.bio ? (
                  <View style={{ gap: 15 }}>
                     <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <Text style={{ fontSize: baseSize(10), fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', letterSpacing: 2 }}>Executive Summary</Text>
                        <View style={{ flex: 1, height: 1, backgroundColor: '#f1f5f9' }} />
                     </View>
                     <View style={{ backgroundColor: '#ecfdf5', padding: 20, borderRadius: 12, borderWeight: 1, borderColor: '#d1fae5' }}>
                        <Text style={{ fontSize: baseSize(10.5), color: '#334155', lineHeight: 1.5, fontWeight: 500, fontStyle: 'italic' }}>{personalInfo.bio}</Text>
                     </View>
                  </View>
                ) : null}

                {experience && experience.length > 0 ? (
                  <View style={{ gap: 25 }}>
                     <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <Text style={{ fontSize: baseSize(10), fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', letterSpacing: 2 }}>Professional Milestone</Text>
                        <View style={{ flex: 1, height: 1, backgroundColor: '#f1f5f9' }} />
                     </View>
                     <View style={{ gap: 30 }}>
                        {experience.map(exp => (
                           <View key={exp.id} style={{ flexDirection: 'row', gap: 30 }}>
                              <View style={{ width: 120 }}>
                                 <Text style={{ fontSize: baseSize(11), fontWeight: 900, color: '#0f172a' }}>{exp.startDate} - {exp.currentlyWorking ? 'NOW' : exp.endDate}</Text>
                                 <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 }}>
                                    <View style={{ width: 10, height: 2, backgroundColor: '#10b981' }} />
                                    <Text style={{ fontSize: baseSize(8), fontWeight: 900, color: '#cbd5e1', textTransform: 'uppercase' }}>Chronology</Text>
                                 </View>
                              </View>
                              <View style={{ flex: 1 }}>
                                 <Text style={{ fontSize: baseSize(16), fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', letterSpacing: -0.5 }}>{exp.position}</Text>
                                 <Text style={{ fontSize: baseSize(11), fontWeight: 900, color: '#10b981', fontStyle: 'italic', marginVertical: 4 }}>{exp.company}</Text>
                                 <Text style={{ fontSize: baseSize(11), color: '#475569', lineHeight: 1.4 }}>{exp.description}</Text>
                              </View>
                           </View>
                        ))}
                     </View>
                  </View>
                ) : null}

                <View style={{ flexDirection: 'row', gap: 40, borderTopWidth: 1, borderTopColor: '#f1f5f9', paddingTop: 25 }}>
                   <View style={{ flex: 1 }}>
                      {skills && skills.length > 0 ? (
                        <View style={{ gap: 20 }}>
                           <Text style={{ fontSize: baseSize(9), fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', letterSpacing: 3 }}>Integrated Stack</Text>
                           <View style={{ gap: 12 }}>
                              {skills.map(cat => (
                                 <View key={cat.id}>
                                    <Text style={{ fontSize: baseSize(8), fontWeight: 900, color: '#cbd5e1', textTransform: 'uppercase', marginBottom: 2 }}>{cat.name}</Text>
                                    <Text style={{ fontSize: baseSize(11), fontWeight: 900, color: '#1e293b' }}>{cat.skills.join(' • ')}</Text>
                                 </View>
                              ))}
                           </View>
                        </View>
                      ) : null}
                   </View>
                   <View style={{ flex: 1 }}>
                      {education && education.length > 0 ? (
                        <View style={{ gap: 20 }}>
                           <Text style={{ fontSize: baseSize(9), fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', letterSpacing: 3 }}>Qualifications</Text>
                           <View style={{ gap: 20 }}>
                              {education.map(edu => (
                                 <View key={edu.id} style={{ position: 'relative', paddingLeft: 15, borderLeftWidth: 2, borderLeftColor: '#10b981' }}>
                                    <View style={{ position: 'absolute', left: -5, top: 0, width: 8, height: 8, borderRadius: 4, backgroundColor: '#0f172a' }} />
                                    <Text style={{ fontSize: baseSize(11), fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', marginBottom: 2 }}>{edu.degree}</Text>
                                    <Text style={{ fontSize: baseSize(10), fontWeight: 900, color: '#10b981', fontStyle: 'italic' }}>{edu.institution}</Text>
                                    <Text style={{ fontSize: baseSize(8), fontWeight: 900, color: '#cbd5e1', marginTop: 4 }}>{edu.startDate} — {edu.endDate}</Text>
                                 </View>
                              ))}
                           </View>
                        </View>
                      ) : null}
                   </View>
                </View>
             </View>

             <View style={{ marginTop: 'auto', backgroundColor: '#0f172a', padding: 15, borderRadius: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: baseSize(8), fontWeight: 900, color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', letterSpacing: 5 }}>Modern Professional ATS v5</Text>
                <View style={{ flexDirection: 'row', gap: 4 }}>
                   <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: '#10b981' }} />
                   <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: 'rgba(16,185,129,0.5)' }} />
                   <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: 'rgba(16,185,129,0.2)' }} />
                </View>
             </View>
          
<View style={{ padding: 12 }}>
{renderProjects()}{renderCertifications()}{renderAwards()}{renderAchievements()}{renderLanguages()}
</View>
</View>
        ) : templateId === 'template-ats-compliant-6' ? (
          <View style={{ flexDirection: 'column', flexGrow: 1, backgroundColor: '#fcfdfe', padding: 40 }}>
             {/* Header - Sky Blue & Charcoal */}
             <View style={{ borderLeftWidth: 12, borderLeftColor: '#0ea5e9', paddingLeft: 30, paddingVertical: 20, backgroundColor: '#0f172a', borderTopRightRadius: 20, borderBottomRightRadius: 20, marginBottom: 30 }}>
                <Text style={{ fontSize: baseSize(32), fontWeight: 900, color: '#ffffff', textTransform: 'uppercase' }}>{personalInfo.fullName || 'Your Name'}</Text>
                <Text style={{ fontSize: baseSize(14), fontFamily: chosenFontBold, color: '#38bdf8', marginTop: 5, textTransform: 'uppercase', letterSpacing: 2 }}>{personalInfo.jobTitle}</Text>
                <View style={{ marginTop: 15, flexDirection: 'row', flexWrap: 'wrap', gap: 20, fontSize: baseSize(9), color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 1 }}>
                   {personalInfo.email ? <Text style={{ color: '#bae6fd' }}>{personalInfo.email}</Text> : null}
                   {personalInfo.phone ? <Text>{personalInfo.phone}</Text> : null}
                   {personalInfo.location ? <Text>{personalInfo.location}</Text> : null}
                </View>
             </View>

             <View style={{ gap: 30 }}>
                {personalInfo.bio ? (
                   <View style={{ gap: 10 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                         <Text style={{ fontSize: baseSize(10), fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', letterSpacing: 3 }}>Core Narrative</Text>
                         <View style={{ flex: 1, height: 1, backgroundColor: '#f1f5f9' }} />
                      </View>
                      <View style={{ borderLeftWidth: 4, borderLeftColor: '#e0f2fe', paddingLeft: 20, paddingVertical: 5, backgroundColor: 'rgba(240,249,255,0.2)' }}>
                         <Text style={{ fontSize: baseSize(10), color: '#475569', lineHeight: 1.5, fontStyle: 'italic' }}>{personalInfo.bio}</Text>
                      </View>
                   </View>
                ) : null}

                {experience && experience.length > 0 ? (
                   <View style={{ gap: 20 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                         <Text style={{ fontSize: baseSize(10), fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', letterSpacing: 3 }}>Carrier History</Text>
                         <View style={{ flex: 1, height: 1, backgroundColor: '#f1f5f9' }} />
                      </View>
                      <View style={{ gap: 25 }}>
                         {experience.map(exp => (
                            <View key={exp.id} style={{ flexDirection: 'row', gap: 30 }}>
                               <View style={{ width: 140, gap: 5 }}>
                                  <Text style={{ fontSize: baseSize(11), fontWeight: 900, color: '#0f172a' }}>{exp.startDate} - {exp.currentlyWorking ? 'PRESENT' : exp.endDate}</Text>
                                  <View style={{ height: 4, width: 30, backgroundColor: '#0ea5e9', borderRadius: 2 }} />
                               </View>
                               <View style={{ flex: 1, gap: 5 }}>
                                  <Text style={{ fontSize: baseSize(14), fontWeight: 900, color: '#0f172a', textTransform: 'uppercase' }}>{exp.position}</Text>
                                  <Text style={{ fontSize: baseSize(10), fontFamily: chosenFontBold, color: '#0284c7', fontStyle: 'italic' }}>{exp.company}</Text>
                                  <Text style={{ fontSize: baseSize(10), color: '#475569', lineHeight: 1.4, marginTop: 5 }}>{exp.description}</Text>
                               </View>
                            </View>
                         ))}
                      </View>
                   </View>
                ) : null}

                <View style={{ flexDirection: 'row', gap: 40, paddingTop: 10 }}>
                   <View style={{ flex: 1, gap: 20 }}>
                      <Text style={{ fontSize: baseSize(10), fontWeight: 900, textTransform: 'uppercase', letterSpacing: 4, borderBottomWidth: 2, borderBottomColor: '#0f172a', paddingBottom: 5 }}>Technical Arsenal</Text>
                      <View style={{ gap: 15 }}>
                         {skills && skills.map(cat => (
                            <View key={cat.id} style={{ gap: 4 }}>
                               <Text style={{ fontSize: baseSize(8), fontWeight: 900, color: '#0284c7', textTransform: 'uppercase' }}>{cat.name}</Text>
                               <Text style={{ fontSize: baseSize(9.5), color: '#334155', fontWeight: 900, borderLeftWidth: 2, borderLeftColor: '#e0f2fe', paddingLeft: 8 }}>{cat.skills.join(' / ')}</Text>
                            </View>
                         ))}
                      </View>
                   </View>
                   <View style={{ width: 220, gap: 20 }}>
                      <Text style={{ fontSize: baseSize(10), fontWeight: 900, textTransform: 'uppercase', letterSpacing: 4, borderBottomWidth: 2, borderBottomColor: '#0f172a', paddingBottom: 5 }}>Qualifications</Text>
                      <View style={{ gap: 15 }}>
                         {education && education.map(edu => (
                            <View key={edu.id} style={{ gap: 3 }}>
                               <Text style={{ fontSize: baseSize(10), fontWeight: 900, color: '#0f172a', textTransform: 'uppercase' }}>{edu.degree}</Text>
                               <Text style={{ fontSize: baseSize(9), color: '#0284c7', fontStyle: 'italic' }}>{edu.institution}</Text>
                               <Text style={{ fontSize: baseSize(8), color: '#94a3b8', textTransform: 'uppercase', marginTop: 2 }}>{edu.startDate} — {edu.endDate}</Text>
                            </View>
                         ))}
                      </View>
                   </View>
                </View>
             </View>

             <View style={{ marginTop: 'auto', paddingTop: 20, borderTopWidth: 1, borderTopColor: '#f1f5f9', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <View style={{ gap: 2 }}>
                   <Text style={{ fontSize: baseSize(8), fontWeight: 900, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: 4 }}>Sky Blue System v6</Text>
                   <Text style={{ fontSize: baseSize(6), color: '#e2e8f0', textTransform: 'uppercase' }}>ATS Compliant Structure</Text>
                </View>
                <View style={{ width: 24, height: 24, borderRadius: 12, borderWeight: 3, borderColor: '#0ea5e9', alignItems: 'center', justifyContent: 'center' }}>
                   <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#0f172a' }} />
                </View>
             </View>
          
<View style={{ padding: 12 }}>
{renderProjects()}{renderCertifications()}{renderAwards()}{renderAchievements()}{renderLanguages()}
</View>
</View>
        ) : templateId === 'template-ats-compliant-7' ? (
          <View style={{ flexDirection: 'column', flexGrow: 1, backgroundColor: '#ffffff', padding: 45 }}>
             {/* Header - Lavender & Gold */}
             <View style={{ position: 'relative', borderBottomWidth: 6, borderBottomColor: '#2e1065', paddingBottom: 30, marginBottom: 40 }}>
                <View style={{ gap: 10 }}>
                   <Text style={{ fontSize: baseSize(38), fontWeight: 900, color: '#2e1065' }}>{personalInfo.fullName || 'Your Name'}</Text>
                   <Text style={{ fontSize: baseSize(16), fontWeight: 900, color: '#d97706', textTransform: 'uppercase', letterSpacing: 4, fontStyle: 'italic' }}>{personalInfo.jobTitle}</Text>
                </View>
                <View style={{ marginTop: 20, flexDirection: 'row', flexWrap: 'wrap', gap: 15, fontSize: baseSize(9), fontWeight: 900, textTransform: 'uppercase', color: '#94a3b8' }}>
                   {personalInfo.email ? <Text style={{ backgroundColor: '#f5f3ff', color: '#6d28d9', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 }}>{personalInfo.email}</Text> : null}
                   {personalInfo.phone ? <Text style={{ backgroundColor: '#f8fafc', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 }}>{personalInfo.phone}</Text> : null}
                   {personalInfo.location ? <Text style={{ backgroundColor: '#f8fafc', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 }}>{personalInfo.location}</Text> : null}
                </View>
             </View>

             <View style={{ gap: 40 }}>
                {personalInfo.bio ? (
                   <View style={{ flexDirection: 'row', gap: 30 }}>
                      <Text style={{ width: 80, fontSize: baseSize(9), fontWeight: 900, color: '#2e1065', textTransform: 'uppercase', letterSpacing: 4 }}>About</Text>
                      <View style={{ flex: 1, backgroundColor: '#f5f3ff', padding: 20, borderRadius: 15, borderWeight: 1, borderColor: '#ede9fe' }}>
                         <Text style={{ fontSize: baseSize(10.5), color: '#475569', lineHeight: 1.5, fontStyle: 'italic', textAlign: 'justify' }}>{personalInfo.bio}</Text>
                      </View>
                   </View>
                ) : null}

                {experience && experience.length > 0 ? (
                   <View style={{ flexDirection: 'row', gap: 30 }}>
                      <Text style={{ width: 80, fontSize: baseSize(9), fontWeight: 900, color: '#2e1065', textTransform: 'uppercase', letterSpacing: 4 }}>Journey</Text>
                      <View style={{ flex: 1, gap: 30 }}>
                         {experience.map(exp => (
                            <View key={exp.id} style={{ position: 'relative', borderLeftWidth: 3, borderLeftColor: '#fef3c7', paddingLeft: 25 }}>
                               <View style={{ position: 'absolute', left: -7, top: 0, width: 12, height: 12, borderRadius: 6, backgroundColor: '#2e1065', borderWeight: 3, borderColor: '#ffffff' }} />
                               <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 5 }}>
                                  <Text style={{ fontSize: baseSize(16), fontWeight: 900, color: '#0f172a' }}>{exp.position}</Text>
                                  <Text style={{ fontSize: baseSize(9), fontWeight: 900, color: '#d97706' }}>{exp.startDate} - {exp.currentlyWorking ? 'NOW' : exp.endDate}</Text>
                               </View>
                               <Text style={{ fontSize: baseSize(10), fontWeight: 900, color: '#6d28d9', textTransform: 'uppercase', marginBottom: 8, fontStyle: 'italic' }}>{exp.company}</Text>
                               <Text style={{ fontSize: baseSize(10.5), color: '#475569', lineHeight: 1.4 }}>{exp.description}</Text>
                            </View>
                         ))}
                      </View>
                   </View>
                ) : null}

                <View style={{ flexDirection: 'row', gap: 40 }}>
                   <View style={{ flex: 1, gap: 20 }}>
                      <Text style={{ fontSize: baseSize(10), fontWeight: 900, color: '#2e1065', textTransform: 'uppercase', letterSpacing: 4, borderBottomWidth: 1, borderBottomColor: '#f5f3ff', paddingBottom: 5 }}>Skills</Text>
                      <View style={{ gap: 12 }}>
                         {skills && skills.map(cat => (
                            <View key={cat.id} style={{ gap: 5 }}>
                               <Text style={{ fontSize: baseSize(8), fontWeight: 900, color: '#d97706', textTransform: 'uppercase' }}>{cat.name}</Text>
                               <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                                  {cat.skills.map((s, i) => (
                                     <Text key={i} style={{ fontSize: baseSize(9), fontWeight: 900, color: '#0f172a', borderBottomWidth: 1, borderBottomColor: '#ede9fe', paddingBottom: 2 }}>{s}</Text>
                                  ))}
                               </View>
                            </View>
                         ))}
                      </View>
                   </View>
                   <View style={{ flex: 1, gap: 20 }}>
                      <Text style={{ fontSize: baseSize(10), fontWeight: 900, color: '#2e1065', textTransform: 'uppercase', letterSpacing: 4, borderBottomWidth: 1, borderBottomColor: '#f5f3ff', paddingBottom: 5 }}>Academic</Text>
                      <View style={{ gap: 15 }}>
                         {education && education.map(edu => (
                            <View key={edu.id} style={{ backgroundColor: '#f8fafc', padding: 15, borderRadius: 12, gap: 4 }}>
                               <Text style={{ fontSize: baseSize(10.5), fontWeight: 900, color: '#0f172a' }}>{edu.degree}</Text>
                               <Text style={{ fontSize: baseSize(9.5), fontWeight: 900, color: '#6d28d9', fontStyle: 'italic' }}>{edu.institution}</Text>
                               <Text style={{ fontSize: baseSize(8), color: '#94a3b8', textTransform: 'uppercase', marginTop: 2 }}>{edu.startDate} - {edu.endDate}</Text>
                            </View>
                         ))}
                      </View>
                   </View>
                </View>
             </View>

             <View style={{ marginTop: 'auto', backgroundColor: '#2e1065', padding: 20, borderRadius: 25, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: baseSize(9), fontWeight: 900, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: 8, fontStyle: 'italic' }}>Lavender Strategic v7</Text>
                <View style={{ width: 30, height: 4, backgroundColor: '#fbbf24', borderRadius: 2 }} />
             </View>
          
<View style={{ padding: 12 }}>
{renderProjects()}{renderCertifications()}{renderAwards()}{renderAchievements()}{renderLanguages()}
</View>
</View>
        ) : templateId === 'template-ats-compliant-8' ? (
          <View style={{ flexDirection: 'column', flexGrow: 1, backgroundColor: '#fdfaf8', padding: 50 }}>
             {/* Header - Warm Orange & Navy */}
             <View style={{ gap: 30, marginBottom: 40 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                   <Text style={{ fontSize: baseSize(44), fontWeight: 900, color: '#0f172a' }}>{personalInfo.fullName || 'Your Name'}</Text>
                   <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#f97316' }} />
                </View>
                <View style={{ borderTopWidth: 2, borderTopColor: '#0f172a', paddingTop: 20, flexDirection: 'row', alignItems: 'center', gap: 30 }}>
                   <Text style={{ fontSize: baseSize(16), fontWeight: 900, color: '#ea580c', textTransform: 'uppercase', letterSpacing: 3, fontStyle: 'italic' }}>{personalInfo.jobTitle}</Text>
                   <View style={{ flex: 1, height: 1, backgroundColor: '#e2e8f0' }} />
                   <View style={{ flexDirection: 'row', gap: 20, fontSize: baseSize(9), fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase' }}>
                      {personalInfo.email ? <Text>{personalInfo.email}</Text> : null}
                      {personalInfo.location ? <Text>{personalInfo.location}</Text> : null}
                   </View>
                </View>
             </View>

             <View style={{ gap: 45 }}>
                {personalInfo.bio ? (
                   <View style={{ gap: 15 }}>
                      <Text style={{ fontSize: baseSize(8), fontWeight: 900, color: '#ea580c', textTransform: 'uppercase', letterSpacing: 6 }}>Perspective</Text>
                      <Text style={{ fontSize: baseSize(12), color: '#334155', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1.5, textAlign: 'justify' }}>{personalInfo.bio}</Text>
                   </View>
                ) : null}

                {experience && experience.length > 0 ? (
                   <View style={{ gap: 25 }}>
                      <Text style={{ fontSize: baseSize(8), fontWeight: 900, color: '#ea580c', textTransform: 'uppercase', letterSpacing: 6 }}>Trajectory</Text>
                      <View style={{ gap: 35 }}>
                         {experience.map(exp => (
                            <View key={exp.id} style={{ flexDirection: 'row', gap: 30 }}>
                               <View style={{ width: 100, gap: 5 }}>
                                  <Text style={{ fontSize: baseSize(14), fontWeight: 900, color: '#0f172a' }}>{exp.startDate}</Text>
                                  <Text style={{ fontSize: baseSize(8), color: '#cbd5e1', fontWeight: 900, textTransform: 'uppercase' }}>To {exp.currentlyWorking ? 'Present' : exp.endDate}</Text>
                               </View>
                               <View style={{ flex: 1, gap: 10 }}>
                                  <View style={{ gap: 4 }}>
                                     <Text style={{ fontSize: baseSize(20), fontWeight: 900, color: '#0f172a' }}>{exp.position}</Text>
                                     <Text style={{ fontSize: baseSize(11), fontWeight: 900, color: '#ea580c', textTransform: 'uppercase', letterSpacing: 2 }}>{exp.company}</Text>
                                  </View>
                                  <View style={{ borderLeftWidth: 10, borderLeftColor: '#0f172a', paddingLeft: 20, paddingVertical: 10, backgroundColor: '#ffffff' }}>
                                     <Text style={{ fontSize: baseSize(11), color: '#475569', lineHeight: 1.5 }}>{exp.description}</Text>
                                  </View>
                               </View>
                            </View>
                         ))}
                      </View>
                   </View>
                ) : null}

                <View style={{ flexDirection: 'row', gap: 60 }}>
                   <View style={{ flex: 1, gap: 20 }}>
                      <Text style={{ fontSize: baseSize(8), fontWeight: 900, color: '#ea580c', textTransform: 'uppercase', letterSpacing: 6 }}>Compentencies</Text>
                      <View style={{ gap: 20 }}>
                         {skills && skills.map(cat => (
                            <View key={cat.id} style={{ gap: 8 }}>
                               <View style={{ borderBottomWidth: 1, borderBottomColor: '#f1f5f9', paddingBottom: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                                  <Text style={{ fontSize: baseSize(9), fontWeight: 900, color: '#cbd5e1', textTransform: 'uppercase' }}>{cat.name}</Text>
                               </View>
                               <Text style={{ fontSize: baseSize(12), color: '#0f172a', fontWeight: 900, textTransform: 'uppercase' }}>{cat.skills.join(' / ')}</Text>
                            </View>
                         ))}
                      </View>
                   </View>
                   <View style={{ width: 220, backgroundColor: '#0f172a', padding: 25, borderRadius: 30, gap: 20 }}>
                      <Text style={{ fontSize: baseSize(8), fontWeight: 900, color: '#fb923c', textTransform: 'uppercase', letterSpacing: 4 }}>Academic Records</Text>
                      <View style={{ gap: 20 }}>
                         {education && education.map(edu => (
                            <View key={edu.id} style={{ gap: 5 }}>
                               <Text style={{ fontSize: baseSize(12), fontWeight: 900, color: '#ffffff', textTransform: 'uppercase', borderLeftWidth: 2, borderLeftColor: '#f97316', paddingLeft: 10 }}>{edu.degree}</Text>
                               <View style={{ paddingLeft: 10 }}>
                                  <Text style={{ fontSize: baseSize(9), fontWeight: 900, color: '#fb923c' }}>{edu.institution}</Text>
                                  <Text style={{ fontSize: baseSize(7), fontWeight: 900, color: '#475569', textTransform: 'uppercase', marginTop: 3 }}>{edu.startDate} - {edu.endDate}</Text>
                               </View>
                            </View>
                         ))}
                      </View>
                   </View>
                </View>
             </View>

             <View style={{ marginTop: 'auto', borderTopWidth: 1, borderTopColor: '#f1f5f9', paddingVertical: 15, alignItems: 'center' }}>
                <Text style={{ fontSize: baseSize(9), fontWeight: 900, color: '#e2e8f0', textTransform: 'uppercase', letterSpacing: 10 }}>Dynamic Orange v8</Text>
             </View>
          
<View style={{ padding: 12 }}>
{renderProjects()}{renderCertifications()}{renderAwards()}{renderAchievements()}{renderLanguages()}
</View>
</View>
        ) : templateId === 'template-ats-compliant-9' ? (
          <View style={{ flexDirection: 'column', flexGrow: 1, backgroundColor: '#ffffff', padding: 40 }}>
             {/* Header - Mint & Navy */}
             <View style={{ flexDirection: 'row', gap: 30, borderBottomWidth: 15, borderBottomColor: '#10b981', paddingBottom: 40, marginBottom: 40 }}>
                <View style={{ width: 120, height: 120, backgroundColor: '#0f172a', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                   <Text style={{ fontSize: baseSize(60), fontWeight: 900, color: '#ffffff' }}>{personalInfo.fullName ? personalInfo.fullName.charAt(0) : 'Y'}</Text>
                </View>
                <View style={{ flex: 1, gap: 10, paddingTop: 10 }}>
                   <Text style={{ fontSize: baseSize(36), fontWeight: 900, color: '#0f172a', textTransform: 'uppercase' }}>{personalInfo.fullName || 'Your Name'}</Text>
                   <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                      <Text style={{ fontSize: baseSize(14), fontWeight: 900, color: '#059669', textTransform: 'uppercase', letterSpacing: 4 }}>{personalInfo.jobTitle}</Text>
                      <View style={{ flex: 1, height: 1, backgroundColor: '#f1f5f9' }} />
                   </View>
                   <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 20, fontSize: baseSize(9), fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1 }}>
                      {personalInfo.email ? <Text style={{ color: '#10b981' }}>{personalInfo.email}</Text> : null}
                      {personalInfo.phone ? <Text>{personalInfo.phone}</Text> : null}
                      {personalInfo.location ? <Text>{personalInfo.location}</Text> : null}
                   </View>
                </View>
             </View>

             <View style={{ gap: 40 }}>
                {personalInfo.bio ? (
                   <View style={{ gap: 15 }}>
                      <Text style={{ fontSize: baseSize(9), fontWeight: 900, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: 4 }}>Executive Charter</Text>
                      <View style={{ borderLeftWidth: 6, borderLeftColor: '#10b981', paddingLeft: 25, paddingVertical: 10 }}>
                         <Text style={{ fontSize: baseSize(11), fontWeight: 900, color: '#334155', lineHeight: 1.5 }}>{personalInfo.bio}</Text>
                      </View>
                   </View>
                ) : null}

                <View style={{ flexDirection: 'row', gap: 40 }}>
                   <View style={{ flex: 1, gap: 30 }}>
                      <Text style={{ fontSize: baseSize(9), fontWeight: 900, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: 4 }}>Engagement Record</Text>
                      <View style={{ gap: 40 }}>
                         {experience && experience.map(exp => (
                            <View key={exp.id} style={{ gap: 10 }}>
                               <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                  <Text style={{ fontSize: baseSize(18), fontWeight: 900, color: '#0f172a', textTransform: 'uppercase' }}>{exp.position}</Text>
                                  <Text style={{ fontSize: baseSize(8), fontWeight: 900, color: '#059669', backgroundColor: '#ecfdf5', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4 }}>{exp.startDate} - {exp.endDate}</Text>
                               </View>
                               <Text style={{ fontSize: baseSize(11), fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 2 }}>{exp.company}</Text>
                               <Text style={{ fontSize: baseSize(10.5), color: '#475569', lineHeight: 1.4, borderBottomWidth: 1, borderBottomColor: '#f8fafc', paddingBottom: 20 }}>{exp.description}</Text>
                            </View>
                         ))}
                      </View>
                   </View>
                   <View style={{ width: 200, gap: 30 }}>
                      <View style={{ gap: 15 }}>
                         <Text style={{ fontSize: baseSize(9), fontWeight: 900, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: 4 }}>Technical Unit</Text>
                         <View style={{ gap: 12 }}>
                            {skills && skills.map(cat => (
                               <View key={cat.id} style={{ backgroundColor: '#f8fafc', padding: 15, borderRadius: 8, gap: 6 }}>
                                  <Text style={{ fontSize: baseSize(8), fontWeight: 900, color: '#059669', textTransform: 'uppercase' }}>{cat.name}</Text>
                                  <Text style={{ fontSize: baseSize(9), fontWeight: 900, color: '#1e293b' }}>{cat.skills.join(' / ')}</Text>
                               </View>
                            ))}
                         </View>
                      </View>
                      <View style={{ gap: 15 }}>
                         <Text style={{ fontSize: baseSize(9), fontWeight: 900, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: 4 }}>Credentials</Text>
                         <View style={{ gap: 15 }}>
                            {education && education.map(edu => (
                               <View key={edu.id} style={{ borderTopWidth: 2, borderTopColor: '#10b981', paddingTop: 10, gap: 5 }}>
                                  <Text style={{ fontSize: baseSize(11), fontWeight: 900, color: '#0f172a', textTransform: 'uppercase' }}>{edu.degree}</Text>
                                  <Text style={{ fontSize: baseSize(10), fontWeight: 900, color: '#059669', fontStyle: 'italic' }}>{edu.institution}</Text>
                                  <Text style={{ fontSize: baseSize(7), fontWeight: 900, color: '#cbd5e1', textTransform: 'uppercase', marginTop: 2 }}>{edu.startDate} - {edu.endDate}</Text>
                               </View>
                            ))}
                         </View>
                      </View>
                   </View>
                </View>
             </View>

             <View style={{ marginTop: 'auto', paddingTop: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: baseSize(9), fontWeight: 900, color: '#e2e8f0', textTransform: 'uppercase', letterSpacing: 8 }}>Mint Minimalist v9</Text>
                <View style={{ flexDirection: 'row', gap: 4 }}>
                   <View style={{ width: 15, height: 4, backgroundColor: '#10b981' }} />
                   <View style={{ width: 15, height: 4, backgroundColor: '#0f172a' }} />
                </View>
             </View>
          
<View style={{ padding: 12 }}>
{renderProjects()}{renderCertifications()}{renderAwards()}{renderAchievements()}{renderLanguages()}
</View>
</View>
        ) : templateId === 'template-ats-compliant-10' ? (
          <View style={{ flexDirection: 'column', flexGrow: 1, backgroundColor: '#ffffff', padding: 45 }}>
             {/* Header - Goldenrod & Graphite */}
             <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', borderBottomWidth: 10, borderBottomColor: '#1e293b', paddingBottom: 40, marginBottom: 40 }}>
                <View style={{ gap: 15 }}>
                   <Text style={{ fontSize: baseSize(42), fontWeight: 900, color: '#0f172a', textTransform: 'uppercase' }}>{personalInfo.fullName || 'Your Name'}</Text>
                   <Text style={{ fontSize: baseSize(18), fontWeight: 900, color: '#d97706', textTransform: 'uppercase', letterSpacing: 4 }}>{personalInfo.jobTitle}</Text>
                </View>
                <View style={{ width: 180, backgroundColor: '#f59e0b', padding: 20, borderRadius: 20, gap: 10 }}>
                   <Text style={{ fontSize: baseSize(9), fontWeight: 900, color: '#ffffff', textTransform: 'uppercase' }}>{personalInfo.email}</Text>
                   <View style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.2)' }} />
                   <Text style={{ fontSize: baseSize(9), fontWeight: 900, color: '#ffffff', textTransform: 'uppercase' }}>{personalInfo.phone}</Text>
                   <View style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.2)' }} />
                   <Text style={{ fontSize: baseSize(8), fontWeight: 900, color: '#ffffff', textTransform: 'uppercase' }}>{personalInfo.location}</Text>
                </View>
             </View>

             <View style={{ gap: 40 }}>
                {personalInfo.bio ? (
                  <View style={{ gap: 15 }}>
                     <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                         <Text style={{ fontSize: baseSize(10), fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', letterSpacing: 4 }}>Profile Overview</Text>
                         <View style={{ flex: 1, height: 1, backgroundColor: '#f1f5f9' }} />
                      </View>
                      <View style={{ backgroundColor: '#f8fafc', padding: 25, borderRadius: 20, borderWeight: 1, borderColor: '#f1f5f9' }}>
                         <Text style={{ fontSize: baseSize(12), color: '#334155', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1.5, textAlign: 'justify' }}>{personalInfo.bio}</Text>
                      </View>
                  </View>
                ) : null}

                {experience && experience.length > 0 ? (
                  <View style={{ gap: 25 }}>
                     <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                         <Text style={{ fontSize: baseSize(10), fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', letterSpacing: 4 }}>Carrier Milestone</Text>
                         <View style={{ flex: 1, height: 1, backgroundColor: '#f1f5f9' }} />
                      </View>
                      <View style={{ gap: 40 }}>
                         {experience.map(exp => (
                            <View key={exp.id} style={{ borderLeftWidth: 2, borderLeftColor: '#f59e0b', paddingLeft: 30, relative: true }}>
                               <View style={{ position: 'absolute', left: -5, top: 0, width: 10, height: 10, borderRadius: 5, backgroundColor: '#f59e0b' }} />
                               <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 5 }}>
                                  <Text style={{ fontSize: baseSize(22), fontWeight: 900, color: '#0f172a', textTransform: 'uppercase' }}>{exp.position}</Text>
                                  <Text style={{ fontSize: baseSize(10), fontWeight: 900, color: '#d97706', backgroundColor: '#ffffff', borderWeight: 1, borderColor: '#fef3c7', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20 }}>{exp.startDate} - {exp.currentlyWorking ? 'NOW' : exp.endDate}</Text>
                               </View>
                               <Text style={{ fontSize: baseSize(11), fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 3, fontStyle: 'italic', marginBottom: 10 }}>{exp.company}</Text>
                               <Text style={{ fontSize: baseSize(11), color: '#475569', lineHeight: 1.4 }}>{exp.description}</Text>
                            </View>
                         ))}
                      </View>
                  </View>
                ) : null}

                <View style={{ flexDirection: 'row', gap: 60 }}>
                   <View style={{ flex: 1, gap: 20 }}>
                      <Text style={{ fontSize: baseSize(9), fontWeight: 900, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: 4 }}>Technical Expertise</Text>
                      <View style={{ gap: 20 }}>
                         {skills && skills.map(cat => (
                            <View key={cat.id} style={{ gap: 6 }}>
                               <Text style={{ fontSize: baseSize(9), fontWeight: 900, color: '#d97706', textTransform: 'uppercase', borderLeftWidth: 4, borderLeftColor: '#f59e0b', paddingLeft: 10 }}>{cat.name}</Text>
                               <Text style={{ fontSize: baseSize(11), fontWeight: 900, color: '#1e293b', textTransform: 'uppercase', marginLeft: 14 }}>{cat.skills.join(' / ')}</Text>
                            </View>
                         ))}
                      </View>
                   </View>
                   <View style={{ flex: 1, gap: 20 }}>
                      <Text style={{ fontSize: baseSize(9), fontWeight: 900, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: 4 }}>Major Credentials</Text>
                      <View style={{ gap: 20 }}>
                         {education && education.map(edu => (
                            <View key={edu.id} style={{ borderWeight: 2, borderColor: '#0f172a', padding: 20, borderRadius: 25, position: 'relative' }}>
                               <View style={{ position: 'absolute', top: -8, right: -8, width: 16, height: 16, borderRadius: 8, backgroundColor: '#f59e0b' }} />
                               <Text style={{ fontSize: baseSize(12), fontWeight: 900, color: '#0f172a', textTransform: 'uppercase' }}>{edu.degree}</Text>
                               <Text style={{ fontSize: baseSize(10), fontWeight: 900, color: '#d97706', fontStyle: 'italic', marginTop: 4 }}>{edu.institution}</Text>
                               <Text style={{ fontSize: baseSize(8), fontWeight: 900, color: '#cbd5e1', textTransform: 'uppercase', marginTop: 6, letterSpacing: 2 }}>{edu.startDate} — {edu.endDate}</Text>
                            </View>
                         ))}
                      </View>
                   </View>
                </View>
             </View>

             <View style={{ marginTop: 'auto', paddingTop: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: baseSize(11), fontWeight: 900, color: '#e2e8f0', textTransform: 'uppercase', letterSpacing: 10, fontStyle: 'italic' }}>Elite Executive v10</Text>
                <View style={{ flexDirection: 'row', gap: 5 }}>
                   <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#f59e0b' }} />
                   <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#1e293b' }} />
                </View>
             </View>
          
<View style={{ padding: 12 }}>
{renderProjects()}{renderCertifications()}{renderAwards()}{renderAchievements()}{renderLanguages()}
</View>
</View>
        ) : templateId === 'template-industry-pro-11' ? (
          <View style={{ flexDirection: 'column', flexGrow: 1, backgroundColor: '#ffffff', padding: 40, color: '#0f172a' }}>
             {/* Header - Clean Light Theme */}
             <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#e2e8f0', paddingBottom: 30, marginBottom: 40 }}>
                <View>
                   <Text style={{ fontSize: baseSize(36), fontWeight: 900, color: '#0f172a', textTransform: 'uppercase' }}>{personalInfo.fullName || 'Your Name'}</Text>
                   <Text style={{ fontSize: baseSize(14), fontWeight: 900, color: '#0ea5e9', textTransform: 'uppercase', letterSpacing: 3, marginTop: 5 }}>{personalInfo.jobTitle}</Text>
                </View>
                <View style={{ textAlign: 'right', fontSize: baseSize(9), fontWeight: 500, color: '#64748b' }}>
                   {personalInfo.email && <Text>{personalInfo.email}</Text>}
                   {personalInfo.phone && <Text style={{ marginTop: 2 }}>{personalInfo.phone}</Text>}
                   {personalInfo.location && <Text style={{ marginTop: 2 }}>{personalInfo.location}</Text>}
                </View>
             </View>
             
             <View style={{ flexDirection: 'row', gap: 40 }}>
                <View style={{ flex: 1, gap: 30 }}>
                   {personalInfo.bio && (
                      <View>
                         <Text style={{ fontSize: baseSize(8), fontWeight: 900, color: '#0ea5e9', textTransform: 'uppercase', letterSpacing: 4, marginBottom: 10 }}>The Abstract</Text>
                         <Text style={{ fontSize: baseSize(11), fontWeight: 300, color: '#334155', fontStyle: 'italic', lineHeight: 1.5 }}>{personalInfo.bio}</Text>
                      </View>
                   )}
                   
                   {experience && experience.length > 0 && (
                      <View>
                         <Text style={{ fontSize: baseSize(8), fontWeight: 900, color: '#0ea5e9', textTransform: 'uppercase', letterSpacing: 4, marginBottom: 15 }}>Career Vector</Text>
                         <View style={{ gap: 25 }}>
                            {experience.map(exp => (
                               <View key={exp.id} style={{ borderLeftWidth: 1, borderLeftColor: '#e2e8f0', paddingLeft: 20 }}>
                                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 5 }}>
                                     <Text style={{ fontSize: baseSize(13), fontWeight: 900, color: '#0f172a' }}>{exp.position}</Text>
                                     <Text style={{ fontSize: baseSize(8), fontWeight: 700, color: '#64748b' }}>{exp.startDate} - {exp.currentlyWorking ? 'NOW' : exp.endDate}</Text>
                                  </View>
                                  <Text style={{ fontSize: baseSize(9), fontWeight: 900, color: '#0ea5e9', textTransform: 'uppercase', fontStyle: 'italic', marginBottom: 8 }}>{exp.company}</Text>
                                  <Text style={{ fontSize: baseSize(9.5), color: '#475569', lineHeight: 1.4, fontWeight: 300 }}>{exp.description}</Text>
                               </View>
                            ))}
                         </View>
                      </View>
                   )}
                </View>
                
                <View style={{ width: 180, gap: 35 }}>
                   {skills && skills.length > 0 && (
                      <View>
                         <Text style={{ fontSize: baseSize(8), fontWeight: 900, color: '#0ea5e9', textTransform: 'uppercase', letterSpacing: 4, marginBottom: 15 }}>Core Arsenal</Text>
                         <View style={{ gap: 15 }}>
                            {skills.map(cat => (
                               <View key={cat.id}>
                                  <Text style={{ fontSize: baseSize(8), fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 5 }}>{cat.name}</Text>
                                  <Text style={{ fontSize: baseSize(9), color: '#334155', fontWeight: 700, lineHeight: 1.4 }}>{cat.skills.join(', ')}</Text>
                                </View>
                            ))}
                         </View>
                      </View>
                   )}
                   
                   {education && education.length > 0 && (
                      <View>
                         <Text style={{ fontSize: baseSize(8), fontWeight: 900, color: '#0ea5e9', textTransform: 'uppercase', letterSpacing: 4, marginBottom: 15 }}>Education</Text>
                         <View style={{ gap: 20 }}>
                            {education.map(edu => (
                               <View key={edu.id}>
                                  <Text style={{ fontSize: baseSize(10), fontWeight: 900, color: '#0f172a', textTransform: 'uppercase' }}>{edu.degree}</Text>
                                  <Text style={{ fontSize: baseSize(8.5), fontWeight: 900, color: '#64748b', fontStyle: 'italic', marginTop: 2 }}>{edu.institution}</Text>
                                  <Text style={{ fontSize: baseSize(7.5), color: '#94a3b8', fontWeight: 900, marginTop: 4 }}>{edu.startDate} — {edu.endDate}</Text>
                               </View>
                            ))}
                         </View>
                      </View>
                   )}
                 </View>
              </View>
              
              <View style={{ marginTop: 'auto', paddingTop: 20, textAlign: 'center', borderTopWidth: 1, borderTopColor: '#e2e8f0' }}>
                 <Text style={{ fontSize: baseSize(7), fontWeight: 900, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: 10 }}>Modern Edge Pro</Text>
              </View>
           
<View style={{ padding: 12 }}>
{renderProjects()}{renderCertifications()}{renderAwards()}{renderAchievements()}{renderLanguages()}
</View>
</View>
        ) : templateId === 'template-industry-pro-12' ? (
          <View style={{ flexDirection: 'column', flexGrow: 1, backgroundColor: '#f8fafc' }}>
             {/* Sustainable Tech template */}
             <View style={{ flexDirection: 'row', flexGrow: 1 }}>
                <View style={{ width: 200, backgroundColor: '#1e293b', padding: 30, color: '#ffffff', gap: 30 }}>
                   <View style={{ gap: 15 }}>
                      <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: '#10b981', alignItems: 'center', justifyContent: 'center' }}>
                         <Text style={{ fontSize: 24, fontWeight: 900 }}>{personalInfo.fullName ? personalInfo.fullName.charAt(0) : 'Y'}</Text>
                      </View>
                      <View>
                         <Text style={{ fontSize: baseSize(18), fontWeight: 900, color: '#ffffff' }}>{personalInfo.fullName || 'Your Name'}</Text>
                         <Text style={{ fontSize: baseSize(10), fontWeight: 900, color: '#34d399', textTransform: 'uppercase', marginTop: 4 }}>{personalInfo.jobTitle}</Text>
                      </View>
                   </View>
                   
                   <View style={{ borderLeftWidth: 1, borderLeftColor: 'rgba(16,185,129,0.3)', paddingLeft: 10, gap: 4 }}>
                      {personalInfo.email && <Text style={{ fontSize: baseSize(8), color: '#ffffff' }}>{personalInfo.email}</Text>}
                      {personalInfo.phone && <Text style={{ fontSize: baseSize(8), color: '#94a3b8' }}>{personalInfo.phone}</Text>}
                      {personalInfo.location && <Text style={{ fontSize: baseSize(8), color: '#94a3b8' }}>{personalInfo.location}</Text>}
                   </View>
                   
                   <View style={{ gap: 20 }}>
                      {skills && skills.length > 0 && (
                         <View style={{ gap: 10 }}>
                            <Text style={{ fontSize: baseSize(7), fontWeight: 900, color: '#10b981', textTransform: 'uppercase', letterSpacing: 2 }}>Top Skills</Text>
                            {skills.slice(0, 5).map(cat => (
                               <View key={cat.id}>
                                  <Text style={{ fontSize: baseSize(7), fontWeight: 900, color: '#64748b', textTransform: 'uppercase', marginBottom: 4 }}>{cat.name}</Text>
                                  <Text style={{ fontSize: baseSize(9), color: '#ecfdf5', fontWeight: 700, lineHeight: 1.3 }}>{cat.skills.join(' • ')}</Text>
                               </View>
                            ))}
                         </View>
                      )}
                   </View>
                   
                   <View style={{ marginTop: 'auto' }}>
                      <Text style={{ fontSize: baseSize(7), fontWeight: 900, color: '#334155', textTransform: 'uppercase', letterSpacing: 2 }}>Sustainable Tech</Text>
                   </View>
                </View>
                
                <View style={{ flex: 1, padding: 40, gap: 40 }}>
                   {personalInfo.bio && (
                      <View>
                         <Text style={{ alignSelf: 'flex-start', fontSize: baseSize(10), fontWeight: 900, color: '#1e293b', borderBottomWidth: 2, borderBottomColor: '#10b981', paddingBottom: 4, marginBottom: 15, textTransform: 'uppercase' }}>The Vision</Text>
                         <Text style={{ fontSize: baseSize(12), fontWeight: 500, color: '#475569', fontStyle: 'italic', lineHeight: 1.5 }}>{personalInfo.bio}</Text>
                      </View>
                   )}
                   
                   {experience && experience.length > 0 && (
                      <View>
                         <Text style={{ alignSelf: 'flex-start', fontSize: baseSize(10), fontWeight: 900, color: '#1e293b', borderBottomWidth: 2, borderBottomColor: '#10b981', paddingBottom: 4, marginBottom: 20, textTransform: 'uppercase' }}>Professional Path</Text>
                         <View style={{ gap: 25 }}>
                            {experience.map(exp => (
                               <View key={exp.id} style={{ flexDirection: 'row', gap: 20 }}>
                                  <View style={{ width: 80, textAlign: 'right' }}>
                                     <Text style={{ fontSize: baseSize(9), fontWeight: 900, color: '#1e293b' }}>{exp.startDate}</Text>
                                     <Text style={{ fontSize: baseSize(7), fontWeight: 700, color: '#cbd5e1', textTransform: 'uppercase' }}>To {exp.currentlyWorking ? 'Present' : exp.endDate}</Text>
                                  </View>
                                  <View style={{ flex: 1 }}>
                                     <Text style={{ fontSize: baseSize(13), fontWeight: 700, color: '#0f172a' }}>{exp.position}</Text>
                                     <Text style={{ fontSize: baseSize(9), fontWeight: 900, color: '#059669', textTransform: 'uppercase', fontStyle: 'italic', marginVertical: 3 }}>{exp.company}</Text>
                                     <Text style={{ fontSize: baseSize(9.5), color: '#64748b', fontWeight: 700, lineHeight: 1.4 }}>{exp.description}</Text>
                                  </View>
                               </View>
                            ))}
                         </View>
                      </View>
                   )}
                 </View>
              </View>
           
<View style={{ padding: 12 }}>
{renderProjects()}{renderCertifications()}{renderAwards()}{renderAchievements()}{renderLanguages()}
</View>
</View>
        ) : templateId === 'template-industry-pro-13' ? (
          <View style={{ flexDirection: 'column', flexGrow: 1, backgroundColor: '#ffffff', padding: 50, gap: 40 }}>
             {/* Dynamic Branding */}
             <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', borderBottomWidth: 6, borderBottomColor: '#1e293b', paddingBottom: 30 }}>
                <View style={{ flex: 1, gap: 10 }}>
                   <Text style={{ fontSize: baseSize(44), fontWeight: 900, color: '#1e293b', letterSpacing: -2, lineHeight: 0.9 }}>
                      {personalInfo.fullName ? (
                        <>
                          <Text style={{ color: '#a855f7' }}>{personalInfo.fullName.split(' ')[0]}</Text>
                          {'\n'}
                          {personalInfo.fullName.split(' ').slice(1).join(' ')}
                        </>
                      ) : 'Your Name'}
                   </Text>
                   <View style={{ alignSelf: 'flex-start', backgroundColor: '#1e293b', paddingHorizontal: 12, paddingVertical: 4 }}>
                      <Text style={{ fontSize: baseSize(12), color: '#ffffff', fontWeight: 900, textTransform: 'uppercase', letterSpacing: 2 }}>{personalInfo.jobTitle}</Text>
                   </View>
                </View>
                <View style={{ textAlign: 'right', gap: 4, paddingTop: 10 }}>
                   {personalInfo.email && <Text style={{ fontSize: baseSize(8), fontWeight: 900, color: '#a855f7', textDecoration: 'underline' }}>{personalInfo.email}</Text>}
                   {personalInfo.phone && <Text style={{ fontSize: baseSize(8), fontWeight: 900, color: '#1e293b', marginTop: 5 }}>{personalInfo.phone}</Text>}
                   {personalInfo.location && <Text style={{ fontSize: baseSize(8), fontWeight: 900, color: '#1e293b' }}>{personalInfo.location}</Text>}
                </View>
             </View>
             
             <View style={{ gap: 40 }}>
                {personalInfo.bio && (
                   <View style={{ flexDirection: 'row', gap: 30 }}>
                      <Text style={{ width: 120, fontSize: baseSize(8), fontWeight: 900, color: '#a855f7', textTransform: 'uppercase', letterSpacing: 4, textAlign: 'right', borderRightWidth: 2, borderRightColor: '#f3e8ff', paddingRight: 20 }}>Executive Summary</Text>
                      <Text style={{ flex: 1, fontSize: baseSize(14), fontWeight: 900, color: '#1e293b', textTransform: 'uppercase', lineHeight: 1.2 }}>{personalInfo.bio}</Text>
                   </View>
                )}
                
                {experience && experience.length > 0 && (
                   <View style={{ flexDirection: 'row', gap: 30 }}>
                      <Text style={{ width: 120, fontSize: baseSize(8), fontWeight: 900, color: '#a855f7', textTransform: 'uppercase', letterSpacing: 4, textAlign: 'right', borderRightWidth: 2, borderRightColor: '#f3e8ff', paddingRight: 20 }}>Career Pulse</Text>
                      <View style={{ flex: 1, gap: 30 }}>
                         {experience.map(exp => (
                            <View key={exp.id}>
                               <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', borderBottomWidth: 1, borderBottomColor: '#f1f5f9', paddingBottom: 5, marginBottom: 8 }}>
                                  <Text style={{ fontSize: baseSize(18), fontWeight: 900, color: '#1e293b', letterSpacing: -1 }}>{exp.position}</Text>
                                  <View style={{ backgroundColor: '#f3e8ff', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 20 }}>
                                     <Text style={{ fontSize: baseSize(8.5), fontWeight: 900, color: '#a855f7', textTransform: 'uppercase' }}>{exp.startDate} - {exp.currentlyWorking ? 'NOW' : exp.endDate}</Text>
                                  </View>
                               </View>
                               <Text style={{ fontSize: baseSize(9.5), fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', fontStyle: 'italic', marginBottom: 10 }}>{exp.company}</Text>
                               <Text style={{ fontSize: baseSize(10.5), color: '#475569', fontWeight: 700, lineHeight: 1.4, borderLeftWidth: 2, borderLeftColor: '#f8fafc', paddingLeft: 15 }}>{exp.description}</Text>
                            </View>
                         ))}
                      </View>
                   </View>
                )}
             </View>
          
<View style={{ padding: 12 }}>
{renderProjects()}{renderCertifications()}{renderAwards()}{renderAchievements()}{renderLanguages()}
</View>
</View>
        ) : templateId === 'template-industry-pro-14' ? (
          <View style={{ flexDirection: 'column', flexGrow: 1, backgroundColor: '#ffffff' }}>
             {/* Global Consulting */}
             <View style={{ backgroundColor: '#1d4ed8', padding: 40, paddingBottom: 60, color: '#ffffff', position: 'relative' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                   <View>
                      <Text style={{ fontSize: baseSize(32), fontWeight: 900, textTransform: 'uppercase', color: '#ffffff' }}>{personalInfo.fullName || 'Your Name'}</Text>
                      <View style={{ width: 40, height: 2, backgroundColor: '#94a3b8', marginVertical: 10 }} />
                      <Text style={{ fontSize: baseSize(14), fontWeight: 700, textTransform: 'uppercase', color: '#dbeafe', letterSpacing: 2 }}>{personalInfo.jobTitle}</Text>
                   </View>
                   <View style={{ textAlign: 'right', gap: 3 }}>
                      {personalInfo.email && <Text style={{ fontSize: baseSize(8), fontWeight: 700, color: '#ffffff', borderBottomWidth: 1, borderBottomColor: '#3b82f6', marginBottom: 2 }}>{personalInfo.email}</Text>}
                      {personalInfo.phone && <Text style={{ fontSize: baseSize(8), color: '#dbeafe' }}>{personalInfo.phone}</Text>}
                      {personalInfo.location && <Text style={{ fontSize: baseSize(8), color: '#dbeafe' }}>{personalInfo.location}</Text>}
                   </View>
                </View>
             </View>
             
             <View style={{ flexGrow: 1, padding: 40, flexDirection: 'row', gap: 40 }}>
                <View style={{ flex: 1, gap: 30 }}>
                   {personalInfo.bio && (
                      <View>
                         <Text style={{ fontSize: baseSize(8), fontWeight: 900, color: '#1d4ed8', textTransform: 'uppercase', letterSpacing: 3, marginBottom: 15 }}>Executive Summary</Text>
                         <Text style={{ fontSize: baseSize(11), color: '#475569', fontWeight: 700, borderLeftWidth: 3, borderLeftColor: '#1d4ed8', paddingLeft: 15, fontStyle: 'italic', lineHeight: 1.5 }}>{personalInfo.bio}</Text>
                      </View>
                   )}
                   
                   {experience && experience.length > 0 && (
                      <View>
                         <Text style={{ fontSize: baseSize(8), fontWeight: 900, color: '#1d4ed8', textTransform: 'uppercase', letterSpacing: 3, marginBottom: 20 }}>Milestone Record</Text>
                         <View style={{ gap: 25 }}>
                            {experience.map(exp => (
                               <View key={exp.id}>
                                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 5 }}>
                                     <Text style={{ fontSize: baseSize(14), fontWeight: 900, color: '#0f172a', textTransform: 'uppercase' }}>{exp.position}</Text>
                                     <Text style={{ fontSize: baseSize(8), fontWeight: 900, color: '#cbd5e1', fontStyle: 'italic' }}>{exp.startDate} — {exp.currentlyWorking ? 'NOW' : exp.endDate}</Text>
                                  </View>
                                  <Text style={{ fontSize: baseSize(9.5), fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8, paddingLeft: 15, borderLeftWidth: 1, borderLeftColor: '#f1f5f9' }}>{exp.company}</Text>
                                  <Text style={{ fontSize: baseSize(10), color: '#64748b', fontWeight: 500, lineHeight: 1.4, paddingLeft: 15 }}>{exp.description}</Text>
                               </View>
                            ))}
                         </View>
                      </View>
                   )}
                 </View>
                 
                 <View style={{ width: 160, gap: 30 }}>
                   {skills && skills.length > 0 && (
                      <View>
                         <Text style={{ fontSize: baseSize(8), fontWeight: 900, color: '#1d4ed8', textTransform: 'uppercase', letterSpacing: 3, marginBottom: 15 }}>Top Competencies</Text>
                         <View style={{ gap: 15 }}>
                            {skills.map(cat => (
                               <View key={cat.id}>
                                  <Text style={{ fontSize: baseSize(7.5), fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', borderBottomWidth: 1, borderBottomColor: '#f1f5f9', paddingBottom: 5, marginBottom: 5 }}>{cat.name}</Text>
                                  <Text style={{ fontSize: baseSize(9), fontWeight: 700, color: '#334155', lineHeight: 1.4 }}>{cat.skills.join(' / ')}</Text>
                               </View>
                            ))}
                         </View>
                      </View>
                   )}
                </View>
             </View>
          
<View style={{ padding: 12 }}>
{renderProjects()}{renderCertifications()}{renderAwards()}{renderAchievements()}{renderLanguages()}
</View>
</View>
        ) : templateId === 'template-industry-pro-15' ? (
          <View style={{ flexDirection: 'column', flexGrow: 1, backgroundColor: '#fdfcfb', padding: 80, gap: 80 }}>
             {/* Minimalist Zen */}
             <View style={{ alignItems: 'center', gap: 20 }}>
                <Text style={{ fontSize: baseSize(44), fontWeight: 400, color: '#1e293b', letterSpacing: 10, textTransform: 'uppercase' }}>{personalInfo.fullName || 'Your Name'}</Text>
                <View style={{ width: 30, height: 1, backgroundColor: '#1e293b' }} />
                <Text style={{ fontSize: baseSize(10), fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 6 }}>{personalInfo.jobTitle}</Text>
                <View style={{ flexDirection: 'row', gap: 30, marginTop: 30, fontSize: baseSize(8), fontWeight: 500, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1 }}>
                   {personalInfo.email && <Text style={{ textDecoration: 'underline' }}>{personalInfo.email}</Text>}
                   {personalInfo.phone && <Text>{personalInfo.phone}</Text>}
                   {personalInfo.location && <Text>{personalInfo.location}</Text>}
                </View>
             </View>
             
             <View style={{ gap: 80 }}>
                {personalInfo.bio && (
                   <View style={{ alignItems: 'center', gap: 20 }}>
                      <Text style={{ fontSize: baseSize(7), fontWeight: 900, color: '#e2e8f0', textTransform: 'uppercase', letterSpacing: 5 }}>Perspective</Text>
                      <Text style={{ fontSize: baseSize(14), color: '#475569', fontStyle: 'italic', textAlign: 'center', lineHeight: 1.6, fontWeight: 300 }}>{personalInfo.bio}</Text>
                   </View>
                )}
                
                {experience && experience.length > 0 && (
                   <View style={{ gap: 40 }}>
                      <Text style={{ fontSize: baseSize(7), fontWeight: 900, color: '#e2e8f0', textTransform: 'uppercase', letterSpacing: 5, textAlign: 'center', borderBottomWidth: 1, borderBottomColor: '#f1f5f9', paddingBottom: 25 }}>The Narrative</Text>
                      <View style={{ gap: 60 }}>
                         {experience.map(exp => (
                            <View key={exp.id} style={{ gap: 10 }}>
                               <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                  <Text style={{ fontSize: baseSize(18), fontStyle: 'italic', color: '#0f172a' }}>{exp.position}</Text>
                                  <Text style={{ fontSize: baseSize(8), fontWeight: 700, color: '#cbd5e1', textTransform: 'uppercase' }}>{exp.startDate} / {exp.currentlyWorking ? 'PRESENT' : exp.endDate}</Text>
                                </View>
                               <Text style={{ fontSize: baseSize(8.5), fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 3 }}>{exp.company}</Text>
                               <Text style={{ fontSize: baseSize(10.5), color: '#64748b', fontWeight: 300, lineHeight: 1.6 }}>{exp.description}</Text>
                            </View>
                         ))}
                      </View>
                   </View>
                )}
             </View>
          
<View style={{ padding: 12 }}>
{renderProjects()}{renderCertifications()}{renderAwards()}{renderAchievements()}{renderLanguages()}
</View>
</View>
        ) : templateId === 'template-single-column-1' ? (
          <View style={{ flexDirection: 'column', flexGrow: 1, backgroundColor: '#fdfcfb', padding: 40 }}>
             {/* Header */}
             <View style={{ textAlign: 'center', marginBottom: 30 }}>
                <Text style={{ fontSize: baseSize(32), fontFamily: chosenFont, color: '#0f172a', textTransform: 'uppercase', letterSpacing: 4 }}>
                  {personalInfo.fullName || 'Your Name'}
                </Text>
                {personalInfo.jobTitle ? (
                  <Text style={{ fontSize: baseSize(9), fontFamily: chosenFontBold, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 6, fontStyle: 'italic', marginTop: 10 }}>
                    {personalInfo.jobTitle}
                  </Text>
                ) : null}
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20, fontSize: baseSize(8), color: '#64748b', textTransform: 'uppercase', letterSpacing: 2 }}>
                   {personalInfo.email ? <Text style={{ marginRight: 20 }}>{personalInfo.email}</Text> : null}
                   {personalInfo.phone ? <Text style={{ marginRight: 20 }}>{personalInfo.phone}</Text> : null}
                   {personalInfo.location ? <Text>{personalInfo.location}</Text> : null}
                </View>
             </View>

             <View style={{ maxWidth: 500, alignSelf: 'center', width: '100%' }}>
                {/* Profile */}
                {personalInfo.bio ? (
                  <View style={{ marginBottom: 30, textAlign: 'center' }}>
                     <View style={{ width: 30, height: 1, backgroundColor: '#e2e8f0', alignSelf: 'center', marginBottom: 12 }} />
                     <Text style={{ fontSize: baseSize(10.5), color: '#475569', lineHeight: 1.5, fontStyle: 'italic' }}>{personalInfo.bio}</Text>
                  </View>
                ) : null}

                {/* Experience */}
                {experience && experience.length > 0 ? (
                  <View style={{ marginBottom: 30 }}>
                     <Text style={{ fontSize: baseSize(9), fontFamily: chosenFontBold, color: '#cbd5e1', textTransform: 'uppercase', textAlign: 'center', letterSpacing: 4, borderBottomWidth: 1, borderBottomColor: '#f1f5f9', paddingBottom: 5, marginBottom: 15 }}>Professional Record</Text>
                     {experience.map(exp => (
                        <View key={exp.id} style={{ marginBottom: 15 }}>
                           <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3, borderBottomWidth: 1, borderBottomColor: '#f8fafc', paddingBottom: 2 }}>
                              <Text style={{ fontSize: baseSize(10), fontFamily: chosenFontBold, color: '#0f172a', textTransform: 'uppercase' }}>{exp.position}</Text>
                              <Text style={{ fontSize: baseSize(8), fontFamily: chosenFontBold, color: '#94a3b8' }}>{exp.startDate} - {exp.currentlyWorking ? 'PRST' : exp.endDate}</Text>
                           </View>
                           <Text style={{ fontSize: baseSize(9), fontFamily: chosenFontBold, color: '#94a3b8', fontStyle: 'italic', marginBottom: 5 }}>{exp.company}</Text>
                           {exp.description ? <Text style={{ fontSize: baseSize(9.5), color: '#475569', lineHeight: 1.4 }}>{exp.description}</Text> : null}
                        </View>
                     ))}
                  </View>
                ) : null}

                {/* Bottom Row */}
                <View style={{ flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#f1f5f9', paddingTop: 20 }}>
                   <View style={{ width: '50%', paddingRight: 20, borderRightWidth: 1, borderRightColor: '#f8fafc' }}>
                      {education && education.length > 0 ? (
                        <View>
                           <Text style={{ fontSize: baseSize(8), fontFamily: chosenFontBold, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 10, fontStyle: 'italic' }}>Academic</Text>
                           {education.map(edu => (
                              <View key={edu.id} style={{ marginBottom: 10 }}>
                                 <Text style={{ fontSize: baseSize(9), fontFamily: chosenFontBold, color: '#1e293b' }}>{edu.degree}</Text>
                                 <Text style={{ fontSize: baseSize(8), color: '#94a3b8', fontStyle: 'italic' }}>{edu.institution}</Text>
                                 <Text style={{ fontSize: baseSize(7), color: '#cbd5e1', marginTop: 1 }}>{edu.startDate} - {edu.endDate}</Text>
                              </View>
                           ))}
                        </View>
                      ) : null}
                   </View>
                   <View style={{ width: '50%', paddingLeft: 20 }}>
                      {skills && skills.length > 0 ? (
                        <View>
                           <Text style={{ fontSize: baseSize(8), fontFamily: chosenFontBold, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 10, fontStyle: 'italic' }}>Expertise</Text>
                           {skills.map(cat => (
                              <View key={cat.id} style={{ marginBottom: 8 }}>
                                 <Text style={{ fontSize: baseSize(7.5), fontFamily: chosenFontBold, color: '#1e293b', fontStyle: 'italic', marginBottom: 2 }}>{cat.name}</Text>
                                 <Text style={{ fontSize: baseSize(9), color: '#475569' }}>{cat.skills.join(' • ')}</Text>
                              </View>
                           ))}
                        </View>
                      ) : null}
                   </View>
                </View>
             </View>
          
<View style={{ padding: 12 }}>
{renderProjects()}{renderCertifications()}{renderAwards()}{renderAchievements()}{renderLanguages()}
</View>
</View>
        ) : templateId === 'template-single-column-2' ? (
          <View style={{ flexDirection: 'column', flexGrow: 1, backgroundColor: '#ffffff', padding: 40 }}>
             {/* Tech Header */}
             <View style={{ borderBottomWidth: 4, borderBottomColor: '#0f172a', paddingBottom: 25, marginBottom: 30, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <View>
                   <Text style={{ fontSize: baseSize(32), fontFamily: chosenFontBold, color: '#0f172a', textTransform: 'uppercase', letterSpacing: -1 }}>
                     {personalInfo.fullName || 'Your Name'}
                   </Text>
                   {personalInfo.jobTitle ? (
                     <View style={{ backgroundColor: '#0f172a', padding: '3 8', marginTop: 8, alignSelf: 'flex-start' }}>
                        <Text style={{ fontSize: baseSize(10), fontFamily: chosenFontBold, color: '#ffffff', textTransform: 'uppercase', letterSpacing: 1.5 }}>
                          {personalInfo.jobTitle}
                        </Text>
                     </View>
                   ) : null}
                </View>
                <View style={{ textAlign: 'right', fontSize: baseSize(8), fontFamily: fontMono, color: '#94a3b8', textTransform: 'uppercase' }}>
                   {personalInfo.email ? <Text style={{ color: '#0f172a', marginBottom: 2 }}>{personalInfo.email}</Text> : null}
                   {personalInfo.phone ? <Text style={{ marginBottom: 2 }}>{personalInfo.phone}</Text> : null}
                   {personalInfo.location ? <Text>{personalInfo.location}</Text> : null}
                </View>
             </View>

             {/* Profile Summary */}
             {personalInfo.bio ? (
               <View style={{ flexDirection: 'row', marginBottom: 30, gap: 20 }}>
                  <Text style={{ width: 60, fontSize: baseSize(8), fontFamily: chosenFontBold, color: '#cbd5e1', textTransform: 'uppercase' }}>Summary</Text>
                  <Text style={{ flex: 1, fontSize: baseSize(10), color: '#475569', lineHeight: 1.4 }}>{personalInfo.bio}</Text>
               </View>
             ) : null}

             {/* Experience */}
             {experience && experience.length > 0 ? (
               <View style={{ marginBottom: 30 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
                     <Text style={{ fontSize: baseSize(9), fontFamily: chosenFontBold, color: '#0f172a', textTransform: 'uppercase', letterSpacing: 2, marginRight: 15 }}>Experience</Text>
                     <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(15,23,42,0.05)' }} />
                  </View>
                  <View style={{ borderLeftWidth: 1, borderLeftColor: '#f1f5f9', marginLeft: 65, paddingLeft: 25 }}>
                     {experience.map(exp => (
                        <View key={exp.id} style={{ marginBottom: 20, position: 'relative' }}>
                           <View style={{ position: 'absolute', left: -29, top: 4, width: 6, height: 6, borderRadius: 3, borderWeight: 2, borderColor: '#0f172a', backgroundColor: '#ffffff' }} />
                           <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 }}>
                              <Text style={{ fontSize: baseSize(11), fontFamily: chosenFontBold, color: '#0f172a', textTransform: 'uppercase' }}>{exp.position}</Text>
                              <View style={{ backgroundColor: '#f8fafc', padding: '2 6' }}>
                                 <Text style={{ fontSize: baseSize(8), fontFamily: fontMono, color: '#94a3b8' }}>{exp.startDate} - {exp.currentlyWorking ? 'PRST' : exp.endDate}</Text>
                              </View>
                           </View>
                           <Text style={{ fontSize: baseSize(9), fontFamily: chosenFontBold, color: '#94a3b8', fontStyle: 'italic', textTransform: 'uppercase', marginBottom: 5 }}>{exp.company}</Text>
                           {exp.description ? <Text style={{ fontSize: baseSize(9.5), color: '#475569', lineHeight: 1.4 }}>{exp.description}</Text> : null}
                        </View>
                     ))}
                  </View>
               </View>
             ) : null}

             {/* Bottom Grid */}
             <View style={{ flexDirection: 'row' }}>
                <View style={{ width: '50%', paddingRight: 25 }}>
                   {skills && skills.length > 0 ? (
                     <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
                           <Text style={{ fontSize: baseSize(9), fontFamily: chosenFontBold, color: '#0f172a', textTransform: 'uppercase', letterSpacing: 2, marginRight: 15 }}>Expertise</Text>
                           <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(15,23,42,0.05)' }} />
                        </View>
                        {skills.map(cat => (
                           <View key={cat.id} style={{ marginBottom: 10 }}>
                              <Text style={{ fontSize: baseSize(8.5), fontFamily: chosenFontBold, color: '#94a3b8', textTransform: 'uppercase', fontStyle: 'italic', marginBottom: 3 }}>{cat.name}</Text>
                              <Text style={{ fontSize: baseSize(9), color: '#475569', lineHeight: 1.3 }}>{cat.skills.join(', ')}</Text>
                           </View>
                        ))}
                     </View>
                   ) : null}
                </View>
                <View style={{ width: '50%', paddingLeft: 25 }}>
                   {education && education.length > 0 ? (
                     <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
                           <Text style={{ fontSize: baseSize(9), fontFamily: chosenFontBold, color: '#0f172a', textTransform: 'uppercase', letterSpacing: 2, marginRight: 15 }}>Education</Text>
                           <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(15,23,42,0.05)' }} />
                        </View>
                        {education.map(edu => (
                           <View key={edu.id} style={{ marginBottom: 12, borderBottomWidth: 1, borderBottomColor: '#f8fafc', paddingBottom: 5 }}>
                              <Text style={{ fontSize: baseSize(10), fontFamily: chosenFontBold, color: '#0f172a', textTransform: 'uppercase' }}>{edu.degree}</Text>
                              <Text style={{ fontSize: baseSize(8.5), color: '#94a3b8', fontStyle: 'italic', marginTop: 1 }}>{edu.institution}</Text>
                              <Text style={{ fontSize: baseSize(7.5), fontFamily: fontMono, color: '#cbd5e1', marginTop: 2 }}>{edu.startDate} - {edu.endDate}</Text>
                           </View>
                        ))}
                     </View>
                   ) : null}
                </View>
             </View>
          
<View style={{ padding: 12 }}>
{renderProjects()}{renderCertifications()}{renderAwards()}{renderAchievements()}{renderLanguages()}
</View>
</View>
        ) : templateId === 'template-single-column-3' ? (
          <View style={{ flexDirection: 'column', flexGrow: 1, backgroundColor: '#ffffff', padding: 50 }}>
             {/* Editorial Header */}
             <View style={{ marginBottom: 40 }}>
                <Text style={{ fontSize: baseSize(54), fontFamily: chosenFontBold, color: '#0f172a', letterSpacing: -3, lineHeight: 0.8 }}>
                  {personalInfo.fullName ? personalInfo.fullName.split(' ')[0] : 'Your'}
                </Text>
                <Text style={{ fontSize: baseSize(54), fontFamily: chosenFontBold, color: '#94a3b8', letterSpacing: -3, lineHeight: 0.8, marginTop: 5 }}>
                  {personalInfo.fullName ? personalInfo.fullName.split(' ').slice(1).join(' ') : 'Name'}
                </Text>
                <View style={{ borderTopWidth: 1, borderTopColor: '#f1f5f9', paddingTop: 25, marginTop: 35, flexDirection: 'row', alignItems: 'center' }}>
                   {personalInfo.jobTitle ? (
                     <Text style={{ fontSize: baseSize(14), fontFamily: chosenFontBold, color: '#0f172a', textTransform: 'uppercase', letterSpacing: -1 }}>
                        {personalInfo.jobTitle}
                     </Text>
                   ) : null}
                   <View style={{ width: 1, height: 12, backgroundColor: '#e2e8f0', marginHorizontal: 20 }} />
                   <View style={{ flexDirection: 'row', fontSize: baseSize(8.5), fontFamily: chosenFontBold, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: 2 }}>
                      {personalInfo.email ? <Text style={{ marginRight: 20 }}>{personalInfo.email}</Text> : null}
                      {personalInfo.location ? <Text>{personalInfo.location}</Text> : null}
                   </View>
                </View>
             </View>

             {/* Profile Summary */}
             {personalInfo.bio ? (
                <View style={{ marginBottom: 50 }}>
                   <Text style={{ fontSize: baseSize(18), fontFamily: chosenFont, color: '#334155', lineHeight: 1.3, fontStyle: 'italic' }}>
                      {personalInfo.bio}
                   </Text>
                </View>
             ) : null}

             {/* Experience */}
             {experience && experience.length > 0 ? (
                <View style={{ marginBottom: 40 }}>
                   <Text style={{ fontSize: baseSize(9), fontFamily: chosenFontBold, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: 4, marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#f8fafc', paddingBottom: 5 }}>Professional Narrative</Text>
                   {experience.map(exp => (
                      <View key={exp.id} style={{ marginBottom: 30 }}>
                         <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5, alignItems: 'center' }}>
                            <Text style={{ fontSize: baseSize(20), fontFamily: chosenFontBold, color: '#0f172a', textTransform: 'uppercase', letterSpacing: -1 }}>{exp.position}</Text>
                            <Text style={{ fontSize: baseSize(9), fontFamily: chosenFontBold, color: '#cbd5e1', textTransform: 'uppercase' }}>{exp.startDate} - {exp.currentlyWorking ? 'NOW' : exp.endDate}</Text>
                         </View>
                         <Text style={{ fontSize: baseSize(11), fontFamily: chosenFontBold, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 2, fontStyle: 'italic', marginBottom: 8 }}>{exp.company}</Text>
                         {exp.description ? <Text style={{ fontSize: baseSize(11), color: '#475569', lineHeight: 1.5, fontWeight: 'bold' }}>{exp.description}</Text> : null}
                      </View>
                   ))}
                </View>
             ) : null}

             {/* Skills */}
             {skills && skills.length > 0 ? (
                <View>
                   <Text style={{ fontSize: baseSize(9), fontFamily: chosenFontBold, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: 4, marginBottom: 20 }}>Competencies</Text>
                   <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                      {skills.flatMap(cat => cat.skills).map((skill, idx) => (
                         <View key={idx} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 25, marginBottom: 12 }}>
                            <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: '#0f172a', marginRight: 8 }} />
                            <Text style={{ fontSize: baseSize(11), fontFamily: chosenFontBold, color: '#0f172a', textTransform: 'uppercase', letterSpacing: -0.5 }}>{skill}</Text>
                         </View>
                      ))}
                   </View>
                </View>
             ) : null}
          
<View style={{ padding: 12 }}>
{renderProjects()}{renderCertifications()}{renderAwards()}{renderAchievements()}{renderLanguages()}
</View>
</View>
        ) : templateId === 'template-single-column-4' ? (
          <View style={{ flexDirection: 'column', flexGrow: 1, backgroundColor: '#ffffff' }}>
             {/* Geometric Header Component */}
             <View style={{ height: 180, backgroundColor: primaryColor, position: 'relative', overflow: 'hidden' }}>
                <View style={{ position: 'absolute', top: 35, left: 40 }}>
                   <Text style={{ fontSize: baseSize(44), fontFamily: chosenFontBold, color: '#ffffff', textTransform: 'uppercase', letterSpacing: -2 }}>
                     {personalInfo.fullName || 'Your Name'}
                   </Text>
                   {personalInfo.jobTitle ? (
                     <Text style={{ fontSize: baseSize(10), fontFamily: chosenFontBold, color: '#ffffff', opacity: 0.7, textTransform: 'uppercase', letterSpacing: 4, marginTop: 8 }}>
                        {personalInfo.jobTitle}
                     </Text>
                   ) : null}
                   <View style={{ flexDirection: 'row', marginTop: 25, fontSize: baseSize(8.5), color: '#ffffff', opacity: 0.6, textTransform: 'uppercase', letterSpacing: 2 }}>
                      {personalInfo.email ? <Text style={{ marginRight: 25 }}>{personalInfo.email}</Text> : null}
                      {personalInfo.phone ? <Text style={{ marginRight: 25 }}>{personalInfo.phone}</Text> : null}
                      {personalInfo.location ? <Text>{personalInfo.location}</Text> : null}
                   </View>
                </View>
             </View>

             {/* Content Block */}
             <View style={{ padding: 40 }}>
                {/* Profile */}
                {personalInfo.bio ? (
                  <View style={{ flexDirection: 'row', marginBottom: 40, gap: 30 }}>
                     <View style={{ width: 70, textAlign: 'right' }}>
                        <Text style={{ fontSize: baseSize(9), fontFamily: chosenFontBold, color: primaryColor, textTransform: 'uppercase', letterSpacing: 2 }}>About</Text>
                     </View>
                     <View style={{ flex: 1, borderLeftWidth: 2, borderLeftColor: '#f1f5f9', paddingLeft: 25 }}>
                        <Text style={{ fontSize: baseSize(10.5), color: '#334155', lineHeight: 1.5, fontWeight: 'bold' }}>{personalInfo.bio}</Text>
                     </View>
                  </View>
                ) : null}

                {/* Experience */}
                {experience && experience.length > 0 ? (
                  <View style={{ marginBottom: 40 }}>
                     <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 25 }}>
                        <Text style={{ width: 70, textAlign: 'right', fontSize: baseSize(9), fontFamily: chosenFontBold, color: '#0f172a', textTransform: 'uppercase', letterSpacing: 2, marginRight: 30 }}>History</Text>
                        <View style={{ flex: 1, height: 1, backgroundColor: '#f1f5f9' }} />
                     </View>
                     {experience.map(exp => (
                        <View key={exp.id} style={{ flexDirection: 'row', marginBottom: 25, gap: 30 }}>
                           <View style={{ width: 70, textAlign: 'right', paddingTop: 2 }}>
                              <Text style={{ fontSize: baseSize(8), fontFamily: chosenFontBold, color: '#cbd5e1', textTransform: 'uppercase' }}>{exp.startDate} - {exp.currentlyWorking ? 'PRST' : exp.endDate}</Text>
                           </View>
                           <View style={{ flex: 1, borderBottomWidth: 1, borderBottomColor: '#f8fafc', paddingBottom: 15 }}>
                              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                                 <Text style={{ fontSize: baseSize(12), fontFamily: chosenFontBold, color: '#0f172a', textTransform: 'uppercase' }}>{exp.position}</Text>
                                 <Text style={{ fontSize: baseSize(9), fontFamily: chosenFontBold, color: primaryColor, fontStyle: 'italic' }}>@{exp.company}</Text>
                              </View>
                              <Text style={{ fontSize: baseSize(10), color: '#475569', lineHeight: 1.4 }}>{exp.description}</Text>
                           </View>
                        </View>
                     ))}
                  </View>
                ) : null}

                {/* Bottom Parts */}
                <View style={{ flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#f1f5f9', paddingTop: 30 }}>
                   <View style={{ width: '50%', paddingRight: 30 }}>
                      {skills && skills.length > 0 ? (
                         <View>
                            <Text style={{ fontSize: baseSize(8), fontFamily: chosenFontBold, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 15 }}>Stack</Text>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                               {skills.flatMap(cat => cat.skills).map((skill, idx) => (
                                 <View key={idx} style={{ backgroundColor: '#0f172a', padding: '3 8', borderRadius: 2, marginRight: 5, marginBottom: 5 }}>
                                    <Text style={{ fontSize: baseSize(8), color: '#ffffff', fontFamily: chosenFontBold, textTransform: 'uppercase' }}>{skill}</Text>
                                 </View>
                               ))}
                            </View>
                         </View>
                      ) : null}
                   </View>
                   <View style={{ width: '50%', paddingLeft: 30 }}>
                      {education && education.length > 0 ? (
                         <View>
                            <Text style={{ fontSize: baseSize(8), fontFamily: chosenFontBold, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 15 }}>Credentials</Text>
                            {education.map(edu => (
                              <View key={edu.id} style={{ marginBottom: 10 }}>
                                 <Text style={{ fontSize: baseSize(9.5), fontFamily: chosenFontBold, color: '#0f172a', textTransform: 'uppercase' }}>{edu.degree}</Text>
                                 <Text style={{ fontSize: baseSize(8.5), color: '#94a3b8', fontStyle: 'italic', marginTop: 2 }}>{edu.institution}</Text>
                              </View>
                            ))}
                         </View>
                      ) : null}
                   </View>
                </View>
             </View>
          
<View style={{ padding: 12 }}>
{renderProjects()}{renderCertifications()}{renderAwards()}{renderAchievements()}{renderLanguages()}
</View>
</View>
        ) : templateId === 'template-single-column-5' ? (
          <View style={{ flexDirection: 'column', flexGrow: 1, backgroundColor: '#f8fafc', padding: 40 }}>
             {/* Bold Professional Header */}
             <View style={{ borderBottomWidth: 8, borderBottomColor: '#0f172a', paddingBottom: 30, marginBottom: 40, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <View>
                   <Text style={{ fontSize: baseSize(44), fontFamily: chosenFontBold, color: '#0f172a', letterSpacing: -2, lineHeight: 0.9 }}>
                     {personalInfo.fullName ? personalInfo.fullName.split(' ')[0] : 'Your'}
                   </Text>
                   <Text style={{ fontSize: baseSize(44), fontFamily: chosenFont, color: '#0f172a', textDecorationColor: '#0f172a', letterSpacing: -2, opacity: 0.1, marginTop: 2 }}>
                     {personalInfo.fullName ? personalInfo.fullName.split(' ').slice(1).join(' ') : 'Name'}
                   </Text>
                   {personalInfo.jobTitle ? (
                     <View style={{ backgroundColor: '#0f172a', padding: '5 12', marginTop: 15, alignSelf: 'flex-start' }}>
                        <Text style={{ fontSize: baseSize(12), fontFamily: chosenFontBold, color: '#ffffff', textTransform: 'uppercase', letterSpacing: -0.5 }}>
                          {personalInfo.jobTitle}
                        </Text>
                     </View>
                   ) : null}
                </View>
                <View style={{ textAlign: 'right', gap: 5 }}>
                   {personalInfo.email ? <View style={{ backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#e2e8f0', padding: '3 8', borderRadius: 4 }}><Text style={{ fontSize: baseSize(8.5), fontFamily: chosenFontBold, color: '#0f172a' }}>{personalInfo.email}</Text></View> : null}
                   {personalInfo.phone ? <View style={{ backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#e2e8f0', padding: '3 8', borderRadius: 4 }}><Text style={{ fontSize: baseSize(8.5), fontFamily: chosenFontBold, color: '#0f172a' }}>{personalInfo.phone}</Text></View> : null}
                   {personalInfo.location ? <View style={{ backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#e2e8f0', padding: '3 8', borderRadius: 4 }}><Text style={{ fontSize: baseSize(8.5), fontFamily: chosenFontBold, color: '#0f172a' }}>{personalInfo.location}</Text></View> : null}
                </View>
             </View>

             {/* Corporate Body */}
             <View style={{ flexGrow: 1 }}>
                {/* Mission */}
                {personalInfo.bio ? (
                  <View style={{ backgroundColor: '#ffffff', padding: 25, borderRadius: 12, borderWidth: 1, borderColor: '#e2e8f0', marginBottom: 35, position: 'relative' }}>
                     <View style={{ position: 'absolute', top: 0, left: 0, width: 3, height: '100%', backgroundColor: '#0f172a' }} />
                     <Text style={{ fontSize: baseSize(8), fontFamily: chosenFontBold, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 12 }}>Mission & Value</Text>
                     <Text style={{ fontSize: baseSize(11), color: '#334155', lineHeight: 1.5, fontWeight: 'bold' }}>{personalInfo.bio}</Text>
                  </View>
                ) : null}

                {/* Record */}
                {experience && experience.length > 0 ? (
                  <View style={{ marginBottom: 35 }}>
                     <Text style={{ fontSize: baseSize(9), fontFamily: chosenFontBold, color: '#0f172a', textTransform: 'uppercase', letterSpacing: 3, borderBottomWidth: 2, borderBottomColor: '#0f172a', paddingBottom: 8, marginBottom: 20 }}>Professional Record</Text>
                     {experience.map(exp => (
                        <View key={exp.id} style={{ flexDirection: 'row', marginBottom: 25, gap: 20 }}>
                           <View style={{ width: 100 }}>
                              <Text style={{ fontSize: baseSize(10), fontFamily: chosenFontBold, color: '#0f172a' }}>{exp.startDate}</Text>
                              <Text style={{ fontSize: baseSize(8.5), fontFamily: chosenFontBold, color: '#cbd5e1', textTransform: 'uppercase', fontStyle: 'italic', marginTop: 2 }}>{exp.currentlyWorking ? 'PRESENT' : exp.endDate}</Text>
                           </View>
                           <View style={{ flex: 1 }}>
                              <Text style={{ fontSize: baseSize(14), fontFamily: chosenFontBold, color: '#0f172a', textTransform: 'uppercase', letterSpacing: -1 }}>{exp.position}</Text>
                              <Text style={{ fontSize: baseSize(9.5), fontFamily: chosenFontBold, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 2, fontStyle: 'italic', marginVertical: 5 }}>{exp.company}</Text>
                              {exp.description ? <Text style={{ fontSize: baseSize(10), color: '#475569', lineHeight: 1.4, fontWeight: 'bold' }}>{exp.description}</Text> : null}
                           </View>
                        </View>
                     ))}
                  </View>
                ) : null}

                {/* Tech Skills */}
                {skills && skills.length > 0 ? (
                  <View>
                     <Text style={{ fontSize: baseSize(9), fontFamily: chosenFontBold, color: '#0f172a', textTransform: 'uppercase', letterSpacing: 3, borderBottomWidth: 2, borderBottomColor: '#0f172a', paddingBottom: 8, marginBottom: 20 }}>Technical Expertise</Text>
                     <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                        {skills.map(cat => (
                           <View key={cat.id} style={{ width: '48%', marginBottom: 15 }}>
                              <Text style={{ fontSize: baseSize(8.5), fontFamily: chosenFontBold, color: '#cbd5e1', textTransform: 'uppercase', marginBottom: 5 }}>{cat.name}</Text>
                              <Text style={{ fontSize: baseSize(10), fontFamily: chosenFontBold, color: '#0f172a', textTransform: 'uppercase' }}>{cat.skills.join(' / ')}</Text>
                           </View>
                        ))}
                     </View>
                  </View>
                ) : null}
             </View>

             <View style={{ backgroundColor: '#0f172a', padding: 15, borderRadius: 12, textAlign: 'right', marginTop: 20 }}>
                <Text style={{ fontSize: baseSize(8), fontFamily: chosenFontBold, color: '#ffffff', opacity: 0.2, textTransform: 'uppercase', letterSpacing: 6 }}>Corporate Single Stream v5</Text>
             </View>
          
<View style={{ padding: 12 }}>
{renderProjects()}{renderCertifications()}{renderAwards()}{renderAchievements()}{renderLanguages()}
</View>
</View>
        ) : templateId === 'template-mixed-column-2' ? (
          <View style={{ flexDirection: 'column', flexGrow: 1, backgroundColor: '#fffbeb' }}>
            {/* Header */}
            <View style={{ padding: 40, borderBottomWidth: 1, borderBottomColor: 'rgba(6,95,70,0.1)', textAlign: 'center' }}>
              <Text style={{ fontSize: baseSize(24), fontFamily: chosenFontBold, color: '#064e3b', marginBottom: 5 }}>
                {personalInfo.fullName || 'Your Name'}
              </Text>
              {personalInfo.jobTitle ? (
                <Text style={{ fontSize: baseSize(9), fontFamily: chosenFontBold, color: '#059669', opacity: 0.6, textTransform: 'uppercase', letterSpacing: 3 }}>
                  {personalInfo.jobTitle}
                </Text>
              ) : null}
              <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 15, fontSize: baseSize(8), color: '#065f46', opacity: 0.7 }}>
                 {personalInfo.email ? <Text style={{ marginRight: 15 }}>{personalInfo.email}</Text> : null}
                 {personalInfo.phone ? <Text style={{ marginRight: 15 }}>{personalInfo.phone}</Text> : null}
                 {personalInfo.location ? <Text>{personalInfo.location}</Text> : null}
              </View>
            </View>

            {/* Content Area */}
            <View style={{ flexDirection: 'row', flexGrow: 1 }}>
              {/* Left Column (65%) */}
              <View style={{ width: '65%', padding: 30, borderRightWidth: 1, borderRightColor: 'rgba(6,95,70,0.05)' }}>
                 {personalInfo.bio ? (
                   <View style={{ marginBottom: 25 }}>
                     <Text style={{ fontSize: baseSize(10), fontFamily: chosenFontBold, color: '#064e3b', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8, borderBottomWidth: 1, borderBottomColor: 'rgba(6,95,70,0.2)', paddingBottom: 2 }}>Professional Narrative</Text>
                     <Text style={{ fontSize: baseSize(10.5), color: '#065f46', lineHeight: 1.4, fontStyle: 'italic' }}>{personalInfo.bio}</Text>
                   </View>
                 ) : null}

                 {experience && experience.length > 0 ? (
                   <View style={{ marginBottom: 25 }}>
                     <Text style={{ fontSize: baseSize(10), fontFamily: chosenFontBold, color: '#064e3b', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(6,95,70,0.2)', paddingBottom: 2 }}>Chronological Career</Text>
                     {experience.map(exp => (
                       <View key={exp.id} style={{ marginBottom: 15 }}>
                          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 }}>
                             <Text style={{ fontSize: baseSize(11), fontFamily: chosenFontBold, color: '#064e3b' }}>{exp.position}</Text>
                             <Text style={{ fontSize: baseSize(8), color: '#059669', opacity: 0.5 }}>{exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}</Text>
                          </View>
                          <Text style={{ fontSize: baseSize(9.5), fontFamily: chosenFontBold, color: '#059669', marginBottom: 4 }}>{exp.company}</Text>
                          {exp.description ? <Text style={{ fontSize: baseSize(9.5), color: '#065f46', lineHeight: 1.4 }}>{exp.description}</Text> : null}
                       </View>
                     ))}
                   </View>
                 ) : null}
              </View>

              {/* Right Column (35%) */}
              <View style={{ width: '35%', padding: 30, backgroundColor: 'rgba(6,95,70,0.03)' }}>
                 {skills && skills.length > 0 ? (
                    <View style={{ marginBottom: 25 }}>
                      <Text style={{ fontSize: baseSize(9), fontFamily: chosenFontBold, color: '#064e3b', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 10 }}>Core Expertise</Text>
                      {skills.map(cat => (
                        <View key={cat.id} style={{ marginBottom: 8 }}>
                           <Text style={{ fontSize: baseSize(7.5), fontFamily: chosenFontBold, color: '#059669', textTransform: 'uppercase', marginBottom: 4 }}>{cat.name}</Text>
                           <Text style={{ fontSize: baseSize(9), color: '#065f46', lineHeight: 1.4 }}>{cat.skills.join(', ')}</Text>
                        </View>
                      ))}
                    </View>
                 ) : null}

                 {education && education.length > 0 ? (
                    <View style={{ marginBottom: 25 }}>
                      <Text style={{ fontSize: baseSize(9), fontFamily: chosenFontBold, color: '#064e3b', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 10 }}>Academic History</Text>
                      {education.map(edu => (
                        <View key={edu.id} style={{ marginBottom: 8 }}>
                           <Text style={{ fontSize: baseSize(9.5), fontFamily: chosenFontBold, color: '#064e3b' }}>{edu.degree}</Text>
                           <Text style={{ fontSize: baseSize(8.5), color: '#059669', fontStyle: 'italic' }}>{edu.institution}</Text>
                           <Text style={{ fontSize: baseSize(7.5), color: '#059669', opacity: 0.5, marginTop: 1 }}>{edu.startDate} - {edu.endDate}</Text>
                        </View>
                      ))}
                    </View>
                 ) : null}

                 {languages && languages.length > 0 ? (
                    <View>
                      <Text style={{ fontSize: baseSize(9), fontFamily: chosenFontBold, color: '#064e3b', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 10 }}>Linguistic</Text>
                      {languages.map(lang => (
                        <View key={lang.id} style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: 'rgba(6,95,70,0.05)', paddingBottom: 2, marginBottom: 4 }}>
                          <Text style={{ fontSize: baseSize(9), color: '#065f46', fontStyle: 'italic' }}>{lang.name}</Text>
                          <Text style={{ fontSize: baseSize(8), fontFamily: chosenFontBold, color: '#059669', opacity: 0.4 }}>{lang.proficiency}</Text>
                        </View>
                      ))}
                    </View>
                 ) : null}
              </View>
            </View>
          
<View style={{ padding: 12 }}>
{renderProjects()}{renderCertifications()}{renderAwards()}{renderAchievements()}
</View>
</View>
        ) : templateId === 'template-mixed-column-3' ? (
          <View style={{ flexDirection: 'column', flexGrow: 1, backgroundColor: '#ffffff' }}>
            {/* Split Header */}
            <View style={{ flexDirection: 'row', height: 120, borderBottomWidth: 6, borderBottomColor: '#0f172a' }}>
              <View style={{ width: '40%', backgroundColor: '#0f172a', padding: 25, justifyContent: 'center' }}>
                <Text style={{ fontSize: baseSize(24), fontFamily: chosenFontBold, color: '#ffffff', textTransform: 'uppercase', letterSpacing: -0.5, lineHeight: 1.1 }}>
                  {personalInfo.fullName || 'Your Name'}
                </Text>
                <View style={{ marginTop: 8, fontSize: baseSize(8), color: '#ffffff', opacity: 0.6, letterSpacing: 1 }}>
                   {personalInfo.email ? <Text>{personalInfo.email}</Text> : null}
                   {personalInfo.phone ? <Text>{personalInfo.phone}</Text> : null}
                </View>
              </View>
              <View style={{ width: '60%', padding: 25, justifyContent: 'center' }}>
                {personalInfo.jobTitle ? (
                  <Text style={{ fontSize: baseSize(11), fontFamily: chosenFontBold, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 3, marginBottom: 8 }}>
                    {personalInfo.jobTitle}
                  </Text>
                ) : null}
                {personalInfo.bio ? (
                  <Text style={{ fontSize: baseSize(9.5), color: '#475569', lineHeight: 1.4 }}>{personalInfo.bio}</Text>
                ) : null}
              </View>
            </View>

            {/* Body */}
            <View style={{ padding: 30, flexGrow: 1 }}>
               {/* Experience - Single Column */}
               {experience && experience.length > 0 ? (
                 <View style={{ marginBottom: 30 }}>
                    <View style={{ backgroundColor: '#0f172a', padding: '4 10', alignSelf: 'flex-start', marginBottom: 15 }}>
                      <Text style={{ fontSize: baseSize(9), fontFamily: chosenFontBold, color: '#ffffff', textTransform: 'uppercase', letterSpacing: 1.5 }}>Experience / History</Text>
                    </View>
                    {experience.map(exp => (
                      <View key={exp.id} style={{ marginBottom: 15, paddingLeft: 15, borderLeftWidth: 2, borderLeftColor: '#f1f5f9' }}>
                         <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 }}>
                            <View>
                               <Text style={{ fontSize: baseSize(11), fontFamily: chosenFontBold, color: '#0f172a', textTransform: 'uppercase' }}>{exp.position}</Text>
                               <Text style={{ fontSize: baseSize(9), fontFamily: chosenFontBold, color: '#94a3b8', textTransform: 'uppercase', marginTop: 2 }}>{exp.company}</Text>
                            </View>
                            <View style={{ backgroundColor: '#f1f5f9', padding: '2 6' }}>
                               <Text style={{ fontSize: baseSize(8.5), fontFamily: chosenFontBold, color: '#0f172a' }}>{exp.startDate} - {exp.currentlyWorking ? 'NOW' : exp.endDate}</Text>
                            </View>
                         </View>
                         {exp.description ? <Text style={{ fontSize: baseSize(9.5), color: '#475569', lineHeight: 1.4, fontStyle: 'italic', fontWeight: 'bold' }}>{exp.description}</Text> : null}
                      </View>
                    ))}
                 </View>
               ) : null}

               {/* Bottom Grid - 2 Columns */}
               <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  {/* Skills */}
                  <View style={{ width: '48%' }}>
                    {skills && skills.length > 0 ? (
                      <View>
                        <View style={{ backgroundColor: '#0f172a', padding: '4 10', alignSelf: 'flex-start', marginBottom: 12 }}>
                           <Text style={{ fontSize: baseSize(9), fontFamily: chosenFontBold, color: '#ffffff', textTransform: 'uppercase', letterSpacing: 1.5 }}>Skill Stack</Text>
                        </View>
                        {skills.map(cat => (
                          <View key={cat.id} style={{ marginBottom: 8 }}>
                             <Text style={{ fontSize: baseSize(8.5), fontFamily: chosenFontBold, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 3, borderLeftWidth: 2, borderLeftColor: '#e2e8f0', paddingLeft: 6 }}>{cat.name}</Text>
                             <Text style={{ fontSize: baseSize(9), color: '#334155', lineHeight: 1.3 }}>{cat.skills.join(', ')}</Text>
                          </View>
                        ))}
                      </View>
                    ) : null}
                  </View>

                  {/* Projects/Certifications */}
                  <View style={{ width: '48%' }}>
                    {projects && projects.length > 0 ? (
                       <View>
                        <View style={{ backgroundColor: '#0f172a', padding: '4 10', alignSelf: 'flex-start', marginBottom: 12 }}>
                           <Text style={{ fontSize: baseSize(9), fontFamily: chosenFontBold, color: '#ffffff', textTransform: 'uppercase', letterSpacing: 1.5 }}>Case Studies</Text>
                        </View>
                        {projects.map(proj => (
                          <View key={proj.id} style={{ marginBottom: 10, borderBottomWidth: 1, borderBottomStyle: 'dotted', borderBottomColor: '#cbd5e1', paddingBottom: 5 }}>
                             <Text style={{ fontSize: baseSize(9.5), fontFamily: chosenFontBold, color: '#0f172a', textTransform: 'uppercase', marginBottom: 3 }}>{proj.title}</Text>
                             {proj.description ? <Text style={{ fontSize: baseSize(8.5), color: '#64748b', lineHeight: 1.3 }}>{proj.description}</Text> : null}
                          </View>
                        ))}
                       </View>
                    ) : null}
                  </View>
               </View>
            </View>
          
<View style={{ padding: 12 }}>
{renderCertifications()}{renderAwards()}{renderAchievements()}{renderLanguages()}
</View>
</View>
        ) : templateId === 'template-mixed-column-4' ? (
          <View style={{ flexDirection: 'column', flexGrow: 1, backgroundColor: '#ffffff', padding: 40, textAlign: 'center' }}>
             {/* Header */}
             <View style={{ marginBottom: 50 }}>
                <Text style={{ fontSize: baseSize(36), fontFamily: chosenFont, color: '#881337', textTransform: 'uppercase', letterSpacing: -1, lineHeight: 1 }}>
                  {personalInfo.fullName || 'Your Name'}
                </Text>
                {personalInfo.jobTitle ? (
                  <Text style={{ fontSize: baseSize(9), fontFamily: chosenFontBold, color: '#be123c', opacity: 0.5, textTransform: 'uppercase', letterSpacing: 5, marginTop: 8 }}>
                    {personalInfo.jobTitle}
                  </Text>
                ) : null}
                <View style={{ width: 40, height: 1, backgroundColor: 'rgba(136,19,55,0.1)', alignSelf: 'center', marginVertical: 15 }} />
                <View style={{ flexDirection: 'row', justifyContent: 'center', fontSize: baseSize(8.5), color: '#881337', opacity: 0.6, textTransform: 'uppercase', letterSpacing: 2 }}>
                   {personalInfo.email ? <Text style={{ marginRight: 20 }}>{personalInfo.email}</Text> : null}
                   {personalInfo.location ? <Text style={{ marginRight: 20 }}>{personalInfo.location}</Text> : null}
                   {personalInfo.phone ? <Text>{personalInfo.phone}</Text> : null}
                </View>
             </View>

             {/* Content Area */}
             <View style={{ textAlign: 'left' }}>
                {/* Profile */}
                {personalInfo.bio ? (
                  <View style={{ flexDirection: 'row', marginBottom: 40 }}>
                     <View style={{ width: 80, alignItems: 'flex-end', paddingTop: 2 }}>
                        <Text style={{ fontSize: baseSize(8), fontFamily: chosenFontBold, color: 'rgba(136,19,55,0.3)', textTransform: 'uppercase', letterSpacing: 2 }}>Profile</Text>
                     </View>
                     <View style={{ flex: 1, paddingLeft: 40 }}>
                        <Text style={{ fontSize: baseSize(11.5), color: '#881337', fontStyle: 'italic', lineHeight: 1.5, opacity: 0.8 }}>{personalInfo.bio}</Text>
                     </View>
                  </View>
                ) : null}

                {/* Experience */}
                {experience && experience.length > 0 ? (
                  <View style={{ marginBottom: 40 }}>
                     <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                        <View style={{ width: 80, alignItems: 'flex-end' }}>
                           <Text style={{ fontSize: baseSize(8), fontFamily: chosenFontBold, color: 'rgba(136,19,55,0.3)', textTransform: 'uppercase', letterSpacing: 2 }}>Career</Text>
                        </View>
                        <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(136,19,55,0.05)', marginLeft: 40 }} />
                     </View>
                     <View style={{ flexDirection: 'column' }}>
                       {experience.map(exp => (
                         <View key={exp.id} style={{ flexDirection: 'row', marginBottom: 25 }}>
                            <View style={{ width: 80, alignItems: 'flex-end', paddingTop: 1 }}>
                               <Text style={{ fontSize: baseSize(7.5), fontFamily: chosenFontBold, color: 'rgba(136,19,55,0.4)', textTransform: 'uppercase' }}>{exp.startDate} - {exp.currentlyWorking ? 'PRST' : exp.endDate}</Text>
                            </View>
                            <View style={{ flex: 1, paddingLeft: 40 }}>
                               <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                                  <Text style={{ fontSize: baseSize(11), fontFamily: chosenFontBold, color: '#881337', textTransform: 'uppercase' }}>{exp.position}</Text>
                                  <Text style={{ fontSize: baseSize(8), fontFamily: chosenFontBold, color: '#be123c', opacity: 0.6, fontStyle: 'italic' }}>{exp.company}</Text>
                               </View>
                               <Text style={{ fontSize: baseSize(9.5), color: '#881337', lineHeight: 1.4, opacity: 0.7 }}>{exp.description}</Text>
                            </View>
                         </View>
                       ))}
                     </View>
                  </View>
                ) : null}

                {/* Split Bottom */}
                <View style={{ flexDirection: 'row', borderTopWidth: 1, borderTopColor: 'rgba(136,19,55,0.05)', paddingTop: 30 }}>
                   <View style={{ width: '50%', paddingRight: 40 }}>
                      {education && education.length > 0 ? (
                        <View>
                           <Text style={{ fontSize: baseSize(8), fontFamily: chosenFontBold, color: 'rgba(136,19,55,0.3)', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 15 }}>Academic</Text>
                           {education.map(edu => (
                              <View key={edu.id} style={{ marginBottom: 12 }}>
                                 <Text style={{ fontSize: baseSize(10), fontFamily: chosenFontBold, color: '#881337', textTransform: 'uppercase', marginBottom: 2 }}>{edu.degree}</Text>
                                 <Text style={{ fontSize: baseSize(8.5), fontFamily: chosenFontBold, color: '#be123c', opacity: 0.4, textTransform: 'uppercase' }}>{edu.institution}</Text>
                                 <Text style={{ fontSize: baseSize(7.5), color: 'rgba(136,19,55,0.2)', marginTop: 2 }}>{edu.startDate} - {edu.endDate}</Text>
                              </View>
                           ))}
                        </View>
                      ) : null}
                   </View>
                   <View style={{ width: '50%' }}>
                      {skills && skills.length > 0 ? (
                        <View>
                           <Text style={{ fontSize: baseSize(8), fontFamily: chosenFontBold, color: 'rgba(136,19,55,0.3)', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 15 }}>Expertise</Text>
                           <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                             {skills.flatMap(cat => cat.skills).map((skill, idx) => (
                               <View key={idx} style={{ borderWidth: 1, borderColor: 'rgba(136,19,55,0.1)', paddingVertical: 2, paddingHorizontal: 6, borderRadius: 10, marginRight: 4, marginBottom: 4 }}>
                                  <Text style={{ fontSize: baseSize(8), color: '#881337', opacity: 0.7, textTransform: 'uppercase', fontWeight: 'bold' }}>{skill}</Text>
                               </View>
                             ))}
                           </View>
                        </View>
                      ) : null}
                   </View>
                </View>
             </View>
             <Text style={{ position: 'absolute', bottom: 40, left: 40, width: '100%', fontSize: baseSize(7), color: 'rgba(136,19,55,0.1)', textTransform: 'uppercase', letterSpacing: 8, textAlign: 'center' }}>Minimalist Design Concept v4</Text>
          
<View style={{ padding: 12 }}>
{renderProjects()}{renderCertifications()}{renderAwards()}{renderAchievements()}{renderLanguages()}
</View>
</View>
        ) : templateId === 'template-mixed-column-5' ? (
          <View style={{ flexDirection: 'column', flexGrow: 1, backgroundColor: '#f1f5f9' }}>
             {/* Header Strip */}
             <View style={{ height: 4, backgroundColor: '#6d28d9' }} />
             <View style={{ backgroundColor: '#ffffff', padding: 30, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ede9fe' }}>
                <View>
                   <Text style={{ fontSize: baseSize(28), fontFamily: chosenFontBold, color: '#0f172a', letterSpacing: -1 }}>
                     {personalInfo.fullName || 'Your Name'}
                   </Text>
                   {personalInfo.jobTitle ? (
                     <Text style={{ fontSize: baseSize(10), fontFamily: chosenFontBold, color: '#6d28d9', textTransform: 'uppercase', letterSpacing: 2, marginTop: 4 }}>
                       {personalInfo.jobTitle}
                     </Text>
                   ) : null}
                </View>
                <View style={{ textAlign: 'right', fontSize: baseSize(8.5), color: '#94a3b8', textTransform: 'uppercase' }}>
                   {personalInfo.email ? <Text style={{ color: '#1e293b', marginBottom: 2 }}>{personalInfo.email}</Text> : null}
                   {personalInfo.phone ? <Text style={{ marginBottom: 2 }}>{personalInfo.phone}</Text> : null}
                   {personalInfo.linkedin ? <Text style={{ color: '#6d28d9' }}>linkedin.com/in/{personalInfo.linkedin}</Text> : null}
                </View>
             </View>

             <View style={{ flexDirection: 'row', flexGrow: 1, padding: 20 }}>
                {/* Left (20%) */}
                <View style={{ width: '20%', padding: 10 }}>
                   {personalInfo.location ? (
                      <View style={{ marginBottom: 25 }}>
                         <Text style={{ fontSize: baseSize(7.5), fontFamily: chosenFontBold, color: '#cbd5e1', textTransform: 'uppercase', marginBottom: 6 }}>Base</Text>
                         <Text style={{ fontSize: baseSize(9), fontFamily: chosenFontBold, color: '#334155' }}>{personalInfo.location}</Text>
                      </View>
                   ) : null}
                   {languages && languages.length > 0 ? (
                      <View>
                         <Text style={{ fontSize: baseSize(7.5), fontFamily: chosenFontBold, color: '#cbd5e1', textTransform: 'uppercase', marginBottom: 12 }}>Lingo</Text>
                         {languages.map(lang => (
                           <View key={lang.id} style={{ marginBottom: 10 }}>
                              <Text style={{ fontSize: baseSize(8.5), fontFamily: chosenFontBold, color: '#1e293b', marginBottom: 3 }}>{lang.name}</Text>
                              <View style={{ height: 2, backgroundColor: '#e2e8f0', borderRadius: 1 }}>
                                 <View style={{ height: '100%', backgroundColor: '#8b5cf6', width: lang.proficiency === 'Native' ? '100%' : lang.proficiency === 'Fluent' ? '90%' : '70%' }} />
                              </View>
                           </View>
                         ))}
                      </View>
                   ) : null}
                </View>

                {/* Middle (60%) */}
                <View style={{ width: '60%', backgroundColor: '#ffffff', borderRadius: 12, padding: 25 }}>
                   {personalInfo.bio ? (
                      <View style={{ marginBottom: 30 }}>
                         <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                            <View style={{ width: 15, height: 4, backgroundColor: '#6d28d9', marginRight: 10 }} />
                            <Text style={{ fontSize: baseSize(9.5), fontFamily: chosenFontBold, color: '#0f172a', textTransform: 'uppercase' }}>Mission Statement</Text>
                         </View>
                         <Text style={{ fontSize: baseSize(9.5), color: '#475569', lineHeight: 1.5 }}>{personalInfo.bio}</Text>
                      </View>
                   ) : null}

                   {experience && experience.length > 0 ? (
                      <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                            <View style={{ width: 15, height: 4, backgroundColor: '#6d28d9', marginRight: 10 }} />
                            <Text style={{ fontSize: baseSize(9.5), fontFamily: chosenFontBold, color: '#0f172a', textTransform: 'uppercase' }}>Technical Professional</Text>
                         </View>
                         {experience.map(exp => (
                            <View key={exp.id} style={{ marginBottom: 25, borderLeftWidth: 2, borderLeftColor: '#ede9fe', paddingLeft: 12 }}>
                               <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 }}>
                                  <Text style={{ fontSize: baseSize(11), fontFamily: chosenFontBold, color: '#0f172a', textTransform: 'uppercase' }}>{exp.position}</Text>
                                  <Text style={{ fontSize: baseSize(8), fontFamily: fontMono, color: '#94a3b8' }}>{exp.startDate} - {exp.currentlyWorking ? 'NOW' : exp.endDate}</Text>
                               </View>
                               <Text style={{ fontSize: baseSize(9), fontFamily: chosenFontBold, color: '#7c3aed', opacity: 0.6, textTransform: 'uppercase', marginBottom: 5 }}>{exp.company}</Text>
                               {exp.description ? <Text style={{ fontSize: baseSize(9), color: '#475569', lineHeight: 1.4 }}>{exp.description}</Text> : null}
                            </View>
                         ))}
                      </View>
                   ) : null}
                </View>

                {/* Right (20%) */}
                <View style={{ width: '20%', padding: 10 }}>
                   {skills && skills.length > 0 ? (
                      <View style={{ marginBottom: 25 }}>
                         <Text style={{ fontSize: baseSize(7.5), fontFamily: chosenFontBold, color: '#cbd5e1', textTransform: 'uppercase', marginBottom: 12 }}>Stack</Text>
                         {skills.map(cat => (
                            <View key={cat.id} style={{ marginBottom: 12 }}>
                               <Text style={{ fontSize: baseSize(8.5), fontFamily: chosenFontBold, color: '#0f172a', marginBottom: 5 }}>{cat.name}</Text>
                               <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                 {cat.skills.map((s, idx) => (
                                    <View key={idx} style={{ backgroundColor: '#f5f3ff', padding: '2 4', borderRadius: 2, marginRight: 2, marginBottom: 2 }}>
                                       <Text style={{ fontSize: baseSize(7), color: '#6d28d9', fontFamily: chosenFontBold, textTransform: 'uppercase' }}>{s}</Text>
                                    </View>
                                 ))}
                               </View>
                            </View>
                         ))}
                      </View>
                   ) : null}
                   {education && education.length > 0 ? (
                      <View>
                        <Text style={{ fontSize: baseSize(7.5), fontFamily: chosenFontBold, color: '#cbd5e1', textTransform: 'uppercase', marginBottom: 12 }}>Credentials</Text>
                        {education.map(edu => (
                           <View key={edu.id} style={{ backgroundColor: '#0f172a', padding: 8, borderRadius: 6, marginBottom: 10 }}>
                              <Text style={{ fontSize: baseSize(8), fontFamily: chosenFontBold, color: '#ffffff', textTransform: 'uppercase' }}>{edu.degree}</Text>
                              <Text style={{ fontSize: baseSize(7), color: '#94a3b8', textTransform: 'uppercase', marginTop: 2 }}>{edu.institution}</Text>
                           </View>
                        ))}
                      </View>
                   ) : null}
                </View>
             </View>
             <View style={{ backgroundColor: '#020617', padding: 10, textAlign: 'right' }}>
                <Text style={{ fontSize: baseSize(7.5), fontFamily: chosenFontBold, color: '#6d28d9', opacity: 0.3, textTransform: 'uppercase', letterSpacing: 4 }}>System-6 Integrated Resume v5</Text>
             </View>
          
<View style={{ padding: 12 }}>
{renderProjects()}{renderCertifications()}{renderAwards()}{renderAchievements()}
</View>
</View>
        ) : templateId === 'template-column-4' ? (
          <View style={{ flexDirection: 'row', flexGrow: 1 }}>
            {/* Left Sidebar */}
            <View style={{ width: '30%', backgroundColor: '#f8fafc', borderRightWidth: 1, borderRightColor: '#f1f5f9', padding: 25 }}>
               <View style={{ marginBottom: 30 }}>
                  <Text style={{ fontSize: baseSize(20), fontFamily: chosenFontBold, color: '#1e293b', letterSpacing: -0.5 }}>
                    {personalInfo.fullName || 'Your Name'}
                  </Text>
                  {personalInfo.jobTitle ? (
                    <Text style={{ fontSize: baseSize(10), fontFamily: chosenFontBold, color: primaryColor, marginTop: 4, textTransform: 'uppercase', letterSpacing: 1 }}>
                      {personalInfo.jobTitle}
                    </Text>
                  ) : null}
               </View>

               {/* Contact */}
               <View style={{ marginBottom: 25 }}>
                 <Text style={{ fontSize: baseSize(8), fontFamily: chosenFontBold, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8 }}>Contact</Text>
                 <View style={{ fontSize: baseSize(8.5), color: '#475569', lineHeight: 1.4 }}>
                    {personalInfo.email ? <Text>{personalInfo.email}</Text> : null}
                    {personalInfo.phone ? <Text>{personalInfo.phone}</Text> : null}
                    {personalInfo.location ? <Text>{personalInfo.location}</Text> : null}
                    {personalInfo.linkedin ? <Text>{personalInfo.linkedin}</Text> : null}
                 </View>
               </View>

               {/* Skills */}
               {skills && skills.length > 0 ? (
                 <View style={{ marginBottom: 25 }}>
                   <Text style={{ fontSize: baseSize(8), fontFamily: chosenFontBold, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8 }}>Skills</Text>
                   {skills.map(cat => (
                     <View key={cat.id} style={{ marginBottom: 6 }}>
                        <Text style={{ fontSize: baseSize(8), fontFamily: chosenFontBold, color: '#64748b' }}>{cat.name}</Text>
                        <Text style={{ fontSize: baseSize(8), color: '#475569' }}>{cat.skills.join(', ')}</Text>
                     </View>
                   ))}
                 </View>
               ) : null}

               {/* Languages */}
               {languages && languages.length > 0 ? (
                 <View>
                   <Text style={{ fontSize: baseSize(8), fontFamily: chosenFontBold, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8 }}>Languages</Text>
                   {languages.map(lang => (
                     <View key={lang.id} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 }}>
                        <Text style={{ fontSize: baseSize(8.5), color: '#475569' }}>{lang.name}</Text>
                        <Text style={{ fontSize: baseSize(8), color: '#94a3b8', fontStyle: 'italic' }}>{lang.proficiency}</Text>
                     </View>
                   ))}
                 </View>
               ) : null}
            </View>

            {/* Main Content Area */}
            <View style={{ width: '70%', padding: 35, backgroundColor: '#ffffff', position: 'relative' }}>
               {/* Summary */}
               {personalInfo.bio ? (
                 <View style={{ marginBottom: 25 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                       <View style={{ width: 15, height: 1.5, backgroundColor: primaryColor, marginRight: 6 }} />
                       <Text style={{ fontSize: baseSize(10), fontFamily: chosenFontBold, color: primaryColor, textTransform: 'uppercase' }}>About Me</Text>
                    </View>
                    <Text style={{ fontSize: baseSize(10.5), color: '#334155', lineHeight: 1.5, paddingLeft: 21 }}>{personalInfo.bio}</Text>
                 </View>
               ) : null}

               {/* Experience */}
               {experience && experience.length > 0 ? (
                 <View style={{ marginBottom: 25 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                       <View style={{ width: 15, height: 1.5, backgroundColor: primaryColor, marginRight: 6 }} />
                       <Text style={{ fontSize: baseSize(10), fontFamily: chosenFontBold, color: primaryColor, textTransform: 'uppercase' }}>Professional Experience</Text>
                    </View>
                    <View style={{ paddingLeft: 21 }}>
                      {experience.map(exp => (
                        <View key={exp.id} style={{ marginBottom: 15, borderLeftWidth: 1, borderLeftColor: '#f1f5f9', paddingLeft: 12 }}>
                          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 }}>
                            <Text style={{ fontSize: baseSize(10.5), fontFamily: chosenFontBold, color: '#0f172a' }}>{exp.position}</Text>
                            <Text style={{ fontSize: baseSize(8.5), fontFamily: chosenFontBold, color: '#94a3b8' }}>{exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}</Text>
                          </View>
                          <Text style={{ fontSize: baseSize(9), fontFamily: chosenFontBold, color: primaryColor, marginBottom: 4 }}>{exp.company}{exp.location ? ` | ${exp.location}` : ''}</Text>
                          {exp.description ? <Text style={{ fontSize: baseSize(9), color: '#475569', lineHeight: 1.4 }}>{exp.description}</Text> : null}
                        </View>
                      ))}
                    </View>
                 </View>
               ) : null}

               {/* Education */}
               {education && education.length > 0 ? (
                 <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                       <View style={{ width: 15, height: 1.5, backgroundColor: primaryColor, marginRight: 6 }} />
                       <Text style={{ fontSize: baseSize(10), fontFamily: chosenFontBold, color: primaryColor, textTransform: 'uppercase' }}>Education</Text>
                    </View>
                    <View style={{ paddingLeft: 21, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                      {education.map(edu => (
                        <View key={edu.id} style={{ width: '48%', marginBottom: 10 }}>
                          <Text style={{ fontSize: baseSize(9.5), fontFamily: chosenFontBold, color: '#0f172a' }}>{edu.degree}</Text>
                          <Text style={{ fontSize: baseSize(8.5), color: '#64748b', fontStyle: 'italic' }}>{edu.institution}</Text>
                          <Text style={{ fontSize: baseSize(8), color: '#94a3b8' }}>{edu.startDate} - {edu.endDate}</Text>
                        </View>
                      ))}
                    </View>
                 </View>
               ) : null}

               <Text style={{ position: 'absolute', bottom: 30, left: 35, fontSize: 6.5, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: 2 }}>
                  Neo-Classic Design v.4
               </Text>
            </View>
          
<View style={{ padding: 12 }}>
{renderProjects()}{renderCertifications()}{renderAwards()}{renderAchievements()}
</View>
</View>
        ) : templateId === 'template-column-5' ? (
          <View style={{ flexDirection: 'column', flexGrow: 1, backgroundColor: '#ffffff' }}>
            {/* Header Block */}
            <View style={{ flexDirection: 'row', borderBottomWidth: 4, borderBottomColor: primaryColor, height: 100 }}>
              <View style={{ width: '66%', padding: 25, justifyContent: 'center' }}>
                <Text style={{ fontSize: baseSize(28), fontFamily: chosenFontBold, color: '#0f172a', textTransform: 'uppercase', letterSpacing: -1 }}>
                  {personalInfo.fullName || 'Your Name'}
                </Text>
                {personalInfo.jobTitle ? (
                  <Text style={{ fontSize: baseSize(11), fontFamily: chosenFontBold, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 3, marginTop: 4 }}>
                    {personalInfo.jobTitle}
                  </Text>
                ) : null}
              </View>
              <View style={{ width: '34%', backgroundColor: primaryColor, padding: 25, justifyContent: 'center' }}>
                 <View style={{ fontSize: baseSize(8.5), color: getContrastColor(primaryColor), lineHeight: 1.4 }}>
                    {personalInfo.email ? <Text>{personalInfo.email}</Text> : null}
                    {personalInfo.phone ? <Text>{personalInfo.phone}</Text> : null}
                    {personalInfo.location ? <Text>{personalInfo.location}</Text> : null}
                    {personalInfo.linkedin ? <Text>{personalInfo.linkedin}</Text> : null}
                 </View>
              </View>
            </View>

            {/* Split Content */}
            <View style={{ flexDirection: 'row', flexGrow: 1 }}>
               {/* Left Segment */}
               <View style={{ width: '30%', backgroundColor: '#fafafa', borderRightWidth: 1, borderRightColor: '#f1f5f9', padding: 25 }}>
                  {personalInfo.bio ? (
                    <View style={{ marginBottom: 25 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                        <View style={{ width: 3, height: 12, backgroundColor: primaryColor, marginRight: 6 }} />
                        <Text style={{ fontSize: baseSize(10), fontFamily: chosenFontBold, color: '#1e293b', textTransform: 'uppercase' }}>Summary</Text>
                      </View>
                      <Text style={{ fontSize: baseSize(9.5), color: '#475569', lineHeight: 1.4 }}>{personalInfo.bio}</Text>
                    </View>
                  ) : null}

                  {skills && skills.length > 0 ? (
                    <View style={{ marginBottom: 25 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                        <View style={{ width: 3, height: 12, backgroundColor: primaryColor, marginRight: 6 }} />
                        <Text style={{ fontSize: baseSize(10), fontFamily: chosenFontBold, color: '#1e293b', textTransform: 'uppercase' }}>Expertise</Text>
                      </View>
                      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {skills.flatMap(cat => cat.skills).map((skill, idx) => (
                          <View key={idx} style={{ backgroundColor: '#f1f5f9', padding: '2 6', borderRadius: 4, marginRight: 4, marginBottom: 4 }}>
                            <Text style={{ fontSize: baseSize(7.5), color: '#334155' }}>{skill}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  ) : null}

                  {languages && languages.length > 0 ? (
                    <View>
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                        <View style={{ width: 3, height: 12, backgroundColor: primaryColor, marginRight: 6 }} />
                        <Text style={{ fontSize: baseSize(10), fontFamily: chosenFontBold, color: '#1e293b', textTransform: 'uppercase' }}>Languages</Text>
                      </View>
                      {languages.map(lang => (
                        <View key={lang.id} style={{ marginBottom: 8 }}>
                          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 }}>
                             <Text style={{ fontSize: baseSize(9), fontFamily: chosenFontBold, color: '#334155' }}>{lang.name}</Text>
                             <Text style={{ fontSize: baseSize(8), color: primaryColor }}>{lang.proficiency}</Text>
                          </View>
                          <View style={{ height: 2, width: '100%', backgroundColor: '#e2e8f0', borderRadius: 1 }}>
                             <View style={{ height: '100%', backgroundColor: primaryColor, width: lang.proficiency === 'Native' ? '100%' : lang.proficiency === 'Fluent' ? '90%' : '75%' }} />
                          </View>
                        </View>
                      ))}
                    </View>
                  ) : null}
               </View>

               {/* Right Segment */}
               <View style={{ width: '70%', padding: 25 }}>
                  {experience && experience.length > 0 ? (
                    <View style={{ marginBottom: 30 }}>
                      <Text style={{ fontSize: baseSize(10), color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 15, fontStyle: 'italic' }}>Work Experience</Text>
                      {experience.map(exp => (
                        <View key={exp.id} style={{ marginBottom: 20 }}>
                          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                             <View>
                               <Text style={{ fontSize: baseSize(11), fontFamily: chosenFontBold, color: '#0f172a', textTransform: 'uppercase' }}>{exp.position}</Text>
                               <Text style={{ fontSize: baseSize(9.5), fontFamily: chosenFontBold, color: primaryColor, marginTop: 2 }}>{exp.company}</Text>
                             </View>
                             <View style={{ alignItems: 'flex-end' }}>
                               <View style={{ backgroundColor: '#0f172a', padding: '2 6', borderRadius: 3 }}>
                                 <Text style={{ fontSize: baseSize(8), color: '#ffffff', fontFamily: chosenFontBold }}>{exp.startDate} - {exp.currentlyWorking ? 'PRESENT' : exp.endDate}</Text>
                               </View>
                               {exp.location ? <Text style={{ fontSize: baseSize(7.5), color: '#94a3b8', marginTop: 3 }}>{exp.location}</Text> : null}
                             </View>
                          </View>
                          {exp.description ? <Text style={{ fontSize: baseSize(9.5), color: '#475569', lineHeight: 1.5, marginTop: 6 }}>{exp.description}</Text> : null}
                        </View>
                      ))}
                    </View>
                  ) : null}

                  {projects && projects.length > 0 ? (
                    <View>
                       <Text style={{ fontSize: baseSize(10), color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 15, fontStyle: 'italic' }}>Impact Projects</Text>
                       <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                          {projects.map(proj => (
                            <View key={proj.id} style={{ width: '48%', backgroundColor: '#fafafa', padding: 8, borderRadius: 6, marginBottom: 10, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' }}>
                               <Text style={{ fontSize: baseSize(9), fontFamily: chosenFontBold, color: '#334155', textTransform: 'uppercase', marginBottom: 4 }}>{proj.title}</Text>
                               {proj.description ? <Text style={{ fontSize: baseSize(8), color: '#64748b', lineHeight: 1.3 }}>{proj.description}</Text> : null}
                            </View>
                          ))}
                       </View>
                    </View>
                  ) : null}
               </View>
            </View>

            <View style={{ backgroundColor: '#0f172a', padding: 10, textAlign: 'right' }}>
               <Text style={{ fontSize: baseSize(8), color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', letterSpacing: 4 }}>Modern Split Design v.5</Text>
            </View>
          
<View style={{ padding: 12 }}>
{renderCertifications()}{renderAwards()}{renderAchievements()}
</View>
</View>
        ) : templateId === 'template-two-colum-3' ? (
          <View style={{ flexDirection: 'row', flexGrow: 1 }}>
            {/* Left Sidebar: Bold Color Block */}
            <View style={{ width: '30%', backgroundColor: primaryColor, color: '#ffffff', padding: 25, flexDirection: 'column', justifyContent: 'space-between' }}>
              <View>
                <View style={{ marginBottom: 30 }}>
                  <Text style={{ fontSize: baseSize(24), fontFamily: chosenFontBold, color: '#ffffff', textTransform: 'uppercase', letterSpacing: -1, lineHeight: 1.1 }}>
                    {personalInfo.fullName || 'Your Name'}
                  </Text>
                  {personalInfo.jobTitle ? (
                    <View style={{ marginTop: 8, borderTopWidth: 1.5, borderTopColor: 'rgba(255,255,255,0.3)', paddingTop: 6 }}>
                      <Text style={{ fontSize: baseSize(10), fontFamily: chosenFontBold, color: '#ffffff', opacity: 0.85, textTransform: 'uppercase', letterSpacing: 1.5 }}>
                        {personalInfo.jobTitle}
                      </Text>
                    </View>
                  ) : null}
                </View>

                {/* Contact */}
                <View style={{ marginBottom: 30, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.2)', paddingTop: 15 }}>
                  <Text style={{ fontSize: baseSize(9), fontFamily: chosenFontBold, color: '#ffffff', opacity: 0.6, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 }}>Contact</Text>
                  <View style={{ fontSize: baseSize(9), color: '#ffffff', lineHeight: 1.4 }}>
                    {personalInfo.phone ? <Text>{personalInfo.phone}</Text> : null}
                    {personalInfo.email ? <Text>{personalInfo.email}</Text> : null}
                    {personalInfo.linkedin ? <Text>{personalInfo.linkedin}</Text> : null}
                    {personalInfo.location ? <Text>{personalInfo.location}</Text> : null}
                  </View>
                </View>

                {/* Expertise */}
                {skills && skills.filter(cat => cat.skills && cat.skills.length > 0).length > 0 ? (
                  <View style={{ marginBottom: 30, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.2)', paddingTop: 15 }}>
                    <Text style={{ fontSize: baseSize(9), fontFamily: chosenFontBold, color: '#ffffff', opacity: 0.6, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 }}>Expertise</Text>
                    {skills.filter(cat => cat.skills && cat.skills.length > 0).map(cat => (
                      <View key={cat.id} style={{ marginBottom: 8 }}>
                        <Text style={{ fontSize: baseSize(8), fontFamily: chosenFontBold, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginBottom: 2 }}>{cat.name}</Text>
                        <Text style={{ fontSize: baseSize(8.5), color: '#ffffff', lineHeight: 1.3 }}>{cat.skills.join(' • ')}</Text>
                      </View>
                    ))}
                  </View>
                ) : null}

                {/* Languages */}
                {languages && languages.length > 0 ? (
                  <View style={{ marginBottom: 30, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.2)', paddingTop: 15 }}>
                    <Text style={{ fontSize: baseSize(9), fontFamily: chosenFontBold, color: '#ffffff', opacity: 0.6, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 }}>Languages</Text>
                    {languages.map(lang => (
                      <View key={lang.id} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.1)', paddingBottom: 2 }}>
                        <Text style={{ fontSize: baseSize(9), fontFamily: chosenFontBold, color: '#ffffff' }}>{lang.name}</Text>
                        <Text style={{ fontSize: baseSize(8), color: 'rgba(255,255,255,0.7)', fontStyle: 'italic' }}>{lang.proficiency}</Text>
                      </View>
                    ))}
                  </View>
                ) : null}
              </View>

              <Text style={{ fontSize: baseSize(7), color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>
                {new Date(data.updatedAt).getFullYear()} | Designed with Care
              </Text>
            </View>

            {/* Right Main Content */}
            <View style={{ width: '70%', backgroundColor: '#ffffff', padding: 35, flexDirection: 'column' }}>
              {/* Profile */}
              {personalInfo.bio ? (
                <View style={{ marginBottom: 25 }}>
                  <Text style={{ fontSize: baseSize(10), fontFamily: chosenFontBold, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: 3, marginBottom: 8 }}>Profile</Text>
                  <Text style={{ fontSize: baseSize(10.5), color: '#334155', lineHeight: 1.5 }}>{personalInfo.bio}</Text>
                </View>
              ) : null}

              {/* Experience */}
              {experience && experience.length > 0 ? (
                <View style={{ marginBottom: 25 }}>
                  <Text style={{ fontSize: baseSize(10), fontFamily: chosenFontBold, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: 3, marginBottom: 12 }}>Professional Experience</Text>
                  <View>
                    {experience.map(exp => (
                      <View key={exp.id} style={{ marginBottom: 15 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 }}>
                          <Text style={{ fontSize: baseSize(11), fontFamily: chosenFontBold, color: '#0f172a', textTransform: 'uppercase' }}>{exp.position}</Text>
                          <Text style={{ fontSize: baseSize(8.5), fontFamily: chosenFontBold, color: '#94a3b8' }}>{exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}</Text>
                        </View>
                        <Text style={{ fontSize: baseSize(9), fontFamily: chosenFontBold, color: primaryColor, marginBottom: 4 }}>{exp.company}{exp.location ? ` | ${exp.location}` : ''}</Text>
                        {exp.description ? <Text style={{ fontSize: baseSize(9.5), color: '#475569', lineHeight: 1.4 }}>{exp.description}</Text> : null}
                      </View>
                    ))}
                  </View>
                </View>
              ) : null}

              {/* Education */}
              {education && education.length > 0 ? (
                <View style={{ marginBottom: 25 }}>
                  <Text style={{ fontSize: baseSize(10), fontFamily: chosenFontBold, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: 3, marginBottom: 12 }}>Education</Text>
                  <View>
                    {education.map(edu => (
                      <View key={edu.id} style={{ marginBottom: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 }}>
                          <Text style={{ fontSize: baseSize(10), fontFamily: chosenFontBold, color: '#0f172a' }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</Text>
                          <Text style={{ fontSize: baseSize(8.5), fontFamily: chosenFontBold, color: '#94a3b8' }}>{edu.startDate} - {edu.endDate}</Text>
                        </View>
                        <Text style={{ fontSize: baseSize(9), color: '#64748b', fontStyle: 'italic' }}>{edu.institution}{edu.location ? `, ${edu.location}` : ''}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              ) : null}

              {/* Projects */}
              {projects && projects.length > 0 ? (
                <View>
                  <Text style={{ fontSize: baseSize(10), fontFamily: chosenFontBold, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: 3, marginBottom: 12 }}>Key Projects</Text>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    {projects.map(proj => (
                      <View key={proj.id} style={{ width: '48%', marginBottom: 10 }}>
                        <Text style={{ fontSize: baseSize(9.5), fontFamily: chosenFontBold, color: '#0f172a', borderBottomWidth: 1, borderBottomColor: '#f1f5f9', paddingBottom: 2, marginBottom: 4, textTransform: 'uppercase' }}>{proj.title}</Text>
                        {proj.description ? <Text style={{ fontSize: baseSize(8.5), color: '#475569', lineHeight: 1.3 }}>{proj.description}</Text> : null}
                      </View>
                    ))}
                  </View>
                </View>
              ) : null}
            </View>
          
<View style={{ padding: 12 }}>
{renderCertifications()}{renderAwards()}{renderAchievements()}
</View>
</View>
        ) : templateId === 'template-mixed-column' ? (
          <View style={{ flexDirection: 'column', flexGrow: 1 }}>
            {/* Header Area */}
            <View style={{ padding: 30, paddingBottom: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: baseSize(24), fontFamily: chosenFontBold, color: '#0f172a', letterSpacing: -0.5 }}>
                  {personalInfo.fullName || 'Your Name'}
                </Text>
                {personalInfo.jobTitle ? (
                  <Text style={{ fontSize: baseSize(12), fontFamily: chosenFontBold, color: primaryColor, marginTop: 2, textTransform: 'uppercase' }}>
                    {personalInfo.jobTitle}
                  </Text>
                ) : null}
              </View>
              <View style={{ textAlign: 'right', fontSize: baseSize(8.5), color: '#475569', lineHeight: 1.3, maxWidth: 200 }}>
                {personalInfo.phone ? <Text>{personalInfo.phone}</Text> : null}
                {personalInfo.email ? <Text>{personalInfo.email}</Text> : null}
                {personalInfo.linkedin ? <Text>{personalInfo.linkedin}</Text> : null}
                {personalInfo.website ? <Text>{personalInfo.website}</Text> : null}
                {personalInfo.location ? <Text>{personalInfo.location}</Text> : null}
              </View>
            </View>

            {/* Profile Summary with color background */}
            {personalInfo.bio ? (
              <View style={{ backgroundColor: primaryColor, padding: 30, paddingVertical: 20, marginVertical: 10 }}>
                <Text style={{ fontSize: baseSize(10), color: getContrastColor(primaryColor), lineHeight: 1.4 }}>
                  {personalInfo.bio}
                </Text>
              </View>
            ) : null}

            {/* Content Columns */}
            <View style={{ flexDirection: 'row', flexGrow: 1, padding: 30, paddingTop: 15 }}>
              {/* Left Column (experience, education) */}
              <View style={{ width: '65%', paddingRight: 20 }}>
                {/* Experience */}
                {experience && experience.length > 0 ? (
                  <View style={{ marginBottom: 20 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                      <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: primaryColor, marginRight: 6 }} />
                      <Text style={{ fontSize: baseSize(11), fontFamily: chosenFontBold, color: primaryColor, textTransform: 'uppercase', letterSpacing: 1 }}>
                        Experience
                      </Text>
                    </View>
                    {experience.map((exp) => (
                      <View key={exp.id} style={{ marginBottom: 12 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 }}>
                          <Text style={{ fontSize: baseSize(10), fontFamily: chosenFontBold, color: '#0f172a' }}>{exp.company}</Text>
                          <View style={{ backgroundColor: primaryColor, padding: '2 6', borderRadius: 4 }}>
                            <Text style={{ fontSize: baseSize(8), fontFamily: chosenFontBold, color: '#ffffff' }}>
                              {exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}
                            </Text>
                          </View>
                        </View>
                        <Text style={{ fontSize: baseSize(9), fontFamily: chosenFontBold, color: '#64748b', marginBottom: 2 }}>
                          {exp.position}{exp.location ? ` | ${exp.location}` : ''}
                        </Text>
                        {exp.description ? <Text style={styles.itemDesc}>{exp.description}</Text> : null}
                      </View>
                    ))}
                  </View>
                ) : null}

                {/* Education */}
                {education && education.length > 0 ? (
                  <View style={{ marginBottom: 20 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                      <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: primaryColor, marginRight: 6 }} />
                      <Text style={{ fontSize: baseSize(11), fontFamily: chosenFontBold, color: primaryColor, textTransform: 'uppercase', letterSpacing: 1 }}>
                        Education
                      </Text>
                    </View>
                    {education.map((edu) => (
                      <View key={edu.id} style={{ marginBottom: 12 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 }}>
                          <Text style={{ fontSize: baseSize(10), fontFamily: chosenFontBold, color: '#0f172a' }}>{edu.institution}</Text>
                          <View style={{ backgroundColor: primaryColor, padding: '2 6', borderRadius: 4 }}>
                            <Text style={{ fontSize: baseSize(8), fontFamily: chosenFontBold, color: '#ffffff' }}>
                              {edu.startDate} - {edu.currentlyStudying ? 'Present' : edu.endDate}
                            </Text>
                          </View>
                        </View>
                        <Text style={{ fontSize: baseSize(9), fontFamily: chosenFontBold, color: '#64748b' }}>
                          {edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}
                        </Text>
                        {edu.description ? <Text style={[styles.itemDesc, { marginTop: 4 }]}>{edu.description}</Text> : null}
                      </View>
                    ))}
                  </View>
                ) : null}

                {/* Projects */}
                {projects && projects.length > 0 ? (
                  <View style={{ marginBottom: 20 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                      <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: primaryColor, marginRight: 6 }} />
                      <Text style={{ fontSize: baseSize(11), fontFamily: chosenFontBold, color: primaryColor, textTransform: 'uppercase', letterSpacing: 1 }}>
                        Projects
                      </Text>
                    </View>
                    {projects.map((proj) => (
                      <View key={proj.id} style={{ marginBottom: 12 }}>
                        <Text style={{ fontSize: baseSize(10), fontFamily: chosenFontBold, color: '#0f172a', marginBottom: 2 }}>{proj.title}</Text>
                        {proj.description ? <Text style={styles.itemDesc}>{proj.description}</Text> : null}
                      </View>
                    ))}
                  </View>
                ) : null}

                {/* Achievements */}
                {achievements && achievements.length > 0 ? (
                  <View style={{ marginBottom: 20 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                      <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: primaryColor, marginRight: 6 }} />
                      <Text style={{ fontSize: baseSize(11), fontFamily: chosenFontBold, color: primaryColor, textTransform: 'uppercase', letterSpacing: 1 }}>
                        Achievements
                      </Text>
                    </View>
                    {achievements.map((ach) => (
                      <View key={ach.id} style={{ marginBottom: 8 }}>
                        <Text style={{ fontSize: baseSize(9.5), fontFamily: chosenFontBold, color: '#0f172a' }}>• {ach.name}</Text>
                        <Text style={{ fontSize: baseSize(8.5), color: '#64748b', marginLeft: 10 }}>{ach.date}</Text>
                      </View>
                    ))}
                  </View>
                ) : null}
              </View>

              {/* Right Column (skills, languages, etc) */}
              <View style={{ width: '35%', paddingLeft: 10 }}>
                {/* Skills */}
                {skills && skills.filter(cat => cat.skills && cat.skills.length > 0).length > 0 ? (
                  <View style={{ marginBottom: 20 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                      <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: primaryColor, marginRight: 6 }} />
                      <Text style={{ fontSize: baseSize(11), fontFamily: chosenFontBold, color: primaryColor, textTransform: 'uppercase', letterSpacing: 1 }}>
                        Skills
                      </Text>
                    </View>
                    {skills.filter(cat => cat.skills && cat.skills.length > 0).map(cat => (
                      <View key={cat.id} style={{ marginBottom: 8 }}>
                        <Text style={{ fontSize: baseSize(8.5), fontFamily: chosenFontBold, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 2 }}>
                          • {cat.name}
                        </Text>
                        <Text style={{ fontSize: baseSize(9), color: '#334155', lineHeight: 1.3 }}>
                          {cat.skills.join(', ')}
                        </Text>
                      </View>
                    ))}
                  </View>
                ) : null}

                {/* Languages */}
                {languages && languages.length > 0 ? (
                  <View style={{ marginBottom: 20 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                      <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: primaryColor, marginRight: 6 }} />
                      <Text style={{ fontSize: baseSize(11), fontFamily: chosenFontBold, color: primaryColor, textTransform: 'uppercase', letterSpacing: 1 }}>
                        Languages
                      </Text>
                    </View>
                    {languages.map((lang) => (
                      <View key={lang.id} style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#f1f5f9', paddingBottom: 2, marginBottom: 4 }}>
                        <Text style={{ fontSize: baseSize(9), fontFamily: chosenFontBold, color: '#334155' }}>
                          • {lang.name}
                        </Text>
                        <Text style={{ fontSize: baseSize(8), color: '#94a3b8', fontStyle: 'italic' }}>
                          {lang.proficiency}
                        </Text>
                      </View>
                    ))}
                  </View>
                ) : null}

                {/* Certifications */}
                {certifications && certifications.length > 0 ? (
                  <View style={{ marginBottom: 20 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                      <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: primaryColor, marginRight: 6 }} />
                      <Text style={{ fontSize: baseSize(11), fontFamily: chosenFontBold, color: primaryColor, textTransform: 'uppercase', letterSpacing: 1 }}>
                        Certifications
                      </Text>
                    </View>
                    {certifications.map((cert) => (
                      <View key={cert.id} style={{ marginBottom: 6 }}>
                        <Text style={{ fontSize: baseSize(9), fontFamily: chosenFontBold, color: '#334155' }}>• {cert.name}</Text>
                        <Text style={{ fontSize: baseSize(8), color: '#94a3b8' }}>{cert.issuer}</Text>
                      </View>
                    ))}
                  </View>
                ) : null}
              </View>
            </View>

            <Text style={{ position: 'absolute', bottom: 30, right: 30, fontSize: 7, color: '#cbd5e1', fontStyle: 'italic' }}>
              Mixed Column Design Concept
            </Text>
          
<View style={{ padding: 12 }}>
{renderAwards()}
</View>
</View>
        ) : templateId === 'template-two-colum-2' ? (
          <View style={{ flexDirection: 'row', flexGrow: 1 }}>
            {/* Left Column: off-white bg, left dynamic primary color accent border */}
            <View style={{
              width: '35%',
              backgroundColor: '#f8fafc',
              borderLeftWidth: 8,
              borderLeftColor: primaryColor,
              borderRightWidth: 1,
              borderRightColor: '#f1f5f9',
              padding: 20,
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
              <View>
                {/* Identity Name Card with dynamic primaryColor background */}
                <View style={{
                  backgroundColor: primaryColor,
                  borderRadius: 12,
                  padding: 14,
                  marginBottom: 16,
                  color: getContrastColor(primaryColor),
                }}>
                  {personalInfo.photoUrl && (
                    <View style={{ marginBottom: 8, alignItems: 'center' }}>
                      <Image src={personalInfo.photoUrl} style={{ width: baseSize(44), height: baseSize(44), borderRadius: 22, objectFit: 'cover' }} />
                    </View>
                  )}
                  <Text style={{ fontSize: baseSize(13), fontFamily: chosenFontBold, color: getContrastColor(primaryColor), marginBottom: 2 }}>
                    {personalInfo.fullName || 'Your Name'}
                  </Text>
                  {personalInfo.jobTitle ? (
                    <Text style={{ fontSize: baseSize(8.5), fontFamily: chosenFontBold, color: getContrastColor(primaryColor), opacity: 0.9 }}>
                      {personalInfo.jobTitle}
                    </Text>
                  ) : null}
                </View>

                {/* Contact list details */}
                <View style={{ marginBottom: 16, fontSize: baseSize(8), color: '#334155', lineHeight: 1.4 }}>
                  {personalInfo.phone ? <Text style={{ marginBottom: 4 }}>Phone: {personalInfo.phone}</Text> : null}
                  {personalInfo.email ? <Text style={{ marginBottom: 4 }}>Email: {personalInfo.email}</Text> : null}
                  {personalInfo.location ? <Text style={{ marginBottom: 4 }}>Loc: {personalInfo.location}</Text> : null}
                  {personalInfo.linkedin ? <Text style={{ marginBottom: 4 }}>LI: {personalInfo.linkedin}</Text> : null}
                  {personalInfo.github ? <Text style={{ marginBottom: 4 }}>Git: {personalInfo.github}</Text> : null}
                  {personalInfo.website ? <Text style={{ marginBottom: 4 }}>Web: {personalInfo.website}</Text> : null}
                </View>

                {/* Skills representation */}
                {skills && skills.filter(cat => cat.skills && cat.skills.length > 0).length > 0 ? (
                  <View style={{ marginBottom: 16 }}>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: primaryColor, paddingBottom: 2, marginBottom: 6 }}>
                      <Text style={{ fontSize: baseSize(9.5), fontFamily: chosenFontBold, color: primaryColor, textTransform: 'uppercase' }}>
                        Skills
                      </Text>
                    </View>
                    {skills.filter(cat => cat.skills && cat.skills.length > 0).map(cat => (
                      <View key={cat.id} style={{ marginBottom: 5 }}>
                        <Text style={{ fontSize: baseSize(7.5), fontFamily: chosenFontBold, color: '#475569', textTransform: 'uppercase', marginBottom: 2 }}>
                          {cat.name}
                        </Text>
                        <Text style={{ fontSize: baseSize(8), color: '#334155', lineHeight: 1.2 }}>
                          {cat.skills.join(', ')}
                        </Text>
                      </View>
                    ))}
                  </View>
                ) : null}

                {/* Languages representation */}
                {languages && languages.length > 0 ? (
                  <View style={{ marginBottom: 16 }}>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: primaryColor, paddingBottom: 2, marginBottom: 6 }}>
                      <Text style={{ fontSize: baseSize(9.5), fontFamily: chosenFontBold, color: primaryColor, textTransform: 'uppercase' }}>
                        Languages
                      </Text>
                    </View>
                    {languages.map((lang) => (
                      <View key={lang.id} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3, fontSize: baseSize(8) }}>
                        <Text style={{ fontFamily: chosenFontBold, color: '#334155' }}>{lang.name}</Text>
                        <Text style={{ color: '#64748b', fontStyle: 'italic' }}>{lang.proficiency}</Text>
                      </View>
                    ))}
                  </View>
                ) : null}
              </View>

              <Text style={{ fontSize: baseSize(7), color: '#94a3b8', fontStyle: 'italic' }}>
                Updated: {new Date(data.updatedAt).toLocaleDateString()}
              </Text>
            </View>

            {/* Right Column: Experience, Education, Projects, Certifications etc */}
            <View style={{ width: '65%', backgroundColor: '#ffffff', padding: 20, flexDirection: 'column', justifyContent: 'space-between' }}>
              <View>
                {/* Professional Summary Card */}
                {personalInfo.bio ? (
                  <View style={{
                    backgroundColor: primaryColor,
                    borderRadius: 12,
                    padding: 14,
                    marginBottom: 16,
                    color: getContrastColor(primaryColor),
                  }}>
                    <Text style={{ fontSize: baseSize(10), fontFamily: chosenFontBold, color: getContrastColor(primaryColor), textTransform: 'uppercase', marginBottom: 4 }}>
                      Professional Summary
                    </Text>
                    <Text style={{ fontSize: baseSize(8.5), color: getContrastColor(primaryColor), lineHeight: 1.35, opacity: 0.95 }}>
                      {personalInfo.bio}
                    </Text>
                  </View>
                ) : null}

                {/* Experience */}
                {experience && experience.length > 0 ? (
                  <View style={{ marginBottom: 12 }}>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: primaryColor, paddingBottom: 2, marginBottom: 6 }}>
                      <Text style={{ fontSize: baseSize(10), fontFamily: chosenFontBold, color: primaryColor, textTransform: 'uppercase' }}>
                        Experience
                      </Text>
                    </View>
                    {experience.map((exp) => (
                      <View key={exp.id} style={{ marginBottom: 6 }} wrap={false}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 }}>
                          <Text style={{ fontSize: baseSize(9.5), fontFamily: chosenFontBold, color: '#0f172a' }}>{exp.position}</Text>
                          <Text style={{ fontSize: baseSize(7.5), fontFamily: chosenFontBold, color: primaryColor }}>
                            {exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}
                          </Text>
                        </View>
                        <Text style={{ fontSize: baseSize(8.5), fontFamily: chosenFontBold, color: '#475569', marginBottom: 3 }}>
                          {exp.company}{exp.location ? `, ${exp.location}` : ''}
                        </Text>
                        {exp.description ? <Text style={{ fontSize: baseSize(8), color: '#334155', lineHeight: 1.3 }}>{exp.description}</Text> : null}
                      </View>
                    ))}
                  </View>
                ) : null}

                {/* Education */}
                {education && education.length > 0 ? (
                  <View style={{ marginBottom: 12 }}>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: primaryColor, paddingBottom: 2, marginBottom: 6 }}>
                      <Text style={{ fontSize: baseSize(10), fontFamily: chosenFontBold, color: primaryColor, textTransform: 'uppercase' }}>
                        Education
                      </Text>
                    </View>
                    {education.map((edu) => (
                      <View key={edu.id} style={{ marginBottom: 6 }} wrap={false}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 }}>
                          <Text style={{ fontSize: baseSize(9.5), fontFamily: chosenFontBold, color: '#0f172a' }}>
                            {edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}
                          </Text>
                          <Text style={{ fontSize: baseSize(7.5), fontFamily: chosenFontBold, color: primaryColor }}>
                            {edu.startDate} - {edu.currentlyStudying ? 'Present' : edu.endDate}
                          </Text>
                        </View>
                        <Text style={{ fontSize: baseSize(8.5), fontFamily: chosenFontBold, color: '#475569', marginBottom: 3 }}>
                          {edu.institution}{edu.location ? `, ${edu.location}` : ''}
                        </Text>
                        {edu.description ? <Text style={{ fontSize: baseSize(8), color: '#334155', lineHeight: 1.3 }}>{edu.description}</Text> : null}
                      </View>
                    ))}
                  </View>
                ) : null}

                {/* Projects */}
                {projects && projects.length > 0 ? (
                  <View style={{ marginBottom: 12 }}>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: primaryColor, paddingBottom: 2, marginBottom: 6 }}>
                      <Text style={{ fontSize: baseSize(10), fontFamily: chosenFontBold, color: primaryColor, textTransform: 'uppercase' }}>
                        Projects
                      </Text>
                    </View>
                    {projects.map((proj) => (
                      <View key={proj.id} style={{ marginBottom: 6 }} wrap={false}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 }}>
                          <Text style={{ fontSize: baseSize(9.5), fontFamily: chosenFontBold, color: '#0f172a' }}>{proj.title}</Text>
                          <Text style={{ fontSize: baseSize(7.5), fontFamily: chosenFontBold, color: primaryColor }}>
                            {proj.startDate} - {proj.isCurrent ? 'Present' : proj.endDate}
                          </Text>
                        </View>
                        <Text style={{ fontSize: baseSize(8.5), fontFamily: chosenFontBold, color: '#475569', marginBottom: 2 }}>{proj.role}</Text>
                        {proj.description ? <Text style={{ fontSize: baseSize(8), color: '#334155', lineHeight: 1.3 }}>{proj.description}</Text> : null}
                      </View>
                    ))}
                  </View>
                ) : null}

                {/* Achievements */}
                {achievements && achievements.length > 0 ? (
                  <View style={{ marginBottom: 12 }}>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: primaryColor, paddingBottom: 2, marginBottom: 6 }}>
                      <Text style={{ fontSize: baseSize(10), fontFamily: chosenFontBold, color: primaryColor, textTransform: 'uppercase' }}>
                        Achievements
                      </Text>
                    </View>
                    {achievements.map((ach) => (
                      <View key={ach.id} style={{ marginBottom: 4 }} wrap={false}>
                        <Text style={{ fontSize: baseSize(8.5), fontFamily: chosenFontBold, color: '#0f172a' }}>{ach.name}</Text>
                        <Text style={{ fontSize: baseSize(7.5), color: '#64748b' }}>{ach.date}</Text>
                      </View>
                    ))}
                  </View>
                ) : null}

                {/* Certifications and Awards */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  {certifications && certifications.length > 0 ? (
                    <View style={{ flex: 1, paddingRight: 10 }}>
                      <View style={{ borderBottomWidth: 1, borderBottomColor: primaryColor, paddingBottom: 2, marginBottom: 6 }}>
                        <Text style={{ fontSize: baseSize(9.5), fontFamily: chosenFontBold, color: primaryColor, textTransform: 'uppercase' }}>
                          Certifications
                        </Text>
                      </View>
                      {certifications.map((cert) => (
                        <View key={cert.id} style={{ marginBottom: 4 }}>
                          <Text style={{ fontSize: baseSize(8.5), fontFamily: chosenFontBold, color: '#0f172a' }}>{cert.name}</Text>
                          <Text style={{ fontSize: baseSize(7.5), color: '#64748b' }}>{cert.date} | {cert.issuer}</Text>
                        </View>
                      ))}
                    </View>
                  ) : null}

                  {awards && awards.length > 0 ? (
                    <View style={{ flex: 1, paddingLeft: 10 }}>
                      <View style={{ borderBottomWidth: 1, borderBottomColor: primaryColor, paddingBottom: 2, marginBottom: 6 }}>
                        <Text style={{ fontSize: baseSize(9.5), fontFamily: chosenFontBold, color: primaryColor, textTransform: 'uppercase' }}>
                          Awards
                        </Text>
                      </View>
                      {awards.map((award) => (
                        <View key={award.id} style={{ marginBottom: 4 }}>
                          <Text style={{ fontSize: baseSize(8.5), fontFamily: chosenFontBold, color: '#0f172a' }}>{award.name}</Text>
                          <Text style={{ fontSize: baseSize(7.5), color: '#64748b' }}>{award.date} | {award.issuer}</Text>
                        </View>
                      ))}
                    </View>
                  ) : null}
                </View>
              </View>

              <Text style={{ fontSize: baseSize(7), color: '#94a3b8', textAlign: 'right' }}>
                Formatted autonomously on Resume Designer
              </Text>
            </View>
          </View>
        ) : isTemplateTwoColumn1 ? (
          <View style={styles.templateTwoCol1Container}>
            {/* Left Column - Sidebar (Navy background, White font, Identity, languages, certifications) */}
            <View style={styles.templateTwoCol1Sidebar}>
              {personalInfo.photoUrl && (
                <View style={{ marginBottom: 12, alignItems: 'center' }}>
                  <Image src={personalInfo.photoUrl} style={[styles.avatar, { marginRight: 0, width: baseSize(64), height: baseSize(64), borderRadius: 32 }]} />
                </View>
              )}
              
              <View style={{ marginBottom: 14 }}>
                <Text style={{ fontSize: baseSize(15), fontFamily: chosenFontBold, color: '#ffffff', marginBottom: 2 }}>
                  {personalInfo.fullName || 'Your Name'}
                </Text>
                {personalInfo.jobTitle ? (
                  <Text style={{ fontSize: baseSize(9), fontFamily: chosenFontBold, color: '#93c5fd', textTransform: 'uppercase' }}>
                    {personalInfo.jobTitle}
                  </Text>
                ) : null}
              </View>

              {/* Identity Details Heading */}
              <View style={{ borderBottomWidth: 1, borderBottomColor: '#ffffff', paddingBottom: 3, marginBottom: 8, marginTop: 4 }}>
                <Text style={{ fontSize: baseSize(10), fontFamily: chosenFontBold, color: '#ffffff', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  Identity Details
                </Text>
              </View>

              {/* Contacts info list without icons */}
              <View style={{ paddingBottom: 4, marginBottom: 12 }}>
                {personalInfo.email ? <Text style={{ color: '#e2e8f0', fontSize: baseSize(7.5), marginBottom: 3 }}>{personalInfo.email}</Text> : null}
                {personalInfo.phone ? <Text style={{ color: '#e2e8f0', fontSize: baseSize(7.5), marginBottom: 3 }}>{personalInfo.phone}</Text> : null}
                {personalInfo.location ? <Text style={{ color: '#e2e8f0', fontSize: baseSize(7.5), marginBottom: 3 }}>{personalInfo.location}</Text> : null}
                {personalInfo.nationality ? <Text style={{ color: '#e2e8f0', fontSize: baseSize(7.5), marginBottom: 3 }}>{personalInfo.nationality}</Text> : null}
                {personalInfo.gender ? <Text style={{ color: '#e2e8f0', fontSize: baseSize(7.5), marginBottom: 3 }}>{personalInfo.gender}</Text> : null}
                {personalInfo.website ? <Text style={{ color: '#e2e8f0', fontSize: baseSize(7.5), marginBottom: 3 }}>{personalInfo.website}</Text> : null}
                {personalInfo.linkedin ? <Text style={{ color: '#e2e8f0', fontSize: baseSize(7.5), marginBottom: 3 }}>{personalInfo.linkedin}</Text> : null}
                {personalInfo.github ? <Text style={{ color: '#e2e8f0', fontSize: baseSize(7.5), marginBottom: 3 }}>{personalInfo.github}</Text> : null}
              </View>

              {personalInfo.bio ? (
                <View style={{ borderTopWidth: 1, borderTopColor: '#ffffff', paddingTop: 8, paddingBottom: 4, marginBottom: 12 }}>
                  <Text style={{ fontSize: baseSize(8), color: '#cbd5e1', fontStyle: 'italic', lineHeight: 1.3 }}>
                    {personalInfo.bio}
                  </Text>
                </View>
              ) : null}

              {renderSkills(true)}
              {renderLanguages(true)}
            </View>

            {/* Right Column - Main column (Experience, Projects, Education, Skills, Certifications) */}
            <View style={styles.templateTwoCol1Main}>
              {renderExperience()}
              {renderProjects()}
              {renderEducation()}
              {renderCertifications(false)}
              {renderAwards(false)}
              {renderAchievements(false)}
            </View>
          </View>
        ) : useTwoColumn ? (
          <View style={styles.container2Col}>
            {/* Main column */}
            <View style={styles.leftCol}>
              {renderExperience()}
              {renderProjects()}
              {renderEducation()}
            </View>
            
            {/* Sidebar column */}
            <View style={styles.rightCol}>
              {renderSkills()}
              {renderLanguages()}
              {renderCertifications()}
              {renderAwards()}
              {renderAchievements()}
            </View>
          </View>
        ) : (
          // Single-column flow layout (Classic Professional, Creative Bold, Academic Technical, ATS Optimized)
          <View>
            {renderExperience()}
            {renderProjects()}
            {renderEducation()}
            {renderSkills()}
            {templateId === 'ats-optimized' ? (
              <View>
                {renderCertifications()}
                {renderAwards()}
                {renderAchievements()}
                {renderLanguages()}
              </View>
            ) : (
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flex: 1, paddingRight: 12 }}>
                  {renderCertifications()}
                  {renderAwards()}
                </View>
                <View style={{ flex: 1, paddingLeft: 12 }}>
                  {renderAchievements()}
                  {renderLanguages()}
                </View>
              </View>
            )}
          </View>
        )}
      </Page>
    </Document>
  );
};
