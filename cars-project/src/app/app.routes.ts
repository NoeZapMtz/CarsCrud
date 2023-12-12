import { Routes } from '@angular/router';
import { CarsListComponent } from './crud-cars/cars-list/cars-list.component';

export const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo:'/carslist'},
    {path: 'carslist', component: CarsListComponent}
];
