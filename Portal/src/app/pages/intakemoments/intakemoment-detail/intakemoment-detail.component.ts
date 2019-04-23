import {Component, OnInit, TemplateRef, ViewChild, AfterViewInit} from '@angular/core';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import {IntakeMomentService} from '../../../service/intake-moment.service';
import {IntakeMoment_medicines} from '../../../_models/intake_moment_medicine';
import {UsersService} from '../../../service/users.service';
import {PriorityService} from '../../../service/priority.service';
import {FormControl, FormGroup, FormArray, Validators} from '@angular/forms';
import {IntakeMoment} from '../../../_models/intakeMoment';
import {ErrorMsg} from '../../../_models/errorMsg';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-intakemoment-detail',
  templateUrl: './intakemoment-detail.component.html',
  styleUrls: ['./intakemoment-detail.component.scss']
})
export class IntakemomentDetailComponent implements OnInit {

  calendarPlugins=[dayGridPlugin]

  medicines: any;
  intakemoments: any;
  dispensers: any;
  priorities: any;
  intakeMoment: IntakeMoment = new IntakeMoment();
  errorMsg: ErrorMsg = new  ErrorMsg();
  modalRef: BsModalRef;
  id: number;

  intakeForm = new FormGroup({
    medicinesForm : new FormArray([
      new FormGroup({
        medicines: new FormControl('', Validators.required),
        time_window: new FormControl('', Validators.required),
        dosage: new FormControl('', Validators.required)
      })
    ])
  });

  constructor(private intakeMomentService: IntakeMomentService,
              private userService: UsersService,
              private priorityService: PriorityService,
              private route: ActivatedRoute,
              private location: Location,
              private modalService: BsModalService,
              private modal: NgbModal) { }

  ngOnInit() {
    this.getIntakeMomentsOfReceiver();
  }

  // get the intakemoments of the selected receiver
  getIntakeMomentsOfReceiver() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.intakeMomentService.getIntakeMomentOfReceiver(this.id)
      .subscribe(intakemoments => {
                  this.intakemoments = intakemoments; });
  }

  getData() {
    const roles = { roleList: ['Toediener', 'Hoofdtoediener'] };
    // get dispensers from API
    const userObservable = this.userService.getUsersByRoles(roles);
    userObservable.subscribe((userData: any[]) => {
      this.dispensers = userData;
    });

    // get priorities from API
    const priorityObservable = this.priorityService.getAllPriorities();
    priorityObservable.subscribe((priorityData: any[]) => {
      this.priorities = priorityData;
    });
  } 

  openModalAddIntakemoment(template: TemplateRef<any>) {
    this.errorMsg = new ErrorMsg();
    this.intakeMoment = new IntakeMoment();
    this.getData();
    this.modalRef = this.modalService.show(template);
  }

  openModalEditIntakemoment(template: TemplateRef<any>, intake: IntakeMoment) {
    this.errorMsg = new ErrorMsg();
    this.intakeMoment.intake_start_time = intake.intake_start_time;
    this.intakeMoment.intake_end_time = intake.intake_end_time;
    this.intakeMoment.priority_number = intake.priority_number;
    this.intakeMoment.dispenser = intake.dispenser;
    this.intakeMoment.remark = intake.remark;
    // this.intakeMoment.name = rec.name;
    this.modalRef = this.modalService.show(template);
  }

  openModalDeleteIntakemoment(template: TemplateRef<any>, intake: IntakeMoment) {
    this.errorMsg = new ErrorMsg();
    this.intakeMoment.id = intake.id;
    this.intakeMoment.receiver_id = intake.receiver_id;
    this.modalRef = this.modalService.show(template);
  }

  onSave() {
    if (!this.intakeMoment.intake_start_time && !this.intakeMoment.intake_end_time &&
      !this.intakeMoment.priority_number && !this.intakeMoment.dispenser) {
      return;
    } else {
      this.intakeMomentService.addIntakeMoment(this.intakeMoment).subscribe(res => {
        this.getIntakeMomentsOfReceiver();
        this.modalRef.hide();
        console.log(res);
      }, error => {
         console.log(error);
         this.errorMsg.name = error.error['response'];
       });
    }
  }

  onAlter() {
    // !this.intakeMoment.name ? this.errorMsg.name = 'Naam vereist' : '';
    // if (!this.intakeMoment.name) {
    //   return;
    // } else {
    //   this.intakeMomentService.updateIntakeMoment(this.intakeMoment).subscribe(res => {
    //     this.getReceivers();
    //     this.modalRef.hide();
    //     console.log(res);
    //   }, error => {
    //     console.log(error);
    //     this.errorMsg.name = error.error['response'];
    //   });
    // }
  }

  deleteIntakeMoment(intake: IntakeMoment) {
    this.intakeMomentService.deleteIntakeMoment(this.id, intake).subscribe(res => {
      this.getIntakeMomentsOfReceiver();
       this.modalRef.hide();
    }, error => {
      this.errorMsg.name = error.error['response'];
    });
  }

}

