import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../../core/services/employee.service';
import { MessageService } from '../../../core/services/message.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit, OnDestroy {
  employeeList: Employee[] = [];
  selectedEmployee?: Employee;
  private $unsubscribe = new Subject();

  constructor(
    private readonly employeeService: EmployeeService,
    private readonly messageService: MessageService,
    private readonly translateService: TranslateService,
  ) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  ngOnDestroy(): void {
    this.$unsubscribe.next(undefined);
    this.$unsubscribe.complete();
  }

  private getEmployees(): void {
    this.employeeService
      .getCount()
      .pipe(takeUntil(this.$unsubscribe))
      .subscribe((count: number) => {
        this.employeeService
          .getEmployees(0, count)
          .pipe(takeUntil(this.$unsubscribe))
          .subscribe((employees) => (this.employeeList = employees));
      });
  }

  onSelect(employee: Employee): void {
    this.selectedEmployee = employee;

    const message = this.translateService.instant(
      'messages.employee.component.selected',
      { id: employee.id },
    );
    this.messageService.add(message);
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
