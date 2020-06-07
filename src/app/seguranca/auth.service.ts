import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oAuthTokenURL = 'http://localhost:8080/oauth/token';
  jwtPayload: any;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) {
    this.carregarToken();
   }

  login(usuario: string, senha: string): Promise<void> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const body = `username=${usuario}&password=${senha}&grant_type=password`;
    return this.http.post(this.oAuthTokenURL, body, { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        const accessToken = response[`access_token`];
        this.armazenarToken(accessToken);
      })
      .catch(response => {
        const responseError = response.error;
        if (response.status === 400) {
          if (responseError.error === 'invalid_grant') {
            return Promise.reject('Usuário e/ou senha inválidos');
          }
        }
        return responseError;
      });
  }

  private armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    /* permite que o token seja armazenado no browser, podendo fechar e nao deslogar da app se o token ainda estiver valido - ver getitem */
    localStorage.setItem('token', token);
  }

  private carregarToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.armazenarToken(token);
    }
  }

  obterNovoAccessToken(): Promise<void> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const body = 'grant_type=refresh_token';
    return this.http.post(this.oAuthTokenURL, body, { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        const novoAccessToken = response[`access_token`];
        this.armazenarToken(novoAccessToken);
        return Promise.resolve(null);
      })
      .catch(response => {
        console.error('Erro ao renovar token', response);
        return Promise.resolve(null);
      });
  }

  getUsername() {
    return (this.jwtPayload.nome) ? this.jwtPayload.nome : '';
  }

  temPermissao(permissao: string): boolean {
    return (this.jwtPayload && this.jwtPayload.authorities.includes(permissao));
  }

  temAlgumaPermissao(roles) {
    for (const role of roles) {
      if (this.temPermissao(role)) {
        return true;
      }
    }
    return false;
  }

  isInvalidAccessToken() {
    const token = localStorage.getItem('token');
    return !token || this.jwtHelper.isTokenExpired(token);
  }

}
