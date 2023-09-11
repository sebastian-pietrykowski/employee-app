import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import localeEn from '@angular/common/locales/en';
import localePl from '@angular/common/locales/pl';
import { registerLocaleData } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'skill-matrix';

  constructor(translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');

    registerLocaleData(localeEn);
    registerLocaleData(localePl);
  }
}
