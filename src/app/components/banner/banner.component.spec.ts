import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerComponent } from './banner.component';
import { By } from '@angular/platform-browser';

describe('BannerComponent', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render imageSrc received as prop', () => {
    component.imageUrl = 'myImage.png';

    fixture.detectChanges();

    const result = fixture.debugElement.query(By.css('[data-testid="banner-image"]'));
    expect(result.attributes['style']).toContain('background-image: url("myImage.png");');
  });

  it('should render text received as prop', () => {
    component.text = 'Example Title!';

    fixture.detectChanges();

    const result = fixture.debugElement.nativeElement.querySelector('span');
    expect(result.textContent).toBe('Example Title!');
  });
});
