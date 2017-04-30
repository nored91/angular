import { Component, OnInit } from '@angular/core';
import { MultimediaService } from '../ext-multimedia.service';

@Component({
  selector: 'app-upload-multimedia',
  templateUrl: './upload-multimedia.component.html',
  styleUrls: ['./upload-multimedia.component.css']
})
export class UploadMultimediaComponent implements OnInit {
  
  currentType = 0;
  typeTexte: number;
  typeImage: number;
  typeSon: number;
  service: MultimediaService;

  constructor(multimediaService : MultimediaService) {
    this.service = multimediaService;
    this.typeTexte = 0;
    this.typeImage = 1;
    this.typeSon = 2; 
    this.currentType = 0;
  }

  setTypeTexte(){
    this.currentType = this.typeTexte;
    this.service.emitChange(this.currentType);
    
  }
  setTypeImage(){
    this.currentType = this.typeImage;
    this.service.emitChange(this.currentType);
  }
  setTypeSon(){
    this.currentType = this.typeSon;
    this.service.emitChange(this.currentType);
  }

  getCurrentType(){
    return this.currentType;
  }

  ngOnInit() {
  }

  
}
