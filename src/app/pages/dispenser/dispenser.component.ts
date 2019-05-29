import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/service/users.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl } from '@angular/forms';
import { ErrorMsg } from '../../_models/errorMsg';
import * as randomstring from 'randomstring-ng';

@Component({
  selector: 'app-dispenser',
  templateUrl: './dispenser.component.html',
  styleUrls: ['./dispenser.component.scss']
})
export class DispenserComponent implements OnInit {

  constructor(private usersService: UsersService, private modalService: BsModalService, private route: ActivatedRoute, private router: Router) { }

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
  roleOptions: any = ["Hoofdtoediener", "Toediener"];
  dispensers: any;
  modalRef: BsModalRef;
  newUser: User;
  selectedRole: string;

  getDispensers() {
    let roles = { roleList: ["Toediener", "Hoofdtoediener"] };

    const userObservable = this.usersService.getUsersByRoles(roles);
    userObservable.subscribe((userData: any[]) => {
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
  }

  openModalDelete(template: TemplateRef<any>, u: User) {
    this.errorMsg = new ErrorMsg();
    this.user.id = u.id;
    this.user.name = u.name;
    this.modalRef = this.modalService.show(template);
  }

  SaveDispenser() {
    this.errorMsg.name = this.errorMsg.email = '';
    !this.newUser.name ? this.errorMsg.name = 'Naam vereist' : '';
    !this.newUser.email ? this.errorMsg.email = 'E-mail vereist' : '';
    if (!this.newUser.name || !this.newUser.email) {
      return;
    }

    var element = <HTMLInputElement> document.getElementById("isMainDispenser");
    var isChecked = element.checked;
    if (isChecked) {
      this.newUser.roles_role = "Hoofdtoediener";
    } else {
      this.newUser.roles_role = "Toediener";
    }
    this.usersService.insertUser(this.newUser).subscribe(res => {
    this.getDispensers();
    this.modalRef.hide();
    this.newUser = new User();
    }, error => {
      if (error.error.type == 'username') {
        this.errorMsg.name = error.error.response;
      }
        else
      {
        this.errorMsg.email = error.error.response;
      }
    });

  }

  editRole() {
    !this.selectedRole ? this.errorMsg.roles_role = 'Rol vereist' : '';
    if (!this.selectedRole) {
      return;
    } else {
      this.user.roles_role = this.selectedRole;
      this.usersService.updateUser(this.user).subscribe(res => {
        this.getDispensers();
        this.modalRef.hide();
      }, error => {
        this.errorMsg.roles_role = error.error['response'];
      });
    }
  
  }

  deleteDispenser(user: User) {
    this.usersService.deleteUser(user).subscribe(res => {
      this.getDispensers();
      this.modalRef.hide();
    }, error => {
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
     this.password = randomstring.generate(8);
  }
}


