import {Component, OnInit} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import {LogService} from '../../service/log.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  list: any;
  log: Log = new Log();
  modalRef: BsModalRef;

  constructor(private logService: LogService) { }

  getLogs() {
    const logObservable = this.logService.getAllLogs();
    logObservable.subscribe((logData: any[]) => {
      this.list = logData;
    });
  }

  ngOnInit() {this.getLogs(); }

}



class Log {
  id: string;
  message: string;
  category: string;
  user_id: string;
}
