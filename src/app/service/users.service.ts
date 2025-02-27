import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';

interface User {
  name: string;
  id: string;
  roles_role: string;
  email: string;
}


@Injectable({providedIn: 'root'})
export class UsersService {
  constructor(private http: HttpClient) {}

  users: User[];

  getUsersByRoles(roles): Observable<User[]> {
    const url = `${environment.url}/user/roles/?roles=` + JSON.stringify(roles);
    return this.http.get<User[]>(url);
  }

  insertUser(user: User): Observable<User> {
    return this.http.post<User>(`${environment.url}/user/`, user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.patch<User>(
      `${environment.url}/user/` + user.id,
      user
    );
  }

  deleteUser(user: User) {
    return this.http.delete(`${environment.url}/user/` + user.id);
  }

}
