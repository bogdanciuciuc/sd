import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, 
    private authenticationService: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
      this.authenticationService.logIn(this.loginForm.value)
      .subscribe({
        next: (response) => {
          this.loginForm.reset();
          this.router.navigate(['']);
        },
        error: (err) => {
          alert(err.error.message);
        }
      })
    }
  }

}
