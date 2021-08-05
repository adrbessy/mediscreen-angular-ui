import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Rx";
import { Note } from '../models/Note.model';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  patientSubject = new Subject<any[]>();
  private baseUrl = environment.apiUrlNote;

  constructor(private httpClient: HttpClient) { }

  getNotes(patientId: number){
    const httpParams = new HttpParams({
      fromObject: {
        patientId: patientId
      }
    });
    return this.httpClient.get(this.baseUrl + '/notes', {params: httpParams});
  }

}
