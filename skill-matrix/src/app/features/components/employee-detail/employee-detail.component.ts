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
    this.getProjects();
    this.getSkills();
  }

  private getProjects(): void {
    const nOfProjectsToLoad = 10;
    this.projectService
      .getProjects()
      .pipe(take(nOfProjectsToLoad))
      .subscribe((projects) => (this.allPossibleProjectsList = projects));
  }

  private getSkills(): void {
    const nOfSkillsToLoad = 24;
    this.skillService
      .getSkills()
      .pipe(take(nOfSkillsToLoad))
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
          this.createFormControlWithValidatorsForArrayFromValue(skill),
        ),
      ),
      listOfProjects: this.formBuilder.array(
        (this.employee ? this.employee.listOfProjects : ['']).map((project) =>
          this.createFormControlWithValidatorsForArrayFromValue(project),
        ),
      ),
      managerId: [this.employee ? this.employee.managerId : undefined],
    });
  }

  private createFormControlWithValidatorsForArrayFromValue(
    value: string,
  ): FormControl {
    return this.formBuilder.control(value, Validators.required);
  }

  updateEmployeeProfile(): void {
    const employee: Employee = this.employeeProfileForm.getRawValue();
    employee.employmentDate = new Date(employee.employmentDate);
    this.updateEmployeeProfileEvent.emit(employee);

    const message = this.translationService.instant(
      'messages.employee.detail.component.updated',
      { id: employee.id },
    );
    this.messageService.add(message);
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
      formArray.push(this.createFormControlWithValidatorsForArrayFromValue(''));
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

  private determineListOfElementsNotAddedToFormArrayWithOneAlreadyAdded(
    allPossibleValues: string[],
    formArray: FormArray,
    additionalValue: string,
  ) {
    return allPossibleValues.filter(
      (value) => !formArray.value.includes(value) || value === additionalValue,
    );
  }

  determineListOfPossibleNewProjectsAndOneAlreadyAdded(usedProject: string) {
    return this.determineListOfElementsNotAddedToFormArrayWithOneAlreadyAdded(
      this.allPossibleProjectsList,
      this.employeeProfileForm.get('listOfProjects') as FormArray,
      usedProject,
    );
  }

  determineListOfPossibleNewSkillsAndOneAlreadyAdded(usedSkill: string) {
    return this.determineListOfElementsNotAddedToFormArrayWithOneAlreadyAdded(
      this.allPossibleSkillsList,
      this.employeeProfileForm.get('listOfSkills') as FormArray,
      usedSkill,
    );
  }

  undoChangesInForm() {
    this.fillForm();
  }

  checkIfLastElementsOfProjectsAndSkillsInEmployeeFormAreNotEmpty(): boolean {
    return (
      this.listOfProjects.value.at(-1) != '' &&
      this.listOfSkills.value.at(-1) != ''
    );
  }
}
