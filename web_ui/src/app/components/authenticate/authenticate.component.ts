import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from '../../models/client.model';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent implements OnInit {

  client: Client = {
    id: '',
    name: '',
    email: '',
    password: '',
    role: ''
  };

  constructor(private authService: AuthenticationService,
    private router: Router) {}

  ngOnInit(): void {
    
  }
  
  signUp(client: Client) {
    this.authService.signUp(client).subscribe();
  }

  logIn(client: Client) {
    this.authService.logIn(client).subscribe((token: string) => {
      localStorage.setItem('authToken', token);
      this.router.navigate(['']);
    });
  }

}
