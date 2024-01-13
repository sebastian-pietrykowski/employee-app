import { ActivatedRoute, Router } from '@angular/router';
import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { Subject, forkJoin, takeUntil } from 'rxjs';
import { EmployeeDetailHelper } from './employee-detail-helper';
import { EmployeeDetailMapper } from './employee-detail-mapper';
import { EmployeeRequest } from '../../core/models/employee-request';
import { EmployeeResponse } from '../../core/models/employee-response';
import { EmployeeService } from '../../core/services/employee.service';
import { Manager } from '../../core/models/manager';
import { MessageService } from '../../core/services/message.service';
import { Project } from '../../core/models/project';
import { ProjectService } from '../../core/services/project.service';
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
    private readonly router: Router,
  ) {
    this.employeeProfileForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.fillFormWithEmployee();
    this.loadEmployeeAndPossibleManagers();
    this.loadPossibleProjects();
    this.loadPossibleSkills();
  }

  ngOnDestroy() {
    this.unsubscribe$.next(undefined);
    this.unsubscribe$.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['employee']) {
      this.fillFormWithEmployee();
    }
  }

  get projects() {
    return this.employeeProfileForm.get('projects') as FormArray;
  }

  get skills() {
    return this.employeeProfileForm.get('skills') as FormArray;
  }

  fillFormWithEmployee(): void {
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

  deleteEmployeeAndExitPage(): void {
    const id = this.employee?.id as string;
    this.employeeService
      .deleteEmployee(id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.exitPage());
  }

  submitFormAndExitPage(): void {
    const employeeRequest: EmployeeRequest =
      EmployeeDetailMapper.mapFormToEmployeeRequest(
        this.employee?.id ?? undefined,
        this.employeeProfileForm,
        this.allPossibleProjects,
        this.allPossibleSkills,
      );

    const isEmployeeNewlyCreated = this.isEmployeeNewlyCreated();
    if (isEmployeeNewlyCreated) {
      this.employeeService
        .addEmployee(employeeRequest)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((employeeResponse: EmployeeResponse) =>
          this.handleFormSubmitAndExitPage(employeeResponse),
        );
    } else {
      employeeRequest.id = this.employee?.id as string;
      this.employeeService
        .updateEmployee(employeeRequest)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((employeeResponse: EmployeeResponse) =>
          this.handleFormSubmitAndExitPage(employeeResponse),
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

  findSkillsForAutocomplete(
    searchedTerm: string,
    skillToAddAnyway?: Skill,
  ): Skill[] {
    return EmployeeDetailHelper.findSkillsForAutocomplete(
      searchedTerm,
      this.allPossibleSkills,
      this.employeeProfileForm.get('skills')?.value,
      skillToAddAnyway,
    );
  }

  findProjectsForAutocomplete(
    searchedTerm: string,
    projectToAddAnyway?: Project,
  ): Project[] {
    return EmployeeDetailHelper.findProjectsForAutocomplete(
      searchedTerm,
      this.allPossibleProjects,
      this.employeeProfileForm.get('projects')?.value,
      projectToAddAnyway,
    );
  }

  checkIfLastProjectAndSkillAreNotEmpty(): boolean {
    return this.projects.value.at(-1) != '' && this.skills.value.at(-1) != '';
  }

  isEmployeeNewlyCreated(): boolean {
    return this.employee?.id === undefined;
  }

  exitPage(): void {
    this.router.navigate(['/employee']).then();
  }

  private loadEmployeeAndPossibleManagers(): void {
    const employeeId = this.activatedRoute.snapshot.paramMap.get('id');
    const doEmployeeExist = employeeId !== null;
    if (!doEmployeeExist) {
      this.employeeService
        .getManagers()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((managers: Manager[]) => {
          this.saveLoadedManagers(managers);
          this.markEndOfLoading();
        });
      return;
    }

    forkJoin({
      employee: this.employeeService.getEmployee(employeeId),
      managers: this.employeeService.getManagers(),
    })
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((employeeAndManagersResponse) => {
        this.saveLoadedEmployee(employeeAndManagersResponse.employee);
        this.saveLoadedManagers(employeeAndManagersResponse.managers);
        this.markEndOfLoading();
      });
  }

  private saveLoadedEmployee(loadedEmployee: EmployeeResponse): void {
    this.employee = loadedEmployee;
  }

  private saveLoadedManagers(loadedManagers: Manager[]) {
    this.possibleManagers = EmployeeDetailHelper.excludeEmployeeFromManagers(
      this.employee,
      loadedManagers,
    );
    if (this.employee && this.employee.manager) {
      this.employee.manager = EmployeeDetailHelper.findManagerFromList(
        this.employee.manager.id,
        this.possibleManagers,
      );
    }
  }

  private markEndOfLoading(): void {
    this.isLoading = false;
    this.fillFormWithEmployee();
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

  private handleFormSubmitAndExitPage(employee: EmployeeResponse): void {
    this.employee = employee;

    this.wasProjectControlRemoved = false;
    this.wasSkillControlRemoved = false;

    this.fillFormWithEmployee();
    this.exitPage();
  }

  private addElementToFormArrayIfNeeded(formArray: FormArray) {
    if (formArray.length < 1 || formArray.at(length - 1).value != '') {
      formArray.push(this.createArrayFormControlWithValidators(''));
    }
  }

  private createArrayFormControlWithValidators(value: string): FormControl {
    return this.formBuilder.control(value, Validators.required);
  }
}
