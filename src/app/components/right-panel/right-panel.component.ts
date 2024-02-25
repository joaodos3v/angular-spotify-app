import { Component } from '@angular/core';
import { RecentSearchesComponent } from 'src/app/components/recent-searches/recent-searches.component';

@Component({
  selector: 'app-right-panel',
  standalone: true,
  imports: [RecentSearchesComponent],
  templateUrl: './right-panel.component.html',
  styleUrl: './right-panel.component.scss',
})
export class RightPanelComponent {}
