import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { passwordSpecialValidator } from './password-special.validator';
import { passwordCaseValidator } from './password-case.validator';
import { HttpClient } from '@angular/common/http';

interface UserDto {
  username: string;
  email: string;
  type: 'user' | 'admin';
  password: string;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  signupForm: FormGroup;
  signinForm: FormGroup;
  isSubmitting = false;
  isSigning = false;
  base_url = 'http://localhost:3000';
  showPageName = 'signup';
  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.signupForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(24),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      type: ['', [Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(24),
          passwordCaseValidator(),
          passwordSpecialValidator(),
        ],
      ],
    });

    this.signinForm = this.fb.group({
      signinEmail: ['', [Validators.required, Validators.email]],
      signinPassword: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  signIn() {
    const params = this.signinForm.value;
    console.log(params);
    this.http.post(`${this.base_url}/login`, { params }).subscribe(
      (data) => {
        this.isSigning = false;
      },
      (error) => {
        this.isSigning = false;
        alert(error.error.message);
        console.log(error);
      }
    );
  }
  createUser() {
    this.isSubmitting = true;
    const params = this.signupForm.value;
    this.http.get<any>(`${this.base_url}/register`, { params }).subscribe(
      (data) => {
        this.isSubmitting = false;
        alert(data.message);
      },
      (error) => {
        this.isSubmitting = false;
        alert(error.error.message);
        console.log(error);
      }
    );
  }

  switchPage() {
    this.showPageName =
      this.showPageName == 'login'
        ? (this.showPageName = 'signup')
        : (this.showPageName = 'login');
  }
}
