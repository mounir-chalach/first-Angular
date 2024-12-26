import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {UserListComponent} from "./user-list/user-list.component";
import {ProjectListComponent} from "./project-list/project-list.component";
import {ProjectListEmployeeComponent} from "./project-list-employee/project-list-employee.component";
import {CpsComponent} from "./cps-list/cps-list.component";
import {AuthGuard} from "./auth/auth.guard";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UserListComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
  { path: 'projectsEmployee', component: ProjectListEmployeeComponent, canActivate: [AuthGuard], data: { roles: ['Employee'] } },
  { path: 'cps', component: CpsComponent, canActivate: [AuthGuard], data: { roles: ['Employee'] } },
  { path: 'projects', component: ProjectListComponent, canActivate: [AuthGuard], data: { roles: ['Manager', 'Director'] } },

  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
