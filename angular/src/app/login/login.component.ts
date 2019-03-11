import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {User} from '../model/user';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
  }

  loginForm: FormGroup;
  isSubmitted = false;
  isFailed = false;
  errMessage = '';

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get formControls() {
    return this.loginForm.controls;
  }

  login() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.singIn(this.loginForm.value).subscribe((res) => {
        // console.log(res);
        this.router.navigateByUrl('dashboard');
      }, err => {
        this.isFailed = true;
        if (err['error']['message'] === 'Unauthorized') {
          this.errMessage = 'Username or password is invalid';
        } else {
          this.errMessage = 'Sorry, we are facing some internal troubles';
        }
      }
    );
  }
}
