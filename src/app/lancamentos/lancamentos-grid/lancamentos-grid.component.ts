import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api/public_api';
import { Table } from 'primeng/table/table';

import { LancamentoFilter } from './../lancamento.service';
import { LancamentosPesquisaComponent } from './../lancamentos-pesquisa/lancamentos-pesquisa.component';


@Component({
  selector: 'app-lancamentos-grid',
  templateUrl: './lancamentos-grid.component.html',
  styles: [],
})

export class LancamentosGridComponent {

  @Input() lancamentos: [];
  @Input() totalRegistros: number;
  @Input() filter = new LancamentoFilter();
  @ViewChild('grid', {static: true}) grid: Table;
  @Output() aoMudarPagina = new EventEmitter();

  constructor(private lancamentoPesquisa: LancamentosPesquisaComponent) { }

  mudarPagina(event) {
    this.aoMudarPagina.emit(event);
  }

  remover(lancamento: any) {
    this.lancamentoPesquisa.remover(lancamento);
    this.grid.reset();
  }

}
