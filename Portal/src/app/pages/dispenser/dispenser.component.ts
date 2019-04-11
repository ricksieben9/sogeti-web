import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsersService } from 'src/app/service/users.service';


@Component({
  selector: 'app-dispenser',
  templateUrl: './dispenser.component.html',
  styleUrls: ['./dispenser.component.scss']
})
export class DispenserComponent implements OnInit {

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.getDispensers();
  }

  dispensers;

  getDispensers() {
   let roles = { roleList: ["Dispenser", "MainDispenser"] };
    // this.dispensers = this.usersService.getUsersByRoles(roles)
    // console.log(this.dispensers);

    const userObservable = this.usersService.getUsersByRoles(roles);
    userObservable.subscribe((userData: any[]) => {
      console.log(userData);
      this.dispensers = userData;
    });
  }

}
 
class User {
name: string;
email: string;
roles_role: string;
} 
 

