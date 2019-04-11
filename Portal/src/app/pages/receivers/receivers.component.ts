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
  // Receiver Receiver = new Receiver();
  modalRef: BsModalRef;

  constructor(private receiverService: ReceiverService, private modalService: BsModalService) { }

  openModalAdd(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  getReceivers() {
    const receiverObservable = this.receiverService.getAllReceivers();
    receiverObservable.subscribe((userData: any[]) => {
      console.log(userData);
      this.list = userData;
    });
  }

  ngOnInit() {
    this.getReceivers();
  }

  // class Receiver {
  //   id: string;
  //   name: string;
  // }
}
