import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    /* avaliar se o token esta invalido, tenta obter um novo access token, se mesmo assim nao conseguir
    (refresh token pode estar expirado), redireciona para login para poder gerar um novo refresh token
    */
    if (this.auth.isInvalidAccessToken()) {
      return this.auth.obterNovoAccessToken()
        .then(() => {
          if (this.auth.isInvalidAccessToken()) {
            this.router.navigate(['/login']);
            return false;
          }
          return true;
        });
    } else if (next.data.roles && !this.auth.temAlgumaPermissao(next.data.roles)) {
      this.router.navigate(['/acesso-nao-autorizado']);
      return false;
    }
    return true;
  }
}
