import {
  SelectedProject,
  VideoProject,
  GraphicProject,
  SkillItem,
  ExperienceItem,
  EducationItem,
  ThesisStage,
} from '../types';
import { createEditorialPoster } from '../utils/svgPlaceholders';

export const PERSONAL_INFO = {
  name: 'ODSEY B. BANDOJO',
  shortName: 'ODSEY BANDOJO',
  title: 'Creative Multimedia Designer',
  disciplines: 'VIDEO EDITING / GRAPHIC DESIGN / DIGITAL CONTENT',
  location: 'NEGROS OCCIDENTAL, PHILIPPINES',
  // ADD EMAIL HERE
  email: 'bandojo.odsi@gmail.com',
  // ADD SOCIAL LINKS HERE
  socials: {
    linkedin: 'https://www.linkedin.com/in/odsey-bandojo-49a633359/',
    instagram: 'https://www.instagram.com/_odsii/?utm_source=ig_web_button_share_sheet',
  },
  // PROFILE IMAGE: Place your original file in public/images/profile/profile.jpg (or public/profile.jpg)
  profileImage: '/images/profile/profile.jpg',
  fallbackProfileImage: createEditorialPoster('ODSEY B. BANDOJO', 'Multimedia Designer', '2026', '#d94a26', 'graphic', 'portrait'),
  statementHeadline: 'I CREATE VISUALS THAT MOVE AND COMMUNICATE.',
  statementBody:
    'Working across video editing, graphic design, digital content, and visual storytelling. Bridging technical problem-solving with creative precision to deliver high-impact digital narratives.',
  heroBio:
    'Bachelor of Science in Computer Engineering graduate with a strong foundation in IT support and hardware troubleshooting, complemented by creative skills in video editing and digital design.',
  aboutBio1:
    'I am a Bachelor of Science in Computer Engineering graduate with a strong foundation in IT support and hardware troubleshooting, complemented by creative skills in video editing and digital design.',
  aboutBio2:
    'Detail-oriented and adaptable, with the ability to manage tasks efficiently and contribute to both technical and creative projects.',
};

/**
 * 01 - 05 SELECTED WORK HIGHLIGHTS
 */
