import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';

import { Pessoa } from 'src/app/core/model';
import { PessoaService } from '../pessoa.service';
import { ToastyService } from 'ng2-toasty';
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
    private errorHandlerService: ErrorHandlerService
  ) { }

  ngOnInit() {
  }

  salvar(form: NgForm) {
    console.log(this.pessoa);
    return this.pessoaService.adicionar(this.pessoa)
      .then( () => {
        this.toastyService.success('Pessoa adicionada com sucesso');
        form.reset();
      })
      .catch(erro => this.errorHandlerService.handler(erro));
  }

}
