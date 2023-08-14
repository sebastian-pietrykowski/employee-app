import { ErrorLoggingService } from './error-logging-service';
import { TestBed } from '@angular/core/testing';

describe('InMemoryDataService', () => {
  let service: ErrorLoggingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorLoggingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
