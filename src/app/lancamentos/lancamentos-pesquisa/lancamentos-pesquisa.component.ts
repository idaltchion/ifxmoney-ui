import { Component, OnInit } from '@angular/core';

import { LancamentoService, LancamentoFilter } from './../lancamento.service';
import { LazyLoadEvent } from 'primeng/api/public_api';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})

export class LancamentosPesquisaComponent implements OnInit {

  constructor(private lancamentoService: LancamentoService, private toastyService: ToastyService) { }

  filter = new LancamentoFilter();
  lancamentos = [];
  totalRegistros = 0;

  ngOnInit() {
    //this.pesquisar();
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  pesquisar(pagina = 0) {
    this.filter.pagina = pagina;
    this.lancamentoService.pesquisar(this.filter)
    .then(results => {
      this.lancamentos = results.lancamentos;
      this.totalRegistros = results.total;
    });
  }

  remover(lancamento: any) {
    this.lancamentoService.remover(lancamento.codigo)
      .then( () => {
        this.toastyService.success('Lançamento excluído com sucesso!');
      });
  }

}
