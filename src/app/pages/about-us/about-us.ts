import { Component } from '@angular/core';
import {Footer} from '../../components/footer/footer';
import {Header} from '../../components/header/header';
import { IonHeader, IonContent, IonText } from '@ionic/angular/standalone';

@Component({
  selector: 'app-about-us',
  imports: [
    Footer, Header,
    IonHeader, IonContent, IonText
  ],
  templateUrl: './about-us.html',
  styleUrl: './about-us.css',
})
export class AboutUs {}
