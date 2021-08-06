import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Rx";
import { Note } from '../models/Note.model';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Patient } from '../models/Patient.model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  patientSubject = new Subject<any[]>();
  private baseUrl = environment.apiUrlNote;

  constructor(private httpClient: HttpClient) { }

  getNotes(patientId: number): Observable<Patient[]>{
    const httpParams = new HttpParams({
      fromObject: {
        patientId: patientId
      }
    });
    return this.httpClient.get<Patient[]>(this.baseUrl + '/notes', {params: httpParams});
  }

  addNote(newNote: Note): Observable<boolean>{
    return this.httpClient
      .post<boolean>(this.baseUrl + '/note',newNote);
  }

  getNote(id: string){
    const httpParams = new HttpParams({
      fromObject: {
        id: id
      }
    });
    return this.httpClient.get(this.baseUrl + '/note', {params: httpParams});
  }

  updateNote(id: String, editedNote: Note): Observable<boolean>{
    return this.httpClient
      .put<boolean>(this.baseUrl + '/note/'+id, editedNote);
  }

  deleteNote(id: string){
    const httpParams = new HttpParams({
      fromObject: {
        id: id
      }
    });
    return this.httpClient.delete(this.baseUrl + '/note', {params: httpParams});
  }

}
