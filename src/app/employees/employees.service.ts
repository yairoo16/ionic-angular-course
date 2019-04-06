import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from './employees.model';
import { tap, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private http: HttpClient) { }

  getEmployees() {
    return this.http.get<Employee[]>('http://localhost:8080/api/employees');
  }
}
