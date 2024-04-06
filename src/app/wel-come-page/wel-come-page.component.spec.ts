import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelComePageComponent } from './wel-come-page.component';

describe('WelComePageComponent', () => {
  let component: WelComePageComponent;
  let fixture: ComponentFixture<WelComePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelComePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WelComePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
