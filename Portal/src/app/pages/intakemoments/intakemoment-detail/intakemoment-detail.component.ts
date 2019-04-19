import {Component, OnInit, TemplateRef} from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {IntakeMomentService} from '../../../service/intake-moment.service';
import {ReceiverService} from '../../../service/receiver.service';
import {Receiver} from '../../../_models/receiver';
import {IntakeMoment} from '../../../_models/intakeMoment';

@Component({
  selector: 'app-intakemoment-detail',
  templateUrl: './intakemoment-detail.component.html',
  styleUrls: ['./intakemoment-detail.component.scss']
})
export class IntakemomentDetailComponent implements OnInit {

  list: any;

  constructor(private intakeMomentService: IntakeMomentService, private receiver: ReceiverService) { }

  ngOnInit() {
    //this.getIntakeMomentsOfReceiver();
  }

  getIntakeMomentsOfReceiver(rec: Receiver){
    const receiverObservable = this.intakeMomentService.getIntakeMomentOfReceiver(rec);
    receiverObservable.subscribe((userData: any[]) => {
      console.log(userData);
      this.list = userData;
    });
  }

}


