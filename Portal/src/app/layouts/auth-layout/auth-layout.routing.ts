import {Routes} from '@angular/router';

import {LoginComponent} from '../../auth/login/login.component';
import {ResetPasswordComponent} from '../../auth/reset-password/reset-password.component';
import {AuthGuard} from '../../_guards/auth.guard';

export const AuthLayoutRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'reset-password', component: ResetPasswordComponent, canActivate: [AuthGuard]}

];
