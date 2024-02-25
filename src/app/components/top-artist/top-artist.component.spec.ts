import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopArtistComponent } from './top-artist.component';

describe('TopArtistComponent', () => {
  let component: TopArtistComponent;
  let fixture: ComponentFixture<TopArtistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopArtistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopArtistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
