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
  FormControl,
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
  allPossibleProjectsList: string[] = [];
  allPossibleSkillsList: string[] = [];

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
      .subscribe((projects) => (this.allPossibleProjectsList = projects));
  }

  private getSkills(): void {
    this.skillService
      .getSkills()
      .pipe(take(1))
      .subscribe((skills) => (this.allPossibleSkillsList = skills));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['employee']) {
      this.fillForm();
    }
  }

  private fillForm(): void {
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
        (this.employee ? this.employee.listOfSkills : ['']).map((skill) =>
          this.createArrayFormControlWithValidators(skill),
        ),
      ),
      listOfProjects: this.formBuilder.array(
        (this.employee ? this.employee.listOfProjects : ['']).map((project) =>
          this.createArrayFormControlWithValidators(project),
        ),
      ),
      managerId: [this.employee ? this.employee.managerId : undefined],
    });
  }

  private createArrayFormControlWithValidators(value: string): FormControl {
    return this.formBuilder.control(value, Validators.required);
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

  private addElementToFormArrayIfNeeded(formArray: FormArray) {
    if (formArray.length < 1 || formArray.at(length - 1).value != '')
      formArray.push(this.createArrayFormControlWithValidators(''));
  }

  addProjectControlIfNeeded(): void {
    this.addElementToFormArrayIfNeeded(this.listOfProjects);
  }

  removeProjectAt(index: number): void {
    this.listOfProjects.removeAt(index);
  }

  addSkillControlIfNeeded(): void {
    this.addElementToFormArrayIfNeeded(this.listOfSkills);
  }

  removeSkillAt(index: number): void {
    this.listOfSkills.removeAt(index);
  }

  determineListOfPossibleManagers(): Employee[] {
    return this.employeeList?.filter((e) => {
      return e.id !== this.employee?.id;
    });
  }

  private createExcludedListWithOtherElem(
    allPossibleValues: string[],
    exclusionList: FormArray,
    otherElem: string,
  ) {
    return allPossibleValues
      .filter((value) => !exclusionList.value.includes(value))
      .concat(otherElem);
  }

  createAvailableProjectListWithOther(otherProject: string) {
    return this.createExcludedListWithOtherElem(
      this.allPossibleProjectsList,
      this.employeeProfileForm.get('listOfProjects') as FormArray,
      otherProject,
    );
  }

  createAvailableSkillListWithOther(otherSkill: string) {
    return this.createExcludedListWithOtherElem(
      this.allPossibleSkillsList,
      this.employeeProfileForm.get('listOfSkills') as FormArray,
      otherSkill,
    );
  }

  undoChangesInForm() {
    this.fillForm();
  }

  checkIfLastProjectAndSkillAreNotEmpty(): boolean {
    return (
      this.listOfProjects.value.at(-1) != '' &&
      this.listOfSkills.value.at(-1) != ''
    );
  }
}