export const SELECTED_PROJECTS: SelectedProject[] = [
  {
    id: 'sel-01',
    number: '01',
    title: 'SHORT-FORM VIDEO',
    subtitle: 'Hong Kong & Macau • Dynamic Travel Transitions',
    category: 'Video Editing',
    year: '2026',
    type: 'video',
    videoUrl: 'https://youtube.com/shorts/O6UEomZk2Lc',
    description:
      'High-energy short-form travel video featuring Hong Kong and Macau travel transitions, flash transitions, speed ramping, beat-synchronized cuts, and landmark visual montages.',
    tools: ['DaVinci Resolve'],
    // YouTube Shorts thumbnail or custom file in public/images/selected-work/selected-01.jpg
    thumbnail: 'https://img.youtube.com/vi/O6UEomZk2Lc/maxresdefault.jpg',
    fallbackPoster: createEditorialPoster('HONG KONG & MACAU', 'Shorts Travel Edit', '2026', '#2563EB', 'video', 'portrait'),
    aspectRatio: 'portrait',
    details: [
      'Fast-paced Hong Kong and Macau travel transitions incorporating flash cuts, speed ramps, and seamless camera whip pans',
      'Dynamic visual framing across iconic night skylines, streetscapes, Disneyland, and Macau landmarks',
      'Audio-reactive cut pacing, kinetic 3D typography motion, and audience retention optimization',
    ],
  },
  {
    id: 'sel-02',
    number: '02',
    title: 'COMPUTER ENGINEERING PROMOTIONAL VIDEO',
    subtitle: 'University of St. La Salle (USLS) • Program Showcase',
    category: 'Video Editing / Motion Graphics',
    year: '2025',
    type: 'video',
    videoUrl: 'https://youtu.be/VMau93XFGV8',
    description:
      'Official Computer Engineering promotional video for the University of St. La Salle (USLS). Crafted with dynamic pacing, laboratory highlight sequences, and cinematic storytelling to spotlight the CpE department and student innovation.',
    tools: ['Adobe Premiere Pro'],
    // Drop your file in public/images/selected-work/selected-02.jpg or use YouTube high-res thumbnail
    thumbnail: 'https://img.youtube.com/vi/VMau93XFGV8/maxresdefault.jpg',
    fallbackPoster: createEditorialPoster('CPE PROMOTIONAL VIDEO (USLS)', 'University of St. La Salle', '2025', '#d94a26', 'video', 'wide'),
    aspectRatio: 'wide',
    details: [
      'Showcase of the USLS Computer Engineering department, laboratory facilities, and student projects',
      'Multi-camera sequence assembly with seamless speed ramps, kinetic rhythm, and custom audio mixing',
      'Edited, color-balanced, and delivered entirely in Adobe Premiere Pro',
    ],
  },
  {
    id: 'sel-03',
    number: '03',
    title: 'INFOGRAPHICS FOR COURSES',
    subtitle: 'Bedrock Tax Solution • Freelance Accounting Course',
    category: 'Graphic Design',
    year: '2026',
    type: 'graphic',
    description:
      'Designed an infographic promoting Bedrock Tax Solution’s Freelance Accounting Course, highlighting the course benefits, learning features, certification, and enrollment details in a clean and professional layout.',
    tools: ['Canva', 'Graphic Design & Layout', 'Information Hierarchy'],
    // Drop your file in public/images/graphics/graphic-01.jpg or public/images/selected-work/selected-03.jpg
    thumbnail: '/images/graphics/graphic-01.jpg',
    fallbackPoster: createEditorialPoster('INFOGRAPHICS FOR COURSES', 'Bedrock Tax Solution', '2026', '#d94a26', 'graphic', 'square'),
    aspectRatio: 'square',
    details: [
      'Promotional infographic highlighting Freelance Accounting Course benefits, key learning modules, and career advantages',
      'Clear breakdown of professional certification, student perks, and enrollment steps in a structured layout',
      'Clean typography, balanced information hierarchy, and optimized digital marketing format',
    ],
  },
  {
    id: 'sel-04',
    number: '04',
    title: 'POSTER DESIGN',
    subtitle: 'The Flow Dance Club • Event Showcase',
    category: 'Graphic Design',
    year: '2026',
    type: 'graphic',
    description:
      'Promotional event poster designed for The Flow Dance Club. Crafted with dynamic typography, vibrant visual framing, and high-contrast layout detailing to announce dance workshops and club showcases.',
    tools: ['Graphic Design & Layout', 'Event Branding', 'Visual Hierarchy'],
    // Drop your file in public/images/graphics/graphic-04.jpg or public/images/selected-work/selected-04.jpg
    thumbnail: '/images/graphics/graphic-04.jpg',
    fallbackPoster: createEditorialPoster('POSTER DESIGN', 'The Flow Dance Club', '2026', '#d94a26', 'graphic', 'landscape'),
    aspectRatio: 'landscape',
    details: [
      'High-impact event promotional poster crafted for The Flow Dance Club',
      'Dynamic typography and visual hierarchy highlighting event dates, instructors, and venue',
      'Optimized for print-ready display and digital social media announcements',
    ],
  },
  {
    id: 'sel-05',
    number: '05',
    title: 'THERMAL IMAGING FIRE DETECTION SYSTEM',
    subtitle: 'Mobile Alerting & Dual-Environment Prototype',
    category: 'Computer Engineering Thesis',
    year: '2025–2026',
    type: 'thesis',
    description:
      'A Thermal Imaging-Based Approach for Fire Detection in a Controlled and Open Space Environment with Mobile Alerting System. Designed the complete prototype interface, mobile alert flows, and system architecture.',
    tools: ['Prototype Design', 'Mobile UI Layout', 'System Flow Mapping', 'Creative Briefs'],
    // Drop your file in public/images/selected-work/selected-05.jpg
    thumbnail: '/images/selected-work/selected-05.jpg',
    fallbackPoster: createEditorialPoster('THERMAL IMAGING FIRE DETECTION', 'Thesis Prototype', '2025–2026', '#d94a26', 'thesis', 'landscape'),
    aspectRatio: 'landscape',
    details: [
      'Designed real-time mobile alerting system interfaces with instantaneous emergency push notification cards',
      'Structured dual-environment monitoring views tailored for controlled indoor spaces and open outdoor zones',
      'Developed and refined interactive prototype components for successful thesis defense at USLS (April 2026)',
    ],
  },
];

/**
 * MOTION / VIDEO EDITING PROJECTS
 * Categories: SHORTS | PROMOTIONAL | TRAVEL
 */
