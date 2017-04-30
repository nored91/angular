import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MultimediaService{
  currentType: number;

  constructor(){
    this.currentType = 0;
  }

  private emitChangeSource = new Subject<any>();
  // Observable string streams
  public changeEmitted$ = this.emitChangeSource.asObservable();

  // Service message commands
  emitChange(change: any) {
    this.currentType = change;
    this.emitChangeSource.next(change);
  }

  getCurrentType(){
    return this.currentType;
  }
}