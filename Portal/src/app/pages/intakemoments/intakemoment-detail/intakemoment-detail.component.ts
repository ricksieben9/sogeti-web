import {Component, OnInit, TemplateRef} from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {IntakeMomentService} from '../../../service/intake-moment.service';

@Component({
  selector: 'app-intakemoment-detail',
  templateUrl: './intakemoment-detail.component.html',
  styleUrls: ['./intakemoment-detail.component.scss']
})
export class IntakemomentDetailComponent implements OnInit {

  list: any;

  constructor(private intakeMomentService: IntakeMomentService) { }

  ngOnInit() {
    this.getIntakeMomentsOfReceiver();
  }

  getIntakeMomentsOfReceiver(){
    const receiverObservable = this.intakeMomentService.getAllIntakeMoments();
    receiverObservable.subscribe((userData: any[]) => {
      console.log(userData);
      this.list = userData;
    });
  }

}
