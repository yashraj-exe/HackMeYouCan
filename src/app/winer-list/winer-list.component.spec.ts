import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinerListComponent } from './winer-list.component';

describe('WinerListComponent', () => {
  let component: WinerListComponent;
  let fixture: ComponentFixture<WinerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WinerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WinerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
