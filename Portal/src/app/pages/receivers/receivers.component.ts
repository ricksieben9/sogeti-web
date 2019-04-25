import {Component, OnInit, TemplateRef} from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {ReceiverService} from '../../service/receiver.service';

@Component({
  selector: 'app-receivers',
  templateUrl: './receivers.component.html',
  styleUrls: ['./receivers.component.scss']
})
export class ReceiversComponent implements OnInit {

  list: any;
  receiver: Receiver = new Receiver();
  errorMsg: ErrorMsg = new  ErrorMsg();
  modalRef: BsModalRef;

  constructor(private receiverService: ReceiverService, private modalService: BsModalService) { }

  openModalAdd(template: TemplateRef<any>) {
    this.errorMsg = new ErrorMsg();
    this.receiver = new Receiver();
    this.modalRef = this.modalService.show(template);
  }

  openModalAlter(template: TemplateRef<any>, rec: Receiver) {
    this.errorMsg = new ErrorMsg();
    this.receiver.id = rec.id;
    this.receiver.name = rec.name;
    this.modalRef = this.modalService.show(template);
  }

  openModalDelete(template: TemplateRef<any>, rec: Receiver) {
    this.errorMsg = new ErrorMsg();
    this.receiver.id = rec.id;
    this.receiver.name = rec.name;
    this.modalRef = this.modalService.show(template);
  }

  getReceivers() {
    const receiverObservable = this.receiverService.getAllReceivers();
    receiverObservable.subscribe((userData: any[]) => {
      this.list = userData;
    });
  }

  onSave() {
    !this.receiver.name ? this.errorMsg.name = 'Naam vereist' : '';
    if (!this.receiver.name) {
      return;
    } else {
      this.receiverService.addReceiver(this.receiver).subscribe(res => {
        this.getReceivers();
        this.modalRef.hide();
      }, error => {
         this.errorMsg.name = error.error['response'];
       });
    }
  }

  ngOnInit() {
    this.getReceivers();
  }

  onAlter() {
    !this.receiver.name ? this.errorMsg.name = 'Naam vereist' : '';
    if (!this.receiver.name) {
      return;
    } else {
      this.receiverService.updateReceiver(this.receiver).subscribe(res => {
        this.getReceivers();
        this.modalRef.hide();
      }, error => {
        this.errorMsg.name = error.error['response'];
      });
    }
  }

  deleteRec(rec: Receiver) {
    this.receiverService.deleteReceiver(rec).subscribe(res => {
      this.getReceivers();
       this.modalRef.hide();
    }, error => {
      this.errorMsg.name = error.error['response'];
    });
  }
}

class Receiver {
  id: string;
  name: string;
}

class ErrorMsg {
  name: string;
}
