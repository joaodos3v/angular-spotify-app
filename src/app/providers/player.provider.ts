import { InjectionToken } from '@angular/core';

export interface Player {
  play(musicId: string): Promise<void>;
  pause(): Promise<void>;
  next(): Promise<void>;
  back(): Promise<void>;
}

export const PLAYER_PROVIDER = new InjectionToken<Player>('PLAYER_PROVIDER');
