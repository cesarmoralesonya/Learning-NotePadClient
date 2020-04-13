import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NoteService } from '../services/note.service';
import { Note } from '../models/note';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  notes$: Observable<Note[]>;
  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
    this.loadNotes();
  }

  loadNotes(){
    this.notes$ = this.noteService.getNotes();
  }

  delete(noteId){
    const ans = confirm("Quieres borrar la nota: " + noteId);
    if(ans){
      this.noteService.deleteNote(noteId).subscribe((data) => this.loadNotes());
    }
  }
}