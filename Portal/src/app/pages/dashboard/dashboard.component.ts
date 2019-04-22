import {Component, OnInit} from '@angular/core';

// core components
import {Role} from '../../_models/role';
import {User} from '../../_models/user';
import {IntakeMomentService} from '../../service/intake-moment.service';
import {LogService} from "../../service/log.service";

import {AuthenticationService} from '../../service/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public list: any;
  public salesChart;


  currentUser: User;

  constructor(private authenticationService: AuthenticationService, private intakeMomentService: IntakeMomentService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

  }

  getIncompleteIntakeMoments() {
    const incompleteIntakeMomentObservable = this.intakeMomentService.getIncompleteIntakeMoments();
    incompleteIntakeMomentObservable.subscribe((intakeData: any[]) => {
      console.log(intakeData);
      this.list = intakeData;
    });
  }

  ngOnInit() {
    this.getIncompleteIntakeMoments();
  }


  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }
  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }}
