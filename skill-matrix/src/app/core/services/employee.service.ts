import { Observable, of } from 'rxjs';
import { Employee } from '../../features/models/employee';
import { Injectable } from '@angular/core';
import { MOCK_EMPLOYEES } from '../../features/mocks/mock-employees';
import { MessageService } from './message.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  employees: Employee[] = MOCK_EMPLOYEES;

  constructor(
    private readonly translateService: TranslateService,
    private readonly messageService: MessageService,
  ) {}

  getEmployees(): Observable<Employee[]> {
    const employees = of(this.employees);

    this.translateService
      .get('messages.employee.service.fetched')
      .subscribe((translated: string) => this.messageService.add(translated));

    return employees;
  }
}
