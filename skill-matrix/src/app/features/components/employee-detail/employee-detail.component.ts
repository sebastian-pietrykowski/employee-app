import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Employee } from '../../models/employee';
import { MessageService } from '../../../core/services/message.service';
import { ProjectService } from '../../../core/services/project.service';
import { SkillService } from '../../../core/services/skill.service';
import { TranslateService } from '@ngx-translate/core';
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

  wasProjectControlRemoved = false;
  wasSkillControlRemoved = false;

  constructor(
    private readonly messageService: MessageService,
    private readonly projectService: ProjectService,
    private readonly skillService: SkillService,
    private readonly translationService: TranslateService,
    private formBuilder: NonNullableFormBuilder,
  ) {
    this.employeeProfileForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.loadProjects();
    this.loadSkills();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['employee']) {
      this.resetForm();
    }
  }

  get listOfProjects() {
    return this.employeeProfileForm.get('listOfProjects') as FormArray;
  }

  get listOfSkills() {
    return this.employeeProfileForm.get('listOfSkills') as FormArray;
  }

  resetForm(): void {
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
      employmentDate: [this.employee?.employmentDate, Validators.required],
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

  updateEmployeeProfile(): void {
    const employee: Employee = this.employeeProfileForm.getRawValue();
    this.updateEmployeeProfileEvent.emit(employee);

    this.wasProjectControlRemoved = false;
    this.wasSkillControlRemoved = false;

    const message = this.translationService.instant(
      'messages.employee.detail.component.updated',
      { id: employee.id },
    );
    this.messageService.add(message);
  }

  removeEmployeeProfile(employeeId: string): void {
    this.removeEmployeeEvent.emit(employeeId);
  }

  addProjectControlIfNeeded(): void {
    this.addElementToFormArrayIfNeeded(this.listOfProjects);
  }

  removeProjectAt(index: number): void {
    this.listOfProjects.removeAt(index);
    this.wasProjectControlRemoved = true;
  }

  addSkillControlIfNeeded(): void {
    this.addElementToFormArrayIfNeeded(this.listOfSkills);
  }

  removeSkillAt(index: number): void {
    this.listOfSkills.removeAt(index);
    this.wasSkillControlRemoved = true;
  }

  determineListOfPossibleManagers(): Employee[] {
    return this.employeeList?.filter((e) => {
      return e.id !== this.employee?.id;
    });
  }

  findAvailableProjectsWithOtherForControl(
    otherProject: string,
    control: AbstractControl,
  ): string[] {
    const availableProjectsWithOther = this.createExcludedListWithOtherElem(
      this.allPossibleProjectsList,
      this.employeeProfileForm.get('listOfProjects') as FormArray,
      otherProject,
    );

    return this.findMatchingStrings(availableProjectsWithOther, control.value);
  }

  findAvailableSkillsWithOtherForControl(
    otherSkill: string,
    control: AbstractControl,
  ): string[] {
    const availableSkillsWithOther = this.createExcludedListWithOtherElem(
      this.allPossibleSkillsList,
      this.employeeProfileForm.get('listOfSkills') as FormArray,
      otherSkill,
    );

    return this.findMatchingStrings(availableSkillsWithOther, control.value);
  }

  checkIfLastProjectAndSkillAreNotEmpty(): boolean {
    return (
      this.listOfProjects.value.at(-1) != '' &&
      this.listOfSkills.value.at(-1) != ''
    );
  }

  private loadProjects(): void {
    this.projectService
      .getProjects()
      .pipe(take(1))
      .subscribe((projects) => (this.allPossibleProjectsList = projects));
  }

  private loadSkills(): void {
    this.skillService
      .getSkills()
      .pipe(take(1))
      .subscribe((skills) => (this.allPossibleSkillsList = skills));
  }

  private createArrayFormControlWithValidators(value: string): FormControl {
    return this.formBuilder.control(value, Validators.required);
  }

  private addElementToFormArrayIfNeeded(formArray: FormArray) {
    if (formArray.length < 1 || formArray.at(length - 1).value != '')
      formArray.push(this.createArrayFormControlWithValidators(''));
  }

  private createExcludedListWithOtherElem(
    allPossibleValues: string[],
    exclusionList: FormArray,
    otherElem: string,
  ) {
    return allPossibleValues.filter(
      (value) => !exclusionList.value.includes(value) || value === otherElem,
    );
  }

  private findMatchingStrings(
    sourceList: string[],
    searchString: string,
  ): string[] {
    return sourceList.filter((elem) =>
      elem.toLowerCase().includes(searchString.toLowerCase()),
    );
  }
}
