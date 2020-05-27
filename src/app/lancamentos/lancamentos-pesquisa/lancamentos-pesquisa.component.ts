import { LancamentoService, LancamentoFilter } from './../lancamento.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})

export class LancamentosPesquisaComponent implements OnInit {

  constructor(private lancamentoService: LancamentoService) { }

  filter = new LancamentoFilter();
  lancamentos = [];
  totalRegistros = 0;

  ngOnInit() {
    //this.pesquisar();
  }

  pesquisar(pagina = 0) {
    this.filter.pagina = pagina;
    this.lancamentoService.pesquisar(this.filter)
    .then(results => {
      this.lancamentos = results.lancamentos;
      this.totalRegistros = results.total;
    });
  }

}
