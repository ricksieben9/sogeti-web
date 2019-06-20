import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute} from '@angular/router';

import {AuthenticationService} from '../service/authentication.service';
import {Role} from '../_models/role';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
      // check if is first time login
      if (route.url[0].path !== 'reset-password' && currentUser.isFirst) {
        this.router.navigate(['/reset-password']);
        return false;
      }
      // check if is not first time reset password
      if (route.url[0].path === 'reset-password' && !currentUser.isFirst) {
        currentUser.role === Role.Admin ? this.router.navigate(['/dispensers']) : this.router.navigate(['/dashboard']);
        return false;
      }
      // check if route is restricted by role
      {
        if (route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {
          // role not authorised so redirect to home page
          currentUser.role === Role.Admin ? this.router.navigate(['/dispensers']) : this.router.navigate(['/dashboard']);
          return false;
        }
      }

      // authorised so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    return false;
  }
}
