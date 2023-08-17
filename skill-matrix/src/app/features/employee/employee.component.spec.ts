import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeComponent } from './employee.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { EmployeeModule } from './employee.module';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('EmployeeComponent', () => {
  let component: EmployeeComponent;
  let translateService: TranslateService;
  let fixture: ComponentFixture<EmployeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatProgressSpinnerModule,
        TranslateModule.forRoot(),
      ],
      declarations: [EmployeeComponent],
      providers: [],
    });
    fixture = TestBed.createComponent(EmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    translateService = TestBed.inject(TranslateService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', (done: DoneFn) => {
    const fixture = TestBed.createComponent(EmployeeComponent);
    let expectedTitle;
    translateService.get('employee.header').subscribe({
      next: (title) => {
        expectedTitle = title;
        done();
      },
      error: done.fail,
    });

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const actualTitle =
      compiled.querySelector('.employee__header')?.textContent;
    expect(actualTitle).toContain(expectedTitle);
  });
});
