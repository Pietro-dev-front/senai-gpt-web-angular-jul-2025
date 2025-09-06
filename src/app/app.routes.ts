import { Routes } from '@angular/router';
import { LoginScreen } from './user-module/login-screen/login-screen';
import { ChatScreenComponent } from './user-module/chat-screen/chat-screen';

export const routes: Routes = [
    { 
        path:"login",
        loadComponent: () => LoginScreen
    },
    {
        path:"",
        loadComponent:() => LoginScreen
    },
    {
        path:"chat-screen",
        loadComponent:() => ChatScreenComponent
    }
];
