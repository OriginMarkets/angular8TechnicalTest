import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TodosState } from '../../store/todos.state';
import { select, Store } from '@ngrx/store';
import { getCategories } from '../../store/todos.selectors';
import { setFilters } from '../../store/todos-actions';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent {
  categories$ = this.store.pipe(select(getCategories));

  constructor(private store: Store<TodosState>) {}

  selectCategory(categoryFilter: string): void {
    this.store.dispatch(setFilters({ filters: { categoryFilter } }));
  }

  setShowCompleted({ checked }): void {
    this.store.dispatch(setFilters({ filters: { showCompleted: checked } }));
  }
}
