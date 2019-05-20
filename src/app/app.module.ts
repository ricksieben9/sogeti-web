import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {AuthLayoutComponent} from './layouts/auth-layout/auth-layout.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {routing} from './app.routing';
import {ComponentsModule} from './components/components.module';
import {UsersService} from './service/users.service';
import {AuthenticationService} from './service/authentication.service';
import {ModalModule} from 'ngx-bootstrap/modal';
import {JwtInterceptor} from './_helpers/jwt.interceptor';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule ,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    routing
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent
  ],
  providers: [UsersService, AuthenticationService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    // {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
