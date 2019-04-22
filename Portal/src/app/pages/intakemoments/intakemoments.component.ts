import { Component, OnInit, TemplateRef } from '@angular/core';
import { ReceiverService } from '../../service/receiver.service';

@Component({
  selector: 'app-intakemoments',
  templateUrl: './intakemoments.component.html',
  styleUrls: ['./intakemoments.component.scss']
})
export class IntakemomentsComponent implements OnInit {

  receivers: any;

  constructor(private receiverService: ReceiverService) { }

  ngOnInit() {
    this.getReceivers();
  }  

  //get receivers, from there you go to their intakemoments-planning
  getReceivers() {
    const receiverObservable = this.receiverService.getAllReceivers();
    receiverObservable.subscribe((userData: any[]) => {
      console.log(userData);
      this.receivers = userData;
    });
  }  
}