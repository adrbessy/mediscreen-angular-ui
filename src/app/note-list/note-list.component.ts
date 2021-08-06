import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit {

  @Input() id: string = '';
  @Input() patientId: number = 0;
  @Input() date: string = '';
  @Input() note: string = '';

  destroy$: Subject<boolean> = new Subject<boolean>();
  notes: any[] = [];
  iden = this.route.snapshot.params['id'];

  constructor(private notesService: NotesService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getNotes();
  }

  getNotes() {
    const id = this.route.snapshot.params['id'];
    this.notesService.getNotes(+id).pipe(takeUntil(this.destroy$)).subscribe(
      (notes) =>
      {
        this.notes = notes;
      }
    );
  }

  addNote(){
    this.router.navigate(['/add-note', this.iden]);
  }

  goToEdit(noteId: string, patientId: number){
    this.router.navigate(['/edit-note', patientId, noteId]);
  }

  goToDelete(noteId: string){
    if(confirm("Are you sure to delete this note")) {
      console.log("Put a message here.");
      this.notesService.deleteNote(noteId).pipe(takeUntil(this.destroy$)).subscribe(
        (reponse) =>
        {
          console.log("Yes!");
          location.reload();
        },
        (error) => {
          console.log('Erreur de sauvegarde !' + error);
        }
      );
    }
  }

}
