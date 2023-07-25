import { Employee } from '../models/employee';

export const MOCK_EMPLOYEES: Employee[] = [
  {
    id: '1',
    name: 'Jan',
    surname: 'Kowalski',
    employmentDate: new Date(2023, 7, 17, 0, 0, 0, 0),
    listOfSkills: ['Angular', 'HTML', 'CSS', 'TypeScript'],
    listOfProjects: ['project 1', 'project 2'],
    manager: undefined,
  },
  {
    id: '2',
    name: 'Przemysław',
    surname: 'Górecki',
    employmentDate: new Date(2023, 1, 2, 0, 0, 0, 0),
    listOfSkills: ['Java', 'Spring'],
    listOfProjects: ['project 1', 'project 2'],
    manager: undefined,
  },
  {
    id: '3',
    name: 'Jola',
    surname: 'Sawicka',
    employmentDate: new Date(2022, 10, 13, 0, 0, 0, 0),
    listOfSkills: ['mySQL', 'MSSQL', 'Python'],
    listOfProjects: ['project 1', 'project 2'],
    manager: undefined,
  },
];
