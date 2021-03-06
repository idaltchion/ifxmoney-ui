import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import { Cidade, Estado, Pessoa } from '../core/model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class PessoaFilter {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

export class PessoaService {
  pessoaURL: string;
  estadoURL: string;
  cidadeURL: string;

  constructor(private http: HttpClient) {
    this.pessoaURL = `${environment.apiURL}/pessoas`;
    this.estadoURL = `${environment.apiURL}/estados`;
    this.cidadeURL = `${environment.apiURL}/cidades`;
   }

  listarTodas(): Promise<any> {
    return this.http.get(this.pessoaURL)
      .toPromise()
      .then(response => response[`content`]);
  }

  pesquisar(filter: PessoaFilter): Promise<any> {
    let params = new HttpParams();
    params = params.set('size', filter.itensPorPagina.toString());
    params = params.set('page', filter.pagina.toString());
    if (filter.nome) {
      params = params.set('nome', filter.nome);
    }
    return this.http.get(`${this.pessoaURL}`, { params })
      .toPromise()
      .then(response => {
        const content = response[`content`];
        const totalElements = response[`totalElements`];
        const results = {
          pessoas: content,
          total: totalElements
        };
        return results;
      });
  }

  buscarPeloCodigo(codigo: number): Promise<Pessoa> {
    return this.http.get<Pessoa>(`${this.pessoaURL}/${codigo}`)
      .toPromise();
  }

  atualizar(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.put<Pessoa>(`${this.pessoaURL}/${pessoa.codigo}`, pessoa)
      .toPromise();
  }

  adicionar(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.post<Pessoa>(this.pessoaURL, pessoa)
      .toPromise();
  }

  remover(codigo: number): Promise<any> {
    return this.http.delete(`${this.pessoaURL}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  mudarStatus(codigo: number, status: boolean): Promise<any> {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.put(`${this.pessoaURL}/${codigo}/ativo`, status, { headers })
      .toPromise()
      .then(() => null);
  }

  listarEstados(): Promise<Estado[]> {
    return this.http.get<Estado[]>(this.estadoURL)
      .toPromise();
  }

  pesquisarCidade(codigoEstado): Promise<Cidade[]> {
    let params = new HttpParams();
    params = params.set('codigoEstado', codigoEstado);
    return this.http.get<Cidade[]>(this.cidadeURL, { params })
      .toPromise();
  }

}
