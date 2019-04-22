import {Routes} from '@angular/router';

import {DashboardComponent} from '../../pages/dashboard/dashboard.component';
import {UsersComponent} from '../../pages/users/users.component';
import {MapsComponent} from '../../pages/maps/maps.component';
import {UserProfileComponent} from '../../pages/user-profile/user-profile.component';
import {IntakemomentsComponent} from '../../pages/intakemoments/intakemoments.component';
import {IntakemomentDetailComponent} from '../../pages/intakemoments/intakemoment-detail/intakemoment-detail.component';
import {TablesComponent} from '../../pages/tables/tables.component';
import {ReceiversComponent} from '../../pages/receivers/receivers.component';
import {NotificationsComponent} from "../../pages/notifications/notifications.component";
import {AuthGuard} from '../../_guards/auth.guard';
import {Role} from '../../_models/role';

export const AdminLayoutRoutes: Routes = [
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'logs', component: NotificationsComponent, canActivate: [AuthGuard], data: {roles: [Role.Admin]}},
  {path: 'tables', component: TablesComponent, canActivate: [AuthGuard], data: {roles: [Role.Admin]}},
  {path: 'users', component: UsersComponent, canActivate: [AuthGuard], data: {roles: [Role.Admin]}},
  {path: 'maps', component: MapsComponent, canActivate: [AuthGuard], data: {roles: [Role.Admin]}},
  {path: 'receivers', component: ReceiversComponent, canActivate: [AuthGuard], data: {roles: [Role.Admin]}},
  {path: 'intakemoments', component: IntakemomentsComponent, canActivate: [AuthGuard], data: {roles: [Role.Admin]}},
  {path: 'intakemoments/:id', component: IntakemomentDetailComponent, canActivate: [AuthGuard], data: {roles: [Role.Admin]}}
];
