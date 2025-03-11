import { ComponentFixture, TestBed } from '@angular/core/testing';

import { of } from 'rxjs';
import { SpotifyPlayerService } from 'src/app/adapters/secondary/spotify/services/spotify-player.service';
import { ArtistsService } from 'src/app/application/services/artists.service';
import { CurrentMusicService } from 'src/app/application/services/current-music.service';
import { PLAYER_PROVIDER } from 'src/app/providers/player.provider';
import { RightPanelComponent } from './right-panel.component';

describe('RightPanelComponent', () => {
  let component: RightPanelComponent;
  let fixture: ComponentFixture<RightPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RightPanelComponent],
      providers: [
        SpotifyPlayerService,
        { provide: ArtistsService, useValue: { getTopArtists: jest.fn(() => of([])) } },
        { provide: CurrentMusicService, useValue: { currentMusic: of({}) } },
        { provide: PLAYER_PROVIDER, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RightPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
