import { By } from '@angular/platform-browser';
import { UserFooterComponent } from './user-footer.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';

const BASIC_USER = {
  id: '1',
  name: 'João',
  imageUrl: 'myImage.png',
};

describe('UserFooterComponent', () => {
  let component: UserFooterComponent;
  let fixture: ComponentFixture<UserFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserFooterComponent, FontAwesomeTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(UserFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render nothing if there is no user', () => {
    component.user = null;
    fixture.detectChanges();
    const result = fixture.debugElement.nativeElement.querySelector('div');
    expect(result).toBeNull();
  });

  it('should render user imageUrl', () => {
    component.user = { ...BASIC_USER };

    fixture.detectChanges();

    const result = fixture.debugElement.nativeElement.querySelector('img');
    expect(result.src).toContain('myImage.png');
  });

  it('should render user name', () => {
    component.user = { ...BASIC_USER };

    fixture.detectChanges();

    const result = fixture.debugElement.nativeElement.querySelector('span');
    expect(result.textContent).toContain('João');
  });

  xit('should emit logout when click in icon button', () => {
    const component = fixture.componentInstance;
    spyOn(component, 'logout');

    const element = fixture.debugElement.query(By.css('.icone'));
    element.nativeElement.click();

    fixture.detectChanges();

    expect(component.logout).toHaveBeenCalled();
  });
});
