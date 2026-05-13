import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  IonLabel, IonCheckbox, IonButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.html',
  styleUrl: './filter.css',
  imports: [IonLabel, IonCheckbox, IonButton]
})
export class Filter {
  @Input() filtro: { options: string[] } = { options: [] };
  @Input() size: 'normal' | 'small' | 'large' = 'normal';
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
