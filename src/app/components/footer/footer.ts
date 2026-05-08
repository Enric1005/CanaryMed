import { Component } from '@angular/core';
import {RouterLink, RouterModule} from '@angular/router';
import {
  IonToolbar, IonGrid, IonRow, IonCol, IonButton, IonIcon,
  IonTitle, IonList, IonItem
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-footer',
  imports: [
    RouterLink, RouterModule,
    IonToolbar, IonGrid, IonRow, IonCol, IonButton, IonIcon,
    IonTitle, IonList, IonItem
  ],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {}
