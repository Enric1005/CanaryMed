import {Component, OnDestroy, OnInit} from '@angular/core';
import {Footer} from '../../components/footer/footer';
import {Header} from '../../components/header/header';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { setLogLevel, LogLevel } from "@angular/fire";
import {CommonModule} from '@angular/common';
import {map, Observable} from 'rxjs';
import {CentrosService} from '../../services/centros';
import { SpecialtyCenter } from '../../components/specialty-center/specialty-center';
import {LoadingSpinner} from '../../components/loading-spinner/loading-spinner';
import {
  IonHeader, IonContent, IonFooter, IonButton, IonText
} from '@ionic/angular/standalone';

setLogLevel(LogLevel.VERBOSE);

@Component({
  selector: 'app-center-page',
  imports: [
    Footer, Header, CommonModule, SpecialtyCenter, RouterLink, LoadingSpinner,
    IonHeader, IonContent, IonFooter, IonButton, IonText
  ],
  templateUrl: './center-page.html',
  styleUrl: './center-page.css',
})
export class CenterPage implements OnInit, OnDestroy {
  centro$!: Observable<any>;
  private sub: any;

  constructor(private centroService: CentrosService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.sub = this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.centro$ = this.centroService.getCenterById(id).pipe(
          map(centro => centro)
        );
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
