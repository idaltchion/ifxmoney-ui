import { Injectable } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private toasty: ToastyService) { }

  handler(errorResponse: any) {
    let msg: string;
    if (typeof errorResponse === 'string') {
      msg = errorResponse;
    } else if (errorResponse instanceof Response
        && errorResponse.status >= 400 && errorResponse.status <= 499) {
        let errors;
        msg = 'Ocorreu um erro ao processar sua solicitação';
        try {
          errors = errorResponse;
          msg = errors[0].mensagemUsuario;
        } catch(e) { }
        console.error('Ocorreu um erro', errorResponse);
    } else {
        msg = 'Erro ao processar o serviço remoto. Tente novamente.';
        console.error('Ocorreu um erro', errorResponse);
    }
    this.toasty.error(msg);
  }

}
