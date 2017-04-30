import { Directive, Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { TodoList } from './../shared/todo-list';
import { TodoListService } from './../shared/todo-list.service';
import { Todo } from './../shared/todo';
import { TodoFilter } from './../shared/todo-filter';
import { MultimediaService } from '../ext-multimedia/ext-multimedia.service';
import { FileUploader,FileUploaderOptions } from 'ng2-file-upload';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload/ng2-file-upload';



const URL = 'http://localhost:3000/api/';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})

export class TodoListComponent implements OnInit {
  @Input() title: string;
  @ViewChild('newTodo') newTodo: ElementRef;
  public nf: TodoList;
  private choses: Todo[];
  toggle: boolean;
  filterAll: TodoFilter;
  filterCompleted: TodoFilter;
  filterActives: TodoFilter;
  currentFilter: TodoFilter;
  service: MultimediaService;
  currentType : number;

  //File upload
  private options: FileUploaderOptions = {
    url: URL,
    autoUpload: true,
    method: 'POST',
  }

  public uploader:FileUploader = new FileUploader(this.options);

  constructor (private todoListService: TodoListService,multimediaService : MultimediaService) {
    this.choses = [];
    this.toggle = false;
    this.filterAll = () => true;
    this.filterCompleted = (c) => c.fait;
    this.filterActives = (c) => !c.fait;
    this.currentFilter = this.filterAll;
    this.service = multimediaService;

    this.currentType = 0;
    //Souscription à l'evenement de changement de type d'upload
    this.service.changeEmitted$.subscribe(
      currentType => {this.currentType = currentType;}
    ); 
  }

  ngOnInit() {
    this.todoListService.getData().then((nf) => {
      this.nf = nf;
      this.choses = nf.choses;
    });
    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      var sResponse = '' + response;
      var aTab = sResponse.split('ok-');
      if(aTab.length>1){
        var sfile = aTab[1];
        var aTabExt = sfile.split('.');
        if(aTabExt.length > 1){
          var sExt = aTabExt[1];
          sExt = sExt.toUpperCase();
          if(sExt == 'JPG' || sExt == 'PNG' || sExt == 'BMP' || sExt == 'GIF'){
            this.nf.Ajouter(sfile,false,null,1,'./uploads/' + sfile);
          }
          else if(sExt == 'WAV' || sExt == 'MP3' || sExt == 'WMA'){
            this.nf.Ajouter(sfile,false,null,2,'./uploads/' + sfile);
          }
          else{
            console.log('Erreur : extension non admise');
          }
          
        }
      }
    };
  }

  getChoses(): Todo[] {
    return this.choses.filter(this.currentFilter);
  }

  getCountTodo() {
    return this.choses.reduce((acc, chose) => {
      return acc + (chose.fait ? 0 : 1);
    }, 0);
  }

  getCountCompleted() {
    return this.choses.reduce((acc, chose) => {
      return acc + (chose.fait ? 1 : 0);
    }, 0);
  }

  disposeAll() {
    return this.choses.filter(this.filterCompleted).forEach(c => c.dispose());
  }

  addTodo() {
    this.nf.Ajouter(this.newTodo.nativeElement.value);
  }

  toggleAllChange() {
    const check = !this.toggleAll();
    this.choses.forEach((c) => c.Fait(check));
  }

  toggleAll(): boolean {
    return this.choses.reduce((acc, c) => acc && c.fait, true);
  }

   getCurrentType(){
    return this.currentType;
   }
}
