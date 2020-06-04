import { Component, OnInit } from '@angular/core';

import { LazyLoadEvent } from 'primeng/api/public_api';

import { LancamentoService, LancamentoFilter } from './../lancamento.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})

export class LancamentosPesquisaComponent implements OnInit {

  constructor(
    private lancamentoService: LancamentoService,
    private title: Title,
    private errorHandler: ErrorHandlerService
  ) {}

  filter = new LancamentoFilter();
  lancamentos = [];
  totalRegistros = 0;

  ngOnInit() {
    this.title.setTitle('Pesquisa de Lançamentos');
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
    })
    .catch( erro => {
      this.errorHandler.handler(erro);
    });
  }

}
