import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import {
  IonContent, IonItem, IonLabel, IonCheckbox, IonButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.html',
  styleUrl: './filter.css',
  encapsulation: ViewEncapsulation.None,
  imports: [IonContent, IonItem, IonLabel, IonCheckbox, IonButton]
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
