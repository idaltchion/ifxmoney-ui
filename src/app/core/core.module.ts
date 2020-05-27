import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Imports from custom components and modules */
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class CoreModule { }
