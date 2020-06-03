import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';
import { Lancamento } from '../core/model';

export class LancamentoFilter {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})

export class LancamentoService {

  constructor(private http: HttpClient) { }

  lancamentoURL = 'http://localhost:8080/lancamentos';

  pesquisar(filter: LancamentoFilter): Promise<any> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AaWZ4bW9uZXkuY29tOmFkbWlu');
    let params = new HttpParams();

    params = params.set('page', filter.pagina.toString());
    params = params.set('size', filter.itensPorPagina.toString());

    if (filter.descricao) {
      params = params.set('descricao', filter.descricao);
    }

    if (filter.dataVencimentoInicio) {
      params = params.set('dataVencimentoDe', moment(filter.dataVencimentoInicio).format('YYYY-MM-DD'));
    }

    if (filter.dataVencimentoFim) {
      params = params.set('dataVencimentoAte', moment(filter.dataVencimentoFim).format('YYYY-MM-DD'));
    }

    return this.http.get(`${this.lancamentoURL}?resumo`, { headers, params })
      .toPromise()
      .then(response => {
        const content = response['content'];
        const results = {
          lancamentos: content,
          total: response['totalElements']
        };
        return results;
      });
  }

  adicionar(lancamento: Lancamento): Promise<Lancamento> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic YWRtaW5AaWZ4bW9uZXkuY29tOmFkbWlu');
    headers = headers.append('Content-Type', 'application/json');
    /* no cadastro a api retorna o lancamento, portanto, ja podera ser retornado o tipo Lancamento ja na propria requisicao */
    return this.http.post<Lancamento>(this.lancamentoURL, JSON.stringify(lancamento), {headers})
      .toPromise();
  }

  remover(codigo: number): Promise<any> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AaWZ4bW9uZXkuY29tOmFkbWlu');
    return this.http.delete(`${this.lancamentoURL}/${codigo}`, { headers })
      .toPromise()
      .then( () => null );
  }

}
