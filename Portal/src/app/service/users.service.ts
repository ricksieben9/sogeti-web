import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

import {User} from '../_models/user';

@Injectable({providedIn: 'root'})
export class UsersService {
  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<User[]>(`${environment.url}/user`);
  }

  getById(id: number) {
    return this.http.get<User>(`${environment.url}/users/${id}`);
  }
}
