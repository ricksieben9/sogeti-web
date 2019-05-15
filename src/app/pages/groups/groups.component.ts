import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import {ErrorMsg} from '../../_models/errorMsg';
import {Group} from '../../_models/group';
import {GroupService} from '../../service/group.service';
import {ReceiverService} from '../../service/receiver.service';
import {UsersService} from '../../service/users.service';
import {GroupDetailComponent} from './group-detail/group-detail.component';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  selectedGroup: Group;
  groups: any;
  receivers: any;
  dispensers: any;
  group: Group = new Group();
  errorMsg: ErrorMsg = new  ErrorMsg();
  modalRef: BsModalRef;
  @ViewChild(GroupDetailComponent)
  private groupDetailComponent: GroupDetailComponent;

  constructor(private groupService: GroupService,
              private receiverService: ReceiverService,
              private userService: UsersService,
              private modalService: BsModalService,
             ) { }

  ngOnInit() {
    this.getGroups();
  }

  onSelect(group) {
    this.selectedGroup = group;
    this.groupDetailComponent.getGroup(this.selectedGroup.id);
  }

  // opens the deletemodal
  openModalDeleteGroup(template: TemplateRef<any>, g: Group) {
    this.errorMsg = new ErrorMsg();
    this.group.id = g.id;
    this.group.name = g.name;
    this.modalRef = this.modalService.show(template);
  }

  // get all groups
  getGroups() {
    const groupObservable = this.groupService.getAllGroups();
    groupObservable.subscribe((userData: any[]) => {
      this.groups = userData;
    });
  }

  // deletes a group
  deleteGroup(group: Group) {
    this.groupService.deleteGroup(group).subscribe(ref => {
      this.getGroups();
      this.modalRef.hide();
    }, error => {
      this.errorMsg.name = error.error['response'];
    });
    this.getGroups();
  }

}
