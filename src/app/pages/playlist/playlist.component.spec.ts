import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { SpotifyPlayerService } from 'src/app/adapters/secondary/spotify/services/spotify-player.service';
import { ArtistsService } from 'src/app/application/services/artists.service';
import { CurrentMusicService } from 'src/app/application/services/current-music.service';
import { PlaylistsService } from 'src/app/application/services/playlists.service';
import { PLAYER_PROVIDER } from 'src/app/providers/player.provider';
import { PlaylistComponent } from './playlist.component';

describe('PlaylistComponent', () => {
  let component: PlaylistComponent;
  let fixture: ComponentFixture<PlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistComponent, RouterTestingModule],
      providers: [
        SpotifyPlayerService,
        { provide: CurrentMusicService, useValue: { currentMusic: of() } },
        { provide: PlaylistsService, useValue: {} },
        { provide: ArtistsService, useValue: { getTopArtists: jest.fn(() => of([])) } },
        { provide: PLAYER_PROVIDER, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
