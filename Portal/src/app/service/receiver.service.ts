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

  getAllReceivers(): Observable<Receiver[]> {
    return this.http.get<Receiver[]>(`${environment.url}` + '/receiver/');
  }

  getReceiver() {

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
    console.log(rec.id);
    return this.http.delete(`${environment.url}` + '/receiver/' + rec.id);
  }
}