export const VIDEO_PROJECTS: VideoProject[] = [
  {
    id: 'vid-01',
    number: '01',
    title: 'SHORT-FORM VIDEO',
    category: 'Motion / Video',
    videoCategory: 'SHORTS',
    year: '2026',
    duration: '0:31',
    aspectRatio: 'portrait',
    videoUrl: 'https://youtube.com/shorts/O6UEomZk2Lc', 
    description: 'High-energy short-form travel video featuring Hong Kong and Macau travel transitions, flash transitions, speed ramping, beat-synchronized cuts, and landmark visual montages.',
    tools: ['DaVinci Resolve'],
    role: 'Video Editor & Colorist',
    focus: 'Travel Transitions, Flash Cuts & Beat Sync',
    thumbnail: 'https://img.youtube.com/vi/O6UEomZk2Lc/maxresdefault.jpg',
    fallbackPoster: createEditorialPoster('HONG KONG & MACAU', 'Shorts Travel Edit', '2026', '#2563EB', 'video', 'portrait'),
    details: [
      'Fast-paced Hong Kong and Macau travel transitions incorporating flash cuts, speed ramps, and seamless camera whip pans',
      'Dynamic visual framing across iconic night skylines, streetscapes, Disneyland, and Macau landmarks',
      'Audio-reactive cut pacing, kinetic 3D typography motion, and audience retention optimization',
    ],
  },
  {
    id: 'vid-02',
    number: '02',
    title: 'COMPUTER ENGINEERING PROMOTIONAL VIDEO (USLS)',
    category: 'Motion / Video',
    videoCategory: 'PROMOTIONAL',
    year: '2025',
    duration: '1:30',
    aspectRatio: 'landscape',
    videoUrl: 'https://youtu.be/VMau93XFGV8',
    description: 'Official promotional video for the Computer Engineering Department at the University of St. La Salle (USLS). Features high-energy pacing, lab action sequences, synchronized audio, and institutional branding.',
    tools: ['Adobe Premiere Pro'],
    role: 'Video Editor (Adobe Premiere Pro)',
    focus: 'Program Showcase & Dynamic Storytelling',
    // Drop your file in public/images/videos/video-02.jpg or use YouTube high-res thumbnail
    thumbnail: 'https://img.youtube.com/vi/VMau93XFGV8/maxresdefault.jpg',
    fallbackPoster: createEditorialPoster('CPE PROMOTIONAL VIDEO (USLS)', 'Promotional', '2025', '#d94a26', 'video', 'landscape'),
    details: [
      'Showcase of the USLS Computer Engineering department, laboratory facilities, and student projects',
      'Edited, cut, and finalized exclusively using Adobe Premiere Pro',
      'Multi-track audio mix with dynamic sound design, J/L cut sequencing, and atmospheric foley',
    ],
  },
  {
    id: 'vid-03',
    number: '03',
    title: 'TRAVEL DIARY / VISUAL STORY',
    category: 'Motion / Video',
    videoCategory: 'TRAVEL',
    year: '2026',
    duration: 'TBD',
    aspectRatio: 'landscape',
    // EMPTY SLOT: Video pending / in production. Add your videoUrl (YouTube / MP4) when ready.
    videoUrl: '',
    status: 'IN PRODUCTION',
    isEmptySlot: true,
    placeholderLabel: 'IN POST-PRODUCTION',
    description: 'Cinematic travel reel and atmospheric visual montage. Currently in post-production with color grading, speed ramping, and ambient sound design.',
    tools: ['DaVinci Resolve', 'Adobe Premiere Pro', 'Adobe After Effects'],
    role: 'Video Editor & Sound Designer',
    focus: 'Visual Storytelling & Speed Ramping',
    thumbnail: '/images/videos/video-03.jpg',
    fallbackPoster: createEditorialPoster('TRAVEL DIARY', 'In Production', '2026', '#2563EB', 'in-production', 'wide'),
    details: [
      'Upcoming travel reel featuring atmospheric environmental sound layering and cinematic transitions',
      'Optical flow speed ramps and matched cuts calibrated for emotional resonance',
      'Asset slot reserved — video deliverable in active editing pipeline',
    ],
  },
  {
    id: 'vid-04',
    number: '04',
    title: 'KINETIC TYPOGRAPHY',
    category: 'Motion / Video',
    videoCategory: 'SHORTS',
    year: '2026',
    duration: '0:30',
    aspectRatio: 'portrait',
    // YouTube Shorts link and auto-thumbnail
    videoUrl: 'https://youtube.com/shorts/Iu8PS1s3Nz0',
    description:
      'Timed dynamic font pairings to mirror the emotional pacing of the vocal track using glowing motion-tracked text layers.',
    tools: ['DaVinci Resolve'],
    role: 'Motion Designer & Video Editor',
    focus: 'Kinetic Typography & Audio-Reactive Pacing',
    thumbnail: 'https://img.youtube.com/vi/Iu8PS1s3Nz0/maxresdefault.jpg',
    fallbackPoster: createEditorialPoster('KINETIC TYPOGRAPHY', 'Motion & Lyrics', '2026', '#2563EB', 'video', 'portrait'),
    details: [
      'Timed dynamic font pairings to mirror the emotional pacing of the vocal track using glowing motion-tracked text layers',
      'Audio-reactive text animations and glowing kinetic typography layers',
      'Edited, paced, and styled exclusively in DaVinci Resolve',
    ],
  },
  {
    id: 'vid-05',
    number: '05',
    title: "RANKING SPEED'S FUNNIEST APPLE EVENT MOMENTS",
    category: 'Motion / Video',
    videoCategory: 'SHORTS',
    year: '2026',
    duration: '0:42',
    aspectRatio: 'portrait',
    videoUrl: 'https://youtube.com/shorts/NoxGPNy0eGM',
    description:
      "High-energy short-form ranking edit capturing IShowSpeed's funniest reactions at the Apple Event, featuring snappy comedic pacing, dynamic punch-in zooms, animated graphics, and synchronized sound effects.",
    tools: ['DaVinci Resolve'],
    role: 'Video Editor & Motion Designer',
    focus: 'Comedic Pacing, Dynamic Punch-In Zooms & SFX Sync',
    thumbnail: 'https://img.youtube.com/vi/NoxGPNy0eGM/maxresdefault.jpg',
    fallbackPoster: createEditorialPoster("RANKING SPEED'S MOMENTS", 'Shorts Ranking Edit', '2026', '#2563EB', 'video', 'portrait'),
    details: [
      "Fast-paced ranking format highlighting IShowSpeed's most memorable and humorous moments at the Apple Event",
      'Precision comedic timing with punch-in camera zooms, kinetic subtitle styling, and audio-reactive sound effect stingers',
      'Engineered for maximum audience retention with vertical 9:16 framing tailored for YouTube Shorts',
    ],
  },
  {
    id: 'vid-06',
    number: '06',
    title: 'RANKING BEST WHITE CHICKS MEMES',
    category: 'Motion / Video',
    videoCategory: 'SHORTS',
    year: '2026',
    duration: '0:45',
    aspectRatio: 'portrait',
    videoUrl: 'https://youtube.com/shorts/7yDqq-SfyX0',
    description:
      'High-retention short-form ranking video showcasing the most iconic meme moments from White Chicks, edited with sharp comedic timing, dynamic punch-ins, text overlays, and synchronized sound effects.',
    tools: ['DaVinci Resolve'],
    role: 'Video Editor & Motion Designer',
    focus: 'Comedic Timing, Motion Overlays & Retention Pacing',
    thumbnail: 'https://img.youtube.com/vi/7yDqq-SfyX0/maxresdefault.jpg',
    fallbackPoster: createEditorialPoster('WHITE CHICKS MEME RANKING', 'Shorts Ranking Edit', '2026', '#2563EB', 'video', 'portrait'),
    details: [
      'Dynamic short-form countdown format ranking the most viral comedy scenes and meme moments from White Chicks',
      'Executed punchy visual pacing with precision jump cuts, camera punch-in zooms, and synchronized comedic SFX',
      'Edited, styled, and color-balanced entirely in DaVinci Resolve with 9:16 vertical framing optimized for short-form retention',
    ],
  },
];

