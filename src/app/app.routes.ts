import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', loadComponent: ()=> import('./shared/components/layout/layout.component'),
        children:[
            {path: 'dashboard', loadComponent: ()=> import('./business/dashboard/dashboard.component')},
            {path: 'profile', loadComponent: ()=> import('./business/profile/profile.component')},
            {path: 'tables', loadComponent: ()=> import('./business/tables/tables.component')},
            {path: 'log-in', loadComponent: ()=> import('./auth/login/login.component')},
            {path: 'register', loadComponent: ()=> import('./auth/register/register.component')},
            {path: '',
                redirectTo:'dashboard',
                pathMatch:'full'
            }
        ]
    },
    {path:'**',
        redirectTo:'dashboard',
        pathMatch:'full'
    }
];
