import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-filter',
  imports: [],
  templateUrl: './filter.html',
  styleUrl: './filter.css',
})
export class Filter {
  @Input() filtro: { options: string[] } = { options: [] };
}
