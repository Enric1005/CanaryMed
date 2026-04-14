import { Component } from '@angular/core';
import {Header} from '../../components/header/header';
import {Footer} from '../../components/footer/footer';
import {Specialty} from '../../components/specialty/specialty';
import {Filter} from '../../components/filter/filter';

@Component({
  selector: 'app-specialtys',
  imports: [
    Header,
    Footer,
    Specialty,
    Filter
  ],
  templateUrl: './specialtys.html',
  styleUrl: './specialtys.css',
})
export class Specialtys {}
