import Spotify from 'spotify-web-api-js';
import { InjectionToken } from '@angular/core';

export const SPOTIFY_API_PROVIDER = new InjectionToken<Spotify.SpotifyWebApiJs>('SPOTIFY_API_PROVIDER');
