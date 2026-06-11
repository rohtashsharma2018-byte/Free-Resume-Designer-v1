const fs = require('fs');

const content = fs.readFileSync('src/components/ResumePreview.tsx', 'utf-8');
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
          <div className="flex flex-col h-full min-h-[297mm] text-left bg-rose-50 text-slate-800 p-0 font-sans relative" id="layout-ats-supernova">
            {/* Header */}
            <div className="bg-slate-900 text-white pt-16 pb-12 px-12 relative overflow-hidden">
               <div className="absolute -top-24 -right-24 w-64 h-64 bg-rose-600 rounded-full blur-3xl opacity-30 pointer-events-none" />
               <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-rose-500 to-rose-400" />
               
               <div className="flex justify-between items-end">
                 <div className="max-w-2xl pr-4">
                   <h1 className="text-[44px] font-black text-rose-50 tracking-tight leading-none mb-3 uppercase" style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                     {personalInfo.fullName || 'Your Name'}
                   </h1>
                   {personalInfo.jobTitle && (
                     <p className="text-lg font-bold text-rose-400 tracking-widest uppercase">
                       {personalInfo.jobTitle}
                     </p>
                   )}
                 </div>
                 {personalInfo.photoUrl && (
                   <img 
                     src={personalInfo.photoUrl} 
                     alt={personalInfo.fullName} 
                     className="w-24 h-24 rounded-full object-cover border-4 border-slate-800 shadow-xl ring-2 ring-rose-500 z-10 shrink-0"
                     referrerPolicy="no-referrer"
                   />
                 )}
               </div>

               {personalInfo.bio && (
                 <p className="mt-8 text-[13px] text-slate-300 leading-relaxed font-medium max-w-3xl">
                   {personalInfo.bio}
                 </p>
               )}
            </div>

            {/* Contact Details Bar */}
            <div className="bg-rose-600 text-white py-3 px-12 flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-semibold tracking-wide shadow-md z-10 relative">
                {[
                  personalInfo.email,
                  personalInfo.phone,
                  personalInfo.location,
                  personalInfo.website,
                  personalInfo.linkedin,
                  personalInfo.github
                ].filter(Boolean).map((detail, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-300" />
                    <span>{detail}</span>
                  </div>
                ))}
            </div>

            {/* Main Content Area */}
            <div className="px-12 py-10 space-y-8 flex-1 w-full box-border">
              
              {experience.length > 0 && (
                <section>
                  <h2 className="text-xl font-black text-slate-900 border-b-2 border-rose-200 pb-2 mb-6 tracking-tight flex items-center gap-2 uppercase">
                    <span className="text-rose-600 shadow-sm bg-rose-100 p-1 rounded mr-1">Exp</span>erience
                  </h2>
                  <div className="space-y-6">
                    {experience.map((exp: any) => (
                      <div key={exp.id} className="relative pl-6 border-l-2 border-slate-200 pb-2">
                        <div className="absolute w-3 h-3 bg-rose-500 rounded-full -left-[7px] top-1.5 ring-4 ring-rose-50" />
                        <div className="flex flex-col mb-1.5">
                          <h3 className="text-sm font-bold text-slate-900">{exp.position ?? exp.title}</h3>
                          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-rose-600">
                            <span>{exp.company}</span>
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
                        <p className="text-[11px] text-slate-700 leading-relaxed whitespace-pre-wrap">
                          {exp.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {projects && projects.length > 0 && (
                <section>
                  <h2 className="text-xl font-black text-slate-900 border-b-2 border-rose-200 pb-2 mb-6 tracking-tight flex items-center gap-2 uppercase">
                    <span className="text-rose-600 shadow-sm bg-rose-100 p-1 rounded mr-1">Pro</span>jects
                  </h2>
                  <div className="space-y-6">
                    {projects.map((proj: any) => (
                      <div key={proj.id} className="relative pl-6 border-l-2 border-slate-200 pb-2">
                         <div className="flex flex-col mb-1.5">
                          <h3 className="text-sm font-bold text-slate-900">{proj.title}</h3>
                          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-rose-600">
                             {proj.role && <span>{proj.role}</span>}
                             {proj.role && <span className="text-slate-300">•</span>}
                             <span className="text-slate-500">{proj.startDate} – {proj.isCurrent ? 'Present' : proj.endDate}</span>
                          </div>
                        </div>
                        <p className="text-[11px] text-slate-700 leading-relaxed whitespace-pre-wrap mt-2">
                          {proj.description}
                        </p>
                        {proj.link && (
                          <a href={proj.link} target="_blank" rel="noreferrer" className="text-[10px] text-rose-600 underline font-semibold mt-1 inline-block">
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
                  <h2 className="text-xl font-black text-slate-900 border-b-2 border-rose-200 pb-2 mb-6 tracking-tight flex items-center gap-2 uppercase">
                    <span className="text-rose-600 shadow-sm bg-rose-100 p-1 rounded mr-1">Edu</span>cation
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {education.map((edu: any) => (
                      <div key={edu.id} className="bg-white p-4 rounded-xl border border-rose-100 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-rose-400" />
                        <h3 className="text-sm font-bold text-slate-900 mb-1">{edu.degree}</h3>
                        <p className="text-xs font-semibold text-rose-600 mb-2">{edu.institution}</p>
                        <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">{edu.startDate} – {edu.endDate}</p>
                        {edu.description && <p className="text-[10px] text-slate-600 mt-2">{edu.description}</p>}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {skills.length > 0 && (
                <section>
                  <h2 className="text-xl font-black text-slate-900 border-b-2 border-rose-200 pb-2 mb-6 tracking-tight flex items-center gap-2 uppercase">
                    <span className="text-rose-600 shadow-sm bg-rose-100 p-1 rounded mr-1">Ski</span>lls
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill: any) => (
                      <span key={skill.id} className="px-3 py-1.5 bg-slate-900 text-rose-50 text-[11px] font-bold tracking-wide rounded hover:-translate-y-0.5 transition-transform shadow-sm border-b-2 border-slate-700">
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {languages && languages.length > 0 && (
                 <section>
                  <h2 className="text-xl font-black text-slate-900 border-b-2 border-rose-200 pb-2 mb-6 tracking-tight flex items-center gap-2 uppercase">
                    <span className="text-rose-600 shadow-sm bg-rose-100 p-1 rounded mr-1">Lan</span>guages
                  </h2>
                  <div className="flex flex-wrap gap-4">
                    {languages.map((lang: any) => (
                      <div key={lang.id} className="flex flex-col items-center justify-center p-3 border border-slate-200 bg-white rounded-lg shadow-sm w-24">
                        <span className="text-xs font-black text-slate-900 uppercase">{lang.name}</span>
                        <span className="text-[10px] font-semibold text-rose-600 uppercase tracking-widest mt-1">{lang.proficiency}</span>
                      </div>
                    ))}
                  </div>
                 </section>
              )}

              {certifications && certifications.length > 0 && (
                 <section>
                   <h2 className="text-xl font-black text-slate-900 border-b-2 border-rose-200 pb-2 mb-6 tracking-tight flex items-center gap-2 uppercase">
                     <span className="text-rose-600 shadow-sm bg-rose-100 p-1 rounded mr-1">Cer</span>tifications
                   </h2>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {certifications.map((cert: any) => (
                       <div key={cert.id} className="flex flex-col bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                         <h3 className="text-sm font-bold text-slate-900">{cert.name}</h3>
                         <p className="text-[11px] font-semibold text-rose-600">{cert.issuer}</p>
                         <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider mt-1">{cert.date}</p>
                       </div>
                     ))}
                   </div>
                 </section>
              )}

              {achievements && achievements.length > 0 && (
                 <section>
                   <h2 className="text-xl font-black text-slate-900 border-b-2 border-rose-200 pb-2 mb-6 tracking-tight flex items-center gap-2 uppercase">
                     <span className="text-rose-600 shadow-sm bg-rose-100 p-1 rounded mr-1">Awa</span>rds
                   </h2>
                   <ul className="space-y-3">
                     {achievements.map((ach: any) => (
                       <li key={ach.id} className="flex gap-3 items-start bg-slate-50 px-4 py-3 rounded-lg border border-slate-100">
                         <span className="text-rose-500 shrink-0 mt-0.5 font-bold text-sm">★</span>
                         <div>
                           <div className="flex flex-wrap gap-2 items-baseline mb-1">
                             <h3 className="text-[13px] font-bold text-slate-900">{ach.title}</h3>
                             {ach.date && <span className="text-[10px] text-rose-600 font-semibold">{ach.date}</span>}
                             {ach.year && !ach.date && <span className="text-[10px] text-rose-600 font-semibold">{ach.year}</span>}
                           </div>
                           <p className="text-[11px] text-slate-600 leading-relaxed">{ach.description}</p>
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
          </div>`;

lines.splice(startIndex, endIndex - startIndex, newTemplate);

fs.writeFileSync('src/components/ResumePreview.tsx', lines.join('\n'));
console.log('Update HTML version done');
