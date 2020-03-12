export interface ToggleTodo {
  done: boolean | string;
  id: number;
}

export interface FormTodo {
  category: string;
  description: string;
  label: string;
}

export interface Todo extends ToggleTodo, FormTodo {}
