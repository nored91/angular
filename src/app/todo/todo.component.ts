import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { Todo } from './../shared/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  @Input ('nf') nf: Todo;
  @ViewChild('newText') newTextInput: ElementRef;
  editing: boolean;

  constructor() {
    this.editing = false;
  }

  ngOnInit() {
  }

  dispose() {
    this.nf.dispose();
  }

  fait(fait: boolean) {
    this.nf.Fait(fait);
  }

  edit() {
    this.editing = true;
    requestAnimationFrame(() => {
      this.newTextInput.nativeElement.focus();
    });
  }

  setText(value) {
    this.nf.Texte(value);
    this.editing = false;
  }

  getType(){
    return this.nf.type;
  }

  getPath(){
    return this.nf.path;
  }
}
