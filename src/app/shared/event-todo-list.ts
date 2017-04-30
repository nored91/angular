import { Todo } from './todo';

export interface EventTodoList {
  append?: Todo;
  remove?: Todo;
}
