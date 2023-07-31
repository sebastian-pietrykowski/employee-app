import { Observable, of } from 'rxjs';
import { Employee } from '../../features/models/employee';
import { Injectable } from '@angular/core';
import { MOCK_EMPLOYEES } from '../../features/mocks/mock-employees';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  employees: Employee[] = MOCK_EMPLOYEES;

  getEmployees(): Observable<Employee[]> {
    return of(this.employees);
  }
}
