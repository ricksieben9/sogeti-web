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

  getIntakeMomentOfReceiver(receiver: number) {
    return this.http.get<IntakeMoment[]>(`${environment.url}` + '/receiver/' + receiver + '/intakeMoments');
  }

  addIntakeMoment(intakeMoment: IntakeMoment): Observable<IntakeMoment> {
    return this.http.post<IntakeMoment>(`${environment.url}` + '/intakeMoment/', intakeMoment);
  }

  updateIntakeMoment(intakeMoment: IntakeMoment): Observable<IntakeMoment> {
    return this.http.patch<IntakeMoment>(
      `${environment.url}` + '/intakeMoment/' + intakeMoment.id,
      intakeMoment
    );
  }

  deleteIntakeMoment(intakeMoment: IntakeMoment) {
    console.log(intakeMoment.id);
    return this.http.delete(`${environment.url}` + '/intakeMoment/' + intakeMoment.id);
  }
}
