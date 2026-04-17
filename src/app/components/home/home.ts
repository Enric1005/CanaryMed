import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  image_hospital1 = "assets/Perpetuo_socorro.jpg"
  image_hospital2 = "assets/San_jose.jpg"
  image_hospital3 = "assets/Vithas.webp"
  image_hospital4 = "assets/San_roque.webp"


}
