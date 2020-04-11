import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-lancamentos-grid',
  templateUrl: './lancamentos-grid.component.html',
  styles: []
})

export class LancamentosGridComponent {

  @Input() lancamentos: [];

  constructor() { }

}
