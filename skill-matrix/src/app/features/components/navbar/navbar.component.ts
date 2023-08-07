import { enUS, pl } from 'date-fns/locale';
import { Component } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  localsForLanguages = new Map<string, Locale>([
    ['en', enUS],
    ['pl', pl],
  ]);
  constructor(
    private readonly translateService: TranslateService,
    private dateAdapter: DateAdapter<never>,
  ) {}

  setTranslationLanguage(language: string): void {
    this.translateService.use(language);
    if (this.localsForLanguages.has(language)) {
      const dateAdapterLocal = this.localsForLanguages.get(language);
      this.dateAdapter.setLocale(dateAdapterLocal);
    }
  }
}
