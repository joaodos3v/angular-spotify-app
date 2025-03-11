import { ComponentFixture, TestBed } from '@angular/core/testing';

import { of } from 'rxjs';
import { ArtistsService } from 'src/app/application/services/artists.service';
import { TopArtistsComponent } from './top-artists.component';

describe('TopArtistsComponent', () => {
  let component: TopArtistsComponent;
  let fixture: ComponentFixture<TopArtistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopArtistsComponent],
      providers: [{ provide: ArtistsService, useValue: { getTopArtists: jest.fn(() => of([])) } }],
    }).compileComponents();

    fixture = TestBed.createComponent(TopArtistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
