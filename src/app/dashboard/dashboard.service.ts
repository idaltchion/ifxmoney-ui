import { Injectable } from '@angular/core';


import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import 'rxjs/operator/toPromise';
import * as moment from 'moment';


@Injectable({
  providedIn: 'root'
})

export class DashboardService {

  lancamentosURL: string;

  constructor(private http: HttpClient) {
    this.lancamentosURL = `${environment.apiURL}/lancamentos`;
  }

  lancamentosPorCategoria(): Promise<Array<any>> {
    return this.http.get(`${this.lancamentosURL}/estatisticas/por-categoria`)
      .toPromise()
      .then(response => response as Array<any>);
  }

  lancamentosPorDia(): Promise<Array<any>> {
    return this.http.get(`${this.lancamentosURL}/estatisticas/por-dia`)
      .toPromise()
      .then(response => {
        const dados = response as Array<any>;
        this.converterStringParaDatas(dados);
        return dados;
      });
  }

  converterStringParaDatas(dados: Array<any>) {
    for (const dado of dados) {
      dado.dia = moment(dado.dia, 'YYYY-MM-DD').toDate();
    }
  }

}
