import { Component } from '@angular/core';
import { Employee } from '../../models/employee';
import { MOCK_EMPLOYEES } from '../../mocks/mock-employees';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent {
  employeeList: Array<Employee> = MOCK_EMPLOYEES;
  selectedEmployee?: Employee;
  onSelect(employee: Employee) {
    this.selectedEmployee = employee;
  }
}
