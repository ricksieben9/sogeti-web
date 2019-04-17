import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsersService } from 'src/app/service/users.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
//import { userInfo } from 'os';

@Component({
  selector: 'app-dispenser',
  templateUrl: './dispenser.component.html',
  styleUrls: ['./dispenser.component.scss']
})
export class DispenserComponent implements OnInit {

  constructor(private usersService: UsersService, private modalService: BsModalService, private route: ActivatedRoute, private router: Router, private location: Location) { }

  ngOnInit() {
    this.getDispensers();
    this.newUser = new User();
    this.form = new FormGroup({
      editRole: new FormControl(null)
    });
  }

  form: FormGroup;
  user: User = new User();
  errorMsg: ErrorMsg = new ErrorMsg();
  roleOptions = ["Hoofdtoediener", "Toediener"];
  dispensers;
  modalRef: BsModalRef;
  newUser;
  selectedDispenserId;
  selectedDispenser; 
  selectedRole;

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

  openModalEditDispenser(template: TemplateRef<any>, u: User) {
    this.errorMsg = new ErrorMsg();
    this.user.id = u.id;
    this.user.name = u.name;    
    this.user.roles_role = u.roles_role;
    this.modalRef = this.modalService.show(template);
    console.log(u.roles_role);
  }

  openModalDelete(template: TemplateRef<any>, u: User) {
    this.errorMsg = new ErrorMsg();
    this.user.id = u.id;
    this.user.name = u.name;
    this.modalRef = this.modalService.show(template);
  }

  SaveDispenser() {
    console.log(this.newUser.name);
    this.errorMsg.name = this.errorMsg.email = '';
    !this.newUser.name ? this.errorMsg.name = 'Naam vereist' : '';
    !this.newUser.email ? this.errorMsg.email = 'E-mail vereist' : '';
    if (!this.newUser.name || !this.newUser.email) {
      return;
    }

    var element = <HTMLInputElement> document.getElementById("isMainDispenser");
    var isChecked = element.checked;
    if (isChecked) {
      this.newUser.role = "Hoofdtoediener";
    } else {
      this.newUser.role = "Toediener";
    }
    console.log("role = " + this.newUser.role);
    this.usersService.insertUser(this.newUser).subscribe(res => {
    console.log(res);
    this.getDispensers();
    this.modalRef.hide();
    this.newUser = new User();
    }, error => {
      console.log(error);
    });
    
  }

  editRole() {
    console.log("edit role");

    this.selectedRole = this.form.get('editRole').value;

    !this.selectedRole ? this.errorMsg.roles_role = 'Rol vereist' : '';
    if (!this.selectedRole) {
      return;
    } else {
      this.user.roles_role = this.selectedRole;
      this.usersService.updateUser(this.user).subscribe(res => {
        this.getDispensers();
        this.modalRef.hide();
        console.log("chosen role: " + res);
      }, error => {
        //console.log(error);
        this.errorMsg.roles_role = error.error['response'];
      });
    }
  
  }

  deleteDispenser(user: User) {
    console.log(user);
    this.usersService.deleteUser(user).subscribe(res => {
      this.getDispensers();
      this.modalRef.hide();
      console.log(res);
    }, error => {
      console.log(error);
      this.errorMsg.name = error.error['response'];
    });
  }

  back(){
    this.router.navigate(['/dispensers']);
  }
}

class User {
  name: string;
  email: string;
  roles_role: string;
  id: string;
  password: string;

  constructor() {
    // default password
    this.password = "Ab12345";
  }
}

class ErrorMsg {
  name: string;
  email: string;
  roles_role: string;
}
 

