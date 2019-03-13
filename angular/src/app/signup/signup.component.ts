import {Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  isSubmitted = false;
  isFailed = false;
  errMessage = '';
  doesMatchPassword = false;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password:  ['', [Validators.required, Validators.minLength(5)]],
      re_pass: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  get formControls() {
    return this.registerForm.controls;
  }
  ValidatePass() {
    const password = this.registerForm.controls.password.value;
    const repeatPassword = this.registerForm.controls.re_pass.value;
    if (repeatPassword !== password) {
        this.doesMatchPassword = true ;
    } else {
      this.doesMatchPassword = false ;
    }
  }

  register() {
    // console.log(this.registerForm.value);
    this.isSubmitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    if (this.doesMatchPassword === true) {
      return;
    }
    this.authService.signUp(this.registerForm.value).subscribe((res) => {
       this.router.navigateByUrl('login');
    }, err => {
      const error = err['error']['message'];
      if (error.indexOf('username') !== -1) {
        this.isFailed = true;
        this.errMessage = 'Username Exists';
      } else if (error.indexOf('email') !== -1) {
        this.isFailed = true;
        this.errMessage = 'Email Exists';
      } else {
        this.errMessage = 'Sorry, we are facing some internal troubles';
      }
    });
  }

  // this.authService.register(this.registerForm.value);
  // this.router.navigateByUrl('/admin');

}