/**
 * GRAPHIC DESIGN PROJECTS
 * Categories: SOCIAL MEDIA | PROMOTIONAL | LAYOUT | DIGITAL DESIGN
 */
export const GRAPHIC_PROJECTS: GraphicProject[] = [
  {
    id: 'grp-01',
    number: '01',
    title: 'INFOGRAPHICS FOR COURSES',
    category: 'Graphic Design',
    graphicCategory: 'SOCIAL MEDIA',
    year: '2026',
    format: 'Square (1080x1080) & Story (1080x1920)',
    clientOrContext: 'Bedrock Tax Solution • Freelance Accounting Course',
    description:
      'Designed an infographic promoting Bedrock Tax Solution’s Freelance Accounting Course, highlighting the course benefits, learning features, certification, and enrollment details in a clean and professional layout.',
    tools: ['Canva', 'Graphic Design & Layout', 'Information Hierarchy'],
    aspectRatio: 'square',
    // Drop your file in public/images/graphics/graphic-01.jpg
    thumbnail: '/images/graphics/graphic-01.jpg',
    fallbackPoster: createEditorialPoster('INFOGRAPHICS FOR COURSES', 'Bedrock Tax Solution', '2026', '#d94a26', 'graphic', 'square'),
    details: [
      'Promotional infographic highlighting Freelance Accounting Course benefits, key learning modules, and career advantages',
      'Clear breakdown of professional certification, student perks, and enrollment steps in a structured layout',
      'Clean typography, balanced information hierarchy, and optimized digital marketing format',
    ],
  },
  {
    id: 'grp-02',
    number: '02',
    title: 'CERTIFICATE DESIGN',
    category: 'Graphic Design',
    graphicCategory: 'LAYOUT',
    year: '2026',
    format: 'Print-Ready Certificate & Digital Award',
    clientOrContext: 'The Flow Dance Class • Choreographer Certificate',
    description:
      'Official choreographer certificate of recognition and appreciation designed for The Flow Dance Class. Features refined typographic hierarchy, elegant commemorative layout, and structured brand border detailing for dance instructors and choreographers.',
    tools: ['Graphic Design & Layout', 'Typography', 'Print & Digital Production'],
    aspectRatio: 'landscape',
    // Drop your file in public/images/graphics/graphic-03.jpg or graphic-02.jpg
    thumbnail: '/images/graphics/graphic-03.jpg',
    fallbackPoster: createEditorialPoster('CERTIFICATE DESIGN', 'The Flow Dance Class', '2026', '#d94a26', 'graphic', 'landscape'),
    details: [
      'Official certificate of recognition crafted for choreographers at The Flow Dance Class',
      'Refined typographic hierarchy with balanced commemorative layout and border accents',
      'Delivered in high-resolution print-ready formats (CMYK) and digital distribution copies',
    ],
  },
  {
    id: 'grp-03',
    number: '03',
    title: 'POSTER DESIGN',
    category: 'Graphic Design',
    graphicCategory: 'LAYOUT',
    year: '2026',
    format: 'Event & Promotional Poster',
    clientOrContext: 'The Flow Dance Club • Event Poster',
    description:
      'Promotional event poster designed for The Flow Dance Club. Crafted with dynamic typography, vibrant visual framing, and high-contrast layout detailing to announce dance workshops and club showcases.',
    tools: ['Graphic Design & Layout', 'Event Branding', 'Visual Hierarchy'],
    aspectRatio: 'landscape',
    // Drop your file in public/images/graphics/graphic-04.jpg
    thumbnail: '/images/graphics/graphic-04.jpg',
    fallbackPoster: createEditorialPoster('POSTER DESIGN', 'The Flow Dance Club', '2026', '#d94a26', 'graphic', 'landscape'),
    details: [
      'High-impact event promotional poster crafted for The Flow Dance Club',
      'Dynamic typography and visual hierarchy highlighting event dates, instructors, and venue',
      'Optimized for print-ready display and digital social media announcements',
    ],
  },
  {
    id: 'grp-04',
    number: '04',
    title: 'JERSEY DESIGN',
    category: 'Graphic Design',
    graphicCategory: 'DIGITAL DESIGN',
    year: '2025',
    format: 'Custom Athletics Apparel & Jersey Mockup',
    clientOrContext: 'CECS Athletics • Custom Sports Jersey',
    description:
      'A custom CECS Athletics jersey featuring a bold gold, black, and white design with tiger-inspired graphics, geometric patterns, and the CECS branding. Includes both front and back layouts, with player name and number placement.',
    tools: ['Photoshop', 'Graphic Design & Layout', 'Jersey Apparel Design'],
    aspectRatio: 'landscape',
    // Drop your file in public/images/graphics/graphic-05.jpg
    thumbnail: '/images/graphics/graphic-05.jpg',
    fallbackPoster: createEditorialPoster('JERSEY DESIGN', 'CECS Athletics', '2025', '#d94a26', 'graphic', 'landscape'),
    details: [
      'Front and back jersey layouts with official CECS branding and tiger-inspired graphics',
      'High-contrast gold, black, and white colorway with dynamic geometric patterns',
      'Custom player name, squad number placement, and print-ready sublimation mockups',
    ],
  },
  {
    id: 'grp-05',
    number: '05',
    title: 'JERSEY DESIGN',
    category: 'Graphic Design',
    graphicCategory: 'DIGITAL DESIGN',
    year: '2025',
    format: 'Esports Team Apparel & Jersey Mockup',
    clientOrContext: 'CECS Esports • Call of Duty: Mobile Jersey',
    description:
      'A custom CECS Esports Call of Duty: Mobile jersey featuring a black, orange, and red color scheme with tiger graphics, esports-inspired elements, and bold typography. Includes front and back layouts with customizable name and role details.',
    tools: ['Photoshop', 'Graphic Design & Layout', 'Esports Apparel Design'],
    aspectRatio: 'landscape',
    // Drop your file in public/images/graphics/graphic-06.jpg
    thumbnail: '/images/graphics/graphic-06.jpg',
    fallbackPoster: createEditorialPoster('JERSEY DESIGN', 'CECS Esports', '2025', '#d94a26', 'graphic', 'landscape'),
    details: [
      'Full front and back esports jersey layout with tiger graphics and aggressive typography',
      'High-energy black, orange, and red color scheme tailored for Call of Duty: Mobile competitive play',
      'Customizable player in-game names (IGN), team roles, and print-ready production files',
    ],
  },
  {
    id: 'grp-06',
    number: '06',
    title: 'WEBINAR LAYOUT',
    category: 'Graphic Design',
    graphicCategory: 'LAYOUT',
    year: '2026',
    format: 'Webinar Promotional Poster & Event Layout',
    clientOrContext: 'University of St. La Salle • Cloud 101 Webinar',
    description:
      'Event poster designed for Cloud 101: What Every Student Should Know, a student webinar hosted at the University of St. La Salle featuring Engr. Darren B. Soriano. The layout organizes the topic, guest speaker, schedule, and Zoom platform details using 3D tech assets and clean visual hierarchy for clear readability.',
    tools: ['Photoshop', 'Graphic Design & Layout', 'Typography', 'Event Branding'],
    aspectRatio: 'portrait',
    // Drop your image file in public/images/graphics/graphic-07.jpg
    thumbnail: '/images/graphics/graphic-07.jpg',
    fallbackPoster: createEditorialPoster('WEBINAR LAYOUT', 'Cloud 101 Webinar', '2026', '#2563EB', 'graphic', 'portrait'),
    details: [
      'Event poster designed for Cloud 101: What Every Student Should Know hosted at the University of St. La Salle',
      'Organizes topic, guest speaker Engr. Darren B. Soriano, schedule, and Zoom platform details with clean visual hierarchy',
      'Employs 3D tech assets and high-contrast typography for immediate readability and attendee engagement',
    ],
  },
];

