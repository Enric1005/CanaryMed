import { Component } from '@angular/core';
import {Footer} from '../../components/footer/footer';
import {Header} from '../../components/header/header';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Observable} from 'rxjs';
import {CentrosService} from '../../services/centros';
import {Firestore} from '@angular/fire/firestore';
import {EspecialidadesService} from '../../services/especialidades';
import {AsyncPipe, NgIf} from '@angular/common';
import {SpecialtyCenter} from '../../components/specialty-center/specialty-center';

@Component({
  selector: 'app-specialty-page',
  imports: [
    Footer,
    Header,
    RouterLink,
    NgIf,
    AsyncPipe,
    SpecialtyCenter
  ],
  templateUrl: './specialty-page.html',
  styleUrl: './specialty-page.css',
})
export class SpecialtyPage {
  especialidad$!: Observable<any>;

  constructor(private centroService: EspecialidadesService, private route: ActivatedRoute) {
  }

  private sub: any;

  ngOnInit() {
    this.sub = this.route.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.especialidad$ = this.centroService.getEspecialidadById(id);
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
