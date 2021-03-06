import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {PatientsService} from './services/patients.service';
import {NotesService} from './services/notes.service';

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
import { NotFoundComponent } from './not-found/not-found.component';
import { NoteListComponent } from './note-list/note-list.component';
import { NoteFormComponent } from './note-list/note-form/note-form.component';
import { EditNoteComponent } from './note-list/edit-note/edit-note.component';
import { DiabeteReportComponent } from './diabete-report/diabete-report.component';

const appRoutes: Routes = [
  {path: 'patients', component: PatientListComponent},
  {path: 'patients/:id', component: EditPatientComponent},
  {path: 'report/:id', component: DiabeteReportComponent},
  {path: 'notes/:id', component: NoteListComponent},
  {path: '', component: PatientListComponent},
  {path: 'add-patient', component: PatientFormComponent},
  {path: 'add-note/:iden', component: NoteFormComponent},
  {path: 'edit-note/:patientId/:noteId', component: EditNoteComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    PatientComponent,
    PatientListComponent,
    PatientFormComponent,
    NoteFormComponent,
    HeaderComponent,
    PatientComponent,
    EditPatientComponent,
    NotFoundComponent,
    NoteListComponent,
    NoteFormComponent,
    EditNoteComponent,
    DiabeteReportComponent
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
  providers: [PatientsService,NotesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
