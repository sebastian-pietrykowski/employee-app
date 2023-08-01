import { Employee } from '../models/employee';

export const MOCK_EMPLOYEES: Employee[] = [
  {
    id: '1',
    name: 'Jan',
    surname: 'Kowalski',
    employmentDate: new Date(2023, 7, 17, 0, 0, 0, 0),
    listOfSkills: ['Angular', 'HTML', 'CSS', 'TypeScript'],
    listOfProjects: ['DataTrackr', 'eHealthPlus'],
    managerId: undefined,
  },
  {
    id: '2',
    name: 'Przemysław',
    surname: 'Górecki',
    employmentDate: new Date(2023, 1, 2, 0, 0, 0, 0),
    listOfSkills: ['Java', 'Spring'],
    listOfProjects: ['DataTrackr', 'SafeGuardian'],
    managerId: '1',
  },
  {
    id: '3',
    name: 'Jola',
    surname: 'Sawicka',
    employmentDate: new Date(2022, 10, 13, 0, 0, 0, 0),
    listOfSkills: ['MySQL', 'MSSQL', 'Python'],
    listOfProjects: ['DataTrackr', 'SafeGuardian', 'LearnUp'],
    managerId: undefined,
  },
  {
    id: '4',
    name: 'Aleksandra',
    surname: 'Nowak',
    employmentDate: new Date(2021, 5, 1, 0, 0, 0, 0),
    listOfSkills: ['C#', 'Matlab', 'CSS', 'Rust'],
    listOfProjects: ['RetailEdge'],
    managerId: '2',
  },
  {
    id: '5',
    name: 'Michał',
    surname: 'Kowalski',
    employmentDate: new Date(2023, 7, 1, 0, 0, 0, 0),
    listOfSkills: ['Python'],
    listOfProjects: ['SmartHomeX'],
    managerId: '2',
  },
  {
    id: '6',
    name: 'Karolina',
    surname: 'Wiśniewska',
    employmentDate: new Date(2022, 10, 10, 0, 0, 0, 0),
    listOfSkills: ['Ruby', 'HTML', 'CSS', 'TypeScript'],
    listOfProjects: [],
    managerId: '1',
  },
  {
    id: '7',
    name: 'Janusz',
    surname: 'Kowalski',
    employmentDate: new Date(2022, 8, 28, 0, 0, 0, 0),
    listOfSkills: [
      'Kotlin',
      'Firebase',
      'Swift',
      'Go',
      'HTML',
      'CSS',
      'TypeScript',
      'PHP',
    ],
    listOfProjects: ['DataTrackr', 'eHealthPlus'],
    managerId: undefined,
  },
  {
    id: '8',
    name: 'Piotr',
    surname: 'Jankowski',
    employmentDate: new Date(2023, 1, 15, 0, 0, 0, 0),
    listOfSkills: ['HTML', 'CSS', 'TypeScript', 'MySQL'],
    listOfProjects: ['eHealthPlus'],
    managerId: '7',
  },
];
