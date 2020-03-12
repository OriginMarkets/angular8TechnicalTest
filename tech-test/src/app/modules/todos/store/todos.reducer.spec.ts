import { initialTodosState, TodosState } from './todos.state';
import { todosReducer } from './todos.reducer';
import {
  createTodoResult,
  deleteTodoResult,
  editTodoResult,
  fetchTodosResult,
  openEditTodo,
  setFilters,
} from './todos-actions';
import { FormTodo, Todo } from '../models/todo';

describe('Todos Reducer', () => {
  const mockTodos = [
    {
      id: 0,
      label: 'mock label 0',
      category: 'category 0',
    },
    {
      id: 1,
      label: 'mock label 1',
      category: 'category 1',
    },
  ] as Todo[];

  it('should return initial state', () => {
    const state: TodosState = todosReducer(initialTodosState, {
      type: 'INIT',
    });
    expect(state).toEqual(initialTodosState);
  });

  it('should update state when todos are fetched', () => {
    const state = todosReducer(
      initialTodosState,
      fetchTodosResult({ todoItems: mockTodos }),
    );
    expect(state.todoItems).toEqual(mockTodos);
    expect(state.categories).toEqual(mockTodos.map(todo => todo.category));
  });

  it('should update state a todo is deleted', () => {
    const state = todosReducer(
      { ...initialTodosState, todoItems: mockTodos },
      deleteTodoResult({ todoId: 1 }),
    );
    expect(state.todoItems).toEqual([mockTodos[0]]);
    expect(state.categories).toEqual([mockTodos[0]].map(todo => todo.category));
  });

  it('should not update state when todo was not successfully deleted', () => {
    const state = todosReducer(
      { ...initialTodosState, todoItems: mockTodos },
      deleteTodoResult({ todoId: null }),
    );
    expect(state.todoItems).toEqual(mockTodos);
  });

  it('should update state a todo is edited', () => {
    const editedTodo = {
      id: 0,
      label: 'edited label',
      category: 'edited category',
    } as Todo;
    const state = todosReducer(
      { ...initialTodosState, todoItems: mockTodos },
      editTodoResult({
        todo: editedTodo,
      }),
    );
    expect(state.todoItems).toEqual([editedTodo, mockTodos[1]]);
    expect(state.categories).toEqual(
      [{ category: 'edited category' }, mockTodos[1]].map(
        todo => todo.category,
      ),
    );
  });

  it('should not update state a todo is not successfully edited', () => {
    const state = todosReducer(
      { ...initialTodosState, todoItems: mockTodos },
      editTodoResult({
        todo: null,
      }),
    );
    expect(state.todoItems).toEqual(mockTodos);
  });

  it('should update state a todo is created', () => {
    const newTodo = {
      id: 2,
      label: 'new label',
      category: 'new category',
    } as Todo;
    const state = todosReducer(
      { ...initialTodosState, todoItems: mockTodos },
      createTodoResult({
        todo: newTodo,
      }),
    );
    expect(state.todoItems).toEqual([...mockTodos, newTodo]);
    expect(state.categories).toEqual(
      [...mockTodos, newTodo].map(todo => todo.category),
    );
  });

  it('should not update state a todo is not successfully created', () => {
    const state = todosReducer(
      { ...initialTodosState, todoItems: mockTodos },
      createTodoResult({
        todo: null,
      }),
    );
    expect(state.todoItems).toEqual(mockTodos);
  });

  it('should update state with the edited id', () => {
    const state = todosReducer(
      { ...initialTodosState, todoItems: mockTodos },
      openEditTodo({
        todoId: 1,
      }),
    );
    expect(state.editId).toEqual(1);
  });

  it('should update state with the category filter', () => {
    const mockCategory = 'category';
    const state = todosReducer(
      { ...initialTodosState, todoItems: mockTodos },
      setFilters({
        filters: { categoryFilter: 'category' },
      }),
    );
    expect(state.categoryFilter).toEqual(mockCategory);
  });
});
