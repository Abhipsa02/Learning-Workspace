import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

/* Services */
import { AppAuthService } from '../sharedJs/app.authService';
import { LocalStorageService } from 'ngx-store';

/* App Constant */
import { ErrorMessages } from '../sharedJs/app.constant';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  doctorData: any = {};
  emailData: any = {};
  responseData: any = {};
  authData1: any = {};
  authData2: any = {};
  authData3: any = {};
  isDoctor: boolean;
  loggedIn: boolean;
  patientRecord: any;
  public errorMsg: any = ErrorMessages;
  isShowPatientRecord: boolean;
  isDoctorProfile: boolean;
  showProfile = false;
  clinicianData;
  showDoctor: boolean;
  EditProfileEnabled = false;
  myPatientsArray: any;
  authorisedClinicians: any;
  authorisedLabs: any;

  IsShowMedicalRecord = false;
  viewMedicalRecord = false;
  medicalRecord;
  medicalRecordData;
  patientId;

  constructor(
    private authService: AppAuthService,
    private localStorageService: LocalStorageService,
    private toastr: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    this.loginDoctor();
  }
  ngOnInit() { }

  /**** Chk LoggedIn User ****/
  getCurrentUser() {
    this.authService.getCurrentUser().subscribe(result => {
      // var getRegUser = result['participant'].split('.');
      // var user = getRegUser[getRegUser.length - 1].split('#')[0];     
      if (result) {
        this.isDoctor = true;
        this.showDoctor = true;
        this.router.navigate(['/doctor']);
      }
    }, err => {
      this.isDoctor = false;
      this.showDoctor = false;
      this.toastr.error(err.error.error || 'Server Error');
    });
  }

  /**** Login as Doctor ****/
  loginDoctor() {
    this.authService.checkWallet().subscribe(result => {
      if (result['length'] > 0) {
        this.localStorageService.set('isDoctor', true);        
        this.localStorageService.set('isLoggedInUser', true);
        this.loggedIn = true;
        this.isDoctor = true;
        this.showDoctor = true;
        this.isShowPatientRecord = false;
        this.router.navigate(['/doctor']);
        this.getClinicianProfile();
      }
      else {
        this.showDoctor = false;
        this.loggedIn = false;
        this.isDoctor = false;
      }
    }, err => {
      this.isDoctor = false;
      this.loggedIn = false;
      this.isShowPatientRecord = true;
      this.showDoctor = false;
      console.log("error", err);
      this.toastr.error(err.error.error.message);
      this.router.navigate(['/']);
    });
  }

  /**** Create Doctor Profile ****/
  createDoctorProfile() {
    this.spinner.show();
    const data = {
      "$class": "org.lms.ehr.Clinician",
      "clinicianId": this.doctorData.clinicianId,
      "firstName": this.doctorData.firstName,
      "lastName": this.doctorData.lastName,
      "registrationNumber": this.doctorData.registrationNumber,
      "Specialisation": this.doctorData.Specialisation,
      // "dob":this.doctorData.dob.getTime(),
      "address": {
        "$class": "org.lms.ehr.Address",
        "address": this.doctorData.address,
        "city": this.doctorData.city,
        "state": this.doctorData.state,
        "country": this.doctorData.country,
        "zip": this.doctorData.zip
      },
      // "myPatients": []
    };
    console.log("EditProfileEnable",this.EditProfileEnabled);
    if(!this.EditProfileEnabled){
      data["myPatients"]=[];
      this.authService.signupFirst(data, 'doctor').subscribe(res1 => {
        //this.spinner.show();
        this.authData1 = res1;
        if (this.authData1) {
          const identity = {
            participant: 'org.lms.ehr.Clinician#' + this.authData1.clinicianId,
            userID: this.authData1.clinicianId,
          };
          this.authService.signupSecond(identity).subscribe(cardData => {
            if (cardData) {
              const file = new File([cardData], 'myCard.card', { 'type': 'multipart/form-data', lastModified: Date.now() });
              const formData = new FormData();
              formData.append('card', file);

              this.authService.signupThird(formData).subscribe(res3 => {
                this.isDoctor = false;
                this.localStorageService.set('isDoctor', true);
                this.localStorageService.set('isLoggedInUser', true);
                this.toastr.success('Registration Successfully');
                this.getCurrentUser();
                this.getClinicianProfile();
                this.authData3 = res3;
                if (this.authData3) {
                  this.toastr.success('Registration Successfully');
                  //this.spinner.hide();
                  this.doctorData = {};
                }
              }, err => {
                this.spinner.hide();
                this.toastr.error('Server Error');
              });
            }
          }, err => {
            this.spinner.hide();
            this.toastr.error('Server Error');
          });
        }
      }, err => {
        this.spinner.hide();
        this.toastr.error('Server Error');
      });
    }
    else{
      this.spinner.show();
      console.log("Edit Profile is enabled");
      data["myPatients"]= this.myPatientsArray;      
      this.authService.updateClinician(data,this.doctorData.clinicianId).subscribe(result => {
        this.spinner.hide();
        if (result) {
          this.getClinicianProfile();
        }
      }, err => {
        this.spinner.hide();
        console.log(err);
        this.toastr.error(err.statusText);
      });
      this.EditProfileEnabled = false;
      this.isDoctor = true;     
    }

  }

  /**** Get Patient List ****/
  getPatient() {
    this.showDoctor = false;
    this.authService.getPatients().subscribe(result => {
      if (result) {
        this.isShowPatientRecord = true;
        this.patientRecord = result;
        console.log("getPatientRecord", this.patientRecord);
      }
    }, err => {
      console.log(err);
      this.toastr.error(err.statusText);
    });
  }

  /**** Get Clinician Profile ****/
  getClinicianProfile() {
    this.authService.getClinicians().subscribe(result => {
      if (result) {        
        this.myPatientsArray = result[0].myPatients;
        this.isShowPatientRecord = false;
        this.showDoctor = true;
        this.clinicianData = result;
        this.doctorData = result;
        this.spinner.hide();
        if (this.clinicianData.length === 0) {
          this.isDoctor = false;
          this.loggedIn = false;
          this.isShowPatientRecord = true;
          this.showDoctor = false;
        }
      }
    }, err => {
      console.log(err);
      this.toastr.error(err.statusText);
    });
  }

  /* Get Edit profile data function call */
  getEditProfileData() {
    this.EditProfileEnabled = true;
    this.doctorData = this.doctorData[0];
    this.doctorData.city = this.doctorData.address.city;
    this.doctorData.state = this.doctorData.address.state;
    this.doctorData.country = this.doctorData.address.country;
    this.doctorData.zip = this.doctorData.address.zip;
    this.doctorData.address = this.doctorData.address.address;
    this.isShowPatientRecord = false;
    this.isDoctor = false;
    this.showDoctor = false;
  }

  /* Get Medical Record */
  getMedicalRecord(val){
    this.patientId = val;
    var id = encodeURIComponent('resource:org.lms.ehr.Patient#' + val);
    this.authService.getPatientMedicalRecord(id).subscribe(result => {
      if (result) {
        this.authorisedClinicians = result[0].authorisedClinicians;
        this.authorisedLabs = result[0].authorisedLabs;
        console.log("resultaaa", result)

        this.isShowPatientRecord = false;
        this.showDoctor = false;
        this.viewMedicalRecord = true;
        this.medicalRecordData = result;
        var date = new Date(parseInt(this.medicalRecordData[0].lastConsultationDate)); // Date 2011-05-09T06:08:45.178Z
        var year = date.getFullYear();
        var month = ("0" + (date.getMonth() + 1)).slice(-2);
        var day = ("0" + date.getDate()).slice(-2);
        this.medicalRecordData[0].lastConsultationDate = month + '/' + day + '/' + year;
        this.spinner.hide();
      }
    }, err => {
      console.log(err);
      this.toastr.error(err.statusText);
    });
  }

  editmedicalRecord(){
    this.viewMedicalRecord = false;
    this.IsShowMedicalRecord = true;
    this.medicalRecord = this.medicalRecordData[0];
    var date = new Date(this.medicalRecord.lastConsultationDate); // Date 2011-05-09T06:08:45.178Z
    var year = date.getFullYear();
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    var test = month + '/' + day + '/' + year;
    this.medicalRecord.lastConsultationDate = year + '-' + month + '-' + day;

  }

  /** Update Medical Record **/
  updateMedicalRecord(isEnable) {
    this.spinner.show();
    var date = new Date(this.medicalRecord.lastConsultationDate);
    var year = date.getFullYear();
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    var dt = month + '/' + day + '/' + year;
    var dob = new Date(dt).getTime();
    const medicalRecordData = {
      "$class": "org.lms.ehr.MedicalRecord",
      "medicalHistory": this.medicalRecord.medicalHistory,
      "Allergies": this.medicalRecord.Allergies,
      "lastConsultationDate": dob,
      "currentMedication": this.medicalRecord.currentMedication,
      "lastConsultationWith": this.medicalRecord.lastConsultationWith,
      "activeHoursInAWeek": this.medicalRecord.activeHoursInAWeek,
      "smoking": true,
      "owner": "resource:org.lms.ehr.Patient#" + this.patientId,
      "authorisedClinicians": this.authorisedClinicians,
      "authorisedLabs": this.authorisedLabs,
    };
    console.log(medicalRecordData);
    this.authService.updateMedicalRecord(medicalRecordData, this.medicalRecord.recordId).subscribe(result => {
        console.log("resultMediccal", result);
        this.spinner.hide();
        this.viewMedicalRecord = false;
        this.IsShowMedicalRecord = false;
        if (result) {
          this.toastr.success("Record updated successfully");
          this.getPatient();
        }
        // this.getMedicalRecord(this.patientId);
      }, err => {
        this.spinner.hide();
        this.toastr.error('Server Error');
      });
    }

  


}

