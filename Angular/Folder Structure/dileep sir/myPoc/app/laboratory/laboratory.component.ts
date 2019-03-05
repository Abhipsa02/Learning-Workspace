import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
//import { LabInterface } from 'LabInterface';

/* Services */
import { AppAuthService } from '../sharedJs/app.authService';
import { LabService } from './lab.service';
import { LocalStorageService } from 'ngx-store';

/* App Constant */
import { ErrorMessages } from '../sharedJs/app.constant';

@Component({
  selector: 'app-laboratory',
  templateUrl: './laboratory.component.html',
  styleUrls: ['./laboratory.component.css']
})
export class LaboratoryComponent implements OnInit {
  public errorMsg: any = ErrorMessages;
  doctorData: any = {};
  emailData: any = {};
  responseData: any = {};
  authData1: any = {};
  authData2: any = {};
  authData3: any = {};
  isDoctor: boolean;
  loggedIn: boolean;
  patientRecord: any;
  isShowPatientRecord: boolean;
  isDoctorProfile: boolean;
  showProfile = false;
  clinicianData;
  showDoctor: boolean;
  EditProfileEnabled = false;

  IsShowMedicalRecord = false;
  viewMedicalRecord = false;
  medicalRecord;
  medicalRecordData;
  patientId;
  myPatientsArray: any;
  authorisedClinicians: any;
  authorisedLabs: any;

  constructor(
    private authService: AppAuthService,
    private labService: LabService,
    private localStorageService: LocalStorageService,
    private toastr: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.loginDoctor();
  }
  /**** Chk LoggedIn User ****/
  getCurrentUser() {
    this.authService.getCurrentUser().subscribe(result => {
      // var getRegUser = result['participant'].split('.');
      // var user = getRegUser[getRegUser.length - 1].split('#')[0];     
      if (result) {
        this.isDoctor = true;
        this.showDoctor = true;
        this.router.navigate(['/lab']);
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
        this.localStorageService.set('isLab', true);
        this.localStorageService.set('isLoggedInUser', true);
        this.loggedIn = true;
        this.isDoctor = true;
        this.showDoctor = true;
        this.isShowPatientRecord = false;
        this.router.navigate(['/lab']);
        this.getLabProfile();
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
      // this.toastr.error(err.error.error.message);
      this.router.navigate(['/']);
    });
  }

  /**** Create Doctor Profile ****/
  createDoctorProfile() {
    this.spinner.show();
    const data = {
      "$class": "org.lms.ehr.Lab",
      "labId": this.doctorData.labId,
      "name": this.doctorData.name,
      "address": this.doctorData.address,
      //"myPatients": []
    };
    console.log("EditProfileEnable", this.EditProfileEnabled);
    if (!this.EditProfileEnabled) {
      data['myPatients'] = [];
      this.authService.signupFirst(data, 'lab').subscribe(res1 => {
        //this.spinner.show();
        this.authData1 = res1;
        if (this.authData1) {
          const identity = {
            participant: 'org.lms.ehr.Lab#' + this.authData1.labId,
            userID: this.authData1.labId,
          };
          this.authService.signupSecond(identity).subscribe(cardData => {
            if (cardData) {
              const file = new File([cardData], 'myCard.card', { 'type': 'multipart/form-data', lastModified: Date.now() });
              const formData = new FormData();
              formData.append('card', file);

              this.authService.signupThird(formData).subscribe(res3 => {
                this.isDoctor = false;
                this.localStorageService.set('isLab', true);
                this.localStorageService.set('isLoggedInUser', true);
                this.toastr.success(' Registration Successfully');
                this.getCurrentUser();
                this.getLabProfile();
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
    else {
      this.spinner.show();
      data["myPatients"] = this.myPatientsArray;
      console.log("Edit Profile is enabled");
      this.labService.updateLabProfile(data, this.doctorData.labId).subscribe(result => {
        this.spinner.hide();
        if (result) {
          this.getLabProfile();
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

  /**** Get Clinician Profile ****/
  getLabProfile() {
    this.labService.getLabProfile().subscribe(result => {
      if (result) {
        this.myPatientsArray = result[0].myPatients;
        this.isShowPatientRecord = false;
        this.showDoctor = true;
        this.clinicianData = result;
        this.doctorData = result;
        console.log("clinicianData", this.clinicianData);
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
    this.doctorData.address = this.doctorData.address;
    this.isShowPatientRecord = false;
    this.isDoctor = false;
    this.showDoctor = false;
  }

  /**** Get Patient List ****/
  getPatient() {
    this.showDoctor = false;
    this.labService.getPatients().subscribe(result => {
      if (result) {
        console.log("result", result);
        this.isShowPatientRecord = true;
        this.patientRecord = result;
        console.log("getPatientRecord", this.patientRecord);
      }
    }, err => {
      console.log(err);
      this.toastr.error(err.statusText);
    });
  }

  /* Get Medical Record */
  getMedicalRecord(data) {
    this.patientId = data.patientId;
    var id = encodeURIComponent('resource:org.lms.ehr.Patient#' + this.patientId);
    this.labService.getPatientMedicalRecord(id).subscribe(result => {
      if (result) {
        result['fullName'] = data.firstName;
        result['patientEmail'] = data.patientId;        
        this.authorisedClinicians = result[0].authorisedClinicians;
        this.authorisedLabs = result[0].authorisedLabs;
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

  editmedicalRecord() {
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
    this.labService.updateMedicalRecord(medicalRecordData, this.medicalRecord.recordId).subscribe(result => {
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
