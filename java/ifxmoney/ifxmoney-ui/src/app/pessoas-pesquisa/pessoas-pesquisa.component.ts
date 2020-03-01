import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent {

  constructor() { }

  pessoas = [
    {nome: 'AAAAAAAAA', cidade: 'Rio de Janeiro', estado: 'RJ', ativo: true},
    {nome: 'BBBBBBBBB', cidade: 'São Paulo', estado: 'SP', ativo: false},
    {nome: 'CCCCCCCCC', cidade: 'São José dos Pinhais', estado: 'PR', ativo: false},
    {nome: 'DDDDDDDDDD', cidade: 'Curitiba', estado: 'PR', ativo: true},
    {nome: 'AAAAAAAAA', cidade: 'Rio de Janeiro', estado: 'RJ', ativo: true},
    {nome: 'BBBBBBBBB', cidade: 'São Paulo', estado: 'SP', ativo: false},
    {nome: 'AAAAAAAAA', cidade: 'Rio de Janeiro', estado: 'RJ', ativo: true},
    {nome: 'BBBBBBBBB', cidade: 'São Paulo', estado: 'SP', ativo: false},
    {nome: 'AAAAAAAAA', cidade: 'Rio de Janeiro', estado: 'RJ', ativo: true},
    {nome: 'BBBBBBBBB', cidade: 'São Paulo', estado: 'SP', ativo: false}
  ];

}
