import { Component, Input } from '@angular/core';
import { PessoasPesquisaComponent } from './../pessoas-pesquisa/pessoas-pesquisa.component';
import { LazyLoadEvent } from 'primeng/api/public_api';
import { PessoaFilter } from '../pessoa.service';

@Component({
  selector: 'app-pessoas-grid',
  templateUrl: './pessoas-grid.component.html',
  styles: []
})

export class PessoasGridComponent {

  @Input() pessoas: [];
  @Input() totalRegistros: number;
  @Input() filter = new PessoaFilter();

  constructor(private pessoaPesquisa: PessoasPesquisaComponent) { }

  loadPage(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pessoaPesquisa.pesquisar(pagina);
  }

}
