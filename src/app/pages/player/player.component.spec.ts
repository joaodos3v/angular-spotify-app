import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CurrentMusicService } from 'src/app/application/services/current-music.service';
import { PlaylistsService } from 'src/app/application/services/playlists.service';
import { PLAYER_PROVIDER } from 'src/app/providers/player.provider';
import { PlayerComponent } from './player.component';

describe('PlayerComponent', () => {
  let component: PlayerComponent;
  let fixture: ComponentFixture<PlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerComponent],
      providers: [
        { provide: CurrentMusicService, useValue: { currentMusic: of() } },
        { provide: PlaylistsService, useValue: { getPlaylists: jest.fn(() => of([])) } },
        { provide: PLAYER_PROVIDER, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
