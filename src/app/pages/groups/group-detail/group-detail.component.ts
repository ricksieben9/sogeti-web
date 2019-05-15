import { Component, OnInit, Input } from '@angular/core';
// import {FormGroup, FormArray, Validators, FormBuilder} from '@angular/forms';
import {ErrorMsg} from '../../../_models/errorMsg';
import {Group} from '../../../_models/group';
import {GroupService} from '../../../service/group.service';
import {ReceiverService} from '../../../service/receiver.service';
import {UsersService} from '../../../service/users.service';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.scss']
})
export class GroupDetailComponent implements OnInit {

  @Input() group: Group;
  groups: any;
  receivers: any;
  dispensers: any;
  errorMsg: ErrorMsg = new  ErrorMsg();

  constructor(private groupService: GroupService,
              private receiverService: ReceiverService,
              private userService: UsersService,
              // private fb: FormBuilder
  ) { }

  ngOnInit() {
    //this.getData();
  }

  getGroup(id) {
    this.groupService.getGroup(id)
      .subscribe(group => {
        this.group = group[0];
      });
      console.log(this.group);
  }

  getData() {
    const roles = { roleList: ['Toediener', 'Hoofdtoediener'] };
    // get dispensers from API
    const userObservable = this.userService.getUsersByRoles(roles);
    userObservable.subscribe((userData: any[]) => {
      this.dispensers = userData;
    });

    // get receivers from Api
    const medicineObservable = this.receiverService.getAllReceivers();
    medicineObservable.subscribe((receiverData: any[]) => {
      this.receivers = receiverData;
    });
  }

}
