import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroBebidas } from './registro-bebidas';

describe('RegistroBebidas', () => {
  let component: RegistroBebidas;
  let fixture: ComponentFixture<RegistroBebidas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroBebidas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroBebidas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
