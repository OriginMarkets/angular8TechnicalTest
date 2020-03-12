import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosComponent } from './todos.component';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  template: '',
  selector: 'app-filters',
})
class MockFiltersComponent {}

@Component({
  template: '',
  selector: 'app-todo-list',
})
class MockTodoListComponent {}

@Component({
  template: '',
  selector: 'app-todo-form',
})
class MockTodoFormComponent {}

describe('TodosComponent', () => {
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatCardModule],
      declarations: [
        TodosComponent,
        MockFiltersComponent,
        MockTodoListComponent,
        MockTodoFormComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
