import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

/* Services */
import { AppAuthService } from '../sharedJs/app.authService';
import { LocalStorageService } from 'ngx-store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean;
  isLoggedInUser: boolean;
  response: any = {};
  result: any = {};
  userName: any;
  email: any;
  currentRoute: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private localStorageService: LocalStorageService,
    private authService: AppAuthService,
    private toastr: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService,
  ) {
    console.log("constructor");
    this.isLoggedIn = false;
    this.isLoggedInUser = false;


  }

  ngOnInit() {
    this.chkLoginUser();    
  }

  ngAfterContentChecked() {
    this.isLoggedIn = this.activatedRoute.snapshot.queryParams["loggedIn"];
    this.isLoggedInUser = this.localStorageService.get('isLoggedInUser');   
  }

  /**** Check Login ****/
  chkLoginUser() {
    console.log("routename", this.router.url); //  /routename
    //this.spinner.show();
    this.authService.checkWallet().subscribe(result => {
      if (result['length'] > 0) {
        this.currentRoute = this.router.url;
        this.userName = result[0].name.substring(0, result[0].name.length - 4);
        const chkData = {
          "$class": "org.lms.ehr.getUserType",
          "email": this.userName
        }
        //&& this.currentRoute != '/home'       
        this.authService.getUserType(chkData).subscribe(response => {
          console.log("labbbbbbb", response);
          this.localStorageService.set('isLoggedInUser', true);
          if (response == 'Clinician') { this.localStorageService.set('isDoctor', true); }
          if (response == 'Patient') { this.localStorageService.set('isPatient', true); }
          if (response == 'Lab') { this.localStorageService.set('isLab', true); }

          if (response == 'Clinician' && this.currentRoute != '/home') {
            this.router.navigate(['/doctor']);
          }
          if (response == 'Patient' && this.currentRoute != '/home') {
            this.router.navigate(['/patient']);
          }
          if (response == 'Lab' && this.currentRoute != '/home') {
            this.router.navigate(['/lab']);
          }
          if (this.currentRoute != '/home') {
            this.router.navigate(['/home']);
          }
        });
      }
    }, err => {
      //this.spinner.hide();   
      //this.toastr.error(err.error.error.message);
      this.router.navigate(['/']);
    });
  }

}
