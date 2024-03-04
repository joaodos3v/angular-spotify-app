import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentSearchesComponent } from './recent-searches.component';
import { By } from '@angular/platform-browser';

describe('RecentSearchesComponent', () => {
  let component: RecentSearchesComponent;
  let fixture: ComponentFixture<RecentSearchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentSearchesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RecentSearchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain "Pesquisar" placeholder', () => {
    const result = fixture.debugElement.query(By.css('input'));
    expect(result.attributes['placeholder']).toBe('Pesquisar');
  });

  xit('should do search when keyup Enter', () => {
    fixture.detectChanges();

    const component = fixture.componentInstance;
    spyOn(component, 'doSearch');

    const event = new KeyboardEvent('keyup', {
      bubbles: true,
      cancelable: true,
      shiftKey: false,
    });

    const input = fixture.debugElement.query(By.css('input'));
    const inputElement = input.nativeElement;

    inputElement.value = 'My search term';
    inputElement.dispatchEvent(event);

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.doSearch).toHaveBeenCalled();
    });
  });

  it('should render static options', () => {
    const recentSearches = ['Top Brasil', 'Top Global', 'Esquenta Sertanejo', 'Funk Hits', 'Pagodeira'];

    const result = fixture.debugElement.queryAll(By.css('span'));
    expect(result.length).toBe(5);

    for (let idx = 0; idx < recentSearches.length; idx++) {
      expect(result[idx].nativeElement.textContent).toBe(recentSearches[idx]);
    }
  });

  xit('should set value when click', () => {});
});
