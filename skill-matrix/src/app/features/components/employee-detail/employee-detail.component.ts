import { Component, Input } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validator,
  Validators,
} from '@angular/forms';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss'],
})
export class EmployeeDetailComponent {
  @Input() employee?: Employee;

  employeeProfileForm = this.formBuilder.group({
    id: [this.employee?.id],
    name: ['', Validators.required],
    surname: ['', Validators.required],
    employmentDate: ['', Validators.required],
    listOfSkills: this.formBuilder.array([]),
    listOfProjects: this.formBuilder.array([]),
    manager: [''],
  });

  get listOfProjects() {
    return this.employeeProfileForm.get('listOfProjects') as FormArray;
  }

  get listOfSkills() {
    return this.employeeProfileForm.get('listOfSkills') as FormArray;
  }

  addUndefinedProject(): void {
    const length = this.listOfSkills.length;
    if (
      this.listOfProjects.length < 1 ||
      this.listOfProjects.at(length - 1).value != ''
    )
      this.listOfProjects.push(this.formBuilder.control(''));
  }

  removeProjectAt(index: number): void {
    this.listOfProjects.removeAt(index);
  }

  addUndefinedSkill(): void {
    if (
      this.listOfSkills.length < 1 ||
      this.listOfSkills.at(length - 1).value != ''
    )
      this.listOfSkills.push(this.formBuilder.control(''));
  }

  removeSkillAt(index: number): void {
    this.listOfSkills.removeAt(index);
  }

  updateProfile(): void {
    this.employeeProfileForm.patchValue({
      name: '',
      surname: '',
      employmentDate: '',
      // listOfSkills: {
      //   'skill 1', 'skill 2',
      // }
      // listOfProjects: {
      //   'project 1', 'project 2',
      // }
      manager: '',
    });
  }

  constructor(private formBuilder: FormBuilder) {}
}
