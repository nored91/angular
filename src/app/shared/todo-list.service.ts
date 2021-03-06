import { Injectable } from '@angular/core';
import { NF } from './nf';
import { TodoList } from './todo-list';
import { EventTodoList } from './event-todo-list';
import { TodoSerialization } from './todo-serialization';

@Injectable()
export class TodoListService {

  nf = new TodoList();

  constructor() {
    const cbSaveData = () => {
    const serialization: TodoSerialization = [];
    this.nf.choses.forEach( c => serialization.push({texte: c.texte, fait: c.fait, date: c.date.toString(),type: c.type,path: c.path}));
      localStorage.setItem('todoListMiage', JSON.stringify(serialization));
    };

    this.nf.on('update', (nf: TodoList, eventName: string, eventValue: EventTodoList) => {
      if (eventValue.append) {
        const chose = eventValue.append;
        chose.on('update', cbSaveData);
      }
      if (eventValue.remove) {
        const chose = eventValue.remove;
        chose.off('update', cbSaveData);
      }
      cbSaveData();
    });

    const choses: TodoSerialization = <TodoSerialization>JSON.parse(localStorage.getItem('todoListMiage') || '[]');
    choses.forEach(c => {
      this.nf.Ajouter(c.texte, c.fait, new Date(c.date),c.type,c.path);
    });
  }

  getData(): Promise<TodoList> {
    return Promise.resolve(this.nf);
  }
}

