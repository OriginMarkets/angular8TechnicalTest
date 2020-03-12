import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoItemComponent } from './todo-item.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { initialTodosState, TodosState } from '../../store/todos.state';
import { Store } from '@ngrx/store';
import { deleteTodo, editTodo, openEditTodo } from '../../store/todos-actions';
import { ToggleTodo } from '../../models/todo';

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;
  let store: MockStore<TodosState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCheckboxModule,
        MatChipsModule,
        MatIconModule,
        MatListModule,
      ],
      providers: [
        provideMockStore({
          initialState: initialTodosState,
        }),
      ],
      declarations: [TodoItemComponent],
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('editTodo() should dispatch the correct action', () => {
    spyOn(store, 'dispatch');
    component.editTodo(1);
    expect(store.dispatch).toHaveBeenCalledWith(openEditTodo({ todoId: 1 }));
  });

  it('toggleTodo() should dispatch the correct action', () => {
    const toggleTodo: ToggleTodo = {
      id: 1,
      done: true,
    };
    spyOn(store, 'dispatch');
    component.toggleTodo(toggleTodo);
    expect(store.dispatch).toHaveBeenCalledWith(
      editTodo({ todo: { ...toggleTodo, done: false } }),
    );
  });

  it('deleteTodo() should dispatch the correct action', () => {
    spyOn(store, 'dispatch');
    component.deleteTodo(1);
    expect(store.dispatch).toHaveBeenCalledWith(deleteTodo({ todoId: 1 }));
  });
});
