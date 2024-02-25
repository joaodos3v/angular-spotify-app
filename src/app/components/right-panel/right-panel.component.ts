import { Component } from '@angular/core';
import { TopArtistsComponent } from 'src/app/components/top-artists/top-artists.component';
import { RecentSearchesComponent } from 'src/app/components/recent-searches/recent-searches.component';

@Component({
  selector: 'app-right-panel',
  standalone: true,
  imports: [RecentSearchesComponent, TopArtistsComponent],
  templateUrl: './right-panel.component.html',
  styleUrl: './right-panel.component.scss',
})
export class RightPanelComponent {}
