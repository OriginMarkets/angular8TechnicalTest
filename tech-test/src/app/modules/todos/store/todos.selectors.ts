import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodosState } from './todos.state';
import { identity } from 'rxjs';

export const getTodosState = createFeatureSelector<TodosState>('todos');

export const getTodoItems = createSelector(
  getTodosState,
  (todosState: TodosState) => todosState && todosState.todoItems,
);

export const getEditTodoId = createSelector(
  getTodosState,
  (todosState: TodosState) => todosState && todosState.editId,
);

export const getCategories = createSelector(
  getTodosState,
  (todosState: TodosState) =>
    todosState && todosState.categories.filter(identity),
);

export const getCategoryFilter = createSelector(
  getTodosState,
  (todosState: TodosState) => todosState && todosState.categoryFilter,
);

export const getShowCompleted = createSelector(
  getTodosState,
  (todosState: TodosState) => todosState && todosState.showCompleted,
);
