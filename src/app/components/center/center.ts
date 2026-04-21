import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Input } from '@angular/core';

@Component({
  selector: 'app-center',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './center.html',
  styleUrl: './center.css',
})
export class Center {
  @Input() center: any;
}
