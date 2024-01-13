export interface EmployeeRequest {
  id?: string;
  name: string;
  surname: string;
  employmentDate: Date;
  skillIds: string[];
  projectIds: string[];
  managerId?: string;
}
