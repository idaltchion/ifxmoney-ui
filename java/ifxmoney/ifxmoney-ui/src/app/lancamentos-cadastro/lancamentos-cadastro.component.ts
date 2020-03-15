import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamentos-cadastro',
  templateUrl: './lancamentos-cadastro.component.html',
  styleUrls: ['./lancamentos-cadastro.component.css']
})
export class LancamentosCadastroComponent implements OnInit {

  constructor() { }

  tipos = [
    {label: 'Receita', value: 'RECEITA'},
    {label: 'Despesa', value: 'DESPESA'}
  ];

  categorias = [
    {label: 'Alimentação', value: 1},
    {label: 'Transporte', value: 2},
    {label: 'Educação', value: 3}
  ];

  pessoas = [
    {label: 'Jose da Silva', value: 1},
    {label: 'Maria da Silva', value: 2},
    {label: 'Marina Joaquina', value: 3}
  ];

  ngOnInit() {
  }

}
