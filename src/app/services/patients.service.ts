import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Rx";
import { Patient } from '../models/Patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  patientSubject = new Subject<any[]>();

  constructor(private httpClient: HttpClient) { }

  getPatients(): Observable<Patient[]> {
    return this.httpClient.get<Patient[]>('http://localhost:9010/patients');
  }

  addPatient(newPatient: Patient){
    this.httpClient
      .post('http://localhost:9010/patient',newPatient)
      .subscribe(
        () => {
          console.log('Enregistrement terminé !');
        },
        (error) => {
          console.log('Erreur de sauvegarde !' + error);
        }
      );
  }

}
