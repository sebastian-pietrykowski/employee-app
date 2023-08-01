import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormArray,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { Employee } from '../../models/employee';
import { ProjectService } from '../../../core/services/project.service';
import { SkillService } from '../../../core/services/skill.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss'],
})
export class EmployeeDetailComponent implements OnChanges, OnInit {
  @Input({ required: true }) employee?: Employee;
  @Input({ required: true }) employeeList!: Employee[];
  @Output() removeEmployeeEvent = new EventEmitter<string>();
  @Output() updateEmployeeProfileEvent = new EventEmitter<Employee>();

  employeeProfileForm: FormGroup;
  possibleProjectsList: string[] = [];
  possibleSkillsList: string[] = [];

  constructor(
    private readonly projectService: ProjectService,
    private readonly skillService: SkillService,
    private formBuilder: NonNullableFormBuilder,
  ) {
    this.employeeProfileForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.getProjects();
    this.getSkills();
  }

  private getProjects(): void {
    this.projectService
      .getProjects()
      .pipe(take(1))
      .subscribe((projects) => (this.possibleProjectsList = projects));
  }

  private getSkills(): void {
    this.skillService
      .getSkills()
      .pipe(take(1))
      .subscribe((skills) => (this.possibleSkillsList = skills));
  }

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
        managerId: [this.employee ? this.employee.managerId : undefined],
      });
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

  addProjectControlIfNeeded(): void {
    if (
      this.listOfProjects.length < 1 ||
      this.listOfProjects.at(length - 1).value != ''
    )
      this.listOfProjects.push(this.formBuilder.control(''));
  }

  removeProjectAt(index: number): void {
    this.listOfProjects.removeAt(index);
  }

  addSkillControlIfNeeded(): void {
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
    return this.employeeList?.filter((e) => {
      return e.id !== this.employee?.id;
    });
  }
}
