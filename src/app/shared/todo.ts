import { NF } from './nf';
import { TodoList } from './todo-list';
import { NFTodoCallback } from './nf-todo-callback';

export class Todo extends NF {
  readonly liste: TodoList;
  readonly date: Date;
  texte: string;
  path: string;
  type: number;
  fait: boolean;

  constructor(texte: string, liste: TodoList, fait: boolean = false, date: Date = null, type: number = 0, path: string = "") {
    super();
    this.texte = texte;
    this.date = date || new Date(Date.now());
    this.fait = fait || false;
    this.liste = liste;
    this.type = type;
    this.path = path;
  }

  dispose() {
    //TODO A voir suppression physique cache
    this.liste.Retirer(this);
  }

  Texte(texte: string) {
    this.texte = texte;
    this.emit('update', {texte: texte});
    return this;
  }

  Fait(fait: boolean) {
    this.fait = fait;
    this.emit('update', {fait: fait});
    return this;
  }

  on(eventName: 'update', cb: NFTodoCallback): this {
    return super.on(eventName, cb);
  }

  off(eventName: 'update', cb: NFTodoCallback): this {
    return super.off(eventName, cb);
  }
}
