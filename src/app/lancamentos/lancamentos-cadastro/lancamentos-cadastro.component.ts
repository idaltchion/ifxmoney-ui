import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { ToastyService } from 'ng2-toasty';

import { CategoriaService } from 'src/app/categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { Lancamento } from 'src/app/core/model';
import { LancamentoService } from '../lancamento.service';

@Component({
  selector: 'app-lancamentos-cadastro',
  templateUrl: './lancamentos-cadastro.component.html',
  styleUrls: ['./lancamentos-cadastro.component.css']
})

export class LancamentosCadastroComponent implements OnInit {

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private toastyService: ToastyService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private errorHandler: ErrorHandlerService,
    private formBuilder: FormBuilder
  ) { }

  tipos = [
    {label: 'Receita', value: 'RECEITA'},
    {label: 'Despesa', value: 'DESPESA'}
  ];

  categorias = [];
  pessoas = [];
  formulario: FormGroup;
  isUploadInProgress = false;

  ngOnInit() {
    this.configurarFormulario();
    const codigoLancamentoCarregado = this.route.snapshot.params[`codigo`];
    if (codigoLancamentoCarregado) {
      this.carregarCampos(codigoLancamentoCarregado);
    }
    this.title.setTitle('Novo Lançamento');
    this.carregarCategorias();
    this.carregarPessoas();
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      codigo: [],
      tipo: ['RECEITA', Validators.required],
      dataVencimento: [null, Validators.required],
      dataPagamento: [],
      descricao: [null, [Validators.required, Validators.minLength(5)]],
      valor: [null, Validators.required],
      categoria: this.formBuilder.group({
        codigo: [null, Validators.required],
        nome: []
      }),
      pessoa: this.formBuilder.group({
        codigo: [null, Validators.required],
        nome: []
      }),
      observacao: [],
      anexo: [],
      urlAnexo: []
    });
  }

  get editando() {
    return Boolean (this.formulario.get('codigo').value);
  }

  novo() {
    this.formulario.reset(new Lancamento()); /* funciona como se fosse um 'limpar campos' do form */
    this.router.navigate(['/lancamentos/novo']);
  }

  salvar() {
    if (this.editando) {
      this.atualizar(this.formulario.value);
    } else {
      this.adicionar();
    }
  }

  adicionar() {
    return this.lancamentoService.adicionar(this.formulario.value)
    .then(lancamentoAdicionado => {
      this.toastyService.success('Lancamento adicionado com sucesso');
      this.router.navigate(['/lancamentos', lancamentoAdicionado.codigo]);
    })
    .catch(erro => this.errorHandler.handler(erro));
  }

  carregarCampos(codigo: number) {
    this.lancamentoService.buscarPeloCodigo(codigo)
      .then((lancamento) => {
        this.formulario.patchValue(lancamento);
        this.atualizarTitulo();
      })
      .catch(erro => this.errorHandler.handler(erro));
  }

  carregarCategorias() {
    return this.categoriaService.listarTodas()
    .then(results => {
      this.categorias = results.map(c => ({label: c.nome, value: c.codigo}));
    })
      .catch(erro => this.errorHandler.handler(erro));
  }

  carregarPessoas() {
    return this.pessoaService.listarTodas()
      .then(results => {
        this.pessoas = results.map(p => ({label: p.nome, value: p.codigo}));
      })
      .catch(erro => this.errorHandler.handler(erro));
  }

  atualizar(lancamento: Lancamento) {
    return this.lancamentoService.atualizar(lancamento)
      .then((lancamentoAtualizado) => {
        this.formulario.patchValue(lancamentoAtualizado);
        this.atualizarTitulo();
        this.toastyService.success('Lancamento atualizado com sucesso');
      })
      .catch(erro => this.errorHandler.handler(erro));
  }

  atualizarTitulo() {
    this.title.setTitle(`Edição de lançamento: ${this.formulario.get('descricao').value}`);
  }

  get urlAnexo() {
    return this.lancamentoService.urlAnexo();
  }

  get getNomeAnexo() {
    const nome = this.formulario.get('anexo').value;
    if (nome) {
      return nome.substring(nome.indexOf('_') + 1, nome.length);
    }
    return '';
  }

  setInfoAnexo(event) {
    const anexo = event.originalEvent.body;
    this.formulario.patchValue({
      anexo: anexo.nome,
      urlAnexo: anexo.url
    });
    this.isUploadInProgress = false;
  }

  getErrorUploadAnexo(event) {
    this.toastyService.error('Erro ao anexar arquivo');
    this.isUploadInProgress = false;
  }

  setStatusUpload() {
    this.isUploadInProgress = true;
  }

  removerAnexo() {
    this.formulario.patchValue({
      anexo: null,
      urlAnexo: null
    });
  }
}
