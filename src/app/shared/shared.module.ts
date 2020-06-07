import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Imports from custom components and modules */
import { MessageComponent } from './message/message.component';

@NgModule({
  declarations: [
    MessageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MessageComponent
  ]
})

export class SharedModule { }
