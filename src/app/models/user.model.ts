import { Project } from './project.model'; // Assuming Project is defined

export interface User {
  id: number;
  nom: string;
  email: string;
  gsm: string;
  type: string;
  password: string;
  projetsProposesIds: number[];   // IDs of proposed projects
  projetsApprouvesIds: number[]; // IDs of approved projects
  tachesIds: number[];           // IDs of assigned tasks
}
