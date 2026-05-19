import * as fs from 'fs'
import * as path from 'path'

const filePath = path.join(__dirname, 'insert_sap_lesson.ts')
let content = fs.readFileSync(filePath, 'utf-8')

console.log('Deep cleaning insert_sap_lesson.ts colors...')

// Strip hardcoded dark colors and text styles inside div/span/p/li/ul tags
content = content.replace(/style="font-size:\s*0\.95rem;\s*color:\s*#f8fafc;\s*font-weight:\s*600;"/g, 'style="font-size: 0.95rem; font-weight: 600;"')
content = content.replace(/style="color:\s*#f8fafc;\s*font-weight:\s*600;\s*font-size:\s*0\.95rem;\s*margin-bottom:\s*0\.5rem;"/g, 'style="font-weight: 600; font-size: 0.95rem; margin-bottom: 0.5rem;"')
content = content.replace(/style="color:\s*#f8fafc;\s*font-weight:\s*600;\s*font-size:\s*0\.95rem;\s*margin-bottom:\s*0\.75rem;"/g, 'style="font-weight: 600; font-size: 0.95rem; margin-bottom: 0.75rem;"')
content = content.replace(/style="color:\s*#cbd5e1;\s*font-size:\s*0\.95rem;\s*line-height:\s*1\.6;\s*margin-bottom:\s*1rem;"/g, 'style="font-size: 0.95rem; line-height: 1.6; margin-bottom: 1rem;"')
content = content.replace(/style="color:\s*#cbd5e1;\s*font-size:\s*0\.95rem;\s*line-height:\s*1\.6;\s*margin-bottom:\s*1\.25rem;"/g, 'style="font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.25rem;"')
content = content.replace(/style="color:\s*#cbd5e1;\s*font-size:\s*0\.95rem;\s*line-height:\s*1\.6;\s*margin-bottom:\s*1\.5rem;"/g, 'style="font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem;"')
content = content.replace(/style="color:\s*#cbd5e1;\s*font-size:\s*0\.95rem;\s*line-height:\s*1\.6;\s*margin:\s*0\s*0\s*1rem\s*0;"/g, 'style="font-size: 0.95rem; line-height: 1.6; margin: 0 0 1rem 0;"')
content = content.replace(/style="color:\s*#cbd5e1;\s*font-size:\s*0\.95rem;\s*line-height:\s*1\.6;\s*margin:\s*0;"/g, 'style="font-size: 0.95rem; line-height: 1.6; margin: 0;"')
content = content.replace(/style="color:\s*#cbd5e1;\s*font-size:\s*0\.95rem;\s*margin-bottom:\s*0\.5rem;"/g, 'style="font-size: 0.95rem; margin-bottom: 0.5rem;"')
content = content.replace(/style="color:\s*#cbd5e1;\s*font-size:\s*0\.95rem;\s*margin-bottom:\s*1rem;"/g, 'style="font-size: 0.95rem; margin-bottom: 1rem;"')
content = content.replace(/style="color:\s*#cbd5e1;\s*font-size:\s*0\.95rem;"/g, 'style="font-size: 0.95rem;"')
content = content.replace(/style="color:\s*#cbd5e1;\s*font-size:\s*0\.9rem;\s*line-height:\s*1\.5;"/g, 'style="font-size: 0.9rem; line-height: 1.5;"')
content = content.replace(/style="color:\s*#cbd5e1;\s*font-size:\s*0\.9rem;\s*font-style:\s*italic;\s*margin-bottom:\s*1\.5rem;"/g, 'style="font-size: 0.9rem; font-style: italic; margin-bottom: 1.5rem;"')
content = content.replace(/style="color:\s*#cbd5e1;\s*font-size:\s*0\.9rem;\s*font-style:\s*italic;\s*margin-bottom:\s*1rem;"/g, 'style="font-size: 0.9rem; font-style: italic; margin-bottom: 1rem;"')
content = content.replace(/style="color:\s*#f8fafc;\s*font-weight:\s*700;\s*font-size:\s*1\.25rem;\s*margin-top:\s*0;\s*margin-bottom:\s*1rem;"/g, 'style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;"')
content = content.replace(/style="color:\s*#f8fafc;\s*font-weight:\s*700;\s*font-size:\s*1\.2rem;\s*margin-top:\s*0;\s*margin-bottom:\s*1rem;\s*display:\s*flex;\s*align-items:\s*center;\s*gap:\s*0\.5rem;"/g, 'style="font-weight: 700; font-size: 1.2rem; margin-top: 0; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;"')
content = content.replace(/style="color:\s*#f8fafc;\s*font-style:\s*italic;\s*font-size:\s*0\.95rem;\s*margin:\s*0\s*0\s*0\.75rem\s*0;"/g, 'style="font-style: italic; font-size: 0.95rem; margin: 0 0 0.75rem 0;"')
content = content.replace(/style="list-style:\s*none;\s*padding:\s*0;\s*margin:\s*0\s*0\s*1\.5rem\s*0;\s*color:\s*#cbd5e1;\s*font-size:\s*0\.95rem;\s*line-height:\s*1\.6;"/g, 'style="list-style: none; padding: 0; margin: 0 0 1.5rem 0; font-size: 0.95rem; line-height: 1.6;"')
content = content.replace(/style="list-style:\s*none;\s*padding:\s*0;\s*margin:\s*0\s*0\s*1\.25rem\s*0;\s*color:\s*#cbd5e1;\s*font-size:\s*0\.95rem;\s*line-height:\s*1\.6;"/g, 'style="list-style: none; padding: 0; margin: 0 0 1.25rem 0; font-size: 0.95rem; line-height: 1.6;"')
content = content.replace(/style="list-style:\s*none;\s*padding:\s*0;\s*margin:\s*0;\s*color:\s*#cbd5e1;\s*font-size:\s*0\.95rem;\s*line-height:\s*1\.6;"/g, 'style="list-style: none; padding: 0; margin: 0; font-size: 0.95rem; line-height: 1.6;"')
content = content.replace(/style="display:\s*flex;\s*align-items:\s*center;\s*gap:\s*0\.5rem;\s*font-weight:\s*700;\s*font-size:\s*0\.95rem;\s*color:\s*#34d399;"/g, 'style="display: flex; align-items: center; gap: 0.5rem; font-weight: 700; font-size: 0.95rem; color: var(--color-success);"')
content = content.replace(/style="color:\s*#f8fafc;\s*font-weight:\s*600;\s*font-size:\s*0\.95rem;\s*margin-bottom:\s*0\.5rem;"/g, 'style="font-weight: 600; font-size: 0.95rem; margin-bottom: 0.5rem;"')
content = content.replace(/style="color:\s*#cbd5e1;\s*font-size:\s*0\.95rem;\s*line-height:\s*1\.6;\s*margin:\s*0\s*0\s*1rem\s*0;"/g, 'style="font-size: 0.95rem; line-height: 1.6; margin: 0 0 1rem 0;"')
content = content.replace(/style="font-size:\s*2\.25rem;\s*font-weight:\s*800;\s*color:\s*#f8fafc;\s*margin-bottom:\s*1\.5rem;\s*letter-spacing:\s*-0\.025em;\s*line-height:\s*1\.2;"/g, 'style="font-size: 2.25rem; font-weight: 800; margin-bottom: 1.5rem; letter-spacing: -0.025em; line-height: 1.2;"')
content = content.replace(/style="font-size:\s*1\.75rem;\s*font-weight:\s*800;\s*color:\s*#f8fafc;[^"]*"/g, 'style="font-size: 1.75rem; font-weight: 800; border-left: 4px solid var(--color-warning); padding-left: 1rem;"')

// Let's run a generic cleanup to strip specific remaining hardcoded dark colors
content = content.replace(/color:\s*#f8fafc;?\s*/g, '')
content = content.replace(/color:\s*#cbd5e1;?\s*/g, '')

fs.writeFileSync(filePath, content, 'utf-8')
console.log('Deep colors cleaned successfully!')
