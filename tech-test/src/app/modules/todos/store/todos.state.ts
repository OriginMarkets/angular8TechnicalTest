import { Todo } from '../models/todo';

export interface TodosState {
  todoItems: Todo[];
  editId: number;
  categories: string[];
  categoryFilter: string;
  showCompleted: boolean;
}

export const initialTodosState: TodosState = {
  todoItems: [],
  editId: null,
  categories: [],
  categoryFilter: null,
  showCompleted: true,
};
