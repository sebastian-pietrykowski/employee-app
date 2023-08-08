import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { MOCK_SKILLS } from '../../features/mocks/mock-skills';
import { MessageService } from './message.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class SkillService {
  skills: string[] = MOCK_SKILLS;

  constructor(
    private readonly translateService: TranslateService,
    private readonly messageService: MessageService,
  ) {}

  getSkills(): Observable<string[]> {
    const skills = of(this.skills);

    this.translateService
      .get('messages.skill.service.fetched')
      .subscribe((translated) => this.messageService.add(translated));

    return skills;
  }
}
