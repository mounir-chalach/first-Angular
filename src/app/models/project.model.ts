import { User } from './user.model'; // Assuming you have a User interface


export interface Project {
  id: number;
  dateDebut: string;
  dateFin: string;
  etat: string;
  titre: string;
  budget: number;
  approved: boolean | null;
  approuveParNom: string | null; // Ajout du champ approuvePar
  proposeParNom: string | null; // Ajout du champ approuvePar
}
