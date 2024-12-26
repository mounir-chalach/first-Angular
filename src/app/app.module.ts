import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { UserListComponent } from './user-list/user-list.component';
import {FormsModule} from "@angular/forms";
import {LoginComponent} from "./login/login.component";
import { HeaderComponent } from './header/header.component';
import { CpsComponent } from './cps-list/cps-list.component';
import {RouterModule, RouterOutlet} from "@angular/router";
import { ProjectListEmployeeComponent } from './project-list-employee/project-list-employee.component';
import {AppRoutingModule} from "./app-routing.module";
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectListComponent,
    UserListComponent,
    HeaderComponent,
    CpsComponent,
    ProjectListEmployeeComponent,
    FooterComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        LoginComponent,
        RouterOutlet,
      AppRoutingModule
    ],
  providers: [
    // Enable fetch for HTTP requests
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
