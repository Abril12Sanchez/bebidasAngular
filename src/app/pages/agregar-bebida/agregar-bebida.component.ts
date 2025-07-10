import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BebidaService } from '../../services/bebidas.service';

@Component({
  selector: 'app-agregar-bebida',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './agregar-bebida.component.html',
  styleUrl: './agregar-bebida.component.css'
})
export class AgregarBebidaComponent implements OnInit {

    // propiedades del componente
  bebidaForm: FormGroup= new FormGroup({});
  // Variable para controlar el estado del formulario
  enviado : boolean= false;
   bebidaTipo: any=
  [
    'Coca-Cola',
    'Pepsi',
    'Fanta',
    'Sprite',
    'Agua',
    'Jugo de Naranja',
    'Jugo de Manzana',
    'Té Helado',
    'Cerveza',
    'Vino',
    'Whisky',
    'Ron',
    'Vodka',
    'Ginebra',
    'Tequila',
    'Bebida Energética',
    'Limonada',
    'Batido de Frutas',
    'Soda',
    'Limonada con Hierbabuena',
    'Agua con Gas',
    'Agua de Coco'
  ];
  // Constructor del componente
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private bebidaService: BebidaService
  ){
    this.mainForm();
  }

  ngOnInit(): void {}

  // Método para inicializar el formulario
  mainForm() {
    this.bebidaForm = this.formBuilder.group({
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

  // Metodo para asignar el departamento seleccionado a la propiedad del formulario
  actualizartipo(event: Event):void {
    const seleccionarElemento = event.target as HTMLSelectElement;
    const tipoSeleccionado = seleccionarElemento.value;
    this.bebidaForm.get('tipo')?.setValue(tipoSeleccionado);
  }
  // getter para acceder a los controles del formulario
  get myForm() {
    return this.bebidaForm.controls;
  }

//   selectedFile: File | null = null;

// onFileChange(event: any) {
//   const file = event.target.files[0];
//   if (file) {
//     this.selectedFile = file;
//   }
// }


  // metodo que se ejecuta al enviar el formulario
  onSubmit() {
    this.enviado = true; // Cambia el estado del formulario a enviado
    if (!this.bebidaForm.valid) {
      return false;
     }else{
      return this.bebidaService.agregarBebida(this.bebidaForm.value)
      .subscribe({
        complete: () => {
          console.log('Bebida agregada correctamente');
          this.ngZone.run(() => this.router.navigateByUrl('/listar-bebidas')); // Redirige a la lista de empleados empleados/lista-empleados
        },
        error: (error) => {
          console.error('Error al agregar esta bebida', error);
        }
     });
  }
}




}
