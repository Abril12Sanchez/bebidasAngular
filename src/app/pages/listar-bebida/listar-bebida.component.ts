import { Component, OnInit } from '@angular/core';
import { BebidaService } from '../../services/bebidas.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listar-bebida',
  imports: [RouterLink],
  templateUrl: './listar-bebida.component.html',
  styleUrl: './listar-bebida.component.css'
})
export class ListarBebidaComponent implements OnInit{

   //Properties
  listaBebidas: any = [];
  constructor(private bebidaService: BebidaService) {
    this.getBebidas();
   }

   ngOnInit(): void {
       
   }

   // Methods que obtiene todos los empleados
   getBebidas() {
    this.bebidaService.getBebidas().subscribe((data)=>{
      this.listaBebidas = data;
    }) 
  }

  //metodo para eliminar un empleado
  eliminarBebida(bebida: any, index:any)
  {
    if(window.confirm("¿Estás seguro de eliminar esta bebida del catalogo?")) {
      this.bebidaService.eliminarBebida(bebida._id).subscribe((data)=>{
        this.listaBebidas.splice(index, 1);
      }, (error) => {
        console.error("Error al eliminar esta bebida:", error);
      });
    }
  } 


}
