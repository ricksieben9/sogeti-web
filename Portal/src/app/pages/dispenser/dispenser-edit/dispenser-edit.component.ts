import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dispenser-edit',
  templateUrl: './dispenser-edit.component.html',
  styleUrls: ['./dispenser-edit.component.scss']
})
export class DispenserEditComponent implements OnInit {

  constructor(private route: ActivatedRoute, private location: Location) { }

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
    
    console.log("edit role: " + this.selectedRole);
    console.log("edit role: " + this.selectedDispenser["role"]);
  }
}
