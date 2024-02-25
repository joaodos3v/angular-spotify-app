import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistItemComponent } from './artist-item.component';

describe('ArtistItemComponent', () => {
  let component: ArtistItemComponent;
  let fixture: ComponentFixture<ArtistItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtistItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArtistItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
