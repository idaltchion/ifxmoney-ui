/* Imports from angular */
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

/* Imports from 3rd */
import { ToastyModule } from 'ng2-toasty';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

/* Imports from custom components and modules */
import { ErrorHandlerService } from './error-handler.service';
import { NavbarComponent } from './navbar/navbar.component';
import { LancamentoService } from '../lancamentos/lancamento.service';
import { PessoaService } from '../pessoas/pessoa.service';
import { ConfirmationService } from 'primeng/api';
import { CategoriaService } from '../categorias/categoria.service';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,

    /* Imports from 3rd */
    ToastyModule.forRoot(),
    ConfirmDialogModule,

    /* Custom imports */


  ],
  exports: [
    NavbarComponent,
    ToastyModule,
    ConfirmDialogModule
  ],
  providers: [
    ErrorHandlerService,
    LancamentoService,
    PessoaService,
    ConfirmationService,
    CategoriaService,
    { provide: LOCALE_ID, useValue: 'pt-BR'}
  ]
})
export class CoreModule { }