import { NgModule } from '@angular/core';
import { Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadMultimediaComponent } from './upload-multimedia/upload-multimedia.component';
import { MultimediaService } from './ext-multimedia.service';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    UploadMultimediaComponent
  ],
  declarations: [UploadMultimediaComponent],
  providers: [MultimediaService]
})
export class ExtMultimediaModule { }
