import { AuthGuard } from './auth/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeesResolver } from './employees/employees.resolver';

const routes: Routes = [
  { path: '', redirectTo: 'places', pathMatch: 'full' },
  { path: 'auth', loadChildren: './auth/auth.module#AuthPageModule' },
  {
    path: 'places',
    loadChildren: './places/places.module#PlacesPageModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'bookings',
    loadChildren: './bookings/bookings.module#BookingsPageModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'employees',
    loadChildren: './employees/employees.module#EmployeesPageModule',
    resolve: {employees: EmployeesResolver}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
