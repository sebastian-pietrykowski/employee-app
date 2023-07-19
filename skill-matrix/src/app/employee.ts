export interface Employee {
  id: number,
  name: string,
  surname: string,
  employmentDate: Date,
  listOfSkills: Array<string>,
  listOfProjects: Array<string>,
  manager: undefined
}
