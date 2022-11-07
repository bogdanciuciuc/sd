import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Device } from 'src/app/models/device.model';
import { ClientsService } from 'src/app/services/clients.service';
import { DevicesService } from 'src/app/services/devices.service';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css']
})
export class LinkComponent implements OnInit {

  id: string = '';
  devices: Device[] = [];

  constructor(private route: ActivatedRoute,
    private clientService: ClientsService, 
    private deviceService: DevicesService,
    private router: Router) { }

  ngOnInit(): void {
    this.deviceService.getAllDevices()
    .subscribe({
      next: (devices) => {
        this.devices = devices;
      }
    });
    
    this.route.paramMap.subscribe({
      next: (params) =>{
        const id = params.get('id');
        
        if(id) {
          this.id = id;
          console.log(this.id);
        }
      }
    })
  }

  linkDevice(device: Device) {
    this.clientService.linkDevice(this.id, device)
    .subscribe({
      next: (response) => {
        console.log(response);
      },
      error: () => {
        alert("Device already linked to the client!");
      }
    });
  }
}
