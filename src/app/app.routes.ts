import { Routes } from '@angular/router';
import { EditarBebidaComponent } from './pages/editar-bebida/editar-bebida.component';

export const routes: Routes = [
    {
        path: 'editar-empleado/:id',
        component: EditarBebidaComponent
    },
];
