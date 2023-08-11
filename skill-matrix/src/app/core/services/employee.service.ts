import { EMPTY, Observable, Subject, of, takeUntil } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';
import { Employee } from '../models/employee';
import { HttpClient } from '@angular/common/http';
import { MOCK_EMPLOYEES } from '../mocks/mock-employees';
import { MessageService } from './message.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService implements OnDestroy {
  private employees: Employee[] = MOCK_EMPLOYEES;
  private employeesUrl = 'api/employees';
  private unsubscribe$ = new Subject();

  constructor(
    private readonly messageService: MessageService,
    private readonly translateService: TranslateService,
    private readonly http: HttpClient,
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
      .subscribe((translated: string) => this.log(translated));
  }

  getCount(): Observable<number> {
    return of(this.employees.length);
  }

  generateId(): Observable<string> {
    const lastIndex = this.employees.length - 1;
    return of((Number(this.employees.at(lastIndex)?.id ?? 0) + 1).toString());
  }

  getEmployee(id: string): Observable<Employee> {
    const employee = this.employees.find(
      (employee: Employee) => employee.id === id,
    );

    this.translateService
      .get('messages.employee.service.fetched')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((translated: string) => this.log(translated));

    return employee ? of(employee) : EMPTY;
  }

  getEmployees(): Observable<Employee[]> {
    const url = `${this.employeesUrl}`;

    this.translateService
      .get('messages.employee.service.fetched')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((translated: string) => this.messageService.add(translated));

    return this.http
      .get<Employee[]>(url)
      .pipe(catchError(this.handleError<Employee[]>('getEmployees', [])));
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
    this.log(message);
  }

  private log(message: string): void {
    this.messageService.add(`EmployeeService: ${message}`);
  }

  private handleError<T>(operation: string, result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
