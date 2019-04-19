import { Component, OnInit, TemplateRef  } from '@angular/core';
import { Router } from "@angular/router";
import { UsersService } from '../../service/users.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-icons',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  list: any;
  user: User = new User();
  errorMsg : ErrorMsg = new  ErrorMsg();
  modalRef: BsModalRef;

  public copy: string;
  constructor(private usersService: UsersService,  private router: Router, private modalService: BsModalService) {

  }
  openModalAdd(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit() {

  }

  onSave() {
    this.errorMsg.name = this.errorMsg.email = '';
    !this.user.name ? this.errorMsg.name = 'Naam vereist' : '';
    !this.user.email ? this.errorMsg.email = 'E-mail vereist' : '';
    if (!this.user.name || !this.user.email) {
      return;
    }
  }


}
class User {
  name: string;
  email: string;
}

class ErrorMsg {
  name: string;
  email: string;
}
