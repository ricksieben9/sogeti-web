import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-dispenser-edit',
  templateUrl: './dispenser-edit.component.html',
  styleUrls: ['./dispenser-edit.component.scss']
})
export class DispenserEditComponent implements OnInit {

  form: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private location: Location, private usersService: UsersService) { 
    this.form = new FormGroup({
      editRole: new FormControl(null)
    });
  }

  dispenserOptions = [ "", "Hoofdtoediener", "Toediener"];
  selectedDispenserId;
  selectedDispenser; 
  selectedRole;

  ngOnInit() {
    this.selectedDispenserId = +this.route.snapshot.paramMap.get('id');
    console.log(this.selectedDispenserId);
    this.setSelectedUser();
    this.selectedRole = this.selectedDispenser.roles_role;
  }

  editRole() {
    console.log("edit role");
    this.selectedRole = this.form.get('editRole').value;
    console.log(this.selectedRole);

    let user = new User();
    user.id = this.selectedDispenser.id;
    //user.name = this.selectedDispenser.name;
    user.name = this.selectedDispenser.name;
    user.email = this.selectedDispenser.email;
    user.role = this.selectedRole;
    this.usersService.updateUser(user);
    this.usersService.updateUser(user).subscribe(res => {
      console.log(res);
      this.back();
    }, error => {
      console.log(error);
    });
  
  }

  back() {
    this.router.navigate(['/dispensers']);
  }

  setSelectedUser() {
    const userObservable = this.usersService.getUserById(this.selectedDispenserId);
    userObservable.subscribe((userData: any[]) => {
      console.log(userData);
      this.selectedDispenser = userData[0];
    });
  }
}

class User {
  id: string;
  name: string;
  email: string;
  role: string;
  } 