import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Device } from 'src/app/models/device.model';
import { DevicesService } from 'src/app/services/devices.service';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css']
})
export class AddDeviceComponent implements OnInit {

  addDeviceRequest: Device = {
    id: '',
    description: '',
    address: '',
    max_consumption: 0
  };

  constructor(private deviceService: DevicesService,
    private router: Router) { }

  ngOnInit(): void {
  }

  addDevice(){
    this.deviceService.addDevice(this.addDeviceRequest)
    .subscribe({
      next: (client) => {
      console.log(client),
      this.router.navigate(['/devices']);
    }
  }); 
  }
}
