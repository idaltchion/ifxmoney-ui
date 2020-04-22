import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CurrencyMaskModule } from 'ng2-currency-mask';

import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputMaskModule } from 'primeng/inputmask';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CalendarModule } from 'primeng/calendar';

import { LancamentosGridComponent } from './lancamentos-grid/lancamentos-grid.component';
import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentosCadastroComponent } from './lancamentos-cadastro/lancamentos-cadastro.component';


@NgModule({
  declarations: [
    LancamentosCadastroComponent,
    LancamentosPesquisaComponent,
    LancamentosGridComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,
    FormsModule,
    InputTextModule,
    CurrencyMaskModule,
    TableModule,
    InputMaskModule,
    InputTextareaModule,
    ButtonModule,
    TooltipModule
  ],
  exports: [
    LancamentosCadastroComponent,
    LancamentosPesquisaComponent
  ]
})
export class LancamentosModule { }
