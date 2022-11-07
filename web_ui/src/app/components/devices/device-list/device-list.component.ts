import { Component, OnInit } from '@angular/core';
import { Device } from 'src/app/models/device.model';
import { DevicesService } from 'src/app/services/devices.service';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit {

  devices: Device[] = [];

  constructor(private deviceService: DevicesService) { }

  ngOnInit(): void {
    this.deviceService.getAllDevices()
    .subscribe({
      next: (devices) => {
        this.devices = devices;
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

}
