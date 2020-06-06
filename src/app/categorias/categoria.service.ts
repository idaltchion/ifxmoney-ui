import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient) { }

  categoriaUrl = 'http://localhost:8080/categorias';

  listarTodas(): Promise<any> {
    return this.http.get(this.categoriaUrl)
      .toPromise()
      .then(response => response);
  }

}
