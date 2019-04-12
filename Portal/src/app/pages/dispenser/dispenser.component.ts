import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsersService } from 'src/app/service/users.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dispenser',
  templateUrl: './dispenser.component.html',
  styleUrls: ['./dispenser.component.scss']
})
export class DispenserComponent implements OnInit {

  user: User = new User();
  errorMsg : ErrorMsg = new  ErrorMsg();

  constructor(private usersService: UsersService, private modalService: BsModalService) { }

  ngOnInit() {
    this.getDispensers();
  }

  roleOptions = [ "Hoofdtoediener", "Toediener"];
  dispensers;
  modalRef: BsModalRef;
  newUser = new User();

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
    this.errorMsg.name = this.errorMsg.email = this.errorMsg.roles_role = '';
    !this.user.name ? this.errorMsg.name = 'Naam vereist': '';
    !this.user.email ? this.errorMsg.email = 'E-mail vereist': '';
    !this.user.roles_role ? this.errorMsg.roles_role = 'Rol vereist': '';
    console.log("newUser:" + this.newUser.name);
    return;
  }
}
 
class User {
name: string;
email: string;
roles_role: string;
} 

class ErrorMsg {
  name: string;
  email: string;
  roles_role: string;
}
 

