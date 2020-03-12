import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Todo } from '../models/todo';
import { noop } from 'rxjs';

const mockTodos: Todo[] = [
  {
    id: 1,
    description: 'mock description',
    category: 'mock category',
    label: 'mock label',
    done: false,
  },
];

describe('TodoService', () => {
  let service: TodoService;
  let httpMock: HttpTestingController;
  const baseUrl = 'http://localhost:3000/tasks/';
  const errorBody = { errorMessage: 'mock error message' };
  const mockErrorResponse = { status: 400, statusText: 'Bad Request' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.get(TodoService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get todos', () => {
    service.getTodos().subscribe(todos => {
      expect(todos).toEqual(mockTodos);
    });

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockTodos);
    httpMock.verify();
  });

  it('should get todos and pass on error', () => {
    service.getTodos().subscribe(noop, response => {
      expect(response.error).toEqual(errorBody);
    });

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('GET');
    req.flush(errorBody, mockErrorResponse);
    httpMock.verify();
  });

  it('should add todo', () => {
    service.addTodo(mockTodos[0]).subscribe(todos => {
      expect(todos).toEqual(mockTodos[0]);
    });

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('POST');
    req.flush(mockTodos[0]);
    httpMock.verify();
  });

  it('should add todo and pass on error', () => {
    service.addTodo(mockTodos[0]).subscribe(noop, response => {
      expect(response.error).toEqual(errorBody);
    });

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('POST');
    req.flush(errorBody, mockErrorResponse);
    httpMock.verify();
  });

  it('should edit todo', () => {
    service.editTodo(mockTodos[0]).subscribe(todo => {
      expect(todo).toEqual(mockTodos[0]);
    });

    const req = httpMock.expectOne(baseUrl + mockTodos[0].id);
    expect(req.request.method).toBe('PATCH');
    req.flush(mockTodos[0]);
    httpMock.verify();
  });

  it('should edit todo pass on error', () => {
    service.editTodo(mockTodos[0]).subscribe(noop, response => {
      expect(response.error).toEqual(errorBody);
    });

    const req = httpMock.expectOne(baseUrl + mockTodos[0].id);
    expect(req.request.method).toBe('PATCH');
    req.flush(errorBody, mockErrorResponse);
    httpMock.verify();
  });

  it('should delete todo', () => {
    service.deleteTodo(mockTodos[0].id).subscribe(todo => {
      expect(todo).toEqual({});
    });

    const req = httpMock.expectOne(baseUrl + mockTodos[0].id);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
    httpMock.verify();
  });

  it('should delete todo pass on error', () => {
    service.deleteTodo(mockTodos[0].id).subscribe(noop, response => {
      expect(response.error).toEqual(errorBody);
    });

    const req = httpMock.expectOne(baseUrl + mockTodos[0].id);
    expect(req.request.method).toBe('DELETE');
    req.flush(errorBody, mockErrorResponse);
    httpMock.verify();
  });
});
