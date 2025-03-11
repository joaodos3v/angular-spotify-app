import { ComponentFixture, TestBed } from '@angular/core/testing';

import { of } from 'rxjs';
import { SpotifyPlayerService } from 'src/app/adapters/secondary/spotify/services/spotify-player.service';
import { ArtistsService } from 'src/app/application/services/artists.service';
import { CurrentMusicService } from 'src/app/application/services/current-music.service';
import { MusicsService } from 'src/app/application/services/musics.service';
import { PLAYER_PROVIDER } from 'src/app/providers/player.provider';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        SpotifyPlayerService,
        { provide: MusicsService, useValue: { getMusics: jest.fn() } },
        { provide: ArtistsService, useValue: { getTopArtists: jest.fn(() => of([])) } },
        { provide: CurrentMusicService, useValue: { currentMusic: of({}) } },
        { provide: PLAYER_PROVIDER, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
