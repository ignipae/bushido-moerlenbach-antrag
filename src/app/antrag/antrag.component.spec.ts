import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AntragComponent } from './antrag.component';

describe('AntragComponent', () => {
  let component: AntragComponent;
  let fixture: ComponentFixture<AntragComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AntragComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AntragComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
