export type CursorMode = 'default' | 'view' | 'play' | 'open' | 'drag';

export type VideoCategory = 'SHORTS' | 'PROMOTIONAL' | 'TRAVEL';
export type GraphicCategory = 'SOCIAL MEDIA' | 'PROMOTIONAL' | 'LAYOUT' | 'DIGITAL DESIGN';

export interface BaseProject {
  id: string;
  number: string;
  title: string;
  year: string;
  category: string;
  description: string;
  details?: string[];
  tools?: string[];
  thumbnail: string;
  fallbackPoster?: string;
  aspectRatio?: 'landscape' | 'portrait' | 'square' | 'wide';
  status?: 'COMPLETED' | 'IN PRODUCTION' | 'COMING SOON' | 'RESERVED SLOT';
  isEmptySlot?: boolean;
  placeholderLabel?: string;
}

export interface VideoProject extends BaseProject {
  videoCategory: VideoCategory;
  duration?: string;
  videoUrl?: string; // Replace with MP4 or embed link
  aspectRatio: 'portrait' | 'landscape' | 'square';
  role?: string;
  focus?: string;
}

export interface GraphicProject extends BaseProject {
  graphicCategory: GraphicCategory;
  format?: string;
  clientOrContext?: string;
  imageGallery?: string[];
}

export interface SelectedProject extends BaseProject {
  type: 'video' | 'graphic' | 'thesis';
  subtitle: string;
  previewUrl?: string;
  videoUrl?: string;
}

export interface SkillItem {
  id: string;
  number: string;
  title: string;
  software?: string;
  description?: string;
  tags?: string[];
}

export interface ExperienceItem {
  id: string;
  number: string;
  company: string;
  role: string;
  period: string;
  descriptions: string[];
  skillsApplied: string[];
}

export interface EducationItem {
  institution: string;
  location?: string;
  degree: string;
  period: string;
  highlights?: string[];
}

export interface ThesisStage {
  step: string;
  title: string;
  description: string;
  focus: string;
  thumbnail: string;
  fallbackPoster?: string;
}
