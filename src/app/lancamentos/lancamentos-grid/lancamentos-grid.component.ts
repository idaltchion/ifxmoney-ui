import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';

import { Table } from 'primeng/table/table';
import { ConfirmationService } from 'primeng/api';
import { ToastyService } from 'ng2-toasty';

import { LancamentoFilter, LancamentoService } from './../lancamento.service';
import { LancamentosPesquisaComponent } from './../lancamentos-pesquisa/lancamentos-pesquisa.component';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { AuthService } from 'src/app/seguranca/auth.service';


@Component({
  selector: 'app-lancamentos-grid',
  templateUrl: './lancamentos-grid.component.html',
  styles: [],
})

export class LancamentosGridComponent {

  @Input() lancamentos: [];
  @Input() totalRegistros: number;
  @Input() filter = new LancamentoFilter();
  @ViewChild('tabela', {static: true}) tabela: Table;
  @Output() aoMudarPagina = new EventEmitter();

  constructor(
    private lancamentoPesquisa: LancamentosPesquisaComponent,
    private lancamentoService: LancamentoService,
    private toastyService: ToastyService,
    private confirmDialogService: ConfirmationService,
    private auth: AuthService,
    private errorHandler: ErrorHandlerService
    ) {}

  mudarPagina(event) {
    this.aoMudarPagina.emit(event);
  }

  pesquisar() {
    this.lancamentoPesquisa.pesquisar();
  }

  remover(lancamento: any) {
    this.lancamentoService.remover(lancamento.codigo)
      .then(() => {
        if (this.tabela.first === 0) {
          this.pesquisar();
        } else {
          this.tabela.reset();
        }
        this.toastyService.success('Lançamento excluído com sucesso!');
      })
      .catch(erro => {
        this.errorHandler.handler(erro);
      });
  }

  confirmarRemocao(lancamento: any) {
    this.confirmDialogService.confirm({
      message: 'Tem certeza que deseja remover?',
      accept: () => {
        this.remover(lancamento);
      }
    });
  }

  temPermissao(permissao: string) {
    return this.auth.temPermissao(permissao);
  }
}
