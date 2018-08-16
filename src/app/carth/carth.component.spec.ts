import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarthComponent } from './carth.component';

describe('CarthComponent', () => {
  let component: CarthComponent;
  let fixture: ComponentFixture<CarthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
