import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient) { }

  categoriaUrl = 'http://localhost:8080/categorias';

  listarTodas(): Promise<any> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AaWZ4bW9uZXkuY29tOmFkbWlu');
    return this.http.get(this.categoriaUrl, {headers})
      .toPromise()
      .then(response => response);
  }

}
