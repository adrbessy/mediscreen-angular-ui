import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private notesService: NotesService,
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

}
