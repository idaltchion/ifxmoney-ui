import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { CategoriaService } from 'src/app/categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { Lancamento } from 'src/app/core/model';
import { LancamentoService } from '../lancamento.service';
import { ToastyService } from 'ng2-toasty';

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
    this.carregarCategorias();
    this.carregarPessoas();
  }

  get editando() {
    return Boolean (this.lancamento.codigo);
  }

  carregarCampos(codigo: number) {
    this.lancamentoService.buscarPeloCodigo(codigo)
      .then((lancamento) => {
        this.lancamento = lancamento;
      })
      .catch(erro => this.errorHandler.handler(erro));
  }

  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizar(this.lancamento);
      console.log('editando lancamento');
    } else {
      this.adicionar(form);
      console.log('adicionando lancamento');
    }
  }

  adicionar(form: NgForm) {
    return this.lancamentoService.adicionar(this.lancamento)
      .then( () => {
        this.toastyService.success('Lancamento adicionado com sucesso');
        form.reset();
        this.lancamento = new Lancamento();
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
        this.toastyService.success('Lancamento atualizado com sucesso');
      })
      .catch(erro => this.errorHandler.handler(erro));
  }

}
