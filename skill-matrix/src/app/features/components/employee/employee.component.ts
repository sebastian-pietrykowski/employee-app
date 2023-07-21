import { Component } from '@angular/core';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent {
  employee: Employee = {
    id: '1',
    name: 'Jan',
    surname: 'Kowalski',
    employmentDate: new Date(2023, 7, 17, 10, 0, 0, 0),
    listOfSkills: ['skill 1', 'skill 2'],
    listOfProjects: ['project 1', 'project 2'],
    manager: undefined,
  };
}
