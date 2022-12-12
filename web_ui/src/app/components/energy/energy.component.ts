import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EnergyService } from 'src/app/services/energy.service';

@Component({
  selector: 'app-energy',
  templateUrl: './energy.component.html',
  styleUrls: ['./energy.component.css']
})
export class EnergyComponent implements OnInit {

  constructor(private energyService: EnergyService,
    private router: Router) { }

  ngOnInit(): void {
    this.energyService.consume()
    .subscribe({
      next: (timestamp) => {
        console.log(timestamp);
      }
    });
  }

}
