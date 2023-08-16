import { Injectable, OnDestroy } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { ErrorLoggingService } from './error-logging-service';
import { HttpClient } from '@angular/common/http';
import { MessageService } from './message.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class SkillService extends ErrorLoggingService implements OnDestroy {
  // TODO: In the future, it would be nice to create searchSkills function to remove this functionality from EmployeeDetailComponent
  private readonly skillsUrl = 'api/skills';

  constructor(
    messageService: MessageService,
    translateService: TranslateService,
    private readonly http: HttpClient,
  ) {
    super(SkillService.name, messageService, translateService);
  }
  getSkills(): Observable<string[]> {
    return this.http.get<string[]>(this.skillsUrl).pipe(
      tap(() => super.log('messages.skill.service.fetched')),
      catchError(super.handleError<string[]>('getSkills', [])),
    );
  }
}
