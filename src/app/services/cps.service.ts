import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CpsDTO } from '../models/cps.model';
import {Project} from "../models/project.model"; // Import the CpsDTO model

@Injectable({
  providedIn: 'root'
})
export class CpsService {

  private apiUrl = 'http://localhost:8080/api/cps';  // URL of the Spring Boot API
  private projectUrl = 'http://localhost:8080/api/projects';
  constructor(private http: HttpClient) { }

  // Method to get all CPS
// cps.service.ts

  getAllCps(userId: number): Observable<CpsDTO[]> {
    return this.http.get<CpsDTO[]>(`${this.apiUrl}/list/${userId}`);
  }

  getAllProjects(userId: number): Observable<any[]> {
    const url = `${this.apiUrl}/list`;
    return this.http.get<Project[]>(url);
  }


  addCps(cps: CpsDTO): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/add`, cps);
  }

  deleteCPS(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
