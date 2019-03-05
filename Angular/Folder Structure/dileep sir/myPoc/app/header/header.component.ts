import { Component, OnInit, AfterContentChecked   } from '@angular/core';
import { ActivatedRoute, UrlSegment, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
/* Services */
import { AppAuthService } from '../sharedJs/app.authService';
import { LocalStorageService } from 'ngx-store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterContentChecked   {
  isDoctorStorage: boolean;
  isPatientStorage: boolean;
  isLabStorage: boolean;
  cookies:any;
  isLoggedIn:boolean;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AppAuthService,
    private localStorageService: LocalStorageService,
    private toastr: ToastrService,
  ) {   
    this.isDoctorStorage = false;
    this.isPatientStorage = false;
    this.isLabStorage = false;      
  }

  ngOnInit() {}

  ngAfterContentChecked(){      
    this.isDoctorStorage = this.localStorageService.get('isDoctor');
    if(this.isDoctorStorage=== true){this.isPatientStorage=false;this.isLabStorage=false;}
    this.isPatientStorage = this.localStorageService.get('isPatient');
    if(this.isPatientStorage=== true){this.isDoctorStorage=false;this.isLabStorage=false;}
    this.isLabStorage = this.localStorageService.get('isLab');;
    if(this.isLabStorage=== true){this.isPatientStorage=false;this.isDoctorStorage=false;}
  } 

  logoutUser(){     
    //window.open('https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://103.21.53.11.xip.io:4200/home?loggedIn=false', "_self")  
    // this.authService.logout().subscribe(result => {
    //   console.log("result", result);
    //   if (result) {      
        this.localStorageService.clear('all');       
        this.isDoctorStorage = false;
        this.isPatientStorage = false;
        this.isLabStorage = false; 
        this.isLoggedIn = false;  
        
        var res = document.cookie;     
        var multiple = res.split(";");
        for(var i = 0; i < multiple.length; i++) {
          var key = multiple[i].split("=");
          document.cookie = key[0]+" =; expires = Thu, 01 Jan 1970 00:00:00 UTC";
        } 
        this.toastr.success("Logout Successfully");       
        this.router.navigate(['/']);  

      //}
    // }, err => {
    //   console.log(err);
    //   this.toastr.error(err.statusText);
    // });

  }

}
