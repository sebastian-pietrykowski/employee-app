import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { EmployeeRequest } from '../models/employee-request';
import { EmployeeResponse } from '../models/employee-response';
import { ErrorLoggingService } from './error-logging-service';
import { Injectable } from '@angular/core';
import { Manager } from '../models/manager';
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

  addEmployee(employeeToAdd: EmployeeRequest): Observable<EmployeeResponse> {
    return this.http
      .post<EmployeeResponse>(
        this.employeesUrl,
        employeeToAdd,
        this.httpOptions,
      )
      .pipe(
        tap((newEmployee: EmployeeResponse) =>
          super.log('messages.employee.service.added', {
            id: newEmployee.id,
          }),
        ),
        catchError(super.handleError<EmployeeResponse>('addEmployee')),
      );
  }

  deleteEmployee(id: string): Observable<void> {
    const url = `${this.employeesUrl}/${id}`;
    return this.http.delete<void>(url).pipe(
      tap(() =>
        super.log('messages.employee.service.deleted', {
          id: id,
        }),
      ),
      catchError(super.handleError<void>('deleteEmployee')),
    );
  }

  getEmployee(id: string): Observable<EmployeeResponse> {
    const url = `${this.employeesUrl}/${id}`;
    return this.http.get<EmployeeResponse>(url).pipe(
      tap(() => super.log('messages.employee.service.fetched')),
      catchError(super.handleError<EmployeeResponse>('getEmployee')),
    );
  }

  getEmployees(): Observable<EmployeeResponse[]> {
    return this.http.get<EmployeeResponse[]>(this.employeesUrl).pipe(
      tap(() => super.log('messages.employee.service.fetched')),
      catchError(super.handleError<EmployeeResponse[]>('getEmployees', [])),
    );
  }

  getManagers(): Observable<Manager[]> {
    return this.http.get<Manager[]>(this.employeesUrl + '/managers').pipe(
      tap(() => super.log('messages.employee.service.manager.fetched')),
      catchError(super.handleError<EmployeeResponse[]>('getManagers', [])),
    );
  }

  searchEmployees(term: string): Observable<EmployeeResponse[]> {
    if (!term.trim()) {
      return of([]);
    }

    const url = `${this.employeesUrl}?term=${term}`;

    return this.http.get<EmployeeResponse[]>(url).pipe(
      tap((employees: EmployeeResponse[]) => {
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

  updateEmployee(
    employeeToUpdate: EmployeeRequest,
  ): Observable<EmployeeResponse> {
    const url = this.employeesUrl + '/' + employeeToUpdate.id;
    return this.http
      .put<EmployeeResponse>(url, employeeToUpdate, this.httpOptions)
      .pipe(
        tap(() =>
          super.log('messages.employee.service.updated', {
            id: employeeToUpdate.id,
          }),
        ),
        catchError(super.handleError<EmployeeResponse>('updateEmployee')),
      );
  }
}
