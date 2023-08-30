import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Subject, map, takeUntil } from 'rxjs';
import { EmployeeRequest } from '../../core/models/employeeRequest';
import { EmployeeResponse } from '../../core/models/employeeResponse';
import { EmployeeService } from '../../core/services/employee.service';
import { Location } from '@angular/common';
import { Manager } from '../../core/models/manager';
import { MessageService } from '../../core/services/message.service';
import { Project } from '../../core/models/project';
import { ProjectService } from '../../core/services/project.service';
import { ROUTE_PATHS } from '../../config/route-paths';
import { Skill } from '../../core/models/skill';
import { SkillService } from '../../core/services/skill.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss'],
})
export class EmployeeDetailComponent implements OnChanges, OnInit, OnDestroy {
  allPossibleProjects: Project[] = [];
  allPossibleSkills: Skill[] = [];
  employee?: EmployeeResponse;
  employeeProfileForm: FormGroup;
  isLoading = true;
  possibleManagers?: Manager[];
  wasProjectControlRemoved = false;
  wasSkillControlRemoved = false;

  private unsubscribe$ = new Subject();

  constructor(
    private readonly employeeService: EmployeeService,
    private readonly messageService: MessageService,
    private readonly projectService: ProjectService,
    private readonly skillService: SkillService,
    private readonly translationService: TranslateService,
    private readonly activatedRoute: ActivatedRoute,
    private formBuilder: NonNullableFormBuilder,
    private readonly location: Location,
    private readonly router: Router,
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

  get projects() {
    return this.employeeProfileForm.get('projects') as FormArray;
  }

  get skills() {
    return this.employeeProfileForm.get('skills') as FormArray;
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
      skills: this.formBuilder.array<FormControl<Skill>>(
        (this.employee ? this.employee.skills : []).map((skill) =>
          this.createArrayFormControlWithValidators(skill.name),
        ),
      ),
      projects: this.formBuilder.array<FormControl<Project>>(
        (this.employee ? this.employee.projects : []).map((project) =>
          this.createArrayFormControlWithValidators(project.name),
        ),
      ),
      manager: [this.employee ? this.employee.manager : undefined],
    });
  }

  deleteEmployee(): void {
    const id = this.employee?.id as string;
    this.employeeService
      .deleteEmployee(id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe();
  }

  submitForm(): void {
    const employeeRequest: EmployeeRequest = this.mapFormToEmployeeRequest();
    console.log(JSON.stringify(employeeRequest));

    const isEmployeeNewlyCreated = this.isEmployeeNewlyCreated();
    if (isEmployeeNewlyCreated) {
      this.employeeService
        .addEmployee(employeeRequest)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((employeeResponse: EmployeeResponse) =>
          this.handleFormSubmit(employeeResponse),
        );
    } else {
      employeeRequest.id = this.employee?.id as string;
      this.employeeService
        .updateEmployee(employeeRequest)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((employeeResponse: EmployeeResponse) =>
          this.handleFormSubmit(employeeResponse),
        );
    }
  }

  addProjectControlIfNeeded(): void {
    this.addElementToFormArrayIfNeeded(this.projects);
  }

  removeProjectAt(index: number): void {
    this.projects.removeAt(index);
    this.wasProjectControlRemoved = true;
  }

  addSkillControlIfNeeded(): void {
    this.addElementToFormArrayIfNeeded(this.skills);
  }

  removeSkillAt(index: number): void {
    this.skills.removeAt(index);
    this.wasSkillControlRemoved = true;
  }

  findProjectsForAutocomplete(
    otherProject: Project,
    control: AbstractControl,
  ): Project[] {
    const availableProjects = this.createExcludedListWithOtherElem(
      this.allPossibleProjects,
      this.employeeProfileForm.get('projects') as FormArray,
      otherProject,
    );
    const searchedTerm = control.value;

    return availableProjects.filter(
      (project) =>
        project?.name.toLowerCase().includes(searchedTerm.toLowerCase()),
    );
  }

  findSkillsForAutocomplete(
    otherSkill: Skill,
    control: AbstractControl,
  ): Skill[] {
    const availableSkills = this.createExcludedListWithOtherElem(
      this.allPossibleSkills,
      this.employeeProfileForm.get('skills') as FormArray,
      otherSkill,
    );
    const searchedTerm = control.value;

    return availableSkills.filter(
      (skill) => skill?.name.toLowerCase().includes(searchedTerm.toLowerCase()),
    );
  }

  checkIfLastProjectAndSkillAreNotEmpty(): boolean {
    return this.projects.value.at(-1) != '' && this.skills.value.at(-1) != '';
  }

  isEmployeeNewlyCreated(): boolean {
    console.log(this.employee?.id === undefined);
    return this.employee?.id === undefined;
  }

  exitPage(): void {
    this.router
      .navigate(['/' + ROUTE_PATHS.EMPLOYEES], {
        relativeTo: this.activatedRoute,
      })
      .then(() => window.location.reload());
  }

  private loadEmployee(): void {
    const employeeId = this.activatedRoute.snapshot.paramMap.get('id');
    const doEmployeeExist = employeeId !== null;
    if (doEmployeeExist) {
      this.employeeService
        .getEmployee(employeeId)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((employeeResponse) => {
          this.employee = employeeResponse;
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
      .getManagers()
      .pipe(
        map((managers: Manager[]) =>
          managers.filter(
            (manager: Manager) => manager.id !== this.employee?.id,
          ),
        ),
        takeUntil(this.unsubscribe$),
      )
      .subscribe((possibleManagers: Manager[]) => {
        this.possibleManagers = possibleManagers;
        if (this.employee) {
          this.employee.manager = possibleManagers.find(
            (manager: Manager) => manager.id == this.employee?.manager?.id,
          );
        }
        this.resetForm();
      });
  }

  private loadPossibleProjects(): void {
    this.projectService
      .getProjects()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((projects) => (this.allPossibleProjects = projects));
  }

  private loadPossibleSkills(): void {
    this.skillService
      .getSkills()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((skills) => (this.allPossibleSkills = skills));
  }

  private handleFormSubmit(employee: EmployeeResponse): void {
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

  private createExcludedListWithOtherElem<T>(
    allPossibleValues: T[],
    exclusionList: FormArray,
    otherElem: T,
  ) {
    return allPossibleValues.filter(
      (value) => !exclusionList.value.includes(value) || value === otherElem,
    );
  }

  private mapFormToEmployeeRequest(): EmployeeRequest {
    const form = this.employeeProfileForm;
    return {
      id: this.employee?.id ?? undefined,
      name: form.get('name')?.value,
      surname: form.get('surname')?.value,
      employmentDate: new Date(form.get('employmentDate')?.value),
      skillIds: (form.get('skills')?.value as Array<string>)
        .map(
          (skillName) =>
            this.allPossibleSkills.find((skill) => skill.name === skillName)
              ?.id,
        )
        .filter((skillName): skillName is string => !!skillName),
      projectIds: (form.get('projects')?.value as Array<string>)
        .map(
          (projectName) =>
            this.allPossibleProjects.find(
              (project) => project.name === projectName,
            )?.id,
        )
        .filter((projectName): projectName is string => !!projectName),
      managerId: (form.get('manager')?.value as Manager)?.id,
    };
  }
}
