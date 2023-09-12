import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { EmployeeResponse } from '../../core/models/employee-response';
import { EmployeeService } from '../../core/services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit, OnDestroy {
  employeeList: EmployeeResponse[] = [];
  isLoading = true;

  private unsubscribe$ = new Subject();

  constructor(private readonly employeeService: EmployeeService) {}

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
        this.employeeList = employees;
        this.isLoading = false;
      });
  }
}
