import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { MOCK_SKILLS } from '../../features/mocks/mock-skills';

@Injectable({
  providedIn: 'root',
})
export class SkillService {
  skills: string[] = MOCK_SKILLS;

  getSkills(): Observable<string[]> {
    return of(this.skills);
  }
}
