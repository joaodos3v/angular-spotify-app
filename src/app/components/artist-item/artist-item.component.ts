import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-artist-item',
  standalone: true,
  imports: [],
  templateUrl: './artist-item.component.html',
  styleUrl: './artist-item.component.scss',
})
export class ArtistItemComponent {
  @Input()
  imageSrc = '';

  @Output()
  click = new EventEmitter<void>();

  onClick() {
    this.click.emit();
  }
}
