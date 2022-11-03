import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUp!: FormGroup;

  constructor(private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
    this.signUp = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    if(this.signUp.valid){
      console.log(this.signUp.value);
      this.authenticationService.signUp(this.signUp.value)
      .subscribe({
        next: (response) => {
          this.signUp.reset();
          this.router.navigate(['/login']);
        },
        error: (err) => {
          alert(err.error.message);
        }
      })
    }
  }
}
