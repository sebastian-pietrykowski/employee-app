import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ROUTE_PATHS } from '../../config/route-paths';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';

export interface User {
  name: string;
  authData: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;
  constructor(
    private router: Router,
    private http: HttpClient,
  ) {
    const storedUser: string | null = localStorage.getItem('user');
    const parsedUser = storedUser ? JSON.parse(storedUser) : undefined;
    this.userSubject = new BehaviorSubject(parsedUser);
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User | null {
    return this.userSubject.value;
  }

  login(username: string, password: string): Observable<void> {
    const url = `${environment.apiBaseUrl}/auth/login`;

    return this.http.post<User>(url, { username, password }).pipe(
      map((user: User) => {
        user.authData = window.btoa(username + ':' + password);
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
      }),
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.exitPage();
  }

  isUserLoggedIn(): boolean {
    return this.userValue !== null && this.userValue !== undefined;
  }

  private exitPage(): void {
    this.router.navigate(['/' + ROUTE_PATHS.LOGIN]).then();
  }
}
