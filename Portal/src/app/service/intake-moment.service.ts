import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface IntakeMoment {
  id: string;
  intake_start_time: Date;
  intake_end_time: Date;
  receiver_id: string;
  remark: string;
  priority_number: string;
  dispenser: string;
}

@Injectable({
  providedIn: 'root'
})
export class IntakeMomentService {

  constructor(private http: HttpClient) { }

  getAllIntakeMoments(): Observable<IntakeMoment[]> {
    return this.http.get<IntakeMoment[]>(`${environment.url}` + '/intakeMoment/');
  }

  getIntakeMoment() {

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

  deleteIntakeMoment(rec: IntakeMoment) {
    console.log(rec.id);
    return this.http.delete(`${environment.url}` + '/intakeMoment/' + rec.id);
  }
}
