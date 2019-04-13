import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders} from '@angular/common/http'

interface User {
  name: string,
  id: string,
  role: string,
  email: string
}

@Injectable()
export class UsersService {
  constructor(private http: HttpClient) {}

  users: User[];

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:4001/api/v1/users/')
  }

  getUsersByRoles(roles): Observable<User[]> {
    let url = "http://localhost:3000/user/roles/?roles=" + JSON.stringify(roles);
    return this.http.get<User[]>(url);
  }

  getUserById(id: any): Observable<User[]> {
    console.log("id = " + id)
    return this.http.get<User[]>("http://localhost:3000/user/" + id);
  }

  getUser(name: string): Observable<User> {
    return this.http.get<User>('http://localhost:4001/api/v1/users/' + name)
  }

  insertUser(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:3000/user', user)
  }

  updateUser(user: User): Observable<User> {
    //console.log("user = " + user.roles_role)
    return this.http.patch<User>(
      'http://localhost:3000/user/' + user.id,
      user
    );
  }

  deleteUser(user: User) {
    console.log(user.id);
    return this.http.delete('http://localhost:3000/user/' + user.id);
  }
}
