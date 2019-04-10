import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dispenser',
  templateUrl: './dispenser.component.html',
  styleUrls: ['./dispenser.component.scss']
})
export class DispenserComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  dispensers = [ 
    {
    "id" : 1,
    "name" : "Arjun Autar",
    "email" : "asautar@avans.nl",
    "role" : "hoofdverzorger"
  },
  {
    "id" : 2,
    "name" : "Arjun Autar",
    "email" : "asautar@avans.nl",
    "role" : "hoofdverzorger"
  },
  {
    "id" : 3,
    "name" : "Kenny Tu",
    "email" : "ktu@avans.nl",
    "role" : "hoofdverzorger"
  },
  {
    "id" : 4,
    "name" : "Kenny Tu",
    "email" : "ktu@avans.nl",
    "role" : "hoofdverzorger"
  }
]

}
