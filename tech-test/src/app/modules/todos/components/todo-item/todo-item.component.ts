import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Todo, ToggleTodo } from '../../models/todo';
import { deleteTodo, editTodo, openEditTodo } from '../../store/todos-actions';
import { TodosState } from '../../store/todos.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoItemComponent {
  @Input() todoItem: Todo;

  constructor(private store: Store<TodosState>) {}

  editTodo(todoId: number): void {
    this.store.dispatch(openEditTodo({ todoId }));
  }

  toggleTodo(todo: ToggleTodo): void {
    this.store.dispatch(
      editTodo({
        todo: { ...todo, done: todo.done ? false : new Date().toISOString() },
      }),
    );
  }

  deleteTodo(todoId: number): void {
    this.store.dispatch(deleteTodo({ todoId }));
  }
}
