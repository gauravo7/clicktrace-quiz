import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Quiz, TodoItem } from './services/quiz';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule,FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
   title = 'Angular CRUD with RTDB';
  // R (Read): Observable stream of TodoItems from the service
  todos$!: Observable<TodoItem[]>;

  // C (Create) state
  newTask: string = '';

  // U (Update) state
  editingTodo: TodoItem | null = null;
  editedTask: string = '';

  constructor(private dataService: Quiz) { }

  ngOnInit() {
    // R (Read): Initialize the observable stream
    this.todos$ = this.dataService.getTodos();
  }

  // C (Create)
  createTodo() {
    if (this.newTask.trim()) {
      this.dataService.addTodo(this.newTask).then(() => {
        this.newTask = ''; // Clear input field on success
      }).catch(console.error);
    }
  }

  // U (Update): Start editing an item
  startEdit(todo: TodoItem) {
    // Copy the item to editingTodo to avoid modifying the displayed item directly
    this.editingTodo = { ...todo };
    this.editedTask = todo.task;
  }

  // U (Update): Save changes to the item
  saveEdit() {
    if (this.editingTodo && this.editedTask.trim()) {
      const updatedTodo: TodoItem = {
        ...this.editingTodo,
        task: this.editedTask
      };
      this.dataService.updateTodo(updatedTodo).then(() => {
        this.editingTodo = null; // Exit edit mode
        this.editedTask = '';
      }).catch(console.error);
    }
  }

  // U (Update): Toggle completion status
  toggleCompleted(todo: TodoItem) {
    const updatedTodo: TodoItem = { ...todo, completed: !todo.completed };
    this.dataService.updateTodo(updatedTodo).catch(console.error);
  }

  // D (Delete)
  deleteTodo(id: string) {
    this.dataService.deleteTodo(id).catch(console.error);
  }
}
