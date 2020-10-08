import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { RelatorioService } from '../relatorio.service';

@Component({
  selector: 'app-relatorio-lancamentos',
  templateUrl: './relatorio-lancamentos.component.html',
  styleUrls: ['./relatorio-lancamentos.component.css']
})
export class RelatorioLancamentosComponent implements OnInit {
  formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private relatorioService: RelatorioService
  ) {}


  ngOnInit() {
    this.configurarFormulario();
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      dataInicial: [null, Validators.required],
      dataFinal: [null, Validators.required]
    });
  }

  gerarRelatorio() {
    const dataInicial = this.formulario.get('dataInicial').value;
    const dataFinal = this.formulario.get('dataFinal').value;
    this.relatorioService.relatorioLancamentoPorPessoa(dataInicial, dataFinal)
      .then(relatorio => {
        const url = window.URL.createObjectURL(relatorio);
        window.open(url);
      });
  }
}
