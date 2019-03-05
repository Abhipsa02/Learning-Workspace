import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import {MatDialog} from '@angular/material';
import { PatientPopupComponent } from './patient-popup/patient-popup.component';
import { FormControl } from '@angular/forms';
/* Services */
import { AppAuthService } from '../sharedJs/app.authService';
import { LocalStorageService } from 'ngx-store';


import { NgbActiveModal, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

/* App Constant */
import { ErrorMessages } from '../sharedJs/app.constant';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  patientData: any = {};
  mediacalRecord: any = {};
  emailData: any = {};
  responseData: any = {};
  authData1: any = {};
  authData2: any = {};
  authData3: any = {};
  isPatient: boolean;
  loggedIn: boolean;
  clinicianRecord: any;
  public errorMsg: any = ErrorMessages;
  isShowClinicianRecord: boolean;
  patientProfile;
  showPatient: boolean;
  searchDoctorResult: any = [];
  searchParam: any = {};
  isUpdatePatient: boolean;
  userName:any;
  emailId:any;
  IsShowMedicalRecord: boolean;
  viewMedicalRecord = false;
  medicalRecordData;
  editMedicalRecordEnable=false;
  medicalRecord : any = {};
  authorisedClinicianRecord: any;
  myClinicianRecord: any;
  EditProfileEnabled = false;
  minDate:any;
  maxDate:any;
  authorisedClinicians:any;
  authorisedLabs:any;
  laboratoryRecord:any;
  myLaboratoryRecord:any;


  closeResult;
  constructor(
    private authService: AppAuthService,
    private localStorageService: LocalStorageService,
    private toastr: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
    private modalService: NgbModal
  ) {
    this.loginPatient();
    this.isUpdatePatient = false;
  }
  ngOnInit() {
    this.minDate = new Date(2000, 0, 1);
    this.maxDate = new Date();
   }

  open(content) {
    this.getAllClinician();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size : 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  open1(content1) {
    this.getMyClinician();
    this.modalService.open(content1, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  AllLab(content2) {
    this.getAllLaboratory();
    this.modalService.open(content2, { ariaLabelledBy: 'modal-basic-title', size : 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  myLab(content3) {
    this.getMyLaboratory();
    this.modalService.open(content3, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  /**** Chk LoggedIn User ****/
  getCurrentUser() {
    this.authService.getCurrentUser().subscribe(result => {
      // var getRegUser = result['participant'].split('.');
      // var user = getRegUser[getRegUser.length - 1].split('#')[0];     
      if (result) {
        this.isPatient = true;
        this.router.navigate(['/patient']);
      }
    }, err => {
      this.isPatient = false;
      this.toastr.error(err.error.error || 'Server Error');
    });
  }

  /**** Login as Patient ****/
  loginPatient() {
    this.authService.checkWallet().subscribe(result => {
      if (result['length'] > 0) {
        this.userName = result[0].name.substring(0, result[0].name.length-4);       
        this.localStorageService.set('isPatient', true);
        this.localStorageService.set('isLoggedInUser', true);        
        this.loggedIn = true;
        this.isPatient = true;
        this.isShowClinicianRecord = false;
        this.IsShowMedicalRecord = false;
        this.router.navigate(['/patient']);
        this.getPatientProfile();
      } else {
        // this.toastr.error("No Profile Created Yet");
      }
    }, err => {
      this.isPatient = false;
      this.loggedIn = false;
      // this.isShowClinicianRecord = true;     
      this.toastr.error(err.error.error.message);
      this.router.navigate(['/']);
    });
  }

  /**** Create Patient Profile ****/
  createPatientProfile() {
    this.spinner.show();
    console.log("dob=====",this.patientData.dob);
    // var date = new Date(this.patientData.dob); // Date 2011-05-09T06:08:45.178Z
    var date = new Date(this.patientData.dob);
    var year = date.getFullYear();
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    var dt = month + '/' + day + '/' + year;
    var dob = new Date(dt).getTime();
    const data = {
      "$class": "org.lms.ehr.Patient",     
      "firstName": this.patientData.firstName,
      "lastName": this.patientData.lastName,
      "dob": dob,
      "address": {
        "$class": "org.lms.ehr.Address",
        "address": this.patientData.address,
        "city": this.patientData.city,
        "state": this.patientData.state,
        "country": this.patientData.country,
        "zip": this.patientData.zip
      }
    };
    
    if(!this.EditProfileEnabled){
      data['patientId'] = this.patientData.patientId;
      this.authService.signupFirst(data, 'patient').subscribe(res1 => {
        this.authData1 = res1;
        this.patientData = res1;
        if (this.authData1) {
          this.userName = this.authData1.patientId;
          const identity = {
            participant: 'org.lms.ehr.Patient#' + this.authData1.patientId,
            userID: this.authData1.patientId,
          };
          this.authService.signupSecond(identity).subscribe(cardData => {
            console.log("cardData", cardData);
            if (cardData) {
              const file = new File([cardData], 'myCard.card', { 'type': 'multipart/form-data', lastModified: Date.now() });
              const formData = new FormData();
              formData.append('card', file);

              this.authService.signupThird(formData).subscribe(res3 => {
                this.isPatient = false;
                this.localStorageService.set('isPatient', true);
                this.localStorageService.set('isLoggedInUser', true);
                this.toastr.success('Registration Success');
                this.getPatientProfile();
                this.getCurrentUser();
                this.authData3 = res3;
                if (this.authData3) {
                  this.toastr.success('Registration Success');
                  // this.spinner.hide();
                  this.patientData = [];
                }
              }, err => {
                this.spinner.hide();
                this.toastr.error('Server Error');
              });
            }
          }, err => {
            console.log("err", err);
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
      this.authService.updatePatient(data, this.patientData.patientId).subscribe(result => {
        this.spinner.hide();
        if (result) {
          this.getPatientProfile();
        }
      }, err => {
        this.spinner.hide();
        console.log(err);
        this.toastr.error(err.statusText);
      });
      this.EditProfileEnabled = false;
      this.isPatient = true;     
    }
  }

  /* Get Edit profile data function call */
  getEditProfileData() {
    this.EditProfileEnabled = true;
    this.patientData = this.patientData[0];
    var date = new Date(this.patientData.dob); // Date 2011-05-09T06:08:45.178Z
    var year = date.getFullYear();
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    var test = month + '/' + day + '/' + year;
    this.patientData.dob = year + '-' + month + '-' + day;
    this.patientData.city = this.patientData.address.city;
    this.patientData.state = this.patientData.address.state;
    this.patientData.country = this.patientData.address.country;
    this.patientData.zip = this.patientData.address.zip;
    this.patientData.address = this.patientData.address.address;
    this.isShowClinicianRecord = false;
    this.isPatient = false;
    this.showPatient = false;
  }

  /**** Get Clinician List ****/
  getMyClinician() {
    this.emailId = encodeURIComponent('resource:org.lms.ehr.Patient#'+ this.userName);
    this.authService.getMyClinicians(this.emailId ).subscribe(result => {
      if (result) {
        // this.isShowClinicianRecord = true;
        // this.showPatient = false;
        this.myClinicianRecord = result;
        console.log("myClinicianRecord", this.myClinicianRecord);
      }
    }, err => {
      console.log(err);
      this.toastr.error(err.statusText);
    });
  }

  /**** Get Patient Profile ****/
  getPatientProfile() {
    this.authService.getPatientProfile().subscribe(result => {
      if (result) {
        this.isShowClinicianRecord = false;
        this.showPatient = true;
        this.patientProfile = result;
        this.patientData = result;
        this.patientData.dateinMillis = this.patientProfile[0].dob;
        var date = new Date(parseInt(this.patientProfile[0].dob)); // Date 2011-05-09T06:08:45.178Z
        var year = date.getFullYear();
        var month = ("0" + (date.getMonth() + 1)).slice(-2);
        var day = ("0" + date.getDate()).slice(-2);
        this.patientProfile[0].dob = month + '/' + day + '/' + year;
        console.log("get pp dob", this.patientProfile[0].dob);
        
        this.spinner.hide();
        if (this.patientProfile.length === 0) {
          this.isShowClinicianRecord = false;
          this.showPatient = false;
          this.isPatient = false;
        }
      }
    }, err => {
      console.log(err);
      this.toastr.error(err.statusText);
    });
  }

  /** Search clician **/
  searchDoctor(searchParam) {
    console.log("searchParam", this.searchParam.search);
    this.authService.getSearchClinician(searchParam.search).subscribe(result => {
      if (result) {
        this.searchParam={};
        this.clinicianRecord = result;        
      }
    }, err => {
      console.log(err);
      this.toastr.error(err.statusText);
    });
  }

  /** Get Medical Record **/
  getMedicalRecord(){
    this.editMedicalRecordEnable = false;
    this.IsShowMedicalRecord = true;
    this.authService.getMedicalRecord().subscribe(result => { 
      if (result[0]){
        this.authorisedClinicians = result[0].authorisedClinicians;
        this.authorisedLabs = result[0].authorisedLabs;
      }      
      console.log("get Medical record", result['length']);       
      if(result['length'] === 0 ){        
        this.editMedicalRecordEnable = false;
        this.IsShowMedicalRecord = true;
        this.viewMedicalRecord = false
      }
      else{
        this.medicalRecordData = result;  
        var date = new Date(parseInt(this.medicalRecordData[0].lastConsultationDate)); // Date 2011-05-09T06:08:45.178Z
        var year = date.getFullYear();
        var month = ("0" + (date.getMonth() + 1)).slice(-2);
        var day = ("0" + date.getDate()).slice(-2);
        this.medicalRecordData[0].lastConsultationDate = month + '/' + day + '/' + year;
        this.viewMedicalRecord = true; 
        this.IsShowMedicalRecord = false;
        this.getMyClinician();
        this.getAllClinician();
        
      }
       
    }, err => {
      this.spinner.hide();
      this.toastr.error('Server Error');
    });

  }

  /** Show Get Medical Record **/
  createMedicalRecord(isEnable){
    this.spinner.show();
    var date = new Date(this.medicalRecord['lastConsultationDate']);
    var year = date.getFullYear();
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    var dt = month + '/' + day + '/' + year;
    var dob = new Date(dt).getTime();
    console.log("patient profile from med creation",this.patientProfile)
    const medicalRecordData = {
      "$class": "org.lms.ehr.MedicalRecord",     
      "medicalHistory": this.medicalRecord['medicalHistory'],
      "Allergies": this.medicalRecord['Allergies'],
      "lastConsultationDate": dob,
      "currentMedication": this.medicalRecord['currentMedication'],
      "lastConsultationWith": this.medicalRecord['lastConsultationWith'],
      "activeHoursInAWeek": this.medicalRecord['activeHoursInAWeek'],
      "smoking": true,
      "owner": "resource:org.lms.ehr.Patient#"+this.patientProfile[0].patientId,     
    };
    console.log(medicalRecordData);
    if(!isEnable){
      medicalRecordData['recordId'] = new Date().getTime().toString();
      medicalRecordData['authorisedClinicians']=[];
      medicalRecordData['authorisedLabs']=[];
      this.authService.createMedicalRecord(medicalRecordData).subscribe(result => {
        console.log("resultMediccal", result);
        this.spinner.hide();
        if(result){
          this.toastr.success("Record created successfully");
        }
        this.getMedicalRecord();
      }, err => {
        this.spinner.hide();
        this.toastr.error('Server Error');
      });
    }
    else{
      medicalRecordData['authorisedClinicians']=this.authorisedClinicians;
      medicalRecordData['authorisedLabs']=this.authorisedLabs;
      this.authService.updateMedicalRecord(medicalRecordData,this.medicalRecord['recordId']).subscribe(result => {
        console.log("resultMediccal", result);
        this.spinner.hide();
        if(result){
          this.toastr.success("Record updated successfully");
        }
        this.getMedicalRecord();
      }, err => {
        this.spinner.hide();
        this.toastr.error('Server Error');
      });
    }
    
  }

  /* Edit Medical Record*/
  editmedicalRecord () {
    this.editMedicalRecordEnable = true;
    this.IsShowMedicalRecord = true;
    this.viewMedicalRecord = false;
    this.medicalRecord = this.medicalRecordData[0];
    var date = new Date(this.medicalRecord['lastConsultationDate']); // Date 2011-05-09T06:08:45.178Z
    var year = date.getFullYear();
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    var test = month + '/' + day + '/' + year;
    this.medicalRecord['lastConsultationDate'] = year + '-' + month + '-' + day;
    console.log("medical record data", this.medicalRecordData[0]);
  }

  /**** Get All Clinician List ****/
  getAllClinician() {  
    this.getMyClinician();  
    this.authService.getAllClinician().subscribe(result => {
      if (result) {
        this.clinicianRecord = result;
        for(var i = 0;i<this.clinicianRecord.length;i++){
          for(var j=0;j<this.myClinicianRecord.length;j++){
            if(this.clinicianRecord[i].clinicianId === this.myClinicianRecord[j].clinicianId){
              this.clinicianRecord.splice(i,1);
            }
          }
        }     
        console.log("filtered record",this.clinicianRecord); 
      }
    }, err => {
      console.log(err);
      this.toastr.error(err.statusText);
    });
  }

  /**** Authorize Clinician  ****/  
  authorizeClinician(val) { 
    this.spinner.show();
    const data = {
        "$class": "org.lms.ehr.GrantAccess",
        "authorisedToModify": "resource:org.lms.ehr.Clinician#" + val.clinicianId,
        "medicalRecord": "resource:org.lms.ehr.MedicalRecord#" + this.medicalRecordData[0].recordId
      };
      this.authService.authorizeClinician(data).subscribe(result => {
        this.spinner.hide();
        if (result) {
          this.toastr.success("Clinician authorized successfully.");
          this.getAllClinician();
          
        }
      }, err => {
        this.spinner.hide();
        console.log(err);
        this.toastr.error(err.statusText);
      });
  }

  /**** Authorize Clinician  ****/  
  unAuthorizedClinician(val) { 
    this.spinner.show();
    const data = {
      "$class": "org.lms.ehr.revokeAccess",
      "revokeThisClinician": "resource:org.lms.ehr.Clinician#"+val.clinicianId,
      "medicalRecord": "resource:org.lms.ehr.MedicalRecord#"+this.medicalRecordData[0].recordId
    };
    this.authService.unAuthorizedClinician(data).subscribe(result => {
      this.spinner.hide();
      if (result) {  
        console.log("result", result);
        this.toastr.success("Unauthorized Successfully"); 
        this.getMyClinician();       
      }
    }, err => {
      this.spinner.hide();
      console.log(err);
      this.toastr.error(err.statusText);
    });
  }

 /**** Get All Laboratory List ****/
 getAllLaboratory() {    
  this.getMyLaboratory();  
  this.authService.getAllLaboratory().subscribe(result => {
    if (result) {
      this.laboratoryRecord = result;
      for(var i = 0;i<this.laboratoryRecord.length;i++){
        for(var j=0;j<this.myLaboratoryRecord.length;j++){
          if(this.laboratoryRecord[i].labId === this.myLaboratoryRecord[j].labId){
            this.laboratoryRecord.splice(i,1);
          }
        }
      }     
      console.log("filtered record",this.laboratoryRecord); 
    }
  }, err => {
    console.log(err);
    this.toastr.error(err.statusText);
  });
}

  /**** Authorize Clinician  ****/  
  authorizeLaboratory(val) { 
    this.spinner.show();
    const data = {
        "$class": "org.lms.ehr.GrantAccessToLab",
        "addThislab": "resource:org.lms.ehr.Lab#" + val.labId,
        "medicalRecord": "resource:org.lms.ehr.MedicalRecord#" + this.medicalRecordData[0].recordId
      };
      this.authService.authorizeLaboratory(data).subscribe(result => {
        this.spinner.hide();
        if (result) {
          this.toastr.success("Laboratory authorized successfully.");
          this.getAllLaboratory();
          
        }
      }, err => {
        this.spinner.hide();
        console.log(err);
        this.toastr.error(err.statusText);
      });
  } 

  /**** Get My Laboratory List ****/
  getMyLaboratory() {  
    this.emailId = encodeURIComponent('resource:org.lms.ehr.Patient#'+ this.userName); 
      this.authService.getMyLaboratory(this.emailId).subscribe(result => {
        if (result) {
          // this.isShowClinicianRecord = true;
          // this.showPatient = false;
          this.myLaboratoryRecord = result;
          console.log("myLaboratoryRecord", this.myLaboratoryRecord);
        }
      }, err => {
        console.log(err);
        this.toastr.error(err.statusText);
      });
  }

  /**** Authorize Laboratory  ****/  
  unAuthorizedLaboratory(val) { 
    this.spinner.show();
    const data = {
      "$class": "org.lms.ehr.revokeAccessFromLab",
      "revokeThisLab": "resource:org.lms.ehr.Lab#"+val.labId,
      "medicalRecord": "resource:org.lms.ehr.MedicalRecord#"+this.medicalRecordData[0].recordId
    };
    this.authService.unAuthorizedLaboratory(data).subscribe(result => {
      this.spinner.hide();
      if (result) {  
        console.log("result", result);
        this.toastr.success("Unauthorized Successfully"); 
        this.getMyLaboratory();       
      }
    }, err => {
      this.spinner.hide();
      console.log(err);
      this.toastr.error(err.statusText);
    });
  }



}
