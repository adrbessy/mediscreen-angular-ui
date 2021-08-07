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
  patientAlreadySaved: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private patientsService: PatientsService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(){
    const id = this.route.snapshot.params['id'];
    this.patientsService.getPatient(+id).pipe(takeUntil(this.destroy$)).subscribe(
      (patient) => {
        this.patient = patient;
        this.initForm(this.patient);
      }
    );
  }

  initForm(patient: any){
    this.patientEditForm = this.formBuilder.group({
      given: [patient.given,Validators.required],
      family: [patient.family,Validators.required],
      dob: [patient.dob,[Validators.required, Validators.pattern("^[0-9]{4}(-)[0-9]{2}(-)[0-9]{2}$")]],
      sex: [patient.sex,Validators.required],
      address: [patient.address],
      phone: [patient.phone]
    })
  }

  onSubmitForm(){
    const id = this.route.snapshot.params['id'];
    const formValue = this.patientEditForm.value;
    const updatedPatient = new Patient(
      formValue['given'],
      formValue['family'],
      formValue['dob'],
      formValue['sex'],
      formValue['address'] ? formValue['address'] : '',
      formValue['phone'] ? formValue['phone'] : ''
    );
    this.updatePatient(id, updatedPatient);
  }

  updatePatient(id: number, updatedPatient: Patient) {
    this.patientsService.updatePatient(id,updatedPatient).pipe(takeUntil(this.destroy$)).subscribe(
      (response) =>
      {
        if (response){
          this.router.navigate(['/patients']);
        }
      },
      (error) => {
        console.log('Error of edition !');
        if(error!="emptyFields"){
          this.patientAlreadySaved = true;
        }
      }
    );
  }

}
