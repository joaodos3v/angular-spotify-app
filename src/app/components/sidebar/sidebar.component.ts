import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGuitar, faHome, faMusic, faSearch } from '@fortawesome/free-solid-svg-icons';
import { MenuButtonComponent } from 'src/app/components/menu-button/menu-button.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MenuButtonComponent, FontAwesomeModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  homeIcon = faHome;
  searchIcon = faSearch;
  artistIcon = faGuitar;
  playlistIcon = faMusic;

  selectedMenu = 'Home';

  constructor() {}

  buttonClick(menuTitle: string) {
    this.selectedMenu = menuTitle;
  }
}
