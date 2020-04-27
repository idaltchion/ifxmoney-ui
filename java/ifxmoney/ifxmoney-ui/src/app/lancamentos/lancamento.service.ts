import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentoURL = 'http://localhost:8080/lancamentos';

  constructor(private http: HttpClient) { }

  pesquisar(): Promise<any> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AaWZ4bW9uZXkuY29tOmFkbWlu');
    return this.http.get(`${this.lancamentoURL}?resumo`, { headers })
    .toPromise()
    .then(results => results['content']);
  }

}
