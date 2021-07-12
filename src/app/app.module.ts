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

const appRoutes: Routes = [
  {path: 'patients', component: PatientListComponent},
  {path: '', component: PatientListComponent},
  {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  declarations: [
    AppComponent,
    PatientListComponent,
    PatientFormComponent,
    HeaderComponent,
    PatientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [PatientsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