/**
 * SKILLS (Strictly from CV)
 * NO percentages, NO ratings.
 */
export const SKILLS_LIST: SkillItem[] = [
  {
    id: 'sk-01',
    number: '01',
    title: 'VIDEO EDITING & DYNAMIC TRANSITIONS',
    software: 'DaVinci Resolve, Adobe Premiere Pro',
    description:
      'Editing high-impact video sequences with mastery over dynamic transitions (seamless whip pans, punch-in zooms, match cuts, mask wipes), optical flow speed ramping, J/L cut audio sequencing, and narrative pacing.',
    tags: [
      'Seamless Whip & Zoom Transitions',
      'Match Cuts & Mask Wipes',
      'Optical Flow Speed Ramping',
      'J/L Audio Cut Sequencing',
      'Timeline Assembly',
      'High-Bitrate Deliverables',
    ],
  },
  {
    id: 'sk-02',
    number: '02',
    title: 'MOTION GRAPHICS & FUSION EFFECTS',
    software: 'DaVinci Resolve (Fusion), Adobe After Effects',
    description:
      'Designing node-based visual effects, custom animated transition presets, kinetic typography, lower thirds, and motion tracking graphics to elevate video engagement.',
    tags: [
      'Fusion Node-Based Effects',
      'Custom Transition Overlays',
      'Kinetic Typography',
      'Lower Thirds & Callouts',
      'Motion Tracking & Keyframing',
    ],
  },
  {
    id: 'sk-03',
    number: '03',
    title: 'SOCIAL MEDIA CONTENT OPTIMIZATION',
    description: 'Creating and adapting visual content for social media platforms with clear and engaging presentation.',
    tags: ['Aspect Ratio Presets', 'Retention Hooks', 'Short-Form Optimization'],
  },
  {
    id: 'sk-04',
    number: '04',
    title: 'COLOR CORRECTION & COLOR GRADING',
    software: 'DaVinci Resolve Color Page',
    description:
      'Fine-tuning primary color wheels, curves, and secondary qualifiers to achieve cinematic consistency, balanced skin tones, and rich contrast across diverse lighting conditions.',
    tags: ['DaVinci Resolve Color Wheels', 'Waveform & Vectorscopes', 'Skin Tone Qualifiers', 'LUT Calibration', 'Tone Matching'],
  },
  {
    id: 'sk-05',
    number: '05',
    title: 'GRAPHIC DESIGN & LAYOUT',
    software: 'Canva, Photoshop',
    description: 'Creating visual layouts, event posters, infographics, and digital graphics for diverse social media campaigns and educational materials.',
    tags: ['Poster Layouts', 'Infographics', 'Grid Systems', 'Typography Hierarchy', 'Print & Digital Layout'],
  },
  {
    id: 'sk-06',
    number: '06',
    title: 'JERSEY DESIGN',
    software: 'Photoshop',
    description: 'Creating basic jersey designs and visual layouts using Photoshop.',
    tags: ['Full Sublimation', 'Sportswear Apparel', 'Vector Badges', 'Print-Ready Mockups'],
  },
  {
    id: 'sk-07',
    number: '07',
    title: 'HARDWARE TROUBLESHOOTING & IT SUPPORT',
    description: 'Providing basic technical support and troubleshooting for computer hardware and IT equipment.',
    tags: ['Hardware Diagnostics', 'Terminal Commands', 'Workstation Maintenance'],
  },
  {
    id: 'sk-08',
    number: '08',
    title: 'TIME MANAGEMENT & ATTENTION TO DETAIL',
    description: 'Managing multiple tasks efficiently while maintaining attention to quality and deadlines.',
    tags: ['Deadline Discipline', 'Asset Organization', 'Quality Assurance'],
  },
  {
    id: 'sk-09',
    number: '09',
    title: 'SCRIPTS / STORYBOARDS / CREATIVE BRIEFS',
    description: 'Following scripts, storyboards, and creative briefs to guide the editing and design process.',
    tags: ['Concept Development', 'Storyboarding', 'Brief Translation', 'Shot Lists'],
  },
];

