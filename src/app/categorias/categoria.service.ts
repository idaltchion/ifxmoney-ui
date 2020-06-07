import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CategoriaService {
  categoriaUrl: string;

  constructor(private http: HttpClient) {
    this.categoriaUrl = `${environment.apiURL}/categorias`;
  }

  listarTodas(): Promise<any> {
    return this.http.get(this.categoriaUrl)
      .toPromise()
      .then(response => response);
  }
}
