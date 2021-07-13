import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Patient } from 'src/app/models/Patient.model';
import { PatientsService } from 'src/app/services/patients.service';

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.scss']
})
export class EditPatientComponent implements OnInit {

  patientEditForm!: FormGroup;
  patient: any;
  given: string = '';
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private formBuilder: FormBuilder,
              private patientsService: PatientsService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(){
    this.initForm();
    const id = this.route.snapshot.params['id'];
    this.patientsService.getPatient(+id).pipe(takeUntil(this.destroy$)).subscribe(
      (patient) => {
        this.patient = patient;
        console.log(this.patient);
        console.log(this.patient.given);
      }
    );
  }

  initForm(){
    this.patientEditForm = this.formBuilder.group({
      given: ['',Validators.required],
      family: ['',Validators.required],
      dob: ['',[Validators.required, Validators.pattern("^[0-9]{4}(-)[0-9]{2}(-)[0-9]{2}$")]],
      sex: ['',Validators.required],
      address: [''],
      phone: ['']
    })
  }

  onSubmitForm(){
    const formValue = this.patientEditForm.value;
    const newPatient = new Patient(
      formValue['given'],
      formValue['family'],
      formValue['dob'],
      formValue['sex'],
      formValue['address'] ? formValue['address'] : '',
      formValue['phone'] ? formValue['phone'] : ''
    );
    this.patientsService.addPatient(newPatient);
    this.router.navigate(['/patients']);
  }

}
