import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UsersComponent } from '../../pages/users/users.component';
import { DispenserComponent } from '../../pages/dispenser/dispenser.component';
import { DispenserEditComponent } from '../../pages/dispenser/dispenser-edit/dispenser-edit.component'
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { from } from 'rxjs';
import { CreateDispenserComponent } from 'src/app/pages/dispenser/create-dispenser/create-dispenser.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'dispensers',     component: DispenserComponent },
    { path: 'dispensers/editDispenser/:id',  component: DispenserEditComponent },
    { path: 'dispensers/create',  component: CreateDispenserComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'users',          component: UsersComponent },
    { path: 'maps',           component: MapsComponent }
];
