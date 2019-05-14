import {Component, OnInit, TemplateRef, ViewChild, AfterViewInit, Inject, LOCALE_ID} from '@angular/core';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import {FormGroup, FormArray, Validators, FormBuilder} from '@angular/forms';
import {ErrorMsg} from '../../_models/errorMsg';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {formatDate} from '@angular/common';
import {Group} from '../../_models/group';
import {GroupService} from '../../service/group.service';
import {Receiver} from '../../_models/receiver';
import {ReceiverService} from '../../service/receiver.service';
import {Dispenser} from '../../_models/dispenser';
import {UsersService} from '../../service/users.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  groups: any;
  receivers: any;
  dispensers: any;
  group: Group = new Group();
  errorMsg: ErrorMsg = new  ErrorMsg();
  modalRef: BsModalRef;

  constructor(private groupService: GroupService,
              private receiverService: ReceiverService,
              private userService: UsersService,
              private route: ActivatedRoute,
              private location: Location,
              private modalService: BsModalService,
              private fb: FormBuilder,
              @Inject(LOCALE_ID) private locale: string,
              private modal: NgbModal) { }

  ngOnInit() {
    this.getGroups();
    this.getData();
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

  openModalDeleteGroup(template: TemplateRef<any>, g: Group) {
    this.errorMsg = new ErrorMsg();
    this.group.id = g.id;
    this.group.name = g.name;
    this.modalRef = this.modalService.show(template);
  }

  //get all groups
  getGroups(){
    const groupObservable = this.groupService.getAllGroups();
    groupObservable.subscribe((userData: any[]) => {
      this.groups = userData;
    })
  }

  deleteGroup(group: Group){
    this.groupService.deleteGroup(group).subscribe(res => {
      this.getGroups();
      this.modalRef.hide();
    }, error => {
      this.errorMsg.name = error.error['response'];
    });
    //location.reload(true);
  }

}
