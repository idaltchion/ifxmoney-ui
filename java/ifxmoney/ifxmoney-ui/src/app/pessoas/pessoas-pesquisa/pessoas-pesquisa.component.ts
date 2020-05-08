import { Component } from '@angular/core';
import { PessoaService, PessoaFilter } from '../pessoa.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent {

  constructor(private pessoaService: PessoaService) { }

  filter = new PessoaFilter();
  pessoas = [];
  totalRegistros = 0;


  pesquisar(pagina = 0) {
    this.filter.pagina = pagina;
    this.pessoaService.pesquisar(this.filter)
      .then(results => {
        this.pessoas = results.pessoas;
        this.totalRegistros = results.total;
      });
  }

}
