import { Component, OnInit } from '@angular/core';
import {
  EMPTY,
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs';
import { EmployeeResponse } from '../../../../core/models/employee-response';
import { EmployeeService } from '../../../../core/services/employee.service';
import { ROUTE_PATHS } from '../../../../config/route-paths';

@Component({
  selector: 'app-employee-search',
  templateUrl: './employee-search.component.html',
  styleUrls: ['./employee-search.component.scss'],
})
export class EmployeeSearchComponent implements OnInit {
  employees$: Observable<EmployeeResponse[]> = EMPTY;

  protected readonly SHOW_EMPLOYEE = ROUTE_PATHS.SHOW_EMPLOYEE;

  private searchTerms = new Subject<string>();

  constructor(private readonly employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employees$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.employeeService.searchEmployees(term)),
    );
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }
}
