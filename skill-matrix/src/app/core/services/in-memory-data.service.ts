import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
import { MOCK_EMPLOYEES } from '../mocks/mock-employees';
import { MOCK_PROJECTS } from '../mocks/mock-projects';
import { MOCK_SKILLS } from '../mocks/mock-skills';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const db = {
      employees: MOCK_EMPLOYEES,
      generateEmployeeId: (): string => {
        const lastIndex = db.employees.length - 1;
        const idAtLastIndex = db.employees.at(lastIndex)?.id ?? '0';

        return (Number(idAtLastIndex) + 1).toString();
      },
      projects: MOCK_PROJECTS,
      skills: MOCK_SKILLS,
    };

    return db;
  }
}
