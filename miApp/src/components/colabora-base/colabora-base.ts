import { Component } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-colabora-base',
  imports: [],
  templateUrl: './colabora-base.html',
  styleUrl: './colabora-base.css',
})
export class ColaboraBase {
  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }
}
