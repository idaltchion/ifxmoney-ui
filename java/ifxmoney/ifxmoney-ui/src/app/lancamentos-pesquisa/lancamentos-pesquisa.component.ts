import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent {

  constructor() { }

  lancamentos = [
    {
      tipo: 'DESPESA', descricao: 'Compra de pao', valor: '32.40', dataVencimento: new Date(2009, 1, 31),
        dataPagamento: new Date(2019, 12, 17), pessoa: 'Francisco Vargas'
    },
    {
      tipo: 'RECEITA', descricao: 'Recebimento de dividendos', valor: '8000', dataVencimento: new Date(2019, 8, 12),
        dataPagamento: new Date(2019, 1, 1), pessoa: 'Geraldo Silva'
    },
    {
      tipo: 'DESPESA', descricao: 'aaaaaaaaaaaaaaaa', valor: '150', dataVencimento: new Date(2019, 3, 21),
        dataPagamento: new Date(2019, 2, 13), pessoa: 'Geraldo Silva'
    },
    {
      tipo: 'RECEITA', descricao: 'bbbbbbbbbbbbbbbbbbb', valor: '14312', dataVencimento: new Date(2019, 10, 11),
        dataPagamento: new Date(2019, 4, 21), pessoa: 'Geraldo Silva'
    },
    {
      tipo: 'DESPESA', descricao: 'Rrrrrrrrrrrrrrrrrrr', valor: '55000', dataVencimento: new Date(2020, 1, 7),
        dataPagamento: new Date(2019, 5, 30), pessoa: 'Geraldo Silva'
    },
    {
      tipo: 'DESPESA', descricao: 'sssssssssssssssssssssss', valor: '155', dataVencimento: new Date(2020, 11, 6),
        dataPagamento: new Date(2019, 6, 19), pessoa: 'Geraldo Silva'
    },
    {
      tipo: 'RECEITA', descricao: 'eeeeeeeeeeeeeeeeeeeee', valor: '180', dataVencimento: new Date(2019, 8, 15),
        dataPagamento: new Date(2020, 11, 11), pessoa: 'Geraldo Silva'
    },
    {
      tipo: 'DESPESA', descricao: 'ooooooooooooooooooooooo', valor: '254.30', dataVencimento: new Date(2019, 7, 11),
        dataPagamento: new Date(2019, 10, 21), pessoa: 'Geraldo Silva'
    },
    {
      tipo: 'RECEITA', descricao: 'qqqqqqqqqqqqqqqqqqqqqqqqqqqqq', valor: '254.30', dataVencimento: new Date(2020, 5, 16),
        dataPagamento: new Date(2020, 8, 15), pessoa: 'Geraldo Silva'
    },
    {
      tipo: 'DESPESA', descricao: 'aaaaaaaaaaaaaaaa', valor: '12', dataVencimento: new Date(2019, 3, 21),
        dataPagamento: new Date(2020, 7, 12), pessoa: 'Geraldo Silva'
    },
    {
      tipo: 'RECEITA', descricao: 'bbbbbbbbbbbbbbbbbbb', valor: '0.25', dataVencimento: new Date(2019, 3, 21),
        dataPagamento: new Date(2020, 5, 6), pessoa: 'Geraldo Silva'
    },
    {
      tipo: 'RECEITA', descricao: 'Rrrrrrrrrrrrrrrrrrr', valor: '7890', dataVencimento: new Date(2019, 3, 21),
        dataPagamento: new Date(2019, 1, 31), pessoa: 'Geraldo Silva'
    },
    {
      tipo: 'DESPESA', descricao: 'sssssssssssssssssssssss', valor: '2754', dataVencimento: new Date(2019, 3, 21),
        dataPagamento: new Date(2020, 10, 21), pessoa: 'Geraldo Silva'
    }
  ];

}
