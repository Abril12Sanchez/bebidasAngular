import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarBebidaComponent } from './listar-bebida.component';

describe('ListarBebidaComponent', () => {
  let component: ListarBebidaComponent;
  let fixture: ComponentFixture<ListarBebidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarBebidaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarBebidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
