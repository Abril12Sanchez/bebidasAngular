import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BebidaService } from '../../services/bebidas.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Bebida } from '../../models/bebida';

@Component({
  standalone: true,
  selector: 'app-editar-bebida',
  templateUrl: './editar-bebida.component.html',
  styleUrls: ['./editar-bebida.component.css'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class EditarBebidaComponent implements OnInit {

  // Propiedades
  editarBebidaForm: FormGroup = new FormGroup({});
  enviado: boolean = false;

  // Se corrigió el nombre de la propiedad de 'bebidaMaeca' a 'bebidaMarca'
  bebidaTipo: any=
  [
    'Refrescos y Jugos',
    'Aguas',
    'Bebidas Alcohólicas',
    'Bebidas Funcionales',
    'Bebidas Calientes',
    'Bebidas Internacionales',
    'Smoothies y Batidos',
    'Bebidas Tradicionales Mexicanas'
  ];
  bebidaData: Bebida[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private BebidaService: BebidaService,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.mainForm();
    const id = this.actRoute.snapshot.paramMap.get('id');
    if (id) {
      this.getBebida(id);
    }
  }

  mainForm(): void {
    this.editarBebidaForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      tipo: ['', Validators.required],
      ingredientes: ['', [Validators.required, Validators.pattern('^[a-zA-Z, ]+$')]],
      precio: ['', [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]],
      tamanio: ['', Validators.required],
      calorias: ['', [Validators.required, Validators.min(0), Validators.max(1000)]],
      imagen: ['', Validators.required],
      porcentaje_alcohol: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      nota: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]]
    });
  }

  // Se cambió el nombre de la función a "actualizarDepartamento"
  actualizarTipo(event: Event): void {
    const seleccionarElemento = event.target as HTMLSelectElement;
    const tipoSeleccionado = seleccionarElemento.value;
    this.editarBebidaForm.get('tipo')?.setValue(tipoSeleccionado);
  }

  get myForm() {
    return this.editarBebidaForm.controls;
  }

  getBebida(id: any): void {
    this.BebidaService.getBebida(id).subscribe((data) => {
      this.editarBebidaForm.setValue({
        nombre: data['nombre'],
        tipo: data['tipo'],
        ingredientes: data['ingredientes'],
        precio: data['precio'],
        tamanio: data['tamanio'],
        calorias: data['calorias'],
        imagen: data['imagen'],
        porcentaje_alcohol: data['porcentaje_alcohol'],
        nota: data['nota']
      });
    });
  }

  onSubmit() {
    this.enviado = true;

    if (!this.editarBebidaForm.valid) {
      return false;
    }else {
    if (window.confirm('¿Seguro que desea modificar esta bebida?')) {
      const id = this.actRoute.snapshot.paramMap.get('id');
      if (id) {
        this.BebidaService.actualizarBebida(id, this.editarBebidaForm.value).subscribe({
          complete: () => {
            console.log('bebida modificado correctamente');
            this.router.navigateByUrl('/listar-bebidas');
          },
          error: (e) => {
            console.error('Error al modificar empleado:', e);
          }
        });
      }
    }
    }
    return true;
  }
}
