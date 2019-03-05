import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

/* Services */
import { AppAuthService } from '../sharedJs/app.authService';
import { LocalStorageService } from 'ngx-store';

/* App Constant */
import { ErrorMessages } from '../sharedJs/app.constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor( ) {}
  ngOnInit() {}
}
