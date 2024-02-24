import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-menu-button',
  standalone: true,
  imports: [],
  templateUrl: './menu-button.component.html',
  styleUrl: './menu-button.component.scss',
})
export class MenuButtonComponent {
  @Input()
  selected = false;

  @Input()
  description = '';

  @Output()
  click = new EventEmitter<void>();

  constructor() {}

  onClick() {
    this.click.emit();
  }
}
