import { Component, OnInit } from '@angular/core';

import { LazyLoadEvent } from 'primeng/api/public_api';

import { PessoaService, PessoaFilter } from '../pessoa.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})

export class PessoasPesquisaComponent implements OnInit {

  constructor(
    private pessoaService: PessoaService,
    private title: Title,
    private errorHandler: ErrorHandlerService
  ) { }

  filter = new PessoaFilter();
  pessoas = [];
  totalRegistros = 0;

  ngOnInit() {
    this.title.setTitle('Pesquisa de Pessoas');
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  pesquisar(pagina = 0) {
    this.filter.pagina = pagina;
    this.pessoaService.pesquisar(this.filter)
      .then(results => {
        this.pessoas = results.pessoas;
        this.totalRegistros = results.total;
      })
      .catch(erro => this.errorHandler.handler(erro));
  }

}
