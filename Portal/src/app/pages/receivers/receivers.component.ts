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
    this.modalRef = this.modalService.show(template);
  }

  getReceivers() {
    const receiverObservable = this.receiverService.getAllReceivers();
    receiverObservable.subscribe((userData: any[]) => {
      console.log(userData);
      this.list = userData;
    });
  }

  onSave() {
    !this.receiver.name ? this.errorMsg.name = 'Naam vereist' : '';
    if (!this.receiver.name) {
      return;
    } else {
      console.log('else');
      this.receiverService.addReceiver(this.receiver).subscribe(res => {
        this.getReceivers();
        this.modalRef.hide();
        console.log(res);
      }, error => {
         console.log(error);
       });
    }
  }

  ngOnInit() {
    this.getReceivers();
  }
}

class Receiver {
  name: string;
}

class ErrorMsg {
  name: string;
}
