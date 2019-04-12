import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsersService } from 'src/app/service/users.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-dispenser',
  templateUrl: './dispenser.component.html',
  styleUrls: ['./dispenser.component.scss']
})
export class DispenserComponent implements OnInit {

  constructor(private usersService: UsersService, private modalService: BsModalService, private route: ActivatedRoute, private router: Router, private location: Location) { }

  ngOnInit() {
    this.getDispensers();
    this.newUser = new User()
    this.newUser.role = "Toediener";
  }

  errorMsg: ErrorMsg = new ErrorMsg();
  roleOptions = ["Hoofdtoediener", "Toediener"];
  dispensers;
  modalRef: BsModalRef;
  newUser;
  mainDispenser = false;

  getDispensers() {
    let roles = { roleList: ["Toediener", "Hoofdtoediener"] };
    // this.dispensers = this.usersService.getUsersByRoles(roles)
    // console.log(this.dispensers);

    const userObservable = this.usersService.getUsersByRoles(roles);
    userObservable.subscribe((userData: any[]) => {
      console.log(userData);
      this.dispensers = userData;
    });
  }

  openModalAdd(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  SaveDispenser() {
    console.log(this.newUser.name);
    console.log(this.mainDispenser);
    this.errorMsg.name = this.errorMsg.email = '';
    !this.newUser.name ? this.errorMsg.name = 'Naam vereist' : '';
    !this.newUser.email ? this.errorMsg.email = 'E-mail vereist' : '';
    if (!this.newUser.name || !this.newUser.email) {
      return;
    }

    this.usersService.tempInsertUser(this.newUser).subscribe(res => {
      console.log(res);
      this.getDispensers();
    this.modalRef.hide();
    }, error => {
      console.log(error);
    });
    
  }
}

class User {
  name: string;
  email: string;
  role: string;
  password: string;

  constructor() {
    this.password = "Ab12345";
  }
}

class ErrorMsg {
  name: string;
  email: string;
}


