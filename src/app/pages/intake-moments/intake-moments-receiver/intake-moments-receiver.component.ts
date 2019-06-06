import {Component, OnInit, TemplateRef, ViewChild, Inject, LOCALE_ID} from '@angular/core';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import {IntakeMomentService} from '../../../service/intake-moment.service';
import {IntakeMoment} from '../../../_models/intakeMoment';
import {ErrorMsg} from '../../../_models/errorMsg';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {ReceiverService} from '../../../service/receiver.service';
import {IntakeMomentDetailComponent} from '../intake-moment-detail/intake-moment-detail.component';

@Component({
  selector: 'app-intake-moments-receiver',
  templateUrl: './intake-moments-receiver.component.html',
  styleUrls: ['./intake-moments-receiver.component.scss']
})
export class IntakeMomentsReceiverComponent implements OnInit {

  @ViewChild(IntakeMomentDetailComponent)
  private intakeMomentDetailComponent: IntakeMomentDetailComponent;
  intakemoments: any;
  intakeMoment: IntakeMoment = new IntakeMoment();
  errorMsg: ErrorMsg = new  ErrorMsg();
  modalRef: BsModalRef;
  selectedIntakeMoment: IntakeMoment = new IntakeMoment();

  constructor(private intakeMomentService: IntakeMomentService,
              private receiverService: ReceiverService,
              private route: ActivatedRoute,
              private location: Location,
              private modalService: BsModalService,
              @Inject(LOCALE_ID) private locale: string) { }

  ngOnInit() {
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
    this.intakeMomentService.deleteIntakeMoment(intake).subscribe(res => {
      this.getIntakeMomentsOfReceiver();
       this.modalRef.hide();
    }, error => {
      this.errorMsg.name = error.error['response'];
    });
  }
}

