import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../environments/environment";

interface Medicine {
  id: string;
  name: string;
  description: string;
  unit: string;
}

@Injectable({
  providedIn: 'root'
})

export class MedicineService {

  constructor(private http: HttpClient) { }

  getAllMedicine(): Observable<Medicine[]> {
    return this.http.get<Medicine[]>(`${environment.url}` + '/medicine/');
  }

  addMedicine(med: Medicine): Observable<Medicine> {
    return this.http.post<Medicine>(`${environment.url}` + '/medicine/', med);
  }

  updateMedicine(med: Medicine): Observable<Medicine> {
    return this.http.patch<Medicine>(
      `${environment.url}` + '/medicine/' + med.id,
      med
    );
  }
  deleteMedicine(med: Medicine) {
    return this.http.delete(`${environment.url}` + '/medicine/' + med.id);
  }
}
