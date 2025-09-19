import { Routes } from '@angular/router';
import { LoginScreen } from './user-module/login-screen/login-screen';

import { authGuard } from './auth.guard';
import { NewUserScreen } from './user-module/new-user-screen/new-user-screen';
import { ChatScreen } from './user-module/chat-screen/chat-screen';


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
        loadComponent:() => ChatScreen,
        canActivate: [authGuard]
    },
     {
        path:"new-user-screen",
        loadComponent:() => NewUserScreen
    },
];
