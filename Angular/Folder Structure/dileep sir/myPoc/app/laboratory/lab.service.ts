import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { LocalStorageService } from 'ngx-store';
import { ApiUrl } from '../sharedJs/app.constant';
import { Observable } from 'rxjs';

@Injectable()
export class LabService {
    authToken: boolean;
    data: any;
    constructor(
        private http: HttpClient,
        private localStorageService: LocalStorageService
    ) {
        if (this.localStorageService.get('AuthData')) {
            this.authToken = true;
        } else {
            this.authToken = false;
        }
    }

    getLabProfile() {
        const url = 'http://103.21.53.11.xip.io:3000/api/org.lms.ehr.Lab';
        return this.http.get(url, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
    }

    updateLabProfile(data, labId) {
        const url = 'http://103.21.53.11.xip.io:3000/api/org.lms.ehr.Lab/' + labId;
        return this.http.put(url, data, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
    }

    getPatients() {
        const url = 'http://103.21.53.11.xip.io:3000/api/org.lms.ehr.Patient';
        return this.http.get(url, {
            withCredentials: true, headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
    }

    
    getPatientMedicalRecord(id) {
        const url = 'http://103.21.53.11.xip.io:5000/api/queries/getMedicalRecordOfPatient?patientEmail=' + id;
        return this.http.get(url, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
    }

    updateMedicalRecord(data, id) {
        const headers = new HttpHeaders();
        headers.set('Content-Type', 'multipart/form-data');
        const url = 'http://103.21.53.11.xip.io:3000/api/org.lms.ehr.MedicalRecord/' + id;
        return this.http.put(url, data, { withCredentials: true, headers });
    }
    
}