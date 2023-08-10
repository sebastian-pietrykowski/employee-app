import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Employee } from '../../core/models/employee';
import { EmployeeService } from '../../core/services/employee.service';
import { MessageService } from '../../core/services/message.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit, OnDestroy {
  employeeList: Employee[] = [];
  selectedEmployee?: Employee;
  private unsubscribe$ = new Subject();

  constructor(
    private readonly employeeService: EmployeeService,
    private readonly messageService: MessageService,
    private readonly translateService: TranslateService,
  ) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(undefined);
    this.unsubscribe$.complete();
  }

  private getEmployees(): void {
    this.employeeService
      .getCount()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((count: number) => {
        this.employeeService
          .getEmployees(0, count)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe((employees) => (this.employeeList = employees));
      });
  }
}
