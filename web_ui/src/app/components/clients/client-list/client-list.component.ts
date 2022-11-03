import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client.model';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  clients: Client[] = [];
  
  constructor(private clientService:ClientsService) { }

  ngOnInit(): void {
    this.clientService.getAllClients()
    .subscribe({
      next: (clients) => {
        this.clients = clients;
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

}
