import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from '../../models/todo';
import { TodosState } from '../../store/todos.state';
import { select, Store } from '@ngrx/store';
import { createTodo, editTodo, openEditTodo } from '../../store/todos-actions';
import { getCategories } from '../../store/todos.selectors';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoFormComponent implements OnInit {
  @Input() editMode: boolean;
  @Input() initialValues: Todo;
  todoForm: FormGroup;
  categories$ = this.store.pipe(select(getCategories));
  submitLabel: string;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<TodosState>,
  ) {}

  ngOnInit() {
    this.initialValues = this.initialValues || ({} as Todo);
    this.submitLabel = this.editMode ? 'Save' : 'Add';

    this.todoForm = this.formBuilder.group({
      category: this.initialValues.category,
      description: this.initialValues.description,
      label: this.initialValues.label,
    });
  }

  onSubmit(): void {
    const action = this.editMode ? editTodo : createTodo;
    this.store.dispatch(
      action({
        todo: {
          ...this.initialValues,
          ...this.todoForm.value,
        },
      }),
    );
    this.todoForm.reset();
  }

  cancel(): void {
    this.store.dispatch(openEditTodo({ todoId: null }));
  }
}
