import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
class PermissionService {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isUserLoggedIn = this.authService.isLoggedIn();

    if (state.url.includes('auth')) {
      if (isUserLoggedIn) {
        return this.redirectionUrl('/');
      }
      return true;
    }

    if (isUserLoggedIn) {
      return true;
    }
    return this.redirectionUrl('/auth');
  }

  private redirectionUrl(url: string) {
    this.router.navigate([url]);
    return false;
  }
}

export const canActivateRoute: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(PermissionService).canActivate(route, state);
};
