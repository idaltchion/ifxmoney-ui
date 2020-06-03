import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { InputMaskModule } from 'primeng/inputmask';

/* Imports from custom components and modules */
import { PessoasGridComponent } from './pessoas-grid/pessoas-grid.component';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoasCadastroComponent } from './pessoas-cadastro/pessoas-cadastro.component';
import { SharedModule } from './../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PessoasCadastroComponent,
    PessoasPesquisaComponent,
    PessoasGridComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    InputMaskModule,
    TableModule,
    TooltipModule,
    InputTextModule,
    ButtonModule,
    SharedModule,
    RouterModule
  ],
  exports: [
    PessoasCadastroComponent,
    PessoasPesquisaComponent
  ]
})
export class PessoasModule { }
