import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Time} from '@angular/common';

interface Priority {
  number: Number;
  time_to_notificate: Time;
  old_number: Number;
}

@Injectable({
  providedIn: 'root'
})
export class PriorityService {

  constructor(private http: HttpClient) { }

  getAllPriorities(): Observable<Priority[]> {
    return this.http.get<Priority[]>(`${environment.url}` + '/priority/');
  }
}
