import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { Project } from '../models/project.model';

@Component({
  selector: 'app-project-list-employee',
  templateUrl: './project-list-employee.component.html',
  styleUrls: ['./project-list-employee.component.css'],
})
export class ProjectListEmployeeComponent implements OnInit {
  projects: Project[] = [];
  filteredProjects: Project[] = []; // Only projects created by the logged-in employee
  errorMessage: string = '';
  newProject: Project = {
    id: 0,
    dateDebut: '',
    dateFin: '',
    etat: '',
    titre: '',
    budget: 0,
    approved: null, // Default field as null
    approuveParNom: null, // Default field as null
    proposeParNom: null, // Default field as null
  };

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.fetchProjects();
  }

  // Fetch all projects and filter them for the logged-in employee
  fetchProjects(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}'); // Get logged-in user
    const employeeId = user?.id; // Extract the employee ID

    if (!employeeId) {
      this.errorMessage = 'You are not logged in. Please log in to view your projects.';
      return;
    }

    this.projectService.getProjects().subscribe({
      next: (data) => {
        console.log('Fetched projects:', data);
        this.projects = data;

        // Filter projects to only include those created by the logged-in employee
        this.filteredProjects = this.projects.filter(
          (project) => project.proposeParNom === user.nom
        );
      },
      error: (err) => {

      },
    });
  }

  resetNewProject(): void {
    this.newProject = {
      id: 0,
      dateDebut: '',
      dateFin: '',
      etat: '',
      titre: '',
      budget: 0,
      approved: null,
      approuveParNom: null,
      proposeParNom: null,
    };
  }

  addProject(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}'); // Get logged-in user
    if (!user?.nom) {
      alert('You are not logged in. Please log in to create a project.');
      return;
    }

    // Add the logged-in user's name to the project
    const projectWithProposer = {
      ...this.newProject,
      proposeParNom: user.nom, // Add logged-in user's name
    };

    this.projectService.addUser(projectWithProposer).subscribe({
      next: () => {
        alert('Project added successfully.');
        this.fetchProjects(); // Refresh the project list
        this.resetNewProject(); // Reset the form
      },
      error: (err) => {
 this.fetchProjects();
        this.resetNewProject();
      },
    });
  }

}
