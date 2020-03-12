import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoListComponent } from './todo-list.component';
import { CategoryFilterPipe } from '../../pipes/category-filter/category-filter.pipe';
import { Component, Input } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { provideMockStore } from '@ngrx/store/testing';
import { initialTodosState } from '../../store/todos.state';

@Component({
  selector: 'app-todo-form',
  template: '',
})
class MockTodoFormComponent {
  @Input() editMode;
  @Input() initialValues;
}

@Component({
  selector: 'app-todo-item',
  template: '',
})
class MockTodoItemComponent {
  @Input() todoItem;
}

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatListModule],
      providers: [
        provideMockStore({
          initialState: initialTodosState,
        }),
      ],
      declarations: [
        TodoListComponent,
        MockTodoFormComponent,
        CategoryFilterPipe,
        MockTodoItemComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
