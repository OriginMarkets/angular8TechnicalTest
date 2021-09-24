import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  public todos = [
    {
      "id": 1,
      "label": "Kitchen Cleanup",
      "description": "Clean my dirty kitchen",
      "category": "house",
      "done": false
    },
    {
      "id": 2,
      "label": "Taxes",
      "description": "Start doing my taxes and contact my accountant jhon for advice",
      "category": "bureaucracy",
      "done": false
    },
    {
      "id": "5",
      "label": "Bank Appointment",
      "description": "open bank account",
      "category": "personal",
      "done": true
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
