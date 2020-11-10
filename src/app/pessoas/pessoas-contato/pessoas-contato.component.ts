import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { Contato, Pessoa } from 'src/app/core/model';

@Component({
  selector: 'app-pessoas-contato',
  templateUrl: './pessoas-contato.component.html',
  styleUrls: ['./pessoas-contato.component.css']
})

export class PessoasContatoComponent implements OnInit {
  exibindoDialogoContato = false;
  @Input() contatos: Array<Contato>;
  @Input() formulario: FormGroup;
  @Input() pessoa: Pessoa;
  contato: Contato;
  contatoIndex: number;
  isEditandoContato = false;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
  }

  prepararNovoContato() {
    this.contato = new Contato();
    this.isEditandoContato = false;
    this.exibindoDialogoContato = true;
    this.contatoIndex = this.contatos.length;
  }

  editarContato(contato: Contato, contatoIndex: number) {
    this.contato = this.novoContato(contato);
    this.exibindoDialogoContato = true;
    this.isEditandoContato = true;
    this.contatoIndex = contatoIndex;
  }

  removerContato(contatoIndex: number) {
    const contatosFormArray = this.formulario.get('contatos') as FormArray;
    contatosFormArray.removeAt(contatoIndex);
    this.contatos.splice(contatoIndex, 1);
  }

  confirmarContato(form: NgForm) {
    this.contatos[this.contatoIndex] = this.novoContato(this.contato);
    const contatosFormArray = this.formulario.get('contatos') as FormArray;
    if (!this.isEditandoContato) {
      contatosFormArray.push(this.createContatoFormGroup());
    }
    this.formulario.patchValue(this.pessoa);
    this.exibindoDialogoContato = false;
    form.reset();
  }

  /* TODO: refatorar, codigo duplicado */
  createContatoFormGroup(): FormGroup {
    return this.formBuilder.group({
      codigo: [],
      nome: [null, Validators.required],
      email: [null, Validators.required],
      telefone: [null, Validators.required]
    });
  }

  novoContato(contato: Contato): Contato {
    return new Contato(contato.codigo, contato.nome, contato.email, contato.telefone);
  }

  get editandoContato() {
    return this.contato && this.contato.codigo;
  }
}
