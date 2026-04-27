import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-specialty',
  imports: [CommonModule, RouterLink],
  templateUrl: './specialty.html',
  styleUrl: './specialty.css',
})
export class Specialty {
  @Input() specialty1: any;
  @Input() specialty2: any;
}
