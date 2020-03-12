import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
  createTodo,
  createTodoResult,
  deleteTodo,
  deleteTodoResult,
  editTodo,
  editTodoResult,
  fetchTodos,
  fetchTodosResult,
} from './todos-actions';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
import { of } from 'rxjs';
import { Action } from '@ngrx/store';

@Injectable()
export class TodosEffects {
  fetchTodos$ = createEffect(() =>
    this.actions.pipe(
      ofType(fetchTodos),
      switchMap(() =>
        this.todoService.getTodos().pipe(
          map((todoItems: Todo[]) => fetchTodosResult({ todoItems })),
          catchError(() => of(fetchTodosResult({ todoItems: [] }))),
        ),
      ),
    ),
  );

  createTodo$ = createEffect(() =>
    this.actions.pipe(
      ofType(createTodo),
      switchMap((action: any) =>
        this.todoService.addTodo(action.todo).pipe(
          map((todo: Todo) => createTodoResult({ todo })),
          catchError(() => of(createTodoResult({ todo: null }))),
        ),
      ),
    ),
  );

  deleteTodo$ = createEffect(() =>
    this.actions.pipe(
      ofType(deleteTodo),
      switchMap(action =>
        this.todoService.deleteTodo(action.todoId).pipe(
          map((todo: Todo) => deleteTodoResult({ todoId: action.todoId })),
          catchError(() => of(deleteTodoResult({ todoId: null }))),
        ),
      ),
    ),
  );

  editTodo$ = createEffect(() =>
    this.actions.pipe(
      ofType(editTodo),
      switchMap((action: any) =>
        this.todoService.editTodo(action.todo).pipe(
          map((todo: Todo) => editTodoResult({ todo })),
          catchError(() => of(editTodoResult({ todo: null }))),
        ),
      ),
    ),
  );

  constructor(private actions: Actions, private todoService: TodoService) {}
}
