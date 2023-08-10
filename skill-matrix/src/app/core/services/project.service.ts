import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { MOCK_PROJECTS } from '../mocks/mock-projects';
import { MessageService } from './message.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  projects: string[] = MOCK_PROJECTS;

  constructor(
    private readonly translateService: TranslateService,
    private readonly messageService: MessageService,
  ) {}

  getProjects(): Observable<string[]> {
    const projects = of(this.projects);

    this.translateService
      .get('messages.project.service.fetched')
      .subscribe((translated) => this.messageService.add(translated));

    return projects;
  }
}
