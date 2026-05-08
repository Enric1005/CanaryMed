import { Component } from '@angular/core';
import {Header} from '../../components/header/header';
import {Home} from '../../components/home/home';
import {Footer} from '../../components/footer/footer';

@Component({
  selector: 'app-home-page',
  imports: [
    Header,
    Home,
    Footer
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {
}
