import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EmployeesPage } from './employees.page';
import { EmployeesResolver } from './employees.resolver';

const routes: Routes = [
  {
    path: '',
    component: EmployeesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EmployeesPage]
})
export class EmployeesPageModule {}
