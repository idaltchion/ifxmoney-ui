import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';
import { AcessoNaoAutorizadoComponent } from './core/acesso-nao-autorizado.component';

const routes: Routes = [
    { path: '', redirectTo: '/lancamentos', pathMatch: 'full' },
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
