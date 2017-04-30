import { TodoList } from './todo-list';
import { EventTodoList } from './event-todo-list';

export type NfTodoListCallback = (nf: TodoList, eventName: string, value: EventTodoList) => void;
