const URL = "http://103.21.53.11.xip.io";
const afterLoginPort = ":3000/";
const beforeLoginPort = ":5000/";

export const method = {
  GET:'GET',  
  POST:'POST',
  PUT:'PUT',
  DELETE:'DELETE',
};

export const ApiUrl = { 
  signUpGooleAuth: URL + beforeLoginPort + "auth/google",
  logoutGooleAuth: URL + beforeLoginPort + "auth/logout",
  signUpFirstDoctor: URL + beforeLoginPort + "api/org.lms.ehr.Clinician",
  signUpFirstPatient: URL + beforeLoginPort + "api/org.lms.ehr.Patient",
  signUpSecond: URL + beforeLoginPort + "api/system/identities/issue",
  signUpThird: URL + afterLoginPort + "api/wallet/import",
  getCurrentUser: URL + afterLoginPort + "api/system/ping",
  checkWallet: URL + afterLoginPort + "api/wallet",
  getPatients: URL + afterLoginPort + "api/org.lms.ehr.Patient",
  getClinicians: URL + afterLoginPort + "api/org.lms.ehr.Clinician",
  getPatientProfile: URL + afterLoginPort + "api/org.lms.ehr.Patient",
  getSearchClinician: URL + afterLoginPort + "api/queries/searchClinician",
};

export const Param = {
  clinicianName: "clinicianName",
}

export const PATTERNS = {
  emailPattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$",
  passwordPattern: "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}",
  numberPattern: "^[0–9]$",
  spacePattern: "/^S*/",
  phoneNoPattern: "^((\\+91-?)|0)?[0-9]{18}$"
};

export const ErrorMessages = {
  FIRST_NAME_REQUIRED: "First Name is required",
  LAST_NAME_REQUIRED: "Last Name is required",
  VALID_EMAIL: "Please enter a valid email address",
  EMAIL_REQUIRED: "Email Name is required",
  CONTACT_NO_REQUIRED: "Contact No is required",
  ADDRESS1_REQUIRED: "Address1 is required",
  CITY_REQUIRED: "City is required",
  STATE_REQUIRED: "County/State is required",
  REGISTRAION_NO_REQUIRED: "Registration Number is required",
  SPECILIZE_REQUIRED: "Specialisation is required",
  MEDICAL_HISTORY_REQUIRED: "Medical History is required",
  ALLERGIES_REQUIRED: "Allergies is required",
  CURRENT_MEDICATION_REQUIRED: "Current Medication is required",
  LAST_CONSULTAION_DATE_REQUIRED: "Last Consultation Date",
  LAST_CONSULTAION_WITH_REQUIRED: "Last Consultation With",
  ACTIVE_HOURS_REQUIRED: "Active Hours In A Week"
};
export function AppUrl() {
    return URL + beforeLoginPort;
}
