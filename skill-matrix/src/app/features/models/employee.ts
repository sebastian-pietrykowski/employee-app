export interface Employee {
  id: string;
  name: string;
  surname: string;
  employmentDate: Date;
  listOfSkills: string[];
  listOfProjects: string[];
  managerId?: string;
}
