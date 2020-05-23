import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  //title = 'todo-list';

  title: string = 'Hello World';

  constructor() {
    this.title = 'I Love Angular';
  }

  ngOnInit() {
    this.title = 'Angular CLI Rules!';
  }

}
