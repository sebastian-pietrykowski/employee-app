import { Observable, of } from 'rxjs';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
import { MOCK_EMPLOYEES } from '../mocks/mock-employees';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb(): Observable<NonNullable<unknown>> {
    return of(MOCK_EMPLOYEES);
  }

  // generateId(): Observable<string> {
  //   const lastIndex = this.employees.length - 1;
  //   return of((Number(this.employees.at(lastIndex)?.id ?? 0) + 1).toString());
  // }
}
