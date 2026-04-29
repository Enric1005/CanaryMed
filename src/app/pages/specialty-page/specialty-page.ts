import { Component, OnInit, OnDestroy } from '@angular/core';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { CentrosService } from '../../services/centros';
import { EspecialidadesService } from '../../services/especialidades';
import { AsyncPipe, NgIf } from '@angular/common';
import { SpecialtyCenter } from '../../components/specialty-center/specialty-center';
import { CitaService } from '../../services/cita';

@Component({
  selector: 'app-specialty-page',
  imports: [Footer, Header, RouterLink, NgIf, AsyncPipe, SpecialtyCenter],
  templateUrl: './specialty-page.html',
  styleUrl: './specialty-page.css',
})
export class SpecialtyPage implements OnInit, OnDestroy {
  datos$!: Observable<any>;
  origen: string | null = null;

  private sub: any;

  constructor(
    private centrosService: CentrosService,
    private especialidadesService: EspecialidadesService,
    private route: ActivatedRoute,
    private cita: CitaService
  ) {}

  ngOnInit() {
    this.origen = this.cita.origen;

    this.sub = this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        if (this.origen === 'centro') {
          this.datos$ = this.centrosService.getCenterById(id);
        } else {
          this.datos$ = this.especialidadesService.getEspecialidadById(id);
        }
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
