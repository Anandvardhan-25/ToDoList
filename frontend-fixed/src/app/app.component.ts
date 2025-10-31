import { Component, OnInit } from '@angular/core';
import { Todo, TodoService } from './services/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  todos: Todo[] = [];
  filteredTodos: Todo[] = [];
  newTitle = '';
  newDescription = '';
  newDueDate = '';
  editMode = false;
  currentTodoId = '';
  filterStatus: 'all' | 'pending' | 'done' = 'all';

  constructor(private todoSvc: TodoService) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.todoSvc.getTodos().subscribe((data) => {
      this.todos = data.sort((a, b) =>
        new Date(a.dueDate || '').getTime() - new Date(b.dueDate || '').getTime()
      );
      this.applyFilter();
    });
  }

  addTodo(): void {
    if (!this.newTitle.trim()) return;

    const newTodo: Todo = {
      title: this.newTitle,
      description: this.newDescription,
      status: 'pending',
      dueDate: this.newDueDate
    };
    this.todoSvc.addTodo(newTodo).subscribe(() => {
      this.loadTodos();
      this.resetForm();
    });
  }

  edit(todo: Todo): void {
    this.editMode = true;
    this.currentTodoId = todo._id!;
    this.newTitle = todo.title;
    this.newDescription = todo.description;
    this.newDueDate = todo.dueDate ? todo.dueDate.slice(0, 10) : '';
  }

  updateTodo(): void {
    const updated: Todo = {
      title: this.newTitle,
      description: this.newDescription,
      status: 'pending',
      dueDate: this.newDueDate
    };
    this.todoSvc.updateTodo(this.currentTodoId, updated).subscribe(() => {
      this.loadTodos();
      this.cancelEdit();
    });
  }

  deleteTodo(id: string): void {
    this.todoSvc.deleteTodo(id).subscribe(() => this.loadTodos());
  }

  cancelEdit(): void {
    this.editMode = false;
    this.resetForm();
  }

  toggleCompleted(todo: Todo): void {
    const newStatus = todo.status === 'done' ? 'pending' : 'done';
    this.todoSvc.updateStatus(todo._id!, newStatus).subscribe(() => this.loadTodos());
  }

  setFilter(status: 'all' | 'pending' | 'done'): void {
    this.filterStatus = status;
    this.applyFilter();
  }

  applyFilter(): void {
    if (this.filterStatus === 'all') {
      this.filteredTodos = this.todos;
    } else {
      this.filteredTodos = this.todos.filter(t => t.status === this.filterStatus);
    }
  }

  private resetForm(): void {
    this.newTitle = '';
    this.newDescription = '';
    this.newDueDate = '';
  }
}
