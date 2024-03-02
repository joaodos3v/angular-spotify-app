import { Subscription } from 'rxjs';
import { Music } from 'src/app/models/music.model';
import { newMusic } from 'src/app/common/factories';
import { Component, OnDestroy, inject } from '@angular/core';
import { OldPlayerService } from 'src/app/services/old-player.service';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';

import { PLAYER_PROVIDER, Player } from 'src/app/providers/player.provider';

@Component({
  selector: 'app-player-card',
  standalone: true,
  imports: [FaIconComponent],
  templateUrl: './player-card.component.html',
  styleUrl: './player-card.component.scss',
})
export class PlayerCardComponent implements OnDestroy {
  playerService: Player = inject(PLAYER_PROVIDER);

  previousIcon = faStepBackward;
  nextIcon = faStepForward;

  currentMusic: Music = newMusic();

  subs: Subscription[] = [];

  constructor(private oldPlayerService: OldPlayerService) {
    this.getCurrentMusic();
  }
  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  getCurrentMusic() {
    const sub = this.oldPlayerService.currentMusic.subscribe((music) => {
      this.currentMusic = music;
    });

    this.subs.push(sub);
  }

  backMusic() {
    this.playerService.back();
  }

  nextMusic() {
    this.playerService.next();
  }
}
