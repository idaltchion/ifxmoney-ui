import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-message',
  template: `
    <div *ngIf="hasError()"
      class="ui-messages ui-messages-error">
    {{ text }}
    </div>
  `,
  styles: [`
    .ui-messages-error {
      border-radius: 5px;
    }
  `]
})
export class MessageComponent {

  @Input() control: FormControl;
  @Input() error: string;
  @Input() text: string;

  hasError(): boolean {
    if (this.control.hasError('required') && (!this.text)) {
      this.text = '* Preenchimento obrigatório';
    }
    return this.control.hasError(this.error) && this.control.dirty;
  }

}
