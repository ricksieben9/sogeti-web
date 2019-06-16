import {Routes} from '@angular/router';

import {DashboardComponent} from '../../pages/dashboard/dashboard.component';
import {IntakeMomentsComponent} from '../../pages/intake-moments/intake-moments.component';
import {IntakeMomentsReceiverComponent} from '../../pages/intake-moments/intake-moments-receiver/intake-moments-receiver.component';
import {ReceiversComponent} from '../../pages/receivers/receivers.component';
import {DispenserComponent} from '../../pages/dispenser/dispenser.component';
import {GroupsComponent} from '../../pages/groups/groups.component';
import {GroupDetailComponent} from '../../pages/groups/group-detail/group-detail.component';
import {MedicineComponent} from '../../pages/medicine/medicine.component';
import {AuthGuard} from '../../_guards/auth.guard';
import {Role} from '../../_models/role';
import {NotificationsComponent} from '../../pages/notifications/notifications.component';
import {IntakeMomentDetailComponent} from '../../pages/intake-moments/intake-moment-detail/intake-moment-detail.component';

export const AdminLayoutRoutes: Routes = [
  {path: 'dispensers',  component: DispenserComponent },
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'groups', component: GroupsComponent, canActivate: [AuthGuard], data: {roles: [Role.HeadDispenser]}},
  {path: 'groups/group/:id', component: GroupDetailComponent, canActivate: [AuthGuard], data: {roles: [Role.HeadDispenser]}},
  {path: 'receivers', component: ReceiversComponent, canActivate: [AuthGuard], data: {roles: [Role.Admin, Role.HeadDispenser]}},
  {path: 'intakemoments', component: IntakeMomentsComponent, canActivate: [AuthGuard], data: {roles: [Role.HeadDispenser]}},
  {path: 'intakemoments/:id', component: IntakeMomentsReceiverComponent, canActivate: [AuthGuard], data: {roles: [Role.HeadDispenser]}},
  {path: 'intakemoments/detail/:id', component: IntakeMomentDetailComponent, canActivate: [AuthGuard], data: {roles: [Role.HeadDispenser]}},
  {path: 'medicine', component: MedicineComponent, canActivate: [AuthGuard], data: {roles: [Role.Admin, Role.HeadDispenser]}},
  {path: 'log', component: NotificationsComponent, canActivate: [AuthGuard], data: {roles: [Role.HeadDispenser]}}
];
