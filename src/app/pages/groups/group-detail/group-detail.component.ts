import { Component, OnInit, Input } from '@angular/core';
// import {FormGroup, FormArray, Validators, FormBuilder} from '@angular/forms';
import {ErrorMsg} from '../../../_models/errorMsg';
import {Group} from '../../../_models/group';
import {GroupService} from '../../../service/group.service';
import {ReceiverService} from '../../../service/receiver.service';
import {UsersService} from '../../../service/users.service';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PriorityService} from '../../../service/priority.service';

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
  priorities: any;
  errorMsg: ErrorMsg = new  ErrorMsg();
  groupForm: FormGroup;

  constructor(private groupService: GroupService,
              private receiverService: ReceiverService,
              private userService: UsersService,
              private priorityService: PriorityService,
              private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.getData();
    this.groupForm = this.fb.group({
      name: ['', [Validators.required]],
      dispensers: this.fb.array([
        this.addDispenserFormGroup()
      ]),
      receivers: this.fb.array([
        this.addReceiverFormGroup()
      ])
    });
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
    const receiverObservable = this.receiverService.getAllReceivers();
    receiverObservable.subscribe((receiverData: any[]) => {
      this.receivers = receiverData;
    });

    // get priorities from Api
    const priorityObservable = this.priorityService.getAllPriorities();
    priorityObservable.subscribe((priorityData: any[]) => {
      this.priorities = priorityData;
    });
  }

  addDispenserFormGroup(): FormGroup {
    return this.fb.group({
      dispenser_id: [''],
      priority_id: ['']
    });
  }

  addReceiverFormGroup(): FormGroup {
    return this.fb.group({
      receiver_id: ['']
    });
  }

  deleteDispenserButtonClick(index: number) {
    (<FormArray>this.groupForm.get('dispensers')).removeAt(index);
  }

  addDispenserButtonClick() {
    (<FormArray>this.groupForm.get('dispensers')).push(this.addDispenserFormGroup());
  }

  deleteReceiverButtonClick(index: number) {
    (<FormArray>this.groupForm.get('receivers')).removeAt(index);
  }

  addReceiverButtonClick() {
    (<FormArray>this.groupForm.get('receivers')).push(this.addReceiverFormGroup());
  }
}
