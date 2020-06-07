import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { ToastyService } from 'ng2-toasty';

import { Pessoa } from 'src/app/core/model';
import { PessoaService } from '../pessoa.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-pessoas-cadastro',
  templateUrl: './pessoas-cadastro.component.html',
  styleUrls: ['./pessoas-cadastro.component.css']
})
export class PessoasCadastroComponent implements OnInit {

  pessoa = new Pessoa();

  constructor(
    private pessoaService: PessoaService,
    private toastyService: ToastyService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private errorHandlerService: ErrorHandlerService
  ) { }

  ngOnInit() {
    const codigoPessoaSelecionada = this.route.snapshot.params[`codigo`];
    if (codigoPessoaSelecionada) {
      this.carregarCampos(codigoPessoaSelecionada);
    }
    this.title.setTitle('Nova Pessoa');
  }

  get editando() {
    return Boolean (this.pessoa.codigo);
  }

  novo(form: NgForm) {
    form.reset(new Pessoa());
    this.router.navigate(['/pessoas/nova']);
  }

  carregarCampos(codigo: number) {
    return this.pessoaService.buscarPeloCodigo(codigo)
      .then(pessoa => {
        this.pessoa = pessoa;
        this.atualizaTitulo();
      })
      .catch(erro => this.errorHandlerService.handler(erro));
  }

  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizar(this.pessoa);
    } else {
      this.adicionar(form);
    }
  }

  atualizar(pessoa: Pessoa) {
    return this.pessoaService.atualizar(this.pessoa)
      .then(pessoaAtualizada => {
        this.pessoa = pessoaAtualizada;
        this.toastyService.success('Pessoa atualizada com sucesso');
        this.atualizaTitulo();
      })
      .catch(erro => this.errorHandlerService.handler(erro));
  }

  adicionar(form: NgForm) {
    return this.pessoaService.adicionar(this.pessoa)
      .then(pessoaAdicionada => {
        this.toastyService.success('Pessoa adicionada com sucesso');
        this.router.navigate(['/pessoas', pessoaAdicionada.codigo]);
      })
      .catch(erro => this.errorHandlerService.handler(erro));
  }

  atualizaTitulo() {
    this.title.setTitle(`Edição de Pessoa: ${this.pessoa.nome}`);
  }

}
