import { ComponentFixture, TestBed } from '@angular/core/testing';

import { of } from 'rxjs';
import { SpotifyPlayerService } from 'src/app/adapters/secondary/spotify/services/spotify-player.service';
import { CurrentMusicService } from 'src/app/application/services/current-music.service';
import { PlaylistsService } from 'src/app/application/services/playlists.service';
import { PLAYER_PROVIDER } from 'src/app/providers/player.provider';
import { PlayerCardComponent } from './player-card.component';

describe('PlayerCardComponent', () => {
  let component: PlayerCardComponent;
  let fixture: ComponentFixture<PlayerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerCardComponent],
      providers: [
        SpotifyPlayerService,
        { provide: CurrentMusicService, useValue: { currentMusic: of() } },
        { provide: PlaylistsService, useValue: {} },
        { provide: PLAYER_PROVIDER, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PlayerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
