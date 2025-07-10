import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarBebidaComponent } from './agregar-bebida.component';

describe('AgregarBebidaComponent', () => {
  let component: AgregarBebidaComponent;
  let fixture: ComponentFixture<AgregarBebidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarBebidaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarBebidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
