import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root'
})

export class PessoaFilter {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

export class PessoaService {

  constructor(private http: HttpClient) { }

  pessoaURL = 'http://localhost:8080/pessoas';

  listarTodos(): Promise<any> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AaWZ4bW9uZXkuY29tOmFkbWlu');
    return this.http.get(`${this.pessoaURL}`, { headers })
      .toPromise()
      .then(response => {
        const content = response['content'];
        const results = {
          pessoas: content
        };
        return results;
      });
  }

  pesquisar(filter: PessoaFilter): Promise<any> {
    let params = new HttpParams();
    params = params.set('size', filter.itensPorPagina.toString());
    params = params.set('page', filter.pagina.toString());
    if (filter.nome) {
      params = params.set('nome', filter.nome);
    }

    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AaWZ4bW9uZXkuY29tOmFkbWlu');

    return this.http.get(`${this.pessoaURL}`, { headers, params })
      .toPromise()
      .then(response => {
        const content = response['content'];
        const totalElements = response['totalElements'];
        const results = {
          pessoas: content,
          total: totalElements
        };
        return results;
      });
  }

}
