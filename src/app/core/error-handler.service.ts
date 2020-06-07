import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { ToastyService } from 'ng2-toasty';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private toasty: ToastyService) { }

  handler(errorResponse: any) {
    let msg: string;

    if (typeof errorResponse === 'string') {
      msg = errorResponse;
    } else if (errorResponse instanceof HttpErrorResponse
        && errorResponse.status >= 400 && errorResponse.status <= 499) {
          let errors;
          msg = 'Ocorreu um erro ao processar sua solicitação';

          if (errorResponse.status === 403) {
            msg = 'Usuario sem permissão para completar a operação';
          }

          try {
            errors = errorResponse.error;
            msg = errors[0].mensagemUsuario;
          } catch (e) { }
          console.error('Erro', errorResponse);
    } else {
        msg = 'Erro ao processar o serviço remoto. Tente novamente.';
        console.error('Erro', errorResponse);
    }
    this.toasty.error(msg);
  }
}
