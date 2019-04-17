import {Routes} from '@angular/router';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UsersComponent } from '../../pages/users/users.component';
import { DispenserComponent } from '../../pages/dispenser/dispenser.component';
import { DispenserEditComponent } from '../../pages/dispenser/dispenser-edit/dispenser-edit.component'
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { from } from 'rxjs';
import {ReceiversComponent} from '../../pages/receivers/receivers.component';
import {AuthGuard} from '../../_guards/auth.guard';
import {Role} from '../../_models/role';

export const AdminLayoutRoutes: Routes = [
  {path: 'dispensers',     component: DispenserComponent },
  {path: 'dispensers/editDispenser/:id',  component: DispenserEditComponent },
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard], data: {roles: [Role.Admin]}},
  {path: 'tables', component: TablesComponent, canActivate: [AuthGuard], data: {roles: [Role.Admin]}},
  {path: 'users', component: UsersComponent, canActivate: [AuthGuard], data: {roles: [Role.Admin]}},
  {path: 'maps', component: MapsComponent, canActivate: [AuthGuard], data: {roles: [Role.Admin]}},
  {path: 'receivers', component: ReceiversComponent, canActivate: [AuthGuard], data: {roles: [Role.Admin]}}

];
