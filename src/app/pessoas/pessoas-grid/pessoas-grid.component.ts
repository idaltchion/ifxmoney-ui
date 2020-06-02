import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';

import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table/table';
import { ToastyService } from 'ng2-toasty';

import { PessoaFilter, PessoaService } from '../pessoa.service';
import { PessoasPesquisaComponent } from './../pessoas-pesquisa/pessoas-pesquisa.component';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-pessoas-grid',
  templateUrl: './pessoas-grid.component.html',
  styles: []
})

export class PessoasGridComponent {

  @Input() pessoas: [];
  @Input() totalRegistros: number;
  @Input() filter = new PessoaFilter();
  @ViewChild('tabela', {static: true}) tabela: Table;
  @Output() aoMudarPagina = new EventEmitter();

  constructor(
    private toasty: ToastyService,
    private confirmDialog: ConfirmationService,
    private pessoaPesquisa: PessoasPesquisaComponent,
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService
  ) { }

  mudarPagina(event) {
    this.aoMudarPagina.emit(event);
  }

  remover(pessoa: any) {
    this.pessoaService.remover(pessoa.codigo)
      .then(() => {
        if (this.tabela.first === 0) {
          this.pessoaPesquisa.pesquisar();
        } else {
          this.tabela.reset();
        }
        this.toasty.success('Pessoa removida com sucesso.');
      })
      .catch(erro => {
        this.errorHandler.handler(erro);
      });
  }

  confirmarRemocao(pessoa: any) {
    this.confirmDialog.confirm({
      message: 'Tem certeza que deseja efetuar a remoção?',
      accept: () => {
        this.remover(pessoa);
      }
    });
  }

  mudarStatus(pessoa: any) {
    const novoStatus = !pessoa.ativo;
    this.pessoaService.mudarStatus(pessoa.codigo, novoStatus)
      .then(() => {
        const acao = novoStatus ? 'ativada' : 'desativada';
        pessoa.ativo = novoStatus;
        this.toasty.success(`Pessoa ${acao} com sucesso`);
      })
      .catch(erro => {
        this.errorHandler.handler(erro);
      });
  }

}
