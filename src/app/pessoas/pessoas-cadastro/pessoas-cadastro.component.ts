import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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

  formulario: FormGroup;

  constructor(
    private pessoaService: PessoaService,
    private toastyService: ToastyService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private errorHandlerService: ErrorHandlerService,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit() {
    this.carregarFormulario();
    const codigoPessoaSelecionada = this.route.snapshot.params[`codigo`];
    if (codigoPessoaSelecionada) {
      this.carregarCampos(codigoPessoaSelecionada);
    }
    this.title.setTitle('Nova Pessoa');
  }

  carregarFormulario() {
    this.formulario = this.formBuilder.group({
      codigo: [],
      ativo: [true, Validators.required],
      nome: [null, Validators.required],
      endereco: this.formBuilder.group({
        logradouro: [null, Validators.required],
        numero: [null, Validators.required],
        complemento: [],
        bairro: [null, Validators.required],
        cep: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      })
    });
  }

  get editando() {
    return Boolean (this.formulario.get('codigo').value);
  }

  novo() {
    this.formulario.reset(new Pessoa());
    this.router.navigate(['/pessoas/nova']);
  }

  carregarCampos(codigo: number) {
    return this.pessoaService.buscarPeloCodigo(codigo)
      .then(pessoa => {
        this.formulario.patchValue(pessoa);
        this.atualizaTitulo();
      })
      .catch(erro => this.errorHandlerService.handler(erro));
  }

  salvar() {
    if (this.editando) {
      this.atualizar(this.formulario.value);
    } else {
      this.adicionar();
    }
  }

  atualizar(pessoa: Pessoa) {
    return this.pessoaService.atualizar(this.formulario.value)
      .then(pessoaAtualizada => {
        this.formulario.patchValue(pessoaAtualizada);
        this.toastyService.success('Pessoa atualizada com sucesso');
        this.atualizaTitulo();
      })
      .catch(erro => this.errorHandlerService.handler(erro));
  }

  adicionar() {
    return this.pessoaService.adicionar(this.formulario.value)
      .then(pessoaAdicionada => {
        this.toastyService.success('Pessoa adicionada com sucesso');
        this.router.navigate(['/pessoas', pessoaAdicionada.codigo]);
      })
      .catch(erro => this.errorHandlerService.handler(erro));
  }

  atualizaTitulo() {
    this.title.setTitle(`Edição de Pessoa: ${this.formulario.get('nome').value}`);
  }

}
