import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BebidaService } from '../../services/bebidas.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-editar-bebida',
  templateUrl: './editar-bebida.component.html',
  styleUrls: ['./editar-bebida.component.css'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class EditarBebidaComponent implements OnInit {
  
  //Propiedades
  editarBebidaForm: FormGroup = new FormGroup({});
  enviado: boolean = false;
  bebidaMaeca: string[] = [

  ];

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
      departamento: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });
  }

  actualizarBebida(event: Event): void {
    const seleccionarElemento = event.target as HTMLSelectElement;
    const departamentoSeleccionado = seleccionarElemento.value;
    this.editarBebidaForm.get('departamento')?.setValue(departamentoSeleccionado);
  }

  get myForm() {
    return this.editarBebidaForm.controls;
  }

  getBebida(id:any){
    this.BebidaService.getBebida(id).subscribe((data) => {
      this.editarBebidaForm.setValue({
        nombre: data['nombre'],
        tipo: data['tipo'],
        ingredientes: data['ingredientes'],
        precio: data['precio'],
        tamanio: data['tamanio'],
        calorias: data['calorias'],
        porcentaje_alcohol: data['porcentaje_alcohol'],
        nota: data['nota'] || '' // Aseguramos que nota sea un string, incluso si es undefined
      })
    })
  }
  

  onSubmit(): void {
    this.enviado = true;

    if (!this.editarBebidaForm.valid) {
      return;
    }

    if (window.confirm('¿Seguro que desea modificar este usuario?')) {
      const id = this.actRoute.snapshot.paramMap.get('id');
      if (id) {
        this.BebidaService.actualizarBebida(id, this.editarBebidaForm.value).subscribe({
          complete: () => {
            console.log('Empleado modificado correctamente');
            this.router.navigateByUrl('/listar-empleados');
          },
          error: (e) => {
            console.error('Error al modificar empleado:', e);
          }
        });
      }
    }
  }
}