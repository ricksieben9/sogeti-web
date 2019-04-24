import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Role} from '../../_models/role';
import {AuthenticationService} from '../../service/authentication.service';
import {User} from '../../_models/user';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Portaal',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/users', title: 'Gebruikersaccounts',  icon: 'ni-circle-08 text-blue', class: '' },
    { path: '/dispensers', title: 'Toedieners',  icon: 'ni-circle-08 text-blue', class: '' },
    { path: '/receivers', title: 'ontvangers', icon: 'ni-single-02 text-blue', class: ''},
    {path: '/medicine', title: 'medicijnen', icon: 'ni-atom text-blue', class: ''}
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;
  currentUser: User;

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }
}
