export interface CpsDTO {
  id: number;
  nom: string;
  tasks: string;
  stack: string;
  projectTitle?: string; // Optional
  proposeParName?: string; // Optional
  startDate?: string; // Optional
  endDate?: string; // Optional
  budget?: number; // Optional
  projectId: number;
  proposeParId: number;
}
