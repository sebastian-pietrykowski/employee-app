import { EmployeeResponse } from '../../core/models/employee-response';
import { Manager } from '../../core/models/manager';
import { Project } from '../../core/models/project';
import { Skill } from '../../core/models/skill';

export class EmployeeDetailHelper {
  public static findProjectsForAutocomplete(
    searchedTerm: string,
    allPossibleProjects: Project[],
    projectsToExclude: Project[],
    projectToAddAnyway?: Project,
  ): Skill[] {
    const availableSkills = this.createExcludedListWithOtherElem(
      allPossibleProjects,
      projectsToExclude,
      projectToAddAnyway,
    );

    return availableSkills.filter(
      (skill) => skill?.name.toLowerCase().includes(searchedTerm.toLowerCase()),
    );
  }
  public static findSkillsForAutocomplete(
    searchedTerm: string,
    allPossibleSkills: Skill[],
    skillsToExclude: Skill[],
    skillToAddAnyway?: Skill,
  ): Skill[] {
    const availableSkills = this.createExcludedListWithOtherElem(
      allPossibleSkills,
      skillsToExclude,
      skillToAddAnyway,
    );

    return availableSkills.filter(
      (skill) => skill?.name.toLowerCase().includes(searchedTerm.toLowerCase()),
    );
  }
  public static createExcludedListWithOtherElem<T>(
    allPossibleValues: T[],
    exclusionList: T[],
    otherElem?: T,
  ) {
    return allPossibleValues.filter(
      (value) => !exclusionList.includes(value) || value === otherElem,
    );
  }

  public static findManagerFromList(
    managerId: string,
    managers: Manager[],
  ): Manager | undefined {
    return managers.find((manager: Manager) => manager.id == managerId);
  }

  public static excludeEmployeeFromManagers(
    employee: EmployeeResponse | undefined,
    managers: Manager[],
  ): Manager[] {
    return managers.filter((manager: Manager) => manager.id !== employee?.id);
  }
}
