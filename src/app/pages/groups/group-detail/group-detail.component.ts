import { Component, OnInit, Input } from '@angular/core';
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
  private submitted: boolean;

  constructor(private groupService: GroupService,
              private receiverService: ReceiverService,
              private userService: UsersService,
              private priorityService: PriorityService,
              private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.getData();
    this.createForm();
  }

  createForm() {
    this.groupForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required]],
      group_dispensers: this.fb.array([
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
        this.patchGroupForm();
      });
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
      user_id: [''],
      priority: ['']
    });
  }

  addReceiverFormGroup(): FormGroup {
    return this.fb.group({
      id: ['']
    });
  }

  patchGroupForm() {
    this.groupForm.patchValue({
      id: this.group.id,
      name: this.group.name
    });
    this.setDispensers();
    this.setReceivers();
  }

  clearGroupForm() {
    this.createForm();
  }

  setDispensers() {
    const control = <FormArray>this.groupForm.controls.group_dispensers;
    control.controls = [];
    this.group.group_dispensers.forEach(x => {
      if (x.user_id) {
      control.push(this.fb.group({user_id: x.user_id.id, priority: x.priority.number}));
      }
    });
  }

  setReceivers() {
    const control = <FormArray>this.groupForm.controls.receivers;
    control.controls = [];
    this.group.receivers.forEach(x => {
      if (x.receiver_id) {
      control.push(this.fb.group({receiver_id: x.receiver_id.id}));
      }
    });
  }

  deleteDispenserButtonClick(index: number) {
    (<FormArray>this.groupForm.get('group_dispensers')).removeAt(index);
  }

  addDispenserButtonClick() {
    (<FormArray>this.groupForm.get('group_dispensers')).push(this.addDispenserFormGroup());
  }

  deleteReceiverButtonClick(index: number) {
    (<FormArray>this.groupForm.get('receivers')).removeAt(index);
  }

  addReceiverButtonClick() {
    (<FormArray>this.groupForm.get('receivers')).push(this.addReceiverFormGroup());
  }

  get groupFormControls() { return this.groupForm.controls; }

  saveGroup() {
    this.submitted = true;
    if (!this.groupForm.get('id').value) { this.group = new Group(); }
    this.group.name = this.groupForm.get('name').value;
    this.group.group_dispensers = this.groupForm.get('group_dispensers').value;
    this.group.receivers = this.groupForm.get('receivers').value;
    if (this.groupForm.invalid) {
      return;
    } else {
      if (this.groupForm.get('id').value) {
        this.groupService.updateGroup(this.group).subscribe(res => {

        }, error => {
          this.errorMsg.name = error.error['response'];
        });
      } else {
        this.groupService.addGroup(this.group).subscribe(res => {

        }, error => {
          this.errorMsg.name = error.error['response'];
        });
      }
    }
  }
}
