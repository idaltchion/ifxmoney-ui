/* Imports from angular */
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import { RouterModule } from '@angular/router';
import localePt from '@angular/common/locales/pt';

/* Imports from 3rd */
import { ToastyModule } from 'ng2-toasty';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { JwtModule } from '@auth0/angular-jwt';

/* Imports from custom components and modules */
import { ErrorHandlerService } from './error-handler.service';
import { NavbarComponent } from './navbar/navbar.component';
import { LancamentoService } from '../lancamentos/lancamento.service';
import { PessoaService } from '../pessoas/pessoa.service';
import { ConfirmationService } from 'primeng/api';
import { CategoriaService } from '../categorias/categoria.service';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../seguranca/auth.service';
import { AcessoNaoAutorizadoComponent } from './acesso-nao-autorizado.component';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent,
    AcessoNaoAutorizadoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,

    /* Imports from 3rd */
    ToastyModule.forRoot(),
    ConfirmDialogModule,
    JwtModule

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
    AuthService,
    Title,
    { provide: LOCALE_ID, useValue: 'pt-BR'}
  ]
})
export class CoreModule { }
