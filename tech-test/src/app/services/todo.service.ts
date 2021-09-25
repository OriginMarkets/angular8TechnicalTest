import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Todo } from '../models/todo';
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  apiBaseUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  /**
   * Return the todo list
   */
  getAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.apiBaseUrl}/tasks`)
      .pipe(catchError(this.errorHandler));
  }
  /**
   * Return a todo by id
   */
  getById(id): Observable<Todo| {}> {
    return this.http.get<Todo>(`${this.apiBaseUrl}/tasks/${id}`)
      .pipe(catchError(this.errorHandler));
  }
  /**
   * Add a new todo
   */
  add(todo:Todo): Observable<any>{
    return this.http.post<Todo>(`${this.apiBaseUrl}/tasks`, todo)
    .pipe(catchError(this.errorHandler));
  }
  /**
   * Update a todo
   */
  update(id,change): Observable<any>{
    return this.http.patch(`${this.apiBaseUrl}/tasks/${id}`, change)
    .pipe(catchError(this.errorHandler));
  }
  delete(id): Observable<any>{
    return this.http.delete(`${this.apiBaseUrl}/tasks/${id}`,)
    .pipe(catchError(this.errorHandler));
  }
  private errorHandler(error: HttpErrorResponse) {
    return throwError('Something bad happened; please try again later.');
  }
}
