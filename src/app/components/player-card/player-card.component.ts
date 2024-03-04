import { Subscription } from 'rxjs';
import { newMusic } from 'src/app/common/factories';
import { Music } from 'src/app/domain/models/music.model';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { PLAYER_PROVIDER } from 'src/app/providers/player.provider';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';
import { CurrentMusicService } from 'src/app/application/services/current-music.service';

@Component({
  selector: 'app-player-card',
  standalone: true,
  imports: [FaIconComponent],
  templateUrl: './player-card.component.html',
  styleUrl: './player-card.component.scss',
})
export class PlayerCardComponent implements OnInit, OnDestroy {
  playerService = inject(PLAYER_PROVIDER);

  previousIcon = faStepBackward;
  nextIcon = faStepForward;

  currentMusic: Music = newMusic();

  subs: Subscription[] = [];

  constructor(private currentMusicService: CurrentMusicService) {}

  ngOnInit(): void {
    this.getCurrentMusic();
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  getCurrentMusic() {
    const sub = this.currentMusicService.currentMusic.subscribe((music) => {
      this.currentMusic = music;
    });

    this.subs.push(sub);
  }

  backMusic() {
    this.playerService.back();
  }

  async nextMusic() {
    await this.playerService.next();
  }
}
