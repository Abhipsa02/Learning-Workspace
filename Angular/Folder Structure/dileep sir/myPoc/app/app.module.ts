import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { MaterialModule } from './sharedJs/material.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// Services
import { CookieService } from 'ngx-cookie-service';
import { WebStorageModule } from 'ngx-store';
import { AppAuthService } from './sharedJs/app.authService';
import { LabService } from './laboratory/lab.service';
//import { AuthInterceptor } from './sharedJs/app.interceptor';

// Directive

// AuthGuard

// Compononets and modules
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { PatientComponent} from './patient/patient.component';
import { DoctorComponent } from './doctor/doctor.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { PageNotFoundComponent } from './pageNotFound/page404.component';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { PatientPopupComponent } from './patient/patient-popup/patient-popup.component';
import { LaboratoryComponent } from './laboratory/laboratory.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PatientComponent,
    DoctorComponent,  
    LoginComponent,
    SignUpComponent,
    PageNotFoundComponent,
    HomeComponent,
    AboutusComponent,
    PatientPopupComponent,    
    LaboratoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    CommonModule, 
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      preventDuplicates: true
    }),
    WebStorageModule, 
    NgxSpinnerModule ,
    NgbModule.forRoot(),
  ],
  providers: [
    CookieService,
    AppAuthService,
    LabService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptor,
    //   multi: true
    // }
  ],
  // entryComponents: [PatientComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
