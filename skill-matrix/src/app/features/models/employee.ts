export interface Employee {
  id: string,
  name: string,
  surname: string,
  employmentDate: Date,
  listOfSkills: Array<string>,
  listOfProjects: Array<string>,
  manager: undefined
}
