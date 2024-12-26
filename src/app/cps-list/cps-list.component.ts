import { Component, OnInit } from '@angular/core';
import { CpsService } from '../services/cps.service';
import { CpsDTO } from '../models/cps.model';
import {Project} from "../models/project.model";
import {ProjectService} from "../services/project.service";
import jsPDF from "jspdf";

@Component({
  selector: 'app-cps-list',
  templateUrl: './cps-list.component.html',
  styleUrls: ['./cps-list.component.css']
})
export class CpsComponent implements OnInit {
  filteredProjects: Project[] = [];
  cpsList: CpsDTO[] = [];  // List to store CPS data
  cps: CpsDTO = {
    id: 0,
    nom: '',
    tasks: '',
    stack: '',
    projectId: 0,
    proposeParId: 0
  };
  projects: any[] = []; // List of available projects
  successMessage = '';
  errorMessage = '';
  constructor(private cpsService: CpsService, private projectService: ProjectService) { }

  ngOnInit(): void {
    this.loadCps();
    this.loadProjects();
  }

  resetForm() {
    this.cps = {
      id: 0,
      nom: '',
      tasks: '',
      stack:'',
      projectId: 0,
      proposeParId: 0
    };
  }
  onSubmit() {
    const user = JSON.parse(localStorage.getItem('user') || '{}'); // Get logged-in user
    const employeeId = user?.id; // Extract the user ID

    if (!employeeId) {
      this.errorMessage = 'You are not logged in. Please log in to add a CPS.';
      return;
    }

    // Set the proposeParId to the logged-in user's ID
    this.cps.proposeParId = employeeId;

    this.cpsService.addCps(this.cps).subscribe({
      next: (response) => {
        this.successMessage = 'CPS added successfully!';
        this.loadCps(); // Refresh the CPS list
        this.resetForm(); // Reset the form
      },
      error: (err) => {
        this.resetForm();
        this.loadCps(); // Reload the list in case of error to stay up to date
      }
    });
  }


  loadProjects(): void {
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

// Method to load CPS data from the service
  loadCps(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = user?.id;

    if (userId) {
      this.cpsService.getAllCps(userId).subscribe({
        next: (data) => {
          console.log('Fetched user-specific cps:', data);
          this.cpsList = data;
        },
        error: (err) => {

        }
      });
    } else {
      this.errorMessage = 'User is not authenticated.';
    }
  }

  downloadCPSAsText(cps: any): void {
    // Prepare the content for the .txt file
    const textContent = `
      CPS Title: ${cps.nom}
      Tasks: ${cps.tasks}
      Project Title: ${cps.projectTitle}
      Start Date: ${new Date(cps.startDate).toLocaleDateString()}
      End Date: ${new Date(cps.endDate).toLocaleDateString()}
      Budget: ${cps.budget.toLocaleString()}
    `;

    // Create a Blob with the text content
    const blob = new Blob([textContent], { type: 'text/plain' });

    // Create a link to trigger the download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${cps.nom}.txt`;  // File will be named after the CPS title
    link.click();  // Trigger the download
  }

  downloadCPSAsPDF(cps: any): void {
    const doc = new jsPDF();

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userName = user?.nom;

    // Title
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("CPS Report", 105, 15, { align: "center" });

    // Horizontal Line
    doc.setLineWidth(0.5);
    doc.line(20, 20, 190, 20);

    // CPS Title
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("CPS Title:", 20, 30);
    doc.setFont("helvetica", "normal");
    doc.text(cps.nom, 50, 30);

    // Project Title
    doc.setFont("helvetica", "bold");
    doc.text("Project Title:", 20, 40);
    doc.setFont("helvetica", "normal");
    doc.text(cps.projectTitle, 50, 40);

    // Tasks
    doc.setFont("helvetica", "bold");
    doc.text("Tasks:", 20, 50);
    doc.setFont("helvetica", "normal");
    doc.text(cps.tasks, 50, 50, { maxWidth: 140, lineHeightFactor: 1.5 });

    // Start Date
    doc.setFont("helvetica", "bold");
    doc.text("Start Date:", 20, 70);
    doc.setFont("helvetica", "normal");
    doc.text(new Date(cps.startDate).toLocaleDateString(), 50, 70);

    // End Date
    doc.setFont("helvetica", "bold");
    doc.text("End Date:", 20, 80);
    doc.setFont("helvetica", "normal");
    doc.text(new Date(cps.endDate).toLocaleDateString(), 50, 80);

    // Budget
    doc.setFont("helvetica", "bold");
    doc.text("Budget:", 20, 90);
    doc.setFont("helvetica", "normal");
    doc.text(`${cps.budget.toLocaleString()} USD`, 50, 90);

    // Stack
    doc.setFont("helvetica", "bold");
    doc.text("Stack:", 20, 100);
    doc.setFont("helvetica", "normal");
    doc.text(cps.stack, 50, 100, { maxWidth: 140, lineHeightFactor: 1.5 }); // Default to "No stack provided" if empty

    // Realised by
    doc.setFont("helvetica", "bold");
    doc.text("Realised by:", 20, 140);
    doc.setFont("helvetica", "normal");
    doc.text(userName, 50, 140);

    // Footer
    const pageHeight = doc.internal.pageSize.height;
    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.text("Page 1", 105, pageHeight - 10, { align: "center" });

    // Save PDF
    doc.save(`${cps.nom}.pdf`);
  }

  deleteCPS(id: number): void {
    if (confirm(`Are you sure you want to delete the CPS?`)) {
      this.cpsService.deleteCPS(id).subscribe({
        next: () => {
          this.cpsList = this.cpsList.filter(cps => cps.id !== id);
          alert('CPS deleted successfully.');
          this.loadCps();
        },
        error: (err) => {
         this.loadCps();
        }
      });
    }
  }

}
