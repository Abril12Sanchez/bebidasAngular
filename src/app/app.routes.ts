import { Routes } from '@angular/router';
import { EditarBebidaComponent } from './pages/editar-bebida/editar-bebida.component';
import { ListarBebidaComponent } from './pages/listar-bebida/listar-bebida.component';
import { AgregarBebidaComponent } from './pages/agregar-bebida/agregar-bebida.component';
export const routes: Routes = [
    
    {
        path: '',
        pathMatch:'full', 
        redirectTo:'listar-bebidas'
    },
    {
        path:'listar-bebidas',
        component: ListarBebidaComponent
    },
    {
        path: 'agregar-bebida',
        component: AgregarBebidaComponent
    },
    {
        path: 'editar-bebida/:id',
        component: EditarBebidaComponent
    },
    {
        path: '**',
        redirectTo: 'listar-bebidas'
    }
];
