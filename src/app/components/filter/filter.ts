import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.html',
  styleUrl: './filter.css',
})

export class Filter {
  @Input() filtro: { options: string[] } = { options: [] };
  @Output() filterChange = new EventEmitter<string[]>();

  selected: string[] = [];

  @Output() apply = new EventEmitter<string[]>();

  onChange(option: string, event: any) {
    if (event.target.checked) {
      this.selected.push(option);
    } else {
      this.selected = this.selected.filter(o => o !== option);
    }
  }

  applyFilters() {
    this.apply.emit(this.selected);
  }
}
