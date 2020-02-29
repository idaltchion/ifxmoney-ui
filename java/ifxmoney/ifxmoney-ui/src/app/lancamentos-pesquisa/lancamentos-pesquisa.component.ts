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
      tipo: 'DESPESA', descricao: 'Compra de pao', valor: '32,40', dataVencimento: '31/01/2009',
        dataPagamento: '12/02/2009', pessoa: 'Francisco Vargas'
    },
    {
      tipo: 'RECEITA', descricao: 'Recebimento de dividendos', valor: '254,30', dataVencimento: '12/08/2019',
        dataPagamento: '17/09/2019', pessoa: 'Geraldo Silva'
    },
    {
      tipo: 'RECEITA', descricao: 'aaaaaaaaaaaaaaaa', valor: '254,30', dataVencimento: '12/08/2019',
        dataPagamento: '17/09/2019', pessoa: 'Geraldo Silva'
    },
    {
      tipo: 'RECEITA', descricao: 'bbbbbbbbbbbbbbbbbbb', valor: '254,30', dataVencimento: '12/08/2019',
        dataPagamento: '17/09/2019', pessoa: 'Geraldo Silva'
    },
    {
      tipo: 'RECEITA', descricao: 'Rrrrrrrrrrrrrrrrrrr', valor: '254,30', dataVencimento: '12/08/2019',
        dataPagamento: '17/09/2019', pessoa: 'Geraldo Silva'
    },
    {
      tipo: 'RECEITA', descricao: 'sssssssssssssssssssssss', valor: '254,30', dataVencimento: '12/08/2019',
        dataPagamento: '17/09/2019', pessoa: 'Geraldo Silva'
    },
    {
      tipo: 'RECEITA', descricao: 'eeeeeeeeeeeeeeeeeeeee', valor: '254,30', dataVencimento: '12/08/2019',
        dataPagamento: '17/09/2019', pessoa: 'Geraldo Silva'
    },
    {
      tipo: 'RECEITA', descricao: 'ooooooooooooooooooooooo', valor: '254,30', dataVencimento: '12/08/2019',
        dataPagamento: '17/09/2019', pessoa: 'Geraldo Silva'
    },
    {
      tipo: 'RECEITA', descricao: 'qqqqqqqqqqqqqqqqqqqqqqqqqqqqq', valor: '254,30', dataVencimento: '12/08/2019',
        dataPagamento: '17/09/2019', pessoa: 'Geraldo Silva'
    },
    {
      tipo: 'RECEITA', descricao: 'aaaaaaaaaaaaaaaa', valor: '254,30', dataVencimento: '12/08/2019',
        dataPagamento: '17/09/2019', pessoa: 'Geraldo Silva'
    },
    {
      tipo: 'RECEITA', descricao: 'bbbbbbbbbbbbbbbbbbb', valor: '254,30', dataVencimento: '12/08/2019',
        dataPagamento: '17/09/2019', pessoa: 'Geraldo Silva'
    },
    {
      tipo: 'RECEITA', descricao: 'Rrrrrrrrrrrrrrrrrrr', valor: '254,30', dataVencimento: '12/08/2019',
        dataPagamento: '17/09/2019', pessoa: 'Geraldo Silva'
    },
    {
      tipo: 'RECEITA', descricao: 'sssssssssssssssssssssss', valor: '254,30', dataVencimento: '12/08/2019',
        dataPagamento: '17/09/2019', pessoa: 'Geraldo Silva'
    }
  ]

}
