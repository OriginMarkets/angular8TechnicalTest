import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Todo } from 'src/app/models/todo';
import {TodoService} from '../../services/todo.service';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  public categories = [
    'General',
    'Bureaucracy',
    'Personal',
    'House',
    'Work'
  ];
  public selectedCategory = 'General';
  public todos = [];

  public newTask:FormGroup;
  public label = new FormControl('', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]);
  public description = new FormControl('', Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/));
  public category = new FormControl('General', Validators.required);
  public typeFilter = 'all';
  public filtered = [];
  constructor(private fb: FormBuilder, private todoService: TodoService) { 
    this.newTask = fb.group({
      label: this.label,
      description: this.description,
      category: this.category
    });
  }

  ngOnInit() {
    this.fetchTodos();
  }
  fetchTodos() {
    this.todoService.getAll().subscribe((data) => {
      this.todos = data;
    });
  }
  onAdd() {
    if(this.newTask.valid) {
      const task:Todo = this.newTask.value;
      task.done = false;
      this.todoService.add(task).subscribe((data) => {
        this.fetchTodos();
      });
      this.clearTask();
    }
  }
  clearTask() {
    this.newTask.setValue({
      label:'',
      description:'',
      category: 'General'
    });
  }
  removeTask(idx, id){
    this.todoService.delete(id).subscribe((data) => {
      this.todos.splice(idx,1);
      this.fetchTodos();
    });
  }
  changeStatus(done, id) {
    const data = {
      done
    };
    this.todoService.update(id, data).subscribe((data) => {
      this.fetchTodos();
    });
  }
}
