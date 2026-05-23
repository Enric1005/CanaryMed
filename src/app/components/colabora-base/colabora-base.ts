import { Component } from '@angular/core';
import {Location} from '@angular/common';
import { IonButton, IonText } from '@ionic/angular/standalone';

@Component({
  selector: 'app-colabora-base',
  imports: [IonButton, IonText],
  templateUrl: './colabora-base.html',
  styleUrl: './colabora-base.css',
  standalone: true,
})
export class ColaboraBase {
  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }
}
