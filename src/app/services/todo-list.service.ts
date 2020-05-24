import { Injectable } from '@angular/core';
import { TodoItem } from '../interfaces/todo-item';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  private todoListSubject: Subject<TodoItem[]> = new Subject<TodoItem[]>();
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  databaseUrl = environment.databaseUrl;

  constructor(private http: HttpClient) {
    this.retrieveListFromDataBase();
  }

  retrieveListFromDataBase() {
    this.http.get<TodoItem[]>(this.databaseUrl +'/items').subscribe(
      response => {
        this.todoListSubject.next(response);
      },
      err => {
        console.log(err);
      }
    );

  }

  getTodoList() {
    return this.todoListSubject.asObservable();
  }

  addItem(item: TodoItem) {
    if (item?.title) {
      this.http.post(this.databaseUrl + '/items',
        JSON.stringify({ title: item.title, completed: item.completed || false }),
        { headers: this.headers }).subscribe(
          () => this.retrieveListFromDataBase(),
          err => {
            console.log(err);
          }
        );
    }
  }   

  updateItem(item: TodoItem, changes) {
    console.log('updateItem');
    return this.http.put(this.databaseUrl +`/items/${item._id}`,
      JSON.stringify({
        ...item,
        completed: changes
      }),
      { headers: this.headers }).subscribe(
        () => this.retrieveListFromDataBase()
      );
  }

  deleteItem(item: TodoItem) {
    return this.http.delete(this.databaseUrl +`/items/${item._id}`).subscribe(
      () => this.retrieveListFromDataBase()
    );
  } 

 
}


