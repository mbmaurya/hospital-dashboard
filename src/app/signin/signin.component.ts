import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, Form } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/observable';

import { AuthService } from '../auth/auth.service';



@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})


export class SigninComponent implements OnInit {
  signInForm: FormGroup
  

  constructor(
    public fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(8), Validators.maxLength(25)]]
    })
   }

  ngOnInit() {
  }

  get email() {
    return this.signInForm.get('email')
  }

  get password() {
    return this.signInForm.get('password')
  }

  signIn() {
    return this.auth.emailSignIn(this.email.value, this.password.value)
    .then(user => {
      if(this.signInForm.valid)[
        this.router.navigate(['/dashboard'])
      ]
    })
  }

}
