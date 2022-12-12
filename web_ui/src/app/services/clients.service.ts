import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpResponse } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Client } from '../models/client.model';
import { Observable } from 'rxjs';
import { Device } from '../models/device.model';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private baseApi: string = 'https://localhost:7203';

  constructor(private http: HttpClient) { }

  getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.baseApi + '/api/clients')
  }

  addClient(addClientRequest: Client): Observable<Client> {
    addClientRequest.id = '00000000-0000-0000-0000-000000000000';
    return this.http.post<Client>(this.baseApi + '/api/clients', addClientRequest);
  }

  getClient(id: string): Observable<Client> {
    return this.http.get<Client>(this.baseApi + '/api/clients/' + id);
  }

  updateClient(id: string, updateClientRequest: Client): Observable<Client> {
    return this.http.put<Client>(this.baseApi + '/api/clients/' + id, 
      updateClientRequest);
  }

  deleteClient(id: string): Observable<Client> {
    return this.http.delete<Client>(this.baseApi + '/api/clients/' + id);
  }

  getLinkedDevices(id: string): Observable<Device[]> {
    return this.http.get<Device[]>(this.baseApi + '/devices' + id);
  }

  linkDevice(client_id: string, device: Device): Observable<any> {
    return this.http.put<any>(this.baseApi + '/devices/link' + client_id, 
      device);
  }
}
