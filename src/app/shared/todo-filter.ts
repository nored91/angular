import { Todo } from './todo';

export type TodoFilter = (c: Todo) => boolean;
