import { createAction, props } from '@ngrx/store';
import { FormTodo, Todo } from '../models/todo';

type EditTodo = FormTodo | { done: boolean | string; id: number };

export const fetchTodos = createAction('[TODO] - FETCH TODOS');

export const fetchTodosResult = createAction(
  '[TODO] - FETCH TODOS RESULT',
  props<{ todoItems: Todo[] }>(),
);

export const createTodo = createAction(
  '[TODO] - CREATE TODO',
  props<{ todo: FormTodo }>(),
);

export const createTodoResult = createAction(
  '[TODO] - CREATE TODO RESULT',
  props<{ todo: Todo }>(),
);

export const deleteTodo = createAction(
  '[TODO] - DELETE TODO',
  props<{ todoId: number }>(),
);

export const deleteTodoResult = createAction(
  '[TODO] - DELETE TODO RESULT',
  props<{ todoId: number }>(),
);

export const openEditTodo = createAction(
  '[TODO] - OPEN EDIT TODO',
  props<{ todoId: number }>(),
);

export const editTodo = createAction(
  '[TODO] - EDIT TODO',
  props<{ todo: EditTodo }>(),
);

export const editTodoResult = createAction(
  '[TODO] - EDIT TODO RESULT',
  props<{ todo: Todo }>(),
);

export const setFilters = createAction(
  '[TODO] - SET FILTERS',
  props<{ filters: { categoryFilter?: string; showCompleted?: boolean } }>(),
);
