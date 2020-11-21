import { Component, OnInit, Input, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { ToastyService } from 'ng2-toasty';

import { Cidade, Estado, Pessoa } from 'src/app/core/model';
import { PessoaService } from '../pessoa.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-pessoas-cadastro',
  templateUrl: './pessoas-cadastro.component.html',
  styleUrls: ['./pessoas-cadastro.component.css']
})
export class PessoasCadastroComponent implements OnInit {

  formulario: FormGroup;
  pessoa = new Pessoa();
  estados = [];
  cidades = [];
  estadoSelecionado: number;

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
    this.carregarEstados();
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
        cidade: this.formBuilder.group({
          codigo: [null, Validators.required],
          nome: [],
          estado: this.formBuilder.group({
            codigo: [null, Validators.required],
            nome: []
          })
        })
      }),
      contatos: this.formBuilder.array([])
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
          this.pessoa = pessoa;

          const contatosFormArray = this.formulario.get('contatos') as FormArray;
          pessoa.contatos.forEach(() => {
            contatosFormArray.push(this.createContatoFormGroup());
          });
          this.formulario.patchValue(pessoa);
          this.atualizaTitulo();
          this.carregarCidades();
        })
      .catch(erro => this.errorHandlerService.handler(erro));
  }

  createContatoFormGroup(): FormGroup {
    return this.formBuilder.group({
      codigo: [],
      nome: [null, Validators.required],
      email: [null, Validators.required],
      telefone: [null, Validators.required]
    });
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

  carregarEstados() {
    return this.pessoaService.listarEstados()
      .then(response => {
        this.estados = response.map(uf => ({label: uf.nome, value: uf.codigo}));
      })
      .catch(erro => this.errorHandlerService.handler(erro));
  }

  carregarCidades() {
    const estado = this.formulario.get('endereco.cidade.estado').value;
    return this.pessoaService.pesquisarCidade(estado.codigo)
      .then(results => {
        this.cidades = results.map(c => ({label: c.nome, value: c.codigo}));
      })
      .catch(erro => this.errorHandlerService.handler(erro));
  }

}
