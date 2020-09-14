import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  logon(email: string, senha: string) {
    this.auth.login(email, senha)
      .then(() => {
        this.router.navigate(['/dashboard']);
      })
      .catch(erro => {
        this.errorHandler.handler(erro);
      });
  }

}
