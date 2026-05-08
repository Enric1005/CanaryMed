import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.html',
  styleUrl: './filter.css',
  encapsulation: ViewEncapsulation.None
})
export class Filter {
  @Input() filtro: { options: string[] } = { options: [] };
  @Input() size: 'normal' | 'small' | 'large' = 'normal';
  @Output() filterChange = new EventEmitter<string[]>();
  @Output() apply = new EventEmitter<string[]>();

  selected: string[] = [];

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
