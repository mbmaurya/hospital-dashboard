import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, Form } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup
  

  constructor(
    public fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(8), Validators.maxLength(25)]]
    })
   }

  ngOnInit() {
  }

  get email() {
    return this.signUpForm.get('email')
  }

  get password() {
    return this.signUpForm.get('password')
  }

  signUp() {
    return this.auth.emailSignUp(this.email.value, this.password.value)
    .then(user => {
      if(this.signUpForm.valid)[
        this.router.navigate(['/signin'])
      ]
    })
  }

}
