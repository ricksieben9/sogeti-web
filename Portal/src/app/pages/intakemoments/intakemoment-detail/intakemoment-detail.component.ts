import {Component, OnInit, TemplateRef} from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {IntakeMomentService} from '../../../service/intake-moment.service';
import {ReceiverService} from '../../../service/receiver.service';
import {Receiver} from '../../../_models/receiver';
import {IntakeMoment} from '../../../_models/intakeMoment';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-intakemoment-detail',
  templateUrl: './intakemoment-detail.component.html',
  styleUrls: ['./intakemoment-detail.component.scss']
})
export class IntakemomentDetailComponent implements OnInit {

  intakemoments: any;

  constructor(private intakeMomentService: IntakeMomentService,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit() {
    this.getIntakeMomentsOfReceiver();
  }

  getIntakeMomentsOfReceiver() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.intakeMomentService.getIntakeMomentOfReceiver(id)
      .subscribe(intakemoments => {console.log(intakemoments);
                  this.intakemoments = intakemoments; });
  }

}


