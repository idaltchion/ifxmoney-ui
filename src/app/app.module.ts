import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/* Imports from third components and modules */
import { ToastyModule } from 'ng2-toasty';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

/* Imports from custom components and modules */
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { CoreModule } from './core/core.module';
import { PessoaService } from './pessoas/pessoa.service';
import { LancamentoService } from './lancamentos/lancamento.service';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    /* Third imports */
    ToastyModule.forRoot(),
    ConfirmDialogModule,

    /* Custons imports */
    LancamentosModule,
    PessoasModule,
    CoreModule
  ],
  providers: [
    LancamentoService,
    PessoaService,
    ConfirmationService,
    { provide: LOCALE_ID, useValue: 'pt-BR'}
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
