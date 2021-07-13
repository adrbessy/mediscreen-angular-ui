import { Component, Input, OnInit } from '@angular/core';
import { PatientsService } from '../services/patients.service';
import {Subscription} from "rxjs/Subscription";
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})

export class PatientListComponent implements OnInit {

  @Input() id: number = 0;
  @Input() given: string = '';
  @Input() family: string = '';
  @Input() dob: string = '';
  @Input() sex: string = '';
  @Input() address: string = '';
  @Input() phone: string = '';

  patients: any[] = [];

 patientSubscription: Subscription = new Subscription;

  constructor(private patientsService: PatientsService) { }

  destroy$: Subject<boolean> = new Subject<boolean>();

  ngOnInit(){
    /*
    this.patientSubscription = this.patientsService.patientSubject.subscribe(
      (patients: any[]) => {
        this.patients = patients;
      }
    );
    this.patientsService.emitPatientSubject();
     */
    this.getAllPatients();
  }

  onFetch() {
    this.patientsService.getPatientsFromServer();
  }
  getAllPatients() {
    this.patientsService.getPatients().pipe(takeUntil(this.destroy$)).subscribe(
      (patients) =>
    {
      this.patients = patients;
    }
    );
  }


}