/**
 * SOFTWARE TOOLS (Strictly supported by CV)
 */
export const SOFTWARE_TOOLS = [
  {
    name: 'DaVinci Resolve',
    category: 'Video Editing, Transitions, Color & Fusion',
    description:
      'Cut & Edit timeline assembly, dynamic seamless transitions (whip pans, zoom transitions, match cuts, mask wipes), optical flow speed ramping, Fusion node-based motion graphics, and advanced Color Page grading.',
  },
  {
    name: 'Adobe Premiere Pro',
    category: 'Video Editing & Post-Production',
    description: 'Multi-camera timeline editing, multi-track audio mixing, dynamic cuts, rhythm synchronization, and export optimization.',
  },
  {
    name: 'Adobe After Effects',
    category: 'Motion Graphics & Visual Effects',
    description: 'Kinetic typography, animated graphic overlays, visual effects, title card sequences, and compositing.',
  },
  {
    name: 'Adobe Photoshop',
    category: 'Graphic Design & Jersey Apparel',
    description: 'Sportswear and jersey design, digital graphics, photo manipulation, raster layout, and print-ready mockups.',
  },
  {
    name: 'Canva',
    category: 'Graphic Design, Poster Layout & Digital Content',
    description: 'Graphic design, event poster layouts, social media marketing assets, course infographics, and presentation decks.',
  },
];

