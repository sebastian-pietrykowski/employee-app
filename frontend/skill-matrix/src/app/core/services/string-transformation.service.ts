import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StringTransformationService {
  toLowerCase(term: string): string {
    return term.toLowerCase();
  }

  toUpperCase(term: string): string {
    return term.toUpperCase();
  }
}
