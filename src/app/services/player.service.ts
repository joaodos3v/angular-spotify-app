import { Injectable } from '@angular/core';
import { IMusic } from 'src/app/interfaces/IMusic';
import { newMusic } from 'src/app/common/factories';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  // Note: segundo o instrutor, BehaviorSubject é o mesmo que Subject, com a diferença que conseguimos definir o valor de início
  currentMusic = new BehaviorSubject<IMusic>(newMusic());

  constructor() {}
}
