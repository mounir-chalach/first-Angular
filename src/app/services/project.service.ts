import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private apiUrl = 'http://localhost:8080/api/projects'; // Update the URL if necessary

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    const url = `${this.apiUrl}/list`;
    console.log(url);
    return this.http.get<Project[]>(url);
  }


  approveProject(id: number): Observable<Project> {
    const url = `${this.apiUrl}/${id}/approve`;
    return this.http.put<Project>(url, {});
  }

  disApproveProject(id: number): Observable<Project> {
    const url = `${this.apiUrl}/${id}/disapprove`;
    return this.http.put<Project>(url, {});
  }

  addUser(project: any): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/add`, project);
  }

}
