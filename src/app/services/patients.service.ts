import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Rx";
import { Patient } from '../models/Patient.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  patientSubject = new Subject<any[]>();

  constructor(private httpClient: HttpClient) { }

  getPatients(): Observable<Patient[]> {
    return this.httpClient.get<Patient[]>('http://localhost:9010/patients');
  }

  getPatient(id: number){
    const httpParams = new HttpParams({
      fromObject: {
        id: id
      }
    });
    return this.httpClient.get('http://localhost:9010/patient', {params: httpParams});
  }

  addPatient(newPatient: Patient): Observable<boolean>{
    return this.httpClient
      .post<boolean>('http://localhost:9010/patient',newPatient);
  }

  updatePatient(id: number,editedPatient: Patient): Observable<boolean>{
    return this.httpClient
      .put<boolean>('http://localhost:9010/patient/'+id, editedPatient);
  }

}
