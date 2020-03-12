import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../models/todo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoApiUrl = 'http://localhost:3000/tasks/';
  constructor(private httpClient: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.httpClient.get(this.todoApiUrl) as Observable<Todo[]>;
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.httpClient.post(this.todoApiUrl, todo) as Observable<Todo>;
  }

  editTodo(todo: Todo): Observable<Todo> {
    return this.httpClient.patch(this.todoApiUrl + todo.id, todo) as Observable<
      Todo
    >;
  }

  deleteTodo(todoId: number): Observable<any> {
    return this.httpClient.delete(this.todoApiUrl + todoId);
  }
}
