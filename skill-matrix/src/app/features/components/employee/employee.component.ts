import { Component } from '@angular/core';
import { Employee } from '../../models/employee';
import { MOCK_EMPLOYEES } from '../../mocks/mock-employees';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent {
  employeeList: Employee[] = MOCK_EMPLOYEES;
  selectedEmployee?: Employee;

  onSelect(employee: Employee): void {
    this.selectedEmployee = employee;
  }

  createEmptyEmployee(): Employee {
    return {
      id: '',
      name: '',
      surname: '',
      employmentDate: new Date(),
      managerId: undefined,
      listOfSkills: [],
      listOfProjects: [],
    };
  }

  updateEmployee(employeeToUpdate: Employee): void {
    this.selectedEmployee = employeeToUpdate;
    if (employeeToUpdate.id == '') {
      const lastIdInArray = this.employeeList[this.employeeList.length - 1].id;
      employeeToUpdate.id = String(Number(lastIdInArray) + 1);
      this.employeeList.push(employeeToUpdate);
    }

    for (let i = 0; i < this.employeeList.length; ++i)
      if (this.employeeList[i].id == employeeToUpdate.id) {
        this.employeeList[i] = employeeToUpdate;
        return;
      }
  }

  removeEmployee(employeeToRemoveId: string): void {
    this.selectedEmployee = undefined;
    this.employeeList = this.employeeList.filter((e) => {
      return e.id !== employeeToRemoveId;
    });

    this.employeeList.forEach((e) => {
      if (e.managerId == employeeToRemoveId) {
        e.managerId = undefined;
      }
    });
  }
}
