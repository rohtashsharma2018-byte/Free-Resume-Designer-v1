const fs = require('fs');

function replaceLunar(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let lunarStart = content.indexOf(`        ) : templateId === 'ats-lunar' ? (`);
  let lunarEnd = content.indexOf(`        ) : templateId === 'ats-universe' ? (`);
  
  if (lunarStart !== -1 && lunarEnd !== -1) {
    if (filePath.includes('Preview')) {
      let replacement = `        ) : templateId === 'ats-lunar' ? (
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
                          {exp.company}{exp.location ? \` | \${exp.location}\` : ''}
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
                          <p className="text-[11px] text-slate-500">{edu.institution}{edu.location ? \` | \${edu.location}\` : ''}</p>
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
              <span>Formatted autonomously on Resume Designer</span>
              <span>Last active: {new Date(data.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>
`;
      content = content.substring(0, lunarStart) + replacement + content.substring(lunarEnd);
    } else {
      let replacement = `        ) : templateId === 'ats-lunar' ? (
          <View style={{ flexDirection: 'column', flexGrow: 1, backgroundColor: '#f8fafc', padding: 40, position: 'relative' }}>
            {/* Centered Minimal Header */}
            <View style={{ alignItems: 'center', marginBottom: 20 }}>
              {personalInfo.photoUrl ? (
                <Image 
                  src={personalInfo.photoUrl} 
                  style={{ width: 60, height: 60, borderRadius: 30, marginBottom: 10, borderWidth: 1, borderColor: '#e0e7ff' }}
                />
              ) : null}
              <Text style={{ fontSize: baseSize(26), fontFamily: chosenFontBold, color: '#0f172a', textTransform: 'uppercase', letterSpacing: 2 }}>
                {personalInfo.fullName || 'Your Name'}
              </Text>
              {personalInfo.jobTitle ? (
                <Text style={{ fontSize: baseSize(10), fontFamily: chosenFontBold, color: '#4f46e5', textTransform: 'uppercase', marginTop: 4, letterSpacing: 1.5 }}>
                  {personalInfo.jobTitle}
                </Text>
              ) : null}
              
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 8, fontSize: baseSize(8.5), color: '#64748b' }}>
                {personalInfo.email ? <Text>{personalInfo.email}</Text> : null}
                {personalInfo.phone ? <Text> • {personalInfo.phone}</Text> : null}
                {personalInfo.location ? <Text> • {personalInfo.location}</Text> : null}
                {personalInfo.nationality ? <Text> • Nat: {personalInfo.nationality}</Text> : null}
                {personalInfo.gender ? <Text> • Gender: {personalInfo.gender}</Text> : null}
                {personalInfo.website ? <Text> • {personalInfo.website}</Text> : null}
                {personalInfo.linkedin ? <Text> • {personalInfo.linkedin}</Text> : null}
                {personalInfo.github ? <Text> • GitHub: {personalInfo.github}</Text> : null}
              </View>

              {personalInfo.bio ? (
                <Text style={{ fontSize: baseSize(9.5), color: '#334155', lineHeight: 1.5, fontStyle: 'italic', textAlign: 'center', marginTop: 12, borderTopWidth: 1, borderTopColor: '#e2e8f0', paddingTop: 10 }}>
                  "{personalInfo.bio}"
                </Text>
              ) : null}
            </View>

            <View style={{ flexGrow: 1, gap: 20 }}>
              {/* Experience */}
              {experience && experience.length > 0 ? (
                <View style={{ gap: 8 }}>
                  <Text style={{ fontSize: baseSize(10.5), fontFamily: chosenFontBold, color: '#312e81', textTransform: 'uppercase', letterSpacing: 1, borderBottomWidth: 1, borderBottomColor: '#c7d2fe', paddingBottom: 4 }}>
                    Experience
                  </Text>
                  <View style={{ gap: 12 }}>
                    {experience.map((exp) => (
                      <View key={exp.id} style={{ gap: 2 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', gap: 10 }}>
                          <Text style={{ fontSize: baseSize(11), fontFamily: chosenFontBold, color: '#1e293b' }}>{exp.position}</Text>
                          <Text style={{ fontSize: baseSize(9), fontFamily: chosenFontBold, color: '#4f46e5' }}>
                            {exp.startDate} – {exp.currentlyWorking ? 'Present' : exp.endDate}
                          </Text>
                        </View>
                        <Text style={{ fontSize: baseSize(9.5), fontFamily: chosenFontBold, color: '#475569' }}>
                          {exp.company}{exp.location ? \` | \${exp.location}\` : ''}
                        </Text>
                        {exp.description ? (
                          <Text style={{ fontSize: baseSize(9), color: '#475569', lineHeight: 1.5, marginTop: 2 }}>
                            {exp.description}
                          </Text>
                        ) : null}
                      </View>
                    ))}
                  </View>
                </View>
              ) : null}

              {/* Projects */}
              {projects && projects.length > 0 ? (
                <View style={{ gap: 8 }}>
                  <Text style={{ fontSize: baseSize(10.5), fontFamily: chosenFontBold, color: '#312e81', textTransform: 'uppercase', letterSpacing: 1, borderBottomWidth: 1, borderBottomColor: '#c7d2fe', paddingBottom: 4 }}>
                    Projects
                  </Text>
                  <View style={{ gap: 10 }}>
                    {projects.map((proj) => (
                      <View key={proj.id} style={{ gap: 2 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', gap: 10 }}>
                          <Text style={{ fontSize: baseSize(11), fontFamily: chosenFontBold, color: '#1e293b' }}>{proj.title}</Text>
                          <Text style={{ fontSize: baseSize(9), fontFamily: chosenFontBold, color: '#4f46e5' }}>
                            {proj.startDate} – {proj.isCurrent ? 'Present' : proj.endDate}
                          </Text>
                        </View>
                        {proj.role ? (
                          <Text style={{ fontSize: baseSize(9.5), fontFamily: chosenFontBold, color: '#475569' }}>{proj.role}</Text>
                        ) : null}
                        {proj.description ? (
                          <Text style={{ fontSize: baseSize(9), color: '#475569', lineHeight: 1.5, marginTop: 2 }}>
                            {proj.description}
                          </Text>
                        ) : null}
                      </View>
                    ))}
                  </View>
                </View>
              ) : null}

              <View style={{ flexDirection: 'row', gap: 20 }}>
                {/* Left Half */}
                <View style={{ flex: 1, gap: 15 }}>
                  {skills && skills.length > 0 ? (
                    <View style={{ gap: 6 }}>
                      <Text style={{ fontSize: baseSize(10.5), fontFamily: chosenFontBold, color: '#312e81', textTransform: 'uppercase', letterSpacing: 1, borderBottomWidth: 1, borderBottomColor: '#c7d2fe', paddingBottom: 4 }}>
                        Skills
                      </Text>
                      <View style={{ gap: 4 }}>
                        {skills.map((cat) => (
                          <View key={cat.id} style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                            <Text style={{ fontSize: baseSize(9.5), fontFamily: chosenFontBold, color: '#334155', marginRight: 4 }}>{cat.name}:</Text>
                            <Text style={{ fontSize: baseSize(9.5), color: '#475569' }}>{cat.skills.join(', ')}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  ) : null}

                  {education && education.length > 0 ? (
                    <View style={{ gap: 6 }}>
                      <Text style={{ fontSize: baseSize(10.5), fontFamily: chosenFontBold, color: '#312e81', textTransform: 'uppercase', letterSpacing: 1, borderBottomWidth: 1, borderBottomColor: '#c7d2fe', paddingBottom: 4 }}>
                        Education
                      </Text>
                      <View style={{ gap: 6 }}>
                        {education.map((edu) => (
                          <View key={edu.id} style={{ gap: 1 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
                              <Text style={{ fontSize: baseSize(9.5), fontFamily: chosenFontBold, color: '#1e293b' }}>{edu.degree}</Text>
                              <Text style={{ fontSize: baseSize(8), color: '#4f46e5' }}>{edu.startDate} – {edu.endDate}</Text>
                            </View>
                            {edu.fieldOfStudy ? (
                              <Text style={{ fontSize: baseSize(9), color: '#334155' }}>{edu.fieldOfStudy}</Text>
                            ) : null}
                            <Text style={{ fontSize: baseSize(8.5), color: '#64748b' }}>{edu.institution}{edu.location ? \` | \${edu.location}\` : ''}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  ) : null}
                  
                  {awards && awards.length > 0 ? (
                    <View style={{ gap: 6 }}>
                      <Text style={{ fontSize: baseSize(10.5), fontFamily: chosenFontBold, color: '#312e81', textTransform: 'uppercase', letterSpacing: 1, borderBottomWidth: 1, borderBottomColor: '#c7d2fe', paddingBottom: 4 }}>
                        Awards
                      </Text>
                      <View style={{ gap: 4 }}>
                        {awards.map((award) => (
                          <View key={award.id} style={{ gap: 1 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
                              <Text style={{ fontSize: baseSize(9.5), fontFamily: chosenFontBold, color: '#1e293b' }}>{award.name}</Text>
                              <Text style={{ fontSize: baseSize(8), color: '#64748b' }}>{award.date}</Text>
                            </View>
                            <Text style={{ fontSize: baseSize(8.5), color: '#475569' }}>{award.issuer}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  ) : null}
                </View>

                {/* Right Half */}
                <View style={{ flex: 1, gap: 15 }}>
                  {certifications && certifications.length > 0 ? (
                    <View style={{ gap: 6 }}>
                      <Text style={{ fontSize: baseSize(10.5), fontFamily: chosenFontBold, color: '#312e81', textTransform: 'uppercase', letterSpacing: 1, borderBottomWidth: 1, borderBottomColor: '#c7d2fe', paddingBottom: 4 }}>
                        Certifications
                      </Text>
                      <View style={{ gap: 6 }}>
                        {certifications.map((cert) => (
                          <View key={cert.id} style={{ gap: 1 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
                              <Text style={{ fontSize: baseSize(9.5), fontFamily: chosenFontBold, color: '#1e293b' }}>{cert.name}</Text>
                              <Text style={{ fontSize: baseSize(8), color: '#64748b' }}>{cert.date}</Text>
                            </View>
                            <Text style={{ fontSize: baseSize(8.5), color: '#475569' }}>{cert.issuer}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  ) : null}

                  {languages && languages.length > 0 ? (
                    <View style={{ gap: 6 }}>
                      <Text style={{ fontSize: baseSize(10.5), fontFamily: chosenFontBold, color: '#312e81', textTransform: 'uppercase', letterSpacing: 1, borderBottomWidth: 1, borderBottomColor: '#c7d2fe', paddingBottom: 4 }}>
                        Languages
                      </Text>
                      <View style={{ gap: 3 }}>
                        {languages.map((lang) => (
                          <Text key={lang.id} style={{ fontSize: baseSize(9.5), color: '#334155' }}>
                            <Text style={{ fontFamily: chosenFontBold }}>{lang.name}</Text> ({lang.proficiency})
                          </Text>
                        ))}
                      </View>
                    </View>
                  ) : null}
                  
                  {achievements && achievements.length > 0 ? (
                    <View style={{ gap: 6 }}>
                      <Text style={{ fontSize: baseSize(10.5), fontFamily: chosenFontBold, color: '#312e81', textTransform: 'uppercase', letterSpacing: 1, borderBottomWidth: 1, borderBottomColor: '#c7d2fe', paddingBottom: 4 }}>
                        Highlights
                      </Text>
                      <View style={{ gap: 4 }}>
                        {achievements.map((ach) => (
                          <View key={ach.id} style={{ gap: 1 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
                              <Text style={{ fontSize: baseSize(9.5), fontFamily: chosenFontBold, color: '#1e293b' }}>{ach.name}</Text>
                              {ach.date ? <Text style={{ fontSize: baseSize(8), color: '#64748b' }}>{ach.date}</Text> : null}
                            </View>
                          </View>
                        ))}
                      </View>
                    </View>
                  ) : null}
                </View>
              </View>

            </View>

            {/* Bottom Identifier */}
            <View style={{ borderTopWidth: 1, borderTopColor: '#e2e8f0', paddingTop: 10, marginTop: 15, flexDirection: 'row', justifyContent: 'space-between', fontSize: baseSize(8.5), color: '#94a3b8', fontFamily: chosenFont }}>
              <Text>Formatted autonomously on Resume Designer ★ ATS Lunar</Text>
              <Text>Last active: {new Date(data.updatedAt).toLocaleDateString()}</Text>
            </View>
          </View>
`;
      content = content.substring(0, lunarStart) + replacement + content.substring(lunarEnd);
    }
    fs.writeFileSync(filePath, content);
    console.log(`Replaced Lunar in ${filePath}`);
  }
}

replaceLunar('src/components/ResumePreview.tsx');
replaceLunar('src/components/PDFDocument.tsx');
