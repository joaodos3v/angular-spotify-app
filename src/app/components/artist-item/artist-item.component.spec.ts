import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArtistItemComponent } from './artist-item.component';
import { By } from '@angular/platform-browser';

describe('ArtistItemComponent', () => {
  let component: ArtistItemComponent;
  let fixture: ComponentFixture<ArtistItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtistItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ArtistItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render imageSrc received as prop', () => {
    component.imageSrc = 'myImage.png';

    fixture.detectChanges();

    const result = fixture.debugElement.nativeElement.querySelector('img');
    expect(result.src).toContain('myImage.png');
  });

  it('should emit on click event', () => {
    const component = fixture.componentInstance;
    spyOn(component.click, 'emit');

    const element = fixture.debugElement.query(By.css('[data-testid="artist-item"]'));
    element.nativeElement.click();

    fixture.detectChanges();

    expect(component.click.emit).toHaveBeenCalled();
  });
});
