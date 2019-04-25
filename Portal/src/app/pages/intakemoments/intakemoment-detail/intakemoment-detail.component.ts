import {Component, OnInit, TemplateRef, ViewChild, AfterViewInit, Inject, LOCALE_ID} from '@angular/core';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import {IntakeMomentService} from '../../../service/intake-moment.service';
import {UsersService} from '../../../service/users.service';
import {PriorityService} from '../../../service/priority.service';
import {MedicinenService} from '../../../service/medicinen.service';
import {FormGroup, FormArray, Validators, FormBuilder} from '@angular/forms';
import {IntakeMoment} from '../../../_models/intakeMoment';
import {ErrorMsg} from '../../../_models/errorMsg';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Receiver} from '../../../_models/receiver';
import {ReceiverService} from '../../../service/receiver.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-intakemoment-detail',
  templateUrl: './intakemoment-detail.component.html',
  styleUrls: ['./intakemoment-detail.component.scss']
})
export class IntakemomentDetailComponent implements OnInit {

  receiver: Receiver;
  medicines: any;
  intakemoments: any;
  dispensers: any;
  priorities: any;
  intakeMoment: IntakeMoment = new IntakeMoment();
  errorMsg: ErrorMsg = new  ErrorMsg();
  modalRef: BsModalRef;
  intakeMomentForm: FormGroup;
  intakeMomentEditForm: FormGroup;
  submitted = false;

  constructor(private intakeMomentService: IntakeMomentService,
              private userService: UsersService,
              private priorityService: PriorityService,
              private medicinService: MedicinenService,
              private receiverService: ReceiverService,
              private route: ActivatedRoute,
              private location: Location,
              private modalService: BsModalService,
              private fb: FormBuilder,
              @Inject(LOCALE_ID) private locale: string,
              private modal: NgbModal) { }

  ngOnInit() {
    this.getReceiver();
    this.intakeMomentForm = this.fb.group({
      intakeStartTime: ['', [Validators.required]],
      priorityNumber: ['', [Validators.required]],
      dispenser: [''],
      medicines: this.fb.array([
        this.addMedicineFormGroup()
      ]),
      remark: ['']
    });
    this.intakeMomentEditForm = this.fb.group({
      intakeStartTime: ['', [Validators.required]],
      priorityNumber: ['', [Validators.required]],
      dispenser: [''],
      medicines: this.fb.array([]),
      remark: ['']
    });
    this.getData();
    this.getIntakeMomentsOfReceiver();
  }

