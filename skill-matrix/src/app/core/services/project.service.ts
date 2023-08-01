import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { MOCK_PROJECTS } from '../../features/mocks/mock-projects';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  projects: string[] = MOCK_PROJECTS;
  getProjects(): Observable<string[]> {
    return of(this.projects);
  }
}
