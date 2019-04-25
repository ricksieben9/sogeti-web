import {Component, OnInit, TemplateRef} from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {LogService} from "../../service/log.service";
import {Role} from "../../_models/role";
import {User} from "../../_models/user";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  list: any;
  log: Log = new Log();
  currentUser: User;
  // errorMsg: ErrorMsg = new  ErrorMsg();
  modalRef: BsModalRef;

  constructor(private logService: LogService) { }

  getLogs() {
    const logObservable = this.logService.getAllLogs();
    logObservable.subscribe((logData: any[]) => {
      this.list = logData;
    });
  }

  checkIntakeMoments() {
    const logObservable = this.logService.getAllLogs();
  }

  ngOnInit() {this.getLogs();}

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }
}



class Log{
  id: string;
  message: string;
  datetime : string;
  category : string;
  user_id : string
}
