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
    } else if (errorResponse instanceof HttpErrorResponse
                && errorResponse.status >= 400
                && errorResponse.status <= 499) {
        const errors = errorResponse.error;
        msg = errors[0].mensagemUsuario;
    } else {
        msg = 'Erro ao processar o serviço remoto. Tente novamente.';
    }
    this.toasty.error(msg);
  }

}
