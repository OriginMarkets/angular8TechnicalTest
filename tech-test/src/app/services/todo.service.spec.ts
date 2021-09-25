import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TodoService } from './todo.service';

const mockTodosWithData = [
  {
    "id": 3,
    "label": "Bank Appointment",
    "description": "open bank account",
    "category": "Personal",
    "done": false
  },
  {
    "label": "buy groceries",
    "description": "go and buy\n",
    "category": "General",
    "done": false,
    "id": 4
  },
];
const mockTodoEmpty = [];
const newTodo = {"label":"test todo","description":"test desc","category":"House","done":false};
const addedTodo = {"id":7, "label":"test todo","description":"test desc","category":"House","done":false};
const apiBaseUrl = 'http://localhost:3000';
const updateReq = {
  done: true
}
const updatedTodo = {
  "label": "test todo",
  "description": "test desc",
  "category": "House",
  "done": true,
  "id": 8
};
describe('TodoService', () => {
  let service: TodoService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.get(TodoService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: TodoService = TestBed.get(TodoService);
    expect(service).toBeTruthy();
  });
  it('"getAll()" should fetch all todos, if todo list present', () => {
    service.getAll().subscribe((res) => {
      expect(res.length).toBeGreaterThan(0);
      expect(res).toEqual(mockTodosWithData);
    });
    const req = httpMock.expectOne(`${apiBaseUrl}/tasks`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTodosWithData);
  });
  it('"getAll()" should fetch empty list if no tasks exist', () => {
    service.getAll().subscribe((res) => {
      expect(res.length).toEqual(0);
      expect(res).toEqual(mockTodoEmpty);
    });
    const req = httpMock.expectOne(`${apiBaseUrl}/tasks`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTodoEmpty);
  });
  it('"getById()" should fetch details of given id', () => {
    service.getById(3).subscribe((res) => {
      expect(Object.keys(res)).toContain('id');
      expect(Object.keys(res)).toContain('label');
      expect(Object.keys(res)).toContain('done');
      expect(res).toEqual(mockTodosWithData[0]);
    });
    const req = httpMock.expectOne(`${apiBaseUrl}/tasks/3`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTodosWithData[0]);
  });
  it('"getById()" should return empty object if task with given id dont exist', () => {
    service.getById(34).subscribe((res) => {
      expect(res).toEqual({});
    });
    const req = httpMock.expectOne(`${apiBaseUrl}/tasks/34`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });
  it('"add()" should add new task to todo list', () => {

    service.add(newTodo).subscribe((res) => {
      expect(Object.keys(res)).toContain('id');
    });
    const req = httpMock.expectOne(`${apiBaseUrl}/tasks`);
    expect(req.request.method).toBe('POST');
    req.flush(addedTodo);
  });
  it('"update()" should update existing task by given id. mark as done', () => {

    service.update(8,updateReq).subscribe((res) => {
      expect(Object.keys(res)).toContain('done');
      expect(res.done).toEqual(true);
    });
    const req = httpMock.expectOne(`${apiBaseUrl}/tasks/8`);
    expect(req.request.method).toBe('PATCH');
    req.flush(updatedTodo);
  });
  it('"update()" should update existing task by given id. undo completed task', () => {

    service.update(7,{done: false}).subscribe((res) => {
      expect(Object.keys(res)).toContain('done');
      expect(res.done).toEqual(false);
    });
    const req = httpMock.expectOne(`${apiBaseUrl}/tasks/7`);
    expect(req.request.method).toBe('PATCH');
    req.flush({
      "label": "test todo",
      "description": "test desc",
      "category": "House",
      "done": false,
      "id": 7
    });
  });
  it('"delete()" should remove task by given id', () => {
    service.delete(7).subscribe((res) => {
      expect(res).toEqual({});
    });
    const req = httpMock.expectOne(`${apiBaseUrl}/tasks/7`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
