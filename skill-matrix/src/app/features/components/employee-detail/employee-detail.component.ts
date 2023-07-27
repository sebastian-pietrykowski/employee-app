import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../../models/employee';
import { MOCK_PROJECTS } from '../../mocks/mock-projects';
import { MOCK_SKILLS } from '../../mocks/mock-skills';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss'],
})
export class EmployeeDetailComponent {
  @Input() employee?: Employee;
  @Input() employeeList!: Employee[];
  @Output() removeEmployeeEvent = new EventEmitter<string>();
  @Output() updateEmployeeProfileEvent = new EventEmitter<Employee>();

  employeeProfileForm: FormGroup = new FormGroup({});
  possibleProjectsList: string[] = MOCK_PROJECTS;
  possibleSkillsList: string[] = MOCK_SKILLS;

  constructor(private formBuilder: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['employee']) {
      this.employeeProfileForm = this.formBuilder.group({
        id: [this.employee?.id],
        name: [
          this.employee?.name,
          [Validators.required, Validators.minLength(3)],
        ],
        surname: [
          this.employee?.surname,
          [Validators.required, Validators.minLength(3)],
        ],
        employmentDate: [
          this.employee?.employmentDate.toISOString().slice(0, 10),
          Validators.required,
        ],
        listOfSkills: this.formBuilder.array(
          this.employee ? this.employee.listOfSkills : [''],
        ),
        listOfProjects: this.formBuilder.array(
          this.employee ? this.employee.listOfProjects : [''],
        ),
        managerId: [this.employee?.managerId],
      });
      this.employeeProfileForm
        .get('managerId')
        ?.setValue(this.employee?.managerId);
    }
  }

  updateEmployeeProfile(): void {
    const employee: Employee = this.employeeProfileForm.getRawValue();
    employee.employmentDate = new Date(employee.employmentDate);
    this.updateEmployeeProfileEvent.emit(employee);
  }

  removeEmployeeProfile(employeeId: string): void {
    this.removeEmployeeEvent.emit(employeeId);
  }

  get listOfProjects() {
    return this.employeeProfileForm.get('listOfProjects') as FormArray;
  }

  get listOfSkills() {
    return this.employeeProfileForm.get('listOfSkills') as FormArray;
  }

  addUndefinedProjectIfFirstOrLastIsNotEmpty(): void {
    if (
      this.listOfProjects.length < 1 ||
      this.listOfProjects.at(length - 1).value != ''
    )
      this.listOfProjects.push(this.formBuilder.control(''));
  }

  removeProjectAt(index: number): void {
    this.listOfProjects.removeAt(index);
  }

  addUndefinedSkillIfFirstOrLastIsNotEmpty(): void {
    if (
      this.listOfSkills.length < 1 ||
      this.listOfSkills.at(length - 1).value != ''
    )
      this.listOfSkills.push(this.formBuilder.control(''));
  }

  removeSkillAt(index: number): void {
    this.listOfSkills.removeAt(index);
  }

  determineListOfPossibleManagers(): Employee[] {
    return this.employeeList.filter((e) => {
      return e.id !== this.employee?.id;
    });
  }
}
