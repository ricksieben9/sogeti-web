import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsersService } from 'src/app/service/users.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dispenser',
  templateUrl: './dispenser.component.html',
  styleUrls: ['./dispenser.component.scss']
})
export class DispenserComponent implements OnInit {

  users: User[];
  user: User = new User();
  errorMsg : ErrorMsg = new  ErrorMsg();

  constructor(private usersService: UsersService, private modalService: BsModalService, private router: Router) { }

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
    this.errorMsg.name = this.errorMsg.email = '';
    !this.user.name ? this.errorMsg.name = 'Naam vereist': '';
    !this.user.email ? this.errorMsg.email = 'E-mail vereist': '';
    console.log("newUser:" + this.newUser.name);
    return;
  }

  // delete(user: User): void {
  //   console.log("Delete component button " + user.id);

  //   console.log(user);

  //   this.usersService.deleteUser(user.id).subscribe(res => {
  //     console.log(res);
  //     this.back();
  //   }, error => {
  //     console.log(error);
  //   });
  // }

  delete(user: User) {
    console.log(user);
    this.usersService.deleteUser(user).subscribe(res => {
      this.getDispensers();
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
 
class User {
  name: string;
  id: string;
  roles_role: string;
  email: string;
} 

class ErrorMsg {
  name: string;
  email: string;
  roles_role: string;
}
 

