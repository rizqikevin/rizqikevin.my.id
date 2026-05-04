export type EducationProps = {
  school: string;
  major: string;
  logo: string | null;
  location: string;
  degree: string;
  GPA?: string;
  start_year: number;
  end_year: number;
  link: string | null;
  coursework?: string[];
  highlights?: string[];
};
