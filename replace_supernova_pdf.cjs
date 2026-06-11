const fs = require('fs');

const content = fs.readFileSync('src/components/PDFDocument.tsx', 'utf-8');
const lines = content.split('\n');

const startStr = "        ) : templateId === 'ats-supernova' ? (";
const endStr = "        ) : templateId === 'ats-navy-classic' ? (";

const startIndex = lines.findIndex(l => l.includes(startStr));
const endIndex = lines.findIndex(l => l.includes(endStr));

if (startIndex === -1 || endIndex === -1) {
  console.log("Could not find start or end bounds.");
  process.exit(1);
}

const newTemplate = `        ) : templateId === 'ats-supernova' ? (
          <View style={{ flexDirection: 'column', flexGrow: 1, backgroundColor: '#fff1f2', padding: 0 }}>
            {/* Header */}
            <View style={{ backgroundColor: '#0f172a', paddingTop: 64, paddingBottom: 48, paddingHorizontal: 48, position: 'relative' }}>
               <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 8, backgroundColor: '#f43f5e' }} />
               
               <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                 <View style={{ maxWidth: 400, paddingRight: 16 }}>
                   <Text style={{ fontSize: 36, fontFamily: 'Helvetica-Bold', color: '#fff1f2', textTransform: 'uppercase', marginBottom: 12 }}>
                     {personalInfo.fullName || 'Your Name'}
                   </Text>
                   {personalInfo.jobTitle && (
                     <Text style={{ fontSize: 14, fontFamily: 'Helvetica-Bold', color: '#fb7185', textTransform: 'uppercase', letterSpacing: 2 }}>
                       {personalInfo.jobTitle}
                     </Text>
                   )}
                 </View>
                 {personalInfo.photoUrl && (
                   <Image 
                     src={{ uri: personalInfo.photoUrl, method: 'GET', body: '', headers: { 'Cache-Control': 'no-cache' } }} 
                     style={{ width: 96, height: 96, borderRadius: 48, objectFit: 'cover', borderWidth: 4, borderColor: '#1e293b' }}
                   />
                 )}
               </View>

               {personalInfo.bio && (
                 <Text style={{ marginTop: 32, fontSize: 11, color: '#cbd5e1', lineHeight: 1.6, fontFamily: 'Helvetica', maxWidth: 450 }}>
                   {personalInfo.bio}
                 </Text>
               )}
            </View>

            {/* Contact Details Bar */}
            <View style={{ backgroundColor: '#e11d48', color: '#ffffff', paddingVertical: 12, paddingHorizontal: 48, flexDirection: 'row', flexWrap: 'wrap', gap: 24, zIndex: 10 }}>
                {[
                  personalInfo.email,
                  personalInfo.phone,
                  personalInfo.location,
                  personalInfo.website,
                  personalInfo.linkedin,
                  personalInfo.github
                ].filter(Boolean).map((detail, idx) => (
                  <View key={idx} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#fda4af', marginRight: 6 }} />
                    <Text style={{ fontSize: 9, fontFamily: 'Helvetica-Bold' }}>{detail}</Text>
                  </View>
                ))}
            </View>

            {/* Main Content Area */}
            <View style={{ paddingHorizontal: 48, paddingVertical: 40, flex: 1 }}>
              
              {experience.length > 0 && (
                <View style={{ marginBottom: 32 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 2, borderBottomColor: '#fecdd3', paddingBottom: 8, marginBottom: 24 }}>
                    <View style={{ backgroundColor: '#ffe4e6', padding: 4, borderRadius: 4, marginRight: 4 }}>
                       <Text style={{ color: '#e11d48', fontFamily: 'Helvetica-Bold', fontSize: 16 }}>Exp</Text>
                    </View>
                    <Text style={{ fontSize: 18, fontFamily: 'Helvetica-Bold', color: '#0f172a', textTransform: 'uppercase' }}>
                      erience
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'column', gap: 24 }}>
                    {experience.map((exp: any) => (
                      <View key={exp.id} style={{ position: 'relative', paddingLeft: 24, borderLeftWidth: 2, borderLeftColor: '#e2e8f0', paddingBottom: 8 }}>
                        <View style={{ position: 'absolute', width: 12, height: 12, backgroundColor: '#f43f5e', borderRadius: 6, left: -7, top: 4, borderWidth: 3, borderColor: '#fff1f2' }} />
                        <View style={{ marginBottom: 6 }}>
                          <Text style={{ fontSize: 12, fontFamily: 'Helvetica-Bold', color: '#0f172a' }}>{exp.position ?? exp.title}</Text>
                          <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', marginTop: 4 }}>
                            <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#e11d48' }}>{exp.company}</Text>
                            {exp.location && (
                              <>
                                <Text style={{ fontSize: 10, color: '#cbd5e1', marginHorizontal: 8 }}>•</Text>
                                <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#475569' }}>{exp.location}</Text>
                              </>
                            )}
                            <Text style={{ fontSize: 10, color: '#cbd5e1', marginHorizontal: 8 }}>•</Text>
                            <Text style={{ fontSize: 10, fontFamily: 'Helvetica', color: '#64748b' }}>{exp.startDate} – {exp.currentlyWorking ? 'Present' : exp.endDate}</Text>
                          </View>
                        </View>
                        <Text style={{ fontSize: 9.5, color: '#334155', lineHeight: 1.5, fontFamily: 'Helvetica' }}>
                          {exp.description}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              {projects && projects.length > 0 && (
                <View style={{ marginBottom: 32 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 2, borderBottomColor: '#fecdd3', paddingBottom: 8, marginBottom: 24 }}>
                    <View style={{ backgroundColor: '#ffe4e6', padding: 4, borderRadius: 4, marginRight: 4 }}>
                       <Text style={{ color: '#e11d48', fontFamily: 'Helvetica-Bold', fontSize: 16 }}>Pro</Text>
                    </View>
                    <Text style={{ fontSize: 18, fontFamily: 'Helvetica-Bold', color: '#0f172a', textTransform: 'uppercase' }}>
                      jects
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'column', gap: 24 }}>
                    {projects.map((proj: any) => (
                      <View key={proj.id} style={{ position: 'relative', paddingLeft: 24, borderLeftWidth: 2, borderLeftColor: '#e2e8f0', paddingBottom: 8 }}>
                         <View style={{ marginBottom: 6 }}>
                          <Text style={{ fontSize: 12, fontFamily: 'Helvetica-Bold', color: '#0f172a' }}>{proj.title}</Text>
                          <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', marginTop: 4 }}>
                            {proj.role && <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#e11d48' }}>{proj.role}</Text>}
                            {proj.role && <Text style={{ fontSize: 10, color: '#cbd5e1', marginHorizontal: 8 }}>•</Text>}
                            <Text style={{ fontSize: 10, fontFamily: 'Helvetica', color: '#64748b' }}>{proj.startDate} – {proj.isCurrent ? 'Present' : proj.endDate}</Text>
                          </View>
                        </View>
                        <Text style={{ fontSize: 9.5, color: '#334155', lineHeight: 1.5, fontFamily: 'Helvetica', marginTop: 4 }}>
                          {proj.description}
                        </Text>
                        {proj.link && (
                          <Text style={{ fontSize: 9, color: '#e11d48', fontFamily: 'Helvetica-Bold', marginTop: 4 }}>
                            {proj.link}
                          </Text>
                        )}
                      </View>
                    ))}
                  </View>
                </View>
              )}

              {education.length > 0 && (
                <View style={{ marginBottom: 32 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 2, borderBottomColor: '#fecdd3', paddingBottom: 8, marginBottom: 24 }}>
                    <View style={{ backgroundColor: '#ffe4e6', padding: 4, borderRadius: 4, marginRight: 4 }}>
                       <Text style={{ color: '#e11d48', fontFamily: 'Helvetica-Bold', fontSize: 16 }}>Edu</Text>
                    </View>
                    <Text style={{ fontSize: 18, fontFamily: 'Helvetica-Bold', color: '#0f172a', textTransform: 'uppercase' }}>
                      cation
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
                    {education.map((edu: any) => (
                      <View key={edu.id} style={{ backgroundColor: '#ffffff', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#ffe4e6', width: '48%', position: 'relative' }}>
                        <View style={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', backgroundColor: '#fb7185' }} />
                        <Text style={{ fontSize: 12, fontFamily: 'Helvetica-Bold', color: '#0f172a', marginBottom: 4 }}>{edu.degree}</Text>
                        <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#e11d48', marginBottom: 8 }}>{edu.institution}</Text>
                        <Text style={{ fontSize: 8.5, color: '#64748b', fontFamily: 'Helvetica-Bold', textTransform: 'uppercase', letterSpacing: 1 }}>{edu.startDate} – {edu.endDate}</Text>
                        {edu.description && <Text style={{ fontSize: 8.5, color: '#475569', marginTop: 8, fontFamily: 'Helvetica' }}>{edu.description}</Text>}
                      </View>
                    ))}
                  </View>
                </View>
              )}

              {skills.length > 0 && (
                <View style={{ marginBottom: 32 }}>
                   <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 2, borderBottomColor: '#fecdd3', paddingBottom: 8, marginBottom: 24 }}>
                    <View style={{ backgroundColor: '#ffe4e6', padding: 4, borderRadius: 4, marginRight: 4 }}>
                       <Text style={{ color: '#e11d48', fontFamily: 'Helvetica-Bold', fontSize: 16 }}>Ski</Text>
                    </View>
                    <Text style={{ fontSize: 18, fontFamily: 'Helvetica-Bold', color: '#0f172a', textTransform: 'uppercase' }}>
                      lls
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                    {skills.map((skill: any) => (
                      <View key={skill.id} style={{ paddingHorizontal: 12, paddingVertical: 6, backgroundColor: '#0f172a', borderRadius: 4, borderBottomWidth: 2, borderBottomColor: '#334155' }}>
                        <Text style={{ color: '#fff1f2', fontSize: 9.5, fontFamily: 'Helvetica-Bold', letterSpacing: 0.5 }}>
                          {skill.name}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              {languages && languages.length > 0 && (
                <View style={{ marginBottom: 32 }}>
                   <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 2, borderBottomColor: '#fecdd3', paddingBottom: 8, marginBottom: 24 }}>
                    <View style={{ backgroundColor: '#ffe4e6', padding: 4, borderRadius: 4, marginRight: 4 }}>
                       <Text style={{ color: '#e11d48', fontFamily: 'Helvetica-Bold', fontSize: 16 }}>Lan</Text>
                    </View>
                    <Text style={{ fontSize: 18, fontFamily: 'Helvetica-Bold', color: '#0f172a', textTransform: 'uppercase' }}>
                      guages
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
                    {languages.map((lang: any) => (
                      <View key={lang.id} style={{ backgroundColor: '#ffffff', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#e2e8f0', width: 100, alignItems: 'center' }}>
                        <Text style={{ fontSize: 12, fontFamily: 'Helvetica-Bold', color: '#0f172a', textTransform: 'uppercase' }}>
                          {lang.name}
                        </Text>
                        <Text style={{ fontSize: 9, fontFamily: 'Helvetica-Bold', color: '#e11d48', textTransform: 'uppercase', marginTop: 4, letterSpacing: 1 }}>
                          {lang.proficiency}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              {certifications && certifications.length > 0 && (
                <View style={{ marginBottom: 32 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 2, borderBottomColor: '#fecdd3', paddingBottom: 8, marginBottom: 24 }}>
                    <View style={{ backgroundColor: '#ffe4e6', padding: 4, borderRadius: 4, marginRight: 4 }}>
                       <Text style={{ color: '#e11d48', fontFamily: 'Helvetica-Bold', fontSize: 16 }}>Cer</Text>
                    </View>
                    <Text style={{ fontSize: 18, fontFamily: 'Helvetica-Bold', color: '#0f172a', textTransform: 'uppercase' }}>
                      tifications
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
                    {certifications.map((cert: any) => (
                      <View key={cert.id} style={{ backgroundColor: '#ffffff', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#f1f5f9', width: '48%' }}>
                        <Text style={{ fontSize: 12, fontFamily: 'Helvetica-Bold', color: '#0f172a', marginBottom: 2 }}>{cert.name}</Text>
                        <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#e11d48', marginBottom: 4 }}>{cert.issuer}</Text>
                        <Text style={{ fontSize: 9, color: '#64748b', fontFamily: 'Helvetica-Bold', textTransform: 'uppercase', letterSpacing: 1 }}>{cert.date}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              {achievements && achievements.length > 0 && (
                 <View>
                   <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 2, borderBottomColor: '#fecdd3', paddingBottom: 8, marginBottom: 24 }}>
                    <View style={{ backgroundColor: '#ffe4e6', padding: 4, borderRadius: 4, marginRight: 4 }}>
                       <Text style={{ color: '#e11d48', fontFamily: 'Helvetica-Bold', fontSize: 16 }}>Awa</Text>
                    </View>
                    <Text style={{ fontSize: 18, fontFamily: 'Helvetica-Bold', color: '#0f172a', textTransform: 'uppercase' }}>
                      rds
                    </Text>
                   </View>
                   <View style={{ flexDirection: 'column', gap: 12 }}>
                     {achievements.map((ach: any) => (
                       <View key={ach.id} style={{ flexDirection: 'row', backgroundColor: '#f8fafc', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#f1f5f9' }}>
                         <Text style={{ color: '#f43f5e', fontSize: 12, fontFamily: 'Helvetica-Bold', marginRight: 12, marginTop: 2 }}>★</Text>
                         <View style={{ flex: 1 }}>
                           <View style={{ flexDirection: 'row', alignItems: 'baseline', marginBottom: 4 }}>
                             <Text style={{ fontSize: 11, fontFamily: 'Helvetica-Bold', color: '#0f172a', marginRight: 8 }}>{ach.title}</Text>
                             <Text style={{ fontSize: 8.5, color: '#e11d48', fontFamily: 'Helvetica-Bold' }}>{ach.date || ach.year}</Text>
                           </View>
                           <Text style={{ fontSize: 9.5, color: '#475569', lineHeight: 1.4, fontFamily: 'Helvetica' }}>{ach.description}</Text>
                         </View>
                       </View>
                     ))}
                   </View>
                 </View>
              )}
            </View>
          </View>`;

lines.splice(startIndex, endIndex - startIndex, newTemplate);

fs.writeFileSync('src/components/PDFDocument.tsx', lines.join('\n'));
console.log('Update PDF version done');
