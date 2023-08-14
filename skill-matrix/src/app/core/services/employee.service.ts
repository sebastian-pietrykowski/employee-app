import { catchError, EMPTY, Observable, of, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';
import { ErrorLoggingService } from './error-logging-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MOCK_EMPLOYEES } from '../mocks/mock-employees';
import { MessageService } from './message.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService extends ErrorLoggingService {
  private readonly employees: Employee[] = MOCK_EMPLOYEES;
  private readonly employeesUrl = 'api/employees';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    messageService: MessageService,
    translateService: TranslateService,
    private readonly http: HttpClient,
  ) {
    super(EmployeeService.name, messageService, translateService);
  }

  addEmployee(employeeToAdd: Employee): Observable<any> {
    return this.http
      .put<Employee>(this.employeesUrl, employeeToAdd, this.httpOptions)
      .pipe(
        catchError(super.handleError<any>('addEmployee')),
        tap(() =>
          super.log('messages.employee.service.added', {
            id: employeeToAdd.id,
          }),
        ),
      );
  }

  // containsEmployee(id: string): Observable<boolean> {
  //   let employee;
  //   this.http
  //     .get<Employee>(`${this.employeesUrl}/${id}`)
  //     .pipe(
  //       catchError(super.handleError<Employee>('getEmployee')),
  //       tap(() => super.log('messages.employee.service.fetched')),
  //     )
  //     .subscribe((employee: Employee) => employee != undefined);
  // }

  deleteEmployee(id: string): void {
    // this.employees = this.employees.filter(
    //   (employee: Employee) => employee.id !== id,
    // );

    super.log('messages.employee.service.deleted', { id: id });
  }

  getCount(): Observable<number> {
    return of(this.employees.length);
  }

  generateId(): Observable<string> {
    const lastIndex = this.employees.length - 1;
    return of((Number(this.employees.at(lastIndex)?.id ?? 0) + 1).toString());
  }

  getEmployee(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.employeesUrl}/${id}`).pipe(
      catchError(super.handleError<Employee>('getEmployee')),
      tap(() => super.log('messages.employee.service.fetched')),
    );
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.employeesUrl).pipe(
      catchError(super.handleError<Employee[]>('getEmployees', [])),
      tap(() => super.log('messages.employee.service.fetched')),
    );
  }

  updateEmployee(employeeToUpdate: Employee): Observable<any> {
    return this.http
      .put<Employee>(this.employeesUrl, employeeToUpdate, this.httpOptions)
      .pipe(
        catchError(super.handleError<any>('updateEmployee')),
        tap(() =>
          super.log('messages.employee.service.updated', {
            id: employeeToUpdate.id,
          }),
        ),
      );
  }
}
