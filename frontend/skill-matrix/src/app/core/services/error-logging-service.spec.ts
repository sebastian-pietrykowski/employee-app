import { ErrorLoggingService } from './error-logging-service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('InMemoryDataService', () => {
  let service: ErrorLoggingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TranslateModule.forRoot()],
    });
    service = TestBed.inject(ErrorLoggingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
