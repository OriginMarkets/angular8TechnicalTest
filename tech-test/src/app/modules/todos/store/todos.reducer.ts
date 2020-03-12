import { initialTodosState, TodosState } from './todos.state';
import { createReducer, on } from '@ngrx/store';
import { Todo } from '../models/todo';
import {
  createTodoResult,
  deleteTodoResult,
  editTodoResult,
  fetchTodosResult,
  openEditTodo,
  setFilters,
} from './todos-actions';

function getCategories(todoItems): string[] {
  return [...new Set(todoItems.map(todo => todo.category))] as string[];
}

export const todosReducer = createReducer(
  initialTodosState,

  on(fetchTodosResult, (state, { todoItems }) => ({
    ...state,
    todoItems,
    categories: getCategories(todoItems),
  })),

  on(createTodoResult, (state, { todo }) => {
    if (!todo) {
      return state;
    }
    const todoItems = [...state.todoItems, todo];
    return {
      ...state,
      todoItems,
      categories: getCategories(todoItems),
    };
  }),

  on(deleteTodoResult, (state, { todoId }) => {
    if (!todoId) {
      return state;
    }
    const todoItems = state.todoItems.filter(todo => todo.id !== todoId);
    return {
      ...state,
      todoItems,
      categories: getCategories(todoItems),
    };
  }),

  on(openEditTodo, (state, { todoId }) => ({
    ...state,
    editId: todoId,
  })),

  on(editTodoResult, (state, action) => {
    if (!action.todo) {
      return { ...state };
    }
    const todoItems = state.todoItems.map(todo =>
      todo.id === action.todo.id ? action.todo : todo,
    );
    return {
      ...state,
      editId: null,
      todoItems,
      categories: getCategories(todoItems),
    };
  }),

  on(setFilters, (state, { filters }) => ({
    ...state,
    ...filters,
  })),
);
