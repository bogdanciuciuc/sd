import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private baseUrl: string = "http://localhost:7203/api/Auth/"
  constructor(private http: HttpClient) { }

  public signUp(client: Client): Observable<any> {
    client.id = '00000000-0000-0000-0000-000000000000';
    return this.http.post<any>(`${this.baseUrl}signup`, client);
  }

  public logIn(client: Client): Observable<string> {
    client.id = '00000000-0000-0000-0000-000000000000';
    return this.http.post(`${this.baseUrl}login`, client, { responseType: 'text' });
  }

  /*signUp(client: any) {
    return this.http.post<any>(`${this.baseUrl}signup`, client);
  }

  logIn(client: any) {
    return this.http.post<any>(`${this.baseUrl}login`, client);
  }*/
}
