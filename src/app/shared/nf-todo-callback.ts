import { Todo } from './todo';
import { EventTodo } from './event-todo';

export type NFTodoCallback = (nf: Todo, eventName: string, value: EventTodo) => void;
