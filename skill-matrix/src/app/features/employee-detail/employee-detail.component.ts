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
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Subject, map, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../../core/models/employee';
import { EmployeeService } from '../../core/services/employee.service';
import { Location } from '@angular/common';
import { MessageService } from '../../core/services/message.service';
import { ProjectService } from '../../core/services/project.service';
import { SkillService } from '../../core/services/skill.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss'],
})
export class EmployeeDetailComponent implements OnChanges, OnInit, OnDestroy {
  allPossibleProjectsList: string[] = [];
  allPossibleSkillsList: string[] = [];
  employee?: Employee;
  employeeProfileForm: FormGroup;
  isLoading = true;
  possibleManagers?: Employee[];
  wasProjectControlRemoved = false;
  wasSkillControlRemoved = false;

  private unsubscribe$ = new Subject();

  constructor(
    private readonly employeeService: EmployeeService,
    private readonly messageService: MessageService,
    private readonly projectService: ProjectService,
    private readonly skillService: SkillService,
    private readonly translationService: TranslateService,
    private formBuilder: NonNullableFormBuilder,
    private readonly location: Location,
    private readonly route: ActivatedRoute,
  ) {
    this.employeeProfileForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.resetForm();
    this.loadEmployee();
    this.loadPossibleManagers();

    this.loadPossibleProjects();
    this.loadPossibleSkills();
  }

  ngOnDestroy() {
    this.unsubscribe$.next(undefined);
    this.unsubscribe$.complete();
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
      name: [
        this.employee?.name,
        [Validators.required, Validators.minLength(3)],
      ],
      surname: [
        this.employee?.surname,
        [Validators.required, Validators.minLength(3)],
      ],
      employmentDate: [
        this.employee?.employmentDate ?? new Date(),
        Validators.required,
      ],
      listOfSkills: this.formBuilder.array(
        (this.employee ? this.employee.listOfSkills : []).map((skill) =>
          this.createArrayFormControlWithValidators(skill),
        ),
      ),
      listOfProjects: this.formBuilder.array(
        (this.employee ? this.employee.listOfProjects : []).map((project) =>
          this.createArrayFormControlWithValidators(project),
        ),
      ),
      managerId: [this.employee ? this.employee.managerId : undefined],
    });
  }

  deleteEmployee(): void {
    const id = this.employee?.id as string;
    this.employeeService.deleteEmployee(id).subscribe();
  }

  updateEmployee(): void {
    const employee: Employee =
      this.employeeProfileForm.getRawValue() as Employee;

    const isEmployeeNewlyCreated = this.employee?.id === undefined;
    if (isEmployeeNewlyCreated) {
      this.employeeService.addEmployee(employee).subscribe();
      this.handleEmployeeUpdate(employee);
    } else {
      employee.id = this.employee?.id as string;
      this.employeeService.updateEmployee(employee).subscribe();
      this.handleEmployeeUpdate(employee);
    }
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

  findProjectsForAutocomplete(
    otherProject: string,
    control: AbstractControl,
  ): string[] {
    const availableProjects = this.createExcludedListWithOtherElem(
      this.allPossibleProjectsList,
      this.employeeProfileForm.get('listOfProjects') as FormArray,
      otherProject,
    );

    return this.findMatchingStrings(availableProjects, control.value);
  }

  findSkillsForAutocomplete(
    otherSkill: string,
    control: AbstractControl,
  ): string[] {
    const availableSkills = this.createExcludedListWithOtherElem(
      this.allPossibleSkillsList,
      this.employeeProfileForm.get('listOfSkills') as FormArray,
      otherSkill,
    );

    return this.findMatchingStrings(availableSkills, control.value);
  }

  checkIfLastProjectAndSkillAreNotEmpty(): boolean {
    return (
      this.listOfProjects.value.at(-1) != '' &&
      this.listOfSkills.value.at(-1) != ''
    );
  }

  isEmployeeNewlyCreated(): boolean {
    return this.employee?.id === undefined;
  }

  goBack() {
    this.location.back();
  }

  private loadEmployee(): void {
    const employeeId = this.route.snapshot.paramMap.get('id');
    const doEmployeeExist = employeeId !== null;
    if (doEmployeeExist) {
      this.employeeService
        .getEmployee(employeeId)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((employee) => {
          this.employee = employee;
          this.isLoading = false;
          this.resetForm();
        });
    } else {
      this.isLoading = false;
      this.resetForm();
    }
  }

  private loadPossibleManagers(): void {
    this.employeeService
      .getEmployees()
      .pipe(
        map((employees: Employee[]) =>
          employees.filter(
            (employee: Employee) => employee.id !== this.employee?.id,
          ),
        ),
        takeUntil(this.unsubscribe$),
      )
      .subscribe(
        (possibleManagers: Employee[]) =>
          (this.possibleManagers = possibleManagers),
      );
  }

  private loadPossibleProjects(): void {
    this.projectService
      .getProjects()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((projects) => (this.allPossibleProjectsList = projects));
  }

  private loadPossibleSkills(): void {
    this.skillService
      .getSkills()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((skills) => (this.allPossibleSkillsList = skills));
  }

  private handleEmployeeUpdate(employee: Employee): void {
    this.employee = employee;

    this.wasProjectControlRemoved = false;
    this.wasSkillControlRemoved = false;

    this.resetForm();
  }

  private createArrayFormControlWithValidators(value: string): FormControl {
    return this.formBuilder.control(value, Validators.required);
  }

  private addElementToFormArrayIfNeeded(formArray: FormArray) {
    if (formArray.length < 1 || formArray.at(length - 1).value != '') {
      formArray.push(this.createArrayFormControlWithValidators(''));
    }
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
