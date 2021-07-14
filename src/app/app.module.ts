import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {PatientsService} from './services/patients.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientFormComponent } from './patient-list/patient-form/patient-form.component';
import { HeaderComponent } from './header/header.component';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from "@angular/common/http";
import { PatientComponent } from './patient/patient.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditPatientComponent } from './patient-list/edit-patient/edit-patient.component';
import {AuthGuard} from "../../../mon-projet-angular/src/app/services/auth-guard.service";
import {SingleAppareilComponent} from "../../../mon-projet-angular/src/app/single-appareil/single-appareil.component";
import { NotFoundComponent } from './not-found/not-found.component';

const appRoutes: Routes = [
  {path: 'patients', component: PatientListComponent},
  {path: 'patients/:id', component: EditPatientComponent},
  {path: '', component: PatientListComponent},
  {path: 'add-patient', component: PatientFormComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    PatientComponent,
    PatientListComponent,
    PatientFormComponent,
    HeaderComponent,
    PatientComponent,
    EditPatientComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule
  ],
  providers: [PatientsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
