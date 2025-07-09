import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarBebidaComponent } from './editar-bebida.component';

describe('EditarBebidaComponent', () => {
  let component: EditarBebidaComponent;
  let fixture: ComponentFixture<EditarBebidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarBebidaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarBebidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
