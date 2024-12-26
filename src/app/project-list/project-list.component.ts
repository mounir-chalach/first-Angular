import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { Project } from '../models/project.model';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];
  errorMessage: string = '';

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.fetchProjects();
  }

  fetchProjects(): void {
    this.projectService.getProjects().subscribe({
      next: (data) => {
        console.log('Fetched projects:', data);
        this.projects = data;
      },
      error: (err) => {
        this.errorMessage = 'Error fetching projects: ' + err.message;
      },
    });
  }

  approveProject(id: number): void {
    this.projectService.approveProject(id).subscribe({
      next: (updatedProject) => {
        // Update the project's approved status in the local array
        const index = this.projects.findIndex(p => p.id === id);
        if (index !== -1) {
          this.projects[index] = updatedProject;
        }
      },
    });
    this.fetchProjects();
  }

  disApproveProject(id: number): void {
    this.projectService.disApproveProject(id).subscribe({
      next: (updatedProject) => {
        // Update the project's approved status in the local array
        const index = this.projects.findIndex(p => p.id === id);
        if (index !== -1) {
          this.projects[index] = updatedProject;
        }
      },
    });
    this.fetchProjects();
  }

}
