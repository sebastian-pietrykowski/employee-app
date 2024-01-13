import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { EmployeeResponse } from '../../core/models/employee-response';
import { EmployeeService } from '../../core/services/employee.service';
import { ROUTE_PATHS } from '../../config/route-paths';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

export interface EmployeeTableRow {
  id: string;
  name: string;
  surname: string;
  employmentDate: Date;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  recentlyEmployedEmployees: EmployeeTableRow[] = [];
  recentlyEmployedEmployeesHeaders = [
    'index',
    'name',
    'surname',
    'employmentDate',
  ];
  isLoading = true;

  protected readonly ROUTE_PATHS = ROUTE_PATHS;

  private recentlyEmployedEmployeesLength = 5;
  private unsubscribe$ = new Subject();

  constructor(
    private readonly employeeService: EmployeeService,
    readonly translateService: TranslateService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(undefined);
    this.unsubscribe$.complete();
  }

  private loadEmployees(): void {
    this.employeeService
      .getEmployees()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((employees) => {
        this.recentlyEmployedEmployees =
          this.extractRecentlyEmployedEmployees(employees);
        this.isLoading = false;
      });
  }

  private extractRecentlyEmployedEmployees(
    employees: EmployeeResponse[],
  ): EmployeeTableRow[] {
    return employees
      .sort(
        (first, second) =>
          new Date(second.employmentDate).getDate() -
          new Date(first.employmentDate).getDate(),
      )
      .slice(0, this.recentlyEmployedEmployeesLength)
      .map(
        (employeeResponse) =>
          <EmployeeTableRow>{
            id: employeeResponse.id,
            name: employeeResponse.name,
            surname: employeeResponse.surname,
            employmentDate: employeeResponse.employmentDate,
          },
      );
  }
}
