import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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
    return this.http.get<Receiver[]>('http://localhost:3000/receiver/');
  }

  getReceiver() {

  }

  addReceiver(receiver: Receiver): Observable<Receiver> {
    return this.http.post<Receiver>('http://localhost:3000/receiver/', receiver);
  }

  updateReceiver(receiver: Receiver): Observable<Receiver> {
    return this.http.patch<Receiver>(
      'http://localhost:3000/receiver/' + receiver.id,
      receiver
    );
  }
}
