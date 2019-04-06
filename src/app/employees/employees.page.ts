import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EmployeesService } from './employees.service';
import { Employee } from './employees.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.page.html',
  styleUrls: ['./employees.page.scss'],
})
export class EmployeesPage implements OnInit {

  form: FormGroup;

  isLoading = false;
  employees: Employee[];

  constructor(private employeesService: EmployeesService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.employees = data.employees;
    });
    // this.getEmployees();
  }

  getEmployees() {
    // this.isLoading = true;
    this.employeesService.getEmployees().subscribe(employees => {
      this.employees = employees;
    });
  }

}
