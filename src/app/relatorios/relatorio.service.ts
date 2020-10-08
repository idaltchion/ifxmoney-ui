import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';

import * as moment from 'moment';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {
  lancamentoUrl: string;

  constructor(private http: HttpClient) {
    this.lancamentoUrl = `${environment.apiURL}/lancamentos`;
  }

  relatorioLancamentoPorPessoa(dataInicio: Date, dataFim: Date) {
    let params = new HttpParams();
    params = params.set('dataInicial', moment(dataInicio).format('YYYY-MM-DD'));
    params = params.set('dataFinal', moment(dataFim).format('YYYY-MM-DD'));

    return this.http.get(`${this.lancamentoUrl}/relatorios/por-pessoa`,
      {params, responseType: 'blob'})
      .toPromise()
      .then(response => response);
  }

}
