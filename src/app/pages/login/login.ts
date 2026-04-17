import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  constructor(private location: Location) {}

  goBack() {
    this.location.back();  // ahora sí existe
  }
}
