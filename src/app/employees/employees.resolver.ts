import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Employee } from './employees.model';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { EmployeesService } from './employees.service';

@Injectable()
export class EmployeesResolver implements Resolve<Employee[]> {

  constructor(
    private employeesService: EmployeesService,
    private router: Router,
    // private alertify: AlertifyService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Employee[]> {
      return this.employeesService.getEmployees();
    // return this.employeesService.getEmployees().pipe(
    // //   catchError(error => {
    // //     // this.alertify.error('Problem retrieving data');
    // //     // this.router.navigate(["/home"]);
    // //     // return of(null);
    // //     console.log(error);
    // //   })
    // );
  }
}
