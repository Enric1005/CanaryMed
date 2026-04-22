import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-specialty',
  imports: [CommonModule],
  templateUrl: './specialty.html',
  styleUrl: './specialty.css',
})
export class Specialty {
  @Input() specialty1: any;
  @Input() specialty2: any;
}
