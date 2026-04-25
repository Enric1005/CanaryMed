import {Component, Input} from '@angular/core';


@Component({
  selector: 'app-specialty-center',
  imports: [],
  templateUrl: './specialty-center.html',
  styleUrl: './specialty-center.css',
})
export class SpecialtyCenter {
  @Input() specialidad: any;
}
