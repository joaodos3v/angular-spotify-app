import { Subscription } from 'rxjs';
import { newMusic } from 'src/app/common/factories';
import { IMusic } from 'src/app/interfaces/IMusic';
import { Component, OnDestroy } from '@angular/core';
import { PlayerService } from 'src/app/services/player.service';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-player-card',
  standalone: true,
  imports: [FaIconComponent],
  templateUrl: './player-card.component.html',
  styleUrl: './player-card.component.scss',
})
export class PlayerCardComponent implements OnDestroy {
  previousIcon = faStepBackward;
  nextIcon = faStepForward;

  currentMusic: IMusic = newMusic();

  subs: Subscription[] = [];

  constructor(private playerService: PlayerService) {
    this.getCurrentMusic();
  }
  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  getCurrentMusic() {
    const sub = this.playerService.currentMusic.subscribe((music) => {
      this.currentMusic = music;
    });

    this.subs.push(sub);
  }
}
