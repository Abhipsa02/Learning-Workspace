import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Router } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { PatientComponent } from './patient/patient.component';
import { DoctorComponent } from './doctor/doctor.component';
import { LaboratoryComponent } from './laboratory/laboratory.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { PageNotFoundComponent } from './pageNotFound/page404.component';

// AuthGuard
// import { AuthGuard } from './sharedJs/auth-guard.service';
// import { LoginAuthGuard } from './sharedJs/beforeLoginauthGuard.service';

const appRoutes: Routes = [ 
    {
        path: '',
        redirectTo : '/home',
        pathMatch: 'full'
    }, {
        path: 'home',
        component: HomeComponent
    }, {
        path: 'signin',
        component: LoginComponent,
        // canActivate: [LoginAuthGuard]
    }, {
        path: 'register',
        component: SignUpComponent
    }, { 
        path: 'patient',
        component: PatientComponent 
    }, { 
        path: 'doctor',  
        component: DoctorComponent 
    }, { 
        path: 'lab',  
        component: LaboratoryComponent 
    }, { 
        path: 'aboutus',  
        component: AboutusComponent 
    }, {
        path: 'not-found',
        component: PageNotFoundComponent
    }, {
        path: '**',
        redirectTo: '/not-found'
    }
];

@NgModule({
  imports: [
    CommonModule,
    // RouterModule.forRoot(appRoutes, {useHash: true})
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
