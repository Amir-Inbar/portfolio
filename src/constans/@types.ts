export interface NavLink {
  id: string;
  title: string;
}

export interface Service {
  title: string;
  icon: string;
}

export interface Technology {
  name: string;
  icon: string;
}

export interface ExperiencePoint {
  title: string;
  company_name: string;
  icon: string;
  iconBg: string;
  date: string;
  points: string[];
}

export interface Testimonial {
  testimonial: string;
  name: string;
  designation: string;
  company: string;
  image: string;
}

interface ProjectTag {
  name: string;
  color: string;
}

export interface Project {
  name: string;
  description: string;
  tags: ProjectTag[];
  image: string;
  source_code_link: string;
}
