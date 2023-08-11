import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, of, takeUntil } from 'rxjs';
import { MOCK_PROJECTS } from '../mocks/mock-projects';
import { MessageService } from './message.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class ProjectService implements OnDestroy {
  private projects: string[] = MOCK_PROJECTS;
  private unsubscribe$ = new Subject();

  ngOnDestroy(): void {
    this.unsubscribe$.next(undefined);
    this.unsubscribe$.complete();
  }

  constructor(
    private readonly translateService: TranslateService,
    private readonly messageService: MessageService,
  ) {}

  getProjects(): Observable<string[]> {
    const projects = of(this.projects);

    this.translateService
      .get('messages.project.service.fetched')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((translated) => this.messageService.add(translated));

    return projects;
  }
}
