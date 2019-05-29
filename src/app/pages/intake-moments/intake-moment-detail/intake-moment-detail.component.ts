import {Component, EventEmitter, Inject, Input, LOCALE_ID, OnInit, Output} from '@angular/core';
import {IntakeMoment} from '../../../_models/intakeMoment';
import {Receiver} from '../../../_models/receiver';
import {ErrorMsg} from '../../../_models/errorMsg';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IntakeMomentService} from '../../../service/intake-moment.service';
import {UsersService} from '../../../service/users.service';
import {PriorityService} from '../../../service/priority.service';
import {MedicinenService} from '../../../service/medicinen.service';
import {ReceiverService} from '../../../service/receiver.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-intake-moment-detail',
  templateUrl: './intake-moment-detail.component.html',
  styleUrls: ['./intake-moment-detail.component.scss']
})
export class IntakeMomentDetailComponent implements OnInit {
  @Input() intakeMoment: IntakeMoment;
  @Output() saveEvent = new EventEmitter<string>();
  receiver: Receiver;
  medicines: any;
  intakemoments: any;
  dispensers: any;
  priorities: any;
  errorMsg: ErrorMsg = new  ErrorMsg();
  modalRef: BsModalRef;
  intakeMomentForm: FormGroup;
  private submitted: boolean;

  constructor(private intakeMomentService: IntakeMomentService,
              private userService: UsersService,
              private priorityService: PriorityService,
              private medicineService: MedicinenService,
              private receiverService: ReceiverService,
              private route: ActivatedRoute,
              private location: Location,
              private modalService: BsModalService,
              private fb: FormBuilder,
              @Inject(LOCALE_ID) private locale: string,
              private modal: NgbModal) { }

  ngOnInit() {
    this.createForm();
    this.getData();
  }

  getIntakeMoment(id: string) {
    this.intakeMomentService.getIntakeMoment(id);
  }

  clearIntakeMomentForm() {
    this.submitted = false;
    this.createForm();
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

    // get medicines from Api
    const medicineObservable = this.medicineService.getAllMedicine();
    medicineObservable.subscribe((medicinData: any[]) => {
      this.medicines = medicinData;
    });
  }

  addMedicineFormGroup(): FormGroup {
    return this.fb.group({
      medicine_id: ['', Validators.required],
      time_window: ['', Validators.required],
      dosage: ['', Validators.required]
    });
  }

  private createForm() {
    this.intakeMomentForm = this.fb.group({
      intakeStartTime: ['', [Validators.required]],
      priorityNumber: ['', [Validators.required]],
      dispenser: [''],
      medicines: this.fb.array([
        this.addMedicineFormGroup()
      ]),
      remark: ['']
    });
  }
}
