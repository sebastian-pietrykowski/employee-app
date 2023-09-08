import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../../core/services/authentication.service';
import { Component } from '@angular/core';
import { ROUTE_PATHS } from '../../config/route-paths';
import { first } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  error = '';
  loginForm: FormGroup;
  isLoading = true;
  hidePassword = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
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
      .pipe(first())
      .subscribe({
        next: () => {
          this.exitPage();
        },
        error: (err) => {
          this.error = err;
          this.isLoading = false;
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
}
