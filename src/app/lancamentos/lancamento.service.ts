import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';

import { Lancamento } from '../core/model';
import { environment } from 'src/environments/environment';

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
  lancamentoURL: string;

  constructor(private http: HttpClient) {
    this.lancamentoURL = `${environment.apiURL}/lancamentos`;
   }

  pesquisar(filter: LancamentoFilter): Promise<any> {
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
    return this.http.get(`${this.lancamentoURL}?resumo`, { params })
      .toPromise()
      .then(response => {
        const content = response[`content`];
        const results = {
          lancamentos: content,
          total: response[`totalElements`]
        };
        return results;
      });
  }

  adicionar(lancamento: Lancamento): Promise<Lancamento> {
    /* no cadastro a api retorna o lancamento, portanto, ja podera ser retornado o tipo Lancamento ja na propria requisicao */
    return this.http.post<Lancamento>(this.lancamentoURL, lancamento)
      .toPromise();
  }

  remover(codigo: number): Promise<any> {
    return this.http.delete(`${this.lancamentoURL}/${codigo}`)
      .toPromise()
      .then( () => null );
  }

  atualizar(lancamento: Lancamento): Promise<Lancamento> {
    return this.http.put<Lancamento>(`${this.lancamentoURL}/${lancamento.codigo}`, lancamento)
      .toPromise()
      .then((response) => {
        const lancamentoAtualizado = response as Lancamento;
        this.converterStringParaDatas([response]);
        return lancamentoAtualizado;
      });
  }

  buscarPeloCodigo(codigo: number): Promise<Lancamento> {
    return this.http.get<Lancamento>(`${this.lancamentoURL}/${codigo}`)
      .toPromise()
      .then(response => {
        const lancamento = response as Lancamento;
        this.converterStringParaDatas([lancamento]);
        return lancamento;
      });
  }

  urlAnexo(): string {
    return `${this.lancamentoURL}/anexo`;
  }

  private converterStringParaDatas(lancamentos: Lancamento[]) {
    for (const lancamento of lancamentos) {
      lancamento.dataVencimento = moment(lancamento.dataVencimento, 'YYYY-MM-DD').toDate();
      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = moment(lancamento.dataPagamento, 'YYYY-MM-DD').toDate();
      }
    }
  }

}
