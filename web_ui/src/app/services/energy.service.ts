import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Timestamp } from '../models/timestamp.model';

@Injectable({
  providedIn: 'root'
})
export class EnergyService {

  private baseApi: string = 'http://localhost:7203/api/timestamps';

  constructor(private http: HttpClient){}

  consume(): Observable<Timestamp> {
    return this.http.get<Timestamp>(this.baseApi);
  }
}
