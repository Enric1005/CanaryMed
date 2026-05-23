import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonLabel, IonCheckbox, IonButton, IonContent, IonItem } from '@ionic/angular/standalone';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.html',
  styleUrls: ['./filter.css'],
  standalone: true,
  imports: [IonCheckbox, IonButton],
})
export class Filter {
  @Input() filtro: { options: string[] } = { options: [] };

  @Input() size: 'normal' | 'small' | 'large' = 'normal';

  @Output() apply = new EventEmitter<string[]>();

  selected: string[] = [];

  onChange(option: string, checked: boolean) {
    if (checked) {
      if (!this.selected.includes(option)) {
        this.selected.push(option);
      }
    } else {
      this.selected = this.selected.filter((o) => o !== option);
    }
  }

  applyFilters() {
    this.apply.emit(this.selected);
  }
}
