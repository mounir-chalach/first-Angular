import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectListEmployeeComponent } from './project-list-employee.component';

describe('ProjectListEmployeeComponent', () => {
  let component: ProjectListEmployeeComponent;
  let fixture: ComponentFixture<ProjectListEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectListEmployeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectListEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
