import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeeComponent } from './employee.component';
import { EmployeeSearchComponent } from './components/employee-search/employee-search.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateService } from '@ngx-translate/core';
import { TranslateTestingModule } from 'ngx-translate-testing';

const ENGLISH_TRANSLATIONS_MOCK = {
  employee: {
    header: 'Employee info',
  },
};

describe('EmployeeComponent', () => {
  let component: EmployeeComponent;
  let fixture: ComponentFixture<EmployeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatInputModule,
        MatProgressSpinnerModule,
        TranslateTestingModule.withTranslations({
          en: ENGLISH_TRANSLATIONS_MOCK,
        }),
      ],
      declarations: [EmployeeComponent, EmployeeSearchComponent],
      providers: [],
    });
    fixture = TestBed.createComponent(EmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', inject(
    [TranslateService],
    (translateService: TranslateService) => {
      const expectedTitle = ENGLISH_TRANSLATIONS_MOCK.employee.header;
      translateService.setDefaultLang('en');
      fixture.componentInstance.isLoading = false;
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const actualTitle =
        compiled.querySelector('.employee__header')?.textContent;

      expect(actualTitle).toBe(expectedTitle);
    },
  ));
});
