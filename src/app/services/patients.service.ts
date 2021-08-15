import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Rx";
import { Patient } from '../models/Patient.model';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  patientSubject = new Subject<any[]>();
  private baseUrl = environment.apiUrlPatient;

  constructor(private httpClient: HttpClient) { }

  getPatients(): Observable<Patient[]> {
    return this.httpClient.get<Patient[]>(this.baseUrl + '/patients');
  }

  getPatient(id: number){
    const httpParams = new HttpParams({
      fromObject: {
        id: id
      }
    });
    return this.httpClient.get(this.baseUrl + '/patient', {params: httpParams});
  }

  addPatient(newPatient: Patient): Observable<boolean>{
    return this.httpClient
      .post<boolean>(this.baseUrl + '/patient',newPatient).catch(this.handleError);
  }

  updatePatient(id: number,editedPatient: Patient): Observable<boolean>{
    return this.httpClient
      .put<boolean>(this.baseUrl + '/patient/'+id, editedPatient).catch(this.handleError);
  }

  deletePatient(id: number){
    const httpParams = new HttpParams({
      fromObject: {
        id: id
      }
    });
    return this.httpClient.delete(this.baseUrl + '/patient', {params: httpParams});
  }

  handleError(error: Response) {
    if (error.status == 400) {
      return Observable.throw("emptyFields");
    } else {
      return Observable.throw(error);
    }
  }

}
