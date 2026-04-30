import {CenterModel} from './center';

export interface SpecialityModel {
  id: string;
  centers: CenterModel[],
  name: string;
  description: string;
  desc: string;
  src: string;
}
