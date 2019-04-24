import {Component, OnInit, TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
import {UsersService} from '../../service/users.service';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import {AuthenticationService} from '../../service/authentication.service';

@Component({
  selector: 'app-icons',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  list: any;
  user: User = new User();
  errorMsg: ErrorMsg = new ErrorMsg();
  modalRef: BsModalRef;
  currentUser: User;

  public copy: string;

  constructor(private usersService: UsersService, private router: Router, private modalService: BsModalService,
              private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

  }

  openModalAdd(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  getUsers() {
    const userObservable = this.usersService.getAll();
    userObservable.subscribe((userData: any[]) => {
      this.list = userData;
    });
  }


  ngOnInit() {
    this.getUsers();
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
