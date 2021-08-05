import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Note } from 'src/app/models/Note.model';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss']
})
export class NoteFormComponent implements OnInit {

  noteForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.noteForm = this.formBuilder.group({
      note: ['',Validators.required]
    })
  }

  onSubmitForm(){
    const id = this.route.snapshot.params['iden'];
    const formValue = this.noteForm.value;
    const newNote = new Note(
      formValue['patientId'],
      id
    );
    //this.createNewNote(newNote);
  }

}
