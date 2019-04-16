import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { IntakeMomentService } from '../../service/intake-moment.service';

@Component({
  selector: 'app-intakemoments',
  templateUrl: './intakemoments.component.html',
  styleUrls: ['./intakemoments.component.scss']
})
export class IntakemomentsComponent implements OnInit {

  list: any;
  intakeMoment: IntakeMoment = new IntakeMoment();
  errorMsg: ErrorMsg = new  ErrorMsg();
  modalRef: BsModalRef;

  constructor(private intakeMomentService: IntakeMomentService, private modalService: BsModalService) { }

  openModalAdd(template: TemplateRef<any>) {
    this.errorMsg = new ErrorMsg();
    this.intakeMoment = new IntakeMoment();
    this.modalRef = this.modalService.show(template);
  }

  openModalAlter(template: TemplateRef<any>, rec: IntakeMoment) {
    this.errorMsg = new ErrorMsg();
    this.intakeMoment.id = rec.id;
    this.intakeMoment.name = rec.name;
    this.modalRef = this.modalService.show(template);
  }

  openModalDelete(template: TemplateRef<any>, rec: IntakeMoment) {
    this.errorMsg = new ErrorMsg();
    this.intakeMoment.id = rec.id;
   // this.intakeMoment.name = rec.name;
    this.modalRef = this.modalService.show(template);
  }

  getReceivers() {
    const receiverObservable = this.intakeMomentService.getAllIntakeMoments();
    receiverObservable.subscribe((userData: any[]) => {
      console.log(userData);
      this.list = userData;
    });
  }

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

  ngOnInit() {
    this.getReceivers();
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

  deleteRec(rec: IntakeMoment) {
    console.log(rec);
    this.intakeMomentService.deleteIntakeMoment(rec).subscribe(res => {
      this.getReceivers();
       this.modalRef.hide();
      console.log(res);
    }, error => {
      console.log(error);
      this.errorMsg.name = error.error['response'];
    });
  }

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