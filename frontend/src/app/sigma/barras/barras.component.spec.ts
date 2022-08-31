import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarrasComponent } from './barras.component';

describe('BarrasComponent', () => {
  let component: BarrasComponent;
  let fixture: ComponentFixture<BarrasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarrasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
