import { Component } from '@angular/core';
import { TopArtistsComponent } from 'src/app/components/top-artists/top-artists.component';
import { PlayerCardComponent } from 'src/app/components/player-card/player-card.component';
import { RecentSearchesComponent } from 'src/app/components/recent-searches/recent-searches.component';

@Component({
  selector: 'app-right-panel',
  standalone: true,
  imports: [RecentSearchesComponent, TopArtistsComponent, PlayerCardComponent],
  templateUrl: './right-panel.component.html',
  styleUrl: './right-panel.component.scss',
})
export class RightPanelComponent {}
