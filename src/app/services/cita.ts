import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CitaService {
  centroId: string | null = null;
  centroNombre: string | null = null;
  especialidadId: string | null = null;
  especialidadNombre: string | null = null;
  origen: 'centro' | 'especialidad' | null = null;
}
