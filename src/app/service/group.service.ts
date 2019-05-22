import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Group } from '../_models/group';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  getAllGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(`${environment.url}` + '/group/');
  }

  getGroup(id: string) {
    return this.http.get<Group[]>(`${environment.url}` + '/group/' + id);
  }

  getGroupReceivers(id: string) {
    return this.http.get<Group[]>(`${environment.url}` + '/group/' + id + '/receivers')
  }

  addGroup(group: Group): Observable<Group> {
    return this.http.post<Group>(`${environment.url}` + '/group', group);
  }

  updateGroup(group: Group): Observable<Group> {
    return this.http.patch<Group>(
      `${environment.url}` + '/group/' + group.id,
      group
    );
  }

  deleteGroup(group: Group) {
    return this.http.delete(`${environment.url}` + '/group/' + group.id);
  }

}
