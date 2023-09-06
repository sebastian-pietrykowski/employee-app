import { EmployeeResponse } from '../models/employeeResponse';

export const MOCK_EMPLOYEES: EmployeeResponse[] = [
  {
    id: 'ed41db9e-6370-49ca-ae9f-1724f3db8518',
    name: 'Jan',
    surname: 'Kowalski',
    employmentDate: new Date(2023, 7, 17, 0, 0, 0, 0),
    skills: [
      {
        id: '442f37f0-d8f2-411e-8001-bf6d52249a06',
        name: 'Angular',
      },
      {
        id: '7e7ccaad-2664-4370-a26a-ed3f51f65189',
        name: 'HTML',
      },
      {
        id: 'f9c822c5-c800-4388-9f30-e7665e7906f1',
        name: 'CSS',
      },
      {
        id: 'eab3a357-7e0f-408e-8b1e-7914418414a4',
        name: 'TypeScript',
      },
    ],
    projects: [
      {
        id: '1e35b849-3c21-4868-a8c2-dab73c1b1e00',
        name: 'DataTrackr',
      },
      {
        id: '381f1e43-ac97-429d-91c8-cec9759ac098',
        name: 'eHealthPlus',
      },
    ],
    manager: undefined,
  },
  {
    id: '71fbd08b-e042-4486-90da-59531a26b480',
    name: 'Przemysław',
    surname: 'Górecki',
    employmentDate: new Date(2023, 1, 2, 0, 0, 0, 0),
    skills: [
      {
        id: 'e0baf17e-d5af-4ba5-9157-6f0c991f507b',
        name: 'Java',
      },
      {
        id: '9b3f8c33-72fd-4ad5-ba5e-111bd4286105',
        name: 'Spring',
      },
    ],
    projects: [
      {
        id: '1e35b849-3c21-4868-a8c2-dab73c1b1e00',
        name: 'DataTrackr',
      },
      {
        id: 'cec9d207-f251-4ee1-b788-c5e63df6edaf',
        name: 'SafeGuardian',
      },
    ],
    manager: {
      id: 'ed41db9e-6370-49ca-ae9f-1724f3db8518',
      name: 'Jan',
      surname: 'Kowalski',
    },
  },
  {
    id: '3e4de3c9-496f-429e-88f9-147b66e9c7fe',
    name: 'Jola',
    surname: 'Sawicka',
    employmentDate: new Date(2022, 10, 13, 0, 0, 0, 0),
    skills: [
      {
        id: '24929628-06e5-4a67-8b5e-69dd2a72e935',
        name: 'MySQL',
      },
      {
        id: '7fc194ef-caca-40ea-a1c0-080a20057ce8',
        name: 'MSSQL',
      },
      {
        id: '741c04a5-b324-443a-9a6f-b7d78f38ac1b',
        name: 'Python',
      },
    ],
    projects: [
      {
        id: '1e35b849-3c21-4868-a8c2-dab73c1b1e00',
        name: 'DataTrackr',
      },
      {
        id: 'cec9d207-f251-4ee1-b788-c5e63df6edaf',
        name: 'SafeGuardian',
      },
      {
        id: '621e859f-dd0c-428c-a0b9-3843bcc3da89',
        name: 'LearnUp',
      },
    ],
    manager: undefined,
  },
  {
    id: '28f0dd38-5fae-4235-85f4-a5f87abf7479',
    name: 'Aleksandra',
    surname: 'Nowak',
    employmentDate: new Date(2021, 5, 1, 0, 0, 0, 0),
    skills: [
      {
        id: 'e3451e60-8fe0-4e99-951f-f7eee4f6ab12',
        name: 'C#',
      },
      {
        id: '64a9bb94-cf80-419a-9efa-d54d98777c6c',
        name: 'Matlab',
      },
      {
        id: 'f9c822c5-c800-4388-9f30-e7665e7906f1',
        name: 'CSS',
      },
      {
        id: '679181f0-7333-4913-8408-decfad440c0b',
        name: 'Rust',
      },
    ],
    projects: [
      {
        id: '242103e2-18e7-4474-b53b-2e48b7861654',
        name: 'RetailEdge',
      },
    ],
    manager: {
      id: '71fbd08b-e042-4486-90da-59531a26b480',
      name: 'Przemysław',
      surname: 'Górecki',
    },
  },
  {
    id: '6bddc564-9cc9-4297-a031-90989cd5e84d',
    name: 'Michał',
    surname: 'Kowalski',
    employmentDate: new Date(2023, 7, 1, 0, 0, 0, 0),
    skills: [
      {
        id: '741c04a5-b324-443a-9a6f-b7d78f38ac1b',
        name: 'Python',
      },
    ],
    projects: [
      {
        id: '67be4354-000f-4153-8bcf-1f0d55c346aa',
        name: 'SmartHomeX',
      },
    ],
    manager: {
      id: '71fbd08b-e042-4486-90da-59531a26b480',
      name: 'Przemysław',
      surname: 'Górecki',
    },
  },
  {
    id: 'f695c769-9112-4899-9c81-a1e0c9acfe41',
    name: 'Karolina',
    surname: 'Wiśniewska',
    employmentDate: new Date(2022, 10, 10, 0, 0, 0, 0),
    skills: [
      {
        id: 'c96fddf4-973e-42d5-9712-16af18b330b6',
        name: 'Ruby',
      },
      {
        id: '7e7ccaad-2664-4370-a26a-ed3f51f65189',
        name: 'HTML',
      },
      {
        id: 'f9c822c5-c800-4388-9f30-e7665e7906f1',
        name: 'CSS',
      },
      {
        id: 'eab3a357-7e0f-408e-8b1e-7914418414a4',
        name: 'TypeScript',
      },
    ],
    projects: [],
    manager: {
      id: 'ed41db9e-6370-49ca-ae9f-1724f3db8518',
      name: 'Jan',
      surname: 'Kowalski',
    },
  },
  {
    id: '688caa6c-7990-48f0-94e5-5ed08f86b23f',
    name: 'Janusz',
    surname: 'Kowalski',
    employmentDate: new Date(2022, 8, 28, 0, 0, 0, 0),
    skills: [
      {
        id: 'd29314fd-409d-44e3-b2a0-ed24c6b7a913',
        name: 'Kotlin',
      },
      {
        id: '826dffbc-4994-4109-812d-864dd19bdc1d',
        name: 'Firebase',
      },
      {
        id: 'e291ce7e-37d6-4b3f-b064-26960747d0d4',
        name: 'Swift',
      },
      {
        id: 'e6c5bbf9-adab-4f65-984f-d32cf1ca7807',
        name: 'Go',
      },
      {
        id: '7e7ccaad-2664-4370-a26a-ed3f51f65189',
        name: 'HTML',
      },
      {
        id: 'f9c822c5-c800-4388-9f30-e7665e7906f1',
        name: 'CSS',
      },
      {
        id: 'eab3a357-7e0f-408e-8b1e-7914418414a4',
        name: 'TypeScript',
      },
      {
        id: 'fca3e32a-6ed7-49db-8a32-04d8b5226e23',
        name: 'PHP',
      },
    ],
    projects: [
      {
        id: '1e35b849-3c21-4868-a8c2-dab73c1b1e00',
        name: 'DataTrackr',
      },
      {
        id: '381f1e43-ac97-429d-91c8-cec9759ac098',
        name: 'eHealthPlus',
      },
    ],
    manager: undefined,
  },
  {
    id: '0690e01f-c279-46e2-ae31-8b5a5ff695e2',
    name: 'Piotr',
    surname: 'Jankowski',
    employmentDate: new Date(2023, 1, 15, 0, 0, 0, 0),
    skills: [
      {
        id: '7e7ccaad-2664-4370-a26a-ed3f51f65189',
        name: 'HTML',
      },
      {
        id: 'f9c822c5-c800-4388-9f30-e7665e7906f1',
        name: 'CSS',
      },
      {
        id: 'eab3a357-7e0f-408e-8b1e-7914418414a4',
        name: 'TypeScript',
      },
      {
        id: '24929628-06e5-4a67-8b5e-69dd2a72e935',
        name: 'MySQL',
      },
    ],
    projects: [
      {
        id: '381f1e43-ac97-429d-91c8-cec9759ac098',
        name: 'eHealthPlus',
      },
    ],
    manager: {
      id: '688caa6c-7990-48f0-94e5-5ed08f86b23f',
      name: 'Janusz',
      surname: 'Kowalski',
    },
  },
];
