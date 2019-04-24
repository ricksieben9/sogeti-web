import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UsersComponent } from '../../pages/users/users.component';
import { ReceiversComponent } from '../../pages/receivers/receivers.component';
import { IntakemomentsComponent } from '../../pages/intakemoments/intakemoments.component';
import { IntakemomentDetailComponent } from '../../pages/intakemoments/intakemoment-detail/intakemoment-detail.component';
import { MedicineComponent} from '../../pages/medicine/medicine.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { DispenserComponent } from '../../pages/dispenser/dispenser.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    ReactiveFormsModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    UsersComponent,
    DispenserComponent,
    MapsComponent,
    ReceiversComponent,
    IntakemomentsComponent,
    IntakemomentDetailComponent,
    MedicineComponent
  ]
})

export class AdminLayoutModule {}
