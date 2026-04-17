import { Component } from '@angular/core';
import {Header} from '../../components/header/header';
import {Center} from '../../components/center/center';
import {Footer} from '../../components/footer/footer';
import {Filter} from '../../components/filter/filter';

@Component({
  selector: 'app-centers',
  imports: [
    Header,
    Center,
    Footer,
    Filter
  ],
  templateUrl: './centers.html',
  styleUrl: './centers.css',
})
export class Centers {}
