import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class PatientsService {
  patientSubject = new Subject<any[]>();

  private patients = [
    {
      id: 0,
      given: 'Adrien',
      family: 'Bessy',
      dob: '1988/06/16',
      sex: 'M'
    }
  ];

  constructor(private httpClient: HttpClient) { }

  emitPatientSubject(){
    this.patientSubject.next(this.patients.slice());
  }

  getPatientById(id: number) {
    const patient = this.patients[id];
    return patient;
  }

  getAppareilsFromServer(){
    this.httpClient
      .get<any[]>('http://localhost:9010/patients')
      .subscribe(
        (response) => {
          this.patients = response;
          this.emitPatientSubject();
        },
        (error) => {
          console.log('Erreur de chargement ! ' + error);
        }
      );
  }

}
