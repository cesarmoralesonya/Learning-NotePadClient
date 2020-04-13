import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Note } from '../models/note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {  
  miApiUrl:string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json; charset=UTF-8'
    })
  };
  constructor(private http: HttpClient) {
    this.miApiUrl = environment.ApiUrl;
  }

  getNotes(): Observable<Note[]>{
    return this.http.get<Note[]>(this.miApiUrl)
                    .pipe(
                      retry(1),
                      catchError(this.errorHandler)
                    );
  }

  getNote(noteId: number): Observable<Note>{
    return this.http.get<Note>(this.miApiUrl + noteId)
                    .pipe(
                      retry(1),
                      catchError(this.errorHandler)
                    );
  }

  saveNote(note:Note): Observable<Note>{
    return this.http.post<Note>(this.miApiUrl, JSON.stringify(note), this.httpOptions)
                    .pipe(
                      retry(1),
                      catchError(this.errorHandler)
                    );
  }

  updateNote(noteId: number, note: Note): Observable<Note>{
    return this.http.put<Note>(this.miApiUrl + noteId, JSON.stringify(note), this.httpOptions)
                    .pipe(
                      retry(1),
                      catchError(this.errorHandler)
                    );
  }

  deleteNote(noteId: number): Observable<Note>{
    return this.http.delete<Note>(this.miApiUrl + noteId)
                    .pipe(
                      retry(1),
                      catchError(this.errorHandler)
                    );
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
