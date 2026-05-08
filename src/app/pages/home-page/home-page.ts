import { Component } from '@angular/core';
import {Header} from '../../components/header/header';
import {Home} from '../../components/home/home';
import {Footer} from '../../components/footer/footer';
import {
  IonHeader, IonContent, IonFooter
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home-page',
  imports: [
    Header, Home, Footer,
    IonHeader, IonContent, IonFooter
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {}
