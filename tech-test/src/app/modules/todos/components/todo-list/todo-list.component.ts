import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TodosState } from '../../store/todos.state';
import { select, Store } from '@ngrx/store';
import { fetchTodos } from '../../store/todos-actions';
import {
  getCategoryFilter,
  getEditTodoId,
  getShowCompleted,
  getTodoItems,
} from '../../store/todos.selectors';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent implements OnInit {
  editId$ = this.store.pipe(select(getEditTodoId));
  todoItems$ = this.store.pipe(select(getTodoItems));
  categoryFilter$ = this.store.pipe(select(getCategoryFilter));
  showCompleted$ = this.store.pipe(select(getShowCompleted));

  constructor(private store: Store<TodosState>) {}

  ngOnInit() {
    this.store.dispatch(fetchTodos());
  }
}
