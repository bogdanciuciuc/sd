import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Device } from 'src/app/models/device.model';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-client-devices',
  templateUrl: './client-devices.component.html',
  styleUrls: ['./client-devices.component.css']
})
export class ClientDevicesComponent implements OnInit {

  id: string = '';
  devices: Device[] = [];

  constructor(private clientService: ClientsService,
    private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');

        if(id) {
          this.id = id;
          this.clientService.getLinkedDevices(this.id)
          .subscribe({
            next: (devices) => {
              this.devices = devices;
            }
          })
        }
      }
    })
  }

}
