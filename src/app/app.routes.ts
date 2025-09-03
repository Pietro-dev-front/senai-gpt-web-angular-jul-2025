import { Routes } from '@angular/router';
import { LoginScreen } from './user-module/login-screen/login-screen';

export const routes: Routes = [
    { 
        path:"login",
        loadComponent: () => LoginScreen
    }
];
