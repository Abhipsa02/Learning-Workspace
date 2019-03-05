import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { NgForm, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material';
/* Services */
import { AppAuthService } from 'src/app/sharedJs/app.authService';
import { LocalStorageService } from 'ngx-store';

/* App Constant */
import { ErrorMessages } from 'src/app/sharedJs/app.constant';

@Component({
  selector: 'app-patient-popup',
  templateUrl: './patient-popup.component.html',
  styleUrls: ['./patient-popup.component.css'],
})
export class PatientPopupComponent implements OnInit {

  constructor(
    private authService: AppAuthService,
    private localStorageService: LocalStorageService,
    private toastr: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,

    @Inject(MAT_DIALOG_DATA) public data: any,
    private mdDialogRef: MatDialogRef<PatientPopupComponent>
  ) { }

  ngOnInit() {
    console.log(this.data);
  }

  /**unauthorisedClician **/


}
