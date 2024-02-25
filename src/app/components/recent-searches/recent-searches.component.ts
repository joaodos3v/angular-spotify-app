import { Component } from '@angular/core';

@Component({
  selector: 'app-recent-searches',
  standalone: true,
  imports: [],
  templateUrl: './recent-searches.component.html',
  styleUrl: './recent-searches.component.scss',
})
export class RecentSearchesComponent {
  recentSearches = ['Top Brasil', 'Top Global', 'Esquenta Sertanejo', 'Funk Hits', 'Pagodeira'];

  constructor() {}
}
