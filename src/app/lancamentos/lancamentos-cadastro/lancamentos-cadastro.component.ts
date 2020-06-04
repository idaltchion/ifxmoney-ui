import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CategoriaService } from 'src/app/categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { Lancamento } from 'src/app/core/model';
import { LancamentoService } from '../lancamento.service';
import { ToastyService } from 'ng2-toasty';
import { Title } from '@angular/platform-browser';

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
    private errorHandler: ErrorHandlerService
  ) { }

  tipos = [
    {label: 'Receita', value: 'RECEITA'},
    {label: 'Despesa', value: 'DESPESA'}
  ];

  categorias = [];
  pessoas = [];
  lancamento = new Lancamento();

  ngOnInit() {
    const codigoLancamentoCarregado = this.route.snapshot.params['codigo'];
    if (codigoLancamentoCarregado) {
      this.carregarCampos(codigoLancamentoCarregado);
    }
    this.title.setTitle('Novo Lançamento');
    this.carregarCategorias();
    this.carregarPessoas();
  }

  get editando() {
    return Boolean (this.lancamento.codigo);
  }

  novo(form: NgForm) {
    form.reset(new Lancamento()); /* funciona como se fosse um 'limpar campos' do form */
    this.router.navigate(['/lancamentos/novo']);
  }

  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizar(this.lancamento);
    } else {
      this.adicionar(form);
    }
  }

  adicionar(form: NgForm) {
    return this.lancamentoService.adicionar(this.lancamento)
    .then(lancamentoAdicionado => {
      this.toastyService.success('Lancamento adicionado com sucesso');
      this.router.navigate(['/lancamentos', lancamentoAdicionado.codigo]);
    })
    .catch(erro => this.errorHandler.handler(erro));
  }

  carregarCampos(codigo: number) {
    this.lancamentoService.buscarPeloCodigo(codigo)
      .then((lancamento) => {
        this.lancamento = lancamento;
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
        this.lancamento = lancamentoAtualizado;
        this.atualizarTitulo();
        this.toastyService.success('Lancamento atualizado com sucesso');
      })
      .catch(erro => this.errorHandler.handler(erro));
  }

  atualizarTitulo() {
    this.title.setTitle(`Edição de lançamento: ${this.lancamento.descricao}`);
  }

}
