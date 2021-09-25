import { Component, OnDestroy, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Todo } from 'src/app/models/todo';
import {TodoService} from '../../services/todo.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit, OnDestroy {
  getListSub: Subscription;
  updateSub: Subscription;
  addSub: Subscription;
  deleteSub: Subscription;
  subscriptions: Subscription[] = [];
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
    this.getListSub = this.todoService.getAll().subscribe((data) => {
      this.todos = data;
    });
    this.subscriptions.push(this.getListSub);
  }
  onAdd() {
    if(this.newTask.valid) {
      const task:Todo = this.newTask.value;
      task.done = false;
      this.addSub = this.todoService.add(task).subscribe((data) => {
        this.fetchTodos();
      });
      this.clearTask();
    }
    this.subscriptions.push(this.addSub);
  }
  clearTask() {
    this.newTask.setValue({
      label:'',
      description:'',
      category: 'General'
    });
  }
  removeTask(idx, id){
    this.deleteSub = this.todoService.delete(id).subscribe((data) => {
      this.todos.splice(idx,1);
      this.fetchTodos();
    });
    this.subscriptions.push(this.deleteSub);
  }
  changeStatus(done, id) {
    const data = {
      done
    };
    this.updateSub = this.todoService.update(id, data).subscribe((data) => {
      this.fetchTodos();
    });
    this.subscriptions.push(this.updateSub);
  }
  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
