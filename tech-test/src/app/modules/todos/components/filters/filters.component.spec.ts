import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersComponent } from './filters.component';
import { MatSelectModule } from '@angular/material/select';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { initialTodosState, TodosState } from '../../store/todos.state';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Store } from '@ngrx/store';
import { setFilters } from '../../store/todos-actions';
import { MatCheckboxModule } from '@angular/material/checkbox';

describe('CategoryFilterComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;
  let store: MockStore<TodosState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatSelectModule, NoopAnimationsModule, MatCheckboxModule],
      declarations: [FiltersComponent],
      providers: [
        provideMockStore({
          initialState: initialTodosState,
        }),
      ],
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select category', () => {
    const mockCategory = 'mock category';
    spyOn(store, 'dispatch');
    component.selectCategory(mockCategory);
    expect(store.dispatch).toHaveBeenCalledWith(
      setFilters({ filters: { categoryFilter: mockCategory } }),
    );
  });

  it('should set select show completed task', () => {
    spyOn(store, 'dispatch');
    component.setShowCompleted({ checked: true });
    expect(store.dispatch).toHaveBeenCalledWith(
      setFilters({ filters: { showCompleted: true } }),
    );
  });
});
