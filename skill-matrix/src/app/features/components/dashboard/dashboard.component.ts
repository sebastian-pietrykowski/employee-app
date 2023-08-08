import {Component, OnDestroy} from '@angular/core';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../../core/services/employee.service';
import { Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnDestroy {
  employees: Employee[] = [];
  private $unsubscribe = new Subject();

  constructor(private readonly employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  ngOnDestroy(): void {
    this.$unsubscribe.next(undefined);
    this.$unsubscribe.complete();
  }

  private loadEmployees(): void {
    this.employeeService
      .getCount()
      .pipe(takeUntil(this.$unsubscribe))
      .subscribe((count) => {
        this.employeeService
          .getEmployees(0, count)
          .pipe(takeUntil(this.$unsubscribe))
          .subscribe((employees) => (this.employees = employees));
      });
  }
}
