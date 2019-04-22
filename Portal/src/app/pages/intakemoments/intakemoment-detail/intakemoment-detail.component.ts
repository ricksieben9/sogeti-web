import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import {IntakeMomentService} from '../../../service/intake-moment.service';
import {ReceiverService} from '../../../service/receiver.service';
import {Receiver} from '../../../_models/receiver';
//import {IntakeMoment} from '../../../_models/intakeMoment';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-intakemoment-detail',
  templateUrl: './intakemoment-detail.component.html',
  styleUrls: ['./intakemoment-detail.component.scss']
})
export class IntakemomentDetailComponent implements OnInit {

  intakemoments: any;
  intakeMoment: IntakeMoment = new IntakeMoment();
  errorMsg: ErrorMsg = new  ErrorMsg();
  modalRef: BsModalRef;

  constructor(private intakeMomentService: IntakeMomentService,
              private receiverService: ReceiverService,
              private route: ActivatedRoute,
              private location: Location,
              private modalService: BsModalService) { }

  ngOnInit() {
    this.getIntakeMomentsOfReceiver();
  }

  getIntakeMomentsOfReceiver() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.intakeMomentService.getIntakeMomentOfReceiver(id)
      .subscribe(intakemoments => {console.log(intakemoments);
                  this.intakemoments = intakemoments; });
  }

  // openModalAddIntakemoment(template: TemplateRef<any>) {
  //   this.errorMsg = new ErrorMsg();
  //   this.intakeMoment = new IntakeMoment();
  //   this.modalRef = this.modalService.show(template);
  // }

  // openModalEditIntakemoment(template: TemplateRef<any>, rec: IntakeMoment) {
  //   this.errorMsg = new ErrorMsg();
  //   this.intakeMoment.id = rec.id;
  //   // this.intakeMoment.name = rec.name;
  //   this.modalRef = this.modalService.show(template);
  // }

  // openModalDeleteIntakemoment(template: TemplateRef<any>, rec: IntakeMoment) {
  //   this.errorMsg = new ErrorMsg();
  //   this.intakeMoment.id = rec.id;
  //  // this.intakeMoment.name = rec.name;
  //   this.modalRef = this.modalService.show(template);
  // }

  onSave() {
    // !this.intakeMoment.name ? this.errorMsg.name = 'Naam vereist' : '';
    // if (!this.intakeMoment.name) {
    //   return;
    // } else {
    //   this.intakeMomentService.addIntakeMoment(this.intakeMoment).subscribe(res => {
    //     this.getReceivers();
    //     this.modalRef.hide();
    //     console.log(res);
    //   }, error => {
    //      console.log(error);
    //      this.errorMsg.name = error.error['response'];
    //    });
    // }
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

  // deleteRec(rec: IntakeMoment) {
  //   console.log(rec);
  //   this.intakeMomentService.deleteIntakeMoment(rec).subscribe(res => {
  //     this.getReceivers();
  //      this.modalRef.hide();
  //     console.log(res);
  //   }, error => {
  //     console.log(error);
  //     this.errorMsg.name = error.error['response'];
  //   });
  // }

}

class IntakeMoment {
  id: string;
  intake_start_time: Date;
  intake_end_time: Date;
  receiver_id: string;
  remark: string;
  priority_number: string;
  dispenser: string;
}

class ErrorMsg {
  name: string;
}

