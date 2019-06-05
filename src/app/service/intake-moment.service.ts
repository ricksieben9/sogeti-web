import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IntakeMoment } from '../_models/intakeMoment';

@Injectable({
  providedIn: 'root'
})
export class IntakeMomentService {

  constructor(private http: HttpClient) { }

  getIntakeMomentOfReceiver(receiver: string) {
    return this.http.get<IntakeMoment[]>(`${environment.url}` + '/intakeMoment/receiver/' + receiver);
  }

  getIncompleteIntakeMoments() {
    return this.http.get<IntakeMoment[]>(`${environment.url}` + '/intakeMoment/incomplete');
  }

  getIntakeMoment(id: string) {
    return this.http.get<IntakeMoment[]>(`${environment.url}` + '/intakeMoment/' + id);
  }

  addIntakeMoment(intakeMoment: IntakeMoment): Observable<IntakeMoment> {
    return this.http.post<IntakeMoment>(`${environment.url}` + '/intakeMoment', intakeMoment);
  }

  updateIntakeMoment(intakeMoment: IntakeMoment): Observable<IntakeMoment> {
    return this.http.patch<IntakeMoment>(
      `${environment.url}` + '/intakeMoment/' + intakeMoment.id,
      intakeMoment
    );
  }

  deleteIntakeMoment(intakeMoment: IntakeMoment) {
    return this.http.delete(`${environment.url}` + '/intakeMoment/' + intakeMoment.id);
  }
}
