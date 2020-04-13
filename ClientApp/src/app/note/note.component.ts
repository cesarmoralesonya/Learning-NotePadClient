import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { NoteService } from '../services/note.service';
import { Note } from '../models/note';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  note$: Observable<Note>;
  noteId: number;

  constructor(private noteService: NoteService, private avRoute: ActivatedRoute) {
    const idParam = 'id';
    if(this.avRoute.snapshot.params[idParam]){
      this.noteId = this.avRoute.snapshot.params[idParam];
    }
   }

  ngOnInit(): void {
    this.loadNote();
  }

  loadNote(){
    this.note$ = this.noteService.getNote(this.noteId);
  }

}
