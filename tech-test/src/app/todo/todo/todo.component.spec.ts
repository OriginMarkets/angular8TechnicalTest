import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { TodoComponent } from './todo.component';
import { categoryFilterPipe} from '../../pipes/category-filter.pipe';
import {TodoService} from '../../services/todo.service';
import { of, throwError } from 'rxjs';
import { Todo } from '../../models/todo';
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
const itemId = 3;
const newTodo = {"label":"test todo","description":"test desc","category":"House","done":false};
const updatedTodo = {
  "label": "test todo",
  "description": "test desc",
  "category": "House",
  "done": true,
  "id": 8
};
describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  let todoService: TodoService;
  let addButton;
  class mockTodoService {
    getAll() {
      return of(mockTodosWithData);
    }
    getById(itemId) {
      return of(mockTodosWithData[0]);
    }
    add(todo:Todo){
      return of(newTodo);
    }
    update(change) {
      return of(updatedTodo);
    }
    delete(id){
     return of({});
    }
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [ TodoComponent, categoryFilterPipe ],
      providers: [{provide: TodoService, useClass: mockTodoService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    todoService = TestBed.get(TodoService);
    addButton = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should load the todo list on page load', () => {
    spyOn(todoService, 'getAll').and.callThrough();
    component.ngOnInit();
    expect(todoService.getAll).toHaveBeenCalled();
    expect(component.todos).toEqual(mockTodosWithData);
  });
  it('should disable add task button if form is invalid', () => {
    component.newTask.setValue({
      label:'',
      description:'',
      category: 'General'
    });
    expect(component.newTask.valid).toBeFalsy();
    expect(addButton.querySelector('#btn-add-task').disabled).toBeTruthy();
  });
  it('"onAdd()" should add new task to the list if form is valid', () => {
    component.todos = [];
    component.newTask.setValue({
      label:'new task',
      description:'test desc',
      category: 'General',
    });
    const newTask = component.newTask.value;
    newTask.done = false;
    spyOn(todoService, 'add').and.callThrough();
    component.onAdd();
    expect(component.todos.length).toBeGreaterThanOrEqual(1);
  });
  it('"clearTask()" should clear the form', () => {
    component.newTask.setValue({
      label:'new task',
      description:'test desc',
      category: 'House',
    });
    component.clearTask();
    expect(component.newTask.value.label).toEqual('');
    expect(component.newTask.value.description).toEqual('');
    expect(component.newTask.value.category).toEqual('General');
  });
  it('"removeTask()" should delete selected task', () => {
    const id = 3;
    spyOn(todoService, 'delete').and.callThrough();
    component.removeTask(0,id);
    expect(todoService.delete).toHaveBeenCalled();
  });
  it('"changeStatus()" should update the status of the task to done', () => {
    const id = 3;
    spyOn(todoService, 'update').and.callThrough();
    component.changeStatus(true, 3);
    expect(todoService.update).toHaveBeenCalled();
  });
});
