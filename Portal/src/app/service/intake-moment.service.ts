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

interface Receiver {
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class IntakeMomentService {

  constructor(private http: HttpClient) { }

  getIntakeMomentOfReceiver(receiver: number) {
    return this.http.get<IntakeMoment[]>(`${environment.url}` + '/receiver/' + receiver + '/intakeMoments');
  }

  getIncompleteIntakeMoments() {
    return this.http.get<IntakeMoment[]>(`${environment.url}` + '/receiver/97' + '/intakeMoments/incomplete');
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
