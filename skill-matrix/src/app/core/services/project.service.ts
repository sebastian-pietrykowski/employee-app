import { Injectable, OnDestroy } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { ErrorLoggingService } from './error-logging-service';
import { HttpClient } from '@angular/common/http';
import { MessageService } from './message.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class ProjectService extends ErrorLoggingService implements OnDestroy {
  // TODO: searchProjects
  private readonly projectsUrl = 'api/projects';

  constructor(
    messageService: MessageService,
    translateService: TranslateService,
    private readonly http: HttpClient,
  ) {
    super(ProjectService.name, messageService, translateService);
  }

  getProjects(): Observable<string[]> {
    return this.http.get<string[]>(this.projectsUrl).pipe(
      tap(() => super.log('messages.project.service.fetched')),
      catchError(super.handleError<string[]>('getProjects', [])),
    );
  }
}
