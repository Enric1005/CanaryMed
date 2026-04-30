export interface CenterModel {
  id: string;
  name: string;
  description: string;
  image: string;
  precio: 'Precio Bajo' | 'Precio Medio' | 'Precio Alto';
  sitio: 'Ciudad' | 'Norte' | 'Sur';
  specialities: any[];
}
