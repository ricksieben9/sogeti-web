import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UsersComponent } from '../../pages/users/users.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import {AuthGuard} from '../../_guards/auth.guard';
import {Role} from '../../_models/role';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent, data: { roles: [Role.Admin] }  },
    { path: 'user-profile',   component: UserProfileComponent, data: { roles: [Role.Admin] } },
    { path: 'tables',         component: TablesComponent, data: { roles: [Role.Admin] }  },
    { path: 'users',          component: UsersComponent, data: { roles: [Role.Admin] }  },
    { path: 'maps',           component: MapsComponent, data: { roles: [Role.Admin] }  }
];
