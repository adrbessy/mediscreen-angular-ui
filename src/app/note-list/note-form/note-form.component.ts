import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Note } from 'src/app/models/Note.model';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss']
})
export class NoteFormComponent implements OnInit {

  noteForm!: FormGroup;
  id = this.route.snapshot.params['iden'];
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private notesService: NotesService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.noteForm = this.formBuilder.group({
      note: ['',Validators.required]
    })
  }

  onSubmitForm(){
    //const id = this.route.snapshot.params['iden'];
    const formValue = this.noteForm.value;
    const newNote = new Note(
      this.id,
      formValue['note']
    );
    this.createNewNote(newNote);
  }

  createNewNote(newNote: Note) {
    this.notesService.addNote(newNote).pipe(takeUntil(this.destroy$)).subscribe(
      (response) =>
      {
        if (response){
          this.router.navigate(['/notes', this.id]);
        }
      },
      (error) => {
        console.log('Erreur de sauvegarde !' + error);
      }
    );
  }

  returnToNotes(){
    this.router.navigate(['/notes', this.id]);
  }

}
