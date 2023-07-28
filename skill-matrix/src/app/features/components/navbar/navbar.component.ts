import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  translateService: TranslateService;

  constructor(translateService: TranslateService) {
    this.translateService = translateService;
  }
  setTranslationLanguage(language: string): void {
    this.translateService.use(language);
  }
}
