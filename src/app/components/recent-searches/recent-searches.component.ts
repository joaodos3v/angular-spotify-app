import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recent-searches',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './recent-searches.component.html',
  styleUrl: './recent-searches.component.scss',
})
export class RecentSearchesComponent {
  recentSearches = ['Top Brasil', 'Top Global', 'Esquenta Sertanejo', 'Funk Hits', 'Pagodeira'];

  searchInput = '';

  constructor() {}

  setSearchValue(searchTerm: string) {
    this.searchInput = searchTerm;
  }

  doSearch() {
    /* eslint-disable no-console */
    console.log('## CL ## Searching...', this.searchInput);
    // TODO
  }
}
