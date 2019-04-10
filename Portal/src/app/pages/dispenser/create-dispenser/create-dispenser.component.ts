import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-dispenser',
  templateUrl: './create-dispenser.component.html',
  styleUrls: ['./create-dispenser.component.scss']
})
export class CreateDispenserComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  users = [ 
    {
    "id" : 1,
    "name" : "Arjun Autar",
    "email" : "asautar@avans.nl"
  },
  {
    "id" : 2,
    "name" : "Arjun Autar",
    "email" : "asautar@avans.nl"
  },
  {
    "id" : 3,
    "name" : "Kenny Tu",
    "email" : "ktu@avans.nl"
  },
  {
    "id" : 4,
    "name" : "Kenny Tu",
    "email" : "ktu@avans.nl"
  }
];

dispenserOptions = [ "hoofdtoediener", "toediener"];

}
