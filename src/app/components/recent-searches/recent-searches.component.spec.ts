import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentSearchesComponent } from './recent-searches.component';

describe('RecentSearchesComponent', () => {
  let component: RecentSearchesComponent;
  let fixture: ComponentFixture<RecentSearchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentSearchesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecentSearchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
