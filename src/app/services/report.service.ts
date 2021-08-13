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
export class ReportService {
  patientSubject = new Subject<any[]>();
  private baseUrl = environment.apiUrlReport;

  constructor(private httpClient: HttpClient) { }

  generateReport(id: number): Observable<string>{
    return this.httpClient.get(this.baseUrl + '/assess?patientId=' + id,
      {responseType: 'text'});
  }

  addPatient(newPatient: Patient): Observable<boolean>{
    return this.httpClient
      .post<boolean>(this.baseUrl + '/patient',newPatient).catch(this.handleError);
  }

  updatePatient(id: number,editedPatient: Patient): Observable<boolean>{
    return this.httpClient
      .put<boolean>(this.baseUrl + '/patient/'+id, editedPatient).catch(this.handleError);
  }

  handleError(error: Response) {
    if (error.status == 500 || error.status == 400) {
      return Observable.throw("emptyFields");
    } else {
      return Observable.throw(error);
    }
  }

}
