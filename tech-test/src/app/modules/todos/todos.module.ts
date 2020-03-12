import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { todosReducer } from './store/todos.reducer';
import { TodosEffects } from './store/todos-effects';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CategoryFilterPipe } from './pipes/category-filter/category-filter.pipe';
import { TodosComponent } from './components/todos/todos.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { FiltersComponent } from './components/filters/filters.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('todos', todosReducer),
    EffectsModule.forFeature([TodosEffects]),
    ReactiveFormsModule,
    HttpClientModule,

    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatSelectModule,
    MatListModule,
    MatCheckboxModule,
    MatChipsModule,
    MatIconModule,
  ],
  declarations: [
    TodoFormComponent,
    FiltersComponent,
    CategoryFilterPipe,
    TodosComponent,
    TodoListComponent,
    TodoItemComponent,
  ],
  exports: [TodoFormComponent, FiltersComponent, CategoryFilterPipe],
})
export class TodosModule {}
