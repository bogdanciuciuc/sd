import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private baseUrl: string = "https://localhost:49162/api/Auth/"
  constructor(private http: HttpClient) { }

  signUp(client: any) {
    return this.http.post<any>(`${this.baseUrl}signup`, client);
  }

  logIn(client: any) {
    return this.http.post<any>(`${this.baseUrl}login`, client);
  }
}
