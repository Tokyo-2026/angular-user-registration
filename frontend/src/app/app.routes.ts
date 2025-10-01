import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { UsersListComponent } from './users-list/users-list';

export const routes: Routes = [
    { path: 'register', component: RegisterComponent },
    { path: 'users', component: UsersListComponent },
    { path: '', redirectTo: '/users', pathMatch: 'full' }
];
