import { EmployeeRequest } from '../../core/models/employee-request';
import { FormGroup } from '@angular/forms';
import { Manager } from '../../core/models/manager';
import { Project } from '../../core/models/project';
import { Skill } from '../../core/models/skill';

export class EmployeeDetailMapper {
  public static mapFormToEmployeeRequest(
    employeeId: string | undefined,
    employeeProfileForm: FormGroup,
    allPossibleProjects: Project[],
    allPossibleSkills: Skill[],
  ): EmployeeRequest {
    return {
      id: employeeId,
      name: employeeProfileForm.get('name')?.value,
      surname: employeeProfileForm.get('surname')?.value,
      employmentDate: new Date(
        employeeProfileForm.get('employmentDate')?.value,
      ),
      skillIds: this.mapSkillNamesToSkillIds(
        employeeProfileForm.get('skills')?.value as string[],
        allPossibleSkills,
      ),
      projectIds: this.mapProjectNamesToProjectIds(
        employeeProfileForm.get('projects')?.value as string[],
        allPossibleProjects,
      ),
      managerId: (employeeProfileForm.get('manager')?.value as Manager)?.id,
    };
  }

  public static mapProjectNamesToProjectIds(
    projectNames: string[],
    allPossibleProjects: Project[],
  ): string[] {
    return projectNames
      .map(
        (projectName) =>
          allPossibleProjects.find((project) => project.name === projectName)
            ?.id,
      )
      .filter((projectName): projectName is string => !!projectName);
  }

  public static mapSkillNamesToSkillIds(
    skillNames: string[],
    allPossibleSkills: Skill[],
  ): string[] {
    return skillNames
      .map(
        (skillName) =>
          allPossibleSkills.find((skill) => skill.name === skillName)?.id,
      )
      .filter((skillName): skillName is string => !!skillName);
  }
}
