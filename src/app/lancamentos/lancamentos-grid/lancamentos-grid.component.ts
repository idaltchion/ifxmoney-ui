import { Component, Input } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api/public_api';

import { LancamentoFilter } from './../lancamento.service';
import { LancamentosPesquisaComponent } from './../lancamentos-pesquisa/lancamentos-pesquisa.component';

@Component({
  selector: 'app-lancamentos-grid',
  templateUrl: './lancamentos-grid.component.html',
  styles: []
})

export class LancamentosGridComponent {

  @Input() lancamentos: [];
  @Input() totalRegistros: number;
  @Input() filter = new LancamentoFilter();

  constructor(private lancamentoPesquisa: LancamentosPesquisaComponent) { }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.lancamentoPesquisa.pesquisar(pagina);
  }

}
