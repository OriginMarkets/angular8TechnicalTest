import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoFormComponent } from './todo-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { initialTodosState, TodosState } from '../../store/todos.state';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { editTodo, openEditTodo, createTodo } from '../../store/todos-actions';
import { Store } from '@ngrx/store';
import { FormTodo, Todo } from '../../models/todo';

describe('TodoFormComponent', () => {
  let component: TodoFormComponent;
  let fixture: ComponentFixture<TodoFormComponent>;
  let store: MockStore<TodosState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatCardModule,
      ],
      providers: [
        provideMockStore({
          initialState: initialTodosState,
        }),
      ],
      declarations: [TodoFormComponent],
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should cancel editing', () => {
    spyOn(store, 'dispatch');
    component.cancel();
    expect(store.dispatch).toHaveBeenCalledWith(openEditTodo({ todoId: null }));
  });

  it('should submit form and dispatch editTodo action', () => {
    component.editMode = true;
    component.initialValues = {
      id: 1,
      category: 'mock category',
      done: false,
      label: 'mock label',
      description: 'mock description',
    };
    const editedTodo: FormTodo = {
      category: 'edited category',
      label: 'edited label',
      description: 'edited description',
    };
    spyOn(store, 'dispatch');
    component.todoForm.setValue(editedTodo);
    component.onSubmit();
    expect(store.dispatch).toHaveBeenCalledWith(
      editTodo({
        todo: {
          ...editedTodo,
          done: component.initialValues.done,
          id: component.initialValues.id,
        },
      }),
    );
  });

  it('should submit form and dispatch addTodo action', () => {
    const createdTodo: FormTodo = {
      category: 'edited category',
      label: 'edited label',
      description: 'edited description',
    };
    spyOn(store, 'dispatch');
    component.todoForm.setValue(createdTodo);
    component.onSubmit();
    expect(store.dispatch).toHaveBeenCalledWith(
      createTodo({
        todo: createdTodo,
      }),
    );
  });

  it('submit button should be Save when in edit mode', () => {
    component.editMode = true;
    component.ngOnInit();
    expect(component.submitLabel).toEqual('Save');
  });

  it('submit button should be Add when NOT in edit mode', () => {
    component.ngOnInit();
    expect(component.submitLabel).toEqual('Add');
  });
});
