import { CategoryFilterPipe } from './category-filter.pipe';
import { Todo } from '../../models/todo';

describe('CategoryFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new CategoryFilterPipe();
    expect(pipe).toBeTruthy();
  });

  it('create filter by category', () => {
    const pipe = new CategoryFilterPipe();
    const mockTodos = [
      {
        id: 1,
        category: 'foo',
        done: new Date().toISOString(),
      },
      {
        id: 2,
        category: 'bar',
        done: new Date().toISOString(),
      },
      {
        id: 3,
        category: 'foo',
        done: false,
      },
    ];
    const filtered = pipe.transform(mockTodos as Todo[], 'foo', false);
    expect(filtered.length).toEqual(1);
  });
});
