import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ArtistsService } from 'src/app/application/services/artists.service';
import { TopArtistComponent } from './top-artist.component';

describe('TopArtistComponent', () => {
  let component: TopArtistComponent;
  let fixture: ComponentFixture<TopArtistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopArtistComponent],
      providers: [{ provide: ArtistsService, useValue: { getTopArtists: jest.fn(() => of([])) } }],
    }).compileComponents();

    fixture = TestBed.createComponent(TopArtistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
