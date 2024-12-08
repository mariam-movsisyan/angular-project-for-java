import { Routes } from '@angular/router';
import {
    ConfirmationComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent
} from './components';

export const routes: Routes = [
    { path: '', component: ConfirmationComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: '**', redirectTo: 'confirmation', pathMatch: 'full' },
];
