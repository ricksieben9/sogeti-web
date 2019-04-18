import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface Medicine {
  id: string;
  name: string;
  description: string;
  unit: string;
}

@Injectable({
  providedIn: 'root'
})

export class MedicinenService {

  constructor(private http: HttpClient) { }

  getAllMedicine(): Observable<Medicine[]> {
    return this.http.get<Medicine[]>('http://localhost:3000/medicine/');
  }

  addMedicine(med: Medicine): Observable<Medicine> {
    console.log(med);
    return this.http.post<Medicine>('http://localhost:3000/medicine/', med);
  }

  updateMedicine(med: Medicine): Observable<Medicine> {
    return this.http.patch<Medicine>(
      'http://localhost:3000/medicine/' + med.id,
      med
    );
  }
  deleteMedicine(med: Medicine) {
    return this.http.delete('http://localhost:3000/medicine/' + med.id);
  }
}
