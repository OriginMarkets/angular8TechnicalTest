import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../../models/todo';

@Pipe({
  name: 'categoryFilter',
})
export class CategoryFilterPipe implements PipeTransform {
  transform(todos: Todo[] = [], category: string, showCompleted: boolean): Todo[] {
    const filteredByCategory = category
      ? todos.filter(item => item.category === category)
      : todos;
    return filteredByCategory.filter(todo => !todo.done || showCompleted);
  }
}
