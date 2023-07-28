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
      employeeToUpdate.id = (Number(lastIdInArray) + 1).toString();
      this.employeeList.push(employeeToUpdate);
    }

    const indexOfElemToChange = this.employeeList.findIndex(
      (e) => e.id === employeeToUpdate.id,
    );
    this.employeeList.splice(indexOfElemToChange, 1, employeeToUpdate);
  }

  removeEmployee(employeeToRemoveId: string): void {
    this.selectedEmployee = undefined;
    this.employeeList = this.employeeList.filter(
      (e) => e.id !== employeeToRemoveId,
    );

    this.employeeList.forEach((e) => {
      if (e.managerId === employeeToRemoveId) {
        e.managerId = undefined;
      }
    });
  }
}
