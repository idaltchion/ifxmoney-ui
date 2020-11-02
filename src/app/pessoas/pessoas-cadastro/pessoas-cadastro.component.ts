import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { ToastyService } from 'ng2-toasty';

import { Contato, Pessoa } from 'src/app/core/model';
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
  exibindoDialogoContato = false;
  contato: Contato;
  contatoIndex: number;
  isEditandoContato = false;

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
      }),
      contatos: this.formBuilder.array([])
    });
  }

  createContatoFormGroup(): FormGroup {
    return this.formBuilder.group({
      codigo: [],
      nome: [null, Validators.required],
      email: [null, Validators.required],
      telefone: [null, Validators.required]
    });
  }

  prepararNovoContato() {
    this.isEditandoContato = false;
    this.exibindoDialogoContato = true;
    this.contato = new Contato();
    this.contatoIndex = this.pessoa.contatos.length;
    console.log(this.pessoa.contatos);
  }

  editarContato(contato: Contato, contatoIndex: number) {
    this.contato = this.novoContato(contato);
    this.exibindoDialogoContato = true;
    this.contatoIndex = contatoIndex;
    this.isEditandoContato = true;
    console.log(this.contato);
    console.log(this.contatoIndex);
  }

  removerContato(contatoIndex: number) {
    const contatosFormArray = this.formulario.get('contatos') as FormArray;
    contatosFormArray.removeAt(contatoIndex);
    this.pessoa.contatos.splice(contatoIndex, 1);
  }

  confirmarContato(form: NgForm) {
    this.pessoa.contatos[this.contatoIndex] = this.novoContato(this.contato);
    const contatosFormArray = this.formulario.get('contatos') as FormArray;
    if (!this.isEditandoContato) {
      contatosFormArray.push(this.createContatoFormGroup());
    }
    this.formulario.patchValue(this.pessoa);
    this.exibindoDialogoContato = false;
    form.reset();
  }

  novoContato(contato: Contato): Contato {
    return new Contato(contato.codigo, contato.nome, contato.email, contato.telefone);
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
          this.atualizaTitulo();
          pessoa.contatos.forEach(() => {
            contatosFormArray.push(this.createContatoFormGroup());
          });
          this.formulario.patchValue(pessoa);
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
