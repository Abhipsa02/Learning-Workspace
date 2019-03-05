import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { LocalStorageService } from 'ngx-store';
import { ApiUrl } from '../sharedJs/app.constant';
import { Observable } from 'rxjs';

@Injectable()
export class AppAuthService {
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
    signupFirst(body: {}, type: string) {
        var url;
        if (type == 'doctor') {
            url = 'http://103.21.53.11.xip.io:5000/api/org.lms.ehr.Clinician';
        }
        if(type == 'patient') {
            url = 'http://103.21.53.11.xip.io:5000/api/org.lms.ehr.Patient';
        }
        if(type == 'lab') {
            url = 'http://103.21.53.11.xip.io:5000/api/org.lms.ehr.Lab';
        }

        return this.http.post(url, body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
    }
    signupSecond(identity: {}): Observable<Blob> {
        const url = 'http://103.21.53.11.xip.io:5000/api/system/identities/issue';
        return this.http.post(url, identity, { responseType: 'blob' });
    }
    signupThird(formData: any) {
        const headers = new HttpHeaders();
        headers.set('Content-Type', 'multipart/form-data');
        const url = 'http://103.21.53.11.xip.io:3000/api/wallet/import';
        return this.http.post(url, formData, { withCredentials: true, headers });
    }
    getCurrentUser() {
        const url = 'http://103.21.53.11.xip.io:3000/api/system/ping';
        return this.http.get(url, {
            withCredentials: true, headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
    }
    checkWallet() {
        const url = 'http://103.21.53.11.xip.io:3000/api/wallet';
        return this.http.get(url, {
            withCredentials: true, headers: {
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

    getClinicians() {
        const url = 'http://103.21.53.11.xip.io:3000/api/org.lms.ehr.Clinician';
        return this.http.get(url, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
    }

    getPatientProfile() {
        const url = 'http://103.21.53.11.xip.io:3000/api/org.lms.ehr.Patient';
        return this.http.get(url, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
    }

    getSearchClinician(param: string) {
        console.log("param", param);
        const url = 'http://103.21.53.11.xip.io:3000/api/queries/searchClinician?clinicianName=' + param;
        return this.http.get(url, {
            withCredentials: true, headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
    }

    logout() {
        const url = 'http://103.21.53.11.xip.io:3000/auth/logout'
        return this.http.get(url, {
            withCredentials: true, headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
    }

    getUserType(data: any) {
        const url = 'http://103.21.53.11.xip.io:5000/api/org.lms.ehr.getUserType';
        return this.http.post(url, data, {
            withCredentials: true, headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
    }

    getMyClinicians(emailId: any) {
        console.log(emailId);
        const URL = 'http://103.21.53.11.xip.io:5000/api/queries/getMyClinician?patient=' + emailId;
        return this.http.get(URL, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
    }

    createMedicalRecord(data: any) {
        const headers = new HttpHeaders();
        headers.set('Content-Type', 'multipart/form-data');
        const url = 'http://103.21.53.11.xip.io:3000/api/org.lms.ehr.MedicalRecord';
        return this.http.post(url, data, { withCredentials: true, headers });
    }

    getMedicalRecord() {
        const headers = new HttpHeaders();
        headers.set('Content-Type', 'multipart/form-data');
        const url = 'http://103.21.53.11.xip.io:3000/api/org.lms.ehr.MedicalRecord';
        return this.http.get(url, { withCredentials: true, headers });
    }

    updateMedicalRecord(data, id) {
        const headers = new HttpHeaders();
        headers.set('Content-Type', 'multipart/form-data');
        const url = 'http://103.21.53.11.xip.io:3000/api/org.lms.ehr.MedicalRecord/' + id;
        return this.http.put(url, data, { withCredentials: true, headers });
    }

    unAuthorizedClinician(data: any) {
        const URL = 'http://103.21.53.11.xip.io:3000/api/org.lms.ehr.revokeAccess';
        return this.http.post(URL, data, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
    }

    getAllClinician() {
        const URL = 'http://103.21.53.11.xip.io:3000/api/org.lms.ehr.Clinician';
        return this.http.get(URL, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
    }

    authorizeClinician(data: any) {
        const URL = 'http://103.21.53.11.xip.io:3000/api/org.lms.ehr.GrantAccess';
        return this.http.post(URL, data, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
    }

    updateClinician(data, clinicianId) {
        const url = 'http://103.21.53.11.xip.io:3000/api/org.lms.ehr.Clinician/' + clinicianId;
        return this.http.put(url, data, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
    }

    updatePatient(data, patientId) {
        const url = 'http://103.21.53.11.xip.io:3000/api/org.lms.ehr.Patient/' + patientId;
        return this.http.put(url, data, {
            withCredentials: true,
            headers: {
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

    getAllLaboratory() {
        const URL = 'http://103.21.53.11.xip.io:3000/api/org.lms.ehr.Lab';
        return this.http.get(URL, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
    }

    authorizeLaboratory(data: any) {
        const URL = 'http://103.21.53.11.xip.io:3000/api/org.lms.ehr.GrantAccessToLab';
        return this.http.post(URL, data, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
    }

    unAuthorizedLaboratory(data: any) {
        const URL = 'http://103.21.53.11.xip.io:3000/api/org.lms.ehr.revokeAccessFromLab';
        return this.http.post(URL, data, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
    }

    getMyLaboratory(emailId: any) {       
        const URL = 'http://103.21.53.11.xip.io:3000/api/queries/getMyLabs?patient=' + emailId;
        return this.http.get(URL, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
    }

    isAuthenticated() {
        return this.authToken;
    }
}
