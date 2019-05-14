import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface Receiver {
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReceiverService {

  constructor(private http: HttpClient) { }

  // getIntakeMomentOfReceiver(receiver: string) {
  //   return this.http.get<IntakeMoment[]>(`${environment.url}` + '/receiver/' + receiver + '/intakeMoments');
  // }

  getAllReceivers(): Observable<Receiver[]> {
    return this.http.get<Receiver[]>(`${environment.url}` + '/receiver/');
  }

  getReceiver(id: number): Observable<Receiver[]> {
    return this.http.get<Receiver[]>(`${environment.url}` + '/receiver/' + id);
  }

  addReceiver(receiver: Receiver): Observable<Receiver> {
    return this.http.post<Receiver>(`${environment.url}` + '/receiver/', receiver);
  }

  updateReceiver(receiver: Receiver): Observable<Receiver> {
    return this.http.patch<Receiver>(
      `${environment.url}` + '/receiver/' + receiver.id,
      receiver
    );
  }

  deleteReceiver(rec: Receiver) {
    return this.http.delete(`${environment.url}` + '/receiver/' + rec.id);
  }
}
