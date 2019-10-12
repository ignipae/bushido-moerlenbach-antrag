import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KuendigungComponent } from './kuendigung.component';

describe('KuendigungComponent', () => {
  let component: KuendigungComponent;
  let fixture: ComponentFixture<KuendigungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KuendigungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KuendigungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
