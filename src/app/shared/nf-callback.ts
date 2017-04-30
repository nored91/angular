import { NF } from './nf';

export type NFCallback = (nf: NF, eventName: string, value: any) => void;
