import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Device } from '../models/device.model';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {

  private baseApi: string = 'https://localhost:7203/api/Device';

  constructor(private http: HttpClient) { }

  getAllDevices(): Observable<Device[]> {
    return this.http.get<Device[]>(this.baseApi);
  }

  addDevice(addDeviceRequest: Device): Observable<Device> {
    addDeviceRequest.id = '00000000-0000-0000-0000-000000000000';
    return this.http.post<Device>(this.baseApi, addDeviceRequest);
  }

  getDevice(id: string): Observable<Device> {
    return this.http.get<Device>(this.baseApi + '/' + id);
  }

  updateDevice(id: string, updateDeviceRequest: Device): Observable<Device> {
    return this.http.put<Device>(this.baseApi + '/' + id, 
      updateDeviceRequest);
  }

  deleteDevice(id: string): Observable<Device> {
    return this.http.delete<Device>(this.baseApi + '/' + id);
  }
}
