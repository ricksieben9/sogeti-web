import {Component, EventEmitter, Inject, Input, LOCALE_ID, OnInit, Output} from '@angular/core';
import {IntakeMoment} from '../../../_models/intakeMoment';
import {Receiver} from '../../../_models/receiver';
import {ErrorMsg} from '../../../_models/errorMsg';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IntakeMomentService} from '../../../service/intake-moment.service';
import {UsersService} from '../../../service/users.service';
import {PriorityService} from '../../../service/priority.service';
import {MedicineService} from '../../../service/medicine.service';
import {ReceiverService} from '../../../service/receiver.service';
import {ActivatedRoute} from '@angular/router';
import {formatDate, Location} from '@angular/common';

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
              private medicineService: MedicineService,
              private receiverService: ReceiverService,
              private route: ActivatedRoute,
              private location: Location,
              private modalService: BsModalService,
              private fb: FormBuilder,
              @Inject(LOCALE_ID) private locale: string) { }

  ngOnInit() {
    this.createForm();
    this.getData();
  }

  getIntakeMoment(id: string) {
    this.intakeMomentService.getIntakeMoment(id)
      .subscribe( intakeMoment => {
        this.intakeMoment = intakeMoment[0];
        this.patchIntakeMomentForm();
      });
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

    // get receiver
    const id = +this.route.snapshot.paramMap.get('id');
    this.receiverService.getReceiver(id)
      .subscribe(receiver => {
        this.receiver = receiver[0];
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
      id: [''],
      intakeStartTime: ['', [Validators.required]],
      priorityNumber: ['', [Validators.required]],
      dispenser: [''],
      medicines: this.fb.array([
        this.addMedicineFormGroup()
      ]),
      remark: ['']
    });

    // default no medicines in intake moment
    const control = <FormArray>this.intakeMomentForm.controls.medicines;
    control.controls = [];
  }

  saveIntakeMoment() {
    this.submitted = true;
    this.intakeMoment.intake_start_time = this.intakeMomentForm.get('intakeStartTime').value;
    this.intakeMoment.priority_number = this.intakeMomentForm.get('priorityNumber').value;
    this.intakeMoment.dispenser_id = this.intakeMomentForm.get('dispenser').value;
    this.intakeMoment.remark = this.intakeMomentForm.get('remark').value;
    this.intakeMoment.intake_moment_medicines = this.intakeMomentForm.get('medicines').value;
    this.intakeMoment.receiver_id = this.receiver.id;
    if (this.intakeMomentForm.invalid) {
      return;
    } else {
      if (this.intakeMomentForm.get('id').value) {
        this.intakeMomentService.updateIntakeMoment(this.intakeMoment).subscribe(res => {
          this.submitted = false;
          this.createForm();
          this.saveEvent.next();
        }, error => {
          this.errorMsg.name = error.error['response'];
        });
      } else {
        this.intakeMomentService.addIntakeMoment(this.intakeMoment).subscribe(res => {
          this.submitted = false;
          this.createForm();
          this.saveEvent.next();
        }, error => {
          this.errorMsg.name = error.error['response'];
        });
      }
    }
  }

  get intakeMomentFormControls() {return this.intakeMomentForm.controls; }

  deleteMedicineButtonClick(index: number) {
    (<FormArray>this.intakeMomentForm.get('medicines')).removeAt(index);
  }

  addMedicineButtonClick() {
    (<FormArray>this.intakeMomentForm.get('medicines')).push(this.addMedicineFormGroup());
  }

  private patchIntakeMomentForm() {
    this.intakeMomentForm.patchValue({
      id: this.intakeMoment.id,
      intakeStartTime: formatDate(new Date(this.intakeMoment.intake_start_time), 'yyyy-MM-ddTHH:mm', this.locale),
      priorityNumber: this.intakeMoment.priority_number.number,
      dispenser: this.intakeMoment.dispenser ? this.intakeMoment.dispenser : '',
      remark: this.intakeMoment.remark,
    });
    this.setMedicines();
  }

  private setMedicines() {
    const control = <FormArray>this.intakeMomentForm.controls.medicines;
    control.controls = [];
    this.intakeMoment.intake_moment_medicines.forEach(x => {
      if (x.medicine_id) {
        control.push(this.fb.group({medicine_id: x.medicine_id.id, time_window: x.time_window, dosage: x.dosage}));
      }
    });
  }

  checkDuplicateMedicine(id: any, index: number) {
    if (this.intakeMomentForm) {
      for ( let i = 0; i < this.intakeMomentForm.get('medicines').value.length; i++) {
        if (this.intakeMomentForm.get('medicines').value[i].medicine_id) {
          if ( id.toString() === this.intakeMomentForm.get('medicines').value[i].medicine_id.toString()) {
            return index === i;
          }
        }
      }
    }
    return true;
  }

  getCurrentMedicineDosageType(index: number) {
    if (this.intakeMomentForm) {
      for ( let i = 0; i < this.medicines.length; i++) {
        if (this.intakeMomentForm.get('medicines').value[index].medicine_id) {
          if ( this.medicines[i].id.toString() === this.intakeMomentForm.get('medicines').value[index].medicine_id) {
            return this.medicines[i].unit;
          }
        }
      }
    }
    return 'mg';
  }
}
