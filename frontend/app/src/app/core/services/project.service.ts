import { Injectable, OnDestroy } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { ErrorLoggingService } from './error-logging-service';
import { HttpClient } from '@angular/common/http';
import { MessageService } from './message.service';
import { Project } from '../models/project';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProjectService extends ErrorLoggingService implements OnDestroy {
  // TODO: In the future, it would be nice to create searchProjects function to remove this functionality from EmployeeDetailComponent
  private readonly projectsUrl = environment.apiBaseUrl + '/projects';

  constructor(
    messageService: MessageService,
    translateService: TranslateService,
    private readonly http: HttpClient,
  ) {
    super(ProjectService.name, messageService, translateService);
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectsUrl).pipe(
      tap(() => super.log('messages.project.service.fetched')),
      catchError(super.handleError<Project[]>('getProjects', [])),
    );
  }
}
