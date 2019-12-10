import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularTokenService, SignInData, AuthData } from 'angular-token';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  form = new FormGroup({});

  signInForm: FormGroup;
  signInData: SignInData = {
    login: 'test@test.com',
    password: '12345678'
  } as SignInData;
  authData: AuthData;
  loading: boolean;
  fields: FormlyFieldConfig[] = [
    {
      key: 'login',
      type: 'input',
      templateOptions: {
        label: 'Email',
        required: true
      }
    },
    {
      key: 'password',
      type: 'input',
      templateOptions: {
        type: 'password',
        label: 'Password',
        required: true
      }
    }
  ];

  constructor(
    public tokenService: AngularTokenService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authData = this.tokenService.currentAuthData;
    this.loading = false;
  }

  onSubmit() {
    this.signInData.login = 'test@test.com';
    this.signInData.password = '12345678';

    this.loading = true;

    this.tokenService.signIn(this.signInData).subscribe(
      res => {
        this.loading = false;
        this.authData = this.tokenService.currentAuthData;
        this.router.navigate(['/inside']);
      },
      error => {
        this.loading = false;
        this.signInData = {} as SignInData;
      }
    );
  }
}
