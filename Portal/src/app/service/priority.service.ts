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

  addPriority(priority: Priority): Observable<Priority> {
    return this.http.post<Priority>(`${environment.url}` + '/priority/', priority);
  }

  updatePriority(priority: Priority): Observable<Priority> {
    return this.http.patch<Priority>(
      `${environment.url}` + '/priority/' + priority.old_number,
      priority
    );
  }

  deletePriority(rec: Priority) {
    return this.http.delete(`${environment.url}` + '/priority/' + rec.number);
  }
}
