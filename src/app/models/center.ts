export interface CenterModel {
  id?: string;
  name: string;
  sitio: string;
  precio: string;
  isFavorite?: boolean;
  specialities?: Array<{
    desc: string;
    name: string;
    doctor: Array<{
      name: string;
      hours: string[];
      schedule: Record<string, string[]>;
    }>;
  }>;
}
