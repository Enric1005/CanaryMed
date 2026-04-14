import { Component } from '@angular/core';
import {Header} from '../../components/header/header';
import {Center} from '../../components/center/center';
import {Footer} from '../../components/footer/footer';

@Component({
  selector: 'app-centers',
  imports: [
    Header,
    Center,
    Footer
  ],
  templateUrl: './centers.html',
  styleUrl: './centers.css',
})
export class Centers {}
