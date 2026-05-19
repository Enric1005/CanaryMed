import { Component } from '@angular/core';
import {Location} from '@angular/common';
import { IonButton, IonText, IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-colabora-base',
  imports: [IonButton, IonText, IonContent],
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
