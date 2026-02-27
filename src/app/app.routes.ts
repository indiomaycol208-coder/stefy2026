import { Routes } from '@angular/router';
import{authGuard} from './guard/auth-guard';
//maikoll Torres
export const routes: Routes = [
    {
        path:'',
        redirectTo:'/auth',
        pathMatch:'full'

    },{
        path:'auth',
        loadComponent:() => import('./components/auth/auth').then(m => m.Auth),
        title:"Inicio de sesión"

    },{
        path:'chat',
        loadComponent:() => import('./components/chat/chat').then(m => m.Chat),
        title:"Chat con tu agente IA",
        canActivate:[authGuard]
    },
    {
        path:"**",
        redirectTo:'/auth'
    }
];
