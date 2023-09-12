import { enUS, pl } from 'date-fns/locale';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { Component } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MessageService } from '../../../core/services/message.service';
import { ROUTE_PATHS } from '../../../config/route-paths';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  languages = ['en', 'pl'];
  localsForLanguages = new Map<string, Locale>([
    ['en', enUS],
    ['pl', pl],
  ]);

  protected readonly ROUTE_PATHS = ROUTE_PATHS;

  constructor(
    readonly authenticationService: AuthenticationService,
    readonly messageService: MessageService,
    readonly translateService: TranslateService,
    private readonly dateAdapter: DateAdapter<Date>,
  ) {}

  setTranslationLanguage(language: string): void {
    this.translateService.use(language);
    if (this.localsForLanguages.has(language)) {
      const dateAdapterLocal = this.localsForLanguages.get(language);
      this.dateAdapter.setLocale(dateAdapterLocal);
    }
  }

  logOut() {
    this.authenticationService.logout();
  }
}
