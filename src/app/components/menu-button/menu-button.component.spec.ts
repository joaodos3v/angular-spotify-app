import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuButtonComponent } from './menu-button.component';
import { By } from '@angular/platform-browser';

describe('MenuButtonComponent', () => {
  let component: MenuButtonComponent;
  let fixture: ComponentFixture<MenuButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render description received as prop', () => {
    component.description = 'Example description!';

    fixture.detectChanges();

    const result = fixture.debugElement.nativeElement.querySelector('span');
    expect(result.textContent).toBe('Example description!');
  });

  it('should apply selected class received as prop', () => {
    component.selected = true;

    fixture.detectChanges();

    const result = fixture.debugElement.query(By.css('[data-testid="menu-button"]'));
    expect(result.classes['selected']).toBeTrue();
  });

  it('should emit on click event', () => {
    const component = fixture.componentInstance;
    spyOn(component.click, 'emit');

    const element = fixture.debugElement.query(By.css('[data-testid="menu-button"]'));
    element.nativeElement.click();

    fixture.detectChanges();

    expect(component.click.emit).toHaveBeenCalled();
  });
});
