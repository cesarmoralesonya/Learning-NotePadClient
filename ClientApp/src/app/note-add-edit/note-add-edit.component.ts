import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { NoteService } from '../services/note.service';
import { Note } from '../models/note';

@Component({
  selector: 'app-note-add-edit',
  templateUrl: './note-add-edit.component.html',
  styleUrls: ['./note-add-edit.component.scss']
})
export class NoteAddEditComponent implements OnInit {
  form: FormGroup;
  actionType: string;
  formTitle: string;
  formBody: string;
  noteId: number;
  errorMsg: any;
  existingNote: Note;

  constructor(private noteService: NoteService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router ) {
    const idParam = 'id';
    this.actionType = 'Add';
    this.formTitle = 'title';
    this.formBody = 'body';
    if (this.avRoute.snapshot.params[idParam]) {
      this.noteId = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group(
      {
        noteId: 0,
        title: ['', [Validators.required]],
        body: ['', [Validators.required]],
      }
    )
  }

  ngOnInit(): void {
    if (this.noteId > 0) {
      this.actionType = 'Edit';
      this.noteService.getNote(this.noteId)
        .subscribe(data => (
          this.existingNote = data,
          this.form.controls[this.formTitle].setValue(data.title),
          this.form.controls[this.formBody].setValue(data.body)
        ));
    }
  }

  save() {
    if (!this.form.valid) {
      return;
    }

    if (this.actionType === 'Add') {
      let note: Note = {
        dateTime: new Date(),
        title: this.form.get(this.formTitle).value,
        body: this.form.get(this.formBody).value
      };

      this.noteService.saveNote(note)
        .subscribe((data) => {
          this.router.navigate(['/note', data.id]);
        });
    }

    if (this.actionType === 'Edit') {
      let note: Note = {
        id: this.existingNote.id,
        dateTime: this.existingNote.dateTime,
        title: this.form.get(this.formTitle).value,
        body: this.form.get(this.formBody).value
      };
      this.noteService.updateNote(note.id, note)
        .subscribe((data) => {
          this.router.navigate(['/note', note.id]);
        });
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }

  get title() { return this.form.get(this.formTitle); }
  get body() { return this.form.get(this.formBody); }
}