  // get the selected receiver
  getReceiver() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.receiverService.getReceiver(id)
      .subscribe(receiver => {
        this.receiver = receiver[0];
      });
  }

  // get the intakemoments of the selected receiver
  getIntakeMomentsOfReceiver() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.intakeMomentService.getIntakeMomentOfReceiver('' + id)
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

    // get medicines from Api
    const medicinObservable = this.medicinService.getAllMedicine();
    medicinObservable.subscribe((medicinData: any[]) => {
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

  openModalAddIntakemoment(template: TemplateRef<any>) {
    this.submitted = false;
    this.errorMsg = new ErrorMsg();
    this.intakeMoment = new IntakeMoment();
    this.modalRef = this.modalService.show(template);
  }

  openModalEditIntakemoment(template: TemplateRef<any>, intake: any) {
    this.submitted = false;
    this.errorMsg = new ErrorMsg();
    this.intakeMoment = new IntakeMoment();
    this.intakeMoment.id = intake.id;
    this.intakeMoment.intake_start_time = intake.intake_start_time;
    this.intakeMoment.intake_end_time = intake.intake_end_time;
    this.intakeMoment.priority_number = intake.priority_number.number;
    this.intakeMoment.dispenser_id = intake.dispenser ? intake.dispenser.id : '';
    this.intakeMoment.remark = intake.remark;
    this.intakeMoment.intake_moment_medicines = intake.intake_moment_medicines;
    this.patchIntakeMomentEditForm();
    this.modalRef = this.modalService.show(template);
  }

  openModalDeleteIntakemoment(template: TemplateRef<any>, intake: IntakeMoment) {
    this.errorMsg = new ErrorMsg();
    this.intakeMoment.id = intake.id;
    this.intakeMoment.receiver_id = intake.receiver_id;
    this.modalRef = this.modalService.show(template);
  }

  onSave() {
    this.submitted = true;
    this.intakeMoment.intake_start_time = this.intakeMomentForm.get('intakeStartTime').value;
    this.intakeMoment.priority_number = this.intakeMomentForm.get('priorityNumber').value;
    this.intakeMoment.dispenser_id = this.intakeMomentForm.get('dispenser').value;
    this.intakeMoment.remark = this.intakeMomentForm.get('remark').value;
    this.intakeMoment.intake_moment_medicines = this.intakeMomentForm.get('medicines').value;
    if (this.intakeMomentForm.invalid) {
      return;
    } else {
      this.intakeMomentService.addIntakeMoment(this.intakeMoment, this.receiver.id).subscribe(res => {
        this.getIntakeMomentsOfReceiver();
        this.intakeMomentForm.reset();
        this.modalRef.hide();
      }, error => {
         this.errorMsg.name = error.error['response'];
       });
    }
  }

  onAlter() {
    this.submitted = true;
    this.intakeMoment.intake_start_time = this.intakeMomentEditForm.get('intakeStartTime').value;
    this.intakeMoment.priority_number = this.intakeMomentEditForm.get('priorityNumber').value;
    this.intakeMoment.dispenser_id = this.intakeMomentEditForm.get('dispenser').value;
    this.intakeMoment.remark = this.intakeMomentEditForm.get('remark').value;
    this.intakeMoment.intake_moment_medicines = this.intakeMomentEditForm.get('medicines').value;
    if (this.intakeMomentEditForm.invalid) {
      return;
    } else {
      this.intakeMomentService.updateIntakeMoment(this.intakeMoment, this.receiver.id).subscribe(res => {
        this.getIntakeMomentsOfReceiver();
        this.modalRef.hide();
      }, error => {
        this.errorMsg.name = error.error['response'];
      });
    }
  }

  deleteIntakeMoment(intake: IntakeMoment) {
    this.intakeMomentService.deleteIntakeMoment(this.receiver.id, intake).subscribe(res => {
      this.getIntakeMomentsOfReceiver();
       this.modalRef.hide();
    }, error => {
      this.errorMsg.name = error.error['response'];
    });
  }

  addMedicineButtonClick(): void {
    (<FormArray>this.intakeMomentForm.get('medicines')).push(this.addMedicineFormGroup());
  }

  addMedicineEditButtonClick() {
    (<FormArray>this.intakeMomentEditForm.get('medicines')).push(this.addMedicineFormGroup());
  }

  deleteMedicineButtonClick(index: number): void {
    (<FormArray>this.intakeMomentForm.get('medicines')).removeAt(index);
  }

  deleteMedicineEditButtonClick(i: number) {
    (<FormArray>this.intakeMomentEditForm.get('medicines')).removeAt(i);
  }

  patchIntakeMomentEditForm() {
    this.intakeMomentEditForm.patchValue({
      intakeStartTime: formatDate(new Date(this.intakeMoment.intake_start_time), 'yyyy-MM-ddThh:mm', this.locale),
      priorityNumber: this.intakeMoment.priority_number,
      dispenser: this.intakeMoment.dispenser_id,
      remark: this.intakeMoment.remark,
    });
    this.setMedicines();
  }

  setMedicines() {
    const control = <FormArray>this.intakeMomentEditForm.controls.medicines;
    control.controls = [];
    this.intakeMoment.intake_moment_medicines.forEach(x => {
      if (x.medicine_id) {
      control.push(this.fb.group({medicine_id: x.medicine_id.id, time_window: x.time_window, dosage: x.dosage}));
      }
    });
  }

  get intakeAddForm() { return this.intakeMomentForm.controls; }
  get intakeEditForm() {return this.intakeMomentEditForm.controls; }

  backToOverview() {
    this.location.back();
  }
}

