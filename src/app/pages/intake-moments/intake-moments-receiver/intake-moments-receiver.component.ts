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
import {formatDate} from '@angular/common';
import {IntakeMomentDetailComponent} from '../intake-moment-detail/intake-moment-detail.component';

@Component({
  selector: 'app-intake-moments-receiver',
  templateUrl: './intake-moments-receiver.component.html',
  styleUrls: ['./intake-moments-receiver.component.scss']
})
export class IntakeMomentsReceiverComponent implements OnInit {

  @ViewChild(IntakeMomentDetailComponent)
  private intakeMomentDetailComponent: IntakeMomentDetailComponent;
  receiver: Receiver;
  intakemoments: any;
  intakeMoment: IntakeMoment = new IntakeMoment();
  errorMsg: ErrorMsg = new  ErrorMsg();
  modalRef: BsModalRef;
  selectedIntakeMoment: IntakeMoment;

  constructor(private intakeMomentService: IntakeMomentService,
              private receiverService: ReceiverService,
              private route: ActivatedRoute,
              private location: Location,
              private modalService: BsModalService,
              @Inject(LOCALE_ID) private locale: string,
              private modal: NgbModal) { }

  ngOnInit() {
    this.getReceiver();
    this.getIntakeMomentsOfReceiver();
  }

  onSelect(intakeMoment: IntakeMoment) {
    this.selectedIntakeMoment = intakeMoment;
    this.intakeMomentDetailComponent.getIntakeMoment(this.selectedIntakeMoment.id);
  }

  onClear() {
    this.intakeMomentDetailComponent.clearIntakeMomentForm();
  }

  backToOverview() {
    this.location.back();
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

  openModalDeleteIntakemoment(template: TemplateRef<any>, intake: IntakeMoment) {
    this.errorMsg = new ErrorMsg();
    this.intakeMoment.id = intake.id;
    this.intakeMoment.receiver_id = intake.receiver_id;
    this.modalRef = this.modalService.show(template);
  }

  deleteIntakeMoment(intake: IntakeMoment) {
    this.intakeMomentService.deleteIntakeMoment(this.receiver.id, intake).subscribe(res => {
      this.getIntakeMomentsOfReceiver();
       this.modalRef.hide();
    }, error => {
      this.errorMsg.name = error.error['response'];
    });
  }
}

