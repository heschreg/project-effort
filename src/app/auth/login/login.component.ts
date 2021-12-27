import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, Form, NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', {validators: [Validators.required, Validators.email]})
    })
  }

  /*
  onSubmit() {
    this.authService.login({
      email: this.loginForm?.value.email,
      password: this.loginForm?.value.password
    })
  }
  */

  onSubmit(form: NgForm) {
    // console.log(form);
    this.authService.login({
      email: form.value.email,
      password: form.value.password
    });
  }


}
