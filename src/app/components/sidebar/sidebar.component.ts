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
    permitted: Role[];
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Portaal',  icon: 'ni-tv-2 text-primary', class: '', permitted: [Role.Admin, Role.HeadDispenser] },
    { path: '/dispensers', title: 'Toedieners',  icon: 'ni-circle-08 text-blue', class: '' , permitted: [Role.Admin, Role.HeadDispenser]},
    { path: '/intakemoments', title: 'Toedienmomenten', icon: 'ni-single-02 text-blue', class: '',
      permitted: [Role.HeadDispenser]},
    { path: '/receivers', title: 'Ontvangers', icon: 'ni-single-02 text-blue', class: '', permitted: [Role.Admin, Role.HeadDispenser]},
    { path: '/groups', title: 'Groepen', icon: 'ni-single-02 text-blue', class: '', permitted: [Role.HeadDispenser]},
    { path: '/medicine', title: 'Medicijnen', icon: 'ni-atom text-blue', class: '', permitted: [Role.Admin, Role.HeadDispenser]},
    { path: '/log', title: 'Notificaties', icon: 'ni-atom text-blue', class: '', permitted: [Role.HeadDispenser]},
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
    this.menuItems = ROUTES.filter(menuItem => {if (menuItem.permitted.indexOf(<Role>this.currentUser.role) > -1) { return menuItem; } });
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
