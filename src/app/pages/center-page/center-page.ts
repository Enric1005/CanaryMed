import { Component, OnDestroy, OnInit } from '@angular/core';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { setLogLevel, LogLevel } from '@angular/fire';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { CentrosService } from '../../services/centros';
import { SpecialtyCenter } from '../../components/specialty-center/specialty-center';
import { LoadingSpinner } from '../../components/loading-spinner/loading-spinner';
import { CitaService } from '../../services/cita';

import { IonContent, IonButton, IonText } from '@ionic/angular/standalone';

setLogLevel(LogLevel.VERBOSE);

@Component({
  selector: 'app-center-page',
  imports: [
    Footer,
    Header,
    CommonModule,
    SpecialtyCenter,
    RouterLink,
    LoadingSpinner,
    IonContent,
    IonButton,
    IonText,
  ],
  templateUrl: './center-page.html',
  styleUrl: './center-page.css',
})
export class CenterPage implements OnInit, OnDestroy {
  centro$!: Observable<any>;
  private sub: any;

  constructor(
    private centroService: CentrosService,
    private route: ActivatedRoute,
    private cita: CitaService,
  ) {}

  ngOnInit() {
    console.log('CenterPage INIT');

    this.sub = this.route.paramMap.subscribe((params) => {
      const id = params.get('id');

      console.log('ID recibido:', id);

      if (id) {
        this.centroService.getCenterById(id).subscribe((centro) => {
          console.log('Centro recibido desde Firestore:', centro);

          if (centro) {
            this.cita.centroId = id;
            this.cita.origen = 'centro';

            /* 🔥 LOGS IMPORTANTES */
            console.log('cita.centroId:', this.cita.centroId);
            console.log('cita.origen:', this.cita.origen);

            /* si existe nombre */
            console.log('centro.name:', centro.name);

            /* si existe especialidades */
            console.log('centro.specialties:', centro.specialties);
          } else {
            console.log('No se encontró centro');
          }
        });

        this.centro$ = this.centroService.getCenterById(id);

        console.log('Observable centro$ creada');
      } else {
        console.log('No llegó ID en la ruta');
      }
    });
  }

  ngOnDestroy() {
    console.log('CenterPage DESTROY');

    this.sub.unsubscribe();
  }
}