/**
 * WORK EXPERIENCE (Strictly from CV)
 */
export const EXPERIENCE_LIST: ExperienceItem[] = [
  {
    id: 'exp-01',
    number: '01',
    company: 'BEDROCK TAX SOLUTIONS',
    role: 'Graphic Designer Intern',
    period: 'August 2025 — November 2025',
    descriptions: [
      'Designed digital marketing materials including social media graphics, promotional posts, and visual content aligned with company branding.',
      'Managed multiple design tasks efficiently while meeting deadlines and maintaining quality.',
    ],
    skillsApplied: ['Graphic Design & Layout', 'Social Media Optimization', 'Brand Consistency', 'Time Management'],
  },
  {
    id: 'exp-02',
    number: '02',
    company: 'UBIQUITY',
    role: 'Information Technology Intern',
    period: 'June 2024 — July 2024',
    descriptions: [
      'Acquired technical expertise in computer hardware troubleshooting, IT hardware support, and using terminal command prompts.',
      'Assisted in maintaining and organizing IT equipment and workstations.',
    ],
    skillsApplied: ['Hardware Troubleshooting', 'IT Support', 'Terminal Command Prompts', 'Workstation Maintenance'],
  },
];

/**
 * THESIS / FEATURED PROJECT (Completed 2026)
 */
