import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, of, takeUntil } from 'rxjs';
import { MOCK_SKILLS } from '../mocks/mock-skills';
import { MessageService } from './message.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class SkillService implements OnDestroy {
  private skills: string[] = MOCK_SKILLS;
  private unsubscribe$ = new Subject();

  ngOnDestroy(): void {
    this.unsubscribe$.next(undefined);
    this.unsubscribe$.complete();
  }

  constructor(
    private readonly translateService: TranslateService,
    private readonly messageService: MessageService,
  ) {}

  getSkills(): Observable<string[]> {
    const skills = of(this.skills);

    this.translateService
      .get('messages.skill.service.fetched')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((translated) => this.messageService.add(translated));

    return skills;
  }
}
