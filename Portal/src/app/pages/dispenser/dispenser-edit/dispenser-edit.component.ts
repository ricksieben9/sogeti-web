import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dispenser-edit',
  templateUrl: './dispenser-edit.component.html',
  styleUrls: ['./dispenser-edit.component.scss']
})
export class DispenserEditComponent implements OnInit {

  form: FormGroup;

  constructor(private route: ActivatedRoute, private location: Location) { 
    this.form = new FormGroup({
      editRole: new FormControl(null)
    });
  }

  ngOnInit() {
    this.selectedDispenserId = +this.route.snapshot.paramMap.get('id');
    console.log(this.selectedDispenserId);
  }

  dispenserOptions = [ "", "hoofdtoediener", "toediener"];
  selectedDispenserId;
  selectedDispenser = {
    "id" : 1,
    "name" : "Arjun Autar",
    "email" : "asautar@avans.nl",
    "role" : "hoofdtoediener"
  }; 

  selectedRole;

  editRole() {
    console.log("edit role");
    this.selectedRole = this.form.get('editRole').value;
    this.back();
  }

  back() {
    this.location.back();
  }
}
