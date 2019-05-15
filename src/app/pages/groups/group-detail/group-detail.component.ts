import { Component, OnInit, Input } from '@angular/core';
import {Location} from '@angular/common';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import {FormGroup, FormArray, Validators, FormBuilder} from '@angular/forms';
import {ErrorMsg} from '../../../_models/errorMsg';
import {ActivatedRoute} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {formatDate} from '@angular/common';
import {Group} from '../../../_models/group';
import {GroupService} from '../../../service/group.service';
import {Receiver} from '../../../_models/receiver';
import {ReceiverService} from '../../../service/receiver.service';
import {Dispenser} from '../../../_models/dispenser';
import {UsersService} from '../../../service/users.service';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.scss']
})
export class GroupDetailComponent implements OnInit {

  selectedGroupId: string;
  @Input() group: Group;
  groups: any;
  receivers: any;
  dispensers: any;
  errorMsg: ErrorMsg = new  ErrorMsg();
  modalRef: BsModalRef;

  constructor(private groupService: GroupService,
              private receiverService: ReceiverService,
              private userService: UsersService,
              private route: ActivatedRoute,
              private location: Location,
              private modalService: BsModalService,
              private fb: FormBuilder,
              private modal: NgbModal) { }

  ngOnInit() {
    this.getSelectedGroup();
    this.getData();
  }

  getGroup(id){
    this.groupService.getGroup(id)
      .subscribe(group => {
        this.group = group[0];
      });
  }

  // get the selected group
  getSelectedGroup() { 
    console.log("GETSELECTEDGROUP method");   
    this.groupService.getGroup(this.selectedGroupId)
      .subscribe(group => {
        this.group = group[0];
      });
    console.log(this.group);
  }

  // get the receivers of the selected group
  getReceiversOfGroup() {
    // const id = +this.route.snapshot.paramMap.get('id');
    // this.groupService.getIntakeMomentOfReceiver('' + id)
    //   .subscribe(intakemoments => {
    //               this.intakemoments = intakemoments; });
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
