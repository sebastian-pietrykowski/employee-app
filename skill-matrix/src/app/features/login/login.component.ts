import { FormBuilder, FormGroup } from '@angular/forms';
import { first, tap } from 'rxjs';
import { AuthenticationService } from '../../core/services/authentication.service';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ROUTE_PATHS } from '../../config/route-paths';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  error = '';
  loginForm: FormGroup;
  isLoading = false;
  hidePassword = true;

  constructor(
    private readonly authService: AuthenticationService,
    private readonly translateService: TranslateService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
  ) {
    this.loginForm = this.createLoginForm();
    if (this.authService.isUserLoggedIn()) {
      this.exitPage();
    }
  }

  onSubmit(): void {
    this.authService
      .login(
        this.loginForm.get('username')?.value,
        this.loginForm.get('password')?.value,
      )
      .pipe(
        first(),
        tap(() => {
          this.isLoading = true;
        }),
      )
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.exitPage();
        },
        error: (err) => {
          this.error = err;
          this.isLoading = false;
          this.showInvalidDataPrompt();
        },
      });
  }

  private createLoginForm(): FormGroup {
    return this.formBuilder.group({
      username: '',
      password: '',
    });
  }

  private exitPage(): void {
    this.router.navigate(['/' + ROUTE_PATHS.DASHBOARD]).then();
  }

  private showInvalidDataPrompt() {
    const durationInSeconds = 5;
    this.translateService
      .get('log.in.invalid')
      .pipe(first())
      .subscribe((message) =>
        this.snackBar.open(message, '', {
          duration: durationInSeconds * 1000,
          panelClass: ['text-center'],
        }),
      );
  }
}
