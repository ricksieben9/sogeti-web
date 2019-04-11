import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface Receiver {
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReceiverService {

  constructor(private http: HttpClient) { }

  getAllReceivers(): Observable<Receiver[]> {
    return this.http.get<Receiver[]>('http://localhost:4001/api/v1/receivers/');
  }

  getReceiver() {

  }

  addReceiver() {

  }

  updateReceiver() {

  }
}
