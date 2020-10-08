import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';

import { RelatoriosRoutingModule } from './relatorios-routing.module';
import { RelatorioLancamentosComponent } from './relatorio-lancamentos/relatorio-lancamentos.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [RelatorioLancamentosComponent],
  imports: [
    CommonModule,

    FormsModule,
    ReactiveFormsModule,
    CalendarModule,

    SharedModule,
    RelatoriosRoutingModule
  ]
})
export class RelatoriosModule { }
