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
    return this.http.get<IntakeMoment[]>(`${environment.url}` + '/receiver/' + receiver + '/intakeMoments');
  }

  addIntakeMoment(intakeMoment: IntakeMoment, receiverId: string): Observable<IntakeMoment> {
    return this.http.post<IntakeMoment>(`${environment.url}` + '/receiver/' + receiverId + '/intakeMoments', intakeMoment);
  }

  updateIntakeMoment(intakeMoment: IntakeMoment, receiverId: string): Observable<IntakeMoment> {
    return this.http.patch<IntakeMoment>(
      `${environment.url}` + '/receiver/' + receiverId + '/intakeMoments/' + intakeMoment.id,
      intakeMoment
    );
  }

  deleteIntakeMoment(receiver: string, intakeMoment: IntakeMoment) {
    return this.http.delete(`${environment.url}` + '/receiver/' + receiver + '/intakeMoments/' + intakeMoment.id);
  }
}