export const THESIS_DATA = {
  title: 'A THERMAL IMAGING-BASED APPROACH FOR FIRE DETECTION IN A CONTROLLED AND OPEN SPACE ENVIRONMENT WITH MOBILE ALERTING SYSTEM',
  shortTitle: 'Thermal Imaging Fire Detection & Mobile Alerting System',
  systemName: 'FireSafe System',
  sectionTitle: 'THESIS PROJECT',
  role: 'PROTOTYPE DESIGNER & RESEARCHER',
  period: 'August 2025 — April 2026',
  statusBadge: 'COMPLETED — MARCH/APRIL 2026',
  institution: 'University of St. La Salle – Bacolod',
  department: 'College of Engineering • Computer Engineering Department',
  program: 'Bachelor of Science in Computer Engineering',
  authors: ['Odsey Bandojo', 'Vhieron Bareza', 'Reymart Louie Capapas'],
  advisers: 'Engr. Jeffrey Fuentes (Thesis Adviser) • Engr. Jason Quintanilla (Technical Adviser)',
  keyMetrics: [
    { label: 'Overall Detection Rate', value: '100%', detail: '150 test events across 3 environments' },
    { label: 'Pre-Ignition Warning', value: '2–4 Min', detail: 'Heat detected prior to visible flame' },
    { label: 'Alert Notification Speed', value: '2.4s – 4.3s', detail: 'Real-time Mobile Push & GSM SMS' },
  ],
  techStack: [
    'Raspberry Pi Zero 2 W',
    'MLX90640 Thermal Camera',
    'TinyML Edge Processing',
    'React Native Mobile App',
    'Supabase Database',
    'Arduino GSM SMS Gateway',
  ],
  summary: [
    'Designed the FireSafe mobile application interface, real-time fire trigger notification flows, and dual-environment dashboard layouts.',
    'Developed and refined high-fidelity interactive prototype concepts based on testing requirements, thermal camera data models, and advisor feedback.',
  ],
  stages: [
    {
      step: '01 / CONCEPT',
      title: 'Dual-Environment Architecture & Alert Pipeline',
      description:
        'Mapped thermal imaging capture pipelines, temperature threshold triggers, and real-time mobile alerting logic across controlled indoor spaces and open outdoor areas.',
      focus: 'Thermal Detection Pipeline & Alert Logic',
      // Drop your file in public/images/thesis/thesis-01.jpg
      thumbnail: '/images/thesis/thesis-01.jpg',
      fallbackPoster: createEditorialPoster('THESIS // CONCEPT PIPELINE', 'Thermal Detection Flow', '2025', '#d94a26', 'thesis', 'landscape'),
    },
    {
      step: '02 / DESIGN',
      title: 'Mobile Alerting UI & Monitoring Dashboard',
      description:
        'Designed high-contrast emergency notification screens, live thermal feed viewports, zone status cards, and rapid dispatch buttons.',
      focus: 'Mobile Alert UI & Zone Monitoring',
      // Drop your file in public/images/thesis/thesis-02.jpg
      thumbnail: '/images/thesis/thesis-02.jpg',
      fallbackPoster: createEditorialPoster('THESIS // MOBILE ALERT UI', 'Interface Design', '2025', '#d94a26', 'thesis', 'landscape'),
    },
    {
      step: '03 / REFINEMENT',
      title: 'Telemetry Visualization & Usability Polish',
      description:
        'Iteratively refined alarm acknowledgement states, sensor telemetry visualization, and interaction feedback from simulated test runs in open and closed spaces.',
      focus: 'Usability Refinement & Telemetry Layout',
      // Drop your file in public/images/thesis/thesis-03.jpg
      thumbnail: '/images/thesis/thesis-03.jpg',
      fallbackPoster: createEditorialPoster('THESIS // REFINEMENT & TESTING', 'User Testing', '2026', '#d94a26', 'thesis', 'landscape'),
    },
    {
      step: '04 / FINAL',
      title: 'Completed Prototype & Defense Presentation',
      description:
        'Delivered the comprehensive interactive prototype and interface documentation for successful Bachelor of Science thesis completion in April 2026.',
      focus: 'Defense-Ready Prototype & Documentation',
      // Drop your file in public/images/thesis/thesis-04.jpg
      thumbnail: '/images/thesis/thesis-04.jpg',
      fallbackPoster: createEditorialPoster('THESIS // COMPLETED SYSTEM', 'Completed 04/2026', '2026', '#d94a26', 'thesis', 'landscape'),
    },
  ] as ThesisStage[],
};

/**
 * EDUCATION (Strictly from CV)
 */
export const EDUCATION_DATA: EducationItem = {
  institution: 'UNIVERSITY OF ST. LA SALLE — BACOLOD',
  degree: 'Bachelor of Science in Computer Engineering',
  period: 'June 2021 — April 2026',
  highlights: [
    'Combined rigorous hardware engineering and IT logic with specialized digital design and multimedia production.',
    'Focus on computer hardware systems, IT infrastructure, and creative interface prototyping.',
  ],
};
