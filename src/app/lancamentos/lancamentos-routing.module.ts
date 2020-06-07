import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentosCadastroComponent } from './lancamentos-cadastro/lancamentos-cadastro.component';
import { AuthGuard } from '../seguranca/auth.guard';

const routes: Routes = [
    {
      path: 'lancamentos',
      component: LancamentosPesquisaComponent,
      canDeactivate: [AuthGuard],
      data: {
        routes: 'ROLE_PESQUISAR_LANCAMENTO'
      }
    },
    {
      path: 'lancamentos/novo',
      component: LancamentosCadastroComponent,
      data: {
        roles: 'ROLE_CADASTRAR_LANCAMENTO'
      }
    },
    {
      path: 'lancamentos/:codigo',
      component: LancamentosCadastroComponent,
      data: {
        roles: 'ROLE_CADASTRAR_LANCAMENTO'
      }
    }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class LancamentosRoutingModule { }
