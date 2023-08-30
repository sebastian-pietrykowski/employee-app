import { EmployeeResponse } from '../models/employeeResponse';
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
      projects: MOCK_PROJECTS,
      skills: MOCK_SKILLS,
    };

    return db;
  }

  genId(employees: EmployeeResponse[]): string {
    const idAtLastIndex = employees.at(-1)?.id ?? '0';

    return (Number(idAtLastIndex) + 1).toString();
  }
}
