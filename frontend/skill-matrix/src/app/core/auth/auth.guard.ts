import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Injectable } from '@angular/core';
import { ROUTE_PATHS } from '../../config/route-paths';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly authenticationService: AuthenticationService,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean {
    if (this.authenticationService.userValue) {
      return true;
    }

    this.exitPage(state);
    return false;
  }

  private exitPage(state: RouterStateSnapshot): void {
    this.router
      .navigate([ROUTE_PATHS.LOGIN], {
        queryParams: { returnUrl: state.url },
      })
      .then();
  }
}
