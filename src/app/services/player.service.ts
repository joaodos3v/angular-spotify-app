import { inject } from '@angular/core';
import { PLAYER_PROVIDER, Player } from 'src/app/providers/player.provider';

export class PlayerService {
  player: Player = inject(PLAYER_PROVIDER);

  async playMusic(musicId: string) {
    await this.player.play(musicId);
  }

  async pauseMusic() {
    await this.player.pause();
  }

  async backMusic() {
    await this.player.back();
  }

  async nextMusic() {
    await this.player.next();
  }
}
