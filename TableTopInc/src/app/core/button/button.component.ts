import { Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  @Input() data: {value: string, data: Object};
  @Output() buttonPressed = new EventEmitter<Object>();
  constructor() { }

  clickHandler() {
    this.buttonPressed.emit(this.data.data);
  }
}
