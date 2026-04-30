import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../../components/header/header';
import { Center } from '../../components/center/center';
import { Footer } from '../../components/footer/footer';
import { Filter } from '../../components/filter/filter';
import { CentrosService } from '../../services/centros';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-centers',
  standalone: true,
  imports: [
    CommonModule,
    Header,
    Center,
    Footer,
    Filter
  ],
  templateUrl: './centers.html',
  styleUrl: './centers.css',
})
export class Centers {
  centros$: Observable<any[]>;

  constructor(private centrosService: CentrosService) {
    this.centros$ = this.centrosService.getCentros();
  }
}
