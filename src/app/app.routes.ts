import { Routes } from '@angular/router';
import { EditarBebidaComponent } from './pages/editar-bebida/editar-bebida.component';
import { ListarBebidaComponent } from './pages/listar-bebida/listar-bebida.component';
import { RegistroBebidas } from './pages/registro-bebidas/registro-bebidas';

export const routes: Routes = [
    {
        path: 'editar-empleado/:id',
        component: EditarBebidaComponent
    },
];
