import { initialTodosState, TodosState } from './todos.state';
import {
  getCategories,
  getCategoryFilter,
  getEditTodoId,
  getTodoItems,
} from './todos.selectors';

describe('Todo Selectors', () => {
  describe('getTodoItems selector', () => {
    it('should return loading state', () => {
      expect(getTodoItems.projector(initialTodosState)).toEqual(
        initialTodosState.todoItems,
      );
    });
  });

  describe('getEditTodoId selector', () => {
    it('should return loading state', () => {
      expect(getEditTodoId.projector(initialTodosState)).toEqual(
        initialTodosState.editId,
      );
    });
  });

  describe('getCategories selector', () => {
    it('should return loading state', () => {
      expect(getCategories.projector(initialTodosState)).toEqual(
        initialTodosState.categories,
      );
    });
  });

  describe('getCategoryFilter selector', () => {
    it('should return loading state', () => {
      expect(getCategoryFilter.projector(initialTodosState)).toEqual(
        initialTodosState.categoryFilter,
      );
    });
  });
});
