import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { Employee } from '../models/employee';
import { ErrorLoggingService } from './error-logging-service';
import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService extends ErrorLoggingService {
  private readonly employeesUrl = environment.apiBaseUrl + '/employees';
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

  addEmployee(employeeToAdd: Employee): Observable<Employee> {
    return this.http
      .post<Employee>(this.employeesUrl, employeeToAdd, this.httpOptions)
      .pipe(
        tap((newEmployee: Employee) =>
          super.log('messages.employee.service.added', {
            id: newEmployee.id,
          }),
        ),
        catchError(super.handleError<Employee>('addEmployee')),
      );
  }

  deleteEmployee(id: string): Observable<Employee> {
    const url = `${this.employeesUrl}/${id}`;
    return this.http.delete<Employee>(url).pipe(
      tap(() =>
        super.log('messages.employee.service.deleted', {
          id: id,
        }),
      ),
      catchError(super.handleError<Employee>('deleteEmployee')),
    );
  }

  getEmployee(id: string): Observable<Employee> {
    const url = `${this.employeesUrl}/${id}`;
    return this.http.get<Employee>(url).pipe(
      tap(() => super.log('messages.employee.service.fetched')),
      catchError(super.handleError<Employee>('getEmployee')),
    );
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.employeesUrl).pipe(
      tap(() => super.log('messages.employee.service.fetched')),
      catchError(super.handleError<Employee[]>('getEmployees', [])),
    );
  }

  searchEmployees(term: string): Observable<Employee[]> {
    if (!term.trim()) {
      return of([]);
    }

    const url = `${this.employeesUrl}/?name=${term}`;

    return this.http.get<Employee[]>(url).pipe(
      tap((employees: Employee[]) => {
        if (employees.length) {
          this.log('messages.employee.service.search.success', {
            term: term,
          });
        } else {
          this.log('messages.employee.service.search.failure');
        }
      }),
    );
  }

  updateEmployee(employeeToUpdate: Employee): Observable<Employee> {
    return this.http
      .put<Employee>(this.employeesUrl, employeeToUpdate, this.httpOptions)
      .pipe(
        tap(() =>
          super.log('messages.employee.service.updated', {
            id: employeeToUpdate.id,
          }),
        ),
        catchError(super.handleError<Employee>('updateEmployee')),
      );
  }
}
