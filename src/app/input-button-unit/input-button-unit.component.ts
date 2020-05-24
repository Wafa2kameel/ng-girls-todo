import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-button-unit',
  templateUrl: './input-button-unit.component.html',
  styleUrls: ['./input-button-unit.component.scss']
})
export class InputButtonUnitComponent implements OnInit {

  @Output() submit: EventEmitter<string> = new EventEmitter();
  title:string='';

  constructor() { }

  ngOnInit(): void {
  } 

  submitValue(newTitle: string) {
    this.title = '';
    this.submit.emit(newTitle);
  }
}
