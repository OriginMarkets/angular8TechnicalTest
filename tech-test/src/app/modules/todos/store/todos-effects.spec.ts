import { async, TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { StoreModule } from '@ngrx/store';
import { hot, cold } from 'jasmine-marbles';

import { throwError } from 'rxjs';
import { provideMockStore } from '@ngrx/store/testing';
import { FormTodo, Todo } from '../models/todo';
import { TodosEffects } from './todos-effects';
import { TodoService } from '../services/todo.service';
import { todosReducer } from './todos.reducer';
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

const mockTodos = [
  {
    id: 0,
    label: 'mock label 0',
    category: 'category 0',
  },
  {
    id: 1,
    label: 'mock label 1',
    category: 'category 1',
  },
] as Todo[];

class TodoServiceMock {
  getTodos() {
    return of(mockTodos);
  }

  addTodo(todo: Todo) {}

  editTodo(todo: Todo): Observable<Todo> {
    return of(mockTodos[1]);
  }

  deleteTodo(todoId: number) {
    return of({});
  }
}

describe('Login Effects', () => {
  let effects: TodosEffects;
  let actions: Observable<any>;
  let todoService: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(todosReducer)],
      providers: [
        TodosEffects,
        provideMockActions(() => actions),
        {
          provide: TodoService,
          useClass: TodoServiceMock,
        },
      ],
    });

    effects = TestBed.get(TodosEffects);
    todoService = TestBed.get(TodoService);
  });

  it('should fetch todos', () => {
    spyOn(todoService, 'getTodos').and.callThrough();
    actions = hot('--a-', {
      a: fetchTodos(),
    });
    const expected = cold('--b', {
      b: fetchTodosResult({ todoItems: mockTodos }),
    });

    expect(effects.fetchTodos$).toBeObservable(expected);
    expect(todoService.getTodos).toHaveBeenCalledWith();
  });

  it('should fetch todos and handle errors', () => {
    spyOn(todoService, 'getTodos').and.returnValue(throwError({}));
    actions = hot('--a-', {
      a: fetchTodos(),
    });
    const expected = cold('--b', {
      b: fetchTodosResult({ todoItems: [] }),
    });

    expect(effects.fetchTodos$).toBeObservable(expected);
    expect(todoService.getTodos).toHaveBeenCalledWith();
  });

  it('should edit todo', () => {
    const editedTodo = { id: 0, done: true };
    spyOn(todoService, 'editTodo').and.callThrough();
    actions = hot('--a-', {
      a: editTodo({ todo: editedTodo }),
    });
    const expected = cold('--b', {
      b: editTodoResult({ todo: mockTodos[1] }),
    });
    expect(effects.editTodo$).toBeObservable(expected);
    expect(todoService.editTodo).toHaveBeenCalledWith(editedTodo);
  });

  it('should edit todo and handle error', () => {
    const editedTodo = { id: 0, done: true };
    spyOn(todoService, 'editTodo').and.returnValue(throwError({}));
    actions = hot('--a-', {
      a: editTodo({ todo: editedTodo }),
    });
    const expected = cold('--b', {
      b: editTodoResult({ todo: null }),
    });
    expect(effects.editTodo$).toBeObservable(expected);
    expect(todoService.editTodo).toHaveBeenCalledWith(editedTodo);
  });

  it('should create todo', () => {
    const newTodo = {
      label: 'new label',
      category: 'new category',
    } as Todo;
    spyOn(todoService, 'addTodo').and.returnValue(of(newTodo));
    actions = hot('--a-', {
      a: createTodo({ todo: newTodo }),
    });
    const expected = cold('--b', {
      b: createTodoResult({ todo: newTodo }),
    });
    expect(effects.createTodo$).toBeObservable(expected);
    expect(todoService.addTodo).toHaveBeenCalledWith(newTodo);
  });

  it('should create todo and handle errors', () => {
    const newTodo = {
      label: 'new label',
      category: 'new category',
    } as Todo;
    spyOn(todoService, 'addTodo').and.returnValue(throwError({}));
    actions = hot('--a-', {
      a: createTodo({ todo: newTodo }),
    });
    const expected = cold('--b', {
      b: createTodoResult({ todo: null }),
    });
    expect(effects.createTodo$).toBeObservable(expected);
    expect(todoService.addTodo).toHaveBeenCalledWith(newTodo);
  });

  it('should delete todo', () => {
    spyOn(todoService, 'deleteTodo').and.callThrough();
    actions = hot('--a-', {
      a: deleteTodo({ todoId: 0 }),
    });
    const expected = cold('--b', {
      b: deleteTodoResult({ todoId: 0 }),
    });
    expect(effects.deleteTodo$).toBeObservable(expected);
    expect(todoService.deleteTodo).toHaveBeenCalledWith(0);
  });

  it('should delete todo and handle errors', () => {
    spyOn(todoService, 'deleteTodo').and.returnValue(throwError({}));
    actions = hot('--a-', {
      a: deleteTodo({ todoId: 0 }),
    });
    const expected = cold('--b', {
      b: deleteTodoResult({ todoId: null }),
    });
    expect(effects.deleteTodo$).toBeObservable(expected);
    expect(todoService.deleteTodo).toHaveBeenCalledWith(0);
  });
});
