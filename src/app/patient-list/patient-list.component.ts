import { Component, OnInit } from '@angular/core';
import { PatientsService } from '../services/patients.service';
import {Subscription} from "rxjs/Subscription";
import {AppareilService} from "../../../../mon-projet-angular/src/app/services/appareil.service";

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {

  patients: any[] = [];

 patientSubscription: Subscription = new Subscription;

  constructor(private patientsService: PatientsService) { }

  ngOnInit(){
    this.patientSubscription = this.patientsService.patientSubject.subscribe(
      (patients: any[]) => {
        this.patients = patients;
      }
    );
    this.patientsService.emitPatientSubject();
  }

  onFetch() {
    this.patientsService.getAppareilsFromServer();
  }

}
