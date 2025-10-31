import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Todo {
  _id?: string;
  title: string;
  description: string;
  status: string;
  dueDate?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private baseUrl = 'https://todo-backend-zbob.onrender.com/api/todos';

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.baseUrl);
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.baseUrl, todo);
  }

  updateTodo(id: string, todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${this.baseUrl}/${id}`, todo);
  }

  deleteTodo(id: string): Observable<{ msg: string }> {
    return this.http.delete<{ msg: string }>(`${this.baseUrl}/${id}`);
  }

  updateStatus(id: string, newStatus: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, { status: newStatus });
  }
}
