import { EMPTY, Observable, of } from 'rxjs';
import { Employee } from '../../features/models/employee';
import { Injectable } from '@angular/core';
import { MOCK_EMPLOYEES } from '../../features/mocks/mock-employees';
import { MessageService } from './message.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  employees: Employee[] = MOCK_EMPLOYEES;

  constructor(
    private readonly translateService: TranslateService,
    private readonly messageService: MessageService,
  ) {}

  containsEmployee(id: string) {
    return this.employees.some((employee: Employee) => employee.id === id);
  }

  deleteEmployee(id: string): void {
    this.employees = this.employees.filter(
      (employee: Employee) => employee.id !== id,
    );

    this.translateService
      .get('messages.employee.service.deleted', { id: id })
      .subscribe((translated: string) => this.messageService.add(translated));
  }

  getCount(): Observable<number> {
    return of(this.employees.length);
  }

  getNewId(): string {
    const lastIndex = this.employees.length - 1;
    return (Number(this.employees.at(lastIndex)?.id || 0) + 1).toString();
  }

  getEmployee(id: string): Observable<Employee> {
    const employee = this.employees.find(
      (employee: Employee) => employee.id === id,
    );

    this.translateService
      .get('messages.employee.service.fetched')
      .subscribe((translated: string) => this.messageService.add(translated));

    return employee ? of(employee) : EMPTY;
  }

  getEmployees(startIndex: number, endIndex: number): Observable<Employee[]> {
    const employees = this.employees.slice(startIndex, endIndex);

    this.translateService
      .get('messages.employee.service.fetched')
      .subscribe((translated: string) => this.messageService.add(translated));

    return employees ? of(employees) : EMPTY;
  }

  getEmployeesExceptOne(
    startIndex: number,
    endIndex: number,
    exceptionEmployeeId: string,
  ): Observable<Employee[]> {
    const employees = of(
      this.employees
        .slice(startIndex, endIndex)
        .filter((employee) => employee.id !== exceptionEmployeeId),
    );

    this.translateService
      .get('messages.employee.service.fetched')
      .subscribe((translated: string) => this.messageService.add(translated));

    return employees;
  }

  updateEmployee(employeeToUpdate: Employee) {
    const indexOfElemToChange = this.employees.findIndex(
      (employee: Employee) => employee.id === employeeToUpdate.id,
    );
    if (indexOfElemToChange !== -1) {
      this.employees.splice(indexOfElemToChange, 1, employeeToUpdate);
    } else {
      this.employees.push(employeeToUpdate);
    }

    const message = this.translateService.instant(
      'messages.employee.service.updated',
      { id: employeeToUpdate.id },
    );
    this.messageService.add(message);
  }
}
