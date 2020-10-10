import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';
import { AcessoNaoAutorizadoComponent } from './core/acesso-nao-autorizado.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { RelatorioLancamentosComponent } from './relatorios/relatorio-lancamentos/relatorio-lancamentos.component';

const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    // { path: 'dashboard', component: DashboardComponent },
    { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
    { path: 'acesso-nao-autorizado', component: AcessoNaoAutorizadoComponent },
    { path: '**', redirectTo: 'pagina-nao-encontrada' }
  ];

@NgModule({
    imports: [
      RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})

export class AppRoutingModule { }
