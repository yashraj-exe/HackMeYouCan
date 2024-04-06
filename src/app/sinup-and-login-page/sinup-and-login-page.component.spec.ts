import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinupAndLoginPageComponent } from './sinup-and-login-page.component';

describe('SinupAndLoginPageComponent', () => {
  let component: SinupAndLoginPageComponent;
  let fixture: ComponentFixture<SinupAndLoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SinupAndLoginPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SinupAndLoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
