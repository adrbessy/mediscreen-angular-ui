import { Component, Input, OnInit } from '@angular/core';
import { PatientsService } from '../services/patients.service';
import {Subscription} from "rxjs/Subscription";
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

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

  constructor(private patientsService: PatientsService,
              private router: Router) { }

  destroy$: Subject<boolean> = new Subject<boolean>();

  ngOnInit(){
    this.getAllPatients();
  }

  getAllPatients() {
    this.patientsService.getPatients().pipe(takeUntil(this.destroy$)).subscribe(
      (patients) =>
      {
        this.patients = patients;
      }
    );
  }

  goToNotes(id: number){
    this.router.navigate(['/notes', id]);
  }


}
