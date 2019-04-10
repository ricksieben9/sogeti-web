import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import {UsersService} from './service/users.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DispenserComponent } from './dispenser/dispenser.component';
import { DetailsComponent } from './dispenser/details/details.component';
import { EditComponent } from './dispenser/edit/edit.component';
import { CreateComponent } from './dispenser/create/create.component';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ModalModule.forRoot()
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    DispenserComponent,
    DetailsComponent,
    EditComponent,
    CreateComponent
  ],
  providers: [UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
