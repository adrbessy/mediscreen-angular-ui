import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Note } from 'src/app/models/Note.model';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss']
})
export class EditNoteComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();
  noteEditForm!: FormGroup;
  note: any;
  patientId = this.route.snapshot.params['patientId'];

  constructor(private formBuilder: FormBuilder,
              private notesService: NotesService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(){
    const noteId = this.route.snapshot.params['noteId'];
    this.notesService.getNote(noteId).pipe(takeUntil(this.destroy$)).subscribe(
      (note) => {
        this.note = note;
        this.initForm(this.note);
      }
    );
  }

  initForm(note: any){
    this.noteEditForm = this.formBuilder.group({
      note: [note.note,Validators.required]
    })
  }

  onSubmitForm(){
    const noteId = this.route.snapshot.params['noteId'];
    const formValue = this.noteEditForm.value;
    const updatedNote = new Note(
      1,
      formValue['note']
    );
    this.updateNote(noteId, updatedNote);
  }

  updateNote(id: String, updatedNote: Note) {
    this.notesService.updateNote(id,updatedNote).pipe(takeUntil(this.destroy$)).subscribe(
      (response) =>
      {
        if (response){
          this.router.navigate(['/notes', this.patientId]);
        }
      },
      (error) => {
        console.log('Error of edition !');
      }
    );
  }

  returnToNotes(){
    this.router.navigate(['/notes', this.patientId]);
  }

}
