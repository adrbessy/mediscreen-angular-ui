import { Component, OnInit } from '@angular/core';
import { PatientsService } from 'src/app/services/patients.service';
import {AppareilService} from "../../../../../mon-projet-angular/src/app/services/appareil.service";
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {User} from "../../../../../mon-projet-angular/src/app/models/User.model";
import {Router} from "@angular/router";
import { Patient } from 'src/app/models/Patient.model';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss']
})
export class PatientFormComponent implements OnInit {

  patientForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private patientsService: PatientsService,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.patientForm = this.formBuilder.group({
      given: ['',Validators.required],
      family: ['',Validators.required],
      dob: ['',[Validators.required, Validators.pattern("^[0-9]{4}(-)[0-9]{2}(-)[0-9]{2}$")]],
      sex: ['',Validators.required],
      address: [''],
      phone: ['']
    })
  }

  onSubmitForm(){
    const formValue = this.patientForm.value;
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
