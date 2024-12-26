import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpsListComponent } from './cps-list.component';

describe('CpsListComponent', () => {
  let component: CpsListComponent;
  let fixture: ComponentFixture<CpsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CpsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CpsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
