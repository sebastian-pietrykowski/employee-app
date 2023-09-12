import { Manager } from './manager';
import { Project } from './project';
import { Skill } from './skill';

export interface EmployeeResponse {
  id: string;
  name: string;
  surname: string;
  employmentDate: Date;
  skills: Skill[];
  projects: Project[];
  manager?: Manager;
}
