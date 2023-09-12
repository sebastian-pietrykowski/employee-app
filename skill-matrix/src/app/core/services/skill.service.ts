import { Injectable, OnDestroy } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { ErrorLoggingService } from './error-logging-service';
import { HttpClient } from '@angular/common/http';
import { MessageService } from './message.service';
import { Skill } from '../models/skill';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SkillService extends ErrorLoggingService implements OnDestroy {
  // TODO: In the future, it would be nice to create searchSkills function to remove this functionality from EmployeeDetailComponent
  private readonly skillsUrl = environment.apiBaseUrl + '/skills';

  constructor(
    messageService: MessageService,
    translateService: TranslateService,
    private readonly http: HttpClient,
  ) {
    super(SkillService.name, messageService, translateService);
  }
  getSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(this.skillsUrl).pipe(
      tap(() => super.log('messages.skill.service.fetched')),
      catchError(super.handleError<Skill[]>('getSkills', [])),
    );
  }
}
