import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

interface Log {
  id: string;
  message: string;
  datetime: string;
  category: string;
  user_id: string;
}

@Injectable({
  providedIn: 'root'
})

export class LogService {

  constructor(private http: HttpClient) { }

  getAllLogs(): Observable<Log[]> {
    return this.http.get<Log[]>(`${environment.url}` + '/log/');
  }
}
