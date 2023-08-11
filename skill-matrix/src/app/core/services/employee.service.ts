import { EMPTY, Observable, Subject, of, takeUntil } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';
import { Employee } from '../models/employee';
import { MOCK_EMPLOYEES } from '../mocks/mock-employees';
import { MessageService } from './message.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService implements OnDestroy {
  private employees: Employee[] = MOCK_EMPLOYEES;
  private unsubscribe$ = new Subject();

  constructor(
    private readonly translateService: TranslateService,
    private readonly messageService: MessageService,
  ) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next(undefined);
    this.unsubscribe$.complete();
  }

  containsEmployee(id: string): Observable<boolean> {
    return of(this.employees.some((employee: Employee) => employee.id === id));
  }

  deleteEmployee(id: string): void {
    this.employees = this.employees.filter(
      (employee: Employee) => employee.id !== id,
    );

    this.translateService
      .get('messages.employee.service.deleted', { id: id })
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((translated: string) => this.messageService.add(translated));
  }

  getCount(): Observable<number> {
    return of(this.employees.length);
  }

  getNewId(): Observable<string> {
    const lastIndex = this.employees.length - 1;
    return of((Number(this.employees.at(lastIndex)?.id || 0) + 1).toString());
  }

  getEmployee(id: string): Observable<Employee> {
    const employee = this.employees.find(
      (employee: Employee) => employee.id === id,
    );

    this.translateService
      .get('messages.employee.service.fetched')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((translated: string) => this.messageService.add(translated));

    return employee ? of(employee) : EMPTY;
  }

  getEmployees(): Observable<Employee[]> {
    const employees = this.employees ? of(this.employees) : EMPTY;

    this.translateService
      .get('messages.employee.service.fetched')
      .pipe(takeUntil(this.unsubscribe$))
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
