import { StringTransformationService } from './string-transformation.service';
import { TestBed } from '@angular/core/testing';

describe('StringTransformationService', () => {
  let service: StringTransformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StringTransformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should transform to lower case', () => {
    const toTransform = 'rELaXATiON';
    const expected = 'relaxation';

    const actual = service.toLowerCase(toTransform);

    expect(actual).toBe(expected);
  });

  it('should transform to upper case', () => {
    const toTransform = 'VOLcaNo';
    const expected = 'VOLCANO';

    const actual = service.toUpperCase(toTransform);

    expect(actual).toBe(expected);
  });
});
