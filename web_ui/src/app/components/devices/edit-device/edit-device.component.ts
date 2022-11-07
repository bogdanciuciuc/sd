import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Device } from 'src/app/models/device.model';
import { DevicesService } from 'src/app/services/devices.service';

@Component({
  selector: 'app-edit-device',
  templateUrl: './edit-device.component.html',
  styleUrls: ['./edit-device.component.css']
})
export class EditDeviceComponent implements OnInit {

  deviceDetails: Device ={
    id: '',
    description: '',
    address: '',
    max_consumption: 0
  }

  constructor(private route: ActivatedRoute,
    private deviceService: DevicesService, 
    private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) =>{
        const id = params.get('id');
        
        if(id) {
          this.deviceService.getDevice(id)
          .subscribe({
            next: (response) => {
              this.deviceDetails = response;
            }
          })
        }
      }
    })
  }

  updateDevice(){
    this.deviceService.updateDevice(this.deviceDetails.id, this.deviceDetails)
    .subscribe({
      next: (response => {
        this.router.navigate(['devices']);
      })
    });
  }

  deleteDevice(id: string){
    this.deviceService.deleteDevice(id).subscribe({
      next: (response) => {
        this.router.navigate(['devices']);
      }
    });
  }

}
