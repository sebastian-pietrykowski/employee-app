import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: string[] = [];

  get count(): Observable<number> {
    return of(this.messages.length);
  }

  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}
