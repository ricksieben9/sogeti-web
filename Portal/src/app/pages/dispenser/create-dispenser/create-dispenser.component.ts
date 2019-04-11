import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-dispenser',
  templateUrl: './create-dispenser.component.html',
  styleUrls: ['./create-dispenser.component.scss']
})
export class CreateDispenserComponent implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
  }

  users = [
    {
      "id": 1,
      "name": "Arjun Autar",
      "email": "asautar@avans.nl"
    },
    {
      "id": 2,
      "name": "Arjun Autar",
      "email": "asautar@avans.nl"
    },
    {
      "id": 3,
      "name": "Kenny Tu",
      "email": "ktu@avans.nl"
    },
    {
      "id": 4,
      "name": "Kenny Tu",
      "email": "ktu@avans.nl"
    }
  ];

  dispenserOptions = ["hoofdtoediener", "toediener"];
  private heroesUrl = 'https://localhost:8080/dispensers/create';  // URL to web api

  back() {
    this.location.back();
  }
}
