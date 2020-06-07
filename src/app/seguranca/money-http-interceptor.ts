import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, from, merge } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

export class NotAuthenticatedError {}

@Injectable()
export class MoneyHttpInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!req.url.includes('/oauth/token') && this.auth.isInvalidAccessToken()) {
            return from(this.auth.obterNovoAccessToken())
                .pipe(
                    mergeMap(() => {
                        if (this.auth.isInvalidAccessToken()) {
                            /*
                            criando uma classe especifica para tratamento de erro quando o refresh token expirar
                            TODO: testar tentando interceptar o HttpErrorResponse com codigo 401 na classe handler
                            */
                            throw new NotAuthenticatedError();
                        }
                        req = req.clone({
                            setHeaders: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`
                            }
                        });
                        return next.handle(req);
                    })
                );
        }
        return next.handle(req);
    }

}
